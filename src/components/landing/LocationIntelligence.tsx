import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Layers,
  ArrowRight,
  ShieldAlert,
  Clock,
  Weight,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { COMMUNITY_LOCATIONS } from '../../data/mockLocations';
import { InteractiveLeafletMap } from '../common/InteractiveLeafletMap';

export const LocationIntelligence: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [activePinIndex, setActivePinIndex] = useState<number>(0);

  const mapReports = [
    {
      id: 'WW-2026-00448',
      location: COMMUNITY_LOCATIONS[0].name,
      address: COMMUNITY_LOCATIONS[0].address,
      wasteType: 'Organic Canteen Peels',
      quantityKg: 24.5,
      priority: 'high',
      color: 'bg-emerald-500 border-emerald-300 text-emerald-950',
      time: '11:20 AM',
      top: '35%',
      left: '42%',
    },
    {
      id: 'WW-2026-00449',
      location: COMMUNITY_LOCATIONS[1].name,
      address: COMMUNITY_LOCATIONS[1].address,
      wasteType: 'Lawn Leaves & Foliage',
      quantityKg: 38.0,
      priority: 'normal',
      color: 'bg-green-400 border-green-200 text-green-950',
      time: '11:45 AM',
      top: '25%',
      left: '58%',
    },
    {
      id: 'WW-2026-00450',
      location: COMMUNITY_LOCATIONS[4].name,
      address: COMMUNITY_LOCATIONS[4].address,
      wasteType: 'Market Perishables',
      quantityKg: 62.0,
      priority: 'urgent',
      color: 'bg-rose-500 border-rose-300 text-rose-950 ring-4 ring-rose-500/30 animate-pulse',
      time: '12:15 PM',
      top: '65%',
      left: '28%',
    },
    {
      id: 'WW-2026-00451',
      location: COMMUNITY_LOCATIONS[5].name,
      address: COMMUNITY_LOCATIONS[5].address,
      wasteType: 'PET Bottles & Cans',
      quantityKg: 12.0,
      priority: 'normal',
      color: 'bg-cyan-500 border-cyan-300 text-cyan-950',
      time: '12:40 PM',
      top: '55%',
      left: '70%',
    },
  ];

  const activeReport = mapReports[activePinIndex];

  return (
    <section className="py-24 relative bg-dark-950 border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Stage 2: Spatial Intelligence
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              2. Every Report Gets a Location
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every report becomes actionable geographic data. Geotagged coordinates, estimated biomass weight, and priority levels are plotted onto the decentralized spatial layer for intelligent collection dispatch.
            </p>

            {/* Marker Legend */}
            <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 space-y-2.5">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Geographic Marker Classification:
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30" />
                  <span>Green = High-Yield Organic</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-cyan-500 ring-2 ring-cyan-500/30" />
                  <span>Blue = Recyclables</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-500/30" />
                  <span>Yellow = Mixed Stream</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-3 h-3 rounded-full bg-rose-500 ring-2 ring-rose-500/30 animate-pulse" />
                  <span>Red = Urgent Pickup</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('live-map')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
              >
                <span>Open Fullscreen Live Waste Map</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Interactive Real OpenStreetMap Canvas */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-dark-900 border border-cyan-500/30 p-2 shadow-2xl overflow-hidden">
              <InteractiveLeafletMap height="430px" showRoute={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
