interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export default function ProgressRing({ percentage, size = 48, strokeWidth = 4 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  // Color based on percentage
  const getColor = () => {
    if (percentage >= 99) return { stroke: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' };
    if (percentage >= 95) return { stroke: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' };
    return { stroke: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' };
  };

  const colors = getColor();

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.bg}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold" style={{ color: colors.stroke }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
}
