"use client"; // Add this line

import React, { useState, useCallback, ReactNode, useContext } from 'react';
import { ThemeContext, Theme, THEME_LOCAL_STORAGE_KEY, DEFAULT_THEME } from './Theme.context';

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    return (storedTheme as Theme) || DEFAULT_THEME;
  });

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
      localStorage.setItem(THEME_LOCAL_STORAGE_KEY, newTheme);
      return newTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider as ThemeContextProvider, useThemeContext };
