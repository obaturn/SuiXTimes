"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Users, TrendingUp, RefreshCw, X, Calendar, MapPin, Users as UsersIcon, FileText, ExternalLink } from 'lucide-react';
import { useDiscussions } from '@/hooks/use-discussions';
import { useSocket } from '@/hooks/use-socket';
import { useCurrentAccount } from '@mysten/dapp-kit';

interface Discussion {
  id: number;
  title: string;
  author: string;
  authorAddress: string;
  replies: number;
  views: number;
  category: string;
  content: string;
  replies_list: Reply[];
  timestamp: string;
  lastActivity: string;
}

interface Reply {
  id: number;
  author: string;
  authorAddress: string;
  content: string;
  timestamp: string;
}

const Events = () => {
  // Discussion functionality
  const { discussions, isLoading: discussionsLoading, error: discussionsError, createDiscussion, addReply } = useDiscussions();
  const account = useCurrentAccount();
  const { emitNewDiscussion, emitNewReply, onDiscussionCreated, onReplyAdded } = useSocket();

  const [newDiscussion, setNewDiscussion] = useState('');
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  const [newReply, setNewReply] = useState('');
  const [expandedDiscussions, setExpandedDiscussions] = useState<Set<number>>(new Set());

  // WebSocket event listeners
  useEffect(() => {
    onDiscussionCreated((discussion) => {
      // New discussion received - hook will refresh automatically
    });

    onReplyAdded((reply) => {
      // New reply received - hook will refresh automatically
    });
  }, [onDiscussionCreated, onReplyAdded]);

  const [groups, setGroups] = useState([
    {
      name: 'Sui Developers',
      members: '12.3k',
      description: 'For developers building on Sui.',
      joined: false,
      whatsappLink: 'https://chat.whatsapp.com/sui-developers-group',
      telegramLink: 'https://t.me/sui_developers'
    },
    {
      name: 'Sui NFT Collectors',
      members: '5.6k',
      description: 'For NFT enthusiasts and collectors.',
      joined: false,
      whatsappLink: 'https://chat.whatsapp.com/sui-nft-collectors',
      telegramLink: 'https://t.me/sui_nft_collectors'
    },
  ]);

  const handleJoinGroup = (groupName: string) => {
    const group = groups.find(g => g.name === groupName);
    if (group && !group.joined) {
      // Open WhatsApp group link
      window.open(group.whatsappLink, '_blank');
      // Update state to show joined
      setGroups(prev => prev.map(g =>
        g.name === groupName
          ? { ...g, joined: true, members: (parseInt(g.members) + 1) + 'k' }
          : g
      ));
    }
  };


  const trending = [
    'Sui 8192 game going viral',
    'New DeFi protocol launching next week',
    'Move vs. Rust: which is better for smart contracts?',
    'Sui mainnet upgrade completed successfully',
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Events & Community</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Calendar Section */}
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Sui Events Calendar</h2>
              <div className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 h-80 lg:h-96">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-2">Sui Events Calendar</h3>
                    <p className="text-slate-400 text-sm mb-4">Discover upcoming Sui ecosystem events</p>
                    <a
                      href="https://lu.ma/sui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors text-sm lg:text-base"
                    >
                      <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
                      View Events on Luma
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Browse all Sui ecosystem events on Luma. Events are managed by the Sui Foundation and community organizers.
              </p>
            </div>

            {/* Community Join Card */}
            <div className="w-full lg:w-80">
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Join Community</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20 rounded-lg p-3 lg:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Discord</h3>
                        <p className="text-slate-400 text-sm">Official Sui Community</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => window.open('https://discord.gg/sui', '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-sm lg:text-base"
                  >
                    Join Discord
                  </Button>
                </div>

                <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/20 rounded-lg p-3 lg:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">WhatsApp</h3>
                        <p className="text-slate-400 text-sm">Sui Updates & News</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => window.open('https://chat.whatsapp.com/BSq8BV4onTQ1YrbiW1fzxp?mode=r_t', '_blank')}
                    className="w-full bg-green-600 hover:bg-green-700 text-sm lg:text-base"
                  >
                    Join WhatsApp
                  </Button>
                </div>

                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/20 rounded-lg p-3 lg:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Telegram</h3>
                        <p className="text-slate-400 text-sm">Sui Announcements</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => window.open('https://t.me/+s3N-Ntd0GZ5mMjI0', '_blank')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-sm lg:text-base"
                  >
                    Join Telegram
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Discussions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Discussions</h2>
              <Button
                onClick={() => setShowDiscussionForm(!showDiscussionForm)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {showDiscussionForm ? 'Cancel' : '+ New Discussion'}
              </Button>
            </div>

            {showDiscussionForm && (
              <div className="mb-6 p-4 bg-slate-800/60 rounded-lg border border-slate-700/50">
                <h3 className="text-lg font-bold text-white mb-3">Start a New Discussion</h3>
                <textarea
                  value={newDiscussion}
                  onChange={(e) => setNewDiscussion(e.target.value)}
                  placeholder="What's your question or topic about Sui?"
                  className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
                  rows={3}
                />
                <Button
                  onClick={async () => {
                    if (newDiscussion.trim() && account?.address) {
                      try {
                        const newDisc = await createDiscussion(
                          newDiscussion,
                          newDiscussion,
                          'General',
                          account.address
                        );
                        emitNewDiscussion(newDisc);
                        setNewDiscussion('');
                        setShowDiscussionForm(false);
                      } catch (error) {
                        // Error handled by hook
                      }
                    }
                  }}
                  disabled={!account?.address}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                  Post Discussion
                </Button>
              </div>
            )}

            <div className="space-y-4">
              {discussionsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-4"></div>
                  <p className="text-slate-400">Loading discussions...</p>
                </div>
              ) : discussions.length > 0 ? discussions.map(discussion => (
                <div key={discussion.id} className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-xl lg:rounded-2xl overflow-hidden">
                  <div className="p-3 lg:p-4 border-b border-slate-700/50">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-bold text-white mb-2 break-words">{discussion.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 lg:gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <div className="w-5 h-5 lg:w-6 lg:h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                              {discussion.author.charAt(0).toUpperCase()}
                            </div>
                            <span className="truncate">{discussion.author}</span>
                          </span>
                          <span className="hidden sm:inline">in #{discussion.category}</span>
                          <span className="text-xs lg:text-sm">{new Date(discussion.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newExpanded = new Set(expandedDiscussions);
                          if (newExpanded.has(discussion.id)) {
                            newExpanded.delete(discussion.id);
                          } else {
                            newExpanded.add(discussion.id);
                          }
                          setExpandedDiscussions(newExpanded);
                        }}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 self-start text-sm"
                      >
                        {expandedDiscussions.has(discussion.id) ? 'Hide' : 'View'} Thread
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 lg:p-4">
                    <div className="flex gap-3">
                      <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {discussion.author.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-slate-700/50 rounded-xl lg:rounded-2xl px-3 lg:px-4 py-2 lg:py-3 mb-3">
                          <p className="text-slate-200 text-sm lg:text-base break-words">{discussion.content}</p>
                        </div>
                        <div className="flex items-center gap-3 lg:gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            💬 {discussion.replies} replies
                          </span>
                          <span className="flex items-center gap-1">
                            👁️ {discussion.views}k views
                          </span>
                        </div>
                      </div>
                    </div>

                    {expandedDiscussions.has(discussion.id) && (
                      <div className="mt-4 lg:mt-6 space-y-3 lg:space-y-4">
                        {discussion.replies_list.map(reply => (
                          <div key={reply.id} className="flex gap-2 lg:gap-3 ml-6 lg:ml-8">
                            <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {reply.author.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="bg-slate-700/30 rounded-lg lg:rounded-xl px-2 lg:px-3 py-2">
                                <div className="flex flex-wrap items-center gap-1 lg:gap-2 mb-1">
                                  <span className="font-medium text-green-400 text-sm">{reply.author}</span>
                                  <span className="text-xs text-slate-500">{new Date(reply.timestamp).toLocaleString()}</span>
                                </div>
                                <p className="text-slate-300 text-sm break-words">{reply.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {selectedDiscussion === discussion.id ? (
                          <div className="ml-6 lg:ml-8 mt-3 lg:mt-4">
                            <div className="flex gap-2 lg:gap-3">
                              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                Y
                              </div>
                              <div className="flex-1 min-w-0">
                                <textarea
                                  value={newReply}
                                  onChange={(e) => setNewReply(e.target.value)}
                                  placeholder="Write your reply..."
                                  className="w-full p-2 lg:p-3 bg-slate-700/50 border border-slate-600 rounded-lg lg:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2 resize-none text-sm"
                                  rows={2}
                                />
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <Button
                                    size="sm"
                                    onClick={async () => {
                                      if (newReply.trim() && account?.address) {
                                        try {
                                          const newReplyData = await addReply(discussion.id, newReply, account.address);
                                          emitNewReply(discussion.id, newReplyData);
                                          setNewReply('');
                                          setSelectedDiscussion(null);
                                        } catch (error) {
                                          // Error handled by hook
                                        }
                                      }
                                    }}
                                    disabled={!account?.address}
                                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-sm"
                                  >
                                    Reply
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedDiscussion(null);
                                      setNewReply('');
                                    }}
                                    className="border-slate-600 text-slate-300 hover:bg-slate-700 text-sm"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="ml-6 lg:ml-8">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedDiscussion(discussion.id)}
                              className="text-purple-400 hover:text-purple-300 hover:bg-purple-600/10 text-sm"
                            >
                              💬 Reply to this discussion
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No discussions yet. Be the first to start one!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* Trending Topics */}
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Trending Now</h2>
            <div className="space-y-3">
              {trending.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm">
                  <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <p className="text-slate-300 break-words">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Community Guidelines */}
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Community Guidelines</h2>
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
        </div>
      </div>
    </div>
  );
};

export default Events;