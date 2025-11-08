
"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useColorTheme } from "@/components/color-theme-provider"
import { Palette } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useColorTheme()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const scrollToAuth = () => {
    const authCard = document.getElementById("auth-card")
    if (authCard) {
      authCard.scrollIntoView({ behavior: "smooth" })
    }
  }

  const cycleColorTheme = () => {
    const themes = ["green", "blue", "pink", "light"]
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex] as any)
  }

  const isLightMode = theme === "light"

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b ${
        isLightMode
          ? "bg-white/80 border-gray-200"
          : "bg-black/30 border-cyan-500/20"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-2">
              <div className="relative">
                <svg
                  className="w-8 h-8 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <svg
                  className="w-4 h-4 text-cyan-400 absolute -top-1 -right-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                SuiTimes
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/features"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="/ecosystem"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              Ecosystem
            </a>
            <a
              href="/news"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              News
            </a>
            <a
              href="/community"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              Community
            </a>
          </div>

          {/* Theme Toggle & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={cycleColorTheme}
              className={`p-2 rounded-full transition-colors ${
                isLightMode
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              aria-label="Change theme"
            >
              <Palette size={20} />
            </button>
            <Button
              onClick={scrollToAuth}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className={isLightMode ? "text-gray-900" : "text-white"} aria-label="Toggle menu">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3"
        >
          <a
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Home
          </a>
          <a
            href="/features"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Features
          </a>
          <a
            href="/ecosystem"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Ecosystem
          </a>
          <a
            href="/news"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            News
          </a>
          <a
            href="/community"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Community
          </a>
          <div className="pt-4 pb-2 space-y-3">
            <button
              onClick={cycleColorTheme}
              className={`w-full flex items-center justify-center space-x-2 p-2 rounded-lg transition-colors ${
                isLightMode
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Palette size={18} />
              <span>Change Theme</span>
            </button>
            <Button
              onClick={scrollToAuth}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2.5 px-4 rounded-lg"
            >
              Connect Wallet
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
