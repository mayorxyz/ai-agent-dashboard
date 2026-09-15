import { useState } from 'react';
import {
  LayoutDashboard,
  Box,
  DollarSign,
  Wrench,
  Plug,
  Settings,
  Sun,
  Moon,
} from 'lucide-react';
import type { Page } from '../App';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems: { icon: typeof LayoutDashboard; label: string; page: Page }[] = [
  { icon: LayoutDashboard, label: 'Dashboard', page: 'overview' },
  { icon: Box, label: 'Agents', page: 'workflows' },
  { icon: DollarSign, label: 'Billing', page: 'insights' },
  { icon: Wrench, label: 'Tools', page: 'traces' },
  { icon: Plug, label: 'Integrations', page: 'livemap' },
  { icon: Settings, label: 'Settings', page: 'incidents' },
];

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <aside className="hidden md:flex w-16 lg:w-[72px] flex-col items-center py-6 gap-2 bg-white border-r border-gray-100">
      {/* Theme toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
      >
        {darkMode ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div className="w-8 h-px bg-gray-100 my-2" />

      {/* Navigation items */}
      <nav className="flex flex-col items-center gap-1 flex-1">
        {navItems.map(({ icon: Icon, label, page }) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            title={label}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
              activePage === page
                ? 'bg-[#2F5CFF] text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={20} />
          </button>
        ))}
      </nav>
    </aside>
  );
}
