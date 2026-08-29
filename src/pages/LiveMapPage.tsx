import React, { useState } from 'react';
import {
  MapPin,
  Filter,
  Layers,
  Truck,
  Flame,
  Zap,
  Clock,
  Weight,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Navigation
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { COMMUNITY_LOCATIONS } from '../data/mockLocations';
import { WasteCategory, WasteReport } from '../types';
import { InteractiveLeafletMap } from '../components/common/InteractiveLeafletMap';

export const LiveMapPage: React.FC = () => {
  const { reports, collectors, setCurrentPage, setActiveReportId, assignReportToCollector } = useAppStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeReport, setActiveReport] = useState<WasteReport>(reports[0]);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);

  const filteredReports = reports.filter((r) => {
    if (selectedCategory !== 'all' && r.classification.primaryCategory !== selectedCategory) return false;
    if (selectedStatus !== 'all' && r.status !== selectedStatus) return false;
    return true;
  });

  const getMarkerColor = (rep: WasteReport) => {
    if (rep.priority === 'urgent') return 'bg-rose-500 border-rose-300 ring-4 ring-rose-500/40 animate-pulse';
    if (rep.classification.primaryCategory === 'organic') return 'bg-emerald-500 border-emerald-300 ring-2 ring-emerald-500/30';
    if (rep.classification.primaryCategory === 'recyclable') return 'bg-cyan-500 border-cyan-300 ring-2 ring-cyan-500/30';
    return 'bg-amber-500 border-amber-300';
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-dark-950 text-slate-100 relative overflow-hidden flex flex-col">
      {/* Top Map Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-4 z-20">
        <div className="p-4 rounded-2xl bg-dark-900/90 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white flex items-center gap-2">
                <span>Decentralized Community Waste Mesh</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {filteredReports.length} Active Nodes
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                IIT Guwahati Campus & Surrounding Municipal Wards
              </p>
            </div>
          </div>

          {/* Filter Toggles */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-dark-850 border border-white/10 text-slate-200 rounded-xl px-3 py-1.5 font-medium focus:outline-none focus:border-eco-500"
            >
              <option value="all">All Waste Streams</option>
              <option value="organic">🌱 Organic (Biogas)</option>
              <option value="recyclable">♻️ Recyclable</option>
              <option value="paper">📄 Paper</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-dark-850 border border-white/10 text-slate-200 rounded-xl px-3 py-1.5 font-medium focus:outline-none focus:border-eco-500"
            >
              <option value="all">All Statuses</option>
              <option value="reported">Reported (Pending)</option>
              <option value="assigned">Collector Dispatched</option>
              <option value="verified">Verified Clean</option>
            </select>

            {/* Heatmap Toggle */}
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                showHeatmap
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-dark-850 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              🔥 Heatmap
            </button>

            <button
              onClick={() => setCurrentPage('smart-route')}
              className="px-4 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Route Dispatch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Viewport & Detail Inspector Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Fullscreen Interactive Real Leaflet Map Canvas */}
        <div className="lg:col-span-8 rounded-3xl bg-dark-900 border border-white/10 p-2 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <InteractiveLeafletMap
            reports={filteredReports}
            activeReportId={activeReport?.id}
            onSelectReport={(id) => {
              const rep = filteredReports.find((r) => r.id === id);
              if (rep) setActiveReport(rep);
            }}
            height="550px"
            showRoute={true}
          />
        </div>

        {/* Right Selected Node Inspector */}
        <div className="lg:col-span-4 space-y-4">
          {activeReport ? (
            <div className="p-6 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div>
                  <span className="text-xs font-mono text-eco-400 font-bold">{activeReport.id}</span>
                  <div className="text-sm font-bold text-white capitalize">{activeReport.classification.primaryCategory} Waste Node</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-dark-800 text-cyan-300 border border-white/5 uppercase">
                  {activeReport.status}
                </span>
              </div>

              {/* Photo & GPS */}
              <div className="h-44 rounded-2xl overflow-hidden border border-white/10 relative">
                <img
                  src={activeReport.imageUrl}
                  alt={activeReport.id}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-dark-950/90 text-[10px] font-mono text-white">
                  {activeReport.quantityKg} kg • {activeReport.containerType.replace('_', ' ')}
                </div>
              </div>

              {/* Node Details */}
              <div className="p-3.5 rounded-2xl bg-dark-950 border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-bold text-white text-right max-w-[180px] truncate">{activeReport.location.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Reported By:</span>
                  <span className="text-slate-200">{activeReport.citizenName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Collector:</span>
                  <span className="text-cyan-400 font-mono">{activeReport.assignedCollectorName || 'Unassigned Queue'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Potential Biogas:</span>
                  <span className="text-amber-400 font-mono font-bold">{activeReport.biogasGeneratedM3} m³</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    assignReportToCollector(activeReport.id, 'col-1');
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-eco-500 to-cyan-500 text-dark-950 font-bold text-xs shadow-md transition-transform active:scale-98"
                >
                  Assign to EV Truck #01 →
                </button>
                <button
                  onClick={() => setCurrentPage('smart-route')}
                  className="w-full py-2 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-300 text-xs font-semibold border border-white/5 transition-colors"
                >
                  Generate Collection Route
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-dark-900 border border-white/10 text-center text-slate-400 text-xs">
              Click any pin on the map to inspect spatial node metadata.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
