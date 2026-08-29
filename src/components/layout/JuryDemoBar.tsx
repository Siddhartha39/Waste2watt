import React, { useState, useEffect } from 'react';
import {
  PlayCircle,
  PauseCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Zap,
  ArrowRight,
  Maximize2,
  Minimize2,
  X,
  ListOrdered
} from 'lucide-react';
import { useAppStore, JURY_STEPS } from '../../store/useAppStore';

export const JuryDemoBar: React.FC = () => {
  const {
    juryDemoOpen,
    setJuryDemoOpen,
    currentJuryStep,
    setJuryStep,
    nextJuryStep,
    prevJuryStep,
    isJuryAutoPlaying,
    toggleJuryAutoPlay,
    executeCurrentJuryStepAction,
    resetToDefaultState,
    currentPage
  } = useAppStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showStepList, setShowStepList] = useState(false);

  const stepInfo = JURY_STEPS[currentJuryStep - 1] || JURY_STEPS[0];
  const progressPercent = ((currentJuryStep) / 24) * 100;

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isJuryAutoPlaying) {
      timer = setInterval(() => {
        if (currentJuryStep < 24) {
          executeCurrentJuryStepAction();
          nextJuryStep();
        } else {
          toggleJuryAutoPlay();
        }
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isJuryAutoPlaying, currentJuryStep]);

  if (!juryDemoOpen) {
    return (
      <button
        onClick={() => setJuryDemoOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-dark-900/90 backdrop-blur-xl border border-eco-500/40 text-eco-300 shadow-2xl shadow-eco-500/20 hover:scale-105 active:scale-95 transition-all group"
      >
        <div className="relative">
          <PlayCircle className="w-5 h-5 text-eco-400 group-hover:rotate-45 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-eco-400 animate-ping" />
        </div>
        <div className="text-left">
          <div className="text-xs font-bold text-white leading-none">Interactive System Tour</div>
          <div className="text-[10px] text-eco-400 font-mono">Stage {currentJuryStep} of 24</div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xl z-50 animate-in slide-in-from-bottom-6 duration-200">
      <div className="glass-panel-glow rounded-2xl p-4 shadow-2xl border border-eco-500/30 bg-dark-900/95 backdrop-blur-2xl text-slate-100">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-eco-500/20 border border-eco-500/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-eco-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live System Walkthrough
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-eco-500/20 text-eco-300 border border-eco-500/30 font-semibold">
                  Step {currentJuryStep} / 24
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowStepList(!showStepList)}
              title="All 24 Demonstration Steps"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                showStepList ? 'bg-eco-500/20 text-eco-300' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              onClick={resetToDefaultState}
              title="Reset System to Clean State"
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-white/5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setJuryDemoOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-dark-800 h-1.5 rounded-full my-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-eco-400 via-cyan-400 to-energy-light h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Details */}
        <div className="mb-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-eco-400 font-mono text-xs">{currentJuryStep}.</span>
              {stepInfo.title}
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-800 text-cyan-300 border border-white/5">
              Module: {stepInfo.targetPage}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{stepInfo.description}</p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentJuryStep <= 1}
              onClick={prevJuryStep}
              className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 hover:text-white transition-colors"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={toggleJuryAutoPlay}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isJuryAutoPlaying
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                  : 'bg-dark-800 text-slate-300 hover:text-white hover:bg-dark-700'
              }`}
            >
              {isJuryAutoPlaying ? (
                <>
                  <PauseCircle className="w-4 h-4 text-amber-400" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4 text-eco-400" />
                  <span>Auto-Run</span>
                </>
              )}
            </button>

            <button
              disabled={currentJuryStep >= 24}
              onClick={nextJuryStep}
              className="p-2 rounded-xl bg-dark-800 hover:bg-dark-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 hover:text-white transition-colors"
              title="Next Step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              executeCurrentJuryStepAction();
            }}
            className="flex-1 max-w-[240px] flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-eco-500 to-cyan-500 text-dark-950 font-bold text-xs shadow-lg shadow-eco-500/20 hover:shadow-eco-500/40 hover:scale-[1.02] active:scale-98 transition-all"
          >
            <span>{stepInfo.actionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 24-Step Quick Jump Drawer */}
        {showStepList && (
          <div className="mt-3 pt-3 border-t border-white/10 max-h-64 overflow-y-auto space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              All 24 Operational Pipeline Milestones
            </div>
            {JURY_STEPS.map((s) => (
              <button
                key={s.step}
                onClick={() => {
                  setJuryStep(s.step);
                  setShowStepList(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                  s.step === currentJuryStep
                    ? 'bg-eco-500/20 text-eco-300 font-semibold border border-eco-500/30'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-slate-400 w-5">{s.step}.</span>
                  <span className="truncate">{s.title}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                  {s.targetPage}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
