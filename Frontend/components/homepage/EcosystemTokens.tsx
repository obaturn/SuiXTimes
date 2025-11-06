"use client";

import React from 'react';

const tokens = [
  {
    name: 'SUI',
    description: 'The native token for gas, staking, and governance.',
    logoUrl: 'https://static.cdnlogo.com/logos/s/8/sui.svg'
  },
  {
    name: 'Cetus Protocol (CETUS)',
    description: 'A decentralized exchange and concentrated liquidity protocol.',
    logoUrl: 'https://logo.svgcdn.com/token-branded/cetus.svg'
  },
  {
    name: 'Scallop (SCA)',
    description: 'A leading DeFi protocol for lending and borrowing.',
    logoUrl: 'https://www.coingecko.com/coins/31133/logo_4x.png'
  },
  {
    name: 'Sui Name Service (SNS)',
    description: 'Provides decentralized, human-readable names for wallets.',
    logoUrl: 'https://sns.id/favicon.ico'
  }
];

const EcosystemTokens = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4" style={{backgroundColor: '#030F1C'}}>
      <div className="container mx-auto text-center max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          A Thriving Ecosystem
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mb-8 sm:mb-12">
          Explore the foundational tokens that power the Sui network.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {tokens.map((token) => (
            <div key={token.name} className="bg-gray-900/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center mb-4 h-16">
                {token.logoUrl ? (
                  <img src={token.logoUrl} alt={`${token.name} logo`} className="h-12 w-12" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center text-white font-bold text-xl">
                    {token.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{token.name}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {token.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemTokens;
