"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageCircle, Clock, User } from 'lucide-react';
import { useWalrus } from "@/hooks/use-walrus";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { toast } from "sonner";

export interface Article {
  id: string;
  author: string;
  title: string;
  contentBlobId: string;
  category: string;
  imageUrl: string;
  upvotes: number;
  downvotes: number;
  createdAt: number;
  isDeleted: boolean;
}

interface ArticleCardProps {
  article: Article;
  onVote?: () => void;
}

export function ArticleCard({ article, onVote }: ArticleCardProps) {
  const { readBlob } = useWalrus();
  const account = useCurrentAccount();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  const [content, setContent] = useState<string>("");
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  // Load content from Walrus when component mounts or when expanded
  useEffect(() => {
    if (isExpanded && !content && !isLoadingContent) {
      loadContent();
    }
  }, [isExpanded]);

  const loadContent = async () => {
    if (!article.contentBlobId) return;

    setIsLoadingContent(true);
    try {
      const articleContent = await readBlob(article.contentBlobId);
      setContent(articleContent);
    } catch (error) {
      console.error("Error loading article content:", error);
      toast.error("Failed to load article content");
    } finally {
      setIsLoadingContent(false);
    }
  };

  const handleVote = async (isUpvote: boolean) => {
    if (!account) {
      toast.error("Please connect your wallet to vote");
      return;
    }

    setIsVoting(true);
    try {
      const tx = new Transaction();

      tx.moveCall({
        package: process.env.NEXT_PUBLIC_PACKAGE_ID!,
        module: 'article_moderation',
        function: 'vote_on_article',
        arguments: [
          tx.object(article.id), // article object ID
          tx.pure.bool(isUpvote),
        ],
      });

      await signAndExecute({ transaction: tx });

      toast.success(isUpvote ? "Upvoted!" : "Downvoted!");
      onVote?.(); // Trigger refresh

    } catch (error) {
      console.error("Error voting:", error);
      toast.error("Failed to vote");
    } finally {
      setIsVoting(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (article.isDeleted) {
    return null; // Don't show deleted articles
  }

  return (
    <Card className="bg-slate-800/60 border-slate-700/50 hover:bg-slate-800/80 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white text-xl mb-2">{article.title}</CardTitle>
            <CardDescription className="text-gray-300 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {article.author.slice(0, 6)}...{article.author.slice(-4)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDate(article.createdAt)}
              </span>
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-500/30">
            {article.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}

        <div className="text-gray-200">
          {isExpanded ? (
            <div>
              {isLoadingContent ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-gray-400 mt-2">Loading content...</p>
                </div>
              ) : content ? (
                <div>
                  {article.contentBlobId.startsWith('suihub_') && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4">
                      <p className="text-green-300 text-sm">
                        ✅ <strong>Your Article Content:</strong> This is the actual content you wrote when creating the article.
                      </p>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{content}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-red-400">Failed to load content</p>
                  <p className="text-gray-400 text-sm mt-2">BlobId: {article.contentBlobId}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-300">
              {content ? truncateContent(content) : "Click to load content..."}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(true)}
              disabled={isVoting || !account}
              className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              {article.upvotes}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote(false)}
              disabled={isVoting || !account}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              {article.downvotes}
            </Button>

            <Button variant="ghost" size="sm" className="text-gray-400">
              <MessageCircle className="w-4 h-4 mr-1" />
              0 {/* Placeholder for comments */}
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}