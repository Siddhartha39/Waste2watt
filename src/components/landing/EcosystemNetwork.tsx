import React from 'react';
import {
  Users,
  Cpu,
  Database,
  Truck,
  Route,
  Layers,
  Flame,
  Zap,
  Home,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const EcosystemNetwork: React.FC = () => {
  const { setCurrentPage } = useAppStore();

  const nodes = [
    { title: 'Citizen', icon: <Users className="w-5 h-5 text-eco-400" />, desc: 'Source Segregation' },
    { title: 'AI Vision', icon: <Cpu className="w-5 h-5 text-purple-400" />, desc: 'Neural Scanner' },
    { title: 'Database', icon: <Database className="w-5 h-5 text-cyan-400" />, desc: 'Decentralized Ledger' },
    { title: 'Collector', icon: <Truck className="w-5 h-5 text-blue-400" />, desc: 'EV Fleets' },
    { title: 'Routing', icon: <Route className="w-5 h-5 text-indigo-400" />, desc: 'TSP Optimizer' },
    { title: 'Segregation', icon: <Layers className="w-5 h-5 text-teal-400" />, desc: 'Mechanical Sorting' },
    { title: 'Biogas Plant', icon: <Flame className="w-5 h-5 text-energy-glow" />, desc: 'Methanogenesis' },
    { title: 'CHP Energy', icon: <Zap className="w-5 h-5 text-amber-400" />, desc: 'Microgrid Turbines' },
    { title: 'Community', icon: <Home className="w-5 h-5 text-emerald-400" />, desc: 'Powered Campus' },
  ];

  return (
    <section className="py-24 relative bg-dark-900 border-t border-white/10 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-eco-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-eco-500/10 border border-eco-500/20 text-eco-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Stage 11: Circular Interconnected Loop
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mb-4">
            One Network. One Circular Flow.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From household waste to community energy — a fully unified, reactive decentralized architecture that aligns incentives for every stakeholder.
          </p>
        </div>

        {/* Circular Interconnected Node Map */}
        <div className="p-8 rounded-3xl bg-dark-950 border border-eco-500/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3 text-center">
            {nodes.map((node, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-dark-900 border border-white/5 hover:border-eco-500/40 transition-all flex flex-col items-center justify-between min-h-[130px] group"
              >
                <div className="w-12 h-12 rounded-xl bg-dark-850 border border-white/10 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
                  {node.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide">{node.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{node.desc}</div>
                </div>
                <div className="text-[9px] font-mono text-eco-400 font-bold mt-2">
                  Node 0{i + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Flow Connection Strip */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-eco-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-eco-400 animate-ping" />
              <span>Decentralized Event Mesh Active: Sub-second synchronization enabled.</span>
            </div>
            <button
              onClick={() => setCurrentPage('admin')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-eco-500 to-cyan-500 text-dark-950 font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              Open Municipality Master Command Center →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
