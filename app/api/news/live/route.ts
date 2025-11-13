import { NextRequest, NextResponse } from 'next/server';

interface LiveNewsItem {
  id: number;
  title: string;
  category: string;
  time: string;
  source: string;
  urgent: boolean;
}

// In-memory storage for ElizaOS news updates
// In production, this would be a database
let elizaNewsStore: LiveNewsItem[] = [
  {
    id: 1,
    title: "Sui Network Achieves New Transaction Record",
    category: "breaking",
    time: "2 min ago",
    source: "ElizaOS Agent",
    urgent: true
  },
  {
    id: 2,
    title: "Major DeFi Protocol Launches on Sui Testnet",
    category: "defi",
    time: "15 min ago",
    source: "ElizaOS Agent",
    urgent: false
  },
  {
    id: 3,
    title: "New NFT Marketplace Goes Live",
    category: "nft",
    time: "1 hour ago",
    source: "ElizaOS Agent",
    urgent: false
  }
];

export async function GET() {
  try {
    // Return current ElizaOS news
    return NextResponse.json(elizaNewsStore);
  } catch (error) {
    console.error('Error fetching ElizaOS news:', error);
    return NextResponse.json(getFallbackNews());
  }
}

// POST endpoint for ElizaOS agent to submit news updates
export async function POST(request: NextRequest) {
  try {
    const newsUpdate = await request.json();

    // Validate the news update structure
    if (!newsUpdate.title || !newsUpdate.category || !newsUpdate.source) {
      return NextResponse.json(
        { error: 'Invalid news update format' },
        { status: 400 }
      );
    }

    // Create new news item
    const newNewsItem: LiveNewsItem = {
      id: Date.now(), // Simple ID generation
      title: newsUpdate.title,
      category: newsUpdate.category || 'breaking',
      time: 'Just now',
      source: newsUpdate.source || 'ElizaOS Agent',
      urgent: newsUpdate.urgent || false
    };

    // Add to the beginning of the array (most recent first)
    elizaNewsStore.unshift(newNewsItem);

    // Keep only the latest 20 news items
    if (elizaNewsStore.length > 20) {
      elizaNewsStore = elizaNewsStore.slice(0, 20);
    }

    console.log('ElizaOS news update received:', newNewsItem);

    return NextResponse.json({
      success: true,
      message: 'News update received',
      newsItem: newNewsItem
    });

  } catch (error) {
    console.error('Error processing ElizaOS news update:', error);
    return NextResponse.json(
      { error: 'Failed to process news update' },
      { status: 500 }
    );
  }
}

function categorizeTweet(text: string): string {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('breaking') || lowerText.includes('urgent') || lowerText.includes('announcement')) {
    return 'breaking';
  }
  if (lowerText.includes('defi') || lowerText.includes('yield') || lowerText.includes('liquidity') || lowerText.includes('staking')) {
    return 'defi';
  }
  if (lowerText.includes('nft') || lowerText.includes('collection') || lowerText.includes('marketplace')) {
    return 'nft';
  }
  if (lowerText.includes('update') || lowerText.includes('upgrade') || lowerText.includes('protocol')) {
    return 'tech';
  }

  return 'breaking'; // Default category
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
}

function getFallbackNews(): LiveNewsItem[] {
  return [
    {
      id: 1,
      title: "Sui Network Achieves New Transaction Record",
      category: "breaking",
      time: "2 min ago",
      source: "Sui Official",
      urgent: true
    },
    {
      id: 2,
      title: "Major DeFi Protocol Launches on Sui Testnet",
      category: "defi",
      time: "15 min ago",
      source: "DeFi Pulse",
      urgent: false
    },
    {
      id: 3,
      title: "New NFT Marketplace Goes Live",
      category: "nft",
      time: "1 hour ago",
      source: "NFT News",
      urgent: false
    },
    {
      id: 4,
      title: "Sui Protocol Upgrade Successfully Deployed",
      category: "tech",
      time: "2 hours ago",
      source: "Sui Foundation",
      urgent: false
    }
  ];
}