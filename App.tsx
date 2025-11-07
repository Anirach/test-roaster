import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Chatbot } from './components/Chatbot';

export type Theme = 'light' | 'dark';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (storedTheme) {
        return storedTheme;
      }
      if (userMedia.matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen text-brand-text-primary dark:text-dark-brand-text-primary">
      <Dashboard theme={theme} toggleTheme={toggleTheme} />
      <Chatbot />
    </div>
  );
}

export default App;