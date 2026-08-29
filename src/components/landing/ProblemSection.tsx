import React, { useState } from 'react';
import {
  AlertTriangle,
  Flame,
  Truck,
  Layers,
  ArrowRight,
  TrendingUp,
  XCircle,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const ProblemSection: React.FC = () => {
  const [wasteFillLevel, setWasteFillLevel] = useState(70);

  const problemCards = [
    {
      id: 1,
      title: 'Poor Source Segregation',
      stat: '~62%',
      statLabel: 'Waste dumped unsegregated (Municipal baseline estimate)',
      desc: 'Organic kitchen waste mixes with plastics and toxic inerts, rendering high-energy organic biomass unrecoverable for anaerobic digestion.',
      icon: <Layers className="w-6 h-6 text-rose-400" />,
      tag: 'Critical Bottleneck',
    },
    {
      id: 2,
      title: 'Fixed Collection Routes',
      stat: '38%',
      statLabel: 'Wasted transit fuel & empty truck miles',
      desc: 'Traditional municipal diesel trucks follow static daily schedules, visiting empty bins while overflowing organic hotspots remain uncollected.',
      icon: <Truck className="w-6 h-6 text-amber-400" />,
      tag: 'Logistical Inefficiency',
    },
    {
      id: 3,
      title: 'Organic Waste to Landfills',
      stat: '1.58 kg',
      statLabel: 'CO2e methane fugitive emission per kg food dumped',
      desc: 'Anaerobic decomposition in open municipal landfills emits potent methane gas (28x GWP of CO2) directly into the atmosphere without energy capture.',
      icon: <Flame className="w-6 h-6 text-orange-400" />,
      tag: 'Emissions Hazard',
    },
    {
      id: 4,
      title: 'Wasted Energy Potential',
      stat: '0.06 m³',
      statLabel: 'Lost Biogas potential per kg bio-waste',
      desc: 'Valuable chemical energy that could power community microgrid electricity, campus streetlights, and clean cooking fuel is completely wasted in dumps.',
      icon: <XCircle className="w-6 h-6 text-red-400" />,
      tag: 'Lost Resource',
    },
  ];

  const scrollToSolution = () => {
    const el = document.getElementById('solution-pipeline');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="problem-section" className="py-20 sm:py-24 relative bg-dark-900 border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            The Decentralized Waste Crisis
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mb-4">
            Every Day, Valuable Waste Is Lost.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Conventional waste systems treat organic matter as a burden rather than a community energy asset.
            Without source tracking and localized routing, tons of energy-rich bio-waste end up polluting open landfills.
          </p>
        </div>

        {/* Interactive Problem Simulation Card */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-dark-850/80 backdrop-blur-xl border border-white/10 shadow-2xl relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                Community Accumulation Simulation
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Unsorted Municipal Waste Flow vs. Landfill Surge
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                As community sectors generate mixed household and commercial waste, fixed-route trucks fail to prioritize organic streams, causing rapid dumpsite overflow.
              </p>

              {/* Interactive Slider */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Simulated Community Load</span>
                  <span className="text-amber-400 font-bold">{wasteFillLevel}% Capacity</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={wasteFillLevel}
                  onChange={(e) => setWasteFillLevel(Number(e.target.value))}
                  className="w-full h-2 bg-dark-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Continuous empirical metrics for municipal source segregation and methane mitigation.</span>
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="w-full md:w-80 p-5 rounded-2xl bg-dark-900 border border-rose-500/20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative w-32 h-40 bg-dark-950 rounded-xl border-2 border-slate-700 overflow-hidden flex flex-col justify-end p-2">
                {/* Waste Filling Fill Level */}
                <div
                  className="w-full bg-gradient-to-t from-rose-900/90 via-amber-700/80 to-amber-500/60 rounded-lg transition-all duration-300 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-inner"
                  style={{ height: `${wasteFillLevel}%` }}
                >
                  {wasteFillLevel >= 50 && 'LANDFILL OVERFLOW'}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                  Traditional Landfill Fate
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {(wasteFillLevel * 24.5).toFixed(0)} kg bio-waste leaking methane
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Problem Diagnostic Cards Grid with 3D Hover & Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problemCards.map((card) => (
            <div
              key={card.id}
              className="p-6 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-white/10 hover:border-rose-400/60 hover:shadow-2xl hover:shadow-rose-500/20 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3.5 rounded-xl bg-dark-900 border border-white/15 group-hover:scale-110 group-hover:border-rose-400/50 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.35)] transition-all duration-300">
                    {card.icon}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold group-hover:border-rose-400 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                    {card.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2 group-hover:text-rose-200 transition-colors">{card.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{card.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-2xl font-black font-mono text-white group-hover:text-rose-400 transition-colors flex items-baseline gap-1">
                  <span>{card.stat}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{card.statLabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Transition Prompt to Solution */}
        <div className="text-center">
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-eco-500/30 via-cyan-500/30 to-amber-500/30">
            <div className="px-8 py-5 rounded-[14px] bg-dark-950 flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-sm sm:text-base font-bold text-slate-100">
                What if community waste could become a <span className="text-eco-400">clean decentralized energy resource</span>?
              </span>
              <button
                onClick={scrollToSolution}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-eco-500 hover:bg-eco-400 text-dark-950 font-bold text-xs shadow-lg shadow-eco-500/20 transition-all shrink-0"
              >
                <span>See The Solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
