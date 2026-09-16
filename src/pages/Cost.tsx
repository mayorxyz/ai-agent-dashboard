import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { DollarSign, TrendingUp, Calendar, X, AlertTriangle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { costData, agents } from '../data/mockData';

export default function Cost() {
  const { isDark } = useTheme();
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budget, setBudget] = useState(costData.budget);
  const [alertThreshold, setAlertThreshold] = useState(costData.alertThreshold);
  const [sortField, setSortField] = useState<'agent' | 'calls' | 'costPerCall' | 'totalCost'>('totalCost');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedAgents = [...costData.byAgent].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const agentColors: Record<string, string> = {
    Researcher: '#10B981',
    Supervisor: '#8B5CF6',
    DataFetcher: '#3B82F6',
    Validator: '#F59E0B',
    Responder: '#EF4444',
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Cost Tracking</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
            Monitor and optimize your agent costs
          </p>
        </div>
        <button
          onClick={() => setShowBudgetModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2F5CFF] text-white rounded-full text-sm font-medium hover:bg-blue-600 active:bg-blue-700 transition-all shadow-sm active:scale-[0.98]"
        >
          <DollarSign size={16} />
          Set Budget
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className={`rounded-2xl p-5 shadow-sm border min-w-0 overflow-hidden ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDark ? 'bg-green-900/30' : 'bg-green-50'
            }`}>
              <DollarSign size={18} className={isDark ? 'text-green-400' : 'text-green-500'} />
            </div>
          </div>
          <p className={`text-2xl font-bold truncate ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            ${costData.totalSpend.toFixed(2)}
          </p>
          <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Total spend</p>
        </div>

        <div className={`rounded-2xl p-5 shadow-sm border min-w-0 overflow-hidden ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDark ? 'bg-blue-900/30' : 'bg-blue-50'
            }`}>
              <TrendingUp size={18} className={isDark ? 'text-blue-400' : 'text-blue-500'} />
            </div>
          </div>
          <p className={`text-2xl font-bold truncate ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            ${costData.dailyAverage.toFixed(2)}
          </p>
          <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Daily average</p>
        </div>

        <div className={`rounded-2xl p-5 shadow-sm border min-w-0 overflow-hidden ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDark ? 'bg-purple-900/30' : 'bg-purple-50'
            }`}>
              <Calendar size={18} className={isDark ? 'text-purple-400' : 'text-purple-500'} />
            </div>
          </div>
          <p className={`text-2xl font-bold truncate ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            ${costData.projectedMonthly.toFixed(2)}
          </p>
          <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Projected monthly</p>
        </div>
      </div>

      {/* Stacked Bar Chart */}
      <div className={`rounded-3xl p-6 shadow-sm border min-w-0 ${
        isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
      }`}>
        <h2 className={`text-base font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
          Cost per Agent per Day
        </h2>
        <p className={`text-xs mb-6 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
          Last 14 days
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costData.dailyCosts}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272A' : '#F3F4F6'} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10, fill: isDark ? '#9CA3AF' : '#9CA3AF' }} 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: isDark ? '#9CA3AF' : '#9CA3AF' }} 
              axisLine={false} 
              tickLine={false}
              unit="$"
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: `1px solid ${isDark ? '#27272A' : '#E5E7EB'}`,
                backgroundColor: isDark ? '#18181B' : '#FFFFFF',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
            />
            <Legend />
            {agents.map((agent) => (
              <Bar
                key={agent.name}
                dataKey={agent.name}
                stackId="costs"
                fill={agentColors[agent.name]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Table */}
      <div className={`rounded-3xl shadow-sm border overflow-hidden ${
        isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
      }`}>
        <div className="p-6 border-b border-gray-100 dark:border-[#1F1F23]">
          <h2 className={`text-base font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            Cost Breakdown by Agent
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={isDark ? 'bg-[#1F1F23]' : 'bg-gray-50'}>
                <th
                  onClick={() => handleSort('agent')}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-opacity-80 transition-colors ${
                    isDark ? 'text-gray-400' : 'text-[#6B7280]'
                  }`}
                >
                  Agent {sortField === 'agent' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('calls')}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-opacity-80 transition-colors ${
                    isDark ? 'text-gray-400' : 'text-[#6B7280]'
                  }`}
                >
                  Calls {sortField === 'calls' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('costPerCall')}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-opacity-80 transition-colors ${
                    isDark ? 'text-gray-400' : 'text-[#6B7280]'
                  }`}
                >
                  Cost/Call {sortField === 'costPerCall' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  onClick={() => handleSort('totalCost')}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-opacity-80 transition-colors ${
                    isDark ? 'text-gray-400' : 'text-[#6B7280]'
                  }`}
                >
                  Total Cost {sortField === 'totalCost' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-[#1F1F23]' : 'divide-gray-100'}`}>
              {sortedAgents.map((row) => {
                const agent = agents.find(a => a.name === row.agent);
                const color = agent ? agentColors[agent.name] : '#6B7280';
                return (
                  <tr key={row.agent} className={`transition-colors ${
                    isDark ? 'hover:bg-[#1F1F23]' : 'hover:bg-gray-50'
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        <span className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                          {row.agent}
                        </span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-[#6B7280]'}`}>
                      {row.calls.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-[#6B7280]'}`}>
                      ${row.costPerCall.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                      ${row.totalCost.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setShowBudgetModal(false)}>
          <div className={`rounded-3xl p-6 max-w-md w-full shadow-2xl ${
            isDark ? 'bg-[#18181B]' : 'bg-white'
          }`} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                Set Budget & Alerts
              </h3>
              <button
                onClick={() => setShowBudgetModal(false)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                  isDark ? 'hover:bg-[#27272A]' : 'hover:bg-gray-100'
                }`}
              >
                <X size={18} className={isDark ? 'text-gray-400' : 'text-gray-400'} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                  Monthly Budget
                </label>
                <div className="relative">
                  <DollarSign size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                      isDark 
                        ? 'bg-[#1F1F23] border-[#27272A] text-gray-100' 
                        : 'bg-white border-gray-200 text-[#111]'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                  Alert Threshold (%)
                </label>
                <div className="relative">
                  <AlertTriangle size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="number"
                    value={alertThreshold}
                    onChange={(e) => setAlertThreshold(Number(e.target.value))}
                    min={0}
                    max={100}
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                      isDark 
                        ? 'bg-[#1F1F23] border-[#27272A] text-gray-100' 
                        : 'bg-white border-gray-200 text-[#111]'
                    }`}
                  />
                </div>
                <p className={`text-xs mt-1.5 ${isDark ? 'text-gray-500' : 'text-[#9CA3AF]'}`}>
                  Get notified when spend reaches {alertThreshold}% of budget
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="flex-1 py-2.5 bg-[#2F5CFF] text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-all active:scale-[0.98]"
              >
                Save Budget
              </button>
              <button
                onClick={() => setShowBudgetModal(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isDark 
                    ? 'bg-[#27272A] text-gray-300 hover:bg-[#3F3F46]' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
