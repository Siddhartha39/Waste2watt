import React from 'react';
import {
  Leaf,
  Zap,
  Flame,
  Trophy,
  PlusCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const CitizenDashboard: React.FC = () => {
  const { currentUser, reports, setCurrentPage, setActiveReportId } = useAppStore();

  const userReports = reports.slice(0, 4); // active recent reports

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-eco-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* User Hero Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-eco-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-eco-500 shadow-xl"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
                    {currentUser.name}
                  </h1>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-eco-500/20 text-eco-300 border border-eco-500/30">
                    {currentUser.level}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentUser.sector}</span>
                  <span>•</span>
                  <span>{currentUser.email}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('report')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-eco-500 to-cyan-500 text-dark-950 font-bold text-xs shadow-lg shadow-eco-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report New Waste Batch</span>
            </button>
          </div>
        </div>

        {/* 4 Citizen KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-dark-850 text-eco-400"><Leaf className="w-4 h-4" /></div>
              <span className="text-[10px] font-mono text-eco-400 bg-eco-500/10 px-2 py-0.5 rounded-full">Lifetime</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">{currentUser.wasteDivertedKg} kg</div>
            <div className="text-xs text-slate-400">Bio-Waste Diverted</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-dark-850 text-energy-light"><Zap className="w-4 h-4" /></div>
              <span className="text-[10px] font-mono text-energy-light bg-amber-500/10 px-2 py-0.5 rounded-full">Yield</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">{currentUser.energyCreatedKwh} kWh</div>
            <div className="text-xs text-slate-400">Clean Electricity Created</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-dark-850 text-amber-400"><Trophy className="w-4 h-4" /></div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Redeemable</span>
            </div>
            <div className="text-2xl font-black font-mono text-amber-400">{currentUser.ecoPoints} pts</div>
            <div className="text-xs text-slate-400">Eco-Points Balance</div>
          </div>

          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-dark-850 text-cyan-400"><Clock className="w-4 h-4" /></div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">Active</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">{reports.length} Reports</div>
            <div className="text-xs text-slate-400">Total Submissions</div>
          </div>
        </div>

        {/* Active Waste Reports & Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Reports Tracking */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-eco-400" />
                Active Waste Reports & Tracking
              </h2>
              <button
                onClick={() => setCurrentPage('my-reports')}
                className="text-xs text-eco-400 hover:text-eco-300 font-semibold"
              >
                View all reports →
              </button>
            </div>

            <div className="space-y-3">
              {userReports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-4 rounded-2xl bg-dark-900 border border-white/10 hover:border-eco-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={rep.imageUrl}
                      alt={rep.id}
                      className="w-14 h-14 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white">{rep.id}</span>
                        <span
                          className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                            rep.status === 'verified'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : rep.status === 'in_progress' || rep.status === 'assigned'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {rep.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-1 truncate max-w-xs">{rep.location.address}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {rep.quantityKg} kg {rep.classification.primaryCategory} • {rep.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto text-right">
                    <div className="text-xs font-mono font-bold text-energy-light">
                      +{rep.ecoPointsAwarded} Eco-Points
                    </div>
                    <button
                      onClick={() => {
                        setActiveReportId(rep.id);
                        setCurrentPage('my-reports');
                      }}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold mt-1"
                    >
                      Track Stepper →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Badges & Sector Schedule */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sector Pickup Schedule */}
            <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Sector A Collection Schedule</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-dark-850 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-300">Morning Canteen Run</span>
                  <span className="font-mono text-eco-400 font-bold">08:00 - 10:30 AM</span>
                </div>
                <div className="p-2.5 rounded-xl bg-dark-850 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-300">Evening Hostel Dining</span>
                  <span className="font-mono text-cyan-400 font-bold">07:30 - 09:30 PM</span>
                </div>
              </div>
            </div>

            {/* Unlocked Badges Showcase */}
            <div className="p-5 rounded-3xl bg-dark-900 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Green Achievements
                </span>
                <span className="text-[10px] font-mono text-amber-400">3 Unlocked</span>
              </div>

              <div className="space-y-2">
                {currentUser.badges.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 rounded-2xl bg-dark-850 border border-white/5 flex items-center gap-3"
                  >
                    <span className="text-2xl">{b.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{b.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{b.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
