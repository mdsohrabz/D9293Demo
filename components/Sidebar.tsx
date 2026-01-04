import React from 'react';
import { LayoutGrid, Bookmark, Settings, Layers } from 'lucide-react';
import { TabView } from '../types';

interface SidebarProps {
  activeTab: TabView;
  onTabChange: (tab: TabView) => void;
  savedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, savedCount }) => {
  const menuItems = [
    { id: 'feed', label: 'Feed', icon: <LayoutGrid size={20} /> },
    { id: 'saved', label: 'Saved Items', icon: <Bookmark size={20} />, count: savedCount },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-10 hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
            <Layers size={18} />
          </div>
          Curate.
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2 mt-4">
          Menu
        </div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id as TabView)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-slate-50 text-slate-900 ring-1 ring-slate-200 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}>
                {item.icon}
              </span>
              {item.label}
            </div>
            {item.count !== undefined && item.count > 0 && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                activeTab === item.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
          <Settings size={20} className="text-slate-400" />
          Settings
        </button>
        <div className="mt-4 flex items-center gap-3 px-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                JD
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">John Doe</span>
                <span className="text-xs text-slate-400">Pro Plan</span>
            </div>
        </div>
      </div>
    </aside>
  );
};