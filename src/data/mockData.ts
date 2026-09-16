// Mock data for OrchestrateIQ dashboard
// Structured for easy replacement with real API data later

// Agent data
export const agents = [
  { name: 'Researcher', role: 'Search & Research', icon: 'Search', color: 'green', calls: 142 },
  { name: 'Supervisor', role: 'Routing & Delegation', icon: 'Brain', color: 'purple', calls: 89 },
  { name: 'DataFetcher', role: 'Data Pipeline', icon: 'Database', color: 'blue', calls: 234 },
  { name: 'Validator', role: 'Output Validation', icon: 'ShieldCheck', color: 'amber', calls: 178 },
  { name: 'Responder', role: 'Response Generation', icon: 'MessageSquare', color: 'coral', calls: 95 },
];

// Sparkline data - call volume over last hour (12 data points = 5-min intervals)
export const sparklineData = {
  Researcher: [12, 15, 18, 14, 20, 22, 19, 25, 28, 24, 30, 32],
  Supervisor: [8, 10, 12, 9, 11, 13, 10, 14, 16, 12, 18, 15],
  DataFetcher: [20, 25, 28, 22, 30, 35, 32, 38, 42, 40, 45, 48],
  Validator: [15, 18, 20, 16, 22, 25, 23, 28, 30, 27, 32, 35],
  Responder: [10, 12, 14, 11, 15, 18, 16, 20, 22, 19, 24, 26],
};

// Cost data
export const costData = {
  totalSpend: 2847.50,
  dailyAverage: 94.92,
  projectedMonthly: 2847.50,
  budget: 3000,
  alertThreshold: 80,
  byAgent: [
    { agent: 'Researcher', calls: 142, costPerCall: 0.12, totalCost: 17.04 },
    { agent: 'Supervisor', calls: 89, costPerCall: 0.08, totalCost: 7.12 },
    { agent: 'DataFetcher', calls: 234, costPerCall: 0.18, totalCost: 42.12 },
    { agent: 'Validator', calls: 178, costPerCall: 0.10, totalCost: 17.80 },
    { agent: 'Responder', calls: 95, costPerCall: 0.15, totalCost: 14.25 },
  ],
  // Last 14 days of cost per agent
  dailyCosts: [
    { date: '2024-01-15', Researcher: 15.2, Supervisor: 8.5, DataFetcher: 38.4, Validator: 16.2, Responder: 12.8 },
    { date: '2024-01-16', Researcher: 14.8, Supervisor: 9.2, DataFetcher: 40.1, Validator: 15.8, Responder: 13.5 },
    { date: '2024-01-17', Researcher: 16.5, Supervisor: 8.8, DataFetcher: 42.3, Validator: 17.1, Responder: 14.2 },
    { date: '2024-01-18', Researcher: 15.9, Supervisor: 9.5, DataFetcher: 39.8, Validator: 16.5, Responder: 13.8 },
    { date: '2024-01-19', Researcher: 17.2, Supervisor: 10.1, DataFetcher: 44.2, Validator: 18.3, Responder: 15.1 },
    { date: '2024-01-20', Researcher: 16.8, Supervisor: 9.8, DataFetcher: 41.5, Validator: 17.6, Responder: 14.6 },
    { date: '2024-01-21', Researcher: 18.1, Supervisor: 10.5, DataFetcher: 45.8, Validator: 19.2, Responder: 15.9 },
    { date: '2024-01-22', Researcher: 17.5, Supervisor: 10.2, DataFetcher: 43.2, Validator: 18.5, Responder: 15.3 },
    { date: '2024-01-23', Researcher: 19.3, Supervisor: 11.1, DataFetcher: 47.6, Validator: 20.1, Responder: 16.7 },
    { date: '2024-01-24', Researcher: 18.7, Supervisor: 10.8, DataFetcher: 45.9, Validator: 19.5, Responder: 16.1 },
    { date: '2024-01-25', Researcher: 20.1, Supervisor: 11.6, DataFetcher: 49.2, Validator: 21.0, Responder: 17.4 },
    { date: '2024-01-26', Researcher: 19.5, Supervisor: 11.3, DataFetcher: 47.5, Validator: 20.3, Responder: 16.8 },
    { date: '2024-01-27', Researcher: 21.2, Supervisor: 12.2, DataFetcher: 51.8, Validator: 22.1, Responder: 18.3 },
    { date: '2024-01-28', Researcher: 20.6, Supervisor: 11.9, DataFetcher: 50.1, Validator: 21.5, Responder: 17.7 },
  ],
};

