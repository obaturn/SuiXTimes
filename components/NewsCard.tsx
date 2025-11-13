"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Clock, User } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category?: string;
}

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInHours < 48) return 'Yesterday';
      return date.toLocaleDateString();
    } catch {
      return 'Recent';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'breaking': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'technology': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'defi': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'nft': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <motion.div
      className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:bg-slate-800/70"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Image */}
        {article.urlToImage && (
          <div className="lg:w-48 lg:h-32 flex-shrink-0">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 hover:text-cyan-400 transition-colors">
                {article.title}
              </h3>

              {article.description && (
                <p className="text-slate-300 text-sm line-clamp-3 mb-3">
                  {article.description}
                </p>
              )}
            </div>

            {/* Category Badge */}
            {article.category && (
              <div className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getCategoryColor(article.category)}`}>
                {article.category}
              </div>
            )}
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{article.source.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
              onClick={() => window.open(article.url, '_blank')}
            >
              Read More
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;