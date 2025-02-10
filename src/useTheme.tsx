import { useEffect, useState } from 'react';

const LocalStorageKeys = {
  THEME: 'THEME',
};

const useTheme = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem(LocalStorageKeys.THEME);
    if (storedTheme !== null) {
      // If there's a stored preference, use it
      setDarkMode(JSON.parse(storedTheme));
    } else {
      // If no stored preference, use the system's color scheme
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setDarkMode(prefersDark);
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
