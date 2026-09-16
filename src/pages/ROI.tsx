import { useState } from 'react';
import { DollarSign, Shield, Clock, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ROI() {
  const { isDark } = useTheme();
  const [incidentsPrevented, setIncidentsPrevented] = useState(15);
  const [costPerIncident, setCostPerIncident] = useState(5000);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(150);

  const monthlyIncidentSavings = incidentsPrevented * costPerIncident;
  const monthlyHoursSaved = hoursSavedPerWeek * 4.33; // weeks per month
  const monthlyLaborSavings = monthlyHoursSaved * hourlyRate;
  const totalMonthlySavings = monthlyIncidentSavings + monthlyLaborSavings;
  const annualSavings = totalMonthlySavings * 12;

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
          ROI Calculator
        </h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
          Estimate your savings with OrchestrateIQ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Sliders */}
        <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            Your Metrics
          </h2>

          <div className="space-y-6">
            {/* Incidents Prevented */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`text-sm font-medium flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                  <Shield size={16} className="text-green-500" />
                  Incidents Prevented per Month
                </label>
                <span className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                  {incidentsPrevented}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={incidentsPrevented}
                onChange={(e) => setIncidentsPrevented(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2F5CFF]"
              />
              <div className={`flex justify-between text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <span>0</span>
                <span>50</span>
              </div>
            </div>

            {/* Cost per Incident */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`text-sm font-medium flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                  <DollarSign size={16} className="text-blue-500" />
                  Average Cost per Incident
                </label>
                <span className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                  ${costPerIncident.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={costPerIncident}
                onChange={(e) => setCostPerIncident(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2F5CFF]"
              />
              <div className={`flex justify-between text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <span>$1,000</span>
                <span>$20,000</span>
              </div>
            </div>

            {/* Hours Saved */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`text-sm font-medium flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                  <Clock size={16} className="text-purple-500" />
                  Engineer Hours Saved per Week
                </label>
                <span className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                  {hoursSavedPerWeek}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                value={hoursSavedPerWeek}
                onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2F5CFF]"
              />
              <div className={`flex justify-between text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <span>0</span>
                <span>80</span>
              </div>
            </div>

            {/* Hourly Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`text-sm font-medium flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                  <TrendingUp size={16} className="text-amber-500" />
                  Average Engineer Hourly Rate
                </label>
                <span className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                  ${hourlyRate}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2F5CFF]"
              />
              <div className={`flex justify-between text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <span>$50</span>
                <span>$300</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Main Savings Card */}
          <div className={`rounded-3xl p-8 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
            <p className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
              Estimated Monthly Savings
            </p>
            <p className="text-5xl font-bold text-[#2F5CFF] mb-2">
              ${totalMonthlySavings.toLocaleString()}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
              ${(annualSavings).toLocaleString()} annually
            </p>
          </div>

          {/* Breakdown */}
          <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
            <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
              Savings Breakdown
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-green-900/30' : 'bg-green-50'}`}>
                    <Shield size={18} className="text-green-500" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                      Incident Prevention
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                      {incidentsPrevented} incidents × ${costPerIncident.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                  ${monthlyIncidentSavings.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <Clock size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                      Labor Savings
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                      {monthlyHoursSaved.toFixed(1)} hours × ${hourlyRate}/hr
                    </p>
                  </div>
                </div>
                <p className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                  ${monthlyLaborSavings.toLocaleString()}
                </p>
              </div>

              <div className={`pt-4 border-t ${isDark ? 'border-[#1F1F23]' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                    Total Monthly
                  </p>
                  <p className="text-xl font-bold text-[#2F5CFF]">
                    ${totalMonthlySavings.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
