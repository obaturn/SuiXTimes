
import React from 'react';
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Github, Gitlab } from 'lucide-react';

const Footer = () => {
  const handleConnectWallet = () => {
    const authCard = document.getElementById('auth-card');
    if (authCard) {
      authCard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-cyan-500/20 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">SuiTimes</h3>
            <p className="text-gray-400">The ultimate times for the Sui ecosystem.</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-cyan-400">dApps</a></li>
              <li><a href="#" className="hover:text-cyan-400">News</a></li>
              <li><a href="#" className="hover:text-cyan-400">Analytics</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-cyan-400">Discord</a></li>
              <li><a href="#" className="hover:text-cyan-400">Twitter</a></li>
              <li><a href="#" className="hover:text-cyan-400">Forum</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-4">Get Started</h3>
            <Button onClick={handleConnectWallet} className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Connect Wallet
            </Button>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; 2024 Sui Times. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-cyan-400"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-cyan-400"><Github size={20} /></a>
            <a href="#" className="hover:text-cyan-400"><Gitlab size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