// Insights data
export const insightsData = {
  avgLatency: 1.52,
  errorRate: 0.9,
  totalCost: 2847.50,
  uptime: 99.7,
  // Latency over time per agent (last 24 hours)
  latencyOverTime: [
    { time: '00:00', Researcher: 1.2, Supervisor: 0.8, DataFetcher: 1.8, Validator: 1.0, Responder: 1.4 },
    { time: '02:00', Researcher: 1.3, Supervisor: 0.9, DataFetcher: 1.9, Validator: 1.1, Responder: 1.5 },
    { time: '04:00', Researcher: 1.1, Supervisor: 0.7, DataFetcher: 1.7, Validator: 0.9, Responder: 1.3 },
    { time: '06:00', Researcher: 1.4, Supervisor: 1.0, DataFetcher: 2.1, Validator: 1.2, Responder: 1.6 },
    { time: '08:00', Researcher: 1.6, Supervisor: 1.2, DataFetcher: 2.4, Validator: 1.4, Responder: 1.8 },
    { time: '10:00', Researcher: 1.8, Supervisor: 1.4, DataFetcher: 2.8, Validator: 1.6, Responder: 2.0 },
    { time: '12:00', Researcher: 1.7, Supervisor: 1.3, DataFetcher: 2.6, Validator: 1.5, Responder: 1.9 },
    { time: '14:00', Researcher: 1.5, Supervisor: 1.1, DataFetcher: 2.3, Validator: 1.3, Responder: 1.7 },
    { time: '16:00', Researcher: 1.9, Supervisor: 1.5, DataFetcher: 2.9, Validator: 1.7, Responder: 2.1 },
    { time: '18:00', Researcher: 2.1, Supervisor: 1.7, DataFetcher: 3.2, Validator: 1.9, Responder: 2.3 },
    { time: '20:00', Researcher: 1.8, Supervisor: 1.4, DataFetcher: 2.7, Validator: 1.6, Responder: 2.0 },
    { time: '22:00', Researcher: 1.4, Supervisor: 1.0, DataFetcher: 2.2, Validator: 1.2, Responder: 1.6 },
  ],
  // Error distribution by agent
  errorDistribution: [
    { agent: 'Researcher', errors: 12, percentage: 8.5 },
    { agent: 'Supervisor', errors: 5, percentage: 5.6 },
    { agent: 'DataFetcher', errors: 45, percentage: 19.2 },
    { agent: 'Validator', errors: 28, percentage: 15.7 },
    { agent: 'Responder', errors: 18, percentage: 10.5 },
  ],
  // Heatmap: hour of day vs agent call volume
  heatmapData: [
    { hour: '00:00', Researcher: 45, Supervisor: 28, DataFetcher: 67, Validator: 52, Responder: 38 },
    { hour: '02:00', Researcher: 38, Supervisor: 22, DataFetcher: 58, Validator: 45, Responder: 32 },
    { hour: '04:00', Researcher: 52, Supervisor: 35, DataFetcher: 78, Validator: 61, Responder: 48 },
    { hour: '06:00', Researcher: 78, Supervisor: 56, DataFetcher: 112, Validator: 89, Responder: 72 },
    { hour: '08:00', Researcher: 125, Supervisor: 89, DataFetcher: 178, Validator: 142, Responder: 115 },
    { hour: '10:00', Researcher: 156, Supervisor: 112, DataFetcher: 223, Validator: 178, Responder: 145 },
    { hour: '12:00', Researcher: 142, Supervisor: 98, DataFetcher: 198, Validator: 162, Responder: 132 },
    { hour: '14:00', Researcher: 134, Supervisor: 92, DataFetcher: 187, Validator: 151, Responder: 124 },
    { hour: '16:00', Researcher: 167, Supervisor: 121, DataFetcher: 234, Validator: 189, Responder: 156 },
    { hour: '18:00', Researcher: 189, Supervisor: 138, DataFetcher: 267, Validator: 212, Responder: 178 },
    { hour: '20:00', Researcher: 145, Supervisor: 102, DataFetcher: 201, Validator: 165, Responder: 138 },
    { hour: '22:00', Researcher: 98, Supervisor: 67, DataFetcher: 142, Validator: 112, Responder: 89 },
  ],
  // AI-flagged anomalies
  anomalies: [
    {
      id: 1,
      severity: 'high',
      description: 'DataFetcher latency spike detected - 3x normal at 10:00',
      timestamp: '2 hours ago',
      traceId: 'tr_7d4e5f6a',
    },
    {
      id: 2,
      severity: 'medium',
      description: 'Unusual error rate increase in Validator - 2.1% vs 0.9% avg',
      timestamp: '45 min ago',
      traceId: 'tr_9c3b2d4e',
    },
    {
      id: 3,
      severity: 'low',
      description: 'Researcher call volume 40% above daily average',
      timestamp: '1 hour ago',
      traceId: 'tr_6a1b7c8d',
    },
    {
      id: 4,
      severity: 'high',
      description: 'Supervisor routing loop detected - circular handoff pattern',
      timestamp: '3 hours ago',
      traceId: 'tr_8f2a1b3c',
    },
  ],
};

// Anomaly feed data for Overview page
export const anomalyFeed = [
  {
    id: 1,
    type: 'latency_spike',
    description: 'DataFetcher latency spike',
    timestamp: '2 hours ago',
    severity: 'high',
  },
  {
    id: 2,
    type: 'error_rate',
    description: 'Unusual error rate in Validator',
    timestamp: '45 min ago',
    severity: 'medium',
  },
  {
    id: 3,
    type: 'volume_anomaly',
    description: 'Researcher call volume 40% above avg',
    timestamp: '1 hour ago',
    severity: 'low',
  },
  {
    id: 4,
    type: 'routing_issue',
    description: 'Supervisor routing loop detected',
    timestamp: '3 hours ago',
    severity: 'high',
  },
];

// Agent comparison data
export const agentComparisonData = {
  Researcher: {
    latency: 1.8,
    cost: 17.04,
    errorRate: 0.8,
    callVolume: 142,
  },
  Supervisor: {
    latency: 1.4,
    cost: 7.12,
    errorRate: 0.5,
    callVolume: 89,
  },
  DataFetcher: {
    latency: 2.8,
    cost: 42.12,
    errorRate: 1.9,
    callVolume: 234,
  },
  Validator: {
    latency: 1.6,
    cost: 17.80,
    errorRate: 1.6,
    callVolume: 178,
  },
  Responder: {
    latency: 2.0,
    cost: 14.25,
    errorRate: 1.1,
    callVolume: 95,
  },
};
