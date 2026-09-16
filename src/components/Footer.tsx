import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const links = [
    { label: 'Status', path: '/status' },
    { label: 'Help', path: '/help' },
    { label: 'Integrations', path: '/integrations' },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <footer className={`w-full border-t transition-colors duration-300 ${
      isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
    }`}>
      <div className="px-6 py-4 md:px-6 md:py-4">
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
              OrchestrateIQ
            </span>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2024
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              isDark ? 'bg-[#1F1F23] text-gray-400' : 'bg-gray-100 text-gray-500'
            }`}>
              v1.0.0
            </span>
          </div>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-sm transition-colors duration-200 ${
                  isDark ? 'text-gray-400 hover:text-[#2F5CFF]' : 'text-gray-600 hover:text-[#2F5CFF]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {isDark ? 'Dark mode' : 'Light mode'}
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
              OrchestrateIQ
            </span>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2024
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              isDark ? 'bg-[#1F1F23] text-gray-400' : 'bg-gray-100 text-gray-500'
            }`}>
              v1.0.0
            </span>
          </div>

          <div className="flex items-center gap-4">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-sm transition-colors duration-200 ${
                  isDark ? 'text-gray-400 hover:text-[#2F5CFF]' : 'text-gray-600 hover:text-[#2F5CFF]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {isDark ? 'Dark mode' : 'Light mode'}
          </div>
        </div>
      </div>
    </footer>
  );
}
