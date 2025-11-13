"use client";

import React, { useEffect, useState } from 'react';
import { fetchSuiNews, Article } from '@/app/actions/news';
import { Button } from '@/components/ui/button';
import { Search,Share2, } from 'lucide-react';
import dynamic from 'next/dynamic';

const StreakCard = dynamic(() => import('@/components/streak/StreakCard'), { ssr: false });

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All News');

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const fetchedArticles = await fetchSuiNews();
      setArticles(fetchedArticles);
      setLoading(false);
    };
    getNews();
  }, []);

  const categories = ['All News', 'Grants', 'DeFi', 'Community', 'Technical', 'NFT', 'Security'];

  const filteredArticles = articles.filter(article =>
    filter === 'All News' ? true : article.category === filter
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-white">Sui News Feed</h1>
          <p className="text-slate-400 mt-2">Get the latest updates from the Sui ecosystem.</p>
        </div>
        <div className="lg:col-span-1">
          <StreakCard />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Button
            variant={filter === 'All News' ? 'default' : 'outline'}
            onClick={() => setFilter('All News')}
            className={`whitespace-nowrap ${filter === 'All News' ? 'bg-cyan-600 text-white' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`}>
            All News
          </Button>
        </div>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search news..." className="bg-slate-800/60 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-100" />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg bg-slate-800/60 p-4 backdrop-blur-md border border-slate-700/50 animate-pulse">
                <div className="h-40 bg-slate-700 rounded-lg"></div>
                <div className="mt-4">
                  <div className="h-4 w-24 bg-slate-700 rounded"></div>
                  <div className="h-6 w-full bg-slate-700 rounded mt-2"></div>
                  <div className="h-4 w-full bg-slate-700 rounded mt-2"></div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div key={article.id} className="rounded-lg bg-slate-600/60 backdrop-blur-md border border-slate-700/50 overflow-hidden flex flex-col">
                <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
                <div className="p-4 flex flex-col flex-grow">
                  <div>
                    <span className="text-xs font-semibold bg-cyan-800/50 text-white px-2 py-1 rounded-full">{article.category}</span>
                    <h3 className="text-lg font-bold text-white mt-2 hover:text-cyan-400 transition-colors"><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h3>
                    <p className="text-slate-400 text-sm mt-1 flex-grow">{article.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center space-x-4 text-slate-400">
                      <button className="hover:text-white"><Share2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
