import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  Flame,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Filter,
  Layers,
  Leaf
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { WasteReport } from '../types';

export const MyReportsPage: React.FC = () => {
  const { reports, activeReportId, setActiveReportId, setCurrentPage } = useAppStore();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const selectedReport = reports.find((r) => r.id === activeReportId) || reports[0];

  const filteredReports = reports.filter((r) => {
    if (filterCategory === 'all') return true;
    return r.classification.primaryCategory === filterCategory;
  });

  const getStatusBadge = (status: WasteReport['status']) => {
    switch (status) {
      case 'verified':
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">VERIFIED</span>;
      case 'in_progress':
      case 'assigned':
        return <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">DISPATCHED</span>;
      default:
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">QUEUED</span>;
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              My Waste Reports & Bio-Energy Receipts
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Track the decentralized lifecycle of your reported waste from pickup to clean kilowatt-hours.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('report')}
            className="px-5 py-2.5 rounded-xl bg-eco-500 hover:bg-eco-400 text-dark-950 font-bold text-xs shadow-lg shadow-eco-500/20 transition-all self-start sm:self-center"
          >
            + Report New Batch
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {['all', 'organic', 'recyclable', 'paper'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterCategory(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs capitalize transition-all ${
                filterCategory === f
                  ? 'bg-eco-500 text-dark-950 font-bold shadow-md'
                  : 'bg-dark-900 text-slate-300 hover:bg-dark-850 border border-white/5'
              }`}
            >
              {f === 'all' ? 'All Waste Streams' : f}
            </button>
          ))}
        </div>

        {/* Two-Column Layout: Reports List & Inspector Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Reports List */}
          <div className="lg:col-span-6 space-y-3">
            {filteredReports.map((rep) => {
              const isSelected = selectedReport?.id === rep.id;
              return (
                <div
                  key={rep.id}
                  onClick={() => setActiveReportId(rep.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-eco-500/15 border-eco-400 ring-1 ring-eco-500/40 shadow-lg'
                      : 'bg-dark-900 hover:bg-dark-850 border-white/10'
                  }`}
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
                        {getStatusBadge(rep.status)}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 truncate max-w-[200px] sm:max-w-xs">
                        {rep.location.address}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {rep.quantityKg} kg • {rep.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-energy-light">
                      +{rep.ecoPointsAwarded} pts
                    </div>
                    <ChevronRight className={`w-4 h-4 ml-auto mt-1 ${isSelected ? 'text-eco-400' : 'text-slate-500'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Report Detailed Receipt */}
          <div className="lg:col-span-6">
            {selectedReport ? (
              <div className="p-6 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div>
                    <span className="text-xs font-mono text-eco-400 font-bold">{selectedReport.id}</span>
                    <h3 className="text-lg font-bold text-white">Batch Lifecycle Ledger</h3>
                  </div>
                  {getStatusBadge(selectedReport.status)}
                </div>

                {/* Photo & GPS */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-36 rounded-2xl overflow-hidden border border-white/10">
                    <img
                      src={selectedReport.imageUrl}
                      alt={selectedReport.id}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-dark-950 border border-white/5 flex flex-col justify-between text-xs">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Geotagged Sector</div>
                      <div className="font-bold text-white mt-0.5">{selectedReport.location.sector}</div>
                      <div className="text-[10px] text-slate-400 mt-1 truncate">{selectedReport.location.address}</div>
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400">
                      Priority: {selectedReport.priority.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Decentralized Stepper Progression */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Chain of Custody Stepper:
                  </div>
                  <div className="p-3.5 rounded-2xl bg-dark-950 border border-white/5 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-eco-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>1. Report Filed & AI Scanned ({selectedReport.classification.confidence * 100}% Confidence)</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>2. Assigned to EV Fleet ({selectedReport.assignedCollectorName || 'Rajesh Kumar'})</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>3. Slurry Prepared & Fed to Anaerobic Digester #1</span>
                    </div>
                  </div>
                </div>

                {/* Energy Generated Output Receipt */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-dark-950 via-dark-950 to-energy-glow/10 border border-energy-glow/30 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Biogas Yield</div>
                    <div className="text-sm font-bold text-amber-400 font-mono">{selectedReport.biogasGeneratedM3 || 1.52} m³</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">Clean Power</div>
                    <div className="text-sm font-bold text-energy-light font-mono">{selectedReport.energyGeneratedKwh || 3.72} kWh</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">CO₂ Mitigated</div>
                    <div className="text-sm font-bold text-eco-400 font-mono">{selectedReport.co2SavedKg || 38.7} kg</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">No report selected</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
