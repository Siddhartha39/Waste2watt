import React, { useState } from 'react';
import {
  Flame,
  Zap,
  Gauge,
  Thermometer,
  Activity,
  Droplets,
  Wind,
  PlusCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Info
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const BiogasPlantPage: React.FC = () => {
  const { digesters, feedOrganicBatch, setCurrentPage } = useAppStore();
  const [activeTankIndex, setActiveTankIndex] = useState<number>(0);
  const [feedBatchKg, setFeedBatchKg] = useState<number>(35.0);
  const [feedSuccessNotice, setFeedSuccessNotice] = useState<string | null>(null);

  const tank = digesters[activeTankIndex];

  const handleFeedBatch = () => {
    const res = feedOrganicBatch(tank.tankId, feedBatchKg);
    setFeedSuccessNotice(`Batch of ${feedBatchKg} kg digested! Generated +${res.biogasM3} m³ raw Biogas and +${res.electricityKwh} kWh Clean Microgrid Electricity.`);
    setTimeout(() => setFeedSuccessNotice(null), 5000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-energy-glow/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              Anaerobic Methanogenesis Facility
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              Central Biogas Plant Telemetry & Digesters
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live continuous monitoring of anaerobic digestion tanks, biochemical gas composition, and pressure dynamics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('energy')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-eco-500 text-dark-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Open Energy Grid Dashboard →</span>
            </button>
          </div>
        </div>

        {/* Tank Selector Tabs */}
        <div className="flex items-center gap-3">
          {digesters.map((d, idx) => (
            <button
              key={d.tankId}
              onClick={() => setActiveTankIndex(idx)}
              className={`px-5 py-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                activeTankIndex === idx
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-dark-900 text-slate-400 hover:text-white border-white/5'
              }`}
            >
              <Flame className={`w-5 h-5 ${activeTankIndex === idx ? 'text-amber-400' : 'text-slate-500'}`} />
              <div>
                <div className="text-xs font-bold">{d.tankName.split('(')[0]}</div>
                <div className="text-[10px] font-mono text-slate-400">{d.digesterStatus} • {d.dailyBiogasM3} m³ Today</div>
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Feedback Banner if just fed */}
        {feedSuccessNotice && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{feedSuccessNotice}</span>
          </div>
        )}

        {/* 6 Core Bio-Telemetry Gauge Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Thermometer className="w-4 h-4 text-rose-400" /> Internal Temperature</span>
              <span className="text-[10px] font-mono text-eco-400 bg-eco-500/10 px-2 py-0.5 rounded-full">Mesophilic</span>
            </div>
            <div className="text-3xl font-black font-mono text-white">{tank.temperatureC} °C</div>
            <div className="text-[10px] text-slate-400 font-mono">Target: 37.0 - 38.0 °C (Automated Jacket Heat)</div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Gauge className="w-4 h-4 text-cyan-400" /> Gas Pressure</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">Nominal</span>
            </div>
            <div className="text-3xl font-black font-mono text-cyan-400">{tank.pressureBar} bar</div>
            <div className="text-[10px] text-slate-400 font-mono">Safety Relief Threshold: 1.80 bar</div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Wind className="w-4 h-4 text-amber-400" /> Gas Flow Velocity</span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Live Flow</span>
            </div>
            <div className="text-3xl font-black font-mono text-amber-400">{tank.gasFlowLpm} L/min</div>
            <div className="text-[10px] text-slate-400 font-mono">Piped to CHP Generator Turbine</div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-emerald-400" /> Methane Concentration (CH₄)</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">High Purity</span>
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400">{tank.methanePercent}%</div>
            <div className="text-[10px] text-slate-400 font-mono">CO₂ Balance: {tank.co2Percent}% (H₂S Scrubbed)</div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4 text-blue-400" /> Digestate pH Level</span>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">Neutral</span>
            </div>
            <div className="text-3xl font-black font-mono text-white">{tank.ph}</div>
            <div className="text-[10px] text-slate-400 font-mono">VFA/TIC Buffer Index: 0.24 (Stable)</div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-purple-400" /> Digestate Slurry Mass</span>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Fill 76%</span>
            </div>
            <div className="text-3xl font-black font-mono text-white">{tank.currentSlurryKg} / {tank.capacityKg} kg</div>
            <div className="text-[10px] text-slate-400 font-mono">Retention: {tank.hydraulicRetentionDays} days hydraulic</div>
          </div>
        </div>

        {/* Live Batch Feeder Simulation Console */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-amber-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-amber-400" />
              Manual / Simulated Batch Feed Injection
            </span>
            <span className="text-[10px] font-mono text-slate-400">Last Batch: {tank.lastFedTimestamp}</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Organic Slurry Feed Quantity:</span>
              <span className="text-amber-400 font-bold">{feedBatchKg} kg</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={feedBatchKg}
              onChange={(e) => setFeedBatchKg(Number(e.target.value))}
              className="w-full h-2 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <button
            onClick={handleFeedBatch}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-energy-glow to-eco-500 text-dark-950 font-black text-xs shadow-xl shadow-amber-500/30 hover:scale-[1.01] active:scale-98 transition-all"
          >
            Feed {feedBatchKg} kg Organic Slurry & Trigger Biogas Surge →
          </button>
        </div>
      </div>
    </div>
  );
};
