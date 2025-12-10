"use client";

import { useState, useEffect } from "react";
import { Loader2, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { AuroraBackground } from "@/components/ui/aurora-background";

// Curator script will be loaded by the CuratorFeed component when needed

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  // While checking, show a loader. Wallet connection is no longer required.
  if (isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <Loader2 className="h-16 w-16 animate-spin text-purple-500" />
      </div>
    );
  }

  // Only render the dashboard layout if the user is fully connected.
  return (
    <div className="flex h-screen bg-gray-900 relative overflow-hidden">

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-1 flex-col min-h-screen lg:ml-64 relative z-10">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Theme Toggle Button */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-card/90 backdrop-blur-md border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-lg"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        )}

        <main className="flex-1 overflow-y-auto relative">
          {/* Aurora Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <AuroraBackground className="h-full w-full" showRadialGradient={true}>
              <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/70 dark:from-background/80 dark:via-background/70 dark:to-background/60" />
            </AuroraBackground>
          </div>

          {/* Content */}
          <div className="relative z-10 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}

