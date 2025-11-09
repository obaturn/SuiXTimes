"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { RefreshCw, Zap, Clock } from 'lucide-react';

// Dynamically import the Curator component to avoid SSR issues
const CuratorFeed = dynamic(() => import('@/components/CuratorFeed'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[600px] bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg flex items-center justify-center">
      <div className="text-slate-400">Loading SUI News feed...</div>
    </div>
  )
});

interface LiveNewsItem {
  id: number;
  title: string;
  category: string;
  time: string;
  source: string;
  urgent: boolean;
}

export default function SuiNews() {
  const [liveNews, setLiveNews] = useState<LiveNewsItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  // Fetch live news from ElizaOS
  useEffect(() => {
    fetchLiveNews();

    // Update every 30 seconds
    const interval = setInterval(() => {
      fetchLiveNews();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchLiveNews = async () => {
    try {
      setIsLoadingNews(true);
      const response = await fetch('/api/news/live', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const newsData = await response.json();
        setLiveNews(newsData);
      }
    } catch (error) {
      console.error('Error fetching live news:', error);
    } finally {
      setIsLoadingNews(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Sui X News</h1>
        <div className="text-sm text-slate-400">
          Curated social media feed + Live updates
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Curator Feed */}
        <div className="lg:col-span-2">
          <CuratorFeed />
        </div>

        {/* Live News Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <h3 className="text-gray-900 font-semibold flex items-center gap-2">
                Live Updates
                {isLoadingNews && <RefreshCw className="w-4 h-4 animate-spin" />}
              </h3>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {liveNews.length > 0 ? liveNews.slice(0, 10).map((news) => (
                <div key={news.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm line-clamp-2">{news.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{news.source}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {news.time}
                      </span>
                    </div>
                  </div>
                  {news.urgent && (
                    <div className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                      BREAKING
                    </div>
                  )}
                </div>
              )) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No live updates available
                </div>
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Real-time Sui ecosystem monitoring
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-3">
            <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700">
              <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{liveNews.length}</div>
              <div className="text-xs text-slate-400">Live Updates</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700">
              <RefreshCw className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">30s</div>
              <div className="text-xs text-slate-400">Refresh Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}