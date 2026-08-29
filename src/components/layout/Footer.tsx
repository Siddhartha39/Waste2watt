import React from 'react';
import { Leaf, Zap, Globe, Sparkles, ArrowUpRight, Cpu } from 'lucide-react';
import { useAppStore, AppPage } from '../../store/useAppStore';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useAppStore();

  const footerLinks: { label: string; page: AppPage }[] = [
    { label: 'Interactive Landing', page: 'landing' },
    { label: 'Report Waste', page: 'report' },
    { label: 'Live Waste Map', page: 'live-map' },
    { label: 'Smart Route System', page: 'smart-route' },
    { label: 'Biogas Plant Telemetry', page: 'biogas' },
    { label: 'Microgrid Energy', page: 'energy' },
    { label: 'Environmental Impact', page: 'impact' },
    { label: 'Eco-Points Leaderboard', page: 'leaderboard' },
    { label: 'Municipality Admin', page: 'admin' },
    { label: 'AI Deep Waste Lab', page: 'ai-scanner' },
    { label: 'IoT Hardware Monitor', page: 'iot' },
    { label: 'AI Load Forecasting', page: 'prediction' },
  ];

  return (
    <footer className="relative bg-dark-950 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-eco-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Project Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eco-500 to-cyan-500 p-[1.5px] shadow-lg shadow-eco-500/20">
                <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-eco-400" />
                </div>
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tight text-white">
                  WASTE<span className="text-eco-400">2</span>WATT
                </span>
                <p className="text-xs text-eco-400 font-medium">Turning Community Waste Into Clean Energy</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              An AI-powered decentralized waste collection and bio-energy network.
              Connecting citizens, smart EV collection fleets, segregation hubs, and local anaerobic digesters to power sustainable community microgrids.
            </p>

            <div className="p-4 rounded-2xl bg-dark-900/80 border border-eco-500/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-eco-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-white">Circular Infrastructure:</span>{' '}
                <span className="text-eco-300">Decentralized Smart Waste-to-Energy Collection & Conversion Network</span>.
                Empowering communities with localized renewable bio-power.
              </div>
            </div>
          </div>

          {/* Quick Module Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-eco-400" />
              Decentralized Modules
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.slice(0, 6).map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      setCurrentPage(link.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-sm text-slate-400 hover:text-eco-300 transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-eco-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Intelligence & IoT Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              AI & Hardware Systems
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.slice(6).map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      setCurrentPage(link.page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-sm text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Waste2Watt Network. Open Architecture Circular Bio-Energy Platform.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-eco-400" />
              ESP32 + MQTT Telemetry Ready
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-energy-light" />
              Bio-Methane Kinetics Verified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
