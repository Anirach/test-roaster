import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Chatbot } from './components/Chatbot';
import { Sidebar } from './components/Sidebar';
import { StaffPage } from './components/StaffPage';

export type Theme = 'light' | 'dark';
export type Page = 'dashboard' | 'staff' | 'reports' | 'settings';

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

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1024);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderCurrentPage = () => {
    const pageProps = { theme, toggleTheme, toggleSidebar };
    switch (currentPage) {
        case 'dashboard':
            return <Dashboard {...pageProps} />;
        case 'staff':
            return <StaffPage {...pageProps} />;
        // default to dashboard for other pages not yet created
        default:
            return <Dashboard {...pageProps} />;
    }
  };

  return (
    <div className="min-h-screen text-brand-text-primary dark:text-dark-brand-text-primary bg-brand-background dark:bg-dark-brand-background">
      <Sidebar isCollapsed={isSidebarCollapsed} currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className={`transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {renderCurrentPage()}
      </div>
      <Chatbot />
    </div>
  );
}

export default App;
