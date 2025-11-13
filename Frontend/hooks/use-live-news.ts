import { useState, useEffect } from 'react';

interface LiveNewsItem {
  id: number;
  title: string;
  category: string;
  time: string;
  source: string;
  urgent: boolean;
}

export function useLiveNews() {
  const [news, setNews] = useState<LiveNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveNews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/news/live');

      if (!response.ok) {
        throw new Error(`Failed to fetch live news: ${response.status}`);
      }

      const data = await response.json();
      setNews(data);
    } catch (err) {
      setError('Failed to load live news');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshNews = () => {
    fetchLiveNews();
  };

  useEffect(() => {
    fetchLiveNews();

    // Set up polling every 30 seconds to get fresh news
    const interval = setInterval(fetchLiveNews, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    news,
    isLoading,
    error,
    refreshNews,
  };
}