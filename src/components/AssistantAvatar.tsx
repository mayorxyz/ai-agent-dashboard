import React from 'react';

interface AssistantAvatarProps {
  size?: number;
  className?: string;
}

export const AssistantAvatar: React.FC<AssistantAvatarProps> = ({ 
  size = 48,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow ring */}
      <circle cx="24" cy="24" r="22" fill="#EEF2FF" opacity="0.5" />
      
      {/* Main orb */}
      <circle cx="24" cy="24" r="16" fill="#2F5CFF" />
      
      {/* Inner highlight */}
      <circle cx="20" cy="20" r="6" fill="#60A5FA" opacity="0.6" />
      
      {/* Sparkle dots */}
      <circle cx="28" cy="18" r="2" fill="#FFFFFF" opacity="0.8" />
      <circle cx="30" cy="26" r="1.5" fill="#FFFFFF" opacity="0.6" />
      <circle cx="18" cy="28" r="1.5" fill="#FFFFFF" opacity="0.6" />
      
      {/* Central star/sparkle */}
      <path d="M24 20 L25 23 L28 24 L25 25 L24 28 L23 25 L20 24 L23 23 Z" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
};
