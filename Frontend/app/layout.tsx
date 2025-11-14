import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { ColorThemeProvider } from "@/components/color-theme-provider"
import { WalletProviders } from "@/components/wallet-providers"
import { WatchlistProvider } from "@/hooks/use-watchlist"
import ErrorBoundary from "@/components/error-boundary"
import "./globals.css"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sui X Times" />
      </head>
      <body className="font-sans" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ColorThemeProvider>
              <WalletProviders>
                <WatchlistProvider>
                  {children}
                </WatchlistProvider>
              </WalletProviders>
            </ColorThemeProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
