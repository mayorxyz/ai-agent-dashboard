import { useState } from 'react';
import { Activity, CheckCircle2, AlertTriangle, XCircle, Mail } from 'lucide-react';
import { agents, uptimeHistory, slaData } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

export default function Status() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const overallStatus = 'operational'; // Could be 'operational', 'degraded', or 'outage'

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return { bg: 'bg-green-500', text: 'text-green-600', label: 'Operational' };
      case 'degraded': return { bg: 'bg-amber-500', text: 'text-amber-600', label: 'Degraded' };
      case 'outage': return { bg: 'bg-red-500', text: 'text-red-600', label: 'Outage' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-600', label: 'Unknown' };
    }
  };

  const overallStatusColor = getStatusColor(overallStatus);

  const agentColors: Record<string, string> = {
    Researcher: '#10B981',
    Supervisor: '#8B5CF6',
    DataFetcher: '#3B82F6',
    Validator: '#F59E0B',
    Responder: '#EF4444',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2F5CFF] flex items-center justify-center">
                <Activity size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#111]">OrchestrateIQ</h1>
                <p className="text-xs text-[#6B7280]">System Status</p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              overallStatus === 'operational' ? 'bg-green-50' :
              overallStatus === 'degraded' ? 'bg-amber-50' : 'bg-red-50'
            }`}>
              <div className={`w-2 h-2 rounded-full ${overallStatusColor.bg} animate-pulse`} />
              <span className={`text-sm font-medium ${overallStatusColor.text}`}>
                {overallStatus === 'operational' ? 'All systems operational' : overallStatusColor.label}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Agent Status List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-[#111]">Agent Status</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {agents.map((agent) => {
              const sla = slaData[agent.name as keyof typeof slaData];
              const history = uptimeHistory[agent.name as keyof typeof uptimeHistory];
              const statusColor = getStatusColor(sla.status);
              const color = agentColors[agent.name];

              return (
                <div key={agent.name} className="px-6 py-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      <h3 className="text-sm font-semibold text-[#111]">{agent.name}</h3>
                      <span className="text-xs text-[#6B7280]">{agent.role}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-[#111]">{sla.uptime}% uptime</span>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusColor.bg}/10`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${statusColor.bg}`} />
                        <span className={`text-xs font-medium ${statusColor.text}`}>
                          {statusColor.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 90-day uptime bar */}
                  <div className="flex gap-0.5">
                    {history.slice(-90).map((day, i) => {
                      const dayStatus = getStatusColor(day.status);
                      return (
                        <div
                          key={i}
                          className={`flex-1 h-6 rounded-sm ${dayStatus.bg} hover:opacity-80 transition-opacity cursor-pointer relative group`}
                          title={`${day.date}: ${dayStatus.label}`}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#111] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {day.date}: {dayStatus.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscribe to Updates */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-[#111] mb-2">Subscribe to Updates</h2>
          <p className="text-sm text-[#6B7280] mb-4">
            Get notified when there are status changes or incidents.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-3">
            <div className="flex-1 relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#2F5CFF] transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#2F5CFF] text-white rounded-xl text-sm font-medium hover:bg-blue-600 active:scale-[0.98] transition-all"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {subscribed && (
            <p className="mt-3 text-sm text-green-600 flex items-center gap-2">
              <CheckCircle2 size={16} />
              You'll receive status updates at {email}
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-[#6B7280]">
          <p>© 2024 OrchestrateIQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
