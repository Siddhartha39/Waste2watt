import React, { useState } from 'react';
import {
  Route,
  Truck,
  ArrowRight,
  Zap,
  TrendingDown,
  Navigation,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Info
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const SmartRoutingSection: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [routeMode, setRouteMode] = useState<'smart' | 'traditional'>('smart');

  return (
    <section className="py-24 relative bg-dark-900 border-t border-white/10 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Toggle */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Route className="w-3.5 h-3.5" />
              Stage 3: Algorithmic Route Optimization
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              3. Collect Smarter, Not Farther
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Our Traveling Collector Solver clusters nearby bio-waste pickups, calculates optimal stop sequences, and routes electric collection vehicles straight to the nearest anaerobic digester plant.
            </p>

            {/* Side-by-Side Mode Toggle */}
            <div className="p-1 rounded-2xl bg-dark-950 border border-white/10 flex items-center max-w-sm">
              <button
                onClick={() => setRouteMode('smart')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  routeMode === 'smart'
                    ? 'bg-gradient-to-r from-eco-500 to-cyan-500 text-dark-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Waste2Watt AI Route</span>
              </button>
              <button
                onClick={() => setRouteMode('traditional')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  routeMode === 'traditional'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Traditional Route</span>
              </button>
            </div>

            {/* Comparative Stats */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-dark-850 border border-white/5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Transit Distance</div>
                <div className="text-xl font-black font-mono text-white mt-1">
                  {routeMode === 'smart' ? '11.2 km' : '18.4 km'}
                </div>
                <div className="text-[10px] text-eco-400 font-mono mt-0.5">
                  {routeMode === 'smart' ? '↓ 39% Mileage Saved' : 'Inefficient Fixed Path'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-dark-850 border border-white/5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Collection Time</div>
                <div className="text-xl font-black font-mono text-white mt-1">
                  {routeMode === 'smart' ? '36 mins' : '62 mins'}
                </div>
                <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                  {routeMode === 'smart' ? 'Direct Digester Link' : '26 mins Idle Delay'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Algorithmic dynamic dispatch model for zero-emission community collection fleets.</span>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('smart-route')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all"
              >
                <span>Launch Smart Route Solver</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Simulation */}
          <div className="lg:col-span-7">
            <div className="relative h-[420px] rounded-3xl bg-dark-950 border border-indigo-500/30 p-5 shadow-2xl overflow-hidden flex flex-col justify-between">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>EV Truck #01 (Rajesh Kumar) — Sector A</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-eco-500/10 text-eco-400 border border-eco-500/30">
                  {routeMode === 'smart' ? 'AI Optimized Path' : 'Fixed Unoptimized Schedule'}
                </span>
              </div>

              {/* Dynamic Path Graphic */}
              <div className="relative flex-1 flex items-center justify-center my-4">
                <svg className="w-full h-full" viewBox="0 0 500 240" fill="none">
                  {/* Background Grid Lines */}
                  <line x1="20" y1="40" x2="480" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="20" y1="120" x2="480" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="20" y1="200" x2="480" y2="200" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                  {routeMode === 'smart' ? (
                    <>
                      {/* Optimized Dynamic Path */}
                      <path
                        d="M 50 180 Q 150 60 250 140 T 450 60"
                        stroke="#22c55e"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                        className="drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                      />
                      {/* Animated traveling dot along path */}
                      <circle cx="250" cy="140" r="8" fill="#4ade80" className="animate-ping" />
                      <circle cx="250" cy="140" r="6" fill="#22c55e" />
                    </>
                  ) : (
                    <>
                      {/* Unoptimized Traditional Winding Path */}
                      <path
                        d="M 50 180 L 100 40 L 200 200 L 320 50 L 390 190 L 450 60"
                        stroke="#f43f5e"
                        strokeWidth="3"
                        strokeDasharray="6 6"
                        fill="none"
                        opacity="0.7"
                      />
                    </>
                  )}

                  {/* Stop Points */}
                  <circle cx="50" cy="180" r="10" fill="#090d16" stroke="#06b6d4" strokeWidth="3" />
                  <text x="45" y="210" fill="#94a3b8" fontSize="10" fontFamily="monospace">Depot</text>

                  <circle cx="250" cy="140" r="10" fill="#090d16" stroke="#22c55e" strokeWidth="3" />
                  <text x="220" y="170" fill="#22c55e" fontSize="10" fontFamily="monospace">Stop 1 (Mess)</text>

                  <circle cx="450" cy="60" r="12" fill="#090d16" stroke="#f59e0b" strokeWidth="3" />
                  <text x="400" y="90" fill="#f59e0b" fontSize="10" fontFamily="monospace">Biogas Plant</text>
                </svg>
              </div>

              {/* Bottom Real-time Dispatch Panel */}
              <div className="p-3 rounded-2xl bg-dark-900 border border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-[9px] font-mono text-slate-400">Pending Requests</div>
                  <div className="text-sm font-bold text-white font-mono">18 Active</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-400">High Priority</div>
                  <div className="text-sm font-bold text-rose-400 font-mono">6 Critical</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-400">Target Feedstock</div>
                  <div className="text-sm font-bold text-eco-400 font-mono">142 kg Organic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
