import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Plus,
  X,
  ChevronDown,
} from 'lucide-react';

const colorMap: Record<string, { bg: string; text: string; icon: string; border: string }> = {
  green: { bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-500', border: 'border-green-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-500', border: 'border-purple-200' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-500', border: 'border-blue-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-500', border: 'border-amber-200' },
  coral: { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-500', border: 'border-red-200' },
};

const availableAgents = [
  { name: 'Supervisor', icon: Brain, color: 'purple', role: 'Routing & Delegation' },
  { name: 'Researcher', icon: Search, color: 'green', role: 'Search & Research' },
  { name: 'DataFetcher', icon: Database, color: 'blue', role: 'Data Pipeline' },
  { name: 'Validator', icon: ShieldCheck, color: 'amber', role: 'Output Validation' },
  { name: 'Responder', icon: MessageSquare, color: 'coral', role: 'Response Generation' },
];

interface WorkflowType {
  id: number;
  name: string;
  description?: string;
  agents: { name: string; icon: any; color: string }[];
  runs: number;
  successRate: number;
  lastRun: string;
  status: string;
}

const initialWorkflows: WorkflowType[] = [
  {
    id: 1,
    name: 'Customer Query Resolution',
    description: 'Handles incoming customer queries through research, data fetch, validation, and response.',
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
    description: 'Validates incoming data pipeline outputs against schema rules.',
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
    description: 'Researches topics and generates summarized reports.',
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
    description: 'Automated incident detection and response workflow.',
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
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState<WorkflowType[]>(initialWorkflows);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const handleAddAgent = (agentName: string) => {
    if (!selectedAgents.includes(agentName)) {
      setSelectedAgents([...selectedAgents, agentName]);
    }
  };

  const handleRemoveAgent = (agentName: string) => {
    setSelectedAgents(selectedAgents.filter(a => a !== agentName));
  };

  const handleCreateWorkflow = () => {
    if (!newName.trim() || selectedAgents.length === 0) return;
    const newWorkflow: WorkflowType = {
      id: Date.now(),
      name: newName,
      description: newDesc,
      agents: selectedAgents.map(name => {
        const agent = availableAgents.find(a => a.name === name)!;
        return { name: agent.name, icon: agent.icon, color: agent.color };
      }),
      runs: 0,
      successRate: 0,
      lastRun: 'Never',
      status: 'active',
    };
    setWorkflows([newWorkflow, ...workflows]);
    setShowNewModal(false);
    setNewName('');
    setNewDesc('');
    setSelectedAgents([]);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111]">Workflows</h1>
          <p className="text-sm text-[#6B7280] mt-1">Monitor and manage your agent workflows</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2F5CFF] text-white rounded-full text-sm font-medium hover:bg-blue-600 active:bg-blue-700 transition-all shadow-sm active:scale-[0.98]"
        >
          <Plus size={16} />
          New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group min-w-0"
            onClick={() => navigate(`/workflows/${wf.id}`)}
          >
            <div className="flex items-start justify-between mb-4 gap-2">
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-[#111] group-hover:text-[#2F5CFF] transition-colors truncate">
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
              <div className="text-right flex-shrink-0">
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

      {/* New Workflow Modal - Fix #7 */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setShowNewModal(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#111]">Create New Workflow</h3>
              <button onClick={() => setShowNewModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-all">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#111] block mb-1.5">Workflow Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Customer Onboarding Flow"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#2F5CFF] transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111] block mb-1.5">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="What does this workflow do?"
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#2F5CFF] transition-all resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111] block mb-1.5">Agent Chain</label>
                <p className="text-xs text-[#6B7280] mb-2">Select agents in execution order</p>
                
                {/* Selected agents */}
                {selectedAgents.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap mb-3 p-3 bg-gray-50 rounded-xl">
                    {selectedAgents.map((name, i) => {
                      const agent = availableAgents.find(a => a.name === name)!;
                      const colors = colorMap[agent.color];
                      const Icon = agent.icon;
                      return (
                        <div key={name} className="flex items-center">
                          <button
                            onClick={() => handleRemoveAgent(name)}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ${colors.bg} border ${colors.border} text-xs font-medium ${colors.text} hover:opacity-80 transition-all`}
                          >
                            <Icon size={12} className={colors.icon} />
                            {name}
                            <X size={10} />
                          </button>
                          {i < selectedAgents.length - 1 && (
                            <ArrowRight size={12} className="text-gray-300 mx-1" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Available agents */}
                <div className="grid grid-cols-1 gap-2">
                  {availableAgents.filter(a => !selectedAgents.includes(a.name)).map((agent) => {
                    const colors = colorMap[agent.color];
                    const Icon = agent.icon;
                    return (
                      <button
                        key={agent.name}
                        onClick={() => handleAddAgent(agent.name)}
                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-all text-left"
                      >
                        <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center`}>
                          <Icon size={14} className={colors.icon} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#111]">{agent.name}</p>
                          <p className="text-[10px] text-[#6B7280]">{agent.role}</p>
                        </div>
                        <Plus size={16} className="text-gray-300" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={handleCreateWorkflow}
                disabled={!newName.trim() || selectedAgents.length === 0}
                className="flex-1 py-2.5 bg-[#2F5CFF] text-white rounded-xl text-sm font-medium hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create Workflow
              </button>
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 active:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
