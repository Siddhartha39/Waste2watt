import React from 'react';
import {
  BrainCircuit,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  MapPin,
  Info
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const PredictiveAISection: React.FC = () => {
  const { setCurrentPage } = useAppStore();

  const sectorForecasts = [
    { sector: 'Sector A (Hostels)', predictedKg: 184, confidence: '96%', risk: 'High Organic Surge', color: 'border-rose-500 bg-rose-500/10 text-rose-300' },
    { sector: 'Sector B (Academics)', predictedKg: 52, confidence: '91%', risk: 'Moderate Mixed', color: 'border-amber-500 bg-amber-500/10 text-amber-300' },
    { sector: 'Sector C (Faculty)', predictedKg: 38, confidence: '89%', risk: 'Normal Green Waste', color: 'border-emerald-500 bg-emerald-500/10 text-emerald-300' },
    { sector: 'Sector D (Market)', predictedKg: 135, confidence: '94%', risk: 'High Perishable Load', color: 'border-orange-500 bg-orange-500/10 text-orange-300' },
  ];

  return (
    <section className="py-24 relative bg-dark-950 border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-violet-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: AI Forecasting Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider">
              <BrainCircuit className="w-3.5 h-3.5" />
              Stage 10: Predictive Load Modeling
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Don't Just React. Predict.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Historical mess schedules, campus event calendars, and weather models train our LSTM time-series forecast engine to anticipate organic waste surges 24 to 72 hours in advance.
            </p>

            {/* Proactive Recommendation Card */}
            <div className="p-4 rounded-2xl bg-dark-900 border border-violet-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>AI Automated Fleet Recommendation</span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                "Hostel Sector A is predicted to generate <span className="text-rose-400 font-bold font-mono">184 kg (+42%)</span> organic waste tomorrow morning due to weekend dining."
              </p>
              <div className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-500/20 text-[11px] text-violet-200 flex items-center justify-between">
                <span>Recommended: Pre-position EV Truck #01 at 07:30 AM</span>
                <span className="font-mono text-emerald-400 font-bold">Auto-Queued</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('prediction')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-500/20 transition-all"
              >
                <span>Launch AI Predictive Planner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Heatmap & Forecast Matrix Visual */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-3xl bg-dark-900 border border-violet-500/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  <span>Campus Waste Generation Forecast (Tomorrow, 30 Aug 2026)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/30">
                  Model: LSTM-BioNet v2
                </span>
              </div>

              {/* 4 Sector Heatmap Forecast Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sectorForecasts.map((fc, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border ${fc.color} transition-all space-y-2`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-white">{fc.sector}</span>
                      <span className="text-[10px] font-mono">{fc.confidence} Conf.</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black font-mono text-white">
                        {fc.predictedKg} kg
                      </span>
                      <span className="text-[11px] font-mono text-slate-300">Bio-Load</span>
                    </div>
                    <div className="text-[10px] font-mono uppercase font-bold tracking-wider">
                      ● {fc.risk}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Enables proactive collection capacity planning before physical bins reach full capacity.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
