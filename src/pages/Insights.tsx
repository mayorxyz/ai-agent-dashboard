import { useTheme } from '../contexts/ThemeContext';

export default function Insights() {
  const { isDark } = useTheme();

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Insights</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Analytics and performance insights</p>
      </div>
      <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
        <p className={isDark ? 'text-gray-400' : 'text-[#6B7280]'}>Insights dashboard will appear here</p>
      </div>
    </div>
  );
}
