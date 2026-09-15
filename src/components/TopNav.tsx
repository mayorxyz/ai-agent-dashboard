import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  User,
  Settings,
  LogOut,
  CreditCard,
  Check,
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

const notifications = [
  { id: 1, title: 'DataFetcher timeout detected', desc: 'Error rate exceeded 5% threshold', time: '2 min ago', read: false },
  { id: 2, title: 'New workflow auto-detected', desc: 'Research & Summarization flow', time: '15 min ago', read: false },
  { id: 3, title: 'Incident resolved', desc: 'INC-003: Rate limit exceeded', time: '1 hour ago', read: true },
  { id: 4, title: 'Cost alert', desc: 'Daily spend approaching $50 threshold', time: '2 hours ago', read: true },
];

export default function TopNav({ activePage, setActivePage }: TopNavProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifs(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setShowAccount(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between px-4 lg:px-8 h-16 bg-white border-b border-gray-100 flex-shrink-0 w-full min-w-0">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#2F5CFF] flex items-center justify-center flex-shrink-0">
            <Activity size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-[#111] hidden sm:block whitespace-nowrap overflow-hidden text-ellipsis">OrchestrateIQ</span>
        </div>

        {/* Tab navigation - desktop */}
        <nav className="hidden xl:flex items-center bg-gray-100 rounded-full p-1 gap-0.5 flex-shrink min-w-0 overflow-hidden">
          {tabs.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap active:scale-95 flex-shrink-0 ${
                activePage === page
                  ? 'bg-[#2F5CFF] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0 min-w-0">
          {/* Search */}
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 text-gray-400 hover:text-gray-600 transition-all">
            <Search size={18} />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotifs(!showNotifs); setShowAccount(false); }}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 text-gray-400 hover:text-gray-600 transition-all relative"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {showNotifs && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fadeIn overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#111]">Notifications</h3>
                  <button className="text-xs text-[#2F5CFF] hover:underline font-medium">Mark all read</button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-all ${!n.read ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        {!n.read && <div className="w-2 h-2 rounded-full bg-[#2F5CFF] mt-1.5 flex-shrink-0" />}
                        <div className={!n.read ? '' : 'ml-5'}>
                          <p className="text-sm font-medium text-[#111]">{n.title}</p>
                          <p className="text-xs text-[#6B7280] mt-0.5">{n.desc}</p>
                          <p className="text-[10px] text-[#9CA3AF] mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="w-full text-center text-xs text-[#2F5CFF] font-medium hover:underline py-1">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Avatar / Account menu */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => { setShowAccount(!showAccount); setShowNotifs(false); }}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold hover:ring-2 hover:ring-blue-200 transition-all active:scale-95"
            >
              A
            </button>

            {showAccount && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fadeIn overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <p className="text-sm font-semibold text-[#111]">Alex Thompson</p>
                  <p className="text-xs text-[#6B7280]">alex@company.com</p>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all">
                    <User size={16} className="text-gray-400" />
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all">
                    <Settings size={16} className="text-gray-400" />
                    Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-all">
                    <CreditCard size={16} className="text-gray-400" />
                    Billing
                  </button>
                </div>
                <div className="border-t border-gray-100 py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all">
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile tab bar */}
      <nav className="xl:hidden flex items-center overflow-x-auto bg-white border-b border-gray-100 px-4 gap-1 py-2 flex-shrink-0">
        {tabs.map(({ label, page, icon: Icon }) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${
              activePage === page
                ? 'bg-[#2F5CFF] text-white shadow-sm'
                : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
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
