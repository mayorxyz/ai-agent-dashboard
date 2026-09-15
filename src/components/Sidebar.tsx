import { useState } from 'react';
import {
  LayoutDashboard,
  Box,
  DollarSign,
  Wrench,
  Plug,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  Activity,
} from 'lucide-react';
import type { Page } from '../App';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const topNavItems: { icon: typeof LayoutDashboard; label: string; page: Page }[] = [
  { icon: LayoutDashboard, label: 'Dashboard', page: 'overview' },
  { icon: Box, label: 'Agents', page: 'workflows' },
  { icon: Plug, label: 'Integrations', page: 'livemap' },
  { icon: Wrench, label: 'Tools', page: 'traces' },
];

const bottomNavItems: { icon: typeof Settings; label: string; page: Page }[] = [
  { icon: DollarSign, label: 'Billing', page: 'insights' },
  { icon: Settings, label: 'Settings', page: 'incidents' },
];

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <aside className="hidden md:flex w-16 lg:w-[72px] flex-shrink-0 h-screen flex-col items-center bg-white border-r border-gray-100">
      {/* Top section: Logo + Theme toggle */}
      <div className="flex flex-col items-center pt-5 pb-3 gap-2">
        <div className="w-9 h-9 rounded-xl bg-[#2F5CFF] flex items-center justify-center mb-1">
          <Activity size={16} className="text-white" />
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-all"
          title="Toggle theme"
        >
          {darkMode ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-gray-100" />

      {/* Middle section: Main navigation (scrollable if needed) */}
      <nav className="flex-1 flex flex-col items-center gap-1 py-4 overflow-y-auto w-full px-2">
        {topNavItems.map(({ icon: Icon, label, page }) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            title={label}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-95 ${
              activePage === page
                ? 'bg-[#2F5CFF] text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon size={20} />
          </button>
        ))}
      </nav>

      {/* Bottom section: Secondary nav + help */}
      <div className="flex flex-col items-center gap-1 pb-4 pt-2 w-full px-2">
        <div className="w-8 h-px bg-gray-100 mb-2" />
        {bottomNavItems.map(({ icon: Icon, label, page }) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            title={label}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all active:scale-95 ${
              activePage === page
                ? 'bg-[#2F5CFF] text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon size={20} />
          </button>
        ))}
        <button
          title="Help"
          className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:scale-95 transition-all mt-1"
        >
          <HelpCircle size={20} />
        </button>
      </div>
    </aside>
  );
}
