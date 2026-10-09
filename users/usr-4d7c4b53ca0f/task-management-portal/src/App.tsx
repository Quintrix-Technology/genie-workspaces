import React, { useState } from 'react';
import { Sparkles, Search, Layers, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

// Production React Component scaffolded by Genie AI
// Project: task management portal
// Design System: Minimalist Mono Serif Studio (Monocle & Pentagram Inspired)
// Awwwards Style: Monochrome design studio layout combining serif headlines & stark wireframes.

export default function taskmanagementportalApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [counterCount, setCounterCount] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");

  const features = [
    { id: 1, title: "make only for task creation and due date reminder", desc: "make only for task creation and due date reminder" },
    { id: 2, title: "without account", desc: "without account" },
    { id: 3, title: "no task details and end date", desc: "no task details and end date" },
    { id: 4, title: "ask task jname and end date", desc: "ask task jname and end date" },
    { id: 5, title: "no currently  not ", desc: "no currently  not " },
    { id: 6, title: "yes", desc: "yes" },
    { id: 7, title: "yes ", desc: "yes " },
    { id: 8, title: "yes", desc: "yes" }
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-serif font-sans p-6 sm:p-10 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6 border-b border-stone-800 bg-stone-950 px-6 py-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-950 font-sans font-bold hover:bg-white text-xs px-5 py-2.5 uppercase tracking-widest flex items-center justify-center font-bold text-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-stone-100">task management portal</span>
            <span className="block text-[10px] font-mono text-slate-400">Minimalist Mono Serif Studio System</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block bg-stone-800 text-stone-300 font-sans border border-stone-700 text-[10px] uppercase tracking-widest px-3 py-1 text-[11px]">
            Studio Editorial
          </span>
          <button className="bg-stone-100 text-stone-950 font-sans font-bold hover:bg-white text-xs px-5 py-2.5 uppercase tracking-widest px-4 py-2 text-xs">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto mt-12 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-stone-800 text-stone-300 font-sans border border-stone-700 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full text-xs font-mono">
            <ShieldCheck className="w-4 h-4" /> IEEE 830 Verified Architecture
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Welcome to <span className="text-stone-100 font-serif italic tracking-tight">task management portal</span>
          </h1>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-xl mx-auto">
            High-performance single-page web app built with React, Tailwind CSS, and Minimalist Mono Serif Studio design system.
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
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-stone-900 border border-stone-800 text-white font-serif focus:border-stone-400 placeholder:text-stone-600 outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setCounterCount(c => c + 1)}
              className="bg-stone-100 text-stone-950 font-sans font-bold hover:bg-white text-xs px-5 py-2.5 uppercase tracking-widest px-5 py-2.5 text-xs shrink-0 cursor-pointer"
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
              <div key={item.id} className="bg-stone-900 border border-stone-800 hover:border-stone-500 text-stone-100 p-6 transition-colors group">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-stone-800 text-stone-300 font-sans border border-stone-700 text-[10px] uppercase tracking-widest px-2.5 py-0.5 text-[10px]">
                    Feature #0${item.id}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-stone-300" />
                </div>
                <h3 className="font-extrabold text-lg mb-2">${item.title}</h3>
                <p className="text-xs opacity-80 leading-relaxed">${item.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-stone-300 group-hover:translate-x-1 transition-transform cursor-pointer">
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