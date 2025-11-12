"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Users, TrendingUp, RefreshCw, X, Calendar, MapPin, Users as UsersIcon, FileText, ExternalLink } from 'lucide-react';

interface FeaturedEvent {
  title: string;
  date: string;
  image: string;
  description: string;
  location: string;
  type: string;
  attendees: string;
  url?: string;
}

interface Discussion {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
  category: string;
  content: string;
  replies_list: Reply[];
  expanded: boolean;
  timestamp: Date;
}

interface Reply {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

const Events = () => {
  // Removed blog events integration - keeping it simple with Luma link

  const defaultDiscussions: Discussion[] = [
    {
      id: 1,
      title: 'What are your favorite dApps on Sui?',
      author: 'Satoshi',
      replies: 23,
      views: 1.2,
      category: 'dApps',
      content: 'I\'ve been exploring Sui ecosystem and I\'m curious about what dApps everyone is using. What are your top picks?',
      replies_list: [
        { id: 1, author: 'Alice', content: 'Definitely Turbos Finance for DEX trading!', timestamp: '2h ago' },
        { id: 2, author: 'Bob', content: 'Check out SuiFrens for NFT marketplace', timestamp: '1h ago' }
      ],
      expanded: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: 2,
      title: 'How to get started with Move development?',
      author: 'Builder',
      replies: 15,
      views: 897,
      category: 'Development',
      content: 'I\'m new to Sui and want to start building. What resources would you recommend for learning Move?',
      replies_list: [
        { id: 3, author: 'DevExpert', content: 'Start with the Sui documentation and Move book', timestamp: '3h ago' }
      ],
      expanded: false,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
    },
  ];

  const [discussions, setDiscussions] = useState<Discussion[]>(defaultDiscussions);

  const [newDiscussion, setNewDiscussion] = useState('');
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  const [newReply, setNewReply] = useState('');

  // Load discussions from localStorage on mount
  useEffect(() => {
    const savedDiscussions = localStorage.getItem('sui-discussions');
    if (savedDiscussions) {
      try {
        const parsed = JSON.parse(savedDiscussions);
        // Convert timestamp strings back to Date objects
        const discussionsWithDates = parsed.map((d: any) => ({
          ...d,
          timestamp: new Date(d.timestamp)
        }));
        setDiscussions(discussionsWithDates);
      } catch (error) {
        console.error('Error loading discussions:', error);
        setDiscussions(defaultDiscussions);
      }
    }
  }, []);

  // Save discussions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sui-discussions', JSON.stringify(discussions));
  }, [discussions]);

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

  // Calculate trending topics from discussions
  const getTrendingTopics = () => {
    const wordCount: { [key: string]: number } = {};

    discussions.forEach(discussion => {
      const words = discussion.title.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 3 && !['what', 'how', 'why', 'when', 'where', 'sui', 'the', 'and', 'for', 'are', 'you', 'your', 'with', 'this', 'that'].includes(word)) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });
    });

    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([topic]) => topic.charAt(0).toUpperCase() + topic.slice(1));
  };

  const trending = getTrendingTopics().length > 0 ? getTrendingTopics() : [
    'Sui 8192 game going viral',
    'New DeFi protocol launching next week',
    'Move vs. Rust: which is better for smart contracts?',
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
                      <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-2">Sui Events Calendar</h3>
                    <p className="text-slate-400 text-sm mb-4">Discover upcoming Sui ecosystem events</p>
                    <a
                      href="https://lu.ma/sui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-medium transition-colors text-sm lg:text-base"
                    >
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
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
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.036 10.204c-.143 0-.27.048-.382.143-.112.095-.168.21-.168.346 0 .136.056.251.168.346.112.095.24.143.382.143.143 0 .27-.048.382-.143.112-.095.168-.21.168-.346 0-.136-.056-.251-.168-.346-.112-.095-.24-.143-.382-.143zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
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
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m3.732-14.34H5.365c-1.202 0-2.176.972-2.176 2.174v13.647c0 1.202.974 2.173 2.176 2.173h13.646c1.202 0 2.176-.971 2.176-2.173V5.226c0-1.202-.974-2.174-2.176-2.174"/>
                        </svg>
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
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12.01 12.01 0 0 0-.056 0zm4.962 7.224c-.1-.002-.321.023-.465.14a.506.506 0 0 0-.171.325c.016.093.073.285.173.372.082.071.23.054.324.054.3 0 .537-.237.537-.537 0-.3-.237-.537-.537-.537zm-4.35 1.446c-.672 0-1.37.2-1.37 1.07 0 .537.168 1.117.675 1.462.56.354 1.32.34 1.87.125.34-.13.645-.394.645-.78 0-.666-.666-.877-1.82-.877zm4.03 1.446c-.672 0-1.37.2-1.37 1.07 0 .537.168 1.117.675 1.462.56.354 1.32.34 1.87.125.34-.13.645-.394.645-.78 0-.666-.666-.877-1.82-.877z"/>
                        </svg>
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
                  onClick={() => {
                    if (newDiscussion.trim()) {
                      const newDisc: Discussion = {
                        id: Date.now(),
                        title: newDiscussion,
                        author: 'You', // In real app, get from wallet
                        replies: 0,
                        views: 0,
                        category: 'General',
                        content: newDiscussion,
                        replies_list: [],
                        expanded: false,
                        timestamp: new Date()
                      };
                      setDiscussions(prev => [newDisc, ...prev]);
                      setNewDiscussion('');
                      setShowDiscussionForm(false);
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Post Discussion
                </Button>
              </div>
            )}

            <div className="space-y-4 lg:space-y-6">
              {discussions.map(discussion => (
                <div key={discussion.id} className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-xl lg:rounded-2xl overflow-hidden">
                  {/* Discussion Header */}
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
                        onClick={() => setDiscussions(prev => prev.map(d =>
                          d.id === discussion.id ? { ...d, expanded: !d.expanded } : d
                        ))}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 self-start text-sm"
                      >
                        {discussion.expanded ? 'Hide' : 'View'} Thread
                      </Button>
                    </div>
                  </div>

                  {/* Discussion Content */}
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

                    {discussion.expanded && (
                      <div className="mt-4 lg:mt-6 space-y-3 lg:space-y-4">
                        {/* Replies */}
                        {discussion.replies_list.map(reply => (
                          <div key={reply.id} className="flex gap-2 lg:gap-3 ml-6 lg:ml-8">
                            <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {reply.author.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="bg-slate-700/30 rounded-lg lg:rounded-xl px-2 lg:px-3 py-2">
                                <div className="flex flex-wrap items-center gap-1 lg:gap-2 mb-1">
                                  <span className="font-medium text-green-400 text-sm">{reply.author}</span>
                                  <span className="text-xs text-slate-500">{reply.timestamp}</span>
                                </div>
                                <p className="text-slate-300 text-sm break-words">{reply.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Reply Form */}
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
                                    onClick={() => {
                                      if (newReply.trim()) {
                                        const reply: Reply = {
                                          id: Date.now(),
                                          author: 'You',
                                          content: newReply,
                                          timestamp: 'Just now'
                                        };
                                        setDiscussions(prev => prev.map(d =>
                                          d.id === discussion.id
                                            ? {
                                                ...d,
                                                replies: d.replies + 1,
                                                replies_list: [...d.replies_list, reply]
                                              }
                                            : d
                                        ));
                                        setNewReply('');
                                        setSelectedDiscussion(null);
                                      }
                                    }}
                                    className="bg-purple-600 hover:bg-purple-700 text-sm"
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
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-8">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Discussions</h2>
            <div className="space-y-4">
              {discussions.map(discussion => (
                <div key={discussion.id} className="rounded-lg bg-slate-800/60 p-3 lg:p-4 backdrop-blur-md border border-slate-700/50 hover:border-slate-600/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-base lg:text-lg mb-2 break-words">{discussion.title}</p>
                      <p className="text-sm text-slate-400 mb-3">by {discussion.author} in <span className="font-semibold text-purple-400">#{discussion.category}</span></p>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>💬 {discussion.replies} replies</span>
                        <span>👁️ {discussion.views}k views</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700 self-start sm:self-auto text-sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Trending</h2>
            <div className="space-y-3">
              {trending.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm">
                  <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <p className="text-slate-300 break-words">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Events;