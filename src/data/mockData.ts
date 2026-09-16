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

// SLA uptime data for progress rings
export const slaData = {
  Researcher: { uptime: 99.2, status: 'operational' as const },
  Supervisor: { uptime: 99.8, status: 'operational' as const },
  DataFetcher: { uptime: 94.5, status: 'degraded' as const },
  Validator: { uptime: 97.3, status: 'operational' as const },
  Responder: { uptime: 98.9, status: 'operational' as const },
};

// 90-day uptime history for status page
export const uptimeHistory = {
  Researcher: Array.from({ length: 90 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    status: Math.random() > 0.02 ? 'operational' : Math.random() > 0.5 ? 'degraded' : 'outage',
  })),
  Supervisor: Array.from({ length: 90 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    status: Math.random() > 0.01 ? 'operational' : Math.random() > 0.5 ? 'degraded' : 'outage',
  })),
  DataFetcher: Array.from({ length: 90 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    status: Math.random() > 0.05 ? 'operational' : Math.random() > 0.5 ? 'degraded' : 'outage',
  })),
  Validator: Array.from({ length: 90 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    status: Math.random() > 0.03 ? 'operational' : Math.random() > 0.5 ? 'degraded' : 'outage',
  })),
  Responder: Array.from({ length: 90 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    status: Math.random() > 0.02 ? 'operational' : Math.random() > 0.5 ? 'degraded' : 'outage',
  })),
};

