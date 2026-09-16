import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ChevronDown,
  X,
  Check,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import type { Page } from '../App';

interface OverviewProps {
  setActivePage?: (page: Page) => void;
}

const allAgents = [
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

const initialNextSteps = [
  { id: 1, title: 'Configure alert thresholds', desc: 'Set latency and error rate thresholds for your agents', tag: 'Do first', workflows: 3, time: '5 min', priority: true, completed: false },
  { id: 2, title: 'Add handoff rules', desc: 'Define routing logic between Researcher and Validator', tag: 'Recommended', workflows: 2, time: '10 min', priority: false, completed: false },
  { id: 3, title: 'Enable trace sampling', desc: 'Reduce storage costs by sampling 10% of traces', tag: 'Optional', workflows: 1, time: '2 min', priority: false, completed: false },
];

const quickActions = ['Optimize latency', 'Find errors', 'Cost analysis', 'Agent health'];
const suggestedQuestions = [
  'Why is the Validator still pending?',
  'What caused the 3 errors in the last hour?',
  'Show me the slowest agent handoff',
];

const timeRanges = ['Last 1h', 'Last 24h', 'Last 7d', 'Last 30d', 'Custom'];

export default function Overview() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [showFilter, setShowFilter] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 1h');
  const [filterAgent, setFilterAgent] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [nextSteps, setNextSteps] = useState(initialNextSteps);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([]);
  const [showConfigModal, setShowConfigModal] = useState<number | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
      if (timeRef.current && !timeRef.current.contains(e.target as Node)) {
        setShowTimePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter agents and timeline based on selections
  const filteredAgents = allAgents.filter(a => {
    if (filterAgent !== 'all' && a.name !== filterAgent) return false;
    return true;
  });

  const filteredTimeline = timelineData.filter(row => {
    if (filterAgent !== 'all' && row.agent !== filterAgent) return false;
    return true;
  });

  const handleCompleteStep = (id: number) => {
    setNextSteps(prev => prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    // Mock AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'Why is the Validator still pending?': 'The Validator is waiting for DataFetcher to complete its current batch. The payload size (12.4MB) triggered chunked processing, adding ~2s latency. Consider increasing the batch threshold.',
        'What caused the 3 errors in the last hour?': 'All 3 errors originated from DataFetcher timeouts on payloads >10MB. Root cause: external API rate limiting. Recommended fix: implement request queuing with exponential backoff.',
        'Show me the slowest agent handoff': 'The slowest handoff is Supervisor → DataFetcher at avg 1.8s. This is due to payload serialization. Switching to streaming could reduce this by ~60%.',
      };
      const response = responses[userMsg] || `Based on my analysis of your agent system, I can see that ${userMsg.toLowerCase().includes('error') ? 'there are some patterns worth investigating' : 'your system is performing within expected parameters'}. Would you like me to dive deeper into any specific agent or workflow?`;
      setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 800);
  };

  const handleQuickAction = (action: string) => {
    setChatInput(action);
  };

  const handleSuggestedQuestion = (q: string) => {
    setChatInput(q);
    // Auto-submit
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'user', text: q }]);
      setChatInput('');
      setTimeout(() => {
        const responses: Record<string, string> = {
          'Why is the Validator still pending?': 'The Validator is waiting for DataFetcher to complete its current batch. The payload size (12.4MB) triggered chunked processing, adding ~2s latency.',
          'What caused the 3 errors in the last hour?': 'All 3 errors originated from DataFetcher timeouts on payloads >10MB. Root cause: external API rate limiting.',
          'Show me the slowest agent handoff': 'The slowest handoff is Supervisor → DataFetcher at avg 1.8s due to payload serialization.',
        };
        const response = responses[q] || 'Analyzing your agent system... I see patterns that could be optimized. Let me know if you want specific recommendations.';
        setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
      }, 800);
    }, 100);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Hero Card */}
      <div className={`rounded-3xl p-6 lg:p-8 shadow-sm border w-full transition-colors duration-300 ${
        isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
      }`}>
        <div className="flex flex-col gap-4">
          <div className="min-w-0">
            <h1 className={`text-2xl lg:text-4xl font-bold tracking-tight ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
              We found your system
            </h1>
            <p className={`mt-2 text-base lg:text-lg ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
              Auto-detected 6 agents across 2 workflows with 412 events in the last hour.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:gap-3 w-full">
            <span className="inline-flex items-center gap-2 px-3 lg:px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs lg:text-sm font-medium whitespace-nowrap">
              <CheckCircle2 size={14} />
              Setup complete · 5 of 6
            </span>

            {/* Date/Time Picker - Fix #9 */}
            <div className="relative" ref={timeRef}>
              <button
                onClick={() => { setShowTimePicker(!showTimePicker); setShowFilter(false); }}
                className="inline-flex items-center gap-2 px-3 lg:px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-xs lg:text-sm font-medium hover:bg-gray-100 active:bg-gray-200 transition-all"
              >
                <Clock size={14} />
                {selectedTimeRange}
                <ChevronDown size={12} />
              </button>
              {showTimePicker && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fadeIn py-2">
                  {timeRanges.map((range) => (
                    <button
                      key={range}
                      onClick={() => { setSelectedTimeRange(range); setShowTimePicker(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-all flex items-center justify-between ${
                        selectedTimeRange === range ? 'text-[#2F5CFF] font-medium' : 'text-gray-700'
                      }`}
                    >
                      {range}
                      {selectedTimeRange === range && <Check size={14} className="text-[#2F5CFF]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Button - Fix #8 */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => { setShowFilter(!showFilter); setShowTimePicker(false); }}
                className={`inline-flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all ${
                  filterAgent !== 'all' || filterStatus !== 'all'
                    ? 'bg-blue-50 text-[#2F5CFF] border border-blue-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                <Filter size={14} />
                Filter
                {(filterAgent !== 'all' || filterStatus !== 'all') && (
                  <span className="w-4 h-4 rounded-full bg-[#2F5CFF] text-white text-[10px] flex items-center justify-center">
                    {(filterAgent !== 'all' ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0)}
                  </span>
                )}
              </button>
              {showFilter && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fadeIn p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-[#111]">Filters</h3>
                    <button
                      onClick={() => { setFilterAgent('all'); setFilterStatus('all'); }}
                      className="text-xs text-[#2F5CFF] hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-[#6B7280] mb-1.5 block">Agent</label>
                      <select
                        value={filterAgent}
                        onChange={(e) => setFilterAgent(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#2F5CFF]"
                      >
                        <option value="all">All agents</option>
                        {allAgents.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#6B7280] mb-1.5 block">Status</label>
                      <div className="flex flex-wrap gap-1.5">
                        {['all', 'healthy', 'pending', 'error'].map((s) => (
                          <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                              filterStatus === s
                                ? 'bg-[#2F5CFF] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#6B7280] mb-1.5 block">Date range</label>
                      <select className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200">
                        <option>Last 1 hour</option>
                        <option>Last 24 hours</option>
                        <option>Last 7 days</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="w-full mt-4 py-2 bg-[#2F5CFF] text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-all active:scale-[0.98]"
                  >
                    Apply filters
                  </button>
                </div>
              )}
            </div>

            {/* Live Map button - Fix #8 */}
            <button
              onClick={() => navigate('/livemap')}
              className="inline-flex items-center gap-2 px-3 lg:px-4 py-2 bg-[#2F5CFF] text-white rounded-full text-xs lg:text-sm font-medium hover:bg-blue-600 active:bg-blue-700 transition-all shadow-sm active:scale-[0.98]"
            >
              <Map size={14} />
              Live Map
            </button>
          </div>
        </div>
      </div>

      {/* Agents + Timeline */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full">
        {/* Agents List */}
        <div className={`xl:col-span-3 rounded-3xl p-6 shadow-sm border min-w-0 transition-colors duration-300 ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Agents</h2>
            <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'text-gray-400 bg-[#1F1F23]' : 'text-[#6B7280] bg-gray-50'}`}>{filteredAgents.length}</span>
          </div>
          <div className="space-y-2">
            {filteredAgents.map((agent) => {
              const colors = colorMap[agent.color];
              const Icon = agent.icon;
              return (
                <div
                  key={agent.name}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer group ${
                    isDark ? 'hover:bg-[#1F1F23] active:bg-[#27272A]' : 'hover:bg-gray-50 active:bg-gray-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={colors.icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>{agent.name}</p>
                    <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>{agent.role}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${isDark ? 'text-gray-400 bg-[#1F1F23]' : 'text-[#6B7280] bg-gray-50'}`}>
                    {agent.calls}
                  </span>
                </div>
              );
            })}
            {filteredAgents.length === 0 && (
              <p className={`text-sm text-center py-4 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>No agents match filters</p>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className={`xl:col-span-9 rounded-3xl p-6 shadow-sm border min-w-0 transition-colors duration-300 ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Agent Activity Timeline</h2>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>15-min increments</span>
          </div>
          
          {/* Time ticks - contained scrollable area */}
          <div className="overflow-x-auto -mx-2 px-2">
            <div className="min-w-[500px]">
              <div className="flex justify-between mb-2 px-1">
                {['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45'].map((t) => (
                  <span key={t} className="text-[10px] text-[#9CA3AF] font-medium">{t}</span>
                ))}
              </div>

              {/* Timeline rows */}
              <div className="space-y-2">
                {filteredTimeline.map((row) => {
                  const agentData = allAgents.find(a => a.name === row.agent);
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
                      <div className={`flex-1 h-8 rounded-lg relative overflow-hidden min-w-0 ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-50'}`}>
                        {row.segments.map((seg, i) => (
                          <div
                            key={i}
                            className={`absolute top-1 bottom-1 rounded-md flex items-center px-2 ${
                              seg.state === 'healthy' 
                                ? isDark ? 'bg-green-900/30 border border-green-700/50' : 'bg-green-100 border border-green-200'
                                : isDark ? 'bg-blue-900/30 border border-blue-700/50' : 'bg-blue-100 border border-blue-200'
                            }`}
                            style={{ left: `${seg.start}%`, width: `${seg.width}%` }}
                          >
                            <span className={`text-[9px] font-medium truncate ${
                              seg.state === 'healthy' 
                                ? isDark ? 'text-green-300' : 'text-green-700'
                                : isDark ? 'text-blue-300' : 'text-blue-700'
                            }`}>
                              {seg.status}
                            </span>
                          </div>
                        ))}
                        {/* Now marker */}
                        <div className="absolute top-0 bottom-0 w-px bg-[#2F5CFF] opacity-60 relative" style={{ left: '68%' }}>
                          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-[#2F5CFF]" />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredTimeline.length === 0 && (
                  <p className="text-sm text-[#6B7280] text-center py-8">No timeline data for selected filters</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Next Steps - Fix #11 */}
        <div className={`lg:col-span-4 rounded-3xl p-6 shadow-sm border min-w-0 transition-colors duration-300 ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Next steps</h2>
          <div className="space-y-3">
            {nextSteps.map((step) => (
              <div
                key={step.id}
                onClick={() => handleCompleteStep(step.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                  step.completed
                    ? isDark ? 'border-green-700/50 bg-green-900/20' : 'border-green-200 bg-green-50/50'
                    : isDark
                      ? 'border-[#1F1F23] hover:shadow-md hover:border-[#27272A] active:scale-[0.99]'
                      : 'border-gray-100 hover:shadow-md hover:border-gray-200 active:scale-[0.99]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className={`text-sm font-semibold ${step.completed ? 'line-through' : ''} ${
                    step.completed 
                      ? isDark ? 'text-gray-500' : 'text-[#6B7280]'
                      : isDark ? 'text-gray-100' : 'text-[#111]'
                  }`}>
                    {step.title}
                  </h3>
                  {step.completed ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-semibold rounded-full flex-shrink-0 flex items-center gap-1">
                      <CheckCircle2 size={10} />
                      Done
                    </span>
                  ) : step.priority ? (
                    <span className="px-2 py-0.5 bg-[#2F5CFF] text-white text-[10px] font-semibold rounded-full flex-shrink-0">
                      Do first
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-semibold rounded-full flex-shrink-0">
                      {step.tag}
                    </span>
                  )}
                </div>
                <p className={`text-xs mb-3 ${step.completed ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>{step.desc}</p>
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
        <div className={`lg:col-span-4 rounded-3xl p-6 shadow-sm border min-w-0 transition-colors duration-300 ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Detected</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={Users} value="6" label="agents" sub="92% confidence" color="purple" isDark={isDark} />
            <StatCard icon={GitBranch} value="2" label="workflows" sub="Auto-detected" color="blue" isDark={isDark} />
            <StatCard icon={ArrowRightLeft} value="9" label="handoffs" sub="Last hour" color="green" isDark={isDark} />
            <StatCard icon={Zap} value="412" label="events" sub="Processing" color="amber" isDark={isDark} />
          </div>
        </div>

        {/* AI Assistant - Fix #10 */}
        <div className={`lg:col-span-4 rounded-3xl p-6 shadow-sm border flex flex-col min-w-0 transition-colors duration-300 ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center flex-shrink-0">
              <Sparkles size={14} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>AI Assistant</p>
              <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Welcome, Alex — what can I help with?</p>
            </div>
          </div>

          {/* Chat messages */}
          {chatMessages.length > 0 && (
            <div className="flex-1 overflow-y-auto mb-3 space-y-2 max-h-32">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs ${
                    msg.role === 'user'
                      ? 'bg-[#2F5CFF] text-white rounded-br-md'
                      : 'bg-gray-100 text-[#111] rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick actions */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {quickActions.map((action) => (
              <button
                key={action}
                onClick={() => handleQuickAction(action)}
                className={`px-2.5 py-1.5 text-[11px] font-medium rounded-full transition-all ${
                  isDark 
                    ? 'bg-[#1F1F23] text-gray-300 hover:bg-[#27272A] active:bg-[#3F3F46]' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 active:bg-gray-200'
                }`}
              >
                {action}
              </button>
            ))}
          </div>

          {/* Suggested questions */}
          {chatMessages.length === 0 && (
            <div className="flex-1 space-y-1 mb-3">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestedQuestion(q)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#6B7280] hover:bg-gray-50 hover:text-[#111] active:bg-gray-100 transition-all flex items-center gap-2"
                >
                  <ArrowRight size={12} className="text-[#2F5CFF] flex-shrink-0" />
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Chat input */}
          <div className={`border rounded-2xl p-3 focus-within:border-[#2F5CFF] focus-within:ring-2 focus-within:ring-blue-100 transition-all ${
            isDark ? 'border-[#27272A]' : 'border-gray-200'
          }`}>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                placeholder="Ask about your agents..."
                className={`flex-1 text-sm outline-none bg-transparent min-w-0 ${
                  isDark ? 'text-gray-100 placeholder:text-gray-500' : 'text-[#111] placeholder:text-gray-400'
                }`}
              />
              <span className={`text-[10px] flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-300'}`}>{chatInput.length}/500</span>
            </div>
            <div className={`flex items-center justify-between mt-2 pt-2 border-t ${isDark ? 'border-[#27272A]' : 'border-gray-100'}`}>
              <div className="flex items-center gap-1">
                <button className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
                  isDark ? 'hover:bg-[#1F1F23] active:bg-[#27272A] text-gray-400' : 'hover:bg-gray-50 active:bg-gray-100 text-gray-400'
                }`}>
                  <Paperclip size={14} />
                </button>
                <button className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
                  isDark ? 'hover:bg-[#1F1F23] active:bg-[#27272A] text-gray-400' : 'hover:bg-gray-50 active:bg-gray-100 text-gray-400'
                }`}>
                  <Sparkles size={14} />
                </button>
                <button className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
                  isDark ? 'hover:bg-[#1F1F23] active:bg-[#27272A] text-gray-400' : 'hover:bg-gray-50 active:bg-gray-100 text-gray-400'
                }`}>
                  <Mic size={14} />
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#2F5CFF] text-white hover:bg-blue-600 active:bg-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Config Modal */}
      {showConfigModal !== null && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setShowConfigModal(null)}>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#111]">
                {nextSteps.find(s => s.id === showConfigModal)?.title}
              </h3>
              <button onClick={() => setShowConfigModal(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-[#6B7280] mb-4">
              {nextSteps.find(s => s.id === showConfigModal)?.desc}
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[#6B7280] block mb-1">Threshold value</label>
                <input type="text" defaultValue="2000ms" className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="text-xs font-medium text-[#6B7280] block mb-1">Notification channel</label>
                <select className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                  <option>Email</option>
                  <option>Slack</option>
                  <option>Webhook</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { handleCompleteStep(showConfigModal); setShowConfigModal(null); }}
                className="flex-1 py-2.5 bg-[#2F5CFF] text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-all active:scale-[0.98]"
              >
                Save & Complete
              </button>
              <button
                onClick={() => setShowConfigModal(null)}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all"
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

function StatCard({ icon: Icon, value, label, sub, color, isDark }: { icon: any; value: string; label: string; sub: string; color: string; isDark: boolean }) {
  const colors: Record<string, string> = {
    purple: 'bg-purple-50 text-purple-500',
    blue: 'bg-blue-50 text-blue-500',
    green: 'bg-green-50 text-green-500',
    amber: 'bg-amber-50 text-amber-500',
  };
  const darkColors: Record<string, string> = {
    purple: 'bg-purple-900/30 text-purple-400',
    blue: 'bg-blue-900/30 text-blue-400',
    green: 'bg-green-900/30 text-green-400',
    amber: 'bg-amber-900/30 text-amber-400',
  };
  return (
    <div className={`p-4 rounded-2xl border hover:shadow-md transition-all min-w-0 overflow-hidden ${
      isDark ? 'border-[#1F1F23] hover:border-[#27272A]' : 'border-gray-100'
    }`}>
      <div className={`w-8 h-8 rounded-lg ${isDark ? darkColors[color] : colors[color]} flex items-center justify-center mb-3 flex-shrink-0`}>
        <Icon size={16} className="flex-shrink-0" />
      </div>
      <p className={`text-2xl font-bold truncate ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>{value}</p>
      <p className={`text-xs font-medium truncate ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>{label}</p>
      <p className={`text-[10px] mt-1 truncate ${isDark ? 'text-gray-500' : 'text-[#9CA3AF]'}`}>{sub}</p>
    </div>
  );
}
