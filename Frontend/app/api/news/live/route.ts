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

// Live news templates for simulation
const liveNewsTemplates = [
  {
    title: "Sui TPS Reaches {tps} Transactions Per Second",
    category: "performance",
    urgent: false
  },
  {
    title: "New DeFi Protocol Integrates Sui Blockchain",
    category: "defi",
    urgent: false
  },
  {
    title: "Sui Community Grows by {growth}% This Month",
    category: "community",
    urgent: false
  },
  {
    title: "BREAKING: Major Partnership Announced for Sui Ecosystem",
    category: "breaking",
    urgent: true
  },
  {
    title: "NFT Sales Volume Hits Record High on Sui",
    category: "nft",
    urgent: false
  },
  {
    title: "Sui Gas Fees Reduced by {reduction}%",
    category: "tech",
    urgent: false
  },
  {
    title: "New Developer Tool Released for Sui Network",
    category: "development",
    urgent: false
  },
  {
    title: "Institutional Investor Commits ${amount}M to Sui Projects",
    category: "investment",
    urgent: true
  }
];

// Initialize live news simulation
let simulationInterval: NodeJS.Timeout | null = null;

function startLiveNewsSimulation() {
  if (simulationInterval) return; // Already running

  console.log('🚀 Starting ElizaOS Live News Simulation');

  simulationInterval = setInterval(() => {
    // Generate new news item
    const template = liveNewsTemplates[Math.floor(Math.random() * liveNewsTemplates.length)];
    let title = template.title;

    // Replace placeholders with random values
    if (title.includes('{tps}')) {
      const tps = Math.floor(Math.random() * 500) + 1000;
      title = title.replace('{tps}', tps.toString());
    }
    if (title.includes('{growth}')) {
      const growth = Math.floor(Math.random() * 50) + 10;
      title = title.replace('{growth}', growth.toString());
    }
    if (title.includes('{reduction}')) {
      const reduction = Math.floor(Math.random() * 30) + 10;
      title = title.replace('{reduction}', reduction.toString());
    }
    if (title.includes('{amount}')) {
      const amount = Math.floor(Math.random() * 50) + 10;
      title = title.replace('{amount}', amount.toString());
    }

    const newNewsItem: LiveNewsItem = {
      id: Date.now(),
      title,
      category: template.category,
      time: 'Just now',
      source: 'ElizaOS Agent',
      urgent: template.urgent
    };

    // Add to the beginning of the array
    elizaNewsStore.unshift(newNewsItem);

    // Keep only the latest 20 news items
    if (elizaNewsStore.length > 20) {
      elizaNewsStore = elizaNewsStore.slice(0, 20);
    }

    console.log('📰 ElizaOS Live News: Generated new update -', title);

  }, 45000); // Generate new news every 45 seconds
}

function stopLiveNewsSimulation() {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
    console.log('⏹️ Stopped ElizaOS Live News Simulation');
  }
}

// Start simulation when module loads
if (typeof globalThis !== 'undefined') {
  // Generate a few initial news items immediately
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const template = liveNewsTemplates[Math.floor(Math.random() * liveNewsTemplates.length)];
        let title = template.title;

        // Replace placeholders with random values
        if (title.includes('{tps}')) {
          const tps = Math.floor(Math.random() * 500) + 1000;
          title = title.replace('{tps}', tps.toString());
        }
        if (title.includes('{growth}')) {
          const growth = Math.floor(Math.random() * 50) + 10;
          title = title.replace('{growth}', growth.toString());
        }
        if (title.includes('{reduction}')) {
          const reduction = Math.floor(Math.random() * 30) + 10;
          title = title.replace('{reduction}', reduction.toString());
        }
        if (title.includes('{amount}')) {
          const amount = Math.floor(Math.random() * 50) + 10;
          title = title.replace('{amount}', amount.toString());
        }

        const newNewsItem: LiveNewsItem = {
          id: Date.now() + i,
          title,
          category: template.category,
          time: 'Just now',
          source: 'ElizaOS Agent',
          urgent: template.urgent
        };

        elizaNewsStore.unshift(newNewsItem);
        if (elizaNewsStore.length > 20) {
          elizaNewsStore = elizaNewsStore.slice(0, 20);
        }

        console.log('📰 ElizaOS Live News: Initial update -', title);
      }, i * 2000); // Stagger initial news generation
    }
  }, 1000);

  startLiveNewsSimulation();
}

