import React from 'react';
import { StaffMember } from '../types';
import { PencilIcon, TrashIcon } from './icons';

interface StaffCardProps {
  staffMember: StaffMember;
}

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

const skillColor = (skill: string) => {
    let hash = 0;
    for (let i = 0; i < skill.length; i++) {
        hash = skill.charCodeAt(i) + ((hash << 5) - hash);
        hash |= 0; 
    }
    const colors = [
        'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300',
        'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
    ];
    return colors[Math.abs(hash) % colors.length];
};

export const StaffCard: React.FC<StaffCardProps> = ({ staffMember }) => {
  return (
    <div className="bg-brand-surface dark:bg-dark-brand-surface rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <div className="flex-grow">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-brand-blue-light/20 flex items-center justify-center text-brand-blue dark:text-white font-bold text-xl flex-shrink-0">
                {getInitials(staffMember.name)}
            </div>
            <div>
                <h3 className="text-lg font-bold text-brand-text-primary dark:text-dark-brand-text-primary">{staffMember.name}</h3>
                <p className="text-sm text-brand-text-secondary dark:text-dark-brand-text-secondary">{staffMember.contractedHours} hours/week</p>
            </div>
        </div>
        <div>
            <h4 className="text-sm font-semibold text-brand-text-secondary dark:text-dark-brand-text-secondary mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
                {staffMember.skills.map(skill => (
                    <span key={skill} className={`px-3 py-1 text-xs font-semibold rounded-full ${skillColor(skill)}`}>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4 flex justify-end gap-2">
            <button className="p-2 text-brand-text-secondary dark:text-dark-brand-text-secondary hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors" aria-label="Edit staff member">
                <PencilIcon className="w-5 h-5" />
            </button>
            <button className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full transition-colors" aria-label="Delete staff member">
                <TrashIcon className="w-5 h-5" />
            </button>
      </div>
    </div>
  );
};
