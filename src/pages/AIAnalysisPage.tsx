import React, { useState } from 'react';
import {
  Sparkles,
  Upload,
  Scan,
  Flame,
  Zap,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Droplets,
  Activity
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { SAMPLE_WASTE_DATASET, SampleWasteItem } from '../data/sampleWasteImages';

export const AIAnalysisPage: React.FC = () => {
  const { setCurrentPage } = useAppStore();
  const [selectedItem, setSelectedItem] = useState<SampleWasteItem>(SAMPLE_WASTE_DATASET[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const handleSelectSample = (item: SampleWasteItem) => {
    setIsProcessing(true);
    setSelectedItem(item);
    setCustomImage(null);
    setTimeout(() => setIsProcessing(false), 500);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 600);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Computer Vision Bio-Kinetics Lab
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            AI Deep Waste Analysis Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Multi-spectral convolutional vision model trained to evaluate organic feedstock purity, detect inorganic contaminants, and forecast biochemical methane potential (BMP).
          </p>
        </div>

        {/* Sample Selection Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_WASTE_DATASET.map((sample) => {
            const isSelected = selectedItem.id === sample.id && !customImage;
            return (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'bg-purple-500/20 border-purple-400 ring-2 ring-purple-500/30'
                    : 'bg-dark-900 hover:bg-dark-850 border-white/5 opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={sample.thumbnail}
                  alt={sample.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white truncate">{sample.name}</div>
                  <div className="text-[10px] text-purple-400 font-mono mt-0.5">{sample.category}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Analysis Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Viewport with Bounding Boxes */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Scan className="w-4 h-4 text-purple-400" />
                  Neural Vision Object Detection
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Model: BioSeg-ResNet50
                </span>
              </div>

              {/* Viewport Frame */}
              <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10 bg-dark-950">
                <img
                  src={customImage || selectedItem.thumbnail}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />

                {isProcessing ? (
                  <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
                    <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
                    <span className="text-xs font-mono text-purple-300">Extracting Biochemical Vectors...</span>
                  </div>
                ) : (
                  <>
                    {/* Scanning Line */}
                    <div className="absolute inset-x-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_#06b6d4] animate-shimmer" />

                    {/* Bounding Box Overlays */}
                    {selectedItem.boundingBoxes.map((box, idx) => (
                      <div
                        key={idx}
                        className="absolute border-2 border-eco-400 bg-eco-500/20 rounded-lg p-1.5 text-[10px] font-mono font-bold text-eco-300"
                        style={{
                          top: `${box.y}%`,
                          left: `${box.x}%`,
                          width: `${box.width}%`,
                          height: `${box.height}%`,
                        }}
                      >
                        <span className="bg-dark-950/90 px-1.5 py-0.5 rounded border border-eco-500/40">
                          {box.label}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Upload Custom */}
              <label className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-white/15 hover:border-purple-400/50 bg-dark-950 cursor-pointer text-xs font-semibold text-slate-300 hover:text-white transition-colors">
                <Upload className="w-4 h-4 text-purple-400" />
                <span>Upload Custom Photo for Lab Inference</span>
                <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Right: Bio-Methanation Physical Metrics */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-dark-900 border border-purple-500/30 shadow-2xl space-y-6">
              <div>
                <div className="text-xs font-mono text-purple-400 uppercase font-bold">
                  Recommended Routing Destination
                </div>
                <h3 className="text-xl font-bold text-white mt-1">{selectedItem.suggestedAction}</h3>
              </div>

              {/* 4 Bio-Kinetic Parameters */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-dark-950 border border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Moisture Content</span>
                  </div>
                  <div className="text-xl font-black font-mono text-cyan-400 mt-1">
                    {selectedItem.moisturePercent}%
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Wet basis</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-dark-950 border border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Methane Yield (BMP)</span>
                  </div>
                  <div className="text-xl font-black font-mono text-amber-400 mt-1">
                    {selectedItem.estimatedMethaneYieldM3PerKg} m³/kg
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Biochemical yield</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-dark-950 border border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Activity className="w-3.5 h-3.5 text-rose-400" />
                    <span>Calorific Energy</span>
                  </div>
                  <div className="text-xl font-black font-mono text-white mt-1">
                    {selectedItem.calorificValueKcalPerKg} kcal/kg
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Higher heating value</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-dark-950 border border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Zap className="w-3.5 h-3.5 text-energy-light" />
                    <span>Net Electricity</span>
                  </div>
                  <div className="text-xl font-black font-mono text-energy-light mt-1">
                    {(selectedItem.estimatedMethaneYieldM3PerKg * 2.0).toFixed(2)} kWh/kg
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Micro-CHP electrical</div>
                </div>
              </div>

              {/* Detected Objects Tag Cloud */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Detected Bio-Constituents:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.detectedObjects.map((obj, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-dark-950 text-eco-300 border border-eco-500/20 text-xs font-mono"
                    >
                      ✓ {obj}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('report')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-eco-500 text-dark-950 font-bold text-xs shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]"
                >
                  File Waste Report with this Composition →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
