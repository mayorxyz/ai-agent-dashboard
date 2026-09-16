import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, ChevronDown, Activity, LayoutDashboard, GitBranch, Map, ScrollText, AlertTriangle, BarChart3, DollarSign, User, Settings, LogOut, CreditCard, Check, CheckCheck, Plus, Rocket, FlaskConical, Laptop, type LucideIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import type { Page } from '../App';

interface TopNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const tabs: { label: string; page: Page; icon: LucideIcon }[] = [
  { label: 'Overview', page: 'overview', icon: LayoutDashboard },
  { label: 'Workflows', page: 'workflows', icon: GitBranch },
  { label: 'Live Map', page: 'livemap', icon: Map },
  { label: 'Traces', page: 'traces', icon: ScrollText },
  { label: 'Incidents', page: 'incidents', icon: AlertTriangle },
  { label: 'Insights', page: 'insights', icon: BarChart3 },
];

const getWorkspaceIcon = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    'Rocket': Rocket,
    'FlaskConical': FlaskConical,
    'Laptop': Laptop,
  };
  return iconMap[iconName] || Rocket;
};

const workspaces = [
  { id: 1, name: 'Production', icon: 'Rocket', members: 12 },
  { id: 2, name: 'Staging', icon: 'FlaskConical', members: 8 },
  { id: 3, name: 'Development', icon: 'Laptop', members: 15 },
];

const notifications = [
  { id: 1, type: 'incident', title: 'DataFetcher timeout detected', desc: 'Error rate exceeded 5% threshold', time: '2 min ago', read: false },
  { id: 2, type: 'system', title: 'New workflow auto-detected', desc: 'Research & Summarization flow', time: '15 min ago', read: false },
  { id: 3, type: 'incident', title: 'Incident resolved', desc: 'INC-003: Rate limit exceeded', time: '1 hour ago', read: true },
  { id: 4, type: 'system', title: 'Cost alert', desc: 'Daily spend approaching $50 threshold', time: '2 hours ago', read: true },
  { id: 5, type: 'mention', title: 'Sarah K. mentioned you', desc: 'in incident INC-001 discussion', time: '3 hours ago', read: true },
];

