import React from 'react';
import { Kpi } from '../types';

interface KpiCardProps {
  kpi: Kpi;
}

export const KpiCard: React.FC<KpiCardProps> = ({ kpi }) => {
  const isIncrease = kpi.changeType === 'increase';
  const changeColor = isIncrease ? 'text-red-500' : 'text-green-500';
  const arrow = isIncrease ? '▲' : '▼';

  return (
    <div className="bg-brand-surface dark:bg-dark-brand-surface p-4 rounded-xl shadow-md transition-all hover:shadow-lg">
      <h3 className="text-sm font-medium text-brand-text-secondary dark:text-dark-brand-text-secondary">{kpi.label}</h3>
      <div className="mt-2 flex items-baseline justify-between">
        <p className="text-2xl font-semibold text-brand-text-primary dark:text-dark-brand-text-primary">{kpi.value}</p>
        <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
          {arrow} {kpi.change}
        </div>
      </div>
      <p className="text-xs text-brand-text-secondary dark:text-dark-brand-text-secondary mt-1">{kpi.description}</p>
    </div>
  );
};