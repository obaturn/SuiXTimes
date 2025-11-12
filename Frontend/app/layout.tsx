import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ColorThemeProvider } from "@/components/color-theme-provider"
import { WalletProviders } from "@/components/wallet-providers"
import { WatchlistProvider } from "@/hooks/use-watchlist"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans" style={{ fontFamily: "var(--font-space-grotesk)" }}>
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
