import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const dynamic = 'force-dynamic';

const parser = new Parser();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      console.log("No URL parameter provided");
      return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
    }

    console.log('Fetching RSS from:', url);

    // Fetch the RSS feed with timeout and user agent
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'SuiXTimes/1.0 (https://sui-x-times.vercel.app)'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    console.log('RSS XML length:', xmlText.length);

    // Parse the RSS feed
    const feed = await parser.parseString(xmlText);

    console.log('Parsed feed title:', feed.title);
    console.log('Number of items:', feed.items?.length || 0);

    // Extract relevant items
    const items = feed.items?.map(item => ({
      title: item.title,
      link: item.link,
      content: item.contentSnippet || item.content,
      pubDate: item.pubDate,
      source: feed.title || 'Unknown'
    })) || [];

    return NextResponse.json({
      title: feed.title,
      description: feed.description,
      items: items.slice(0, 5) // Limit to 5 items
    });

  } catch (error: any) {
    console.error('Error fetching RSS:', error.message);
    return NextResponse.json(
      { error: `Failed to fetch RSS feed: ${error.message}` },
      { status: 500 }
    );
  }
}