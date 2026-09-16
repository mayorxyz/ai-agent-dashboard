import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { UserPlus, Mail, Shield, MoreVertical } from 'lucide-react';

export default function Team() {
  const { isDark } = useTheme();
  const [inviteEmail, setInviteEmail] = useState('');

  const members = [
    { id: 1, name: 'Alex Thompson', email: 'alex@company.com', role: 'Owner', avatar: 'AT' },
    { id: 2, name: 'Sarah Kim', email: 'sarah@company.com', role: 'Admin', avatar: 'SK' },
    { id: 3, name: 'Mike Rodriguez', email: 'mike@company.com', role: 'Member', avatar: 'MR' },
  ];

  const pendingInvites = [
    { id: 1, email: 'john@company.com', role: 'Member', sentAt: '2 hours ago' },
  ];

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Team</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
          Manage your team members and permissions
        </p>
      </div>

      {/* Invite Member */}
      <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Invite Team Member</h3>
        <div className="flex gap-3">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="colleague@company.com"
            className={`flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
              isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100 placeholder:text-gray-500' : 'bg-white border-gray-200 text-[#111] placeholder:text-gray-400'
            }`}
          />
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#2F5CFF] text-white rounded-xl text-sm font-medium hover:bg-blue-600 active:scale-[0.98] transition-all">
            <UserPlus size={16} />
            Invite
          </button>
        </div>
      </div>

      {/* Team Members */}
      <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Team Members ({members.length})</h3>
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className={`flex items-center justify-between p-4 rounded-xl ${isDark ? 'bg-[#1F1F23] hover:bg-[#27272A]' : 'bg-gray-50 hover:bg-gray-100'} transition-all`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                  {member.avatar}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>{member.name}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                  member.role === 'Owner'
                    ? isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-50 text-purple-600'
                    : member.role === 'Admin'
                      ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'
                      : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Shield size={12} />
                  {member.role}
                </span>
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-[#3F3F46]' : 'hover:bg-gray-200'} transition-all`}>
                  <MoreVertical size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Invites */}
      {pendingInvites.length > 0 && (
        <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Pending Invites</h3>
          <div className="space-y-3">
            {pendingInvites.map((invite) => (
              <div
                key={invite.id}
                className={`flex items-center justify-between p-4 rounded-xl ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <Mail size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>{invite.email}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                      Invited as {invite.role} · {invite.sentAt}
                    </p>
                  </div>
                </div>
                <button className={`px-4 py-2 rounded-xl text-sm font-medium ${isDark ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-50 text-red-600 hover:bg-red-100'} transition-all`}>
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
