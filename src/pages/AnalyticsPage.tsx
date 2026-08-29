import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Flame,
  Zap,
  Leaf,
  Layers,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const weeklyData = [
    { day: 'Mon', wasteKg: 320, biogasM3: 19.8, energyKwh: 48.2 },
    { day: 'Tue', wasteKg: 380, biogasM3: 23.5, energyKwh: 57.4 },
    { day: 'Wed', wasteKg: 340, biogasM3: 21.0, energyKwh: 51.3 },
    { day: 'Thu', wasteKg: 410, biogasM3: 25.4, energyKwh: 62.0 },
    { day: 'Fri', wasteKg: 460, biogasM3: 28.5, energyKwh: 69.5 },
    { day: 'Sat', wasteKg: 520, biogasM3: 32.2, energyKwh: 78.6 },
    { day: 'Sun', wasteKg: 480, biogasM3: 29.7, energyKwh: 72.5 },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              Decentralized Analytics Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              Bio-Conversion Yield & Fleet Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Deep correlation tracking between collected organic biomass mass and net microgrid electrical output.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-dark-900 p-1.5 rounded-2xl border border-white/10 text-xs">
            {(['daily', 'weekly', 'monthly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 rounded-xl capitalize font-semibold transition-all ${
                  timeframe === t
                    ? 'bg-eco-500 text-dark-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Time-Series Visual Chart */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-eco-400" />
              Weekly Feedstock Collection (kg) vs. Electricity Output (kWh)
            </span>
            <span className="text-[10px] font-mono text-cyan-400">Mean Efficiency: 0.24 kWh/kg</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 pt-8 px-2">
            {weeklyData.map((d, i) => {
              const wasteHeight = (d.wasteKg / 550) * 100;
              const energyHeight = (d.energyKwh / 85) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {/* Waste Bar (kg) */}
                    <div
                      className="w-1/2 max-w-[28px] bg-gradient-to-t from-emerald-700 to-emerald-400 rounded-t-lg transition-all group-hover:brightness-125"
                      style={{ height: `${wasteHeight}%` }}
                      title={`${d.day}: ${d.wasteKg} kg waste`}
                    />
                    {/* Energy Bar (kWh) */}
                    <div
                      className="w-1/2 max-w-[28px] bg-gradient-to-t from-amber-600 to-energy-light rounded-t-lg transition-all group-hover:brightness-125"
                      style={{ height: `${energyHeight}%` }}
                      title={`${d.day}: ${d.energyKwh} kWh power`}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-white transition-colors">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs border-t border-white/5 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-400" />
              <span className="text-slate-300">Organic Biomass (kg)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-400" />
              <span className="text-slate-300">Microgrid Electricity Generated (kWh)</span>
            </div>
          </div>
        </div>

        {/* 3 Core Analytical Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-eco-400 uppercase">Conversion Correlation (R²)</div>
            <div className="text-2xl font-black font-mono text-white">0.962 (Near Perfect)</div>
            <p className="text-xs text-slate-400">Strict temperature and pH control ensures linear methanogenesis yields.</p>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-cyan-400 uppercase">Peak Generation Window</div>
            <div className="text-2xl font-black font-mono text-cyan-400">12:30 PM - 03:00 PM</div>
            <p className="text-xs text-slate-400">Directly correlates with post-lunch canteen waste digestion cycles.</p>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-amber-400 uppercase">Fleet Fuel Displacement</div>
            <div className="text-2xl font-black font-mono text-amber-400">173.5 Litres Diesel</div>
            <p className="text-xs text-slate-400">Replaced by decentralized EV tipper trucks powered by on-site microgrid.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