// Version history for agents
export const versionHistory = {
  Researcher: [
    {
      version: 'v3',
      timestamp: '2024-01-28T10:30:00Z',
      author: 'Sarah K.',
      authorAvatar: 'SK',
      summary: 'Improved search accuracy with better context handling',
      config: 'model: gpt-4-turbo\ntemperature: 0.3\nmax_tokens: 2000\nsearch_depth: deep\ncontext_window: 8k',
      perfDelta: { latency: -12, errorRate: -8 },
    },
    {
      version: 'v2',
      timestamp: '2024-01-20T14:15:00Z',
      author: 'Mike R.',
      authorAvatar: 'MR',
      summary: 'Added multi-source search capability',
      config: 'model: gpt-4-turbo\ntemperature: 0.4\nmax_tokens: 1500\nsearch_depth: medium\ncontext_window: 4k',
      perfDelta: { latency: 5, errorRate: -3 },
    },
    {
      version: 'v1',
      timestamp: '2024-01-10T09:00:00Z',
      author: 'Alex T.',
      authorAvatar: 'AT',
      summary: 'Initial deployment with basic search',
      config: 'model: gpt-3.5-turbo\ntemperature: 0.5\nmax_tokens: 1000\nsearch_depth: basic\ncontext_window: 4k',
      perfDelta: { latency: 0, errorRate: 0 },
    },
  ],
  Supervisor: [
    {
      version: 'v2',
      timestamp: '2024-01-25T11:00:00Z',
      author: 'Sarah K.',
      authorAvatar: 'SK',
      summary: 'Enhanced routing logic with priority queues',
      config: 'model: gpt-4-turbo\ntemperature: 0.2\nmax_tokens: 1000\nrouting_strategy: priority\nload_balancing: true',
      perfDelta: { latency: -8, errorRate: -15 },
    },
    {
      version: 'v1',
      timestamp: '2024-01-10T09:00:00Z',
      author: 'Alex T.',
      authorAvatar: 'AT',
      summary: 'Initial routing implementation',
      config: 'model: gpt-3.5-turbo\ntemperature: 0.3\nmax_tokens: 800\nrouting_strategy: round_robin\nload_balancing: false',
      perfDelta: { latency: 0, errorRate: 0 },
    },
  ],
  DataFetcher: [
    {
      version: 'v3',
      timestamp: '2024-01-27T16:45:00Z',
      author: 'Mike R.',
      authorAvatar: 'MR',
      summary: 'Implemented chunked processing for large payloads',
      config: 'model: gpt-4-turbo\ntemperature: 0.1\nmax_tokens: 4000\nchunk_size: 10MB\nretry_policy: exponential',
      perfDelta: { latency: 15, errorRate: -25 },
    },
    {
      version: 'v2',
      timestamp: '2024-01-18T13:20:00Z',
      author: 'Sarah K.',
      authorAvatar: 'SK',
      summary: 'Added caching layer for repeated queries',
      config: 'model: gpt-4-turbo\ntemperature: 0.1\nmax_tokens: 3000\ncache_ttl: 300\nretry_policy: linear',
      perfDelta: { latency: -20, errorRate: -5 },
    },
    {
      version: 'v1',
      timestamp: '2024-01-10T09:00:00Z',
      author: 'Alex T.',
      authorAvatar: 'AT',
      summary: 'Initial data fetching implementation',
      config: 'model: gpt-3.5-turbo\ntemperature: 0.2\nmax_tokens: 2000\ncache_ttl: 0\nretry_policy: none',
      perfDelta: { latency: 0, errorRate: 0 },
    },
  ],
  Validator: [
    {
      version: 'v2',
      timestamp: '2024-01-26T10:00:00Z',
      author: 'Mike R.',
      authorAvatar: 'MR',
      summary: 'Added schema v2 validation support',
      config: 'model: gpt-4-turbo\ntemperature: 0.0\nmax_tokens: 1500\nschema_version: v2\nstrict_mode: true',
      perfDelta: { latency: 3, errorRate: -18 },
    },
    {
      version: 'v1',
      timestamp: '2024-01-10T09:00:00Z',
      author: 'Alex T.',
      authorAvatar: 'AT',
      summary: 'Initial validation with schema v1',
      config: 'model: gpt-3.5-turbo\ntemperature: 0.0\nmax_tokens: 1000\nschema_version: v1\nstrict_mode: false',
      perfDelta: { latency: 0, errorRate: 0 },
    },
  ],
  Responder: [
    {
      version: 'v2',
      timestamp: '2024-01-24T15:30:00Z',
      author: 'Sarah K.',
      authorAvatar: 'SK',
      summary: 'Improved response formatting and markdown support',
      config: 'model: gpt-4-turbo\ntemperature: 0.6\nmax_tokens: 2500\nformat: markdown\ntone: professional',
      perfDelta: { latency: 8, errorRate: -10 },
    },
    {
      version: 'v1',
      timestamp: '2024-01-10T09:00:00Z',
      author: 'Alex T.',
      authorAvatar: 'AT',
      summary: 'Initial response generation',
      config: 'model: gpt-3.5-turbo\ntemperature: 0.7\nmax_tokens: 1500\nformat: plain\ntone: neutral',
      perfDelta: { latency: 0, errorRate: 0 },
    },
  ],
};

// Sankey diagram data for handoff flows
export const sankeyData = {
  nodes: [
    { name: 'Supervisor' },
    { name: 'Researcher' },
    { name: 'DataFetcher' },
    { name: 'Validator' },
    { name: 'Responder' },
  ],
  links: [
    { source: 0, target: 1, value: 89 },
    { source: 0, target: 2, value: 145 },
    { source: 1, target: 3, value: 67 },
    { source: 1, target: 4, value: 22 },
    { source: 2, target: 3, value: 178 },
    { source: 2, target: 4, value: 56 },
    { source: 3, target: 4, value: 178 },
  ],
};

