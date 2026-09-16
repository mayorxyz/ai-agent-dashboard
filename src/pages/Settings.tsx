import { useState } from 'react';
import { useTheme, ThemeMode } from '../contexts/ThemeContext';
import { Settings as SettingsIcon, Palette, Bell, Key, Users, AlertTriangle, Sun, Moon, Monitor } from 'lucide-react';

export default function Settings() {
  const { theme, setTheme, isDark } = useTheme();
  const [activeSection, setActiveSection] = useState('appearance');

  const sections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Settings</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
          Manage your workspace settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className={`rounded-3xl p-4 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? isDark ? 'bg-[#2F5CFF]/10 text-[#2F5CFF]' : 'bg-blue-50 text-[#2F5CFF]'
                      : isDark ? 'text-gray-300 hover:bg-[#1F1F23]' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeSection === 'appearance' && (
            <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Appearance</h3>
              
              <div className="space-y-6">
                <div>
                  <label className={`text-sm font-medium block mb-3 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        theme === 'light'
                          ? 'border-[#2F5CFF] bg-blue-50 dark:bg-blue-900/20'
                          : isDark ? 'border-[#27272A] hover:border-[#3F3F46]' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Sun size={24} className={theme === 'light' ? 'text-[#2F5CFF]' : isDark ? 'text-gray-400' : 'text-gray-600'} />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Light</span>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        theme === 'dark'
                          ? 'border-[#2F5CFF] bg-blue-50 dark:bg-blue-900/20'
                          : isDark ? 'border-[#27272A] hover:border-[#3F3F46]' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Moon size={24} className={theme === 'dark' ? 'text-[#2F5CFF]' : isDark ? 'text-gray-400' : 'text-gray-600'} />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme('system')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        theme === 'system'
                          ? 'border-[#2F5CFF] bg-blue-50 dark:bg-blue-900/20'
                          : isDark ? 'border-[#27272A] hover:border-[#3F3F46]' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Monitor size={24} className={theme === 'system' ? 'text-[#2F5CFF]' : isDark ? 'text-gray-400' : 'text-gray-600'} />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>System</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`text-sm font-medium block mb-3 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                    Density
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className={`p-4 rounded-xl border-2 transition-all ${isDark ? 'border-[#27272A] hover:border-[#3F3F46]' : 'border-gray-200 hover:border-gray-300'}`}>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Comfortable</span>
                    </button>
                    <button className={`p-4 rounded-xl border-2 transition-all ${isDark ? 'border-[#27272A] hover:border-[#3F3F46]' : 'border-gray-200 hover:border-gray-300'}`}>
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Compact</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'general' && (
            <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>General Settings</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                General workspace settings will appear here.
              </p>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Notification Preferences</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                Configure how you receive notifications.
              </p>
            </div>
          )}

          {activeSection === 'api-keys' && (
            <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>API Keys</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                Manage your API keys for integrations.
              </p>
            </div>
          )}

          {activeSection === 'team' && (
            <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Team Management</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                Manage team members and permissions.
              </p>
            </div>
          )}

          {activeSection === 'danger' && (
            <div className={`rounded-3xl p-6 shadow-sm border-2 ${isDark ? 'bg-red-900/10 border-red-900/30' : 'bg-red-50 border-red-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>Danger Zone</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                Irreversible and destructive actions.
              </p>
              <button className="px-6 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 active:scale-[0.98] transition-all">
                Delete Workspace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
