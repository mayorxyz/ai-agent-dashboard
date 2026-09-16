import { useState } from 'react';
import { Play, Clock, DollarSign, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { agents, sandboxExecutions } from '../data/mockData';

export default function Sandbox() {
  const { isDark } = useTheme();
  const [selectedAgent, setSelectedAgent] = useState('Researcher');
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [trace, setTrace] = useState<any[]>([]);
  const [latency, setLatency] = useState(0);
  const [cost, setCost] = useState(0);
  const [showTrace, setShowTrace] = useState(true);

  const handleRun = () => {
    if (!input.trim()) return;
    
    setIsRunning(true);
    setOutput('');
    setTrace([]);
    setLatency(0);
    setCost(0);

    // Simulate execution
    setTimeout(() => {
      const execution = sandboxExecutions[selectedAgent as keyof typeof sandboxExecutions];
      setOutput(execution.output);
      setTrace(execution.trace);
      setLatency(execution.latency);
      setCost(execution.cost);
      setIsRunning(false);
    }, 1500);
  };

  const agentColors: Record<string, string> = {
    Researcher: '#10B981',
    Supervisor: '#8B5CF6',
    DataFetcher: '#3B82F6',
    Validator: '#F59E0B',
    Responder: '#EF4444',
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
          Sandbox
        </h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
          Test agents in a controlled environment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Input */}
        <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            Configuration
          </h2>

          {/* Agent Selector */}
          <div className="mb-4">
            <label className={`text-sm font-medium block mb-2 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
              Agent
            </label>
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                isDark
                  ? 'bg-[#1F1F23] border-[#27272A] text-gray-100'
                  : 'bg-white border-gray-200 text-[#111]'
              }`}
            >
              {agents.map((agent) => (
                <option key={agent.name} value={agent.name}>
                  {agent.name} - {agent.role}
                </option>
              ))}
            </select>
          </div>

          {/* Input Textarea */}
          <div className="mb-4">
            <label className={`text-sm font-medium block mb-2 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
              Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your prompt or query..."
              rows={8}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none ${
                isDark
                  ? 'bg-[#1F1F23] border-[#27272A] text-gray-100 placeholder:text-gray-500'
                  : 'bg-white border-gray-200 text-[#111] placeholder:text-gray-400'
              }`}
            />
          </div>

          {/* Run Button */}
          <button
            onClick={handleRun}
            disabled={isRunning || !input.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#2F5CFF] text-white rounded-xl font-medium hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play size={18} />
                Run Agent
              </>
            )}
          </button>

          {/* Metrics */}
          {latency > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={14} className="text-blue-500" />
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Latency</span>
                </div>
                <p className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                  {latency}s
                </p>
              </div>
              <div className={`p-3 rounded-xl ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={14} className="text-green-500" />
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Cost</span>
                </div>
                <p className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                  ${cost.toFixed(3)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Output */}
        <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            Output
          </h2>

          {/* Output Area */}
          <div className={`mb-4 p-4 rounded-xl min-h-[200px] ${
            isDark ? 'bg-[#1F1F23]' : 'bg-gray-50'
          }`}>
            {isRunning ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 size={24} className="animate-spin text-[#2F5CFF]" />
              </div>
            ) : output ? (
              <div className={`text-sm whitespace-pre-wrap ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                {output}
              </div>
            ) : (
              <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Run an agent to see output here...
              </div>
            )}
          </div>

          {/* Trace Section */}
          {trace.length > 0 && (
            <div>
              <button
                onClick={() => setShowTrace(!showTrace)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  isDark ? 'bg-[#1F1F23] hover:bg-[#27272A]' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                  Execution Trace ({trace.length} steps)
                </span>
                {showTrace ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {showTrace && (
                <div className="mt-3 space-y-3">
                  {trace.map((step, i) => (
                    <div key={i} className={`p-3 rounded-xl border-l-4 ${
                      step.type === 'tool_call'
                        ? isDark ? 'border-blue-500 bg-blue-900/10' : 'border-blue-500 bg-blue-50'
                        : step.type === 'reasoning'
                          ? isDark ? 'border-purple-500 bg-purple-900/10' : 'border-purple-500 bg-purple-50'
                          : isDark ? 'border-green-500 bg-green-900/10' : 'border-green-500 bg-green-50'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-semibold uppercase ${
                          step.type === 'tool_call'
                            ? 'text-blue-600'
                            : step.type === 'reasoning'
                              ? 'text-purple-600'
                              : 'text-green-600'
                        }`}>
                          Step {step.step}: {step.type.replace('_', ' ')}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                          {step.duration}
                        </span>
                      </div>
                      {step.tool && (
                        <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                          Tool: {step.tool}
                        </p>
                      )}
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                        {step.input}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
