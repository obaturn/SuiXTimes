import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { ColorThemeProvider } from "@/components/color-theme-provider"
import { WalletProviders } from "@/components/wallet-providers"
import { WatchlistProvider } from "@/hooks/use-watchlist"
import "./globals.css"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className="font-sans" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
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
      </body>
    </html>
  )
}
