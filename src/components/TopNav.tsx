import {
  Search,
  Bell,
  ChevronDown,
  Activity,
  LayoutDashboard,
  GitBranch,
  Map,
  ScrollText,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import type { Page } from '../App';

interface TopNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const tabs: { label: string; page: Page; icon: any }[] = [
  { label: 'Overview', page: 'overview', icon: LayoutDashboard },
  { label: 'Workflows', page: 'workflows', icon: GitBranch },
  { label: 'Live Map', page: 'livemap', icon: Map },
  { label: 'Traces', page: 'traces', icon: ScrollText },
  { label: 'Incidents', page: 'incidents', icon: AlertTriangle },
  { label: 'Insights', page: 'insights', icon: BarChart3 },
];

export default function TopNav({ activePage, setActivePage }: TopNavProps) {
  return (
    <>
      <header className="flex items-center justify-between px-4 lg:px-8 h-16 bg-white border-b border-gray-100 flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2F5CFF] flex items-center justify-center">
            <Activity size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-[#111] hidden sm:block">OrchestrateIQ</span>
        </div>

        {/* Tab navigation - desktop */}
        <nav className="hidden xl:flex items-center bg-gray-100 rounded-full p-1 gap-0.5">
          {tabs.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activePage === page
                  ? 'bg-[#2F5CFF] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Live indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-600">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-medium">Live</span>
            <span className="text-gray-400 hidden lg:inline">·</span>
            <span className="hidden lg:inline">Last 1h</span>
            <ChevronDown size={14} className="text-gray-400 hidden lg:block" />
          </div>

          {/* Search */}
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all">
            <Search size={18} />
          </button>

          {/* Notifications */}
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          </button>

          {/* Avatar */}
          <button className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
            A
          </button>
        </div>
      </header>

      {/* Mobile tab bar */}
      <nav className="xl:hidden flex items-center overflow-x-auto bg-white border-b border-gray-100 px-4 gap-1 py-2 flex-shrink-0">
        {tabs.map(({ label, page, icon: Icon }) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activePage === page
                ? 'bg-[#2F5CFF] text-white'
                : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}
