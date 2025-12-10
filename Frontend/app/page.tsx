"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AuroraBackground className="min-h-screen w-full">
      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 shadow-lg"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center px-4">
        <div className="space-y-6">
          {/* Logo/Title */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent drop-shadow-lg">
              Sui X Times
            </h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-blue-200 max-w-xl mx-auto leading-relaxed">
              Your comprehensive destination for all things Sui blockchain. Stay informed with real-time news and insights.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-base text-slate-600 dark:text-indigo-100 leading-relaxed">
              Sui X Times aggregates the latest news, developments, and community discussions from the Sui blockchain ecosystem.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-blue-200/30 dark:border-indigo-300/20 rounded-lg p-4 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <div className="text-3xl mb-2">📰</div>
                <h3 className="text-sm font-semibold mb-1 text-slate-800 dark:text-indigo-100">Real-time News</h3>
                <p className="text-xs text-slate-600 dark:text-indigo-200">Latest updates</p>
              </div>

              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-indigo-200/30 dark:border-violet-300/20 rounded-lg p-4 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                <div className="text-3xl mb-2">🌐</div>
                <h3 className="text-sm font-semibold mb-1 text-slate-800 dark:text-violet-100">Global Coverage</h3>
                <p className="text-xs text-slate-600 dark:text-violet-200">World news focus</p>
              </div>

              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-violet-200/30 dark:border-purple-300/20 rounded-lg p-4 shadow-lg hover:shadow-violet-500/20 transition-all duration-300">
                <div className="text-3xl mb-2">📈</div>
                <h3 className="text-sm font-semibold mb-1 text-slate-800 dark:text-purple-100">Market Insights</h3>
                <p className="text-xs text-slate-600 dark:text-purple-200">DeFi tracking</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg text-base transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 border border-blue-400/20"
              onClick={() => window.location.href = '/dashboard'}
            >
              Read News
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </AuroraBackground>
  )
}