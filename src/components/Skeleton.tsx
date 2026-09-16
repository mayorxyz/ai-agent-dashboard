import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'circle' | 'chart';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '',
  variant = 'text'
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded';
  
  const variantClasses = {
    card: 'h-32 w-full',
    text: 'h-4 w-full',
    circle: 'h-12 w-12 rounded-full',
    chart: 'h-48 w-full',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
};

// Pre-built skeleton layouts for different pages
export const OverviewSkeleton: React.FC = () => (
  <div className="space-y-6 w-full">
    {/* Hero skeleton */}
    <Skeleton variant="card" className="h-40" />
    
    {/* Agents + Timeline skeleton */}
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full">
      <div className="xl:col-span-3">
        <Skeleton variant="card" className="h-64" />
      </div>
      <div className="xl:col-span-9">
        <Skeleton variant="card" className="h-64" />
      </div>
    </div>
    
    {/* Footer section skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      <div className="lg:col-span-4">
        <Skeleton variant="card" className="h-48" />
      </div>
      <div className="lg:col-span-4">
        <Skeleton variant="card" className="h-48" />
      </div>
      <div className="lg:col-span-4">
        <Skeleton variant="card" className="h-48" />
      </div>
    </div>
  </div>
);

export const WorkflowsSkeleton: React.FC = () => (
  <div className="space-y-6 w-full">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-10 w-32 rounded-full" />
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      <Skeleton variant="card" className="h-40" />
      <Skeleton variant="card" className="h-40" />
      <Skeleton variant="card" className="h-40" />
      <Skeleton variant="card" className="h-40" />
    </div>
  </div>
);

export const InsightsSkeleton: React.FC = () => (
  <div className="space-y-6 w-full">
    <div className="space-y-2">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-96" />
    </div>
    
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <Skeleton variant="card" className="h-24" />
      <Skeleton variant="card" className="h-24" />
      <Skeleton variant="card" className="h-24" />
      <Skeleton variant="card" className="h-24" />
    </div>
    
    <Skeleton variant="chart" className="h-80" />
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <Skeleton variant="chart" className="h-64" />
      <Skeleton variant="chart" className="h-64" />
    </div>
  </div>
);

export const TracesSkeleton: React.FC = () => (
  <div className="space-y-6 w-full">
    <div className="space-y-2">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-4 w-64" />
    </div>
    
    <div className="flex gap-2">
      <Skeleton className="h-8 w-20 rounded-full" />
      <Skeleton className="h-8 w-20 rounded-full" />
      <Skeleton className="h-8 w-20 rounded-full" />
    </div>
    
    <Skeleton variant="card" className="h-96" />
  </div>
);

export const IncidentsSkeleton: React.FC = () => (
  <div className="space-y-6 w-full">
    <div className="space-y-2">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-4 w-72" />
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <Skeleton variant="card" className="h-24" />
      <Skeleton variant="card" className="h-24" />
      <Skeleton variant="card" className="h-24" />
      <Skeleton variant="card" className="h-24" />
    </div>
    
    <div className="space-y-3">
      <Skeleton variant="card" className="h-24" />
      <Skeleton variant="card" className="h-24" />
      <Skeleton variant="card" className="h-24" />
    </div>
  </div>
);
