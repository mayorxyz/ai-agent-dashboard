import { useTheme } from '../contexts/ThemeContext';
import { MessageSquare, AlertCircle, BarChart3, Webhook, Check, Plus } from 'lucide-react';

export default function Integrations() {
  const { isDark } = useTheme();

  const integrations = [
    { id: 1, name: 'Slack', description: 'Send notifications to Slack channels', icon: MessageSquare, connected: true },
    { id: 2, name: 'PagerDuty', description: 'Route incidents to PagerDuty', icon: AlertCircle, connected: false },
    { id: 3, name: 'Datadog', description: 'Export metrics to Datadog', icon: BarChart3, connected: true },
    { id: 4, name: 'Webhooks', description: 'Custom webhook endpoints', icon: Webhook, connected: false },
  ];

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Integrations</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
          Connect your favorite tools and services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <div
              key={integration.id}
              className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  integration.connected
                    ? isDark ? 'bg-green-900/30' : 'bg-green-50'
                    : isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <Icon size={24} className={integration.connected ? 'text-green-500' : isDark ? 'text-gray-400' : 'text-gray-600'} />
                </div>
                {integration.connected && (
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'}`}>
                    <Check size={12} />
                    Connected
                  </span>
                )}
              </div>
              <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>{integration.name}</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>{integration.description}</p>
              <button className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                integration.connected
                  ? isDark ? 'bg-[#1F1F23] text-gray-300 hover:bg-[#27272A]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-[#2F5CFF] text-white hover:bg-blue-600 active:scale-[0.98]'
              }`}>
                {integration.connected ? 'Configure' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
