
"use client";

import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ColorThemeProvider, useColorTheme, getWaveColors } from "@/components/color-theme-provider";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { useState } from "react";
import dynamic from "next/dynamic";

const WavyBackground = dynamic(() => import("@/components/ui/wavy-background").then(mod => ({ default: mod.WavyBackground })), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <WavyBackground className="h-screen">
      <div className="flex h-screen">
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
    </WavyBackground>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ColorThemeProvider>
            <DashboardContent>{children}</DashboardContent>
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
