"use client";

import React, { useState, useEffect } from 'react';
import { useCurrentWallet, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, CheckCircle, Clock } from 'lucide-react';
import { StreakCheckinContract, UserStreak } from '@/lib/contracts/streak-checkin';
import { toast } from 'sonner';

const StreakCard: React.FC = () => {
  const { currentWallet } = useCurrentWallet();
  const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const account = currentWallet?.accounts?.[0];
  const [streakData, setStreakData] = useState<UserStreak | null>(null);
  const [loading, setLoading] = useState(false);
  const [streakId, setStreakId] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // Load user's streak data on wallet connection
  useEffect(() => {
    console.log('Account changed:', account);
    if (account?.address) {
      loadStreakData();
    } else {
      setStreakData(null);
      setStreakId(null);
    }
  }, [account?.address]);

  const loadStreakData = async () => {
    if (!account?.address) return;

    try {
      console.log('Loading streak data for address:', account.address);
      const existingStreakId = await StreakCheckinContract.hasStreakObject(account.address);
      console.log('Existing streak ID:', existingStreakId);
      if (existingStreakId) {
        setStreakId(existingStreakId);
        const data = await StreakCheckinContract.getStreakData(existingStreakId);
        console.log('Streak data:', data);
        setStreakData(data);
      } else {
        console.log('No existing streak found');
        setStreakData(null);
      }
    } catch (error) {
      console.error('Error loading streak data:', error);
      setStreakData(null);
    }
  };

  const handleCreateStreak = async () => {
    if (!account?.address || !signAndExecuteTransaction) return;

    setLoading(true);
    try {
      console.log('Creating streak for address:', account.address);
      console.log('signAndExecuteTransaction type:', typeof signAndExecuteTransaction);
      console.log('signAndExecuteTransaction:', signAndExecuteTransaction);
      const tx = StreakCheckinContract.createStreakTransaction();
      const result = await signAndExecuteTransaction({
        transaction: tx,
      });
      console.log('Streak creation result:', result);
      toast.success('Streak tracker created! Start checking in daily.');
      await loadStreakData(); // Reload data
    } catch (error) {
      console.error('Error creating streak:', error);
      toast.error(`Failed to create streak tracker: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!streakId || !signAndExecuteTransaction) return;

    setLoading(true);
    try {
      const tx = StreakCheckinContract.checkInTransaction(streakId);
      const result = await signAndExecuteTransaction({
        transaction: tx,
      });
      toast.success('Checked in successfully! Keep up the streak!');
      await loadStreakData(); // Reload data
    } catch (error: any) {
      console.error('Error checking in:', error);
      if (error.message?.includes('EAlreadyCheckedInToday')) {
        toast.error('Already checked in today!');
      } else {
        toast.error('Failed to check in');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReward = async () => {
    if (!streakId || !signAndExecuteTransaction) return;

    setLoading(true);
    try {
      const tx = StreakCheckinContract.claimRewardTransaction(streakId);
      const result = await signAndExecuteTransaction({
        transaction: tx,
      });
      toast.success('NFT reward claimed! Congratulations on your 30-day streak!');
      await loadStreakData(); // Reload data
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast.error('Failed to claim reward');
    } finally {
      setLoading(false);
    }
  };

  // Generate calendar data for last 30 days
  const generateCalendarData = () => {
    if (!streakData) return [];

    const days = [];
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // This is a simplified version - in reality you'd need to track individual check-in dates
    // For now, we'll show a basic pattern based on current streak
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const isToday = i === 0;
      const isFuture = date > today;

      // Simplified: assume recent days are checked based on streak
      const daysFromToday = 29 - i;
      const isChecked = !isFuture && daysFromToday < streakData.current_streak;

      days.push({
        date,
        isChecked,
        isToday,
        isFuture,
      });
    }

    return days;
  };

  const calendarData = generateCalendarData();
  const daysUntilReward = Math.max(0, 30 - (streakData?.current_streak || 0));
  const canClaimReward = streakData && streakData.current_streak >= 30 && !streakData.reward_claimed;

  if (!account?.address) {
    return (
      <Card className="bg-slate-800/60 border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Daily Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 text-center">Connect your wallet to start your daily streak!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/60 border-slate-700/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Daily Streak
          </div>
          {streakData && (
            <Badge variant="secondary" className="bg-purple-600/50 text-white">
              {streakData.current_streak} days
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!streakData ? (
          <div className="text-center space-y-3">
            <p className="text-slate-400">Start your daily check-in streak!</p>
            <Button
              onClick={handleCreateStreak}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {loading ? 'Creating...' : 'Create Streak Tracker'}
            </Button>
          </div>
        ) : (
          <>
            {/* Streak Info */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{streakData.current_streak}</div>
                <div className="text-xs text-slate-400">Current Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{streakData.total_checkins}</div>
                <div className="text-xs text-slate-400">Total Check-ins</div>
              </div>
            </div>

            {/* Progress to Reward */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Progress to NFT Reward</span>
                <span className="text-white">{streakData.current_streak}/30</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((streakData.current_streak / 30) * 100, 100)}%` }}
                />
              </div>
              {daysUntilReward > 0 && (
                <p className="text-xs text-slate-400 text-center">
                  {daysUntilReward} days until NFT reward
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                onClick={handleCheckIn}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Checking in...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Check In Today
                  </>
                )}
              </Button>

              {canClaimReward && (
                <Button
                  onClick={handleClaimReward}
                  disabled={loading}
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Claim NFT Reward
                </Button>
              )}
            </div>

            {/* Calendar Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {showCalendar ? 'Hide' : 'View'} Calendar
            </Button>

            {/* Calendar Grid */}
            {showCalendar && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-white mb-3">Last 30 Days</h4>
                <div className="grid grid-cols-10 gap-1">
                  {calendarData.map((day, index) => (
                    <div
                      key={index}
                      className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs
                        ${day.isFuture ? 'bg-slate-600' :
                          day.isChecked ? 'bg-green-500' : 'bg-red-500'}
                        ${day.isToday ? 'ring-2 ring-white' : ''}
                      `}
                      title={day.date.toLocaleDateString()}
                    >
                      {day.isToday && '●'}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Checked In</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Missed</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StreakCard;