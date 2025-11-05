"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Curator component to avoid SSR issues
const CuratorFeed = dynamic(() => import('@/components/CuratorFeed'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[600px] bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg flex items-center justify-center">
      <div className="text-slate-400">Loading SUI News feed...</div>
    </div>
  )
});

export default function SuiNews() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">SUI News</h1>
        <div className="text-sm text-slate-400">
          Curated social media feed
        </div>
      </div>

      <CuratorFeed />
    </div>
  );
}