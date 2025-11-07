import React, { useState } from 'react';
import { ShiftAssignment, StaffMember, ShiftType } from '../types';
import { DATES } from '../constants';

interface RosterViewProps {
  roster: ShiftAssignment[];
  staff: StaffMember[];
  title: string;
}

const getShiftColor = (shiftType: ShiftType) => {
  switch (shiftType) {
    case ShiftType.Day:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    case ShiftType.Night:
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300';
    case ShiftType.Off:
      return 'bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-slate-400';
    default:
      return '';
  }
};

export const RosterView: React.FC<RosterViewProps> = ({ roster, staff, title }) => {
  const [expandedStaffId, setExpandedStaffId] = useState<string | null>(null);

  const handleToggleDetails = (staffId: string) => {
    setExpandedStaffId(prevId => (prevId === staffId ? null : staffId));
  };

  return (
    <div className="bg-brand-surface dark:bg-dark-brand-surface p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-brand-text-primary dark:text-dark-brand-text-primary mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="p-3 text-sm font-semibold text-brand-text-secondary dark:text-dark-brand-text-secondary">Staff Member</th>
              {DATES.map(date => (
                <th key={date} className="p-3 text-sm font-semibold text-brand-text-secondary dark:text-dark-brand-text-secondary text-center">
                  {new Date(date + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staff.map(member => (
              <React.Fragment key={member.id}>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td 
                    className="p-3 text-sm font-medium text-brand-text-primary dark:text-dark-brand-text-primary cursor-pointer hover:text-brand-blue dark:hover:text-brand-blue-light transition-colors"
                    onClick={() => handleToggleDetails(member.id)}
                    aria-expanded={expandedStaffId === member.id}
                    aria-controls={`details-${member.id}`}
                  >
                    {member.name}
                  </td>
                  {DATES.map(date => {
                    const assignment = roster.find(r => r.staffId === member.id && r.date === date);
                    const shiftType = assignment?.shiftType || ShiftType.Off;
                    return (
                      <td key={date} className="p-2 text-center">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getShiftColor(shiftType)}`}>
                          {shiftType === ShiftType.Off ? 'OFF' : shiftType.split(' ')[0]}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                {expandedStaffId === member.id && (
                  <tr id={`details-${member.id}`}>
                    <td colSpan={DATES.length + 1} className="p-3 bg-blue-50/50 dark:bg-slate-900/50">
                      <div className="p-4 bg-white dark:bg-dark-brand-surface rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                        <h4 className="text-base font-bold text-brand-text-primary dark:text-dark-brand-text-primary mb-3">{member.name} - Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-semibold text-brand-text-secondary dark:text-dark-brand-text-secondary mb-1">Contracted Hours</p>
                                <p className="text-brand-text-primary dark:text-dark-brand-text-primary">{member.contractedHours} hours/week</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-brand-text-secondary dark:text-dark-brand-text-secondary mb-1">Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {member.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};