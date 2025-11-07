import React, { useState, useCallback } from 'react';
import { INITIAL_ROSTER, KPIS, STAFF_MEMBERS } from '../constants';
import { ShiftAssignment, Kpi } from '../types';
import { KpiCard } from './KpiCard';
import { RosterView } from './RosterView';
import { OptimizationPanel } from './OptimizationPanel';
import { generateOptimalRoster } from '../services/geminiService';
import { Theme } from '../App';
import { MoonIcon, SunIcon } from './icons';

interface DashboardProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ theme, toggleTheme }) => {
  const [roster, setRoster] = useState<ShiftAssignment[]>(INITIAL_ROSTER);

  const handleGenerateRoster = useCallback(async (constraints: string): Promise<ShiftAssignment[] | null> => {
    const newRoster = await generateOptimalRoster(STAFF_MEMBERS, roster, constraints);
    return newRoster;
  }, [roster]);

  const handleAcceptSuggestion = (newRoster: ShiftAssignment[]) => {
    setRoster(newRoster);
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-brand-text-primary dark:text-dark-brand-text-primary">ED Staffing Dashboard</h1>
          <p className="text-brand-text-secondary dark:text-dark-brand-text-secondary mt-1">AI-powered insights for optimal scheduling.</p>
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
      
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPIS.map((kpi: Kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <RosterView roster={roster} staff={STAFF_MEMBERS} title="Current Roster" />
        </div>
        <div className="lg:col-span-1">
          <OptimizationPanel onGenerateRoster={handleGenerateRoster} onAcceptSuggestion={handleAcceptSuggestion} />
        </div>
      </section>
    </main>
  );
};