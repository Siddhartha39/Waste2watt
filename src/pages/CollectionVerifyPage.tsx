import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Camera,
  Scale,
  Upload,
  Sparkles,
  QrCode,
  ArrowRight,
  Flame,
  Zap,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppStore } from '../store/useAppStore';
import { calculateEcoPoints } from '../data/conversionMath';

export const CollectionVerifyPage: React.FC = () => {
  const {
    reports,
    activeReportId,
    verifyCollection,
    setCurrentPage,
    currentUser
  } = useAppStore();

  const reportToVerify = reports.find((r) => r.id === activeReportId) || reports[0];
  const [actualWeightKg, setActualWeightKg] = useState<number>(reportToVerify.quantityKg || 25.0);
  const [cleanSitePhoto, setCleanSitePhoto] = useState<string>('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(reportToVerify.status === 'verified');

  const earnedPoints = calculateEcoPoints(actualWeightKg, 0.96, reportToVerify.priority === 'urgent');

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      verifyCollection(reportToVerify.id, cleanSitePhoto, actualWeightKg);
      setIsVerifying(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10b981', '#22c55e', '#38bdf8', '#fbbf24'],
        });
      } catch {
        // ignore
      }
    }, 800);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Chain of Custody Protocol
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Collection Verification Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Verify clean site remediation, record gross scale weight, and authorize automatic feedstock transfer to the bio-digester plant.
          </p>
        </div>

        {/* Verification Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-emerald-500/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div>
              <span className="text-xs font-mono text-eco-400 font-bold">{reportToVerify.id}</span>
              <h3 className="text-base font-bold text-white">Pickup Location: {reportToVerify.location.address}</h3>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-dark-850 text-cyan-400 border border-white/5">
              Collector: EV Truck #01
            </span>
          </div>

          {/* Before & Clean After Photos Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>1. Original Reported Photo</span>
                <span className="text-[10px] text-rose-400 font-mono">BEFORE</span>
              </div>
              <div className="h-48 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={reportToVerify.imageUrl}
                  alt="Original Waste"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>2. Clean Site Remediation Photo</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">AFTER (Verified)</span>
              </div>
              <div className="h-48 rounded-2xl overflow-hidden border border-emerald-500/40 relative">
                <img
                  src={cleanSitePhoto}
                  alt="Clean Site"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/90 text-dark-950 text-[9px] font-mono font-bold">
                  ✓ CLEAN PHOTO VERIFIED
                </div>
              </div>
            </div>
          </div>

          {/* Scale Weight Logger */}
          <div className="p-5 rounded-2xl bg-dark-950 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                Gross Truck Scale Weight (kg):
              </span>
              <span className="text-xl font-black font-mono text-emerald-400">{actualWeightKg} kg</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              step="0.5"
              value={actualWeightKg}
              onChange={(e) => setActualWeightKg(Number(e.target.value))}
              className="w-full h-2 bg-dark-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Verification Impact Summary */}
          <div className="p-4 rounded-2xl bg-dark-950 border border-eco-500/20 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <div className="text-[10px] text-slate-400 font-mono">Citizen Points</div>
              <div className="text-sm font-bold text-energy-light font-mono">+{earnedPoints} Pts</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono">Biogas Batch</div>
              <div className="text-sm font-bold text-amber-400 font-mono">{(actualWeightKg * 0.062).toFixed(2)} m³</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono">CO₂ Mitigated</div>
              <div className="text-sm font-bold text-eco-400 font-mono">{(actualWeightKg * 1.58).toFixed(1)} kg</div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            {isSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Collection Verified & Feedstock Transferred to Biogas Plant!</span>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setCurrentPage('segregation')}
                    className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-dark-950 font-bold text-xs shadow-md transition-all"
                  >
                    Open Segregation Intake →
                  </button>
                  <button
                    onClick={() => setCurrentPage('biogas')}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs shadow-md transition-all"
                  >
                    Open Biogas Plant Dashboard →
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-eco-500 to-cyan-500 text-dark-950 font-black text-xs shadow-xl shadow-emerald-500/30 hover:scale-[1.01] active:scale-98 transition-all disabled:opacity-50"
              >
                {isVerifying ? 'Sealing Cryptographic Proof & Updating Mesh...' : 'Confirm Verification & Feed Bio-Slurry →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
