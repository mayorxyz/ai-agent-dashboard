import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  Search,
  Brain,
  Database,
  ShieldCheck,
  MessageSquare,
  Activity,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import AgentNetworkGraph from '../components/AgentNetworkGraph';

const agents = [
  { id: 'supervisor', name: 'Supervisor', icon: Brain, color: 'purple', status: 'active' as const, load: 78 },
  { id: 'researcher', name: 'Researcher', icon: Search, color: 'green', status: 'active' as const, load: 65 },
  { id: 'datafetcher', name: 'DataFetcher', icon: Database, color: 'blue', status: 'active' as const, load: 92 },
  { id: 'validator', name: 'Validator', icon: ShieldCheck, color: 'amber', status: 'idle' as const, load: 34 },
  { id: 'responder', name: 'Responder', icon: MessageSquare, color: 'coral', status: 'active' as const, load: 56 },
];

const connections = [
  { from: 'supervisor', to: 'researcher', value: 89, label: 'delegate' },
  { from: 'supervisor', to: 'datafetcher', value: 145, label: 'fetch' },
  { from: 'researcher', to: 'validator', value: 67, label: 'validate' },
  { from: 'datafetcher', to: 'validator', value: 178, label: 'verify' },
  { from: 'validator', to: 'responder', value: 178, label: 'respond' },
  { from: 'researcher', to: 'responder', value: 22, label: 'context' },
];

const activeTraces = [
  { id: 'tr_8f2a1b3c', agent: 'Supervisor', status: 'running', duration: '1.2s', timestamp: '2s ago' },
  { id: 'tr_9c3b2d4e', agent: 'DataFetcher', status: 'running', duration: '0.8s', timestamp: '5s ago' },
  { id: 'tr_7d4e5f6a', agent: 'Validator', status: 'completed', duration: '2.1s', timestamp: '8s ago' },
  { id: 'tr_6a1b7c8d', agent: 'Supervisor', status: 'running', duration: '0.5s', timestamp: '12s ago' },
  { id: 'tr_5b2c9d0e', agent: 'Researcher', status: 'completed', duration: '1.7s', timestamp: '15s ago' },
];

const agentColors: Record<string, string> = {
  supervisor: '#8B5CF6',
  researcher: '#10B981',
  datafetcher: '#3B82F6',
  validator: '#F59E0B',
  responder: '#EF4444',
};

const agentIcons: Record<string, any> = {
  supervisor: Brain,
  researcher: Search,
  datafetcher: Database,
  validator: ShieldCheck,
  responder: MessageSquare,
};

