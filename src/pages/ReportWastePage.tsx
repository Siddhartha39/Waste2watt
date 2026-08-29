import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  MapPin,
  Scale,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  Flame,
  AlertCircle,
  Clock,
  Weight,
  Layers,
  Zap,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppStore } from '../store/useAppStore';
import { SAMPLE_WASTE_DATASET, SampleWasteItem } from '../data/sampleWasteImages';
import { COMMUNITY_LOCATIONS } from '../data/mockLocations';
import { calculateBiogasOutput, calculateElectricityOutput, calculateEcoPoints } from '../data/conversionMath';

export const ReportWastePage: React.FC = () => {
  const { addReport, setCurrentPage, setActiveReportId } = useAppStore();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSample, setSelectedSample] = useState<SampleWasteItem>(SAMPLE_WASTE_DATASET[0]);
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [hasScanned, setHasScanned] = useState<boolean>(false);

  // Form State
  const [selectedLocationId, setSelectedLocationId] = useState<string>(COMMUNITY_LOCATIONS[0].id);
  const [quantityKg, setQuantityKg] = useState<number>(24.5);
  const [containerType, setContainerType] = useState<'household_bin' | 'bulk_bag' | 'canteen_drum' | 'street_pile'>('canteen_drum');
  const [priority, setPriority] = useState<'low' | 'normal' | 'high' | 'urgent'>('high');
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);

  const selectedLoc = COMMUNITY_LOCATIONS.find((l) => l.id === selectedLocationId) || COMMUNITY_LOCATIONS[0];
  const biogasM3 = calculateBiogasOutput(quantityKg);
  const electricityKwh = calculateElectricityOutput(biogasM3);
  const expectedPoints = calculateEcoPoints(quantityKg, 0.94, priority === 'urgent' || priority === 'high');

  const handleRunAIScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
      setCurrentStep(2);
    }, 1000);
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImageUrl(url);
      handleRunAIScan();
    }
  };

  const handleSubmitReport = () => {
    const createdReport = addReport({
      imageUrl: customImageUrl || selectedSample.thumbnail,
      location: {
        lat: selectedLoc.lat,
        lng: selectedLoc.lng,
        address: selectedLoc.address,
        sector: selectedLoc.sector,
      },
      classification: {
        primaryCategory: selectedSample.category,
        confidence: selectedSample.confidence,
        breakdown: selectedSample.breakdown,
        suggestedAction: selectedSample.suggestedAction,
        calorificValueKcalPerKg: selectedSample.calorificValueKcalPerKg,
        estimatedMethaneYieldM3PerKg: selectedSample.estimatedMethaneYieldM3PerKg,
        detectedObjects: selectedSample.detectedObjects,
        boundingBoxes: selectedSample.boundingBoxes,
      },
      quantityKg,
      containerType,
      priority,
    });

    setSubmittedReportId(createdReport.id);
    setActiveReportId(createdReport.id);
    setCurrentStep(5);

    // Celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#06b6d4', '#fbbf24', '#ffffff'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-eco-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-eco-500/10 border border-eco-500/20 text-eco-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Assisted Source Segregation
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Report Community Waste
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Upload a photo of your segregated organic biomass. Our AI scans purity and schedules priority collection for local anaerobic digestion.
          </p>
        </div>

        {/* Wizard Step Progress Stepper */}
        {currentStep < 5 && (
          <div className="mb-8 p-4 rounded-2xl bg-dark-900 border border-white/10">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {[
                { step: 1, label: '1. Photo Capture' },
                { step: 2, label: '2. AI Scan' },
                { step: 3, label: '3. Geolocation' },
                { step: 4, label: '4. Quantity' },
              ].map((s) => (
                <div
                  key={s.step}
                  className={`p-2 rounded-xl border transition-all ${
                    currentStep === s.step
                      ? 'bg-eco-500/20 border-eco-400 text-eco-300 font-bold'
                      : currentStep > s.step
                      ? 'bg-dark-850 border-eco-500/30 text-slate-300'
                      : 'bg-dark-950 border-white/5 text-slate-500'
                  }`}
                >
                  <span className="font-mono">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Image Capture & Sample Selector */}
        {currentStep === 1 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-eco-400" />
                Step 1: Capture or Select Waste Image
              </span>
              <span className="text-xs font-mono text-slate-400">Step 1 of 4</span>
            </div>

            {/* Curated Sample Waste Selection */}
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Select from Curated Community Waste Samples:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SAMPLE_WASTE_DATASET.map((sample) => {
                  const isSelected = selectedSample.id === sample.id && !customImageUrl;
                  return (
                    <div
                      key={sample.id}
                      onClick={() => {
                        setSelectedSample(sample);
                        setCustomImageUrl('');
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-eco-500/15 border-eco-400 ring-2 ring-eco-500/30'
                          : 'bg-dark-850 hover:bg-dark-800 border-white/5'
                      }`}
                    >
                      <img
                        src={sample.thumbnail}
                        alt={sample.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{sample.name}</div>
                        <div className="text-[10px] text-eco-400 font-mono mt-0.5">
                          {sample.breakdown.organic}% Organic Biomass
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          {sample.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Or Custom Upload */}
            <div className="pt-2">
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/15 hover:border-eco-400/50 rounded-2xl cursor-pointer bg-dark-950/60 hover:bg-dark-950 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs font-bold text-slate-200">
                  Or Upload Custom Waste Photo / Camera Snap
                </span>
                <span className="text-[10px] text-slate-400 mt-1">JPEG, PNG, WebP up to 10MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Run Scan Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleRunAIScan}
                disabled={isScanning}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-eco-500 to-cyan-500 text-dark-950 font-bold text-xs shadow-lg shadow-eco-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing Neural Features...</span>
                  </>
                ) : (
                  <>
                    <span>Run AI Classification</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: AI Classification Results */}
        {currentStep === 2 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Step 2: AI Composition & Conversion Potential
              </span>
              <span className="text-xs font-mono text-slate-400">Step 2 of 4</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Photo with Bounding Boxes */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-dark-950 h-64">
                <img
                  src={customImageUrl || selectedSample.thumbnail}
                  alt={selectedSample.name}
                  className="w-full h-full object-cover"
                />
                {selectedSample.boundingBoxes.map((b, i) => (
                  <div
                    key={i}
                    className="absolute border-2 border-eco-400 bg-eco-500/20 rounded-lg p-1 text-[9px] font-mono font-bold text-eco-300"
                    style={{ top: `${b.y}%`, left: `${b.x}%`, width: `${b.width}%`, height: `${b.height}%` }}
                  >
                    <span className="bg-dark-950/90 px-1 py-0.5 rounded border border-eco-500/40">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Classification Metrics */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-eco-500/10 border border-eco-500/30">
                  <div className="text-[10px] font-mono text-eco-400 uppercase font-bold">
                    Primary Detected Category:
                  </div>
                  <div className="text-base font-bold text-white capitalize">
                    {selectedSample.category} Organic Bio-Waste ({(selectedSample.confidence * 100).toFixed(0)}% Confidence)
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {selectedSample.suggestedAction}
                  </div>
                </div>

                {/* Breakdown Bars */}
                <div className="p-3.5 rounded-xl bg-dark-850 border border-white/5 space-y-2">
                  <div className="text-xs font-semibold text-slate-300">Constituent Fractions:</div>
                  <div className="space-y-1.5 text-[11px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-eco-400">🌱 Organic Biomass</span>
                      <span>{selectedSample.breakdown.organic}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyan-400">♻️ Recyclable Plastic</span>
                      <span>{selectedSample.breakdown.plastic}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-400">📄 Paper / Cardboard</span>
                      <span>{selectedSample.breakdown.paper}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-white/5">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-eco-500 hover:bg-eco-400 text-dark-950 font-bold text-xs shadow-md transition-all"
              >
                <span>Proceed to Location</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Geolocation Picker */}
        {currentStep === 3 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Step 3: Capture Geotagged Location
              </span>
              <span className="text-xs font-mono text-slate-400">Step 3 of 4</span>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Select Pickup Node in IIT Guwahati / Community:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMMUNITY_LOCATIONS.filter((l) => l.type !== 'biogas_plant' && l.type !== 'mrf_hub').map((loc) => {
                  const isSelected = selectedLocationId === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => setSelectedLocationId(loc.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-400 ring-2 ring-cyan-500/30 text-white'
                          : 'bg-dark-850 hover:bg-dark-800 border-white/5 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs font-bold">{loc.name}</div>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-dark-900 text-cyan-400">
                          {loc.sector.split(' ')[0]}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{loc.address}</div>
                      <div className="text-[9px] font-mono text-slate-400 mt-1">
                        GPS: {loc.lat.toFixed(4)}° N, {loc.lng.toFixed(4)}° E
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/5">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs shadow-md"
              >
                <span>Proceed to Quantity & Priority</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Quantity & Urgency */}
        {currentStep === 4 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-energy-light" />
                Step 4: Quantity Estimation & Urgency
              </span>
              <span className="text-xs font-mono text-slate-400">Step 4 of 4</span>
            </div>

            {/* Mass Slider */}
            <div className="p-5 rounded-2xl bg-dark-850 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase">Estimated Mass (kg):</span>
                <span className="text-xl font-black font-mono text-energy-light">{quantityKg} kg</span>
              </div>
              <input
                type="range"
                min="2"
                max="150"
                step="0.5"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-full h-2 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-energy-glow"
              />
            </div>

            {/* Container Type */}
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Container Type:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'household_bin', label: 'Household Bin (5-15 kg)' },
                  { id: 'canteen_drum', label: 'Canteen Drum (20-50 kg)' },
                  { id: 'bulk_bag', label: 'Bulk Leaf Bag (30-80 kg)' },
                  { id: 'street_pile', label: 'Commercial Pile (50+ kg)' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setContainerType(c.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      containerType === c.id
                        ? 'bg-amber-500/20 border-amber-400 text-white font-bold'
                        : 'bg-dark-850 hover:bg-dark-800 border-white/5 text-slate-400'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Tag */}
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Pickup Urgency Level:
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'normal', label: 'Normal (Standard Queue)', color: 'border-emerald-500 text-emerald-300' },
                  { id: 'high', label: 'High (Mess Rush Hour)', color: 'border-amber-500 text-amber-300' },
                  { id: 'urgent', label: 'Urgent (Overflow Risk)', color: 'border-rose-500 text-rose-300' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriority(p.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      priority === p.id
                        ? `bg-dark-800 ${p.color} font-bold ring-2 ring-white/10`
                        : 'bg-dark-850 hover:bg-dark-800 border-white/5 text-slate-400'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Anticipated Conversion Preview Card */}
            <div className="p-4 rounded-2xl bg-dark-950 border border-eco-500/30 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="text-[10px] text-slate-400 font-mono">Biogas Potential</div>
                <div className="text-sm font-bold text-amber-400 font-mono">{biogasM3} m³</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono">Clean Electricity</div>
                <div className="text-sm font-bold text-energy-light font-mono">{electricityKwh} kWh</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono">Eco-Points Reward</div>
                <div className="text-sm font-bold text-eco-400 font-mono">+{expectedPoints} Pts</div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-between border-t border-white/5">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleSubmitReport}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-eco-500 via-emerald-500 to-cyan-500 text-dark-950 font-black text-xs shadow-xl shadow-eco-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Geotagged Report</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Submission Success Confirmation Screen */}
        {currentStep === 5 && (
          <div className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-eco-500/40 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-3xl bg-eco-500/20 border-2 border-eco-400 mx-auto flex items-center justify-center shadow-lg shadow-eco-500/30 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-eco-400" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eco-500/10 text-eco-300 text-xs font-mono font-bold mb-2">
                REPORT REGISTERED SUCCESSFULLY
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
                Tracking ID: <span className="text-gradient-eco font-mono">{submittedReportId}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-2">
                Your bio-waste report has been broadcasted to the decentralized collection mesh and queued for optimized EV truck routing.
              </p>
            </div>

            {/* Real-time sync confirmation badges */}
            <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 max-w-lg mx-auto text-left text-xs space-y-2">
              <div className="font-bold text-white uppercase text-[11px] mb-1">
                Decentralized State Updates Triggered:
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-eco-400" />
                <span>Added to Live Waste Map as Green Organic Marker</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Pushed to Collector Dashboard priority task queue</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Estimated +{expectedPoints} Eco-Points reserved for your wallet</span>
              </div>
            </div>

            {/* Quick Action Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setCurrentPage('live-map')}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs shadow-md transition-all"
              >
                View on Live Waste Map →
              </button>
              <button
                onClick={() => setCurrentPage('collector')}
                className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-md transition-all"
              >
                Inspect Collector Dispatch →
              </button>
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setHasScanned(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 text-xs font-semibold transition-all"
              >
                Report Another Batch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
