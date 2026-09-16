import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { X, ChevronDown } from 'lucide-react';
import { agents, agentComparisonData } from '../data/mockData';

export default function Compare() {
  const { isDark } = useTheme();
  const [selectedAgents, setSelectedAgents] = useState<string[]>(['Researcher', 'DataFetcher']);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleAgent = (agentName: string) => {
    if (selectedAgents.includes(agentName)) {
      if (selectedAgents.length > 2) {
        setSelectedAgents(selectedAgents.filter(a => a !== agentName));
      }
    } else {
      if (selectedAgents.length < 4) {
        setSelectedAgents([...selectedAgents, agentName]);
      }
    }
  };

  const removeAgent = (agentName: string) => {
    if (selectedAgents.length > 2) {
      setSelectedAgents(selectedAgents.filter(a => a !== agentName));
    }
  };

  const agentColors: Record<string, string> = {
    Researcher: '#10B981',
    Supervisor: '#8B5CF6',
    DataFetcher: '#3B82F6',
    Validator: '#F59E0B',
    Responder: '#EF4444',
  };

  const metrics = [
    { label: 'Latency', key: 'latency', unit: 's', format: (v: number) => v.toFixed(1) },
    { label: 'Cost', key: 'cost', unit: '$', format: (v: number) => v.toFixed(2) },
    { label: 'Error Rate', key: 'errorRate', unit: '%', format: (v: number) => v.toFixed(1) },
    { label: 'Call Volume', key: 'callVolume', unit: '', format: (v: number) => v.toLocaleString() },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            Agent Comparison
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            Compare performance metrics across agents
          </p>
        </div>
      </div>

      {/* Agent Selector */}
      <div className={`rounded-3xl p-6 shadow-sm border min-w-0 ${
        isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
      }`}>
        <label className={`text-sm font-medium block mb-3 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
          Select Agents to Compare (2-4)
        </label>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
              isDark
                ? 'bg-[#1F1F23] border-[#27272A] text-gray-100 hover:border-[#3F3F46]'
                : 'bg-white border-gray-200 text-[#111] hover:border-gray-300'
            }`}
          >
            <div className="flex flex-wrap gap-2 flex-1">
              {selectedAgents.map((agentName) => (
                <span
                  key={agentName}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${agentColors[agentName]}20`,
                    color: agentColors[agentName],
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: agentColors[agentName] }}
                  />
                  {agentName}
                  {selectedAgents.length > 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAgent(agentName);
                      }}
                      className="ml-1 hover:opacity-70"
                    >
                      <X size={12} />
                    </button>
                  )}
                </span>
              ))}
            </div>
            <ChevronDown size={16} className={isDark ? 'text-gray-400' : 'text-gray-400'} />
          </button>

          {showDropdown && (
            <div className={`absolute z-10 w-full mt-2 rounded-xl border shadow-lg overflow-hidden ${
              isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-gray-200'
            }`}>
              {agents.map((agent) => {
                const isSelected = selectedAgents.includes(agent.name);
                const isDisabled = !isSelected && selectedAgents.length >= 4;
                return (
                  <button
                    key={agent.name}
                    onClick={() => {
                      if (!isDisabled) {
                        toggleAgent(agent.name);
                      }
                    }}
                    disabled={isDisabled}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                      isDisabled
                        ? isDark ? 'bg-[#1F1F23] text-gray-600 cursor-not-allowed' : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                        : isSelected
                          ? isDark ? 'bg-[#2F5CFF]/10 text-gray-100' : 'bg-blue-50 text-[#111]'
                          : isDark ? 'bg-[#1F1F23] text-gray-300 hover:bg-[#27272A]' : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: agentColors[agent.name] }}
                    />
                    <span className="text-sm font-medium flex-1">{agent.name}</span>
                    {isSelected && (
                      <span className={`text-xs ${isDark ? 'text-blue-400' : 'text-[#2F5CFF]'}`}>
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Cards */}
      <div className={`grid gap-4 w-full ${
        selectedAgents.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
        selectedAgents.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      }`}>
        {selectedAgents.map((agentName) => {
          const data = agentComparisonData[agentName as keyof typeof agentComparisonData];
          const color = agentColors[agentName];
          
          return (
            <div
              key={agentName}
              className={`rounded-3xl p-6 shadow-sm border min-w-0 ${
                isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
              }`}
            >
              {/* Agent Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-[#1F1F23]">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-semibold truncate ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                    {agentName}
                  </h3>
                  <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                    {agents.find(a => a.name === agentName)?.role}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                {metrics.map((metric) => {
                  const value = data[metric.key as keyof typeof data];
                  return (
                    <div key={metric.key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                          {metric.label}
                        </span>
                        <span className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                          {metric.unit === '$' ? '$' : ''}
                          {metric.format(value)}
                          {metric.unit !== '$' && metric.unit ? metric.unit : ''}
                        </span>
                      </div>
                      {/* Visual bar */}
                      <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-100'}`}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min((value / Math.max(...selectedAgents.map(a => {
                              const agentData = agentComparisonData[a as keyof typeof agentComparisonData];
                              return agentData[metric.key as keyof typeof agentData] as number;
                            }))) * 100, 100)}%`,
                            backgroundColor: color,
                          }}
                        />
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
  );
}
