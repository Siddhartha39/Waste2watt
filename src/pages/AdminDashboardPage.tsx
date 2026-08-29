import React from 'react';
import {
  Activity,
  ShieldCheck,
  TrendingUp,
  Flame,
  Zap,
  Truck,
  Users,
  AlertTriangle,
  Layers,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const AdminDashboardPage: React.FC = () => {
  const { reports, collectors, digesters, energyGrid, impactMetrics, setCurrentPage } = useAppStore();

  const organicReports = reports.filter((r) => r.classification.primaryCategory === 'organic');
  const pendingCount = reports.filter((r) => r.status !== 'verified').length;
  const verifiedCount = reports.filter((r) => r.status === 'verified').length;

  const sectors = [
    { name: 'Sector A (Hostel Zone)', reports: 8, organicKg: 420, sla: '99.1%', status: 'Optimal' },
    { name: 'Sector B (Academic Hub)', reports: 4, organicKg: 180, sla: '98.5%', status: 'Normal' },
    { name: 'Sector C (Faculty Housing)', reports: 3, organicKg: 125, sla: '100%', status: 'Optimal' },
    { name: 'Sector D (Market Produce)', reports: 6, organicKg: 510, sla: '97.2%', status: 'High Load' },
    { name: 'Sector E (Sports & Gymkhana)', reports: 2, organicKg: 65, sla: '100%', status: 'Normal' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[400px] bg-blue-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Activity className="w-3.5 h-3.5" />
              Municipality & Campus Command Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              Decentralized Master Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Supervise collection fleet SLAs, digester methanation health, and microgrid power balance across all 5 sectors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage('live-map')}
              className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-white font-bold text-xs border border-white/10"
            >
              Open Live Map
            </button>
            <button
              onClick={() => setCurrentPage('analytics')}
              className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-dark-950 font-bold text-xs shadow-md"
            >
              Deep Analytics →
            </button>
          </div>
        </div>

        {/* 6 High-Level Admin KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Total Reports</div>
            <div className="text-xl font-black font-mono text-white">{reports.length}</div>
            <div className="text-[9px] text-eco-400 font-mono">100% Geo-tagged</div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-900 border border-amber-500/30 space-y-1">
            <div className="text-[10px] font-mono text-amber-400 uppercase">Pending Queue</div>
            <div className="text-xl font-black font-mono text-amber-400">{pendingCount}</div>
            <div className="text-[9px] text-slate-400 font-mono">Dispatched to Fleets</div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-900 border border-emerald-500/30 space-y-1">
            <div className="text-[10px] font-mono text-emerald-400 uppercase">Verified Closed</div>
            <div className="text-xl font-black font-mono text-emerald-400">{verifiedCount}</div>
            <div className="text-[9px] text-slate-400 font-mono">98.4% SLA Adherence</div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-900 border border-cyan-500/30 space-y-1">
            <div className="text-[10px] font-mono text-cyan-400 uppercase">Active EV Trucks</div>
            <div className="text-xl font-black font-mono text-cyan-400">{collectors.length} Fleets</div>
            <div className="text-[9px] text-slate-400 font-mono">Zero Emissions</div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-900 border border-energy-glow/30 space-y-1">
            <div className="text-[10px] font-mono text-energy-light uppercase">Biogas Output</div>
            <div className="text-xl font-black font-mono text-energy-light">{impactMetrics.totalBiogasProducedM3} m³</div>
            <div className="text-[9px] text-slate-400 font-mono">64.8% Pure Methane</div>
          </div>

          <div className="p-4 rounded-2xl bg-dark-900 border border-purple-500/30 space-y-1">
            <div className="text-[10px] font-mono text-purple-400 uppercase">Power Generated</div>
            <div className="text-xl font-black font-mono text-purple-400">{energyGrid.totalKwhToday} kWh</div>
            <div className="text-[9px] text-slate-400 font-mono">Microgrid Distributed</div>
          </div>
        </div>

        {/* Sector Health Matrix */}
        <div className="p-6 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Community & Campus Sector Performance Matrix
            </span>
            <span className="text-[10px] font-mono text-eco-400">All 5 Sectors Operational</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="pb-3">Sector Zone</th>
                  <th className="pb-3">Active Reports</th>
                  <th className="pb-3">Organic Volume</th>
                  <th className="pb-3">Collection SLA</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sectors.map((sec, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-bold text-white">{sec.name}</td>
                    <td className="py-3 font-mono text-slate-300">{sec.reports} Active</td>
                    <td className="py-3 font-mono text-emerald-400 font-bold">{sec.organicKg} kg</td>
                    <td className="py-3 font-mono text-cyan-400">{sec.sla}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        sec.status === 'High Load'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {sec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
