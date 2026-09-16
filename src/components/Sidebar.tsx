import { useTheme } from '../contexts/ThemeContext';
import { LayoutDashboard, GitBranch, Map, ScrollText, AlertTriangle, BarChart3, DollarSign, Users, Bell, Settings, HelpCircle, LifeBuoy, Rocket, FlaskConical, Laptop, type LucideIcon } from 'lucide-react';
import type { Page } from '../App';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems: { icon: LucideIcon; label: string; page: Page; section?: string }[] = [
  { icon: LayoutDashboard, label: 'Overview', page: 'overview', section: 'main' },
  { icon: GitBranch, label: 'Workflows', page: 'workflows', section: 'main' },
  { icon: Map, label: 'Live Map', page: 'livemap', section: 'main' },
  { icon: ScrollText, label: 'Traces', page: 'traces', section: 'main' },
  { icon: AlertTriangle, label: 'Incidents', page: 'incidents', section: 'main' },
  { icon: BarChart3, label: 'Insights', page: 'insights', section: 'main' },
  { icon: DollarSign, label: 'Cost', page: 'cost', section: 'main' },
  { icon: LayoutDashboard, label: 'Compare', page: 'compare', section: 'main' },
  { icon: DollarSign, label: 'ROI', page: 'roi', section: 'tools' },
  { icon: LayoutDashboard, label: 'Sandbox', page: 'sandbox', section: 'tools' },
  { icon: Users, label: 'Team', page: 'team', section: 'account' },
  { icon: DollarSign, label: 'Billing', page: 'billing', section: 'account' },
  { icon: Bell, label: 'Notifications', page: 'notifications', section: 'account' },
  { icon: Settings, label: 'Settings', page: 'settings', section: 'account' },
  { icon: LayoutDashboard, label: 'Profile', page: 'profile', section: 'account' },
  { icon: Rocket, label: 'Integrations', page: 'integrations', section: 'support' },
  { icon: HelpCircle, label: 'Help', page: 'help', section: 'support' },
  { icon: LifeBuoy, label: 'Support', page: 'help', section: 'support' },
];

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const { isDark } = useTheme();

  const sections = [
    { id: 'main', label: '' },
    { id: 'tools', label: 'Tools' },
    { id: 'account', label: 'Account' },
    { id: 'support', label: 'Support' },
  ];

  const mobileNavItems = navItems.filter(item => 
    ['overview', 'workflows', 'livemap', 'traces', 'incidents'].includes(item.page)
  );

  return (
    <>
      <aside className={`hidden md:flex w-16 lg:w-64 flex-shrink-0 h-screen flex-col border-r transition-colors duration-300 ${
        isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center gap-3 px-4 h-16 border-b border-inherit">
          <div className="w-8 h-8 rounded-lg bg-[#2F5CFF] flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className={`text-lg font-bold hidden lg:block ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>
            OrchestrateIQ
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {sections.map((section) => {
            const items = navItems.filter(item => item.section === section.id);
            if (items.length === 0) return null;
            
            return (
              <div key={section.id} className="mb-4">
                {section.label && (
                  <div className={`px-3 mb-4 text-xs font-semibold uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-gray-400'}`} style={{ letterSpacing: '0.05em' }}>
                    {section.label}
                  </div>
                )}
                <div className="space-y-1">
                  {items.map(({ icon: Icon, label, page }) => (
                    <button
                      key={`${section.id}-${page}-${label}`}
                      onClick={() => setActivePage(page)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activePage === page
                          ? 'bg-[#2F5CFF] text-white'
                          : isDark
                            ? 'text-gray-400 hover:text-gray-200 hover:bg-[#1F1F23]'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={18} className="flex-shrink-0" />
                      <span className="hidden lg:block truncate">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      <nav className={`md:hidden fixed bottom-0 left-0 right-0 border-t z-50 ${
        isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-around px-2 py-2">
          {mobileNavItems.map(({ icon: Icon, label, page }) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg min-w-[64px] transition-all duration-300 ${
                activePage === page
                  ? 'text-[#2F5CFF]'
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
