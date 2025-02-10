import { useEffect, useState } from 'react';
import { LocalStorageKeys } from './data/common';

const useTheme = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem(LocalStorageKeys.THEME);
    if (storedTheme !== null) {
      // If there's a stored preference, use it
      setDarkMode(JSON.parse(storedTheme) as boolean);
    } else {
      // If no stored preference, use the system's color scheme
      const isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setDarkMode(isDarkMode);
    }
  }, []);

  useEffect(() => {
    // Only apply the color scheme if darkMode is set
    if (darkMode === null) return;

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save the user's preference to localStorage
    localStorage.setItem(LocalStorageKeys.THEME, JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return { darkMode, toggleDarkMode };
};

export default useTheme;
