import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  LayoutDashboard,
  GitBranch,
  Map,
  ScrollText,
  AlertTriangle,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import type { Page } from '../App';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchItems = [
  { label: 'Overview', page: 'overview' as Page, icon: LayoutDashboard, category: 'Pages' },
  { label: 'Workflows', page: 'workflows' as Page, icon: GitBranch, category: 'Pages' },
  { label: 'Live Map', page: 'livemap' as Page, icon: Map, category: 'Pages' },
  { label: 'Traces', page: 'traces' as Page, icon: ScrollText, category: 'Pages' },
  { label: 'Incidents', page: 'incidents' as Page, icon: AlertTriangle, category: 'Pages' },
  { label: 'Insights', page: 'insights' as Page, icon: BarChart3, category: 'Pages' },
  { label: 'Supervisor Agent', page: 'workflows' as Page, icon: ArrowRight, category: 'Agents' },
  { label: 'Researcher Agent', page: 'workflows' as Page, icon: ArrowRight, category: 'Agents' },
  { label: 'DataFetcher Agent', page: 'workflows' as Page, icon: ArrowRight, category: 'Agents' },
  { label: 'Validator Agent', page: 'workflows' as Page, icon: ArrowRight, category: 'Agents' },
  { label: 'Responder Agent', page: 'workflows' as Page, icon: ArrowRight, category: 'Agents' },
  { label: 'Customer Query Resolution', page: 'workflows' as Page, icon: ArrowRight, category: 'Workflows' },
  { label: 'Data Pipeline Validation', page: 'workflows' as Page, icon: ArrowRight, category: 'Workflows' },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, filteredItems.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        navigate(`/${filteredItems[selectedIndex].page === 'overview' ? '' : filteredItems[selectedIndex].page}`);
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  const filteredItems = searchItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof filteredItems>);

  let globalIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white dark:bg-[#18181B] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#27272A] overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-[#27272A]">
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Search pages, agents, workflows..."
            className="flex-1 bg-transparent text-sm text-[#111] dark:text-gray-100 placeholder:text-gray-400 outline-none"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-[#27272A] text-gray-400"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">
              No results found
            </div>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-2">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  {category}
                </div>
                {items.map((item) => {
                  globalIndex++;
                  const currentIndex = globalIndex;
                  const Icon = item.icon;
                  return (
                    <button
                      key={`${item.label}-${currentIndex}`}
                      onClick={() => {
                        navigate(`/${item.page === 'overview' ? '' : item.page}`);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(currentIndex)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                        selectedIndex === currentIndex
                          ? 'bg-[#2F5CFF]/10 text-[#2F5CFF]'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#27272A]'
                      }`}
                    >
                      <Icon size={16} className="flex-shrink-0" />
                      <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 dark:border-[#27272A] flex items-center gap-4 text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-[#27272A] rounded text-[10px]">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-[#27272A] rounded text-[10px]">↵</kbd>
            Select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-[#27272A] rounded text-[10px]">esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
