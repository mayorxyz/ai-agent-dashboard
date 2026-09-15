import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Overview from './pages/Overview';
import Workflows from './pages/Workflows';
import LiveMap from './pages/LiveMap';
import Traces from './pages/Traces';
import Incidents from './pages/Incidents';
import Insights from './pages/Insights';

export type Page = 'overview' | 'workflows' | 'livemap' | 'traces' | 'incidents' | 'insights';

const pathToPage: Record<string, Page> = {
  '/': 'overview',
  '/workflows': 'workflows',
  '/livemap': 'livemap',
  '/traces': 'traces',
  '/incidents': 'incidents',
  '/insights': 'insights',
};

const pageToPath: Record<Page, string> = {
  overview: '/',
  workflows: '/workflows',
  livemap: '/livemap',
  traces: '/traces',
  incidents: '/incidents',
  insights: '/insights',
};

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = pathToPage[location.pathname] || 'overview';

  const setActivePage = (page: Page) => {
    navigate(pageToPath[page]);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F3F3F4]">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/workflows" element={<Workflows />} />
            <Route path="/livemap" element={<LiveMap />} />
            <Route path="/traces" element={<Traces />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}

export default App;
