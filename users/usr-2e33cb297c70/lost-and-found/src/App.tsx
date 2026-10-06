import React, { useState } from 'react';
import { Sparkles, Search, Layers, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

// Production React Component scaffolded by Genie AI
// Project: lost and found
// Design System: Pastel Mint 3D Soft Clay (Headspace & Notion 3D Inspired)
// Awwwards Style: Soft mint pastel 3D convex card design with tactile pill shadows.

export default function lostandfoundApp() {
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
    <div className="min-h-screen bg-emerald-50/60 text-slate-800 font-sans font-sans p-6 sm:p-10 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6 bg-white/80 backdrop-blur-xl border border-emerald-100 shadow-sm rounded-3xl px-6 py-3 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white rounded-2xl font-extrabold hover:bg-emerald-600 shadow-[0_6px_20px_rgba(16,185,129,0.3)] text-xs px-5 py-2.5 flex items-center justify-center font-bold text-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-800">lost and found</span>
            <span className="block text-[10px] font-mono text-slate-400">Pastel Mint 3D Soft Clay System</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px] px-3 py-1 text-[11px]">
            Pastel 3D
          </span>
          <button className="bg-emerald-500 text-white rounded-2xl font-extrabold hover:bg-emerald-600 shadow-[0_6px_20px_rgba(16,185,129,0.3)] text-xs px-5 py-2.5 px-4 py-2 text-xs">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto mt-12 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px] px-3 py-1 rounded-full text-xs font-mono">
            <ShieldCheck className="w-4 h-4" /> IEEE 830 Verified Architecture
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Welcome to <span className="text-emerald-600 font-extrabold">lost and found</span>
          </h1>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-xl mx-auto">
            High-performance single-page web app built with React, Tailwind CSS, and Pastel Mint 3D Soft Clay design system.
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
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-emerald-100/40 border border-emerald-200 text-slate-800 rounded-2xl focus:bg-white focus:border-emerald-400 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setCounterCount(c => c + 1)}
              className="bg-emerald-500 text-white rounded-2xl font-extrabold hover:bg-emerald-600 shadow-[0_6px_20px_rgba(16,185,129,0.3)] text-xs px-5 py-2.5 px-5 py-2.5 text-xs shrink-0 cursor-pointer"
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
              <div key={item.id} className="bg-white/90 border border-emerald-100 shadow-[0_12px_28px_-6px_rgba(16,185,129,0.12)] rounded-3xl p-6 text-slate-800 hover:-translate-y-1 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px] px-2.5 py-0.5 text-[10px]">
                    Feature #0${item.id}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <h3 className="font-extrabold text-lg mb-2">${item.title}</h3>
                <p className="text-xs opacity-80 leading-relaxed">${item.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-500 group-hover:translate-x-1 transition-transform cursor-pointer">
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