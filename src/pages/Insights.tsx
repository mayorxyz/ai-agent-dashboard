import {
  DollarSign,
  Clock,
  AlertTriangle,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

const latencyData = [
  { time: '09:00', value: 1.2 },
  { time: '09:15', value: 1.4 },
  { time: '09:30', value: 1.1 },
  { time: '09:45', value: 1.8 },
  { time: '10:00', value: 2.1 },
  { time: '10:15', value: 1.6 },
  { time: '10:30', value: 1.3 },
  { time: '10:45', value: 1.5 },
];

const costData = [
  { agent: 'Researcher', cost: 12.4 },
  { agent: 'Supervisor', cost: 8.2 },
  { agent: 'DataFetcher', cost: 18.7 },
  { agent: 'Validator', cost: 5.3 },
  { agent: 'Responder', cost: 9.8 },
];

const errorRateData = [
  { time: '09:00', rate: 0.5 },
  { time: '09:15', rate: 0.8 },
  { time: '09:30', rate: 0.3 },
  { time: '09:45', rate: 1.2 },
  { time: '10:00', rate: 2.1 },
  { time: '10:15', rate: 1.5 },
  { time: '10:30', rate: 0.9 },
  { time: '10:45', rate: 0.6 },
];

const insights = [
  {
    type: 'anomaly',
    title: 'Unusual latency spike detected',
    description: 'DataFetcher latency increased 3x between 09:45-10:00. Possible external API degradation.',
    time: '25 min ago',
    icon: AlertTriangle,
    color: 'amber',
  },
  {
    type: 'suggestion',
    title: 'Consider scaling Researcher agents',
    description: 'Researcher queue depth has been consistently above 80% for the last hour.',
    time: '1 hour ago',
    icon: Lightbulb,
    color: 'blue',
  },
  {
    type: 'optimization',
    title: 'Cost optimization opportunity',
    description: 'Switching DataFetcher to a smaller model could save ~$4.20/day with minimal quality impact.',
    time: '2 hours ago',
    icon: DollarSign,
    color: 'green',
  },
  {
    type: 'anomaly',
    title: 'Error rate above threshold',
    description: 'Validator error rate exceeded 2% threshold at 10:00. Schema mismatch suspected.',
    time: '45 min ago',
    icon: Zap,
    color: 'red',
  },
];

const insightColors: Record<string, { bg: string; text: string; icon: string }> = {
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-500' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-500' },
  green: { bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-500' },
  red: { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-500' },
};

export default function Insights() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111]">Insights</h1>
          <p className="text-sm text-[#6B7280] mt-1">Analytics and AI-powered recommendations</p>
        </div>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Clock size={18} className="text-blue-500" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={12} />
              +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-[#111]">1.52s</p>
          <p className="text-xs text-[#6B7280]">Avg latency</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
              <DollarSign size={18} className="text-green-500" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              <ArrowDownRight size={12} />
              -8%
            </span>
          </div>
          <p className="text-2xl font-bold text-[#111]">$54.40</p>
          <p className="text-xs text-[#6B7280]">Cost today</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle size={18} className="text-red-500" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={12} />
              +0.3%
            </span>
          </div>
          <p className="text-2xl font-bold text-[#111]">0.9%</p>
          <p className="text-xs text-[#6B7280]">Error rate</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
              <Zap size={18} className="text-purple-500" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              <ArrowUpRight size={12} />
              +5%
            </span>
          </div>
          <p className="text-2xl font-bold text-[#111]">412</p>
          <p className="text-xs text-[#6B7280]">Events / hour</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latency chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-[#111]">Latency Over Time</h2>
              <p className="text-xs text-[#6B7280]">Average response time per 15-min window</p>
            </div>
            <span className="text-xs text-[#6B7280] bg-gray-50 px-2.5 py-1 rounded-full">Last 2h</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={latencyData}>
              <defs>
                <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2F5CFF" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2F5CFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} unit="s" />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                formatter={(value: number) => [`${value}s`, 'Latency']}
              />
              <Area type="monotone" dataKey="value" stroke="#2F5CFF" strokeWidth={2} fill="url(#latencyGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Cost per agent */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-[#111]">Cost per Agent</h2>
              <p className="text-xs text-[#6B7280]">Today's spend by agent</p>
            </div>
            <span className="text-xs text-[#6B7280] bg-gray-50 px-2.5 py-1 rounded-full">Total: $54.40</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={costData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} unit="$" />
              <YAxis dataKey="agent" type="category" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                formatter={(value: number) => [`$${value}`, 'Cost']}
              />
              <Bar dataKey="cost" fill="#2F5CFF" radius={[0, 6, 6, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Error rate */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-[#111]">Error Rate Trends</h2>
              <p className="text-xs text-[#6B7280]">Percentage of failed executions</p>
            </div>
            <span className="text-xs text-[#6B7280] bg-gray-50 px-2.5 py-1 rounded-full">Last 2h</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={errorRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '12px' }}
                formatter={(value: number) => [`${value}%`, 'Error Rate']}
              />
              <Line type="monotone" dataKey="rate" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights feed */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-[#111]">AI Insights</h2>
              <p className="text-xs text-[#6B7280]">Auto-generated observations and recommendations</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-[#2F5CFF] font-medium bg-blue-50 px-2.5 py-1 rounded-full">
              <Zap size={12} />
              {insights.length} new
            </span>
          </div>
          <div className="space-y-3 max-h-[240px] overflow-y-auto">
            {insights.map((insight, i) => {
              const colors = insightColors[insight.color];
              const Icon = insight.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={16} className={colors.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-[#111]">{insight.title}</h3>
                        <span className={`text-[10px] font-medium ${colors.text} ${colors.bg} px-1.5 py-0.5 rounded-full flex-shrink-0`}>
                          {insight.type}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed">{insight.description}</p>
                      <p className="text-[10px] text-[#9CA3AF] mt-2">{insight.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
