import { useState } from 'react';
import {
  Search,
  Brain,
  Database,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

const nodes = [
  { id: 'supervisor', name: 'Supervisor', icon: Brain, x: 400, y: 100, color: 'purple', status: 'active', load: 78 },
  { id: 'researcher', name: 'Researcher', icon: Search, x: 150, y: 250, color: 'green', status: 'active', load: 65 },
  { id: 'datafetcher', name: 'DataFetcher', icon: Database, x: 650, y: 250, color: 'blue', status: 'active', load: 92 },
  { id: 'validator', name: 'Validator', icon: ShieldCheck, x: 250, y: 420, color: 'amber', status: 'idle', load: 34 },
  { id: 'responder', name: 'Responder', icon: MessageSquare, x: 550, y: 420, color: 'coral', status: 'active', load: 56 },
];

const edges = [
  { from: 'supervisor', to: 'researcher', active: true, label: 'delegate' },
  { from: 'supervisor', to: 'datafetcher', active: true, label: 'fetch' },
  { from: 'researcher', to: 'validator', active: false, label: 'validate' },
  { from: 'datafetcher', to: 'validator', active: true, label: 'verify' },
  { from: 'validator', to: 'responder', active: true, label: 'respond' },
  { from: 'researcher', to: 'responder', active: false, label: 'context' },
];

const activeTraces = [
  { id: 'tr_8f2a', agent: 'Supervisor → Researcher', duration: '1.2s', status: 'running' },
  { id: 'tr_9c3b', agent: 'DataFetcher → Validator', duration: '0.8s', status: 'running' },
  { id: 'tr_7d4e', agent: 'Validator → Responder', duration: '2.1s', status: 'running' },
  { id: 'tr_6a1f', agent: 'Supervisor → DataFetcher', duration: '0.5s', status: 'completed' },
  { id: 'tr_5b2c', agent: 'Researcher → Responder', duration: '1.7s', status: 'completed' },
];

const colorMap: Record<string, { bg: string; ring: string; icon: string }> = {
  green: { bg: 'bg-green-500', ring: 'ring-green-200', icon: 'text-green-600' },
  purple: { bg: 'bg-purple-500', ring: 'ring-purple-200', icon: 'text-purple-600' },
  blue: { bg: 'bg-blue-500', ring: 'ring-blue-200', icon: 'text-blue-600' },
  amber: { bg: 'bg-amber-500', ring: 'ring-amber-200', icon: 'text-amber-600' },
  coral: { bg: 'bg-red-500', ring: 'ring-red-200', icon: 'text-red-600' },
};

export default function LiveMap() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const getNodePos = (id: string) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111]">Live Map</h1>
          <p className="text-sm text-[#6B7280] mt-1">Real-time agent communication graph</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Main canvas */}
        <div className="xl:col-span-8 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[500px] relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 520">
            {/* Edges */}
            {edges.map((edge, i) => {
              const from = getNodePos(edge.from);
              const to = getNodePos(edge.to);
              return (
                <g key={i}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={edge.active ? '#2F5CFF' : '#E5E7EB'}
                    strokeWidth={edge.active ? 2 : 1}
                    strokeDasharray={edge.active ? '6 4' : 'none'}
                    className={edge.active ? 'animate-flow' : ''}
                    opacity={edge.active ? 0.7 : 0.4}
                  />
                  {edge.active && (
                    <circle r="4" fill="#2F5CFF" opacity="0.8">
                      <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path={`M${from.x},${from.y} L${to.x},${to.y}`}
                      />
                    </circle>
                  )}
                  {/* Edge label */}
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 8}
                    textAnchor="middle"
                    className="text-[9px] fill-gray-400"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const colors = colorMap[node.color];
              const Icon = node.icon;
              const isSelected = selectedNode === node.id;
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(isSelected ? null : node.id)}
                  className="cursor-pointer"
                >
                  {/* Outer ring for active */}
                  {node.status === 'active' && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="38"
                      fill="none"
                      stroke={colors.bg.replace('bg-', '').includes('green') ? '#10B981' : colors.bg.includes('purple') ? '#8B5CF6' : colors.bg.includes('blue') ? '#3B82F6' : colors.bg.includes('amber') ? '#F59E0B' : '#EF4444'}
                      strokeWidth="1"
                      opacity="0.3"
                      className="animate-pulse-slow"
                    />
                  )}
                  {/* Node background */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="32"
                    fill="white"
                    stroke={isSelected ? '#2F5CFF' : '#E5E7EB'}
                    strokeWidth={isSelected ? 2 : 1}
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.05))"
                  />
                  {/* Status dot */}
                  <circle
                    cx={node.x + 22}
                    cy={node.y - 22}
                    r="5"
                    fill={node.status === 'active' ? '#10B981' : '#9CA3AF'}
                    stroke="white"
                    strokeWidth="2"
                  />
                  {/* Icon placeholder - using text */}
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    className="text-lg"
                  >
                    {node.id === 'supervisor' ? '🧠' : node.id === 'researcher' ? '🔍' : node.id === 'datafetcher' ? '📊' : node.id === 'validator' ? '🛡️' : '💬'}
                  </text>
                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + 52}
                    textAnchor="middle"
                    className="text-[11px] font-medium fill-gray-700"
                  >
                    {node.name}
                  </text>
                  {/* Load indicator */}
                  <text
                    x={node.x}
                    y={node.y + 66}
                    textAnchor="middle"
                    className="text-[9px] fill-gray-400"
                  >
                    {node.load}% load
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side panel */}
        <div className="xl:col-span-4 space-y-4">
          {/* Active Traces */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-[#111]">Active Traces</h2>
              <span className="text-xs text-[#6B7280] bg-gray-50 px-2 py-1 rounded-full">
                {activeTraces.filter(t => t.status === 'running').length} running
              </span>
            </div>
            <div className="space-y-2">
              {activeTraces.map((trace) => (
                <div
                  key={trace.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${trace.status === 'running' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                    <div>
                      <p className="text-xs font-medium text-[#111]">{trace.agent}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{trace.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-[#111]">{trace.duration}</p>
                    <p className={`text-[10px] ${trace.status === 'running' ? 'text-green-600' : 'text-gray-400'}`}>
                      {trace.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Node Details */}
          {selectedNode && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              {(() => {
                const node = nodes.find(n => n.id === selectedNode);
                if (!node) return null;
                return (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl">
                        {node.id === 'supervisor' ? '🧠' : node.id === 'researcher' ? '🔍' : node.id === 'datafetcher' ? '📊' : node.id === 'validator' ? '🛡️' : '💬'}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#111]">{node.name}</h3>
                        <span className={`text-[10px] font-medium ${node.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}>
                          {node.status === 'active' ? '● Active' : '○ Idle'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-xs text-[#6B7280]">Load</span>
                        <span className="text-xs font-medium text-[#111]">{node.load}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2F5CFF] rounded-full transition-all"
                          style={{ width: `${node.load}%` }}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-[#6B7280]">Connections</span>
                        <span className="text-xs font-medium text-[#111]">
                          {edges.filter(e => e.from === node.id || e.to === node.id).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-[#6B7280]">Avg Latency</span>
                        <span className="text-xs font-medium text-[#111]">1.2s</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Legend */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-[#111] mb-3">Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-[#6B7280]">Active agent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-xs text-[#6B7280]">Idle agent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-[#2F5CFF]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #2F5CFF 0, #2F5CFF 4px, transparent 4px, transparent 8px)' }} />
                <span className="text-xs text-[#6B7280]">Active message flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-gray-200" />
                <span className="text-xs text-[#6B7280]">Inactive connection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
