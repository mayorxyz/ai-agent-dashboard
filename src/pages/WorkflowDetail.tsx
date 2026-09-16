import { useTheme } from '../contexts/ThemeContext';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function WorkflowDetail() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="space-y-6 w-full">
      <button onClick={() => navigate('/workflows')} className={`inline-flex items-center gap-2 text-sm ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-[#6B7280] hover:text-[#111]'}`}>
        <ArrowLeft size={14} /> Back to workflows
      </button>
      <div className={`rounded-3xl p-8 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Workflow #{id}</h1>
        <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Workflow details and execution history</p>
      </div>
    </div>
  );
}
