"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Users, TrendingUp, RefreshCw, Trophy, Target, Zap, Heart, Send, Smile } from 'lucide-react';
import { useSocket } from '@/hooks/use-socket';

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  avatar?: string;
}

const Community = () => {
  const [activeTab, setActiveTab] = useState<'discussions' | 'chat'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'SuiBot',
      message: 'Welcome to the Sui Community Chat! Feel free to discuss anything related to Sui blockchain.',
      timestamp: new Date(Date.now() - 3600000),
      avatar: '🤖'
    },
    {
      id: '2',
      user: 'Alice',
      message: 'Just deployed my first smart contract on Sui! 🎉',
      timestamp: new Date(Date.now() - 1800000),
      avatar: '👩‍💻'
    },
    {
      id: '3',
      user: 'Bob',
      message: 'Congrats Alice! What kind of contract did you build?',
      timestamp: new Date(Date.now() - 900000),
      avatar: '👨‍🔬'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { emitMessage, onMessageReceived } = useSocket();

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Satoshi', points: 2847, badge: '🏆', level: 'Legend' },
    { rank: 2, name: 'Alice', points: 2156, badge: '🥈', level: 'Master' },
    { rank: 3, name: 'Bob', points: 1892, badge: '🥉', level: 'Expert' },
    { rank: 4, name: 'Charlie', points: 1543, badge: '⭐', level: 'Advanced' },
    { rank: 5, name: 'Diana', points: 1289, badge: '🌟', level: 'Advanced' },
  ]);

  const [achievements, setAchievements] = useState([
    { icon: '🚀', title: 'First Transaction', description: 'Complete your first Sui transaction', unlocked: true },
    { icon: '💰', title: 'DeFi Explorer', description: 'Try 5 different DeFi protocols', unlocked: true },
    { icon: '🎨', title: 'NFT Collector', description: 'Own 10 different NFTs', unlocked: false },
    { icon: '🏗️', title: 'Builder', description: 'Deploy your first smart contract', unlocked: false },
    { icon: '👥', title: 'Community Helper', description: 'Help 50 community members', unlocked: true },
  ]);

  const [stats, setStats] = useState({
    totalMembers: '45.2k',
    activeToday: '8.7k',
    discussionsToday: 342,
    messagesToday: 1250
  });

  const discussions = [
    { title: 'What are your favorite dApps on Sui?', author: 'Satoshi', replies: 23, views: 1.2, category: 'dApps', trending: true },
    { title: 'How to get started with Move development?', author: 'Builder', replies: 15, views: 897, category: 'Development', trending: false },
    { title: 'Sui staking rewards discussion', author: 'Validator', replies: 31, views: 2.1, category: 'Staking', trending: true },
  ];

  const trending = [
    'Sui 8192 game going viral',
    'New DeFi protocol launching next week',
    'Move vs. Rust: which is better for smart contracts?',
    'Sui mainnet upgrade completed successfully',
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Listen for incoming messages
  useEffect(() => {
    onMessageReceived((message: Message) => {
      setMessages(prev => [...prev, message]);
    });
  }, [onMessageReceived]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: 'You',
        message: newMessage.trim(),
        timestamp: new Date(),
        avatar: '👤'
      };

      setMessages(prev => [...prev, message]);
      emitMessage(message);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Community Hub</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-800/60 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'chat'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          💬 Live Chat
        </button>
        <button
          onClick={() => setActiveTab('discussions')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'discussions'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          📝 Discussions
        </button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">Total Members</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalMembers}</div>
        </div>

        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Active Today</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.activeToday}</div>
        </div>

        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-medium">Discussions</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.discussionsToday}</div>
        </div>

        <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-medium">Events</span>
          </div>
          <div className="text-2xl font-bold text-white">{stats.eventsThisMonth}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {activeTab === 'chat' ? (
            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-700/50">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Sui Community Chat
                </h2>
                <p className="text-sm text-slate-400">{stats.totalMembers} members online</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                      {msg.avatar || msg.user.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{msg.user}</span>
                        <span className="text-xs text-slate-500">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-700/50">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Leaderboard */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  Community Leaderboard
                </h2>
                <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-slate-700/50">
                    <p className="text-slate-300">Top contributors this month</p>
                  </div>
                  <div className="divide-y divide-slate-700/30">
                    {leaderboard.map((user) => (
                      <div key={user.rank} className="p-4 flex items-center justify-between hover:bg-slate-700/20 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                            {user.rank}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{user.badge}</span>
                            <div>
                              <p className="font-bold text-white">{user.name}</p>
                              <p className="text-sm text-slate-400">{user.level}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">{user.points.toLocaleString()}</p>
                          <p className="text-sm text-slate-400">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-400" />
                  Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`p-4 rounded-lg border backdrop-blur-md transition-all ${
                      achievement.unlocked
                        ? 'bg-green-600/10 border-green-500/20'
                        : 'bg-slate-800/60 border-slate-700/50'
                    }`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div className={`w-3 h-3 rounded-full ${achievement.unlocked ? 'bg-green-400' : 'bg-slate-500'}`}></div>
                      </div>
                      <h3 className={`font-bold mb-1 ${achievement.unlocked ? 'text-green-400' : 'text-slate-300'}`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-slate-400">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Discussions */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Recent Discussions</h2>
                <div className="space-y-4">
                  {discussions.map(discussion => (
                    <div key={discussion.title} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-bold text-white text-lg">{discussion.title}</p>
                            {discussion.trending && (
                              <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full font-medium">
                                🔥 Trending
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mb-3">by {discussion.author} in <span className="font-semibold text-purple-400">#{discussion.category}</span></p>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span>💬 {discussion.replies} replies</span>
                            <span>👁️ {discussion.views}k views</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Trending Topics */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Trending Now</h2>
            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-4">
              <div className="space-y-3">
                {trending.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 text-sm">
                    <TrendingUp className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                    <p className="text-slate-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Community Guidelines</h2>
            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-4">
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <p>Be respectful and constructive in discussions</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <p>Share knowledge and help fellow community members</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <p>Report spam and inappropriate content</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <p>Follow Sui's code of conduct</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Discussion
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start">
                <Users className="w-4 h-4 mr-2" />
                Join Telegram Group
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start">
                <Trophy className="w-4 h-4 mr-2" />
                View My Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;