export default function LiveMap() {
  const { isDark } = useTheme();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const getAgentData = (id: string) => agents.find(a => a.id === id);

  return (
    <div className="space-y-6 xl:space-y-8 w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between flex-wrap gap-4"
      >
        <div>
          <h1 className={`text-h1 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Live Map</h1>
          <p className={`text-body mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            Real-time agent communication and request flow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`px-3 py-1.5 rounded-full text-caption font-medium flex items-center gap-2 ${
              isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Live
          </motion.div>
        </div>
      </motion.div>

      {/* Main grid - 12-col */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full">
        {/* Agent Network - 8 cols (featured with shadow-lifted) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="xl:col-span-8 min-w-0"
        >
          <AgentNetworkGraph
            agents={agents}
            connections={connections}
            selectedNode={selectedNode}
            onNodeClick={setSelectedNode}
          />
        </motion.div>

        {/* Active Traces - 4 cols (shadow-subtle) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="xl:col-span-4 space-y-6"
        >
          {/* Active Traces */}
          <div className={`rounded-2xl p-6 ${
            isDark ? 'bg-[#111113] border border-[#1F1F23]' : 'bg-white border border-gray-200/50'
          }`} style={{ boxShadow: 'var(--shadow-subtle)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-h3 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                Active Traces
              </h3>
              <span className={`text-caption px-2 py-1 rounded-full ${
                isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'
              }`}>
                {activeTraces.filter(t => t.status === 'running').length} running
              </span>
            </div>
            <div className="space-y-2">
              {activeTraces.map((trace, idx) => {
                const agentColor = agentColors[trace.agent.toLowerCase()];
                return (
                  <motion.div
                    key={trace.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`relative p-3 rounded-xl transition-all duration-200 cursor-pointer overflow-hidden ${
                      isDark ? 'bg-[#1F1F23] hover:bg-[#27272A]' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {/* Agent color accent bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{ backgroundColor: agentColor }}
                    />
                    <div className="flex items-center justify-between mb-1 pl-2">
                      <span className={`text-caption font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {trace.id}
                      </span>
                      {trace.status === 'running' ? (
                        <Activity size={14} className="text-blue-500 animate-pulse" />
                      ) : trace.status === 'completed' ? (
                        <CheckCircle2 size={14} className="text-green-500" />
                      ) : (
                        <XCircle size={14} className="text-red-500" />
                      )}
                    </div>
                    <p className={`text-body font-medium pl-2 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                      {trace.agent}
                    </p>
                    <div className="flex items-center justify-between mt-1 pl-2">
                      <span className={`text-caption ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {trace.duration} · {trace.timestamp}
                      </span>
                      <span className={`text-caption font-medium ${
                        trace.status === 'running' ? 'text-blue-500' :
                        trace.status === 'completed' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {trace.status}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Selected Node Details */}
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl p-6 ${
                isDark ? 'bg-[#111113] border border-[#1F1F23]' : 'bg-white border border-gray-200/50'
              }`}
              style={{ boxShadow: 'var(--shadow-subtle)' }}
            >
              <h3 className={`text-h3 mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                {getAgentData(selectedNode)?.name} Details
              </h3>
              {(() => {
                const agent = getAgentData(selectedNode);
                if (!agent) return null;
                const color = agentColors[agent.id];
                const Icon = agentIcons[agent.id];
                return (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${color}20`,
                          boxShadow: `inset 0 0 0 1px ${color}33`,
                        }}
                      >
                        <Icon size={20} style={{ color }} />
                      </div>
                      <div>
                        <p className={`text-body font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                          {agent.name}
                        </p>
                        <p className={`text-caption ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {agent.status === 'active' ? '● Active' : '○ Idle'}
                        </p>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-caption ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Load</span>
                        <span className={`text-body font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                          {agent.load}%
                        </span>
                      </div>
                      <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#27272A]' : 'bg-gray-200'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${agent.load}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-[#2F5CFF] rounded-full"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className={`p-3 rounded-xl ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-50'}`}>
                        <p className={`text-caption ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Connections</p>
                        <p className={`text-h3 font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`} style={{ letterSpacing: '-0.01em' }}>
                          {connections.filter(c => c.from === agent.id || c.to === agent.id).length}
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-50'}`}>
                        <p className={`text-caption ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Avg Latency</p>
                        <p className={`text-h3 font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`} style={{ letterSpacing: '-0.01em' }}>1.2s</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Sankey Diagram - Handoff Volume (reskinned to match network graph) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`rounded-3xl p-6 ${
          isDark ? 'bg-[#111113] border border-[#1F1F23]' : 'bg-white border border-gray-200/50'
        }`}
        style={{ boxShadow: 'var(--shadow-lifted)' }}
      >
        <h3 className={`text-h3 mb-6 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
          Handoff Volume
        </h3>
        <div className="relative">
          {/* Ambient background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.05]'}`}
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, ${isDark ? '#2F5CFF' : '#2F5CFF'} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <div className="relative h-[200px] flex items-center justify-around">
            {agents.map((agent, idx) => {
              const color = agentColors[agent.id];
              const Icon = agentIcons[agent.id];
              const totalFlow = connections
                .filter(c => c.from === agent.id || c.to === agent.id)
                .reduce((sum, c) => sum + c.value, 0);
              
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${color}20`,
                      boxShadow: `inset 0 0 0 1px ${color}33`,
                    }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>
                  <p className={`text-caption font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ letterSpacing: '-0.01em' }}>
                    {agent.name}
                  </p>
                  <p className={`text-caption ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {totalFlow} calls
                  </p>
                </motion.div>
              );
            })}

            {/* Connection lines between nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {connections.map((conn, idx) => {
                const fromIdx = agents.findIndex(a => a.id === conn.from);
                const toIdx = agents.findIndex(a => a.id === conn.to);
                if (fromIdx === -1 || toIdx === -1) return null;

                const fromX = (fromIdx / (agents.length - 1)) * 100;
                const toX = (toIdx / (agents.length - 1)) * 100;
                const maxVolume = Math.max(...connections.map(c => c.value));
                const weight = 0.5 + (conn.value / maxVolume) * 2;

                return (
                  <motion.line
                    key={idx}
                    x1={`${fromX}%`}
                    y1="50%"
                    x2={`${toX}%`}
                    y2="50%"
                    stroke={agentColors[conn.from]}
                    strokeWidth={weight}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: idx * 0.1 + 0.5 }}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