export async function GET() {
  try {
    // Update timestamps for existing news items to make them appear more dynamic
    const now = Date.now();
    elizaNewsStore = elizaNewsStore.map(item => {
      if (item.time === 'Just now') {
        // Keep "Just now" for very recent items
        return item;
      }

      // For items with "X min ago", update the time
      const minMatch = item.time.match(/(\d+)\s+min\s+ago/);
      if (minMatch) {
        const minutes = parseInt(minMatch[1]) + 1; // Add 1 minute
        return { ...item, time: `${minutes} min ago` };
      }

      const hourMatch = item.time.match(/(\d+)\s+hour/);
      if (hourMatch) {
        const hours = parseInt(hourMatch[1]);
        if (hours < 24) {
          return { ...item, time: `${hours + 1} hour${hours + 1 > 1 ? 's' : ''} ago` };
        }
      }

      return item;
    });

    console.log('📖 Frontend fetching ElizaOS news, current store:', {
      count: elizaNewsStore.length,
      latest: elizaNewsStore.slice(0, 2).map(item => ({
        id: item.id,
        title: item.title.substring(0, 30) + '...',
        time: item.time,
        source: item.source
      }))
    });

    // Return current ElizaOS news
    return NextResponse.json(elizaNewsStore);
  } catch (error) {
    console.error('❌ Error fetching ElizaOS news:', error);
    return NextResponse.json(getFallbackNews());
  }
}

// POST endpoint for ElizaOS agent to submit news updates
export async function POST(request: NextRequest) {
  try {
    console.log('🔄 ElizaOS news update request received');
    const newsUpdate = await request.json();
    console.log('📨 Raw news update data:', JSON.stringify(newsUpdate, null, 2));

    // Validate the news update structure
    if (!newsUpdate.title || !newsUpdate.category || !newsUpdate.source) {
      console.error('❌ Invalid news update format - missing required fields:', {
        hasTitle: !!newsUpdate.title,
        hasCategory: !!newsUpdate.category,
        hasSource: !!newsUpdate.source
      });
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

    console.log('✅ ElizaOS news update processed successfully:', {
      id: newNewsItem.id,
      title: newNewsItem.title.substring(0, 50) + '...',
      category: newNewsItem.category,
      source: newNewsItem.source,
      totalStored: elizaNewsStore.length
    });

    return NextResponse.json({
      success: true,
      message: 'News update received',
      newsItem: newNewsItem
    });

  } catch (error) {
    console.error('❌ Error processing ElizaOS news update:', error);
    return NextResponse.json(
      { error: 'Failed to process news update' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to stop the simulation (for maintenance)
export async function DELETE() {
  try {
    stopLiveNewsSimulation();
    return NextResponse.json({
      success: true,
      message: 'ElizaOS Live News Simulation stopped'
    });
  } catch (error) {
    console.error('❌ Error stopping simulation:', error);
    return NextResponse.json(
      { error: 'Failed to stop simulation' },
      { status: 500 }
    );
  }
}

// PUT endpoint to manually trigger a news update (for testing)
export async function PUT() {
  try {
    const template = liveNewsTemplates[Math.floor(Math.random() * liveNewsTemplates.length)];
    let title = template.title;

    // Replace placeholders with random values
    if (title.includes('{tps}')) {
      const tps = Math.floor(Math.random() * 500) + 1000;
      title = title.replace('{tps}', tps.toString());
    }
    if (title.includes('{growth}')) {
      const growth = Math.floor(Math.random() * 50) + 10;
      title = title.replace('{growth}', growth.toString());
    }
    if (title.includes('{reduction}')) {
      const reduction = Math.floor(Math.random() * 30) + 10;
      title = title.replace('{reduction}', reduction.toString());
    }
    if (title.includes('{amount}')) {
      const amount = Math.floor(Math.random() * 50) + 10;
      title = title.replace('{amount}', amount.toString());
    }

    const newNewsItem: LiveNewsItem = {
      id: Date.now(),
      title,
      category: template.category,
      time: 'Just now',
      source: 'ElizaOS Agent',
      urgent: template.urgent
    };

    elizaNewsStore.unshift(newNewsItem);
    if (elizaNewsStore.length > 20) {
      elizaNewsStore = elizaNewsStore.slice(0, 20);
    }

    console.log('📰 ElizaOS Live News: Manual update triggered -', title);

    return NextResponse.json({
      success: true,
      message: 'Manual news update triggered',
      newsItem: newNewsItem
    });

  } catch (error) {
    console.error('❌ Error triggering manual news update:', error);
    return NextResponse.json(
      { error: 'Failed to trigger news update' },
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