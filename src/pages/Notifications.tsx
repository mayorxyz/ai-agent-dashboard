import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Bell, Check, CheckCheck, AlertTriangle, Info, Zap, MessageSquare } from 'lucide-react';
import { notifications } from '../data/mockData';

export default function Notifications() {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState<'all' | 'unread' | 'incidents' | 'system' | 'mentions'>('all');
  const [notifs, setNotifs] = useState(notifications);

  const filteredNotifs = notifs.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'incidents') return n.type === 'incident';
    if (filter === 'system') return n.type === 'system';
    if (filter === 'mentions') return n.type === 'mention';
    return true;
  });

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'incidents', label: 'Incidents' },
    { id: 'system', label: 'System' },
    { id: 'mentions', label: 'Mentions' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'incident': return AlertTriangle;
      case 'system': return Zap;
      case 'mention': return MessageSquare;
      default: return Info;
    }
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Notifications</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            Stay updated with your agent system activity
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#2F5CFF] text-white rounded-full text-sm font-medium hover:bg-blue-600 active:scale-[0.98] transition-all"
        >
          <CheckCheck size={16} />
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className={`rounded-3xl p-2 shadow-sm border inline-flex gap-1 ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f.id
                ? 'bg-[#2F5CFF] text-white'
                : isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-[#1F1F23]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className={`rounded-3xl p-12 shadow-sm border text-center ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
            <Bell size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>No notifications</p>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-[#6B7280]'}`}>
              You're all caught up!
            </p>
          </div>
        ) : (
          filteredNotifs.map((notif) => {
            const Icon = getIcon(notif.type);
            return (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`rounded-2xl p-5 shadow-sm border transition-all cursor-pointer ${
                  !notif.read
                    ? isDark ? 'bg-[#111113] border-l-4 border-l-[#2F5CFF] border-[#1F1F23]' : 'bg-white border-l-4 border-l-[#2F5CFF] border-gray-100'
                    : isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
                } hover:shadow-md`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    notif.type === 'incident'
                      ? isDark ? 'bg-red-900/30' : 'bg-red-50'
                      : notif.type === 'system'
                        ? isDark ? 'bg-blue-900/30' : 'bg-blue-50'
                        : isDark ? 'bg-purple-900/30' : 'bg-purple-50'
                  }`}>
                    <Icon size={18} className={
                      notif.type === 'incident'
                        ? isDark ? 'text-red-400' : 'text-red-500'
                        : notif.type === 'system'
                          ? isDark ? 'text-blue-400' : 'text-blue-500'
                          : isDark ? 'text-purple-400' : 'text-purple-500'
                    } />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-[#2F5CFF] flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                      {notif.desc}
                    </p>
                    <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-[#9CA3AF]'}`}>
                      {notif.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