export default function TopNav({ activePage, setActivePage }: TopNavProps) {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [notifs, setNotifs] = useState(notifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setShowAccount(false);
      if (workspaceRef.current && !workspaceRef.current.contains(e.target as Node)) setShowWorkspace(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`flex items-center gap-4 px-4 lg:px-8 h-16 border-b flex-shrink-0 w-full min-w-0 transition-colors duration-300 ${
      isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#2F5CFF] flex items-center justify-center flex-shrink-0">
          <Activity size={16} className="text-white" />
        </div>
        <span className={`text-lg font-bold hidden sm:block whitespace-nowrap ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
          OrchestrateIQ
        </span>
      </div>

      <nav className="hidden xl:flex flex-1 min-w-0 overflow-x-auto scrollbar-hide">
        <div className={`flex items-center rounded-full p-1 gap-0.5 mx-auto ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-100'}`}>
          {tabs.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activePage === page
                  ? 'bg-[#2F5CFF] text-white shadow-sm'
                  : isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-[#27272A]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
        <div className="relative hidden md:block" ref={workspaceRef}>
          <button
            onClick={() => { setShowWorkspace(!showWorkspace); setShowNotifs(false); setShowAccount(false); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              isDark ? 'bg-[#1F1F23] text-gray-300 hover:bg-[#27272A]' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {(() => {
              const Icon = getWorkspaceIcon(activeWorkspace.icon);
              return <Icon size={16} className={isDark ? 'text-gray-300' : 'text-gray-700'} />;
            })()}
            <span className="hidden lg:inline">{activeWorkspace.name}</span>
            <ChevronDown size={14} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          </button>

          <AnimatePresence>
            {showWorkspace && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className={`absolute right-0 top-12 w-64 rounded-2xl shadow-xl border z-50 ${
                  isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-gray-100'
                }`}
              >
                <div className={`p-3 border-b ${isDark ? 'border-[#27272A]' : 'border-gray-100'}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Workspaces
                  </p>
                </div>
                <div className="py-2">
                  {workspaces.map((workspace) => {
                    const Icon = getWorkspaceIcon(workspace.icon);
                    return (
                      <button
                        key={workspace.id}
                        onClick={() => {
                          setActiveWorkspace(workspace);
                          setShowWorkspace(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                          activeWorkspace.id === workspace.id
                            ? isDark ? 'bg-[#2F5CFF]/10 text-[#2F5CFF]' : 'bg-blue-50 text-[#2F5CFF]'
                            : isDark ? 'text-gray-300 hover:bg-[#27272A]' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={18} className={isDark ? 'text-gray-300' : 'text-gray-700'} />
                        <div className="flex-1 text-left">
                          <p className="font-medium">{workspace.name}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {workspace.members} members
                          </p>
                        </div>
                        {activeWorkspace.id === workspace.id && <Check size={16} />}
                      </button>
                    );
                  })}
                </div>
                <div className={`border-t p-2 ${isDark ? 'border-[#27272A]' : 'border-gray-100'}`}>
                  <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-all duration-200 ${
                    isDark ? 'text-gray-400 hover:bg-[#27272A]' : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                    <Plus size={16} />
                    <span className="font-medium">Add workspace</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${
          isDark ? 'hover:bg-[#1F1F23] text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
        }`}>
          <Search size={18} />
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowAccount(false); setShowWorkspace(false); }}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 relative ${
              isDark ? 'hover:bg-[#1F1F23] text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
            }`}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className={`absolute right-0 top-12 w-80 rounded-2xl shadow-xl border z-50 ${
                  isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-gray-100'
                }`}
              >
                <div className={`p-4 border-b flex items-center justify-between ${isDark ? 'border-[#27272A]' : 'border-gray-100'}`}>
                  <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Notifications</h3>
                  <button
                    onClick={() => { setNotifs(notifs.map(n => ({ ...n, read: true }))); }}
                    className="text-xs text-[#2F5CFF] hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifs.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setNotifs(notifs.map(notif => notif.id === n.id ? { ...notif, read: true } : notif));
                        if (n.type === 'incident') navigate('/incidents');
                      }}
                      className={`p-4 border-b cursor-pointer transition-all duration-200 ${
                        isDark ? 'border-[#27272A]' : 'border-gray-50'
                      } ${!n.read ? isDark ? 'bg-[#2F5CFF]/5 hover:bg-[#27272A]' : 'bg-blue-50/30 hover:bg-gray-50' : isDark ? 'hover:bg-[#27272A]' : 'hover:bg-gray-50'}`}
                    >
                      <p className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>{n.title}</p>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>{n.desc}</p>
                      <p className={`text-[10px] mt-1 ${isDark ? 'text-gray-500' : 'text-[#9CA3AF]'}`}>{n.time}</p>
                    </div>
                  ))}
                </div>
                <div className={`p-3 border-t ${isDark ? 'border-[#27272A]' : 'border-gray-100'}`}>
                  <button
                    onClick={() => { setShowNotifs(false); navigate('/notifications'); }}
                    className="w-full text-center text-xs text-[#2F5CFF] font-medium hover:underline py-1"
                  >
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={accountRef}>
          <button
            onClick={() => { setShowAccount(!showAccount); setShowNotifs(false); setShowWorkspace(false); }}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold hover:ring-2 hover:ring-blue-200 transition-all duration-200"
          >
            A
          </button>

          <AnimatePresence>
            {showAccount && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className={`absolute right-0 top-12 w-56 rounded-2xl shadow-xl border z-50 ${
                  isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-gray-100'
                }`}
              >
                <div className={`p-4 border-b ${isDark ? 'border-[#27272A]' : 'border-gray-100'}`}>
                  <p className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Alex Thompson</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>alex@company.com</p>
                </div>
                <div className="py-2">
                  <button onClick={() => { setShowAccount(false); navigate('/profile'); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${isDark ? 'text-gray-300 hover:bg-[#27272A]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <User size={16} className="text-gray-400" /> Profile
                  </button>
                  <button onClick={() => { setShowAccount(false); navigate('/settings'); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${isDark ? 'text-gray-300 hover:bg-[#27272A]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <Settings size={16} className="text-gray-400" /> Settings
                  </button>
                  <button onClick={() => { setShowAccount(false); navigate('/billing'); }} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${isDark ? 'text-gray-300 hover:bg-[#27272A]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <CreditCard size={16} className="text-gray-400" /> Billing
                  </button>
                </div>
                <div className={`border-t py-2 ${isDark ? 'border-[#27272A]' : 'border-gray-100'}`}>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-200">
                    <LogOut size={16} /> Log out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
