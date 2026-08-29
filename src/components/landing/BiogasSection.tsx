import React, { useState } from 'react';
import {
  Flame,
  Zap,
  Activity,
  ArrowRight,
  Sparkles,
  Gauge,
  Thermometer,
  Layers,
  Home,
  Info
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { calculateBiogasOutput, calculateElectricityOutput, calculateEnvironmentalMitigation } from '../../data/conversionMath';

export const BiogasSection: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [inputKg, setInputKg] = useState<number>(380);

  const biogasYieldM3 = calculateBiogasOutput(inputKg);
  const electricityKwh = calculateElectricityOutput(biogasYieldM3);
  const mitigation = calculateEnvironmentalMitigation(inputKg);

  return (
    <section className="py-24 relative bg-dark-950 border-t border-white/10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-energy-glow/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Flame className="w-3.5 h-3.5" />
            Stage 6: Anaerobic Bio-Methanation
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mb-4">
            6. Organic Waste Becomes Energy
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Inside our anaerobic digester, methanogenic microorganisms break down organic slurry to produce high-methane biogas, fueling clean microgrid electricity for campus buildings and homes.
          </p>
        </div>

        {/* Large Animated Digester Cutaway Illustration */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/90 backdrop-blur-xl border border-amber-500/30 shadow-2xl mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left: Interactive Digester Physics Model */}
            <div className="lg:col-span-2 relative p-6 rounded-2xl bg-dark-950 border border-white/10 overflow-hidden space-y-6">
              {/* Header Telemetry Pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Flame className="w-4 h-4 text-energy-light animate-pulse" />
                  <span>Digester Tank #1 (Mesophilic Primary)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-eco-500/10 text-eco-400 border border-eco-500/30">
                  Status: OPTIMAL (37.4°C | pH 7.18)
                </span>
              </div>

              {/* Digester Tank Schematic SVG */}
              <div className="relative h-64 flex items-center justify-between px-4">
                {/* 1. Feedstock Inlet */}
                <div className="flex flex-col items-center text-center space-y-2 z-10">
                  <div className="w-14 h-14 rounded-2xl bg-dark-900 border border-eco-500/40 flex items-center justify-center shadow-lg">
                    <Layers className="w-7 h-7 text-eco-400" />
                  </div>
                  <div className="text-[11px] font-bold text-white">Organic Slurry</div>
                  <div className="text-[10px] font-mono text-eco-400 font-bold">{inputKg} kg Feed</div>
                </div>

                {/* Animated Connecting Pipe 1 */}
                <div className="flex-1 h-2 bg-dark-850 mx-2 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-eco-500 to-amber-500 animate-shimmer" />
                </div>

                {/* 2. Anaerobic Digester Core Tank with Bubbling Gas */}
                <div className="w-36 h-48 rounded-3xl bg-gradient-to-b from-amber-950/40 via-dark-900 to-dark-950 border-2 border-amber-500/50 relative overflow-hidden flex flex-col justify-between p-3 text-center shadow-2xl shadow-amber-500/20 z-10">
                  {/* Top Gas Dome */}
                  <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-amber-300 font-bold">
                    <Flame className="w-3.5 h-3.5 text-energy-light" />
                    <span>65% CH₄ Gas</span>
                  </div>

                  {/* Bubbling Particles */}
                  <div className="relative flex-1 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-amber-400/80 animate-ping absolute top-4 left-6" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 animate-ping absolute bottom-6 right-8" />
                    <div className="w-2 h-2 rounded-full bg-orange-400/80 animate-ping absolute top-8 right-6" />
                    <span className="text-[9px] font-mono text-slate-300">Anaerobic Digestate</span>
                  </div>

                  {/* Bottom Slurry Level */}
                  <div className="w-full bg-amber-900/60 rounded-xl p-1 text-[9px] font-mono text-amber-200">
                    Slurry: 3,840 kg
                  </div>
                </div>

                {/* Animated Connecting Pipe 2 (Gas Flow) */}
                <div className="flex-1 h-2 bg-dark-850 mx-2 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-400 animate-shimmer" />
                </div>

                {/* 3. CHP Gas Turbine & Clean Energy */}
                <div className="flex flex-col items-center text-center space-y-2 z-10">
                  <div className="w-14 h-14 rounded-2xl bg-dark-900 border border-energy-glow flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
                    <Zap className="w-7 h-7 text-amber-400" />
                  </div>
                  <div className="text-[11px] font-bold text-white">CHP Turbine</div>
                  <div className="text-[10px] font-mono text-energy-light font-bold">
                    {electricityKwh} kWh Clean
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Kinetic Conversion Calculator */}
            <div className="space-y-4 p-6 rounded-2xl bg-dark-850 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Real-time Energy Yield Calculator
                </span>
                <span className="text-[10px] font-mono text-eco-400">Bio-Methanation Model</span>
              </div>

              {/* Feedstock Mass Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Organic Feedstock (kg)</span>
                  <span className="text-white font-bold">{inputKg} kg</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="10"
                  value={inputKg}
                  onChange={(e) => setInputKg(Number(e.target.value))}
                  className="w-full h-2 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-eco-500"
                />
              </div>

              {/* Converted Output Breakdown */}
              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-xl bg-dark-900 border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Estimated Biogas</span>
                  <span className="text-sm font-mono font-bold text-amber-400">{biogasYieldM3} m³</span>
                </div>

                <div className="p-3 rounded-xl bg-dark-900 border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Clean Electricity</span>
                  <span className="text-sm font-mono font-bold text-energy-light">{electricityKwh} kWh</span>
                </div>

                <div className="p-3 rounded-xl bg-dark-900 border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Greenhouse Gas Mitigated</span>
                  <span className="text-sm font-mono font-bold text-eco-400">{mitigation.co2eAvoidedKg} kg CO₂e</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <Info className="w-3 h-3 shrink-0" />
                <span>Estimated values based on mesophilic bio-gas kinetics.</span>
              </div>

              <button
                onClick={() => setCurrentPage('biogas')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-eco-500 text-dark-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-98 transition-all"
              >
                Open Biogas Plant Live Telemetry →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
