import React, { useState } from 'react';
import {
  UserCheck,
  Scan,
  MapPin,
  Route,
  Truck,
  Layers,
  Flame,
  Zap,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAppStore, AppPage } from '../../store/useAppStore';

export const SolutionPipeline: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [activeStage, setActiveStage] = useState<number>(0);

  const pipelineStages = [
    {
      id: 1,
      title: 'Citizen',
      tag: 'Source Segregation',
      icon: <UserCheck className="w-5 h-5 text-eco-400" />,
      desc: 'Residents, hostel messes & campus canteens separate organic leftovers at source.',
      metric: '+20 Eco-Points',
      page: 'citizen' as AppPage,
    },
    {
      id: 2,
      title: 'AI Detection',
      tag: 'Neural Classification',
      icon: <Scan className="w-5 h-5 text-purple-400" />,
      desc: 'Mobile/web AI scans the photo, calculates % organic purity & calorific bio-potential.',
      metric: '94% Accuracy',
      page: 'ai-scanner' as AppPage,
    },
    {
      id: 3,
      title: 'GPS Location',
      tag: 'Spatial Geotagging',
      icon: <MapPin className="w-5 h-5 text-cyan-400" />,
      desc: 'Precise coordinates cluster pickups into high-density community collection zones.',
      metric: 'Sub-meter Geofence',
      page: 'live-map' as AppPage,
    },
    {
      id: 4,
      title: 'Smart Routing',
      tag: 'Dynamic TSP Dispatch',
      icon: <Route className="w-5 h-5 text-indigo-400" />,
      desc: 'AI generates optimal pickup sequence prioritizing organic waste & critical overflows.',
      metric: '39% Distance Saved',
      page: 'smart-route' as AppPage,
    },
    {
      id: 5,
      title: 'Collection',
      tag: 'Electric Fleet',
      icon: <Truck className="w-5 h-5 text-blue-400" />,
      desc: 'EV tipper trucks execute priority routes with real-time digital proof of pickup.',
      metric: 'Zero Tailpipe CO2',
      page: 'collector' as AppPage,
    },
    {
      id: 6,
      title: 'Segregation',
      tag: 'Slurry Preparation',
      icon: <Layers className="w-5 h-5 text-teal-400" />,
      desc: 'Mechanical pre-treatment removes inerts, shreds feedstock, and blends slurry.',
      metric: '98% Purity Slurry',
      page: 'segregation' as AppPage,
    },
    {
      id: 7,
      title: 'Biogas',
      tag: 'Anaerobic Digester',
      icon: <Flame className="w-5 h-5 text-energy-glow" />,
      desc: 'Microbial bio-methanation converts slurry into high-methane CH4 biogas (65%).',
      metric: '0.062 m³ / kg waste',
      page: 'biogas' as AppPage,
    },
    {
      id: 8,
      title: 'Energy',
      tag: 'CHP Microgrid',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      desc: 'Biogas CHP generator feeds electricity into local streetlights, heat pumps & battery banks.',
      metric: '2.0 kWh / m³ biogas',
      page: 'energy' as AppPage,
    },
    {
      id: 9,
      title: 'Impact',
      tag: 'Circular Economy',
      icon: <BarChart3 className="w-5 h-5 text-emerald-400" />,
      desc: 'Continuous real-time verification of landfill diversion and avoided carbon emissions.',
      metric: '1.58 kg CO2e / kg',
      page: 'impact' as AppPage,
    },
  ];

  const currentInfo = pipelineStages[activeStage];

  return (
    <section id="solution-pipeline" className="py-24 relative bg-dark-950 border-t border-white/10 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-eco-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-eco-500/10 border border-eco-500/20 text-eco-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The Complete Solution Pipeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mb-4">
            From Waste Problem to Energy Opportunity
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Nine seamless interconnected stages transform everyday community bio-waste into clean, decentralized microgrid power.
          </p>
        </div>

        {/* 9-Stage Pipeline Navigation Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
          {pipelineStages.map((stg, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={stg.id}
                onClick={() => setActiveStage(idx)}
                className={`p-3 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between min-h-[116px] cursor-pointer group ${
                  isSelected
                    ? 'bg-eco-500/20 border-eco-400 shadow-xl shadow-eco-500/25 scale-105 z-20 ring-2 ring-eco-400/40'
                    : 'bg-dark-900/90 hover:bg-dark-850 border-white/10 text-slate-300 hover:text-white hover:-translate-y-1 hover:border-eco-500/40'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className={`p-2 rounded-xl transition-all duration-300 ${isSelected ? 'bg-eco-500/30 shadow-[0_0_12px_rgba(34,197,94,0.5)] scale-110' : 'bg-dark-800 group-hover:scale-110'}`}>
                    {stg.icon}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-eco-400 transition-colors">0{stg.id}</span>
                </div>
                <div>
                  <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-eco-300'} transition-colors`}>
                    {stg.title}
                  </div>
                  <div className="text-[9px] text-eco-400 font-mono mt-0.5 truncate">{stg.metric}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Showcase Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-eco-500/40 shadow-2xl relative overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Stage Summary */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-eco-500/20 text-eco-300 text-xs font-mono font-bold border border-eco-500/40 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-eco-400 animate-ping" />
                  Stage {currentInfo.id} of 9
                </span>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider font-mono">
                  {currentInfo.tag}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                {currentInfo.title}: {currentInfo.tag}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentInfo.desc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="px-4 py-2 rounded-xl bg-dark-800 border border-white/10">
                  <div className="text-[10px] uppercase font-mono text-slate-400">Benchmark Metric</div>
                  <div className="text-base font-bold font-mono text-eco-400">{currentInfo.metric}</div>
                </div>

                <button
                  onClick={() => setCurrentPage(currentInfo.page)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-eco-500 to-cyan-500 hover:from-eco-400 hover:to-cyan-400 text-dark-950 font-bold text-xs shadow-lg shadow-eco-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Open {currentInfo.title} Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Flow Visual */}
            <div className="p-6 rounded-2xl bg-dark-850 border border-white/10 flex flex-col items-center justify-center text-center space-y-3 hover:border-eco-500/40 transition-colors">
              <div className="w-20 h-20 rounded-2xl bg-dark-900 border border-eco-500/50 flex items-center justify-center shadow-inner animate-pulse-glow">
                <div className="scale-125">{currentInfo.icon}</div>
              </div>
              <div className="text-xs font-bold text-white uppercase">{currentInfo.title}</div>
              <p className="text-[11px] text-slate-400">
                Connected into the decentralized Waste2Watt bio-methanation grid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
