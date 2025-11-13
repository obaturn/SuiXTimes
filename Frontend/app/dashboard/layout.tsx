
"use client";

import { useState, useEffect } from "react";
import { useCurrentWallet } from "@mysten/dapp-kit";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { useColorTheme, getBackgroundGradient, getWaveColors } from '@/components/color-theme-provider';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { connectionStatus } = useCurrentWallet();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const { theme: colorTheme } = useColorTheme();
  // choose a default readable text color for dashboard content
  const colors = getWaveColors(colorTheme);
  const dashboardPrimary = colors[0];
  const dashboardPrimaryText = colors[1];
  const dashboardTextColor = '#0f172a';

  useEffect(() => {
    // Don't do anything while the wallet status is initializing.
    if (connectionStatus === 'connecting') {
      setIsChecking(true);
      return;
    }

    // Once the status is no longer 'connecting', we can check it.
    setIsChecking(false);

    // Allow access to dashboard even when not connected for development
    // Comment out the redirect for easier testing
    // if (connectionStatus !== 'connected') {
    //   router.push("/");
    // }
  }, [connectionStatus, router]);

  // For development, allow access to dashboard without wallet connection
  // Comment out the loader to bypass connection check
  /*
  if (isChecking || connectionStatus !== "connected") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <Loader2 className="h-16 w-16 animate-spin text-purple-500" />
      </div>
    );
  }
  */

  // Always render the dashboard layout for development
  return (
    // use the color theme's background gradient for the dashboard
    <div
      className={`flex h-screen ${getBackgroundGradient(colorTheme)}`}
      style={{
        // expose a CSS variable for components to use
        ['--dashboard-text' as any]: dashboardTextColor,
        ['--dashboard-primary' as any]: dashboardPrimary,
        ['--dashboard-primary-text' as any]: dashboardPrimaryText,
      }}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-1 flex-col min-h-screen lg:ml-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
