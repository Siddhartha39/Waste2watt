import React from 'react';
import {
  Truck,
  Navigation,
  CheckCircle2,
  Clock,
  BatteryCharging,
  Weight,
  MapPin,
  Flame,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Play
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const CollectorDashboard: React.FC = () => {
  const {
    collectors,
    reports,
    updateReportStatus,
    setCurrentPage,
    generateSmartRoute,
    setActiveReportId
  } = useAppStore();

  const activeCollector = collectors[0]; // Rajesh Kumar
  const pendingReports = reports.filter((r) => r.status !== 'verified');

  const handleStartPickup = (reportId: string) => {
    updateReportStatus(reportId, 'in_progress');
  };

  const handleOpenVerification = (reportId: string) => {
    setActiveReportId(reportId);
    setCurrentPage('verification');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Collector Header Profile */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[2px] shadow-xl">
              <div className="w-full h-full bg-dark-950 rounded-[14px] flex items-center justify-center">
                <Truck className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
                  {activeCollector.name}
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                  ON DUTY (Active Shift)
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                <span className="font-mono text-cyan-300">{activeCollector.vehicleId} • {activeCollector.vehicleType}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400 font-mono">
                  <BatteryCharging className="w-3.5 h-3.5" />
                  {activeCollector.batteryPercent}% Battery
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                generateSmartRoute(activeCollector.id);
                setCurrentPage('smart-route');
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-eco-500 text-dark-950 font-bold text-xs shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>Generate AI Smart Route</span>
            </button>
          </div>
        </div>

        {/* Shift KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Organic Hauled Today</div>
            <div className="text-2xl font-black font-mono text-emerald-400">{activeCollector.totalCollectedKgToday} kg</div>
            <div className="text-xs text-slate-400">Fed to Biogas Digester #1</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Stops Completed</div>
            <div className="text-2xl font-black font-mono text-white">{activeCollector.completedStopsToday} / 12 Stops</div>
            <div className="text-xs text-slate-400">67% Shift Progress</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Mileage Efficiency</div>
            <div className="text-2xl font-black font-mono text-cyan-400">7.2 km Saved</div>
            <div className="text-xs text-slate-400">AI Dynamic TSP Routing</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Pending In Queue</div>
            <div className="text-2xl font-black font-mono text-amber-400">{pendingReports.length} Pickups</div>
            <div className="text-xs text-slate-400">Sector A & D Corridor</div>
          </div>
        </div>

        {/* Priority Pickup Queue List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Real-Time Collection Queue</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Sorted by Bio-Mass Urgency</span>
          </div>

          <div className="space-y-3">
            {pendingReports.map((rep) => (
              <div
                key={rep.id}
                className="p-5 rounded-2xl bg-dark-900 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={rep.imageUrl}
                    alt={rep.id}
                    className="w-16 h-16 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white">{rep.id}</span>
                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                        rep.priority === 'urgent'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {rep.priority} priority
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-200 mt-1">{rep.location.address}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-3">
                      <span>{rep.quantityKg} kg {rep.classification.primaryCategory}</span>
                      <span>•</span>
                      <span>Reported by {rep.citizenName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  {rep.status === 'reported' && (
                    <button
                      onClick={() => handleStartPickup(rep.id)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs transition-colors"
                    >
                      Accept & Start Pickup →
                    </button>
                  )}
                  {rep.status === 'assigned' && (
                    <button
                      onClick={() => handleStartPickup(rep.id)}
                      className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-colors"
                    >
                      Mark Arrived on Site →
                    </button>
                  )}
                  {rep.status === 'in_progress' && (
                    <button
                      onClick={() => handleOpenVerification(rep.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-md transition-colors"
                    >
                      Log Scale Weight & Verify →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
