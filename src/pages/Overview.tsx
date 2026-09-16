import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Map, Users, GitBranch, ArrowRightLeft, Zap, Send } from 'lucide-react';
import AgentTimeline from '../components/AgentTimeline';

const mockAgents = [
  { name: 'Supervisor', role: 'Routes requests', color: 'purple', icon: 'Brain', calls: 1247 },
  { name: 'Researcher', role: 'Searches data', color: 'green', icon: 'Search', calls: 892 },
  { name: 'DataFetcher', role: 'Fetches data', color: 'blue', icon: 'Database', calls: 1534 },
  { name: 'Validator', role: 'Validates output', color: 'amber', icon: 'ShieldCheck', calls: 1123 },
  { name: 'Responder', role: 'Generates response', color: 'coral', icon: 'MessageSquare', calls: 756 },
];

const colorMap: Record<string, { bg: string; text: string; icon: string; hex: string }> = {
  green: { bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-500', hex: '#10B981' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', icon: 'text-purple-500', hex: '#8B5CF6' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-500', hex: '#3B82F6' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-500', hex: '#F59E0B' },
  coral: { bg: 'bg-red-50', text: 'text-red-700', icon: 'text-red-500', hex: '#EF4444' },
};

const iconMap: Record<string, any> = {
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><circle cx="21" cy="21" r="3"/></svg>,
  Brain: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a7 5 0 0 0-7 5c0 2 1 3 2 4-1 1-2 3-2 5a7 5 0 0 0 7 5 7 5 0 0 0 7-5c0-2-1-3-2-4 1-1 2-3 2-5a7 5 0 0 0-7-5z"/></svg>,
  Database: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5z"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>,
  ShieldCheck: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>,
  MessageSquare: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
};

export default function Overview() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 xl:space-y-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-3xl p-8 lg:p-12 w-full overflow-hidden ${
          isDark ? 'bg-[#111113] border border-[#1F1F23]' : 'bg-white border border-gray-200/50'
        }`}
        style={{ boxShadow: 'var(--shadow-lifted)' }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-10'}`}>
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 30%, rgba(47, 92, 255, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 70%, rgba(47, 92, 255, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 30%, rgba(47, 92, 255, 0.3) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <div className="relative z-10">
          <h1 className={`text-display ${isDark ? 'text-gray-100' : 'text-gray-900'}`} style={{ letterSpacing: '-0.02em' }}>
            We found your system
          </h1>
          <p className={`text-body mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Auto-detected 6 agents across 2 workflows with 412 events in the last hour.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-small font-medium ${
              isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-700'
            }`}>
              <CheckCircle2 size={16} /> Setup complete · 5 of 6
            </span>
            <button
              onClick={() => navigate('/livemap')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Map size={16} /> Live Map
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`xl:col-span-4 rounded-2xl p-6 min-w-0 ${
            isDark ? 'bg-[#111113] border border-[#1F1F23]' : 'bg-white border border-gray-200/50'
          }`}
          style={{ boxShadow: 'var(--shadow-subtle)' }}
        >
          <h2 className={`text-h2 mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Agents</h2>
          <div className="space-y-2">
            {mockAgents.map((agent, i) => {
              const colors = colorMap[agent.color];
              const Icon = iconMap[agent.icon];
              return (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    isDark ? 'hover:bg-[#1F1F23]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${colors.hex}20`,
                      boxShadow: `inset 0 0 0 1px ${colors.hex}33`,
                    }}
                  >
                    <div style={{ color: colors.hex }}><Icon /></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-body font-medium truncate ${isDark ? 'text-gray-100' : 'text-gray-900'}`} style={{ letterSpacing: '-0.01em' }}>
                      {agent.name}
                    </p>
                    <p className={`text-caption truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {agent.role}
                    </p>
                  </div>
                  <span className={`text-caption font-medium px-2 py-1 rounded-full flex-shrink-0 ${
                    isDark ? 'text-gray-400 bg-[#1F1F23]' : 'text-gray-600 bg-gray-100'
                  }`}>
                    {agent.calls}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="xl:col-span-8 min-w-0"
        >
          <AgentTimeline events={[]} agents={mockAgents.map(a => ({ name: a.name, color: colorMap[a.color].hex, icon: iconMap[a.icon] }))} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`lg:col-span-4 rounded-2xl p-6 min-w-0 ${
            isDark ? 'bg-[#111113] border border-[#1F1F23]' : 'bg-white border border-gray-200/50'
          }`}
          style={{ boxShadow: 'var(--shadow-subtle)' }}
        >
          <h2 className={`text-h2 mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Next steps</h2>
          <div className="space-y-3">
            {[
              { title: 'Configure alert thresholds', desc: 'Set latency and error rate thresholds' },
              { title: 'Add handoff rules', desc: 'Define agent routing logic' },
              { title: 'Enable trace sampling', desc: 'Reduce storage costs by 60%' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isDark ? 'border-[#1F1F23] hover:border-[#2F5CFF] hover:bg-[#1F1F23]' : 'border-gray-200/50 hover:border-[#2F5CFF] hover:bg-gray-50'
                }`}
              >
                <h3 className={`text-body font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{step.title}</h3>
                <p className={`text-caption mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`lg:col-span-4 rounded-2xl p-6 min-w-0 ${
            isDark ? 'bg-[#111113] border border-[#1F1F23]' : 'bg-white border border-gray-200/50'
          }`}
          style={{ boxShadow: 'var(--shadow-subtle)' }}
        >
          <h2 className={`text-h2 mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Detected</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Users, value: '6', label: 'agents' },
              { icon: GitBranch, value: '2', label: 'workflows' },
              { icon: ArrowRightLeft, value: '9', label: 'handoffs' },
              { icon: Zap, value: '412', label: 'events' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                  className={`p-4 rounded-xl border min-w-0 ${isDark ? 'border-[#1F1F23]' : 'border-gray-200/50'}`}
                >
                  <Icon size={20} className="text-blue-500 mb-3" />
                  <p className={`text-h2 font-medium truncate ${isDark ? 'text-gray-100' : 'text-gray-900'}`} style={{ letterSpacing: '-0.01em' }}>
                    {stat.value}
                  </p>
                  <p className={`text-caption truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`lg:col-span-4 rounded-2xl p-6 flex flex-col min-w-0 ${
            isDark ? 'bg-[#111113] border border-[#1F1F23]' : 'bg-white border border-gray-200/50'
          }`}
          style={{ boxShadow: 'var(--shadow-subtle)' }}
        >
          <h2 className={`text-h2 mb-6 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>AI Assistant</h2>
          <p className={`text-body flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Ask me anything about your agent system.
          </p>
          <div className={`mt-6 p-3 rounded-xl border ${isDark ? 'border-[#1F1F23] bg-[#1F1F23]' : 'border-gray-200/50 bg-gray-50'}`}>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask a question..."
                className={`flex-1 bg-transparent text-body outline-none ${
                  isDark ? 'text-gray-100 placeholder:text-gray-500' : 'text-gray-900 placeholder:text-gray-400'
                }`}
              />
              <button className={`p-2 rounded-lg transition-colors duration-200 ${isDark ? 'hover:bg-[#27272A]' : 'hover:bg-gray-200'}`}>
                <Send size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
