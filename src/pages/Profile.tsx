import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { User, Mail, Clock, Save, Camera, Lock, Globe, Check } from 'lucide-react';

export default function Profile() {
  const { isDark } = useTheme();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Thompson',
    email: 'alex@company.com',
    role: 'Admin',
    workspace: 'Production',
    timezone: 'America/New_York',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Profile</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-[#1F1F23] hover:bg-[#27272A]' : 'bg-white hover:bg-gray-50'} border ${isDark ? 'border-[#27272A]' : 'border-gray-200'} shadow-sm`}>
                <Camera size={14} className={isDark ? 'text-gray-300' : 'text-gray-600'} />
              </button>
            </div>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>{profile.name}</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>{profile.email}</p>
            <div className="flex gap-2 mt-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                {profile.role}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                {profile.workspace}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className={`lg:col-span-2 rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Profile Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                <User size={14} className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                  isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100' : 'bg-white border-gray-200 text-[#111]'
                }`}
              />
            </div>

            <div>
              <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                <Mail size={14} className="inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                  isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100' : 'bg-white border-gray-200 text-[#111]'
                }`}
              />
            </div>

            <div>
              <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                <Globe size={14} className="inline mr-2" />
                Timezone
              </label>
              <select
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                  isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100' : 'bg-white border-gray-200 text-[#111]'
                }`}
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                saved
                  ? 'bg-green-500 text-white'
                  : 'bg-[#2F5CFF] text-white hover:bg-blue-600 active:scale-[0.98]'
              }`}
            >
              {saved ? (
                <>
                  <Check size={16} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Security</h3>
        
        <div className="space-y-4">
          <div>
            <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
              <Lock size={14} className="inline mr-2" />
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100 placeholder:text-gray-500' : 'bg-white border-gray-200 text-[#111] placeholder:text-gray-400'
              }`}
            />
          </div>

          <div>
            <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100 placeholder:text-gray-500' : 'bg-white border-gray-200 text-[#111] placeholder:text-gray-400'
              }`}
            />
          </div>

          <div>
            <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100 placeholder:text-gray-500' : 'bg-white border-gray-200 text-[#111] placeholder:text-gray-400'
              }`}
            />
          </div>

          <button className="px-6 py-2.5 bg-[#2F5CFF] text-white rounded-xl text-sm font-medium hover:bg-blue-600 active:scale-[0.98] transition-all">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
