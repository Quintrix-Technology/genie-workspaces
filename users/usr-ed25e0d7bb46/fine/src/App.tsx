import React, { useState } from 'react';
import { Sparkles, Search, Layers, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

// Production React Component scaffolded by Genie AI
// Project: fine
// Design System: Apple Bento Grid (Apple WWDC & Notion Inspired)
// Awwwards Style: Apple-style modular card grid layout optimized for scannable product features.

export default function fineApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [counterCount, setCounterCount] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");

  const features = [
    { id: 1, title: "Dynamic Analytics Showcase", desc: "Real-time metrics grid with interactive filters." },
    { id: 2, title: "Secure Auth & Access Gateway", desc: "OAuth2 & JWT user authentication module." },
    { id: 3, title: "Notification Hub & Alerts", desc: "Instant status updates and webhooks push alerts." },
    { id: 4, title: "Export & Reporting Engine", desc: "One-click PDF/CSV report generation." }
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-6 sm:p-10 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6 border border-slate-200 bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md flex items-center justify-center font-bold text-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-800">fine</span>
            <span className="block text-[10px] font-mono text-slate-400">Apple Bento Grid System</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block bg-slate-200/60 text-slate-800 border border-slate-300/70 font-medium rounded-full px-3 py-1 text-[11px]">
            Clean UI
          </span>
          <button className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md px-4 py-2 text-xs">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto mt-12 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-200/60 text-slate-800 border border-slate-300/70 font-medium rounded-full px-3 py-1 rounded-full text-xs font-mono">
            <ShieldCheck className="w-4 h-4" /> IEEE 830 Verified Architecture
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Welcome to <span className="text-slate-900 font-medium tracking-tight">fine</span>
          </h1>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-xl mx-auto">
            High-performance single-page web app built with React, Tailwind CSS, and Apple Bento Grid design system.
          </p>

          {/* Interactive Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                placeholder="Filter features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:border-slate-400 rounded-xl placeholder:text-slate-400 outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setCounterCount(c => c + 1)}
              className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-medium shadow-md px-5 py-2.5 text-xs shrink-0 cursor-pointer"
            >
              Action (+{counterCount})
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 mt-10">
          {features
            .filter((f) => f.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((item) => (
              <div key={item.id} className="bg-white border border-slate-200/90 shadow-md hover:shadow-xl rounded-3xl p-6 transition-all text-slate-900 group">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-slate-200/60 text-slate-800 border border-slate-300/70 font-medium rounded-full px-2.5 py-0.5 text-[10px]">
                    Feature #0${item.id}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-extrabold text-lg mb-2">${item.title}</h3>
                <p className="text-xs opacity-80 leading-relaxed">${item.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform cursor-pointer">
                  <span>Explore module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}