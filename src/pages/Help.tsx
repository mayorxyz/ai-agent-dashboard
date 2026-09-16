import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Search, Book, HelpCircle, Send, ChevronRight } from 'lucide-react';

export default function Help() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    { q: 'How do I add a new agent?', a: 'Navigate to the Workflows page and click "New Workflow" to create a workflow with agents.' },
    { q: 'How do I set up alerts?', a: 'Go to Settings > Notifications to configure alert thresholds and channels.' },
    { q: 'How do I invite team members?', a: 'Visit the Team page and use the invite form to add new members.' },
    { q: 'How do I change my plan?', a: 'Go to Billing and click "Upgrade Plan" to see available options.' },
    { q: 'How do I export data?', a: 'Use the export button on any page with tabular data to download CSV or JSON.' },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Help & Documentation</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
          Find answers and get support
        </p>
      </div>

      {/* Search */}
      <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
        <div className="relative">
          <Search size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
              isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100 placeholder:text-gray-500' : 'bg-white border-gray-200 text-[#111] placeholder:text-gray-400'
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ */}
        <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-2 mb-4">
            <Book size={20} className={isDark ? 'text-blue-400' : 'text-blue-500'} />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Frequently Asked Questions</h3>
          </div>
          <div className="space-y-3">
            {filteredFaqs.map((faq, i) => (
              <details
                key={i}
                className={`group rounded-xl border ${isDark ? 'border-[#1F1F23] bg-[#1F1F23]' : 'border-gray-100 bg-gray-50'}`}
              >
                <summary className={`flex items-center justify-between p-4 cursor-pointer list-none ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
                  <span className="text-sm font-medium">{faq.q}</span>
                  <ChevronRight size={16} className={`transition-transform group-open:rotate-90 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </summary>
                <div className={`px-4 pb-4 text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className={`rounded-3xl p-6 shadow-sm border ${isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={20} className={isDark ? 'text-purple-400' : 'text-purple-500'} />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Contact Support</h3>
          </div>
          
          {submitted ? (
            <div className={`p-6 rounded-xl text-center ${isDark ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <p className={`text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                Message sent! We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                    isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100' : 'bg-white border-gray-200 text-[#111]'
                  }`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all ${
                    isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100' : 'bg-white border-gray-200 text-[#111]'
                  }`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium block mb-1.5 ${isDark ? 'text-gray-300' : 'text-[#111]'}`}>Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  rows={4}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none ${
                    isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100' : 'bg-white border-gray-200 text-[#111]'
                  }`}
                />
              </div>
              <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-[#2F5CFF] text-white rounded-xl text-sm font-medium hover:bg-blue-600 active:scale-[0.98] transition-all">
                <Send size={16} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
