import React from 'react';
import { LogoIcon, LayoutDashboardIcon, UsersIcon, BarChartIcon, SettingsIcon } from './icons';
import { Page } from '../App';

interface SidebarProps {
    isCollapsed: boolean;
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const NavLink: React.FC<{
    icon: React.ElementType,
    label: string,
    isCollapsed: boolean,
    isActive?: boolean,
    onClick: () => void;
}> = ({ icon: Icon, label, isCollapsed, isActive = false, onClick }) => {
    return (
        <li>
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
                className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
                    isActive
                        ? 'bg-brand-blue-light/20 text-brand-blue dark:text-white'
                        : 'text-brand-text-secondary hover:bg-gray-200 dark:text-dark-brand-text-secondary dark:hover:bg-slate-700'
                }`}
            >
                <Icon className="w-6 h-6 flex-shrink-0" />
                <span className={`ml-4 font-semibold transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    {label}
                </span>
            </a>
        </li>
    );
};

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, currentPage, onNavigate }) => {
    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-brand-surface dark:bg-dark-brand-surface border-r border-gray-200 dark:border-gray-700 z-30 transition-all duration-300 ease-in-out ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
                <LogoIcon className={`h-8 w-8 text-brand-blue transition-transform duration-300 ${isCollapsed ? 'rotate-90' : 'rotate-0'}`} />
                <h1 className={`ml-2 text-xl font-bold text-brand-text-primary dark:text-dark-brand-text-primary transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    IntelliRoster
                </h1>
            </div>
            <nav className="p-4">
                <ul>
                    <NavLink icon={LayoutDashboardIcon} label="Dashboard" isCollapsed={isCollapsed} isActive={currentPage === 'dashboard'} onClick={() => onNavigate('dashboard')} />
                    <NavLink icon={UsersIcon} label="Staff" isCollapsed={isCollapsed} isActive={currentPage === 'staff'} onClick={() => onNavigate('staff')} />
                    <NavLink icon={BarChartIcon} label="Reports" isCollapsed={isCollapsed} isActive={currentPage === 'reports'} onClick={() => onNavigate('reports')} />
                    <NavLink icon={SettingsIcon} label="Settings" isCollapsed={isCollapsed} isActive={currentPage === 'settings'} onClick={() => onNavigate('settings')} />
                </ul>
            </nav>
        </aside>
    );
};
