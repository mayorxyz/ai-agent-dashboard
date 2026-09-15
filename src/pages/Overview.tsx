import {
  Search,
  Brain,
  Database,
  ShieldCheck,
  MessageSquare,
  CheckCircle2,
  Clock,
  Users,
  ArrowRight,
  Filter,
  Map,
  Sparkles,
  Send,
  Paperclip,
  Mic,
  Workflow,
  GitBranch,
  ArrowRightLeft,
  Zap,
} from 'lucide-react';

const agents = [
  { name: 'Researcher', role: 'Search & Research', icon: Search, color: 'green', calls: 142 },
  { name: 'Supervisor', role: 'Routing & Delegation', icon: Brain, color: 'purple', calls: 89 },
  { name: 'DataFetcher', role: 'Data Pipeline', icon: Database, color: 'blue', calls: 234 },
  { name: 'Validator', role: 'Output Validation', icon: ShieldCheck, color: 'amber', calls: 178 },
  { name: 'Responder', role: 'Response Generation', icon: MessageSquare, color: 'coral', calls: 95 },
];

const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
  green: { bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-500' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-500' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-500' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-500' },
  coral: { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-500' },
};

const timelineData = [
  { agent: 'Supervisor', segments: [{ start: 0, width: 25, status: 'Delegating', state: 'healthy' }, { start: 40, width: 20, status: 'Routing', state: 'healthy' }, { start: 75, width: 15, status: 'Delegating', state: 'pending' }] },
  { agent: 'Researcher', segments: [{ start: 5, width: 30, status: 'Searching', state: 'healthy' }, { start: 50, width: 25, status: 'Analyzing', state: 'healthy' }] },
  { agent: 'DataFetcher', segments: [{ start: 10, width: 20, status: 'Fetching', state: 'healthy' }, { start: 35, width: 30, status: 'Processing', state: 'pending' }, { start: 80, width: 10, status: 'Fetching', state: 'healthy' }] },
  { agent: 'Validator', segments: [{ start: 25, width: 15, status: 'Validating', state: 'healthy' }, { start: 55, width: 20, status: 'Checking', state: 'pending' }] },
  { agent: 'Responder', segments: [{ start: 35, width: 10, status: 'Generating', state: 'healthy' }, { start: 65, width: 20, status: 'Responding', state: 'healthy' }] },
];

const nextSteps = [
  { title: 'Configure alert thresholds', desc: 'Set latency and error rate thresholds for your agents', tag: 'Do first', workflows: 3, time: '5 min', priority: true },
  { title: 'Add handoff rules', desc: 'Define routing logic between Researcher and Validator', tag: 'Recommended', workflows: 2, time: '10 min', priority: false },
  { title: 'Enable trace sampling', desc: 'Reduce storage costs by sampling 10% of traces', tag: 'Optional', workflows: 1, time: '2 min', priority: false },
];

const quickActions = ['Optimize latency', 'Find errors', 'Cost analysis', 'Agent health'];
const suggestedQuestions = [
  'Why is the Validator still pending?',
  'What caused the 3 errors in the last hour?',
  'Show me the slowest agent handoff',
];

