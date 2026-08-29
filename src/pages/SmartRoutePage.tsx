import React from 'react';
import {
  Route,
  Truck,
  Navigation,
  CheckCircle2,
  Clock,
  Zap,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  Flame,
  RotateCcw,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const SmartRoutePage: React.FC = () => {
  const {
    currentRoute,
    generateSmartRoute,
    advanceRouteProgress,
    setCurrentPage,
    setActiveReportId
  } = useAppStore();

  const route = currentRoute || generateSmartRoute('col-1');

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-indigo-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Route className="w-3.5 h-3.5" />
              Dynamic TSP Route Optimization
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              Smart Collection Dispatch & Navigation
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              AI recalculates stop sequences to prioritize high-yield organic bio-waste directly into the digester.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={advanceRouteProgress}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-eco-500 to-cyan-500 text-dark-950 font-bold text-xs shadow-lg shadow-eco-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Truck className="w-4 h-4" />
              <span>Simulate Truck Navigation Step</span>
            </button>
          </div>
        </div>

        {/* Route Optimization Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Optimized Distance</div>
            <div className="text-2xl font-black font-mono text-emerald-400">{route.totalDistanceKm} km</div>
            <div className="text-[11px] text-slate-400 font-mono">Traditional: {route.traditionalDistanceKm} km</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Estimated Travel Time</div>
            <div className="text-2xl font-black font-mono text-white">{route.estimatedDurationMins} mins</div>
            <div className="text-[11px] text-cyan-400 font-mono">↓ 26 mins transit reduction</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Distance Mileage Saved</div>
            <div className="text-2xl font-black font-mono text-cyan-400">{route.distanceSavedKm} km</div>
            <div className="text-[11px] text-eco-400 font-mono">39.1% Total Route Efficiency</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">EV Battery Consumption</div>
            <div className="text-2xl font-black font-mono text-energy-light">4.2 kWh</div>
            <div className="text-[11px] text-slate-400 font-mono">Zero tailpipe greenhouse gas</div>
          </div>
        </div>

        {/* Itinerary Steps & Interactive Path Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Interactive Stop-by-Stop List */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Sequential Collection Itinerary:
            </div>

            {route.stops.map((stop) => {
              const isDone = stop.status === 'completed';
              const isArrived = stop.status === 'arrived';
              return (
                <div
                  key={stop.stopNumber}
                  className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                    isArrived
                      ? 'bg-cyan-500/15 border-cyan-400 ring-2 ring-cyan-500/30'
                      : isDone
                      ? 'bg-dark-900/60 border-emerald-500/30 opacity-75'
                      : 'bg-dark-900 border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        isDone
                          ? 'bg-emerald-500 text-dark-950'
                          : isArrived
                          ? 'bg-cyan-400 text-dark-950 animate-pulse'
                          : 'bg-dark-800 text-slate-400'
                      }`}
                    >
                      {isDone ? '✓' : `0${stop.stopNumber}`}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{stop.reportId}</span>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-dark-950 text-slate-300">
                          {stop.wasteType}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1">{stop.address}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {stop.quantityKg > 0 ? `${stop.quantityKg} kg Feedstock` : 'Final Destination Plant'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {isArrived && (
                      <button
                        onClick={() => {
                          setActiveReportId(stop.reportId);
                          setCurrentPage('verification');
                        }}
                        className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-[11px] shadow-sm"
                      >
                        Verify Pickup →
                      </button>
                    )}
                    {isDone && (
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        COLLECTED
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Path Schematic Visualization */}
          <div className="lg:col-span-6">
            <div className="p-6 rounded-3xl bg-dark-900 border border-indigo-500/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  Live GPS Turn-by-Turn Telemetry
                </span>
                <span className="text-[10px] font-mono text-eco-400">Status: {route.status.toUpperCase()}</span>
              </div>

              {/* Graphical Path View */}
              <div className="relative h-64 rounded-2xl bg-dark-950 border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-40" />

                <div className="relative z-10 space-y-2">
                  <div className="text-[10px] font-mono text-cyan-400">Current Leg: Sector A Mess → Digester Tank #1</div>
                  <div className="text-xs text-slate-200">Proceed 450m on Brahmaputra Corridor and turn left at Bio-Energy Hub.</div>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
                  <span className="text-slate-400">Next Destination: Central Biogas Facility</span>
                  <span className="text-emerald-400 font-bold">ETA: 4 mins</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('verification')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]"
              >
                Proceed to Scale Weight Verification →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
