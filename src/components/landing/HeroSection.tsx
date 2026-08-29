import React from 'react';
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  Home,
  Trash2,
  Cpu,
  Truck,
  Layers,
  Flame,
  Zap,
  Users,
  PlayCircle,
  Leaf,
  Recycle,
  MapPin,
  Wind
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, setJuryDemoOpen } = useAppStore();

  const ecosystemNodes = [
    { id: 'house', label: 'HOUSE', icon: <Home className="w-5 h-5 text-emerald-400" />, desc: 'Source Waste Generated' },
    { id: 'waste', label: 'WASTE', icon: <Trash2 className="w-5 h-5 text-amber-400" />, desc: 'Segregated Biomass' },
    { id: 'ai', label: 'AI DETECTION', icon: <Cpu className="w-5 h-5 text-purple-400" />, desc: 'Neural Vision Scan' },
    { id: 'truck', label: 'COLLECTION TRUCK', icon: <Truck className="w-5 h-5 text-cyan-400" />, desc: 'Smart Routing Dispatch' },
    { id: 'segregation', label: 'SEGREGATION', icon: <Layers className="w-5 h-5 text-teal-400" />, desc: 'Slurry & MRF Sorting' },
    { id: 'biogas', label: 'BIOGAS DIGESTER', icon: <Flame className="w-5 h-5 text-energy-glow" />, desc: 'Anaerobic Methanation' },
    { id: 'energy', label: 'CLEAN ENERGY', icon: <Zap className="w-5 h-5 text-amber-300 animate-pulse" />, desc: 'CHP Microgrid Electricity' },
    { id: 'community', label: 'COMMUNITY', icon: <Users className="w-5 h-5 text-eco-400" />, desc: 'Powered Campus & Homes' },
  ];

  const floatingIcons = [
    { icon: <Leaf className="w-5 h-5 text-eco-400" />, top: '15%', left: '8%', delay: '0s' },
    { icon: <Recycle className="w-6 h-6 text-cyan-400" />, top: '25%', right: '10%', delay: '1s' },
    { icon: <Zap className="w-5 h-5 text-amber-400" />, top: '65%', left: '5%', delay: '2s' },
    { icon: <Flame className="w-6 h-6 text-orange-400" />, top: '75%', right: '8%', delay: '1.5s' },
    { icon: <MapPin className="w-5 h-5 text-emerald-400" />, top: '40%', right: '4%', delay: '0.5s' },
    { icon: <Wind className="w-5 h-5 text-teal-300" />, top: '50%', left: '10%', delay: '2.5s' },
  ];

  const scrollToProblem = () => {
    const el = document.getElementById('problem-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between overflow-hidden bg-dark-950">
      {/* Background Cinematic Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 pointer-events-none"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Soft Ambient Contrast Gradients */}
        <div className="hero-video-gradient-1 absolute inset-0 bg-gradient-to-b from-dark-950/65 via-dark-950/35 to-dark-950/95" />
        <div className="hero-video-gradient-2 absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,9,16,0.6)_70%,rgba(6,9,16,0.95)_100%)]" />
      </div>

      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-eco-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Floating Ambient Eco Icons */}
      {floatingIcons.map((f, i) => (
        <div
          key={i}
          className="absolute hidden md:flex items-center justify-center p-3 rounded-2xl bg-dark-900/70 backdrop-blur-md border border-white/10 shadow-xl animate-float pointer-events-none"
          style={{ top: f.top, left: f.left, right: f.right, animationDelay: f.delay }}
        >
          {f.icon}
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center items-center text-center">
        {/* Infrastructure Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-900/90 backdrop-blur-md border border-eco-500/40 shadow-lg shadow-eco-500/15 mb-6 animate-in fade-in zoom-in-95 duration-500">
          <span className="w-2 h-2 rounded-full bg-eco-400 animate-ping" />
          <span className="text-xs font-semibold text-eco-300">
            Decentralized Smart Waste-to-Energy Infrastructure
          </span>
          <span className="text-slate-400 text-xs hidden sm:inline">| Zero-Landfill Community Microgrid</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tight text-white mb-6 drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)]">
          WASTE<span className="text-gradient-eco">2</span>WATT
        </h1>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-100 max-w-3xl mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
          Turning Community Waste Into <span className="text-gradient-energy">Clean Energy</span>.
        </p>

        {/* Supporting Narrative Text */}
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-medium">
          An AI-powered decentralized waste collection and waste-to-energy network that connects citizens,
          collectors, and local biogas facilities into one circular flow.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={() => setCurrentPage('report')}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-eco-500 via-emerald-500 to-cyan-500 text-dark-950 font-bold text-sm shadow-xl shadow-eco-500/30 hover:shadow-eco-500/50 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Report Waste</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToProblem}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-dark-850/80 hover:bg-dark-800 border border-white/10 text-slate-200 hover:text-white text-sm font-semibold transition-all hover:border-eco-500/40"
          >
            <span>Explore How It Works</span>
            <Sparkles className="w-4 h-4 text-eco-400" />
          </button>

          <button
            onClick={() => setJuryDemoOpen(true)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-dark-900/90 hover:bg-dark-850 border border-eco-500/40 text-eco-300 text-sm font-semibold shadow-lg shadow-eco-500/10 hover:shadow-eco-500/25 transition-all"
          >
            <PlayCircle className="w-4 h-4 text-eco-400" />
            <span>Interactive Tour</span>
          </button>
        </div>

        {/* Large Animated Ecosystem Flow Illustration */}
        <div className="w-full max-w-6xl p-5 sm:p-7 rounded-3xl bg-dark-900/75 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-eco-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Continuous Decentralized Circular Flow
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-eco-400" /> Organic Stream
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Microgrid Power
              </span>
            </div>
          </div>

          {/* Flow Grid with Connecting Glowing Particles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative">
            {ecosystemNodes.map((node, index) => (
              <div
                key={node.id}
                className="relative group p-3.5 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-white/10 hover:border-eco-400 hover:shadow-xl hover:shadow-eco-500/20 hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col items-center justify-between min-h-[128px] cursor-pointer"
              >
                {/* Animated Glowing Node Icon */}
                <div className="w-12 h-12 rounded-xl bg-dark-900 border border-white/15 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 group-hover:border-eco-400 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                  {node.icon}
                </div>

                {/* Node Label & Description */}
                <div>
                  <div className="text-[11px] font-bold text-white tracking-wide group-hover:text-eco-300 transition-colors">{node.label}</div>
                  <div className="text-[9px] text-slate-300 leading-tight mt-0.5">{node.desc}</div>
                </div>

                {/* Animated Step indicator */}
                <div className="inline-flex items-center gap-1 text-[8px] font-mono text-eco-400 font-bold mt-1 px-1.5 py-0.5 rounded-md bg-eco-500/10 border border-eco-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-eco-400 animate-ping" />
                  0{index + 1}
                </div>

                {/* Animated Pulsing Arrow to next on desktop */}
                {index < ecosystemNodes.length - 1 && (
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-eco-400/70 animate-pulse font-bold text-xs">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom live status pulse */}
          <div className="mt-5 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
            <span className="font-mono text-eco-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-eco-400 animate-ping" />
              Decentralized Bio-Energy Loop: 100% Active
            </span>
            <span className="text-slate-300">
              Campus Microgrid Target: <span className="text-energy-light font-semibold">640+ kWh Daily</span>
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="mt-8 text-center flex flex-col items-center justify-center cursor-pointer group select-none" onClick={scrollToProblem}>
        <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 group-hover:text-eco-400 transition-colors">
          SCROLL TO EXPLORE ↓
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-eco-400 animate-bounce mt-1" />
      </div>
    </section>
  );
};
