"use client";

import React from 'react';
import { Construction, Clock } from 'lucide-react';

const News = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 max-w-md">
        <div className="flex justify-center mb-4">
          <Construction className="w-16 h-16 text-purple-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">News Section</h1>
        <p className="text-slate-400 mb-4">Coming Soon</p>
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span>Under Development</span>
        </div>
      </div>
      <p className="text-slate-500 max-w-sm">
        We're working hard to bring you the latest Sui ecosystem news and updates. Stay tuned!
      </p>
    </div>
  );
};

export default News;