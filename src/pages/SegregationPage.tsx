import React, { useState } from 'react';
import {
  Layers,
  Flame,
  Recycle,
  FileText,
  Trash,
  Cog,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  Gauge
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const SegregationPage: React.FC = () => {
  const { setCurrentPage, feedOrganicBatch } = useAppStore();

  const [isShredding, setIsShredding] = useState<boolean>(false);
  const [slurryPreparedKg, setSlurryPreparedKg] = useState<number>(45.0);
  const [feedSuccess, setFeedSuccess] = useState<boolean>(false);

  const handlePrepareAndFeed = () => {
    setIsShredding(true);
    setTimeout(() => {
      setIsShredding(false);
      feedOrganicBatch('digester-01', slurryPreparedKg);
      setFeedSuccess(true);
    }, 900);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-teal-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              Pre-Treatment & Slurry Homogenization
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              Smart Segregation & Feedstock Intake Facility
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Mechanical de-packaging, organic maceration, and slurry preparation before anaerobic digestion.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('biogas')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            <Flame className="w-4 h-4" />
            <span>Open Biogas Plant →</span>
          </button>
        </div>

        {/* 4 Stream Intake Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-dark-900 border border-emerald-500/30 space-y-1">
            <div className="text-[10px] font-mono text-emerald-400 uppercase">Organic Bio-Slurry</div>
            <div className="text-2xl font-black font-mono text-emerald-400">1,840 kg</div>
            <div className="text-[11px] text-slate-400">88.2% Total Intake Recovery</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-cyan-500/30 space-y-1">
            <div className="text-[10px] font-mono text-cyan-400 uppercase">Recyclable Polymers</div>
            <div className="text-2xl font-black font-mono text-cyan-400">142 kg</div>
            <div className="text-[11px] text-slate-400">Routed to MRF Baling Unit</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-amber-500/30 space-y-1">
            <div className="text-[10px] font-mono text-amber-400 uppercase">Paper & Fiber</div>
            <div className="text-2xl font-black font-mono text-amber-400">76 kg</div>
            <div className="text-[11px] text-slate-400">Dry Compaction Reprocessing</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-slate-700/50 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Inert Rejects</div>
            <div className="text-2xl font-black font-mono text-slate-400">22 kg</div>
            <div className="text-[11px] text-slate-500">&lt; 1.8% Non-Combustibles</div>
          </div>
        </div>

        {/* Slurry Preparation Controls & Feeder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Shredder & Hydro-Cyclone Workbench */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Cog className={`w-4 h-4 text-teal-400 ${isShredding ? 'animate-spin' : ''}`} />
                  Industrial Biomass Macerator & Hydro-Cyclone (Unit #01)
                </span>
                <span className="text-[10px] font-mono text-eco-400 bg-eco-500/10 px-2 py-0.5 rounded-full">
                  Status: READY
                </span>
              </div>

              {/* Slurry Prep Slider */}
              <div className="p-5 rounded-2xl bg-dark-950 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase">Batch Slurry Mass to Feed (kg):</span>
                  <span className="text-xl font-black font-mono text-teal-400">{slurryPreparedKg} kg</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={slurryPreparedKg}
                  onChange={(e) => setSlurryPreparedKg(Number(e.target.value))}
                  className="w-full h-2 bg-dark-900 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>

              {/* Feeding Button */}
              <div>
                {feedSuccess ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-2">
                    <div className="text-xs font-bold text-emerald-300 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{slurryPreparedKg} kg Organic Slurry Successfully Injected to Digester Tank #1!</span>
                    </div>
                    <button
                      onClick={() => setCurrentPage('biogas')}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-md transition-colors"
                    >
                      Watch Biogas Pressure Surge in Real Time →
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handlePrepareAndFeed}
                    disabled={isShredding}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500 text-dark-950 font-black text-xs shadow-xl shadow-teal-500/25 hover:scale-[1.01] active:scale-98 transition-all disabled:opacity-50"
                  >
                    {isShredding ? 'Macerating Feedstock & Pumping Slurry...' : `Macerate & Feed ${slurryPreparedKg} kg to Anaerobic Digester Tank #1 →`}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Quality Control & Slurry Purity Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-dark-900 border border-teal-500/30 shadow-2xl space-y-4">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Feedstock Purity & Rheology:
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-2xl bg-dark-950 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Total Solids (TS)</span>
                  <span className="font-mono font-bold text-white">12.4% (Optimal wet slurry)</span>
                </div>
                <div className="p-3 rounded-2xl bg-dark-950 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Volatile Solids (VS/TS)</span>
                  <span className="font-mono font-bold text-eco-400">86.8% (High methanation)</span>
                </div>
                <div className="p-3 rounded-2xl bg-dark-950 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400">Plastic Contamination</span>
                  <span className="font-mono font-bold text-emerald-400">&lt; 0.4% (Hydro-separator clean)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
