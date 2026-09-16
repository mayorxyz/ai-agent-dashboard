import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Play, Pause } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  color: string;
  icon: any;
  status: 'active' | 'idle';
  load: number;
}

interface Connection {
  from: string;
  to: string;
  value: number;
  label: string;
}

interface Particle {
  id: string;
  from: string;
  to: string;
  progress: number;
  color: string;
}

interface AgentNetworkGraphProps {
  agents: Agent[];
  connections: Connection[];
  selectedNode: string | null;
  onNodeClick: (agentId: string | null) => void;
}

export default function AgentNetworkGraph({
  agents,
  connections,
  selectedNode,
  onNodeClick,
}: AgentNetworkGraphProps) {
  const { isDark } = useTheme();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Precomputed force-directed-feeling layout
  const nodePositions = useMemo(() => {
    const centerX = 400;
    const centerY = 260;
    const positions: Record<string, { x: number; y: number }> = {};

    // Supervisor in center
    positions['supervisor'] = { x: centerX, y: centerY };

    // Calculate connection volumes for orbit radius
    const connectionVolume: Record<string, number> = {};
    agents.forEach(agent => {
      connectionVolume[agent.id] = connections
        .filter(c => c.from === agent.id || c.to === agent.id)
        .reduce((sum, c) => sum + c.value, 0);
    });

    // Sort agents by connection volume (excluding supervisor)
    const sortedAgents = [...agents]
      .filter(a => a.id !== 'supervisor')
      .sort((a, b) => connectionVolume[b.id] - connectionVolume[a.id]);

    // Position agents in orbit
    const radius = 180;
    sortedAgents.forEach((agent, index) => {
      const angle = (index / sortedAgents.length) * 2 * Math.PI - Math.PI / 2;
      positions[agent.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    return positions;
  }, [agents, connections]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Generate particles
  useEffect(() => {
    if (!isPlaying || isLoading) return;

    const interval = setInterval(() => {
      const activeConnections = connections.filter(() => Math.random() > 0.6);
      const newParticles: Particle[] = activeConnections.map((conn, idx) => ({
        id: `particle-${Date.now()}-${idx}`,
        from: conn.from,
        to: conn.to,
        progress: 0,
        color: agents.find(a => a.id === conn.from)?.color || '#2F5CFF',
      }));

      setParticles(prev => [...prev, ...newParticles].slice(-20));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isLoading, connections, agents]);

  // Animate particles
  useEffect(() => {
    if (!isPlaying) return;

    const animationFrame = requestAnimationFrame(function animate() {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, progress: p.progress + 0.015 }))
          .filter(p => p.progress <= 1)
      );
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  // Get connected agents for hover highlighting
  const getConnectedAgents = (agentId: string) => {
    const connected = new Set<string>();
    connections.forEach(conn => {
      if (conn.from === agentId) connected.add(conn.to);
      if (conn.to === agentId) connected.add(conn.from);
    });
    return connected;
  };

  // Check if connection is active
  const isConnectionActive = (from: string, to: string) => {
    return particles.some(p => p.from === from && p.to === to);
  };

  // Get connection weight
  const getConnectionWeight = (value: number) => {
    const maxVolume = Math.max(...connections.map(c => c.value));
    return 1 + (value / maxVolume) * 3;
  };

  const colorMap: Record<string, string> = {
    green: '#10B981',
    purple: '#8B5CF6',
    blue: '#3B82F6',
    amber: '#F59E0B',
    coral: '#EF4444',
  };

  if (isLoading) {
    return (
      <div className={`relative w-full h-[500px] rounded-3xl overflow-hidden ${
        isDark ? 'bg-[#111113]' : 'bg-white'
      }`} style={{ boxShadow: 'var(--shadow-lifted)' }}>
        <svg width="100%" height="100%" viewBox="0 0 800 520">
          {agents.map((agent, idx) => {
            const pos = nodePositions[agent.id] || { x: 400, y: 260 };
            return (
              <motion.circle
                key={agent.id}
                cx={pos.x}
                cy={pos.y}
                r="32"
                fill={isDark ? '#1F1F23' : '#F3F4F6'}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              />
            );
          })}
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-[500px] rounded-3xl overflow-hidden ${
      isDark ? 'bg-[#111113]' : 'bg-white'
    }`} style={{ boxShadow: 'var(--shadow-lifted)' }}>
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.05]'}`}
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${isDark ? '#2F5CFF' : '#2F5CFF'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDark ? 'bg-[#1F1F23] hover:bg-[#27272A] text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
          title={isPlaying ? 'Pause animation' : 'Play animation'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* SVG Graph */}
      <svg width="100%" height="100%" viewBox="0 0 800 520" className="relative z-0">
        {/* Connection lines */}
        {connections.map((conn, idx) => {
          const fromPos = nodePositions[conn.from];
          const toPos = nodePositions[conn.to];
          if (!fromPos || !toPos) return null;

          const isActive = isConnectionActive(conn.from, conn.to);
          const isHighlighted = hoveredNode && (conn.from === hoveredNode || conn.to === hoveredNode);
          const isDimmed = hoveredNode && !isHighlighted;
          const weight = getConnectionWeight(conn.value);

          return (
            <g key={idx}>
              <motion.path
                d={`M ${fromPos.x} ${fromPos.y} L ${toPos.x} ${toPos.y}`}
                stroke={isActive ? colorMap[agents.find(a => a.id === conn.from)?.color || 'blue'] : isDark ? '#3F3F46' : '#E5E7EB'}
                strokeWidth={isActive ? weight + 1 : weight}
                fill="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isDimmed ? 0.1 : isActive ? 0.8 : 0.3 }}
                transition={{ duration: 0.3 }}
              />
              {/* Connection label */}
              <text
                x={(fromPos.x + toPos.x) / 2}
                y={(fromPos.y + toPos.y) / 2 - 10}
                textAnchor="middle"
                className={`text-[9px] ${isDark ? 'fill-gray-500' : 'fill-gray-400'}`}
                opacity={isDimmed ? 0.3 : 1}
              >
                {conn.label}
              </text>
            </g>
          );
        })}

        {/* Particles */}
        <AnimatePresence>
          {particles.map(particle => {
            const fromPos = nodePositions[particle.from];
            const toPos = nodePositions[particle.to];
            if (!fromPos || !toPos) return null;

            const x = fromPos.x + (toPos.x - fromPos.x) * particle.progress;
            const y = fromPos.y + (toPos.y - fromPos.y) * particle.progress;

            return (
              <motion.circle
                key={particle.id}
                cx={x}
                cy={y}
                r="6"
                fill={colorMap[particle.color]}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <animate
                  attributeName="r"
                  values="6;8;6"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </motion.circle>
            );
          })}
        </AnimatePresence>

        {/* Agent nodes */}
        {agents.map((agent, idx) => {
          const pos = nodePositions[agent.id];
          if (!pos) return null;

          const color = colorMap[agent.color];
          const isSelected = selectedNode === agent.id;
          const isHovered = hoveredNode === agent.id;
          const isConnected = hoveredNode && getConnectedAgents(hoveredNode).has(agent.id);
          const isDimmed = hoveredNode && !isHovered && !isConnected;
          const Icon = agent.icon;

          return (
            <motion.g
              key={agent.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isDimmed ? 0.3 : 1,
                scale: 1,
              }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => onNodeClick(isSelected ? null : agent.id)}
              onMouseEnter={() => setHoveredNode(agent.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              {/* Breathing animation */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r="44"
                fill={isDark ? '#1F1F23' : '#FFFFFF'}
                stroke={isSelected ? '#2F5CFF' : isHovered ? color : isDark ? '#3F3F46' : '#E5E7EB'}
                strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 2}
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3 + idx * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Soft inset ring */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="40"
                fill={`${color}20`}
                stroke={`${color}33`}
                strokeWidth="1"
              />

              {/* Icon */}
              <foreignObject x={pos.x - 12} y={pos.y - 12} width="24" height="24">
                <div className="flex items-center justify-center w-full h-full">
                  <Icon size={20} style={{ color }} />
                </div>
              </foreignObject>

              {/* Label */}
              <text
                x={pos.x}
                y={pos.y + 60}
                textAnchor="middle"
                className={`text-xs font-medium ${isDark ? 'fill-gray-300' : 'fill-gray-700'}`}
                style={{ letterSpacing: '-0.01em' }}
              >
                {agent.name}
              </text>

              {/* Status indicator */}
              <circle
                cx={pos.x + 30}
                cy={pos.y - 30}
                r="6"
                fill={agent.status === 'active' ? '#10B981' : '#9CA3AF'}
                stroke={isDark ? '#1F1F23' : '#FFFFFF'}
                strokeWidth="2"
              />

              {/* Glow effect on hover/select */}
              {(isHovered || isSelected) && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="50"
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
