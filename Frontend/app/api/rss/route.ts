import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
    }

    // Fetch the RSS feed
    const feed = await parser.parseURL(url);

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
      items: items.slice(0, 10) // Limit to 10 items
    });

  } catch (error) {
    console.error('Error fetching RSS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS feed' },
      { status: 500 }
    );
  }
}