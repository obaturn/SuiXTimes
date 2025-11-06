"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';

const ArticlePage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Community Articles</h1>
        <Link href="/dashboard/news/new" passHref>
          <Button className="gap-2">
            <PlusCircle className="h-5 w-5" />
            Create Article
          </Button>
        </Link>
      </div>

      {/* Placeholder for article list */}
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center space-y-4 border-2 border-dashed border-slate-700 rounded-lg">
        <BookOpen className="w-16 h-16 text-slate-600" />
        <h2 className="text-xl font-bold text-slate-300">No Articles Yet</h2>
        <p className="text-slate-400 max-w-sm">
          Be the first to contribute! Click the "Create Article" button to share your knowledge with the community.
        </p>
      </div>
    </div>
  );
};

export default ArticlePage;