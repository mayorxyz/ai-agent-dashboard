import { useState } from 'react';
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
  GitBranch,
} from 'lucide-react';

const colorMap: Record<string, { bg: string; text: string; icon: string; border: string }> = {
  green: { bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-500', border: 'border-green-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-500', border: 'border-purple-200' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-500', border: 'border-blue-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-500', border: 'border-amber-200' },
  coral: { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-500', border: 'border-red-200' },
};

const workflows = [
  {
    id: 1,
    name: 'Customer Query Resolution',
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
    status: 'active',
  },
  {
    id: 2,
    name: 'Data Pipeline Validation',
    agents: [
      { name: 'DataFetcher', icon: Database, color: 'blue' },
      { name: 'Validator', icon: ShieldCheck, color: 'amber' },
      { name: 'Responder', icon: MessageSquare, color: 'coral' },
    ],
    runs: 834,
    successRate: 99.1,
    lastRun: '5 min ago',
    status: 'active',
  },
  {
    id: 3,
    name: 'Research & Summarization',
    agents: [
      { name: 'Researcher', icon: Search, color: 'green' },
      { name: 'DataFetcher', icon: Database, color: 'blue' },
      { name: 'Responder', icon: MessageSquare, color: 'coral' },
    ],
    runs: 456,
    successRate: 91.7,
    lastRun: '12 min ago',
    status: 'active',
  },
  {
    id: 4,
    name: 'Incident Response Flow',
    agents: [
      { name: 'Supervisor', icon: Brain, color: 'purple' },
      { name: 'Researcher', icon: Search, color: 'green' },
      { name: 'Responder', icon: MessageSquare, color: 'coral' },
    ],
    runs: 89,
    successRate: 87.2,
    lastRun: '1 hour ago',
    status: 'warning',
  },
];

export default function Workflows() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<typeof workflows[0] | null>(null);

  if (selectedWorkflow) {
    return (
      <div className="max-w-[1600px] mx-auto space-y-6">
        <button
          onClick={() => setSelectedWorkflow(null)}
          className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111] transition-all"
        >
          <ChevronRight size={14} className="rotate-180" />
          Back to workflows
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#111]">{selectedWorkflow.name}</h1>
              <p className="text-sm text-[#6B7280] mt-1">
                {selectedWorkflow.agents.length} agents · {selectedWorkflow.runs} runs · {selectedWorkflow.successRate}% success
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#2F5CFF] text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-all shadow-sm">
              <Play size={14} />
              Run Workflow
            </button>
          </div>

          {/* Flow Diagram */}
          <div className="relative py-12">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {selectedWorkflow.agents.map((agent, i) => {
                const colors = colorMap[agent.color];
                const Icon = agent.icon;
                return (
                  <div key={agent.name} className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-16 h-16 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center shadow-sm`}>
                        <Icon size={24} className={colors.icon} />
                      </div>
                      <span className="text-xs font-medium text-[#111]">{agent.name}</span>
                    </div>
                    {i < selectedWorkflow.agents.length - 1 && (
                      <div className="flex items-center">
                        <div className="w-12 h-px bg-gray-200" />
                        <ArrowRight size={14} className="text-gray-300 -ml-1" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-gray-50">
              <p className="text-xs text-[#6B7280]">Total Runs</p>
              <p className="text-xl font-bold text-[#111]">{selectedWorkflow.runs.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50">
              <p className="text-xs text-[#6B7280]">Success Rate</p>
              <p className="text-xl font-bold text-green-600">{selectedWorkflow.successRate}%</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50">
              <p className="text-xs text-[#6B7280]">Avg Duration</p>
              <p className="text-xl font-bold text-[#111]">2.4s</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50">
              <p className="text-xs text-[#6B7280]">Last Run</p>
              <p className="text-xl font-bold text-[#111]">{selectedWorkflow.lastRun}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111]">Workflows</h1>
          <p className="text-sm text-[#6B7280] mt-1">Monitor and manage your agent workflows</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#2F5CFF] text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-all shadow-sm">
          <GitBranch size={14} />
          New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            onClick={() => setSelectedWorkflow(wf)}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-[#111] group-hover:text-[#2F5CFF] transition-colors">
                  {wf.name}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="inline-flex items-center gap-1 text-xs text-[#6B7280]">
                    <Clock size={12} />
                    {wf.lastRun}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs ${wf.status === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
                    {wf.status === 'active' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                    {wf.status === 'active' ? 'Active' : 'Warning'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#111]">{wf.successRate}%</p>
                <p className="text-[10px] text-[#6B7280]">success rate</p>
              </div>
            </div>

            {/* Agent chain */}
            <div className="flex items-center gap-1 flex-wrap">
              {wf.agents.map((agent, i) => {
                const colors = colorMap[agent.color];
                const Icon = agent.icon;
                return (
                  <div key={agent.name} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center`} title={agent.name}>
                      <Icon size={14} className={colors.icon} />
                    </div>
                    {i < wf.agents.length - 1 && (
                      <ArrowRight size={12} className="text-gray-300 mx-0.5" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
              <span className="text-xs text-[#6B7280]">{wf.runs.toLocaleString()} runs</span>
              <span className="text-xs text-[#2F5CFF] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                View details <ChevronRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
