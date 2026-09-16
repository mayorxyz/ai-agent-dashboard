import React from 'react';

interface EmptyStateProps {
  type: 'workflows' | 'incidents' | 'traces' | 'insights';
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const illustrations = {
  workflows: (
    <svg viewBox="0 0 200 160" className="w-full h-40">
      {/* Disconnected nodes */}
      <circle cx="40" cy="40" r="12" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="100" cy="60" r="12" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="160" cy="40" r="12" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="70" cy="110" r="12" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="130" cy="110" r="12" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" />
      
      {/* Dotted connection lines (not connected) */}
      <line x1="52" y1="40" x2="88" y2="60" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="112" y1="60" x2="148" y2="40" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="82" y1="110" x2="118" y2="110" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Question marks */}
      <text x="40" y="45" textAnchor="middle" fill="#8B5CF6" fontSize="16" fontWeight="bold">?</text>
      <text x="100" y="65" textAnchor="middle" fill="#10B981" fontSize="16" fontWeight="bold">?</text>
      <text x="160" y="45" textAnchor="middle" fill="#3B82F6" fontSize="16" fontWeight="bold">?</text>
    </svg>
  ),
  
  incidents: (
    <svg viewBox="0 0 200 160" className="w-full h-40">
      {/* Shield with checkmark */}
      <path d="M100 30 L130 45 L130 85 C130 105 115 120 100 125 C85 120 70 105 70 85 L70 45 Z" 
            fill="#D1FAE5" stroke="#10B981" strokeWidth="3" />
      <path d="M85 85 L95 95 L115 75" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Small decorative elements */}
      <circle cx="40" cy="50" r="4" fill="#10B981" opacity="0.3" />
      <circle cx="160" cy="50" r="4" fill="#10B981" opacity="0.3" />
      <circle cx="50" cy="120" r="3" fill="#10B981" opacity="0.2" />
      <circle cx="150" cy="120" r="3" fill="#10B981" opacity="0.2" />
      
      {/* Sparkles */}
      <path d="M45 80 L47 85 L52 87 L47 89 L45 94 L43 89 L38 87 L43 85 Z" fill="#10B981" opacity="0.4" />
      <path d="M155 80 L157 85 L162 87 L157 89 L155 94 L153 89 L148 87 L153 85 Z" fill="#10B981" opacity="0.4" />
    </svg>
  ),
  
  traces: (
    <svg viewBox="0 0 200 160" className="w-full h-40">
      {/* Timeline with empty slots */}
      <line x1="30" y1="80" x2="170" y2="80" stroke="#E5E7EB" strokeWidth="2" />
      
      {/* Time markers */}
      <circle cx="50" cy="80" r="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <circle cx="90" cy="80" r="6" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" />
      <circle cx="130" cy="80" r="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
      <circle cx="170" cy="80" r="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      
      {/* Empty span bars */}
      <rect x="40" y="50" width="30" height="12" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="80" y="50" width="40" height="12" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="130" y="50" width="25" height="12" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 2" />
      
      <rect x="50" y="100" width="35" height="12" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 2" />
      <rect x="100" y="100" width="45" height="12" rx="2" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 2" />
      
      {/* Clock icon */}
      <circle cx="100" cy="30" r="10" fill="none" stroke="#9CA3AF" strokeWidth="2" />
      <line x1="100" y1="30" x2="100" y2="24" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
      <line x1="100" y1="30" x2="105" y2="30" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  
  insights: (
    <svg viewBox="0 0 200 160" className="w-full h-40">
      {/* Chart axes */}
      <line x1="30" y1="130" x2="170" y2="130" stroke="#E5E7EB" strokeWidth="2" />
      <line x1="30" y1="30" x2="30" y2="130" stroke="#E5E7EB" strokeWidth="2" />
      
      {/* Empty chart area with dotted pattern */}
      <rect x="35" y="35" width="130" height="90" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4" />
      
      {/* Grid lines */}
      <line x1="35" y1="57" x2="165" y2="57" stroke="#F3F4F6" strokeWidth="1" />
      <line x1="35" y1="80" x2="165" y2="80" stroke="#F3F4F6" strokeWidth="1" />
      <line x1="35" y1="102" x2="165" y2="102" stroke="#F3F4F6" strokeWidth="1" />
      
      <line x1="67" y1="35" x2="67" y2="125" stroke="#F3F4F6" strokeWidth="1" />
      <line x1="100" y1="35" x2="100" y2="125" stroke="#F3F4F6" strokeWidth="1" />
      <line x1="132" y1="35" x2="132" y2="125" stroke="#F3F4F6" strokeWidth="1" />
      
      {/* Magnifying glass */}
      <circle cx="100" cy="80" r="20" fill="none" stroke="#9CA3AF" strokeWidth="2" />
      <line x1="114" y1="94" x2="125" y2="105" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
      
      {/* Question mark in magnifying glass */}
      <text x="100" y="87" textAnchor="middle" fill="#9CA3AF" fontSize="20" fontWeight="bold">?</text>
    </svg>
  ),
};

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  type, 
  title, 
  description,
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6 w-full max-w-xs">
        {illustrations[type]}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-[#2F5CFF] text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
