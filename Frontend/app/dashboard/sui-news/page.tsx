"use client";

import dynamic from 'next/dynamic';

// Dynamically import the Curator component to avoid SSR issues
const CuratorFeed = dynamic(() => import('@/components/CuratorFeed'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[600px] bg-card backdrop-blur-md border border-border rounded-lg flex items-center justify-center">
      <div className="text-muted-foreground">Loading social media feed...</div>
    </div>
  )
});

export default function SuiNews() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">X Feed</h1>
        <div className="text-sm text-muted-foreground">
          Curated social media content
        </div>
      </div>

      <div className="w-full">
        <CuratorFeed />
      </div>
    </div>
  );
}