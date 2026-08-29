import React from 'react';
import {
  Zap,
  BatteryCharging,
  Flame,
  Activity,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Home,
  Sun,
  Truck,
  Layers
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const EnergyDashboardPage: React.FC = () => {
  const { energyGrid, setCurrentPage } = useAppStore();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-energy-glow/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              Decentralized Microgrid Dispatch
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              Clean Energy Generation & Microgrid Distribution
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Combined Heat & Power (CHP) biogas turbine converting community methane into resilient local electricity.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('impact')}
            className="px-5 py-2.5 rounded-xl bg-eco-500 hover:bg-eco-400 text-dark-950 font-bold text-xs shadow-lg shadow-eco-500/20 transition-all flex items-center gap-2"
          >
            <span>View Environmental Carbon ROI →</span>
          </button>
        </div>

        {/* 4 Core Microgrid KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-dark-900 border border-amber-500/30 space-y-2">
            <div className="text-[10px] font-mono text-amber-400 uppercase">Instantaneous Generation</div>
            <div className="text-3xl font-black font-mono text-amber-400">{energyGrid.instantaneousKw} kW</div>
            <div className="text-[11px] text-slate-400">CHP Turbine (3,000 RPM Synchronous)</div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Total Electricity Today</div>
            <div className="text-3xl font-black font-mono text-white">{energyGrid.totalKwhToday} kWh</div>
            <div className="text-[11px] text-eco-400 font-mono">100% Bio-Renewable Methane</div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-cyan-500/30 space-y-2">
            <div className="text-[10px] font-mono text-cyan-400 uppercase">Battery Storage (BESS)</div>
            <div className="text-3xl font-black font-mono text-cyan-400">{energyGrid.batteryStoragePercent}%</div>
            <div className="text-[11px] text-slate-400 font-mono">{energyGrid.currentBatteryKwh} / {energyGrid.batteryCapacityKwh} kWh Capacity</div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Surplus Grid Export</div>
            <div className="text-3xl font-black font-mono text-emerald-400">{energyGrid.gridExportKw} kW</div>
            <div className="text-[11px] text-slate-400">Net-Metered Regional Feed-in</div>
          </div>
        </div>

        {/* Microgrid Community Distribution Loads */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Real-Time Campus & Community Connected Microgrid Loads
            </span>
            <span className="text-[10px] font-mono text-eco-400">Total Active Load: 38.4 kW</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {energyGrid.microgridLoads.map((ld, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-dark-950 border border-white/5 hover:border-amber-500/30 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-dark-900 border border-white/10 text-amber-400">
                    {i === 0 ? <Sun className="w-5 h-5" /> : i === 1 ? <Home className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                    {ld.status}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{ld.name}</div>
                  <div className="text-2xl font-black font-mono text-energy-light mt-1">{ld.loadKw} kW</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Powered 100% by Waste2Watt Biogas</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
