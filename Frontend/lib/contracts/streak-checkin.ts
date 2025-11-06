import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { bcs } from '@mysten/sui/bcs';

// Contract addresses from .env
const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID!;
const STREAK_REGISTRY = process.env.NEXT_PUBLIC_STREAK_REGISTRY!;

// Initialize Sui client
const network = (process.env.NEXT_PUBLIC_NETWORK as "mainnet" | "testnet" | "devnet" | "localnet") || "testnet";
const suiClient = new SuiClient({
    url: getFullnodeUrl(network),
});

// Types
export interface UserStreak {
  id: string;
  owner: string;
  current_streak: number;
  last_checkin_time: number;
  total_checkins: number;
  reward_claimed: boolean;
  created_at: number;
}

export interface StreakNFT {
  id: string;
  name: string;
  description: string;
  image_url: string;
  streak_count: number;
  completion_date: number;
  owner: string;
}

// Contract interaction functions
export class StreakCheckinContract {
  /**
   * Create a transaction for streak creation (for use with hooks)
   */
  static createStreakTransaction(registryId: string = STREAK_REGISTRY) {
    const tx = new Transaction();

    tx.moveCall({
      target: `${PACKAGE_ID}::streak_checkin::create_streak`,
      arguments: [
        tx.object(registryId),
        tx.object('0x6'), // Clock object
      ],
    });

    return tx;
  }
  /**
   * Create a new streak tracker for a user
   */
  static async createStreak(
    signer: any,
    registryId: string = STREAK_REGISTRY
  ) {
    const tx = new Transaction();

    tx.moveCall({
      target: `${PACKAGE_ID}::streak_checkin::create_streak`,
      arguments: [
        tx.object(registryId),
        tx.object('0x6'), // Clock object
      ],
    });

    const result = await signer.signAndExecuteTransaction({
      transaction: tx,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });

    return result;
  }

  /**
   * Create a transaction for check-in (for use with hooks)
   */
  static checkInTransaction(streakId: string) {
    const tx = new Transaction();

    tx.moveCall({
      target: `${PACKAGE_ID}::streak_checkin::check_in`,
      arguments: [
        tx.object(streakId),
        tx.object('0x6'), // Clock object
      ],
    });

    return tx;
  }

  /**
   * Check in for the day
   */
  static async checkIn(
    signAndExecuteTransaction: any,
    streakId: string
  ) {
    const tx = this.checkInTransaction(streakId);

    const result = await signAndExecuteTransaction({
      transaction: tx,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });

    return result;
  }

  /**
   * Create a transaction for claiming reward (for use with hooks)
   */
  static claimRewardTransaction(streakId: string, registryId: string = STREAK_REGISTRY) {
    const tx = new Transaction();

    tx.moveCall({
      target: `${PACKAGE_ID}::streak_checkin::claim_reward`,
      arguments: [
        tx.object(streakId),
        tx.object(registryId),
        tx.object('0x6'), // Clock object
      ],
    });

    return tx;
  }

  /**
   * Claim NFT reward after 30-day streak
   */
  static async claimReward(
    signAndExecuteTransaction: any,
    streakId: string,
    registryId: string = STREAK_REGISTRY
  ) {
    const tx = this.claimRewardTransaction(streakId, registryId);

    const result = await signAndExecuteTransaction({
      transaction: tx,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });

    return result;
  }

  /**
   * Get user's streak data
   */
  static async getStreakData(streakId: string): Promise<UserStreak> {
    const object = await suiClient.getObject({
      id: streakId,
      options: {
        showContent: true,
      },
    });

    if (!object.data?.content || object.data.content.dataType !== 'moveObject') {
      throw new Error('Invalid streak object');
    }

    const fields = (object.data.content as any).fields;
    return {
      id: streakId,
      owner: fields.owner,
      current_streak: Number(fields.current_streak),
      last_checkin_time: Number(fields.last_checkin_time),
      total_checkins: Number(fields.total_checkins),
      reward_claimed: fields.reward_claimed,
      created_at: Number(fields.created_at),
    };
  }

  /**
   * Check if user has a streak object
   */
  static async hasStreakObject(ownerAddress: string): Promise<string | null> {
    try {
      const objects = await suiClient.getOwnedObjects({
        owner: ownerAddress,
        filter: {
          StructType: `${PACKAGE_ID}::streak_checkin::UserStreak`,
        },
        options: {
          showContent: true,
        },
      });

      if (objects.data.length > 0) {
        return objects.data[0].data?.objectId || null;
      }

      return null;
    } catch (error) {
      console.error('Error checking for streak object:', error);
      return null;
    }
  }

  /**
   * Get registry statistics
   */
  static async getRegistryStats(registryId: string = STREAK_REGISTRY) {
    const object = await suiClient.getObject({
      id: registryId,
      options: {
        showContent: true,
      },
    });

    if (!object.data?.content || object.data.content.dataType !== 'moveObject') {
      throw new Error('Invalid registry object');
    }

    const fields = (object.data.content as any).fields;
    return {
      total_users: Number(fields.total_users),
      total_rewards_claimed: Number(fields.total_rewards_claimed),
    };
  }

  /**
   * Check if user is eligible for reward
   */
  static async isEligibleForReward(streakData: UserStreak): Promise<boolean> {
    return streakData.current_streak >= 30 && !streakData.reward_claimed;
  }

  /**
   * Get user's NFTs
   */
  static async getUserNFTs(ownerAddress: string): Promise<StreakNFT[]> {
    try {
      const objects = await suiClient.getOwnedObjects({
        owner: ownerAddress,
        filter: {
          StructType: `${PACKAGE_ID}::streak_checkin::StreakNFT`,
        },
        options: {
          showContent: true,
        },
      });

      return objects.data.map(obj => {
        const fields = (obj.data?.content as any).fields;
        return {
          id: obj.data?.objectId || '',
          name: fields.name,
          description: fields.description,
          image_url: fields.image_url.fields.url || '',
          streak_count: Number(fields.streak_count),
          completion_date: Number(fields.completion_date),
          owner: fields.owner,
        };
      });
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
  }
}