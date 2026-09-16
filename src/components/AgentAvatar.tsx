import React from 'react';

interface AgentAvatarProps {
  agentType: 'researcher' | 'supervisor' | 'validator' | 'responder' | 'data';
  size?: number;
  className?: string;
}

const agentColors = {
  researcher: { primary: '#10B981', secondary: '#D1FAE5' },
  supervisor: { primary: '#8B5CF6', secondary: '#EDE9FE' },
  validator: { primary: '#F59E0B', secondary: '#FEF3C7' },
  responder: { primary: '#EF4444', secondary: '#FEE2E2' },
  data: { primary: '#3B82F6', secondary: '#DBEAFE' },
};

export const AgentAvatar: React.FC<AgentAvatarProps> = ({ 
  agentType, 
  size = 48,
  className = ''
}) => {
  const colors = agentColors[agentType];

  const icons = {
    researcher: (
      // Magnifying glass with document
      <g>
        <rect x="12" y="14" width="16" height="20" rx="2" fill={colors.secondary} />
        <line x1="16" y1="20" x2="24" y2="20" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="24" x2="24" y2="24" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="28" x2="20" y2="28" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="30" cy="30" r="6" fill="none" stroke={colors.primary} strokeWidth="2" />
        <line x1="34.5" y1="34.5" x2="38" y2="38" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" />
      </g>
    ),
    supervisor: (
      // Brain/network nodes
      <g>
        <circle cx="24" cy="20" r="4" fill={colors.primary} />
        <circle cx="16" cy="30" r="3" fill={colors.primary} opacity="0.7" />
        <circle cx="32" cy="30" r="3" fill={colors.primary} opacity="0.7" />
        <circle cx="24" cy="36" r="3" fill={colors.primary} opacity="0.7" />
        <line x1="24" y1="24" x2="16" y2="30" stroke={colors.primary} strokeWidth="1.5" />
        <line x1="24" y1="24" x2="32" y2="30" stroke={colors.primary} strokeWidth="1.5" />
        <line x1="24" y1="24" x2="24" y2="36" stroke={colors.primary} strokeWidth="1.5" />
        <line x1="16" y1="30" x2="24" y2="36" stroke={colors.primary} strokeWidth="1.5" opacity="0.5" />
        <line x1="32" y1="30" x2="24" y2="36" stroke={colors.primary} strokeWidth="1.5" opacity="0.5" />
      </g>
    ),
    validator: (
      // Shield with checkmark
      <g>
        <path d="M24 12 L32 16 L32 26 C32 32 28 36 24 38 C20 36 16 32 16 26 L16 16 Z" 
              fill={colors.secondary} stroke={colors.primary} strokeWidth="2" />
        <path d="M20 26 L23 29 L28 22" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
    responder: (
      // Chat bubble with lines
      <g>
        <path d="M14 16 L34 16 C35.1 16 36 16.9 36 18 L36 30 C36 31.1 35.1 32 34 32 L22 32 L18 36 L18 32 L14 32 C12.9 32 12 31.1 12 30 L12 18 C12 16.9 12.9 16 14 16 Z" 
              fill={colors.secondary} stroke={colors.primary} strokeWidth="2" />
        <line x1="18" y1="22" x2="30" y2="22" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="26" x2="26" y2="26" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
      </g>
    ),
    data: (
      // Database cylinders
      <g>
        <ellipse cx="24" cy="18" rx="10" ry="4" fill={colors.secondary} stroke={colors.primary} strokeWidth="2" />
        <path d="M14 18 L14 30 C14 32.2 18.5 34 24 34 C29.5 34 34 32.2 34 30 L34 18" 
              fill={colors.secondary} stroke={colors.primary} strokeWidth="2" />
        <ellipse cx="24" cy="30" rx="10" ry="4" fill="none" stroke={colors.primary} strokeWidth="2" />
        <line x1="14" y1="24" x2="34" y2="24" stroke={colors.primary} strokeWidth="1.5" opacity="0.3" />
      </g>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[agentType]}
    </svg>
  );
};
