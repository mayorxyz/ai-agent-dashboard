import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Overview from './pages/Overview';
import Workflows from './pages/Workflows';
import WorkflowDetail from './pages/WorkflowDetail';
import LiveMap from './pages/LiveMap';
import Traces from './pages/Traces';
import Incidents from './pages/Incidents';
import Insights from './pages/Insights';
import Cost from './pages/Cost';
import Compare from './pages/Compare';
import ROI from './pages/ROI';
import Sandbox from './pages/Sandbox';
import Status from './pages/Status';
import Onboarding from './pages/Onboarding';
import AgentDetail from './pages/AgentDetail';

export type Page = 'overview' | 'workflows' | 'livemap' | 'traces' | 'incidents' | 'insights' | 'cost' | 'compare' | 'roi' | 'sandbox';

const pathToPage: Record<string, Page> = {
  '/': 'overview',
  '/workflows': 'workflows',
  '/livemap': 'livemap',
  '/traces': 'traces',
  '/incidents': 'incidents',
  '/insights': 'insights',
  '/cost': 'cost',
  '/compare': 'compare',
  '/roi': 'roi',
  '/sandbox': 'sandbox',
};

const pageToPath: Record<Page, string> = {
  overview: '/',
  workflows: '/workflows',
  livemap: '/livemap',
  traces: '/traces',
  incidents: '/incidents',
  insights: '/insights',
  cost: '/cost',
  compare: '/compare',
  roi: '/roi',
  sandbox: '/sandbox',
};

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const activePage = pathToPage[location.pathname] || 'overview';

  const setActivePage = (page: Page) => {
    navigate(pageToPath[page]);
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#0A0A0B]' : 'bg-[#F3F3F4]'
    }`}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <TopNav activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-[1600px] mx-auto px-4 py-6 lg:px-8 lg:py-8">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/workflows/:id" element={<WorkflowDetail />} />
              <Route path="/livemap" element={<LiveMap />} />
              <Route path="/traces" element={<Traces />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/cost" element={<Cost />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/roi" element={<ROI />} />
              <Route path="/sandbox" element={<Sandbox />} />
              <Route path="/status" element={<Status />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/agent/:agentName" element={<AgentDetail />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Layout />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
