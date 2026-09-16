import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function AgentTimeline({ events, agents }: { events: any[], agents: any[] }) {
  const { isDark } = useTheme();
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h'>('1h');
  const [density, setDensity] = useState<'compact' | 'expanded'>('expanded');

  return (
    <div className={`rounded-3xl border transition-colors duration-300 ${
      isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-200/50'
    }`} style={{ boxShadow: 'var(--shadow-lifted)' }}>
      <div className={`p-6 border-b ${isDark ? 'border-[#1F1F23]' : 'border-gray-200/50'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className={`text-h2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Agent Activity Timeline</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className={`text-caption ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Live</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center rounded-lg p-1 ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-100'}`}>
              {(['1h', '6h', '24h'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-md text-caption font-medium transition-all duration-200 ${
                    timeRange === range
                      ? isDark ? 'bg-[#2F5CFF] text-white' : 'bg-white text-[#2F5CFF] shadow-sm'
                      : isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button
              onClick={() => setDensity(density === 'compact' ? 'expanded' : 'compact')}
              className={`px-3 py-1.5 rounded-lg text-caption font-medium transition-all duration-200 ${
                isDark ? 'bg-[#1F1F23] text-gray-300 hover:bg-[#27272A]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {density === 'compact' ? 'Compact' : 'Expanded'}
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {agents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-100'}`}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <p className={`text-body ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No agents configured yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {agents.map((agent, idx) => (
              <div key={agent.name} className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${agent.color}20`, boxShadow: `inset 0 0 0 1px ${agent.color}33` }}>
                    <div style={{ color: agent.color }}>{agent.icon}</div>
                  </div>
                  <span className={`text-body font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`} style={{ letterSpacing: '-0.01em' }}>{agent.name}</span>
                </div>
                <div className={`relative h-${density === 'compact' ? '12' : '16'} rounded-lg ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-50'}`}>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-[#2F5CFF] z-10" style={{ left: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
