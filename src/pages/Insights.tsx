import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Clock,
  AlertTriangle,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { insightsData, agents } from '../data/mockData';
import { EmptyState } from '../components/EmptyState';

export default function Insights() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [hiddenAgents, setHiddenAgents] = useState<Set<string>>(new Set());

  const toggleAgent = (agentName: string) => {
    const newHidden = new Set(hiddenAgents);
    if (newHidden.has(agentName)) {
      newHidden.delete(agentName);
    } else {
      newHidden.add(agentName);
    }
    setHiddenAgents(newHidden);
  };

  const agentColors: Record<string, string> = {
    Researcher: '#10B981',
    Supervisor: '#8B5CF6',
    DataFetcher: '#3B82F6',
    Validator: '#F59E0B',
    Responder: '#EF4444',
  };

  const maxHeatmapValue = Math.max(
    ...insightsData.heatmapData.flatMap(row => 
      agents.map(agent => row[agent.name as keyof typeof row] as number)
    )
  );

  const getHeatmapColor = (value: number) => {
    const intensity = value / maxHeatmapValue;
    if (isDark) {
      return `rgba(47, 92, 255, ${0.2 + intensity * 0.8})`;
    }
    return `rgba(47, 92, 255, ${0.1 + intensity * 0.9})`;
  };

  // Check if there's any data to show
  const hasData = insightsData.anomalies.length > 0 || insightsData.latencyOverTime.length > 0;

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            Insights & Analytics
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            Performance metrics and AI-powered analysis
          </p>
        </div>
      </div>

      {!hasData && (
        <EmptyState
          type="insights"
          title="No insights yet"
          description="Insights will appear here as your agents run and generate data. Check back soon for performance analytics."
        />
      )}

      {/* Top Stat Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className={`rounded-2xl p-5 shadow-sm border min-w-0 overflow-hidden ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDark ? 'bg-blue-900/30' : 'bg-blue-50'
            }`}>
              <Clock size={18} className={isDark ? 'text-blue-400' : 'text-blue-500'} />
            </div>
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap ${
              isDark ? 'text-red-400 bg-red-900/30' : 'text-red-600 bg-red-50'
            }`}>
              <ArrowUpRight size={12} className="flex-shrink-0" />
              +12%
            </span>
          </div>
          <p className={`text-2xl font-bold truncate ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            {insightsData.avgLatency}s
          </p>
          <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            Avg latency
          </p>
        </div>

        <div className={`rounded-2xl p-5 shadow-sm border min-w-0 overflow-hidden ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDark ? 'bg-red-900/30' : 'bg-red-50'
            }`}>
              <AlertTriangle size={18} className={isDark ? 'text-red-400' : 'text-red-500'} />
            </div>
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap ${
              isDark ? 'text-red-400 bg-red-900/30' : 'text-red-600 bg-red-50'
            }`}>
              <ArrowUpRight size={12} className="flex-shrink-0" />
              +0.3%
            </span>
          </div>
          <p className={`text-2xl font-bold truncate ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            {insightsData.errorRate}%
          </p>
          <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            Error rate
          </p>
        </div>

        <div className={`rounded-2xl p-5 shadow-sm border min-w-0 overflow-hidden ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDark ? 'bg-green-900/30' : 'bg-green-50'
            }`}>
              <DollarSign size={18} className={isDark ? 'text-green-400' : 'text-green-500'} />
            </div>
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap ${
              isDark ? 'text-green-400 bg-green-900/30' : 'text-green-600 bg-green-50'
            }`}>
              <ArrowDownRight size={12} className="flex-shrink-0" />
              -8%
            </span>
          </div>
          <p className={`text-2xl font-bold truncate ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            ${insightsData.totalCost}
          </p>
          <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            Total cost
          </p>
        </div>

        <div className={`rounded-2xl p-5 shadow-sm border min-w-0 overflow-hidden ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDark ? 'bg-purple-900/30' : 'bg-purple-50'
            }`}>
              <Activity size={18} className={isDark ? 'text-purple-400' : 'text-purple-500'} />
            </div>
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap ${
              isDark ? 'text-green-400 bg-green-900/30' : 'text-green-600 bg-green-50'
            }`}>
              <CheckCircle2 size={12} className="flex-shrink-0" />
              Stable
            </span>
          </div>
          <p className={`text-2xl font-bold truncate ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            {insightsData.uptime}%
          </p>
          <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            Uptime
          </p>
        </div>
      </div>

      {/* Line Chart: Latency Over Time */}
      <div className={`rounded-3xl p-6 shadow-sm border min-w-0 ${
        isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-base font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
              Latency Over Time
            </h2>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
              Per agent, last 24 hours
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={insightsData.latencyOverTime}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272A' : '#F3F4F6'} />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10, fill: isDark ? '#9CA3AF' : '#9CA3AF' }} 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: isDark ? '#9CA3AF' : '#9CA3AF' }} 
              axisLine={false} 
              tickLine={false}
              unit="s"
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: `1px solid ${isDark ? '#27272A' : '#E5E7EB'}`,
                backgroundColor: isDark ? '#18181B' : '#FFFFFF',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`${value}s`, '']}
            />
            {agents.map((agent) => (
              <Line
                key={agent.name}
                type="monotone"
                dataKey={agent.name}
                stroke={agentColors[agent.name]}
                strokeWidth={2}
                dot={{ fill: agentColors[agent.name], r: 3 }}
                hide={hiddenAgents.has(agent.name)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        {/* Custom Legend */}
        <div className="flex flex-wrap gap-3 mt-4 justify-center">
          {agents.map((agent) => (
            <button
              key={agent.name}
              onClick={() => toggleAgent(agent.name)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                hiddenAgents.has(agent.name)
                  ? isDark ? 'bg-[#1F1F23] text-gray-500' : 'bg-gray-100 text-gray-400'
                  : isDark ? 'bg-[#1F1F23] text-gray-200' : 'bg-gray-50 text-gray-700'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: agentColors[agent.name],
                  opacity: hiddenAgents.has(agent.name) ? 0.3 : 1,
                }}
              />
              {agent.name}
            </button>
          ))}
        </div>
      </div>

      {/* Charts Grid: Donut + Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Donut Chart: Error Distribution */}
        <div className={`rounded-3xl p-6 shadow-sm border min-w-0 ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-base font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            Error Distribution
          </h2>
          <p className={`text-xs mb-6 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            By agent
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={insightsData.errorDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="errors"
              >
                {insightsData.errorDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={agentColors[entry.agent]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: `1px solid ${isDark ? '#27272A' : '#E5E7EB'}`,
                  backgroundColor: isDark ? '#18181B' : '#FFFFFF',
                  fontSize: '12px',
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value} errors (${props.payload.percentage}%)`,
                  props.payload.agent,
                ]}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value: string) => (
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Heatmap: Hour of Day vs Agent */}
        <div className={`rounded-3xl p-6 shadow-sm border min-w-0 ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-base font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            Call Volume Heatmap
          </h2>
          <p className={`text-xs mb-6 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            Hour of day vs agent
          </p>
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              {/* Header row */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-20 flex-shrink-0" />
                {insightsData.heatmapData.map((row) => (
                  <div key={row.hour} className="flex-1 text-center">
                    <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {row.hour}
                    </span>
                  </div>
                ))}
              </div>
              {/* Data rows */}
              {agents.map((agent) => (
                <div key={agent.name} className="flex items-center gap-2 mb-2">
                  <div className={`w-20 flex-shrink-0 text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {agent.name}
                  </div>
                  {insightsData.heatmapData.map((row) => {
                    const value = row[agent.name as keyof typeof row] as number;
                    return (
                      <div
                        key={row.hour}
                        className="flex-1 aspect-square rounded-lg flex items-center justify-center text-[9px] font-medium transition-all hover:scale-110 cursor-pointer"
                        style={{ backgroundColor: getHeatmapColor(value) }}
                        title={`${agent.name} at ${row.hour}: ${value} calls`}
                      >
                        <span className={isDark ? 'text-white/80' : 'text-white/90'}>
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI-Flagged Anomalies Feed */}
      <div className={`rounded-3xl p-6 shadow-sm border min-w-0 ${
        isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-base font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
              AI-Flagged Anomalies
            </h2>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
              Auto-detected issues requiring attention
            </p>
          </div>
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
            isDark ? 'text-blue-400 bg-blue-900/30' : 'text-[#2F5CFF] bg-blue-50'
          }`}>
            <Zap size={12} />
            {insightsData.anomalies.length} new
          </span>
        </div>
        <div className="space-y-3">
          {insightsData.anomalies.map((anomaly) => {
            const severityColors = {
              high: { dot: 'bg-red-500', bg: isDark ? 'bg-red-900/20' : 'bg-red-50', text: isDark ? 'text-red-400' : 'text-red-700' },
              medium: { dot: 'bg-amber-500', bg: isDark ? 'bg-amber-900/20' : 'bg-amber-50', text: isDark ? 'text-amber-400' : 'text-amber-700' },
              low: { dot: 'bg-blue-500', bg: isDark ? 'bg-blue-900/20' : 'bg-blue-50', text: isDark ? 'text-blue-400' : 'text-blue-700' },
            };
            const colors = severityColors[anomaly.severity as keyof typeof severityColors];
            
            return (
              <div
                key={anomaly.id}
                className={`p-4 rounded-2xl border transition-all hover:shadow-md cursor-pointer ${
                  isDark ? 'border-[#1F1F23] hover:border-[#27272A]' : 'border-gray-100 hover:border-gray-200'
                } ${colors.bg}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colors.dot}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                      {anomaly.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                        {anomaly.timestamp}
                      </span>
                      <button
                        onClick={() => navigate('/traces')}
                        className={`text-xs font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#2F5CFF] hover:text-blue-600'} hover:underline`}
                      >
                        View trace →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
