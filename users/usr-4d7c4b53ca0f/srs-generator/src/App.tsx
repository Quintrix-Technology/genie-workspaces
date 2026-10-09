import React, { useState } from 'react';
import { Sparkles, Search, Layers, Zap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

// Production React Component scaffolded by Genie AI
// Project: SRS generator
// Design System: Frosted Quartz Glass (Apple VisionOS & Light Mode Glass)
// Awwwards Style: VisionOS translucent quartz glass aesthetic with heavy backdrop blurs.

export default function SRSgeneratorApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [counterCount, setCounterCount] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");

  const features = [
    { id: 1, title: "let's take a only for current days English language and then", desc: "let's take a only for current days English language and then it create only PDF file which is downloadable" },
    { id: 2, title: "yes", desc: "yes" },
    { id: 3, title: "currently no", desc: "currently no" },
    { id: 4, title: "no", desc: "no" },
    { id: 5, title: "no", desc: "no" },
    { id: 6, title: "yes", desc: "yes" },
    { id: 7, title: "yes", desc: "yes" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-sky-100 text-slate-900 font-sans p-6 sm:p-10 transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6 bg-white/40 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-sm px-6 py-3 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 text-xs px-5 py-2.5 flex items-center justify-center font-bold text-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900">SRS generator</span>
            <span className="block text-[10px] font-mono text-slate-400">Frosted Quartz Glass System</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block bg-indigo-100/80 text-indigo-700 border border-indigo-200/80 rounded-full font-semibold text-[10px] px-3 py-1 text-[11px]">
            VisionOS
          </span>
          <button className="bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 text-xs px-5 py-2.5 px-4 py-2 text-xs">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto mt-12 space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-100/80 text-indigo-700 border border-indigo-200/80 rounded-full font-semibold text-[10px] px-3 py-1 rounded-full text-xs font-mono">
            <ShieldCheck className="w-4 h-4" /> IEEE 830 Verified Architecture
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-600 font-extrabold">SRS generator</span>
          </h1>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-xl mx-auto">
            High-performance single-page web app built with React, Tailwind CSS, and Frosted Quartz Glass design system.
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
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-white/60 border border-slate-200 text-slate-900 rounded-xl focus:bg-white focus:border-indigo-500 placeholder:text-slate-400 outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setCounterCount(c => c + 1)}
              className="bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 text-xs px-5 py-2.5 px-5 py-2.5 text-xs shrink-0 cursor-pointer"
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
              <div key={item.id} className="bg-white/50 backdrop-blur-2xl border border-white/90 shadow-[0_20px_40px_-15px_rgba(79,70,229,0.1)] hover:shadow-2xl text-slate-900 rounded-3xl p-6 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-indigo-100/80 text-indigo-700 border border-indigo-200/80 rounded-full font-semibold text-[10px] px-2.5 py-0.5 text-[10px]">
                    Feature #0${item.id}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                </div>
                <h3 className="font-extrabold text-lg mb-2">${item.title}</h3>
                <p className="text-xs opacity-80 leading-relaxed">${item.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform cursor-pointer">
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