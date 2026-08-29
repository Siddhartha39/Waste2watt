import React from 'react';
import {
  BrainCircuit,
  Calendar,
  Sparkles,
  TrendingUp,
  MapPin,
  Truck,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const AIPredictionPage: React.FC = () => {
  const { setCurrentPage } = useAppStore();

  const next7Days = [
    { day: 'Sun (Tomorrow)', date: '30 Aug', expectedKg: 640, risk: 'High Peak', color: 'border-rose-500 text-rose-300' },
    { day: 'Mon', date: '31 Aug', expectedKg: 420, risk: 'Moderate', color: 'border-amber-500 text-amber-300' },
    { day: 'Tue', date: '01 Sep', expectedKg: 390, risk: 'Normal', color: 'border-emerald-500 text-emerald-300' },
    { day: 'Wed', date: '02 Sep', expectedKg: 410, risk: 'Normal', color: 'border-emerald-500 text-emerald-300' },
    { day: 'Thu', date: '03 Sep', expectedKg: 450, risk: 'Moderate', color: 'border-amber-500 text-amber-300' },
    { day: 'Fri', date: '04 Sep', expectedKg: 580, risk: 'High Load', color: 'border-rose-500 text-rose-300' },
    { day: 'Sat', date: '05 Sep', expectedKg: 690, risk: 'Weekend Surge', color: 'border-rose-500 text-rose-300' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[400px] bg-violet-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <BrainCircuit className="w-3.5 h-3.5" />
              Machine Learning Time-Series Forecaster
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              AI Predictive Waste Load & Fleet Scheduling
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Anticipating organic waste generation surges across campus dining complexes to prevent bin overflow.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('smart-route')}
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Apply Proactive Dispatch Route →</span>
          </button>
        </div>

        {/* 7-Day Forecasting Horizon Grid */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-violet-400" />
              7-Day Campus Bio-Waste Forecast (IIT Guwahati)
            </span>
            <span className="text-[10px] font-mono text-violet-400">Confidence: 94.8% (LSTM Model)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {next7Days.map((d, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl bg-dark-950 border ${d.color} transition-all space-y-2 text-center`}
              >
                <div className="text-xs font-bold text-white">{d.day.split(' ')[0]}</div>
                <div className="text-[10px] text-slate-400 font-mono">{d.date}</div>
                <div className="text-xl font-black font-mono text-white pt-1">{d.expectedKg} kg</div>
                <span className="inline-block text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-dark-900">
                  {d.risk}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Proactive Recommendation & Calendar Event Correlation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-dark-900 border border-violet-500/30 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Key Event Drivers & Correlations</span>
            </div>
            <h3 className="text-lg font-bold text-white">Community & Campus Weekend Dining Surge</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Student mess dining attendance spikes +35% during weekend festivals. Model automatically flags Hostel Sector A and North Guwahati Market for early morning EV truck pre-positioning.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-dark-900 border border-eco-500/30 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-eco-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Digester Capacity Safeguard</span>
            </div>
            <h3 className="text-lg font-bold text-white">Adequate Biogas Buffer Available</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Digester Tank #1 has 1,160 kg headroom. High-rate UASB Tank #2 will absorb overflow with automated microbial temperature buffering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
