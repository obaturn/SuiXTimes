import { useState, useEffect } from 'react';

interface Reply {
  id: number;
  author: string;
  authorAddress: string;
  content: string;
  timestamp: string;
}

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

export function useDiscussions() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscussions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/discussions');

      if (!response.ok) {
        throw new Error(`Failed to fetch discussions: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setDiscussions(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch discussions');
      }
    } catch (err) {
      console.error('Error fetching discussions:', err);
      setError('Failed to load discussions');
    } finally {
      setIsLoading(false);
    }
  };

  const createDiscussion = async (title: string, content: string, category: string, authorAddress: string) => {
    try {
      const response = await fetch('/api/discussions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          category,
          authorAddress
        })
      });

      const data = await response.json();

      if (data.success) {
        // Add to local state immediately for instant UI update
        setDiscussions(prev => [data.data, ...prev]);
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to create discussion');
      }
    } catch (err) {
      console.error('Error creating discussion:', err);
      throw err;
    }
  };

  const addReply = async (discussionId: number, content: string, authorAddress: string) => {
    try {
      const response = await fetch(`/api/discussions/${discussionId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          authorAddress
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update local state immediately
        setDiscussions(prev => prev.map(discussion =>
          discussion.id === discussionId
            ? {
                ...discussion,
                replies: discussion.replies + 1,
                replies_list: [...discussion.replies_list, data.data],
                lastActivity: new Date().toISOString()
              }
            : discussion
        ));
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to add reply');
      }
    } catch (err) {
      console.error('Error adding reply:', err);
      throw err;
    }
  };

  const refreshDiscussions = () => {
    fetchDiscussions();
  };

  useEffect(() => {
    fetchDiscussions();

    // Set up polling for real-time updates every 30 seconds
    const interval = setInterval(fetchDiscussions, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    discussions,
    isLoading,
    error,
    createDiscussion,
    addReply,
    refreshDiscussions,
  };
}