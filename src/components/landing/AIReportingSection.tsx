import React, { useState } from 'react';
import {
  Camera,
  Scan,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Cpu,
  Flame
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { SAMPLE_WASTE_DATASET } from '../../data/sampleWasteImages';

export const AIReportingSection: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const currentSample = SAMPLE_WASTE_DATASET[selectedSampleIndex];

  const handleSampleChange = (index: number) => {
    setIsScanning(true);
    setSelectedSampleIndex(index);
    setTimeout(() => setIsScanning(false), 600);
  };

  return (
    <section className="py-24 relative bg-dark-900 border-t border-white/10 overflow-hidden">
      {/* Background Cinematic Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 pointer-events-none"
        >
          <source src="/video/report-waste.mp4" type="video/mp4" />
        </video>
        {/* Soft gradient overlay to keep text and interactive controls crisp & readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-900/85 to-dark-950/90 dark:from-dark-950/95 dark:via-dark-950/85 dark:to-dark-950/95" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-dark-950/30 to-dark-950/80" />
      </div>

      {/* Background glow accents */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-500/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text & Interactive Sample Picker */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Scan className="w-3.5 h-3.5" />
              Stage 1: AI Waste Classification
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              1. Report Waste
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every citizen report begins with instant computer vision analysis.
              Our neural network detects material composition, quantifies organic purity, and determines the optimal bio-energy conversion pathway.
            </p>

            {/* Interactive Sample Image Selector */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Select a Sample to Test the Vision Model:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SAMPLE_WASTE_DATASET.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => handleSampleChange(idx)}
                    className={`p-2 rounded-xl border text-left transition-all flex flex-col items-center gap-1.5 backdrop-blur-md ${
                      selectedSampleIndex === idx
                        ? 'bg-purple-500/20 border-purple-400 ring-1 ring-purple-400'
                        : 'bg-dark-850/80 hover:bg-dark-800 border-white/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={s.thumbnail}
                      alt={s.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="text-[10px] font-medium text-white truncate max-w-[80px]">
                      {s.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setCurrentPage('report')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-eco-500 to-cyan-500 text-dark-950 font-bold text-xs shadow-lg shadow-eco-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Try Waste Detection Tool</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Phone Mockup UI */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[340px] bg-dark-950/95 backdrop-blur-2xl rounded-[40px] p-3 border-4 border-slate-700 shadow-2xl shadow-purple-500/20">
              {/* Phone Speaker Notch */}
              <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
                <div className="w-10 h-1 bg-slate-700 rounded-full" />
              </div>

              {/* Phone Screen */}
              <div className="bg-dark-900/95 rounded-[28px] p-4 border border-white/10 space-y-3">
                {/* Camera Viewport with Bounding Box Overlay */}
                <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-dark-950">
                  <img
                    src={currentSample.thumbnail}
                    alt={currentSample.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Scanning Laser Line */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer" />

                  {/* Bounding Box Overlays */}
                  {currentSample.boundingBoxes.map((box, bIdx) => (
                    <div
                      key={bIdx}
                      className="absolute border-2 border-eco-400 bg-eco-500/15 rounded-lg text-[9px] font-mono font-bold text-eco-300 p-1 flex items-start"
                      style={{
                        top: `${box.y}%`,
                        left: `${box.x}%`,
                        width: `${box.width}%`,
                        height: `${box.height}%`,
                      }}
                    >
                      <span className="bg-dark-950/90 px-1 py-0.5 rounded border border-eco-500/40">
                        {box.label}
                      </span>
                    </div>
                  ))}

                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-cyan-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Edge AI Inference: 42ms</span>
                  </div>
                </div>

                {/* Classification Breakdown Bars */}
                <div className="p-3 rounded-xl bg-dark-850/90 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white">Organic Biomass</span>
                    <span className="font-mono font-bold text-eco-400">{currentSample.breakdown.organic}%</span>
                  </div>
                  <div className="w-full bg-dark-950 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-eco-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${currentSample.breakdown.organic}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-300">Recyclable Plastic</span>
                    <span className="font-mono text-cyan-400">{currentSample.breakdown.plastic}%</span>
                  </div>
                  <div className="w-full bg-dark-950 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${currentSample.breakdown.plastic}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-300">Paper & Residual</span>
                    <span className="font-mono text-slate-400">
                      {currentSample.breakdown.paper + currentSample.breakdown.residual}%
                    </span>
                  </div>
                </div>

                {/* Primary Category & Recommended Route */}
                <div className="p-3 rounded-xl bg-eco-500/10 border border-eco-500/30 text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-eco-300">
                    <Flame className="w-3.5 h-3.5 text-eco-400" />
                    <span>Primary: {currentSample.category.toUpperCase()} WASTE</span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-1 leading-snug">
                    {currentSample.suggestedAction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
