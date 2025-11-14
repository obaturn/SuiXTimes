import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

    if (!NEWSAPI_KEY) {
      return NextResponse.json({ error: 'NewsAPI key not configured' }, { status: 500 });
    }

    // Fetch Sui-specific news from NewsAPI
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=sui+blockchain+OR+sui+crypto+OR+mysten+labs&language=en&pageSize=8&sortBy=publishedAt&apiKey=${NEWSAPI_KEY}`
    );

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.message || 'NewsAPI error');
    }

    // Transform to match our format
    const newsItems = data.articles?.map((article: any) => ({
      title: article.title,
      source: article.source?.name || 'NewsAPI',
      time: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Recent',
      category: 'Cryptocurrency'
    })) || [];

    return NextResponse.json(newsItems);

  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}