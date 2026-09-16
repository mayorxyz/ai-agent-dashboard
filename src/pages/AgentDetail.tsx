import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, GitBranch, TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { agents, versionHistory } from '../data/mockData';

export default function AgentDetail() {
  const { agentName } = useParams<{ agentName: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [showDiff, setShowDiff] = useState(false);

  const agent = agents.find(a => a.name === agentName);
  const versions = versionHistory[agentName as keyof typeof versionHistory] || [];

  const agentColors: Record<string, string> = {
    Researcher: '#10B981',
    Supervisor: '#8B5CF6',
    DataFetcher: '#3B82F6',
    Validator: '#F59E0B',
    Responder: '#EF4444',
  };

  const toggleVersion = (version: string) => {
    if (selectedVersions.includes(version)) {
      setSelectedVersions(selectedVersions.filter(v => v !== version));
    } else if (selectedVersions.length < 2) {
      setSelectedVersions([...selectedVersions, version]);
    }
  };

  const getDiff = () => {
    if (selectedVersions.length !== 2) return null;
    const v1 = versions.find(v => v.version === selectedVersions[0]);
    const v2 = versions.find(v => v.version === selectedVersions[1]);
    if (!v1 || !v2) return null;

    const lines1 = v1.config.split('\n');
    const lines2 = v2.config.split('\n');
    
    return { old: lines1, new: lines2 };
  };

  if (!agent) {
    return (
      <div className="text-center py-20">
        <p className={isDark ? 'text-gray-400' : 'text-[#6B7280]'}>Agent not found</p>
        <button onClick={() => navigate('/')} className="mt-4 text-[#2F5CFF] text-sm font-medium hover:underline">
          ← Back to overview
        </button>
      </div>
    );
  }

  const color = agentColors[agent.name];
  const diff = showDiff ? getDiff() : null;

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className={`inline-flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-[#6B7280] hover:text-[#111]'} transition-all`}
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Agent Info */}
      <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: color }} />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>{agent.name}</h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>{agent.role}</p>
          </div>
        </div>
      </div>

      {/* Version History */}
      <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Version History</h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Select two versions to compare</p>
          </div>
          {selectedVersions.length === 2 && (
            <button
              onClick={() => setShowDiff(!showDiff)}
              className="px-4 py-2 bg-[#2F5CFF] text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-all"
            >
              {showDiff ? 'Hide Diff' : 'Show Diff'}
            </button>
          )}
        </div>

        {/* Version Timeline */}
        <div className="relative">
          <div className={`absolute left-6 top-0 bottom-0 w-0.5 ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-200'}`} />
          <div className="space-y-6">
            {versions.map((version) => {
              const isSelected = selectedVersions.includes(version.version);
              const date = new Date(version.timestamp);
              
              return (
                <div key={version.version} className="relative flex gap-4">
                  {/* Timeline dot */}
                  <button
                    onClick={() => toggleVersion(version.version)}
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all flex-shrink-0 ${
                      isSelected
                        ? 'bg-[#2F5CFF] text-white'
                        : isDark
                          ? 'bg-[#1F1F23] text-gray-400 hover:bg-[#27272A]'
                          : 'bg-white text-[#6B7280] border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {version.version}
                  </button>

                  {/* Content */}
                  <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? isDark ? 'border-[#2F5CFF] bg-[#2F5CFF]/5' : 'border-[#2F5CFF] bg-blue-50'
                      : isDark ? 'border-[#1F1F23] hover:border-[#27272A]' : 'border-gray-100 hover:border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                          {version.summary}
                        </h3>
                        <div className={`flex items-center gap-3 mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            {version.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {date.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {/* Performance delta */}
                      <div className="flex flex-col gap-1">
                        {version.perfDelta.latency !== 0 && (
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            version.perfDelta.latency < 0
                              ? 'bg-green-50 text-green-700'
                              : 'bg-red-50 text-red-700'
                          }`}>
                            {version.perfDelta.latency > 0 ? '+' : ''}{version.perfDelta.latency}% latency
                          </span>
                        )}
                        {version.perfDelta.errorRate !== 0 && (
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            version.perfDelta.errorRate < 0
                              ? 'bg-green-50 text-green-700'
                              : 'bg-red-50 text-red-700'
                          }`}>
                            {version.perfDelta.errorRate > 0 ? '+' : ''}{version.perfDelta.errorRate}% errors
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Diff View */}
        {diff && (
          <div className={`mt-6 p-4 rounded-2xl border ${isDark ? 'bg-[#1F1F23] border-[#27272A]' : 'bg-gray-50 border-gray-200'}`}>
            <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
              Configuration Diff
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-xs font-medium mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  {selectedVersions[0]} (removed)
                </p>
                <div className={`p-3 rounded-xl font-mono text-xs ${isDark ? 'bg-[#111113]' : 'bg-white'}`}>
                  {diff.old.map((line, i) => (
                    <div key={i} className={`${isDark ? 'text-red-400' : 'text-red-600'} line-through`}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-xs font-medium mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  {selectedVersions[1]} (added)
                </p>
                <div className={`p-3 rounded-xl font-mono text-xs ${isDark ? 'bg-[#111113]' : 'bg-white'}`}>
                  {diff.new.map((line, i) => (
                    <div key={i} className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
