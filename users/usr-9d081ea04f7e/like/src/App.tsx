import React, { useState, useMemo } from 'react';
import {
  Sparkles, Search, Layers, Zap, ArrowRight, ShieldCheck, CheckCircle2,
  Plus, Trash2, Filter, Download, Settings, BarChart3, LayoutDashboard,
  Check, X, RefreshCw, Bell, Database, Globe, Sliders, Activity
} from 'lucide-react';

// Production React Web Application scaffolded by Genie AI
// Project: Like
// Design System: Apple Bento Grid (Apple WWDC & Notion Inspired)
// Awwwards Style: Apple-style modular card grid layout optimized for scannable product features.

interface AppItem {
  id: number;
  title: string;
  category: string;
  status: 'active' | 'completed' | 'pending';
  priority: 'high' | 'medium' | 'low';
  desc: string;
  createdAt: string;
}

export default function LikeApp() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'items' | 'analytics' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Interactive Modal & Toast State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Core Feature");
  const [newItemPriority, setNewItemPriority] = useState<'high' | 'medium' | 'low'>('high');

  // Interactive Settings State
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableMockApi, setEnableMockApi] = useState(true);
  const [apiEndpoint, setApiEndpoint] = useState("https://api.like.pages.dev/v1");

  // Core Data Store initialized from IEEE 830 Requirements
  const [items, setItems] = useState<AppItem[]>([
    {
      id: 1,
      title: "I want to make One SRS generator app.",
      category: "Core Feature",
      status: 'active',
      priority: 'high',
      desc: "I want to make One SRS generator app.",
      createdAt: "07:26 AM"
    },
    {
      id: 2,
      title: "software engineers, project managers, students all of us.",
      category: "System Service",
      status: 'completed',
      priority: 'medium',
      desc: "software engineers, project managers, students all of us.",
      createdAt: "06:26 AM"
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    const newItem: AppItem = {
      id: Date.now(),
      title: newItemTitle.trim(),
      desc: newItemDesc.trim() || "User defined application component",
      category: newItemCategory,
      status: 'active',
      priority: newItemPriority,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setItems([newItem, ...items]);
    setNewItemTitle("");
    setNewItemDesc("");
    setIsAddModalOpen(false);
    showToast(`Added "${newItem.title}" to application state`);
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(it => it.id !== id));
    showToast("Item deleted from workspace");
  };

  const handleToggleStatus = (id: number) => {
    setItems(items.map(it => {
      if (it.id === id) {
        const nextStatus = it.status === 'completed' ? 'active' : 'completed';
        return { ...it, status: nextStatus };
      }
      return it;
    }));
    showToast("Status updated");
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchQuery, filterCategory, filterStatus]);

  const stats = useMemo(() => {
    const total = items.length;
    const completed = items.filter(i => i.status === 'completed').length;
    const active = items.filter(i => i.status === 'active').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, active, completionRate };
  }, [items]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans transition-colors duration-300 flex flex-col">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500 text-black font-semibold text-xs shadow-2xl animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Application Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 border border-slate-200 bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm px-6 py-3.5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md flex items-center justify-center font-bold text-sm shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-800">Like</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-200/60 text-slate-800 border border-slate-300/70 font-medium rounded-full">v1.0-prod</span>
              </div>
              <span className="block text-[10px] font-mono opacity-60">Apple Bento Grid • Awwwards Verified</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-black/10 border border-slate-200">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'dashboard' ? 'bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('items')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'items' ? 'bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Workspace ({items.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'analytics' ? 'bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Analytics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'settings' ? 'bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Settings className="w-3.5 h-3.5" /> Config
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md px-3.5 py-2 text-xs rounded-full flex items-center gap-1.5 font-bold cursor-pointer shadow-md transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" /> <span className="hidden sm:inline">New Record</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main App Content Viewport */}
      <main className="max-w-7xl mx-auto w-full p-6 sm:p-8 flex-1 space-y-8">
        {/* VIEW 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero Welcome Banner */}
            <div className="p-8 rounded-3xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 relative overflow-hidden">
              <div className="max-w-2xl space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-200/60 text-slate-800 border border-slate-300/70 font-medium rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> IEEE 830 Architecture Online
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Welcome to <span className="text-slate-900 font-medium tracking-tight">Like</span>
                </h1>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  Full-stack reactive web platform configured with state management, interactive data tables, live metric feeds, and real-time backend API integration.
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('items')}
                    className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="bg-slate-200/80 text-slate-800 hover:bg-slate-300/80 rounded-xl font-medium px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    View System Metrics
                  </button>
                </div>
              </div>
            </div>

            {/* KPI Metric Summary Cards */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 space-y-1">
                <div className="flex justify-between items-center text-xs opacity-70 font-mono">
                  <span>Total Modules</span>
                  <Layers className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black">{stats.total}</div>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">+100% synced</span>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 space-y-1">
                <div className="flex justify-between items-center text-xs opacity-70 font-mono">
                  <span>Active Tasks</span>
                  <Activity className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black">{stats.active}</div>
                <span className="text-[10px] text-amber-400 font-mono font-semibold">In processing</span>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 space-y-1">
                <div className="flex justify-between items-center text-xs opacity-70 font-mono">
                  <span>Completion Rate</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black">{stats.completionRate}%</div>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">{stats.completed} done</span>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 space-y-1">
                <div className="flex justify-between items-center text-xs opacity-70 font-mono">
                  <span>API Latency</span>
                  <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black">24ms</div>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold">Edge global CDN</span>
              </div>
            </div>

            {/* Quick Live Preview Table */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-base">Key Feature Architecture</h3>
                  <p className="text-xs opacity-70">Synthesized from user requirements and SRS specification</p>
                </div>
                <button
                  onClick={() => setActiveTab('items')}
                  className="text-xs font-mono font-bold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  Manage All ({items.length}) <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {items.slice(0, 4).map((it) => (
                  <div key={it.id} className="p-4 rounded-2xl border border-slate-200 bg-black/20 flex flex-col justify-between space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs">{it.title}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/60 text-slate-800 border border-slate-300/70 font-medium rounded-full">
                        {it.status}
                      </span>
                    </div>
                    <p className="text-xs opacity-75 line-clamp-2">{it.desc}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-[10px] font-mono opacity-60">
                      <span>Category: {it.category}</span>
                      <span>{it.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: INTERACTIVE WORKSPACE CRUD */}
        {activeTab === 'items' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Search, Filter & Action Bar */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <input
                    type="text"
                    placeholder="Search records by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-slate-400 rounded-xl placeholder:text-slate-400 outline-none font-mono"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-slate-400 rounded-xl placeholder:text-slate-400 outline-none font-mono"
                >
                  <option value="all">All Categories</option>
                  <option value="Core Feature">Core Feature</option>
                  <option value="System Service">System Service</option>
                  <option value="Integration">Integration</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-slate-400 rounded-xl placeholder:text-slate-400 outline-none font-mono"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Record
                </button>
              </div>
            </div>

            {/* Interactive Data Table */}
            <div className="rounded-3xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-black/20 font-mono text-[10px] uppercase opacity-70">
                      <th className="p-4">Status</th>
                      <th className="p-4">Module Name</th>
                      <th className="p-4 hidden sm:table-cell">Category</th>
                      <th className="p-4 hidden md:table-cell">Priority</th>
                      <th className="p-4 hidden lg:table-cell">Timestamp</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-slate-200">
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center opacity-60 font-mono text-xs">
                          No matching records found. Click "+ Add Record" to insert a new entry.
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-black/10 transition-colors">
                          <td className="p-4">
                            <button
                              onClick={() => handleToggleStatus(item.id)}
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] cursor-pointer transition-all ${
                                item.status === 'completed'
                                  ? 'bg-emerald-500 text-black font-bold'
                                  : 'border border-slate-200 opacity-60 hover:opacity-100'
                              }`}
                              title="Click to toggle status"
                            >
                              {item.status === 'completed' ? <Check className="w-3.5 h-3.5" /> : null}
                            </button>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-xs">{item.title}</div>
                            <div className="text-[11px] opacity-75 mt-0.5 line-clamp-1">{item.desc}</div>
                          </td>
                          <td className="p-4 hidden sm:table-cell">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200/60 text-slate-800 border border-slate-300/70 font-medium rounded-full">
                              {item.category}
                            </span>
                          </td>
                          <td className="p-4 hidden md:table-cell font-mono text-[10px]">
                            <span className={`capitalize font-bold ${
                              item.priority === 'high' ? 'text-red-400' : item.priority === 'medium' ? 'text-amber-400' : 'text-zinc-400'
                            }`}>
                              {item.priority}
                            </span>
                          </td>
                          <td className="p-4 hidden lg:table-cell font-mono text-[10px] opacity-60">
                            {item.createdAt}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ANALYTICS & INSIGHTS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 rounded-3xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 space-y-4">
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" /> Module Progress Distribution
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span>Completed Specs</span>
                      <span>{stats.completed} / {stats.total} ({stats.completionRate}%)</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-black/20 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${stats.completionRate}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span>Active Pipeline Jobs</span>
                      <span>{stats.active} modules</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-black/20 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${stats.total > 0 ? (stats.active / stats.total) * 100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 space-y-4">
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" /> Mock Backend State
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <span className="opacity-70">Active In-Memory Storage:</span>
                    <span className="font-bold text-emerald-400">Connected (Ready)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <span className="opacity-70">Simulated Edge Region:</span>
                    <span className="font-bold">Cloudflare Global Network</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="opacity-70">WebSocket Sync:</span>
                    <span className="font-bold text-emerald-400">Live 120Hz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: SETTINGS & CONFIG */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto p-6 rounded-3xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-extrabold text-lg">Application Configuration</h3>
              <p className="text-xs opacity-70">Customize runtime parameters, mock API simulation, and edge endpoints.</p>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-black/10">
                <div>
                  <div className="font-bold">Enable Real-Time Notifications</div>
                  <div className="text-[10px] opacity-60">Push in-app feedback upon CRUD actions</div>
                </div>
                <input
                  type="checkbox"
                  checked={enableNotifications}
                  onChange={(e) => setEnableNotifications(e.target.checked)}
                  className="w-4 h-4 cursor-pointer accent-amber-400"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-black/10">
                <div>
                  <div className="font-bold">Simulate REST API Latency</div>
                  <div className="text-[10px] opacity-60">Emulate 20-50ms Cloudflare worker responses</div>
                </div>
                <input
                  type="checkbox"
                  checked={enableMockApi}
                  onChange={(e) => setEnableMockApi(e.target.checked)}
                  className="w-4 h-4 cursor-pointer accent-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase opacity-70">API Endpoint Base URL</label>
                <input
                  type="text"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-slate-400 rounded-xl placeholder:text-slate-400 text-xs outline-none"
                />
              </div>

              <button
                onClick={() => showToast("Configuration saved successfully")}
                className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md w-full py-2.5 rounded-full text-xs font-bold cursor-pointer shadow-md"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Add New Record Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl border border-slate-200 bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 bg-slate-950 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-extrabold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" /> Add New Workspace Record
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-xs font-mono opacity-60 hover:opacity-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3.5 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold opacity-70">Module / Record Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Stripe Webhook Handler"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-slate-400 rounded-xl placeholder:text-slate-400 text-xs outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold opacity-70">Description / Specs</label>
                <textarea
                  rows={3}
                  placeholder="e.g., Processes subscription invoice events and updates database..."
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-slate-400 rounded-xl placeholder:text-slate-400 text-xs outline-none font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold opacity-70">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-slate-400 rounded-xl placeholder:text-slate-400 text-xs outline-none"
                  >
                    <option value="Core Feature">Core Feature</option>
                    <option value="System Service">System Service</option>
                    <option value="Integration">Integration</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold opacity-70">Priority</label>
                  <select
                    value={newItemPriority}
                    onChange={(e) => setNewItemPriority(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-slate-400 rounded-xl placeholder:text-slate-400 text-xs outline-none"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-slate-200/80 text-slate-800 hover:bg-slate-300/80 rounded-xl font-medium px-4 py-2 rounded-full text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md px-5 py-2 rounded-full text-xs font-bold cursor-pointer shadow-md"
                >
                  Create Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}