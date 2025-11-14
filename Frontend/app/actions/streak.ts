"use server";

import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

export async function getUserStreak(address: string): Promise<number> {
  const packageId = process.env.NEXT_PUBLIC_PACKAGE_ID;
  const network = (process.env.NEXT_PUBLIC_NETWORK as "mainnet" | "testnet" | "devnet" | "localnet") || "testnet";

  if (!packageId) {
    // Fallback to mock data if env vars not set
    return Math.floor(Math.random() * 30) + 1;
  }

  try {
    const client = new SuiClient({ url: getFullnodeUrl(network) });

    // Get all objects owned by the user
    const ownedObjects = await client.getOwnedObjects({
      owner: address,
      options: { showType: true, showContent: true },
    });

    // Find the UserStreak object
    const userStreakObject = ownedObjects.data.find(obj =>
      obj.data?.type === `${packageId}::streak_checkin::UserStreak`
    );

    if (!userStreakObject?.data?.content) {
      return 0; // No streak object found
    }

    // Extract the current_streak field
    const content = userStreakObject.data.content as any;
    const currentStreak = content.fields?.current_streak;

    return typeof currentStreak === 'number' ? currentStreak : 0;
  } catch (error) {
    console.error('Failed to fetch streak:', error);
    return 0;
  }
}