import React, { useState } from 'react';
import { ShiftAssignment } from '../types';
import { SparklesIcon, LoadingIcon } from './icons';
import { RosterView } from './RosterView';
import { STAFF_MEMBERS } from '../constants';

interface OptimizationPanelProps {
  onGenerateRoster: (constraints: string) => Promise<ShiftAssignment[] | null>;
  onAcceptSuggestion: (roster: ShiftAssignment[]) => void;
}

export const OptimizationPanel: React.FC<OptimizationPanelProps> = ({ onGenerateRoster, onAcceptSuggestion }) => {
  const [constraints, setConstraints] = useState('Minimize overtime. Ensure 2 charge nurses are available on weekends.');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedRoster, setSuggestedRoster] = useState<ShiftAssignment[] | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestedRoster(null);
    try {
      const result = await onGenerateRoster(constraints);
      setSuggestedRoster(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    if (suggestedRoster) {
      onAcceptSuggestion(suggestedRoster);
      setSuggestedRoster(null);
    }
  };

  return (
    <div className="bg-brand-surface dark:bg-dark-brand-surface p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold text-brand-text-primary dark:text-dark-brand-text-primary">AI Roster Optimization</h2>
      <div>
        <label htmlFor="constraints" className="block text-sm font-medium text-brand-text-secondary dark:text-dark-brand-text-secondary mb-1">
          Add Constraints or Goals
        </label>
        <textarea
          id="constraints"
          rows={3}
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-brand-text-primary dark:text-dark-brand-text-primary rounded-md focus:ring-2 focus:ring-brand-blue-light focus:border-brand-blue-light transition placeholder:text-gray-400 dark:placeholder:text-slate-400"
          placeholder="e.g., Prioritize staff well-being. Jane Doe needs Friday off."
        />
      </div>
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <LoadingIcon className="w-5 h-5" />
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Generate Optimal Roster
          </>
        )}
      </button>

      {error && <p className="text-sm text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900/50 p-3 rounded-md">{error}</p>}
      
      {suggestedRoster && (
        <div className="space-y-4 border-t pt-6 dark:border-gray-700">
          <RosterView roster={suggestedRoster} staff={STAFF_MEMBERS} title="AI-Generated Suggestion" />
          <div className="flex justify-end gap-4">
            <button onClick={() => setSuggestedRoster(null)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-brand-text-secondary dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-dark-brand-text-primary font-semibold rounded-lg transition-colors">
              Reject
            </button>
            <button onClick={handleAccept} className="px-4 py-2 bg-brand-green hover:bg-brand-green/90 text-white font-semibold rounded-lg transition-colors">
              Accept & Update Roster
            </button>
          </div>
        </div>
      )}
    </div>
  );
};