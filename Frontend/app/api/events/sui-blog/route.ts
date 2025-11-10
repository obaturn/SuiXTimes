import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Fetch from Sui blog WordPress API
    const response = await fetch('https://blog.sui.io/wp-json/wp/v2/posts?categories=events&_embed&per_page=6', {
      headers: {
        'User-Agent': 'SuiHub/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Sui blog API error: ${response.status}`);
    }

    const posts = await response.json();

    // Transform WordPress data to event format
    const events = posts.map((post: any) => ({
      title: post.title.rendered,
      date: new Date(post.date).toLocaleDateString(),
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg',
      description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...',
      location: 'TBD',
      type: 'Announcement',
      attendees: 'TBD',
      url: post.link
    }));

    return NextResponse.json({
      events,
      success: true
    });

  } catch (error) {
    console.error('Error fetching Sui blog events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog events', success: false },
      { status: 500 }
    );
  }
}