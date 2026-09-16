import { useTheme } from '../contexts/ThemeContext';

export default function Onboarding() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#2F5CFF] flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#111] mb-2">Welcome to OrchestrateIQ</h1>
          <p className="text-[#6B7280]">Let's get your agent system connected</p>
        </div>
        <div className={`rounded-3xl p-8 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <p className={isDark ? 'text-gray-400' : 'text-[#6B7280]'}>Onboarding wizard will appear here</p>
        </div>
      </div>
    </div>
  );
}
