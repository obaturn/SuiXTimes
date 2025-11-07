"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ColorTheme = "green" | "blue" | "pink" | "light";

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
  const [theme, setTheme] = useState<ColorTheme>("blue");

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
    default:
      return ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"];
  }
};