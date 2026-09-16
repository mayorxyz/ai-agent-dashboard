import { useState } from 'react';
import {
  Search,
  Brain,
  Database,
  ShieldCheck,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Filter,
  Download,
} from 'lucide-react';

const colorMap: Record<string, { bg: string; icon: string }> = {
  green: { bg: 'bg-green-50', icon: 'text-green-500' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-500' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-500' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-500' },
  coral: { bg: 'bg-red-50', icon: 'text-red-500' },
};

const traces = [
  {
    id: 'tr_8f2a1b3c',
    entryAgent: 'Supervisor',
    entryIcon: Brain,
    entryColor: 'purple',
    duration: '2.4s',
    status: 'success',
    timestamp: '10:42:15',
    spans: [
      { name: 'Supervisor.route', agent: 'Supervisor', icon: Brain, color: 'purple', start: 0, duration: 120, status: 'success' },
      { name: 'Researcher.search', agent: 'Researcher', icon: Search, color: 'green', start: 120, duration: 800, status: 'success' },
      { name: 'DataFetcher.fetch', agent: 'DataFetcher', icon: Database, color: 'blue', start: 200, duration: 600, status: 'success' },
      { name: 'Validator.validate', agent: 'Validator', icon: ShieldCheck, color: 'amber', start: 920, duration: 400, status: 'success' },
      { name: 'Responder.generate', agent: 'Responder', icon: MessageSquare, color: 'coral', start: 1320, duration: 1080, status: 'success' },
    ],
  },
  {
    id: 'tr_9c3b2d4e',
    entryAgent: 'DataFetcher',
    entryIcon: Database,
    entryColor: 'blue',
    duration: '1.8s',
    status: 'success',
    timestamp: '10:41:03',
    spans: [
      { name: 'DataFetcher.query', agent: 'DataFetcher', icon: Database, color: 'blue', start: 0, duration: 900, status: 'success' },
      { name: 'Validator.check', agent: 'Validator', icon: ShieldCheck, color: 'amber', start: 900, duration: 500, status: 'success' },
      { name: 'Responder.format', agent: 'Responder', icon: MessageSquare, color: 'coral', start: 1400, duration: 400, status: 'success' },
    ],
  },
  {
    id: 'tr_7d4e5f6a',
    entryAgent: 'Supervisor',
    entryIcon: Brain,
    entryColor: 'purple',
    duration: '4.1s',
    status: 'error',
    timestamp: '10:39:47',
    spans: [
      { name: 'Supervisor.route', agent: 'Supervisor', icon: Brain, color: 'purple', start: 0, duration: 100, status: 'success' },
      { name: 'Researcher.search', agent: 'Researcher', icon: Search, color: 'green', start: 100, duration: 1200, status: 'success' },
      { name: 'DataFetcher.fetch', agent: 'DataFetcher', icon: Database, color: 'blue', start: 300, duration: 2000, status: 'error' },
      { name: 'Validator.validate', agent: 'Validator', icon: ShieldCheck, color: 'amber', start: 2300, duration: 800, status: 'success' },
      { name: 'Responder.generate', agent: 'Responder', icon: MessageSquare, color: 'coral', start: 3100, duration: 1000, status: 'success' },
    ],
  },
  {
    id: 'tr_6a1b7c8d',
    entryAgent: 'Researcher',
    entryIcon: Search,
    entryColor: 'green',
    duration: '1.2s',
    status: 'success',
    timestamp: '10:38:22',
    spans: [
      { name: 'Researcher.analyze', agent: 'Researcher', icon: Search, color: 'green', start: 0, duration: 700, status: 'success' },
      { name: 'Responder.compose', agent: 'Responder', icon: MessageSquare, color: 'coral', start: 700, duration: 500, status: 'success' },
    ],
  },
  {
    id: 'tr_5b2c9d0e',
    entryAgent: 'Supervisor',
    entryIcon: Brain,
    entryColor: 'purple',
    duration: '3.2s',
    status: 'warning',
    timestamp: '10:37:11',
    spans: [
      { name: 'Supervisor.route', agent: 'Supervisor', icon: Brain, color: 'purple', start: 0, duration: 150, status: 'success' },
      { name: 'Researcher.search', agent: 'Researcher', icon: Search, color: 'green', start: 150, duration: 1500, status: 'warning' },
      { name: 'DataFetcher.fetch', agent: 'DataFetcher', icon: Database, color: 'blue', start: 400, duration: 1200, status: 'success' },
      { name: 'Validator.validate', agent: 'Validator', icon: ShieldCheck, color: 'amber', start: 1650, duration: 600, status: 'success' },
      { name: 'Responder.generate', agent: 'Responder', icon: MessageSquare, color: 'coral', start: 2250, duration: 950, status: 'success' },
    ],
  },
  {
    id: 'tr_4e3f0a1b',
    entryAgent: 'Validator',
    entryIcon: ShieldCheck,
    entryColor: 'amber',
    duration: '0.9s',
    status: 'success',
    timestamp: '10:36:05',
    spans: [
      { name: 'Validator.check_schema', agent: 'Validator', icon: ShieldCheck, color: 'amber', start: 0, duration: 400, status: 'success' },
      { name: 'Validator.check_content', agent: 'Validator', icon: ShieldCheck, color: 'amber', start: 400, duration: 500, status: 'success' },
    ],
  },
];

export default function Traces() {
  const [expandedTrace, setExpandedTrace] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTraces = filterStatus === 'all'
    ? traces
    : traces.filter(t => t.status === filterStatus);

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111]">Traces</h1>
          <p className="text-sm text-[#6B7280] mt-1">Execution traces across your agent system</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition-all">
            <Filter size={14} />
            Filter
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition-all">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex items-center gap-2">
        {['all', 'success', 'error', 'warning'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              filterStatus === status
                ? 'bg-[#2F5CFF] text-white'
                : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({traces.filter(t => t.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Traces list */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden w-full">
        <div className="overflow-x-auto scrollbar-hide">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-[#6B7280] min-w-[700px]">
            <div className="col-span-1"></div>
            <div className="col-span-3">Trace ID</div>
            <div className="col-span-2">Entry Agent</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Timestamp</div>
          </div>

          {/* Trace rows */}
          {filteredTraces.map((trace) => {
            const isExpanded = expandedTrace === trace.id;
            const EntryIcon = trace.entryIcon;
            const colors = colorMap[trace.entryColor];
            const maxDuration = Math.max(...trace.spans.map(s => s.start + s.duration));

            return (
              <div key={trace.id} className="border-b border-gray-50 last:border-0">
                <div
                  onClick={() => setExpandedTrace(isExpanded ? null : trace.id)}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer hover:bg-gray-50 transition-all min-w-[700px]"
                >
                  <div className="col-span-1">
                    {isExpanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
                  </div>
                  <div className="col-span-3 min-w-0">
                    <span className="text-sm font-mono text-[#111] truncate block">{trace.id}</span>
                  </div>
                  <div className="col-span-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <EntryIcon size={12} className={colors.icon} />
                      </div>
                      <span className="text-sm text-[#111] truncate">{trace.entryAgent}</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-[#111] whitespace-nowrap">{trace.duration}</span>
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      trace.status === 'success' ? 'bg-green-50 text-green-700' :
                      trace.status === 'error' ? 'bg-red-50 text-red-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      trace.status === 'success' ? 'bg-green-500' :
                      trace.status === 'error' ? 'bg-red-500' :
                      'bg-amber-500'
                    }`} />
                    {trace.status.charAt(0).toUpperCase() + trace.status.slice(1)}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-[#6B7280]">{trace.timestamp}</span>
                </div>
              </div>

              {/* Expanded waterfall view */}
              {isExpanded && (
                <div className="px-6 pb-4">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-[#6B7280]">Span Waterfall</span>
                      <span className="text-[10px] text-[#9CA3AF]">Total: {trace.duration}</span>
                    </div>
                    <div className="space-y-2">
                      {trace.spans.map((span, i) => {
                        const SpanIcon = span.icon;
                        const spanColors = colorMap[span.color];
                        const leftPercent = (span.start / maxDuration) * 100;
                        const widthPercent = (span.duration / maxDuration) * 100;
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-32 flex items-center gap-2 flex-shrink-0">
                              <div className={`w-5 h-5 rounded-full ${spanColors.bg} flex items-center justify-center`}>
                                <SpanIcon size={10} className={spanColors.icon} />
                              </div>
                              <span className="text-[11px] text-[#6B7280] truncate">{span.name}</span>
                            </div>
                            <div className="flex-1 h-6 bg-white rounded-md relative overflow-hidden">
                              <div
                                className={`absolute top-0.5 bottom-0.5 rounded-md flex items-center px-2 ${
                                  span.status === 'success' ? 'bg-green-100 border border-green-200' :
                                  span.status === 'error' ? 'bg-red-100 border border-red-200' :
                                  'bg-amber-100 border border-amber-200'
                                }`}
                                style={{ left: `${leftPercent}%`, width: `${Math.max(widthPercent, 3)}%` }}
                              >
                                <span className="text-[9px] font-medium text-gray-600 truncate">
                                  {span.duration}ms
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
