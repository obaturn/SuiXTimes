
import React from 'react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  const handleConnectWallet = () => {
    const authCard = document.getElementById('auth-card');
    if (authCard) {
      authCard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-cyan-500/20 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Sui News Feed</h3>
            <ul>
              <li><a href="#" className="hover:text-cyan-400">Latest Updates</a></li>
              <li><a href="#" className="hover:text-cyan-400">Developer Blogs</a></li>
              <li><a href="#" className="hover:text-cyan-400">Community Announcements</a></li>
              <li><a href="#" className="hover:text-cyan-400">Ecosystem News</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Sui Ecosystem</h3>
            <ul>
              <li><a href="#" className="hover:text-cyan-400">dApps Directory</a></li>
              <li><a href="#" className="hover:text-cyan-400">Token Metrics</a></li>
              <li><a href="#" className="hover:text-cyan-400">Network Stats</a></li>
              <li><a href="#" className="hover:text-cyan-400">Developer Resources</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Get Started</h3>
            <ul>
              <li><a href="#" className="hover:text-cyan-400">Create Wallet</a></li>
              <li><a href="#" className="hover:text-cyan-400">Connect Wallet</a></li>
              <li><a href="#" className="hover:text-cyan-400">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-400">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul>
              <li><a href="#" className="hover:text-cyan-400">Discord</a></li>
              <li><a href="#" className="hover:text-cyan-400">Twitter</a></li>
              <li><a href="#" className="hover:text-cyan-400">Forum</a></li>
              <li><a href="#" className="hover:text-cyan-400">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex justify-center items-center">
          <div>
            <h3 className="font-bold text-lg">Follow Sui</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-cyan-400"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-cyan-400"><i className="fab fa-discord"></i></a>
              <a href="#" className="hover:text-cyan-400"><i className="fab fa-github"></i></a>
              <a href="#" className="hover:text-cyan-400"><i className="fab fa-medium"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; 2024 Sui Ecosystem. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
