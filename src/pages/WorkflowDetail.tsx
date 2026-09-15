import {
  Search,
  Brain,
  Database,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  ChevronRight,
  ArrowLeft,
  TrendingUp,
  Zap,
  Activity,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

const colorMap: Record<string, { bg: string; text: string; icon: string; border: string }> = {
  green: { bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-500', border: 'border-green-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-500', border: 'border-purple-200' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-500', border: 'border-blue-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-500', border: 'border-amber-200' },
  coral: { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-500', border: 'border-red-200' },
};

const workflowsData: Record<number, any> = {
  1: {
    name: 'Customer Query Resolution',
    description: 'Handles incoming customer queries through research, data fetch, validation, and response generation.',
    agents: [
      { name: 'Supervisor', icon: Brain, color: 'purple' },
      { name: 'Researcher', icon: Search, color: 'green' },
      { name: 'DataFetcher', icon: Database, color: 'blue' },
      { name: 'Validator', icon: ShieldCheck, color: 'amber' },
      { name: 'Responder', icon: MessageSquare, color: 'coral' },
    ],
    runs: 1247,
    successRate: 96.3,
    lastRun: '2 min ago',
    avgDuration: '2.4s',
    status: 'active',
  },
  2: {
    name: 'Data Pipeline Validation',
    description: 'Validates incoming data pipeline outputs against schema rules and content requirements.',
    agents: [
      { name: 'DataFetcher', icon: Database, color: 'blue' },
      { name: 'Validator', icon: ShieldCheck, color: 'amber' },
      { name: 'Responder', icon: MessageSquare, color: 'coral' },
    ],
    runs: 834,
    successRate: 99.1,
    lastRun: '5 min ago',
    avgDuration: '1.8s',
    status: 'active',
  },
  3: {
    name: 'Research & Summarization',
    description: 'Researches topics from multiple sources and generates summarized reports.',
    agents: [
      { name: 'Researcher', icon: Search, color: 'green' },
      { name: 'DataFetcher', icon: Database, color: 'blue' },
      { name: 'Responder', icon: MessageSquare, color: 'coral' },
    ],
    runs: 456,
    successRate: 91.7,
    lastRun: '12 min ago',
    avgDuration: '3.1s',
    status: 'active',
  },
  4: {
    name: 'Incident Response Flow',
    description: 'Automated incident detection, research, and response workflow.',
    agents: [
      { name: 'Supervisor', icon: Brain, color: 'purple' },
      { name: 'Researcher', icon: Search, color: 'green' },
      { name: 'Responder', icon: MessageSquare, color: 'coral' },
    ],
    runs: 89,
    successRate: 87.2,
    lastRun: '1 hour ago',
    avgDuration: '4.2s',
    status: 'warning',
  },
};

const runHistory = [
  { time: '10:42', status: 'success', duration: '2.1s' },
  { time: '10:38', status: 'success', duration: '2.4s' },
  { time: '10:35', status: 'error', duration: '4.1s' },
  { time: '10:30', status: 'success', duration: '1.9s' },
  { time: '10:25', status: 'success', duration: '2.3s' },
  { time: '10:20', status: 'warning', duration: '3.2s' },
  { time: '10:15', status: 'success', duration: '2.0s' },
  { time: '10:10', status: 'success', duration: '2.5s' },
];

const successChartData = [
  { time: '09:00', rate: 95.2 },
  { time: '09:15', rate: 96.1 },
  { time: '09:30', rate: 94.8 },
  { time: '09:45', rate: 93.2 },
  { time: '10:00', rate: 91.5 },
  { time: '10:15', rate: 95.8 },
  { time: '10:30', rate: 96.3 },
  { time: '10:45', rate: 96.3 },
];

export default function WorkflowDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const workflow = workflowsData[Number(id)] || workflowsData[1];

  if (!workflow) {
    return (
      <div className="text-center py-20">
        <p className="text-[#6B7280]">Workflow not found</p>
        <button onClick={() => navigate('/workflows')} className="mt-4 text-[#2F5CFF] text-sm font-medium hover:underline">
          ← Back to workflows
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Back button */}
      <button
        onClick={() => navigate('/workflows')}
        className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111] transition-all active:scale-95"
      >
        <ArrowLeft size={14} />
        Back to workflows
      </button>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl lg:text-2xl font-bold text-[#111] truncate">{workflow.name}</h1>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                workflow.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {workflow.status === 'active' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                {workflow.status === 'active' ? 'Active' : 'Warning'}
              </span>
            </div>
            <p className="text-sm text-[#6B7280]">{workflow.description}</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2F5CFF] text-white rounded-full text-sm font-medium hover:bg-blue-600 active:bg-blue-700 transition-all shadow-sm active:scale-[0.98] flex-shrink-0">
            <Play size={14} />
            Run Workflow
          </button>
        </div>

        {/* Agent chain visualization */}
        <div className="mt-8 py-6 overflow-x-auto">
          <div className="flex items-center justify-center gap-3 lg:gap-6 min-w-max px-4">
            {workflow.agents.map((agent: any, i: number) => {
              const colors = colorMap[agent.color];
              const Icon = agent.icon;
              return (
                <div key={agent.name} className="flex items-center gap-3 lg:gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center shadow-sm hover:shadow-md transition-all`}>
                      <Icon size={22} className={colors.icon} />
                    </div>
                    <span className="text-xs font-medium text-[#111] text-center">{agent.name}</span>
                  </div>
                  {i < workflow.agents.length - 1 && (
                    <div className="flex items-center">
                      <div className="w-8 lg:w-12 h-px bg-gray-200" />
                      <ArrowRight size={14} className="text-gray-300 -ml-1" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-blue-500" />
            <span className="text-xs text-[#6B7280]">Total Runs</span>
          </div>
          <p className="text-2xl font-bold text-[#111]">{workflow.runs.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-xs text-[#6B7280]">Success Rate</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{workflow.successRate}%</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-purple-500" />
            <span className="text-xs text-[#6B7280]">Avg Duration</span>
          </div>
          <p className="text-2xl font-bold text-[#111]">{workflow.avgDuration}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-amber-500" />
            <span className="text-xs text-[#6B7280]">Last Run</span>
          </div>
          <p className="text-2xl font-bold text-[#111]">{workflow.lastRun}</p>
        </div>
      </div>

      {/* Charts + Run History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Success rate chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-w-0">
          <h2 className="text-base font-semibold text-[#111] mb-1">Success Rate Over Time</h2>
          <p className="text-xs text-[#6B7280] mb-4">Last 2 hours</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={successChartData}>
              <defs>
                <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[88, 100]} tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '12px' }} formatter={(v: number) => [`${v}%`, 'Success']} />
              <Area type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} fill="url(#successGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Run history */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-w-0">
          <h2 className="text-base font-semibold text-[#111] mb-1">Recent Runs</h2>
          <p className="text-xs text-[#6B7280] mb-4">Latest executions</p>
          <div className="space-y-2 max-h-[220px] overflow-y-auto">
            {runHistory.map((run, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    run.status === 'success' ? 'bg-green-500' : run.status === 'error' ? 'bg-red-500' : 'bg-amber-500'
                  }`} />
                  <span className="text-sm text-[#111] font-medium">Run #{runHistory.length - i}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[#6B7280]">{run.duration}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    run.status === 'success' ? 'bg-green-50 text-green-700' : run.status === 'error' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {run.status}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">{run.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
