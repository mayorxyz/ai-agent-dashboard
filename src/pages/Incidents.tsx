import { useState } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock,
  User,
  ChevronRight,
  MessageSquare,
  Zap,
  Shield,
  Search,
  Brain,
  Database,
} from 'lucide-react';
import { EmptyState } from '../components/EmptyState';

const incidents = [
  {
    id: 'INC-001',
    title: 'DataFetcher timeout on large payload',
    severity: 'critical',
    agent: 'DataFetcher',
    agentIcon: Database,
    status: 'investigating',
    assignee: 'Sarah K.',
    assigneeColor: 'bg-violet-400',
    timestamp: '10:39 AM',
    duration: '12 min',
    events: [
      { time: '10:39 AM', type: 'detected', message: 'Error rate exceeded threshold (>5%)', icon: AlertTriangle },
      { time: '10:40 AM', type: 'assigned', message: 'Auto-assigned to Sarah K.', icon: User },
      { time: '10:42 AM', type: 'investigation', message: 'Root cause: timeout on payload >10MB', icon: Search },
      { time: '10:48 AM', type: 'update', message: 'Implementing chunked processing', icon: Zap },
    ],
  },
  {
    id: 'INC-002',
    title: 'Validator schema mismatch on v2 responses',
    severity: 'high',
    agent: 'Validator',
    agentIcon: Shield,
    status: 'open',
    assignee: 'Mike R.',
    assigneeColor: 'bg-blue-400',
    timestamp: '10:22 AM',
    duration: '29 min',
    events: [
      { time: '10:22 AM', type: 'detected', message: 'Validation failures spiked to 15%', icon: AlertCircle },
      { time: '10:25 AM', type: 'assigned', message: 'Assigned to Mike R.', icon: User },
      { time: '10:30 AM', type: 'investigation', message: 'Schema v2 not yet deployed to Validator', icon: Search },
    ],
  },
  {
    id: 'INC-003',
    title: 'Researcher rate limit exceeded',
    severity: 'medium',
    agent: 'Researcher',
    agentIcon: Search,
    status: 'resolved',
    assignee: 'Alex T.',
    assigneeColor: 'bg-green-400',
    timestamp: '09:15 AM',
    duration: '45 min',
    events: [
      { time: '09:15 AM', type: 'detected', message: 'Rate limit warnings from external API', icon: AlertTriangle },
      { time: '09:18 AM', type: 'assigned', message: 'Assigned to Alex T.', icon: User },
      { time: '09:30 AM', type: 'fix', message: 'Implemented request throttling', icon: Zap },
      { time: '10:00 AM', type: 'resolved', message: 'Rate limits back to normal', icon: CheckCircle2 },
    ],
  },
  {
    id: 'INC-004',
    title: 'Supervisor routing loop detected',
    severity: 'high',
    agent: 'Supervisor',
    agentIcon: Brain,
    status: 'resolved',
    assignee: 'Sarah K.',
    assigneeColor: 'bg-violet-400',
    timestamp: '08:45 AM',
    duration: '1h 15m',
    events: [
      { time: '08:45 AM', type: 'detected', message: 'Circular routing pattern detected', icon: AlertCircle },
      { time: '08:48 AM', type: 'assigned', message: 'Auto-assigned to Sarah K.', icon: User },
      { time: '09:00 AM', type: 'fix', message: 'Added loop detection guard', icon: Zap },
      { time: '10:00 AM', type: 'resolved', message: 'No more routing loops', icon: CheckCircle2 },
    ],
  },
  {
    id: 'INC-005',
    title: 'Responder output formatting errors',
    severity: 'low',
    agent: 'Responder',
    agentIcon: MessageSquare,
    status: 'open',
    assignee: 'Unassigned',
    assigneeColor: 'bg-gray-300',
    timestamp: '10:45 AM',
    duration: '6 min',
    events: [
      { time: '10:45 AM', type: 'detected', message: 'Markdown formatting errors in 3% of responses', icon: AlertTriangle },
    ],
  },
];

