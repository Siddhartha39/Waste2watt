import React, { useState } from 'react';
import {
  Layers,
  Flame,
  Recycle,
  FileText,
  Trash,
  ArrowRight,
  Sparkles,
  Cog,
  CheckCircle2
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const SegregationSection: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [activeStream, setActiveStream] = useState<'organic' | 'recyclable' | 'paper' | 'residual'>('organic');

  const streams = [
    {
      id: 'organic' as const,
      name: 'Organic Biomass',
      icon: <Flame className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500 bg-emerald-500/10 text-emerald-300',
      destination: 'Central Anaerobic Digester Plant',
      recoveryRate: '92% Recovery',
      actionDesc: 'Mechanical shredding, hydro-cyclone grit removal, and slurry blending for methanogenesis.',
    },
    {
      id: 'recyclable' as const,
      name: 'Recyclable Polymers',
      icon: <Recycle className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500 bg-cyan-500/10 text-cyan-300',
      destination: 'Material Recovery Facility (MRF)',
      recoveryRate: '88% Recovery',
      actionDesc: 'Optical NIR classification, PET/HDPE separation, and pneumatic baling.',
    },
    {
      id: 'paper' as const,
      name: 'Paper & Cardboard',
      icon: <FileText className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500 bg-amber-500/10 text-amber-300',
      destination: 'Fiber Reprocessing Unit',
      recoveryRate: '85% Recovery',
      actionDesc: 'Dry compaction and industrial pulping for secondary packaging manufacturing.',
    },
    {
      id: 'residual' as const,
      name: 'Residual Inerts',
      icon: <Trash className="w-5 h-5 text-slate-400" />,
      color: 'border-slate-500 bg-slate-500/10 text-slate-300',
      destination: 'Sanitary Engineered Containment',
      recoveryRate: '< 6% Total Mass',
      actionDesc: 'Inert non-combustibles compacted with zero open environmental exposure.',
    },
  ];

  return (
    <section className="py-24 relative bg-dark-900 border-t border-white/10 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[300px] bg-teal-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            Stage 5: Mechanical & Sensor Pre-Sorting
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mb-4">
            5. Separate Waste at the Right Point
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Protecting anaerobic digesters from non-biodegradable plastics is paramount.
            Our smart intake station refines incoming streams to produce ultra-clean high-calorific bio-slurry.
          </p>
        </div>

        {/* Animated Conveyor Sorting Diagram */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-950 border border-teal-500/30 shadow-2xl mb-12 relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Cog className="w-4 h-4 text-teal-400 animate-spin" />
              <span>Conveyor Stream Intake: 250 kg/hr Operational Rate</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Contamination Index: &lt; 2.1% (Safe)
            </span>
          </div>

          {/* Conveyor Belt Animation Graphic */}
          <div className="relative py-6">
            <div className="h-4 bg-dark-800 rounded-full border border-white/10 relative overflow-hidden mb-8 shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-eco-500/40 to-teal-500/20 animate-shimmer" />
            </div>

            {/* 4 Diverted Streams Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {streams.map((st) => {
                const isSelected = activeStream === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setActiveStream(st.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[160px] ${
                      isSelected
                        ? `${st.color} scale-105 shadow-xl`
                        : 'bg-dark-900/80 hover:bg-dark-850 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-xl bg-dark-950 border border-white/10">{st.icon}</div>
                        <span className="text-[10px] font-mono font-bold">{st.recoveryRate}</span>
                      </div>
                      <div className="text-sm font-bold text-white mb-1">{st.name}</div>
                      <div className="text-[11px] text-slate-300 font-medium">{st.destination}</div>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-3 pt-2 border-t border-white/5 line-clamp-2">
                      {st.actionDesc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Biogas Digester Connection Highlight */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-eco-400 shrink-0" />
              <div>
                <span className="font-bold text-white">Organic Stream Direct Link:</span>
                <span className="text-slate-300 ml-1">
                  100% of validated pure kitchen biomass routes directly into the slurry digester feed hopper.
                </span>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('segregation')}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-dark-950 font-bold text-xs shadow-md shrink-0 transition-colors"
            >
              Open Segregation Unit →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
