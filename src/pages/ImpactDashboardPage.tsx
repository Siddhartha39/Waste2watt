import React, { useState } from 'react';
import {
  BarChart3,
  Leaf,
  Zap,
  TrendingDown,
  Trees,
  Flame,
  Award,
  Download,
  Printer,
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { calculateEnvironmentalMitigation } from '../data/conversionMath';

export const ImpactDashboardPage: React.FC = () => {
  const { impactMetrics } = useAppStore();
  const [scalePopulation, setScalePopulation] = useState<number>(2500); // 2,500 campus residents
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Scaled estimate: ~0.35 kg kitchen waste per person per day
  const scaledDailyWasteKg = scalePopulation * 0.35;
  const scaledAnnualMitigation = calculateEnvironmentalMitigation(scaledDailyWasteKg * 365);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              Verified Environmental Ledger
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              Decentralized Environmental Impact & Carbon Avoidance
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Based on IPCC Tier-2 bio-waste emission diversion factors and EPA WARM greenhouse gas models.
            </p>
          </div>

          <button
            onClick={() => setShowCertificate(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-dark-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Generate Official Impact Certificate</span>
          </button>
        </div>

        {/* 4 Lifetime Impact Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase font-mono">Waste Diverted</span>
              <Leaf className="w-5 h-5 text-eco-400" />
            </div>
            <div className="text-3xl font-black font-mono text-white">
              {(impactMetrics.totalWasteDivertedKg / 1000).toFixed(2)} Tonnes
            </div>
            <div className="text-[11px] text-eco-400 font-mono">Zero unmanaged dumpsite runoff</div>
          </div>

          <div className="p-6 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase font-mono">Clean Power Generated</span>
              <Zap className="w-5 h-5 text-energy-light" />
            </div>
            <div className="text-3xl font-black font-mono text-energy-light">
              {impactMetrics.cleanEnergyGeneratedKwh} kWh
            </div>
            <div className="text-[11px] text-slate-400 font-mono">Microgrid community electricity</div>
          </div>

          <div className="p-6 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase font-mono">CO₂e Emissions Mitigated</span>
              <TrendingDown className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400">
              {impactMetrics.co2eAvoidedKg} kg
            </div>
            <div className="text-[11px] text-eco-300 font-mono">Fugitive landfill CH₄ trapped</div>
          </div>

          <div className="p-6 rounded-3xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase font-mono">Tree Sequestration Equiv.</span>
              <Trees className="w-5 h-5 text-teal-400" />
            </div>
            <div className="text-3xl font-black font-mono text-teal-400">
              {impactMetrics.equivalentTreesPlanted} Trees
            </div>
            <div className="text-[11px] text-slate-400 font-mono">1 year absorption equivalence</div>
          </div>
        </div>

        {/* Interactive Scalability Simulator */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-eco-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-eco-400" />
              Community Scalability Simulator (Annual Projections)
            </span>
            <span className="text-[10px] font-mono text-slate-400">Model: IIT Guwahati Campus Scale</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Target Community / Campus Population:</span>
              <span className="text-eco-400 font-bold text-base">{scalePopulation.toLocaleString()} Residents</span>
            </div>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={scalePopulation}
              onChange={(e) => setScalePopulation(Number(e.target.value))}
              className="w-full h-2 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-eco-500"
            />
          </div>

          {/* Scaled Projections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-dark-950 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Annual Bio-Waste Diverted</div>
              <div className="text-2xl font-black font-mono text-white">
                {((scaledDailyWasteKg * 365) / 1000).toFixed(0)} Tonnes/yr
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-dark-950 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Annual Clean Electricity</div>
              <div className="text-2xl font-black font-mono text-energy-light">
                {(scaledAnnualMitigation.electricityKwh / 1000).toFixed(1)} MWh/yr
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-dark-950 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Annual Greenhouse Gas Mitigated</div>
              <div className="text-2xl font-black font-mono text-emerald-400">
                {(scaledAnnualMitigation.co2eAvoidedKg / 1000).toFixed(1)} Tonnes CO₂e
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Modal */}
        {showCertificate && (
          <div className="fixed inset-0 z-50 bg-dark-950/80 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-dark-900 border-2 border-eco-400 rounded-3xl p-8 max-w-2xl w-full shadow-2xl space-y-6 relative">
              <button
                onClick={() => setShowCertificate(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>

              <div className="text-center space-y-2 pb-4 border-b border-white/10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eco-500/10 text-eco-400 text-[10px] font-mono font-bold">
                  DECENTRALIZED CARBON AUDIT VERIFICATION
                </div>
                <h2 className="text-2xl font-display font-black text-white">
                  Community Bio-Energy Impact Certificate
                </h2>
                <p className="text-xs text-slate-300">
                  Presented to the Community Green Governance Board & Municipal Microgrid Network
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-dark-950 border border-white/5 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Verified Waste Diverted:</span>
                  <span className="font-bold text-white font-mono">{impactMetrics.totalWasteDivertedKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Net Clean Power Generated:</span>
                  <span className="font-bold text-energy-light font-mono">{impactMetrics.cleanEnergyGeneratedKwh} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Greenhouse Gas Mitigated:</span>
                  <span className="font-bold text-emerald-400 font-mono">{impactMetrics.co2eAvoidedKg} kg CO₂e</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verification Hash:</span>
                  <span className="font-mono text-[10px] text-slate-500">0x8F3B92...WW2026</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-eco-500 hover:bg-eco-400 text-dark-950 font-bold text-xs flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
