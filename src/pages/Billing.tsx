import { useTheme } from '../contexts/ThemeContext';
import { CreditCard, Download, Check, Zap, Users, Workflow } from 'lucide-react';

export default function Billing() {
  const { isDark } = useTheme();

  const currentPlan = {
    name: 'Pro',
    price: 99,
    renewalDate: 'Feb 15, 2024',
    features: ['Unlimited agents', '100k events/month', '5 team members', 'Priority support'],
  };

  const usage = [
    { label: 'Agent Calls', used: 45200, total: 100000, icon: Zap },
    { label: 'Workflows', used: 12, total: 50, icon: Workflow },
    { label: 'Team Members', used: 3, total: 5, icon: Users },
  ];

  const paymentMethod = {
    type: 'Visa',
    last4: '4242',
    expiry: '12/25',
  };

  const invoices = [
    { id: 1, date: 'Jan 15, 2024', amount: 99, status: 'paid' },
    { id: 2, date: 'Dec 15, 2023', amount: 99, status: 'paid' },
    { id: 3, date: 'Nov 15, 2023', amount: 99, status: 'paid' },
    { id: 4, date: 'Oct 15, 2023', amount: 99, status: 'paid' },
  ];

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Billing</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
          Manage your subscription and payment methods
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Plan */}
        <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Current Plan</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                Renews on {currentPlan.renewalDate}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
              {currentPlan.name}
            </span>
          </div>
          
          <div className="mb-6">
            <span className={`text-4xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>${currentPlan.price}</span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>/month</span>
          </div>

          <ul className="space-y-2 mb-6">
            {currentPlan.features.map((feature, i) => (
              <li key={i} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                <Check size={16} className="text-green-500 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <button className="w-full px-6 py-2.5 bg-[#2F5CFF] text-white rounded-xl text-sm font-medium hover:bg-blue-600 active:scale-[0.98] transition-all">
            Upgrade Plan
          </button>
        </div>

        {/* Usage */}
        <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Usage This Cycle</h3>
          
          <div className="space-y-4">
            {usage.map((item, i) => {
              const Icon = item.icon;
              const percentage = (item.used / item.total) * 100;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>
                        {item.label}
                      </span>
                    </div>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                      {item.used.toLocaleString()} / {item.total.toLocaleString()}
                    </span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-100'}`}>
                    <div
                      className="h-full bg-[#2F5CFF] rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Payment Method</h3>
          <button className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-[#2F5CFF] hover:text-blue-600'}`}>
            Update
          </button>
        </div>
        
        <div className={`flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-[#1F1F23]' : 'bg-gray-50'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
            <CreditCard size={24} className={isDark ? 'text-blue-400' : 'text-blue-500'} />
          </div>
          <div className="flex-1">
            <p className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
              {paymentMethod.type} •••• {paymentMethod.last4}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
              Expires {paymentMethod.expiry}
            </p>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Invoice History</h3>
        
        <div className="space-y-2">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className={`flex items-center justify-between p-4 rounded-xl ${isDark ? 'bg-[#1F1F23] hover:bg-[#27272A]' : 'bg-gray-50 hover:bg-gray-100'} transition-all`}
            >
              <div className="flex items-center gap-4">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                    {invoice.date}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                    OrchestrateIQ Pro
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                  ${invoice.amount}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  invoice.status === 'paid'
                    ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'
                    : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700'
                }`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-[#3F3F46]' : 'hover:bg-gray-200'} transition-all`}>
                  <Download size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
