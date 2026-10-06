import React, { useState } from 'react';
import { Sparkles, Search, Layers, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

// Production React Component scaffolded by Genie AI
// Project: lost and found
// Design System: Minimal Warm Sand & Clay (Kinfolk & Architectural Digest Inspired)
// Awwwards Style: Warm organic travertine stone texture paired with clean typography.

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
    <div className="min-h-screen bg-[#f7f3eb] text-stone-900 font-sans font-sans p-6 sm:p-10 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6 border-b border-stone-300/80 bg-[#f7f3eb]/90 backdrop-blur-md px-6 py-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-900 text-stone-100 font-medium hover:bg-amber-950 shadow-sm text-xs px-5 py-2.5 rounded-xl flex items-center justify-center font-bold text-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-stone-800">lost and found</span>
            <span className="block text-[10px] font-mono text-slate-400">Minimal Warm Sand & Clay System</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block bg-amber-900/10 text-amber-900 border border-amber-900/20 font-mono text-[10px] rounded-md px-3 py-1 text-[11px]">
            Architectural
          </span>
          <button className="bg-amber-900 text-stone-100 font-medium hover:bg-amber-950 shadow-sm text-xs px-5 py-2.5 rounded-xl px-4 py-2 text-xs">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto mt-12 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-900/10 text-amber-900 border border-amber-900/20 font-mono text-[10px] rounded-md px-3 py-1 rounded-full text-xs font-mono">
            <ShieldCheck className="w-4 h-4" /> IEEE 830 Verified Architecture
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Welcome to <span className="text-amber-900 font-bold tracking-tight">lost and found</span>
          </h1>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-xl mx-auto">
            High-performance single-page web app built with React, Tailwind CSS, and Minimal Warm Sand & Clay design system.
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
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#eee7dc] border border-stone-300 text-stone-900 focus:border-amber-900 placeholder:text-stone-400 rounded-xl outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setCounterCount(c => c + 1)}
              className="bg-amber-900 text-stone-100 font-medium hover:bg-amber-950 shadow-sm text-xs px-5 py-2.5 rounded-xl px-5 py-2.5 text-xs shrink-0 cursor-pointer"
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
              <div key={item.id} className="bg-[#eee7dc] border border-stone-300/70 shadow-sm hover:shadow-md text-stone-900 p-6 transition-all rounded-2xl group">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-amber-900/10 text-amber-900 border border-amber-900/20 font-mono text-[10px] rounded-md px-2.5 py-0.5 text-[10px]">
                    Feature #0${item.id}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-amber-700" />
                </div>
                <h3 className="font-extrabold text-lg mb-2">${item.title}</h3>
                <p className="text-xs opacity-80 leading-relaxed">${item.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:translate-x-1 transition-transform cursor-pointer">
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