export default function Overview() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Hero Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#111] tracking-tight">
              We found your system
            </h1>
            <p className="mt-2 text-[#6B7280] text-lg">
              Auto-detected 6 agents across 2 workflows with 412 events in the last hour.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              <CheckCircle2 size={16} />
              Setup complete · 5 of 6
            </span>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition-all">
              <Clock size={14} />
              Last 1 hour
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition-all">
              <Filter size={14} />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#2F5CFF] text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-all shadow-sm">
              <Map size={14} />
              Live Map
            </button>
          </div>
        </div>
      </div>

      {/* Agents + Timeline */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Agents List */}
        <div className="xl:col-span-3 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-[#111] mb-4">Agents</h2>
          <div className="space-y-3">
            {agents.map((agent) => {
              const colors = colorMap[agent.color];
              const Icon = agent.icon;
              return (
                <div
                  key={agent.name}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={colors.icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111] truncate">{agent.name}</p>
                    <p className="text-xs text-[#6B7280] truncate">{agent.role}</p>
                  </div>
                  <span className="text-xs font-medium text-[#6B7280] bg-gray-50 px-2 py-1 rounded-full">
                    {agent.calls}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="xl:col-span-9 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#111]">Agent Activity Timeline</h2>
            <span className="text-xs text-[#6B7280]">15-min increments</span>
          </div>
          
          {/* Time ticks */}
          <div className="relative overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="flex justify-between mb-2 px-1">
                {['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45'].map((t) => (
                  <span key={t} className="text-[10px] text-[#9CA3AF] font-medium">{t}</span>
                ))}
              </div>

              {/* Timeline rows */}
              <div className="space-y-2">
                {timelineData.map((row) => {
                  const agentData = agents.find(a => a.name === row.agent);
                  const colors = agentData ? colorMap[agentData.color] : colorMap.green;
                  const Icon = agentData?.icon || Search;
                  return (
                    <div key={row.agent} className="flex items-center gap-3">
                      <div className="w-20 flex-shrink-0 flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center`}>
                          <Icon size={12} className={colors.icon} />
                        </div>
                        <span className="text-xs font-medium text-[#111] truncate">{row.agent}</span>
                      </div>
                      <div className="flex-1 h-8 bg-gray-50 rounded-lg relative overflow-hidden">
                        {row.segments.map((seg, i) => (
                          <div
                            key={i}
                            className={`absolute top-1 bottom-1 rounded-md flex items-center px-2 ${
                              seg.state === 'healthy' ? 'bg-green-100 border border-green-200' : 'bg-blue-100 border border-blue-200'
                            }`}
                            style={{ left: `${seg.start}%`, width: `${seg.width}%` }}
                          >
                            <span className={`text-[9px] font-medium truncate ${seg.state === 'healthy' ? 'text-green-700' : 'text-blue-700'}`}>
                              {seg.status}
                            </span>
                          </div>
                        ))}
                        {/* Now marker */}
                        <div className="absolute top-0 bottom-0 w-px bg-[#2F5CFF] opacity-60" style={{ left: '68%' }}>
                          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-[#2F5CFF]" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Steps */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-[#111] mb-4">Next steps</h2>
          <div className="space-y-3">
            {nextSteps.map((step) => (
              <div
                key={step.title}
                className="p-4 rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-[#111]">{step.title}</h3>
                  {step.priority && (
                    <span className="px-2 py-0.5 bg-[#2F5CFF] text-white text-[10px] font-semibold rounded-full flex-shrink-0">
                      Do first
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B7280] mb-3">{step.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#6B7280] bg-gray-50 px-2 py-1 rounded-full">
                    <Workflow size={10} />
                    {step.workflows} workflows
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#6B7280] bg-gray-50 px-2 py-1 rounded-full">
                    <Clock size={10} />
                    {step.time}
                  </span>
                  <div className="flex -space-x-1.5 ml-auto">
                    <div className="w-5 h-5 rounded-full bg-violet-200 border-2 border-white" />
                    <div className="w-5 h-5 rounded-full bg-blue-200 border-2 border-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detected Stats */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-[#111] mb-4">Detected</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={Users} value="6" label="agents" sub="92% confidence" color="purple" />
            <StatCard icon={GitBranch} value="2" label="workflows" sub="Auto-detected" color="blue" />
            <StatCard icon={ArrowRightLeft} value="9" label="handoffs" sub="Last hour" color="green" />
            <StatCard icon={Zap} value="412" label="events" sub="Processing" color="amber" />
          </div>
        </div>

        {/* AI Assistant */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111]">AI Assistant</p>
              <p className="text-[10px] text-[#6B7280]">Welcome, Alex — what can I help with today?</p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action) => (
              <button
                key={action}
                className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-100 transition-all"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Suggested questions */}
          <div className="flex-1 space-y-2 mb-4">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#6B7280] hover:bg-gray-50 hover:text-[#111] transition-all flex items-center gap-2"
              >
                <ArrowRight size={12} className="text-[#2F5CFF] flex-shrink-0" />
                {q}
              </button>
            ))}
          </div>

          {/* Chat input */}
          <div className="border border-gray-200 rounded-2xl p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about your agents..."
                className="flex-1 text-sm text-[#111] placeholder:text-gray-400 outline-none bg-transparent"
              />
              <span className="text-[10px] text-gray-300">0/500</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-400">
                  <Paperclip size={14} />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-400">
                  <Sparkles size={14} />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-400">
                  <Mic size={14} />
                </button>
              </div>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#2F5CFF] text-white hover:bg-blue-600 transition-all">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, sub, color }: { icon: any; value: string; label: string; sub: string; color: string }) {
  const colors: Record<string, string> = {
    purple: 'bg-purple-50 text-purple-500',
    blue: 'bg-blue-50 text-blue-500',
    green: 'bg-green-50 text-green-500',
    amber: 'bg-amber-50 text-amber-500',
  };
  return (
    <div className="p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
      <div className={`w-8 h-8 rounded-lg ${colors[color]} flex items-center justify-center mb-3`}>
        <Icon size={16} />
      </div>
      <p className="text-2xl font-bold text-[#111]">{value}</p>
      <p className="text-xs text-[#6B7280] font-medium">{label}</p>
      <p className="text-[10px] text-[#9CA3AF] mt-1">{sub}</p>
    </div>
  );
}
