import React, { useState, useMemo } from 'react';
import { STAFF_MEMBERS } from '../constants';
import { StaffMember } from '../types';
import { StaffCard } from './StaffCard';
import { Theme } from '../App';
import { MoonIcon, SunIcon, MenuIcon, SearchIcon, PlusIcon } from './icons';

interface StaffPageProps {
  theme: Theme;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export const StaffPage: React.FC<StaffPageProps> = ({ theme, toggleTheme, toggleSidebar }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredStaff = useMemo(() => {
        if (!searchTerm.trim()) return STAFF_MEMBERS;
        const lowercasedTerm = searchTerm.toLowerCase();
        return STAFF_MEMBERS.filter(member => 
            member.name.toLowerCase().includes(lowercasedTerm) ||
            member.skills.some(skill => skill.toLowerCase().includes(lowercasedTerm))
        );
    }, [searchTerm]);

    return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-6">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-full text-brand-text-secondary hover:bg-gray-200 dark:hover:bg-slate-700 dark:text-dark-brand-text-secondary transition-colors lg:hidden"
                aria-label="Toggle sidebar"
            >
                <MenuIcon className="w-6 h-6" />
            </button>
            <div>
                <h1 className="text-3xl font-bold text-brand-text-primary dark:text-dark-brand-text-primary">Staff Management</h1>
                <p className="text-brand-text-secondary dark:text-dark-brand-text-secondary mt-1">View, add, and manage staff members.</p>
            </div>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-brand-text-secondary hover:bg-gray-200 dark:hover:bg-slate-700 dark:text-dark-brand-text-secondary transition-colors"
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? (
            <MoonIcon className="w-6 h-6" />
          ) : (
            <SunIcon className="w-6 h-6" />
          )}
        </button>
      </header>

      <section className="bg-brand-surface dark:bg-dark-brand-surface p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search staff members"
                className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-brand-text-primary dark:text-dark-brand-text-primary rounded-md focus:ring-2 focus:ring-brand-blue-light focus:border-brand-blue-light transition placeholder:text-gray-400 dark:placeholder:text-slate-400"
              />
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg shadow-md transition-colors">
            <PlusIcon className="w-5 h-5" />
            Add New Staff
          </button>
      </section>
      
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredStaff.map((staffMember: StaffMember) => (
          <StaffCard key={staffMember.id} staffMember={staffMember} />
        ))}
         {filteredStaff.length === 0 && (
            <div className="col-span-full text-center py-12 bg-brand-surface dark:bg-dark-brand-surface rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-brand-text-primary dark:text-dark-brand-text-primary">No Staff Found</h3>
                <p className="text-brand-text-secondary dark:text-dark-brand-text-secondary mt-2">Try adjusting your search term.</p>
            </div>
         )}
      </section>
    </main>
  );
};
