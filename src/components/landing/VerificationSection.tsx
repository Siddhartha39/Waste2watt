import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Camera,
  ArrowRight,
  Sparkles,
  QrCode,
  Scale,
  Clock
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const VerificationSection: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeStep, setActiveStep] = useState(3);

  const verificationWorkflow = [
    { title: 'Assigned', desc: 'Collector receives priority pickup task', time: '11:22 AM' },
    { title: 'Arrived', desc: 'GPS geofence detects EV truck on site', time: '11:34 AM' },
    { title: 'Collected', desc: 'Biomass weighed on digital truck scale', time: '11:38 AM' },
    { title: 'Verified', desc: 'Clean site photo + QR digital receipt', time: '11:40 AM' },
  ];

  return (
    <section className="py-24 relative bg-dark-950 border-t border-white/10 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Workflow Status */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              Stage 4: Trust & Verification
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              4. Collection Should Be Verifiable
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Decentralized operations require unforgeable proof.
              Every collection logs gross scale weight, captures a post-cleanup photo, and issues a tamper-evident digital receipt before Eco-Points are credited.
            </p>

            {/* Step Progression */}
            <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 space-y-3">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Chain of Custody Verification:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {verificationWorkflow.map((st, sIdx) => {
                  const isCurrent = activeStep >= sIdx;
                  return (
                    <div
                      key={st.title}
                      onClick={() => setActiveStep(sIdx)}
                      className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-emerald-500/20 border-emerald-400 text-white'
                          : 'bg-dark-850 border-white/5 text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-dark-900 mx-auto mb-1 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                        {sIdx + 1}
                      </div>
                      <div className="text-[11px] font-bold">{st.title}</div>
                      <div className="text-[9px] font-mono text-slate-400 mt-0.5">{st.time}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('verification')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
              >
                <span>Open Verification Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Interactive Before / After Split Slider */}
          <div className="lg:col-span-7">
            <div className="p-5 rounded-3xl bg-dark-900 border border-emerald-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  Site Cleanup Verification Proof (Report #WW-2026-00448)
                </span>
                <span className="font-mono text-emerald-400 font-bold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Status: VERIFIED
                </span>
              </div>

              {/* Before/After Visual Frame */}
              <div className="relative h-72 rounded-2xl overflow-hidden select-none border border-white/10">
                {/* AFTER Photo (Clean) */}
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                  alt="After Clean Site"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-dark-950 font-bold text-[10px] font-mono shadow-md">
                  AFTER: CLEAN
                </div>

                {/* BEFORE Photo (Waste) - Clipped by Slider */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                    alt="Before Reported Waste"
                    className="w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-500/90 text-white font-bold text-[10px] font-mono shadow-md">
                    BEFORE: REPORTED
                  </div>
                </div>

                {/* Slider Handle Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white text-dark-950 flex items-center justify-center text-xs font-bold shadow-lg">
                    ⇄
                  </div>
                </div>

                {/* Interactive Slider Input */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  aria-label="Before/After Comparison Slider"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                />
              </div>

              {/* Verified Metadata Footer */}
              <div className="p-3 rounded-2xl bg-dark-950 border border-white/5 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Scale Weight</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">24.5 kg Net</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Collector Unit</div>
                  <div className="text-sm font-bold text-white font-mono">EV Truck #01</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Eco-Points Minted</div>
                  <div className="text-sm font-bold text-energy-light font-mono">+118 Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
