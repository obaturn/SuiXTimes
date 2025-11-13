import { useState, useEffect } from 'react';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import type { Article } from '@/components/articles/ArticleCard';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const client = new SuiClient({
    url: getFullnodeUrl('testnet'),
  });

  const fetchArticles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // For shared objects, we need to use events or maintain a list of known article IDs
      // For now, we'll implement a basic approach using events

      const packageId = process.env.NEXT_PUBLIC_PACKAGE_ID!;

      // Query for ArticleCreated events to find all articles
      const eventsResponse = await client.queryEvents({
        query: {
          MoveEventType: `${packageId}::article_moderation::ArticleCreated`,
        },
        order: 'descending',
      });

      const articleIds: string[] = [];

      // Extract article IDs from events
      for (const event of eventsResponse.data) {
        if (event.parsedJson) {
          const articleId = (event.parsedJson as any).article_id;
          if (articleId && !articleIds.includes(articleId)) {
            articleIds.push(articleId);
          }
        }
      }

      // Fetch each article object
      const fetchedArticles: Article[] = [];

      for (const articleId of articleIds) {
        try {
          const objResponse = await client.getObject({
            id: articleId,
            options: {
              showContent: true,
              showType: true,
            },
          });

          if (objResponse.data?.content?.dataType === 'moveObject') {
            const fields = (objResponse.data.content as any).fields;

            const article: Article = {
              id: articleId,
              author: fields.author,
              title: fields.title,
              contentBlobId: fields.content_blob_id,
              category: fields.category,
              imageUrl: fields.image_url || '',
              upvotes: Number(fields.upvotes),
              downvotes: Number(fields.downvotes),
              createdAt: Number(fields.created_at),
              isDeleted: fields.is_deleted,
            };

            if (!article.isDeleted) {
              fetchedArticles.push(article);
            }
          }
        } catch (err) {
          console.warn(`Failed to fetch article ${articleId}:`, err);
        }
      }

      // Sort by creation date (newest first)
      fetchedArticles.sort((a, b) => b.createdAt - a.createdAt);

      setArticles(fetchedArticles);

    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshArticles = () => {
    fetchArticles();
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    isLoading,
    error,
    refreshArticles,
  };
}