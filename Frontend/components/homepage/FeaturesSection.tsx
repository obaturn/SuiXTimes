
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
    title: 'Twitter Feed & Social',
    description: 'Connect with the Sui community through official announcements, developer updates, and trending discussions.',
    link: '#',
  },
  {
    title: 'Blogs & Dev Articles',
    description: 'Read in-depth articles, tutorials, and technical content from Sui developers and ecosystem contributors.',
    link: '#',
  },
  {
    title: 'SUI Price & Analytics',
    description: 'Track real-time SUI token prices, market data, and comprehensive analytics for informed decision-making.',
    link: '#',
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
