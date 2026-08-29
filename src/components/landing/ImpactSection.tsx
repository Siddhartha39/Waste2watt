import React from 'react';
import {
  BarChart3,
  Leaf,
  Zap,
  TrendingDown,
  Trees,
  Flame,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ImpactSection: React.FC = () => {
  const { setCurrentPage, impactMetrics } = useAppStore();

  const impactStats = [
    { label: 'Total Waste Diverted', value: '2.45 Tonnes', desc: 'Prevented from open dumps', icon: <Leaf className="w-5 h-5 text-eco-400" /> },
    { label: 'Clean Energy Generated', value: `${impactMetrics.cleanEnergyGeneratedKwh} kWh`, desc: 'Microgrid electricity produced', icon: <Zap className="w-5 h-5 text-energy-light" /> },
    { label: 'Greenhouse Gas Mitigated', value: `${impactMetrics.co2eAvoidedKg} kg`, desc: 'CO₂ equivalent emissions avoided', icon: <TrendingDown className="w-5 h-5 text-emerald-400" /> },
    { label: 'Equivalent Trees Planted', value: `${impactMetrics.equivalentTreesPlanted} Trees`, desc: 'Annual carbon sequestration equivalence', icon: <Trees className="w-5 h-5 text-teal-400" /> },
  ];

  return (
    <section className="py-24 relative bg-dark-950 border-t border-white/10 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-eco-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <BarChart3 className="w-3.5 h-3.5" />
            Stage 8: Empirical Carbon Accounting
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mb-4">
            Measure the Impact
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every kilogram of segregated organic matter diverted from landfills is scientifically accounted for, converting raw bio-mass into measured kilowatt-hours and verified carbon reduction.
          </p>
        </div>

        {/* 4 Impact Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {impactStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-dark-900/90 border border-white/10 hover:border-eco-500/30 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-dark-850 border border-white/5">{stat.icon}</div>
                <span className="text-[10px] font-mono text-eco-400 bg-eco-500/10 px-2 py-0.5 rounded-full border border-eco-500/20">
                  Verified
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-200 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{stat.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Landfill vs Biogas Visual Comparison Showcase */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-eco-500/30 shadow-2xl relative overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Landfill Contrast */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <TrendingDown className="w-4 h-4" />
                <span>LANDFILL DUMPSITE (Conventional)</span>
              </div>
              <h3 className="text-xl font-bold text-white">Uncontrolled Methane Leakage</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Open dumps emit raw methane into the atmosphere, causing groundwater contamination and zero energy recovery.
              </p>
              <div className="text-xs font-mono text-rose-400 font-bold pt-1">
                +1.58 kg CO₂e emitted per kg food waste
              </div>
            </div>

            {/* Biogas Contrast */}
            <div className="p-6 rounded-2xl bg-eco-950/30 border border-eco-500/30 space-y-3">
              <div className="flex items-center gap-2 text-eco-400 font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4 text-energy-light" />
                <span>WASTE2WATT BIOGAS (Decentralized)</span>
              </div>
              <h3 className="text-xl font-bold text-white">Clean Microgrid Energy & Bio-Fertilizer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Methane is captured in sealed digesters, converted to electricity, and nutrient-rich digestate becomes organic soil conditioner.
              </p>
              <div className="text-xs font-mono text-eco-400 font-bold pt-1">
                +0.26 kWh clean electricity generated per kg
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Empirical aggregate calculations for decentralized community bio-methanation.</span>
            </div>
            <button
              onClick={() => setCurrentPage('impact')}
              className="px-5 py-2 rounded-xl bg-eco-500 hover:bg-eco-400 text-dark-950 font-bold text-xs shadow-md transition-colors"
            >
              Open Environmental Impact Dashboard →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
