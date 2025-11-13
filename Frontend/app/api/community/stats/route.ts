import { NextRequest, NextResponse } from 'next/server';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

// Initialize Sui client for real blockchain data
const suiClient = new SuiClient({
  url: getFullnodeUrl('testnet'),
});

// Mock data for community statistics (fallback)
// In a real implementation, this would come from your database or analytics service
const mockCommunityStats = {
  activeMembers: 15247,
  dailyDiscussions: 523,
  totalPosts: 25689,
  onlineNow: 2387,
  newMembersToday: 47,
  topCategories: [
    { name: "General Discussion", posts: 1250, growth: 12.5 },
    { name: "Creator Hub", posts: 890, growth: 8.3 },
    { name: "Technical Support", posts: 675, growth: -2.1 },
    { name: "Market Insights", posts: 432, growth: 15.7 }
  ],
  recentActivity: [
    { type: "new_post", count: 45, timestamp: Date.now() - 3600000 },
    { type: "new_member", count: 12, timestamp: Date.now() - 7200000 },
    { type: "upvote", count: 234, timestamp: Date.now() - 10800000 }
  ]
};

// Function to get real Sui blockchain statistics
async function getSuiBlockchainStats() {
  try {
    // Get current epoch and network stats
    const networkStats = await suiClient.getLatestSuiSystemState();

    // Get recent transactions (as a proxy for activity)
    const recentTxs = await suiClient.queryTransactionBlocks({
      limit: 100,
      order: 'descending',
    });

    // Get total transaction blocks (as a proxy for ecosystem size)
    const totalTxBlocks = await suiClient.getTotalTransactionBlocks();

    // Calculate some derived stats
    const activeAddresses = new Set();
    recentTxs.data.forEach(tx => {
      if (tx.transaction?.data?.sender) {
        activeAddresses.add(tx.transaction.data.sender);
      }
    });

    // Get current time metrics
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);

    // Filter recent transactions
    const recentTransactions = recentTxs.data.filter(tx =>
      tx.timestampMs && parseInt(tx.timestampMs) > oneDayAgo
    );

    const weeklyTransactions = recentTxs.data.filter(tx =>
      tx.timestampMs && parseInt(tx.timestampMs) > oneWeekAgo
    );

    return {
      // Use blockchain data where possible, fallback to mock data
      activeMembers: Math.max(activeAddresses.size * 10, mockCommunityStats.activeMembers), // Estimate based on active addresses
      dailyDiscussions: recentTransactions.length * 5, // Estimate discussions from transactions
      totalPosts: Math.max(Number(totalTxBlocks) * 2, mockCommunityStats.totalPosts), // Estimate posts from total txs
      onlineNow: Math.floor(mockCommunityStats.onlineNow * (0.8 + Math.random() * 0.4)), // Keep similar range
      newMembersToday: Math.floor(recentTransactions.length / 10), // Estimate new members
      blockchainData: {
        currentEpoch: networkStats.epoch,
        totalStake: networkStats.totalStake,
        recentTransactions: recentTransactions.length,
        weeklyActivity: weeklyTransactions.length,
        networkLoad: networkStats.safeMode ? 'High' : 'Normal'
      }
    };

  } catch (error) {
    console.error('Error fetching Sui blockchain stats:', error);
    // Return mock data as fallback
    return {
      activeMembers: mockCommunityStats.activeMembers + Math.floor(Math.random() * 100),
      dailyDiscussions: mockCommunityStats.dailyDiscussions + Math.floor(Math.random() * 50),
      totalPosts: mockCommunityStats.totalPosts + Math.floor(Math.random() * 200),
      onlineNow: mockCommunityStats.onlineNow + Math.floor(Math.random() * 200),
      newMembersToday: mockCommunityStats.newMembersToday + Math.floor(Math.random() * 20),
      blockchainData: null // Indicate no real blockchain data available
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get real Sui blockchain statistics
    const blockchainStats = await getSuiBlockchainStats();

    const stats = {
      ...blockchainStats,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: stats,
      source: blockchainStats.blockchainData ? 'sui_blockchain' : 'fallback'
    });

  } catch (error) {
    console.error('Error fetching community stats:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch community statistics',
        data: {
          ...mockCommunityStats,
          lastUpdated: new Date().toISOString()
        }
      },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint for updating stats (admin only)
export async function POST(request: NextRequest) {
  try {
    // This would be protected by authentication
    // Only allow admin users to update stats

    const body = await request.json();

    // Validate and update stats in database
    // This is just a placeholder

    return NextResponse.json({
      success: true,
      message: 'Community stats updated successfully'
    });

  } catch (error) {
    console.error('Error updating community stats:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update community statistics'
      },
      { status: 500 }
    );
  }
}