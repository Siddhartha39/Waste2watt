import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Leaf,
  Flame,
  Zap,
  PlayCircle,
  BarChart3,
  PlusCircle
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const FinalCTASection: React.FC = () => {
  const { setCurrentPage, setJuryDemoOpen } = useAppStore();

  return (
    <section className="py-28 relative bg-dark-950 border-t border-white/10 overflow-hidden text-center">
      {/* Dynamic Background Circular Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-eco-500/20 via-cyan-500/15 to-energy-glow/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-eco-500/10 border border-eco-500/30 text-eco-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Join the Decentralized Bio-Energy Revolution</span>
        </div>

        {/* Big Heading */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight">
          Your Waste Has More Value Than You Think.
        </h2>

        {/* Subheading */}
        <p className="text-lg sm:text-2xl font-display font-bold text-slate-200">
          <span className="text-eco-400">Report.</span>{' '}
          <span className="text-cyan-400">Collect.</span>{' '}
          <span className="text-amber-400">Convert.</span>{' '}
          <span className="text-energy-light">Power.</span>
        </p>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Engineered for smart campuses, municipalities, and sustainable circular communities.
          Every reporting action directly powers community microgrids and prevents toxic landfill emissions.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              setCurrentPage('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-eco-500 via-emerald-500 to-cyan-500 text-dark-950 font-black text-sm shadow-2xl shadow-eco-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Waste Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setCurrentPage('citizen');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-white/10 text-white font-bold text-sm transition-all hover:border-eco-500/40"
          >
            <span>Explore Citizen Dashboard</span>
          </button>

          <button
            onClick={() => {
              setCurrentPage('impact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-7 py-4 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-eco-500/40 text-eco-300 font-bold text-sm shadow-lg shadow-eco-500/10 transition-all"
          >
            <BarChart3 className="w-4 h-4 text-eco-400" />
            <span>View Community Impact</span>
          </button>
        </div>
      </div>
    </section>
  );
};