// Sandbox execution data
export const sandboxExecutions = {
  Researcher: {
    input: 'What are the latest trends in AI agent orchestration?',
    output: `Based on my analysis of recent developments in AI agent orchestration, here are the key trends:

1. **Multi-Agent Collaboration**: Systems are moving from single-agent to multi-agent architectures where specialized agents work together.

2. **Dynamic Routing**: Intelligent routing mechanisms that select the best agent for each task based on context and capabilities.

3. **Observability & Monitoring**: Increased focus on tracing, metrics, and debugging tools for complex agent workflows.

4. **Cost Optimization**: Techniques to reduce API costs through caching, model selection, and efficient prompt engineering.

5. **Error Handling & Recovery**: Robust fallback mechanisms and retry strategies for production reliability.`,
    trace: [
      { step: 1, type: 'tool_call', tool: 'web_search', input: 'AI agent orchestration trends 2024', duration: '0.8s' },
      { step: 2, type: 'reasoning', input: 'Analyzing search results for key patterns', duration: '1.2s' },
      { step: 3, type: 'tool_call', tool: 'web_search', input: 'multi-agent systems best practices', duration: '0.6s' },
      { step: 4, type: 'reasoning', input: 'Synthesizing findings into structured response', duration: '0.9s' },
      { step: 5, type: 'output', input: 'Generating final response with markdown formatting', duration: '0.4s' },
    ],
    latency: 3.9,
    cost: 0.024,
  },
  Supervisor: {
    input: 'Route this customer query about pricing',
    output: 'I\'ll route this to the Researcher agent for pricing information lookup, then validate the response before sending to the customer.',
    trace: [
      { step: 1, type: 'reasoning', input: 'Analyzing query intent: pricing inquiry', duration: '0.3s' },
      { step: 2, type: 'tool_call', tool: 'agent_selector', input: 'Select best agent for pricing query', duration: '0.5s' },
      { step: 3, type: 'output', input: 'Routing decision: Researcher → Validator → Responder', duration: '0.2s' },
    ],
    latency: 1.0,
    cost: 0.008,
  },
  DataFetcher: {
    input: 'Fetch customer data for user_12345',
    output: 'Successfully retrieved customer data: User ID: user_12345, Name: John Doe, Plan: Enterprise, Status: Active, Last Login: 2024-01-28',
    trace: [
      { step: 1, type: 'tool_call', tool: 'database_query', input: 'SELECT * FROM customers WHERE id = user_12345', duration: '0.4s' },
      { step: 2, type: 'reasoning', input: 'Validating data completeness', duration: '0.2s' },
      { step: 3, type: 'output', input: 'Formatting response', duration: '0.1s' },
    ],
    latency: 0.7,
    cost: 0.012,
  },
  Validator: {
    input: 'Validate this response for schema compliance',
    output: 'Validation passed: All required fields present, data types correct, no schema violations detected.',
    trace: [
      { step: 1, type: 'tool_call', tool: 'schema_validator', input: 'Check against schema v2', duration: '0.3s' },
      { step: 2, type: 'reasoning', input: 'Verifying field types and constraints', duration: '0.4s' },
      { step: 3, type: 'output', input: 'Generating validation report', duration: '0.1s' },
    ],
    latency: 0.8,
    cost: 0.006,
  },
  Responder: {
    input: 'Generate response for customer query',
    output: 'Thank you for your inquiry! Based on your Enterprise plan, you have access to all premium features including priority support and advanced analytics. Is there anything specific you\'d like to know about your plan benefits?',
    trace: [
      { step: 1, type: 'reasoning', input: 'Analyzing customer context and query', duration: '0.5s' },
      { step: 2, type: 'tool_call', tool: 'template_selector', input: 'Select appropriate response template', duration: '0.3s' },
      { step: 3, type: 'reasoning', input: 'Personalizing response with customer data', duration: '0.6s' },
      { step: 4, type: 'output', input: 'Generating final response', duration: '0.3s' },
    ],
    latency: 1.7,
    cost: 0.018,
  },
};

// Workspaces
export const workspaces = [
  { id: 1, name: 'Production', icon: '🚀', members: 12 },
  { id: 2, name: 'Staging', icon: '🧪', members: 8 },
  { id: 3, name: 'Development', icon: '💻', members: 15 },
];
