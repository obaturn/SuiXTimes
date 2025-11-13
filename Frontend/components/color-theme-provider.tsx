"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ColorTheme = "default" | "green" | "blue" | "pink" | "light" | "purple" | "orange" | "red";

interface ColorThemeContextType {
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
};

export const ColorThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ColorTheme>("default");

  useEffect(() => {
    const saved = localStorage.getItem("color-theme") as ColorTheme;
    if (saved) setTheme(saved);
  }, []);

  const handleSetTheme = (newTheme: ColorTheme) => {
    setTheme(newTheme);
    localStorage.setItem("color-theme", newTheme);
  };

  return (
    <ColorThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const getWaveColors = (theme: ColorTheme) => {
  switch (theme) {
    case "green":
      return ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"];
    case "blue":
      return ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"];
    case "pink":
      return ["#ec4899", "#f472b6", "#f9a8d4", "#fbcfe8", "#fce7f3"];
    case "light":
      return ["#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9"];
    case "purple":
      return ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"];
    case "orange":
      return ["#f97316", "#fb923c", "#fdba74", "#fed7aa", "#ffedd5"];
    case "red":
      return ["#ef4444", "#f87171", "#fca5a5", "#fecaca", "#fef2f2"];
    default:
      return ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"];
  }
};

export const getBackgroundGradient = (theme: ColorTheme) => {
  switch (theme) {
    case "default":
      return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";
    case "green":
      return "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50";
    case "blue":
      return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";
    case "pink":
      return "bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50";
    case "light":
      return "bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50";
    case "purple":
      return "bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50";
    case "orange":
      return "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50";
    case "red":
      return "bg-gradient-to-br from-red-50 via-rose-50 to-pink-50";
    default:
      return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";
  }
};