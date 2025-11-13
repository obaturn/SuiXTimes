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

export interface RegistryStats {
  total_users: number;
  total_rewards_claimed: number;
}

export interface CheckInResult {
  success: boolean;
  newStreak: number;
  message: string;
  events?: any[];
}

export interface ClaimResult {
  success: boolean;
  nftId?: string;
  message: string;
}