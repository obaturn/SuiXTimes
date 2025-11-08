
import React from 'react';
import { motion } from 'framer-motion';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { useColorTheme } from '@/components/color-theme-provider';

const features = [
  {
    title: 'World News & Updates',
    description: 'Stay updated with the latest news and announcements from the Sui ecosystem and blockchain world.',
    link: '#',
  },
  {
    title: 'Market Analytics',
    description: 'Track real-time token prices, market trends, and ecosystem metrics for informed decision-making.',
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Token Launch Watchlist',
    description: 'Discover and track new token launches on the Sui network with comprehensive project information and updates.',
    link: '#',
  },
  {
    title: 'dApp Discovery',
    description: 'Explore a curated list of decentralized applications built on the Sui blockchain.',
    link: '#',
  },
];

const FeaturesSection = () => {
  const { theme } = useColorTheme()
  const isLightMode = theme === "light"

  return (
    <section id="features" className={`py-20 ${isLightMode ? "bg-gray-50" : "bg-black"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold ${
            isLightMode ? "text-gray-900" : "text-white"
          }`}>Why Sui Times?</h2>
          <p className={`text-lg mt-2 ${
            isLightMode ? "text-gray-600" : "text-gray-400"
          }`}>Explore the features that make Sui Times the best place to be.</p>
        </div>
        <HoverEffect items={features} />
      </div>
    </section>
  );
};

export default FeaturesSection;