const severityColors: Record<string, { bar: string; bg: string; text: string }> = {
  critical: { bar: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700' },
  high: { bar: 'bg-orange-500', bg: 'bg-orange-50', text: 'text-orange-700' },
  medium: { bar: 'bg-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
  low: { bar: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' },
};

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  open: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  investigating: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  resolved: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
};

export default function Incidents() {
  const [selectedIncident, setSelectedIncident] = useState<typeof incidents[0] | null>(null);

  if (selectedIncident) {
    const sevColors = severityColors[selectedIncident.severity];
    const statColors = statusConfig[selectedIncident.status];
    const AgentIcon = selectedIncident.agentIcon;

    return (
      <div className="space-y-6 w-full">
        <button
          onClick={() => setSelectedIncident(null)}
          className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111] active:scale-95 transition-all"
        >
          <ChevronRight size={14} className="rotate-180" />
          Back to incidents
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Severity bar */}
          <div className={`h-1.5 ${sevColors.bar}`} />
          
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${sevColors.bg} ${sevColors.text}`}>
                    {selectedIncident.severity.toUpperCase()}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statColors.bg} ${statColors.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statColors.dot}`} />
                    {selectedIncident.status.charAt(0).toUpperCase() + selectedIncident.status.slice(1)}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-[#111]">{selectedIncident.title}</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-[#6B7280]">
                  <span className="flex items-center gap-1.5">
                    <AgentIcon size={14} />
                    {selectedIncident.agent}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {selectedIncident.timestamp}
                  </span>
                  <span>{selectedIncident.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full ${selectedIncident.assigneeColor} flex items-center justify-center text-white text-xs font-semibold`}>
                  {selectedIncident.assignee.charAt(0)}
                </div>
                <span className="text-sm text-[#6B7280]">{selectedIncident.assignee}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-base font-semibold text-[#111] mb-4">Incident Timeline</h2>
              <div className="relative pl-8">
                <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />
                <div className="space-y-6">
                  {selectedIncident.events.map((event, i) => {
                    const EventIcon = event.icon;
                    return (
                      <div key={i} className="relative flex items-start gap-4">
                        <div className="absolute -left-5 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                          <EventIcon size={12} className="text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-[#111]">{event.time}</span>
                            <span className="text-[10px] text-[#9CA3AF] bg-gray-50 px-2 py-0.5 rounded-full">
                              {event.type}
                            </span>
                          </div>
                          <p className="text-sm text-[#6B7280] mt-1">{event.message}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111]">Incidents</h1>
          <p className="text-sm text-[#6B7280] mt-1">Track and resolve issues in your agent system</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            2 Open
          </span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-0">
          <p className="text-2xl font-bold text-red-600">2</p>
          <p className="text-xs text-[#6B7280]">Open</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-0">
          <p className="text-2xl font-bold text-amber-600">1</p>
          <p className="text-xs text-[#6B7280]">Investigating</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-0">
          <p className="text-2xl font-bold text-green-600">2</p>
          <p className="text-xs text-[#6B7280]">Resolved today</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-0">
          <p className="text-2xl font-bold text-[#111]">18m</p>
          <p className="text-xs text-[#6B7280]">Avg resolution</p>
        </div>
      </div>

      {/* Incident list */}
      {incidents.length === 0 ? (
        <EmptyState
          type="incidents"
          title="All clear!"
          description="No incidents detected. Your agent system is running smoothly."
        />
      ) : (
      <div className="space-y-3 w-full">
        {incidents.map((incident) => {
          const sevColors = severityColors[incident.severity];
          const statColors = statusConfig[incident.status];
          const AgentIcon = incident.agentIcon;
          return (
            <div
              key={incident.id}
              onClick={() => setSelectedIncident(incident)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer overflow-hidden flex w-full"
            >
              {/* Severity bar */}
              <div className={`w-1.5 flex-shrink-0 ${sevColors.bar}`} />
              
              <div className="flex-1 p-5 flex items-center gap-4 min-w-0">
                <div className={`w-10 h-10 rounded-xl ${sevColors.bg} flex items-center justify-center flex-shrink-0`}>
                  <AgentIcon size={18} className={sevColors.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm font-semibold text-[#111] truncate">{incident.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${sevColors.bg} ${sevColors.text} flex-shrink-0 whitespace-nowrap`}>
                      {incident.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280] flex-wrap">
                    <span className="whitespace-nowrap">{incident.agent}</span>
                    <span>·</span>
                    <span className="whitespace-nowrap">{incident.timestamp}</span>
                    <span>·</span>
                    <span className="whitespace-nowrap">{incident.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statColors.bg} ${statColors.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statColors.dot} flex-shrink-0`} />
                    <span className="hidden sm:inline">{incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}</span>
                    <span className="sm:hidden">{incident.status.charAt(0).toUpperCase()}</span>
                  </span>
                  <div className={`w-7 h-7 rounded-full ${incident.assigneeColor} flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0`}>
                    {incident.assignee.charAt(0)}
                  </div>
                  <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}
