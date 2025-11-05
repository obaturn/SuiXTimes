"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Users, TrendingUp } from 'lucide-react';

const Events = () => {
  const featuredEvents = [
    { title: 'Sui Builder House - Paris', date: 'July 20-22, 2024', image: '/placeholder.svg' },
    { title: 'Sui x KuCoin AMA', date: 'August 5, 2024', image: '/placeholder.svg' },
  ];

  const discussions = [
    { title: 'What are your favorite dApps on Sui?', author: 'Satoshi', replies: 23, views: 1.2, category: 'dApps' },
    { title: 'How to get started with Move development?', author: 'Builder', replies: 15, views: 897, category: 'Development' },
  ];

  const groups = [
    { name: 'Sui Developers', members: '12.3k', description: 'For developers building on Sui.' },
    { name: 'Sui NFT Collectors', members: '5.6k', description: 'For NFT enthusiasts and collectors.' },
  ];

  const trending = [
    'Sui 8192 game going viral',
    'New DeFi protocol launching next week',
    'Move vs. Rust: which is better for smart contracts?',
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Events & Community</h1>
        <Button className="bg-purple-600 hover:bg-purple-700"><Plus className="w-4 h-4 mr-2" /> Create Event</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Sui Events Calendar</h2>
            <div className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 h-96">
              <iframe 
                src="https://lu.ma/embed/calendar/cal-c2b5sRzY3mmnp5v/events" 
                width="100%" 
                height="100%" 
                frameBorder="0"
                style={{border: 'none'}}
                allowFullScreen={true}
                aria-hidden="false"
                tabIndex={0}>
              </iframe>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredEvents.map(event => (
                <div key={event.title} className="rounded-lg bg-slate-800/60 backdrop-blur-md border border-slate-700/50 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <p className="font-bold text-white">{event.title}</p>
                    <p className="text-sm text-slate-400 mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Discussions</h2>
            <div className="space-y-4">
              {discussions.map(discussion => (
                <div key={discussion.title} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white">{discussion.title}</p>
                    <p className="text-sm text-slate-400 mt-1">by {discussion.author} in <span className="font-semibold text-purple-400">#{discussion.category}</span></p>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <p>{discussion.replies} replies</p>
                    <p>{discussion.views}k views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Community Groups</h2>
            <div className="space-y-4">
              {groups.map(group => (
                <div key={group.name} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50">
                  <p className="font-bold text-white">{group.name}</p>
                  <p className="text-sm text-slate-400 mt-1">{group.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-slate-400">{group.members} members</p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Join</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Trending</h2>
            <div className="space-y-3">
              {trending.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm">
                  <TrendingUp className="w-5 h-5 text-purple-400 mt-1" />
                  <p className="text-slate-300">{item}</p>
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