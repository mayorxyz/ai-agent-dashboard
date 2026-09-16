import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Clock, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';

const workflows = [
  { id: 1, name: 'Customer Query Resolution', runs: 1247, successRate: 96.3, lastRun: '2 min ago', status: 'active' },
  { id: 2, name: 'Data Pipeline Validation', runs: 834, successRate: 99.1, lastRun: '5 min ago', status: 'active' },
  { id: 3, name: 'Research & Summarization', runs: 456, successRate: 91.7, lastRun: '12 min ago', status: 'active' },
  { id: 4, name: 'Incident Response Flow', runs: 89, successRate: 87.2, lastRun: '1 hour ago', status: 'warning' },
];

export default function Workflows() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className={`text-h1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Workflows</h1>
          <p className={`text-body mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Monitor and manage your agent workflows</p>
        </div>
        <button className="btn-primary inline-flex items-center gap-2">
          <Plus size={16} /> New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {workflows.map((wf, i) => (
          <motion.div
            key={wf.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/workflows/${wf.id}`)}
            className={`rounded-2xl p-6 border transition-all duration-200 cursor-pointer min-w-0 overflow-hidden ${
              isDark ? 'bg-[#111113] border-[#1F1F23] hover:border-[#2F5CFF]' : 'bg-white border-gray-200/50 hover:border-[#2F5CFF]'
            }`}
            style={{ boxShadow: 'var(--shadow-subtle)' }}
          >
            <div className="flex items-start justify-between mb-4 gap-3">
              <div className="flex-1 min-w-0">
                <h3 className={`text-h3 truncate ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{wf.name}</h3>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1 text-caption whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Clock size={14} /> {wf.lastRun}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-caption whitespace-nowrap ${wf.status === 'active' ? 'text-green-600' : 'text-amber-600'}`}>
                    {wf.status === 'active' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    {wf.status === 'active' ? 'Active' : 'Warning'}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-h2 font-medium whitespace-nowrap ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{wf.successRate}%</p>
                <p className={`text-caption whitespace-nowrap ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>success rate</p>
              </div>
            </div>
            <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-[#1F1F23]' : 'border-gray-200/50'}`}>
              <span className={`text-caption ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{wf.runs.toLocaleString()} runs</span>
              <span className="text-caption text-[#2F5CFF] font-medium flex items-center gap-1">
                View details <ChevronRight size={14} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
