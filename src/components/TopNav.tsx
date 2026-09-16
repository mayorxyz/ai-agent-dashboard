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
  DollarSign,
  User,
  Settings,
  LogOut,
  CreditCard,
  Check,
  CheckCheck,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import SearchModal from './SearchModal';
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
  { label: 'Cost', page: 'cost', icon: DollarSign },
  { label: 'Compare', page: 'compare', icon: GitBranch },
];

const initialNotifications = [
  { id: 1, title: 'DataFetcher timeout detected', desc: 'Error rate exceeded 5% threshold', time: '2 min ago', read: false },
  { id: 2, title: 'New workflow auto-detected', desc: 'Research & Summarization flow', time: '15 min ago', read: false },
  { id: 3, title: 'Incident resolved', desc: 'INC-003: Rate limit exceeded', time: '1 hour ago', read: true },
  { id: 4, title: 'Cost alert', desc: 'Daily spend approaching $50 threshold', time: '2 hours ago', read: true },
];

export default function TopNav({ activePage, setActivePage }: TopNavProps) {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toast, setToast] = useState<string | null>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on outside click
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

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string) => {
    setToast(message);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read');
  };

  const handleViewAllNotifications = () => {
    setShowNotifs(false);
    showToast('Opening notifications center...');
  };

  const handleMarkNotificationRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleAccountAction = (action: string) => {
    setShowAccount(false);
    switch (action) {
      case 'profile':
        showToast('Opening profile...');
        break;
      case 'settings':
        navigate('/incidents');
        showToast('Opening settings...');
        break;
      case 'billing':
        navigate('/insights');
        showToast('Opening billing...');
        break;
      case 'logout':
        showToast('Logged out successfully');
        break;
    }
  };

  return (
    <>
      <header className={`flex items-center gap-4 px-4 lg:px-8 h-16 border-b flex-shrink-0 w-full min-w-0 transition-colors duration-300 ${
        isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
      }`}>
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0" style={{ minWidth: 0 }}>
          <div className="w-8 h-8 rounded-lg bg-[#2F5CFF] flex items-center justify-center flex-shrink-0">
            <Activity size={16} className="text-white" />
          </div>
          <span className={`text-lg font-bold hidden sm:block whitespace-nowrap ${isDark ? 'text-gray-100' : 'text-[#111]'}`} style={{ minWidth: 0 }}>
            OrchestrateIQ
          </span>
        </div>

        {/* Tab navigation - desktop */}
        <nav className="hidden xl:flex flex-1 min-w-0 overflow-x-auto scrollbar-hide" style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
          <div className={`flex items-center rounded-full p-1 gap-0.5 mx-auto ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-100'}`}>
            {tabs.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                style={{ flexShrink: 0, minWidth: 0 }}
                className={`px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap active:scale-95 ${
                  activePage === page
                    ? 'bg-[#2F5CFF] text-white shadow-sm'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-[#27272A]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0" style={{ minWidth: 0 }}>
          {/* Search */}
          <button
            onClick={() => setShowSearch(true)}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${
              isDark ? 'hover:bg-[#1F1F23] text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
            }`}
            title="Search (⌘K)"
          >
            <Search size={18} />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotifs(!showNotifs); setShowAccount(false); }}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all relative ${
                isDark ? 'hover:bg-[#1F1F23] text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
              }`}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              )}
            </button>

            {showNotifs && (
              <div className={`absolute right-0 top-12 w-80 rounded-2xl shadow-xl border z-50 animate-fadeIn overflow-hidden ${
                isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-gray-100'
              }`}>
                <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-[#27272A]' : 'border-gray-100'}`}>
                  <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Notifications</h3>
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs text-[#2F5CFF] hover:underline font-medium flex items-center gap-1"
                  >
                    <CheckCheck size={12} />
                    Mark all read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleMarkNotificationRead(n.id)}
                      className={`p-4 border-b cursor-pointer transition-all ${
                        isDark ? 'border-[#27272A]' : 'border-gray-50'
                      } ${!n.read 
                        ? isDark ? 'bg-[#2F5CFF]/5 hover:bg-[#27272A]' : 'bg-blue-50/30 hover:bg-gray-50'
                        : isDark ? 'hover:bg-[#27272A]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {!n.read && <div className="w-2 h-2 rounded-full bg-[#2F5CFF] mt-1.5 flex-shrink-0" />}
                        <div className={!n.read ? '' : 'ml-5'}>
                          <p className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>{n.title}</p>
                          <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>{n.desc}</p>
                          <p className={`text-[10px] mt-1 ${isDark ? 'text-gray-500' : 'text-[#9CA3AF]'}`}>{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`p-3 border-t ${isDark ? 'border-[#27272A]' : 'border-gray-100'}`}>
                  <button
                    onClick={handleViewAllNotifications}
                    className="w-full text-center text-xs text-[#2F5CFF] font-medium hover:underline py-1"
                  >
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
              <div className={`absolute right-0 top-12 w-56 rounded-2xl shadow-xl border z-50 animate-fadeIn overflow-hidden ${
                isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-gray-100'
              }`}>
                <div className={`p-4 border-b ${isDark ? 'border-[#27272A]' : 'border-gray-100'}`}>
                  <p className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Alex Thompson</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>alex@company.com</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => handleAccountAction('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                      isDark ? 'text-gray-300 hover:bg-[#27272A]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User size={16} className="text-gray-400" />
                    Profile
                  </button>
                  <button
                    onClick={() => handleAccountAction('settings')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                      isDark ? 'text-gray-300 hover:bg-[#27272A]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Settings size={16} className="text-gray-400" />
                    Settings
                  </button>
                  <button
                    onClick={() => handleAccountAction('billing')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${
                      isDark ? 'text-gray-300 hover:bg-[#27272A]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard size={16} className="text-gray-400" />
                    Billing
                  </button>
                </div>
                <div className={`border-t py-2 ${isDark ? 'border-[#27272A]' : 'border-gray-100'}`}>
                  <button
                    onClick={() => handleAccountAction('logout')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
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
      <nav className={`xl:hidden flex items-center overflow-x-auto border-b px-4 gap-1 py-2 flex-shrink-0 w-full scrollbar-hide ${
        isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
      }`}>
        {tabs.map(({ label, page, icon: Icon }) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 flex-shrink-0 ${
              activePage === page
                ? 'bg-[#2F5CFF] text-white shadow-sm'
                : isDark
                  ? 'text-gray-400 bg-[#1F1F23] hover:bg-[#27272A]'
                  : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-fadeIn">
          <div className={`px-4 py-2.5 rounded-full shadow-lg text-sm font-medium ${
            isDark ? 'bg-[#27272A] text-gray-100 border border-[#3F3F46]' : 'bg-[#111] text-white'
          }`}>
            {toast}
          </div>
        </div>
      )}
    </>
  );
}
