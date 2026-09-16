import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${isDark ? 'bg-red-900/30' : 'bg-red-50'}`}>
        <AlertTriangle size={40} className={isDark ? 'text-red-400' : 'text-red-500'} />
      </div>
      
      <h1 className={`text-6xl font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>404</h1>
      <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Page not found</h2>
      <p className={`text-base mb-8 max-w-md ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-6 py-3 bg-[#2F5CFF] text-white rounded-full text-sm font-medium hover:bg-blue-600 active:scale-[0.98] transition-all shadow-sm"
      >
        <Home size={16} />
        Back to Overview
      </button>
    </div>
  );
}
