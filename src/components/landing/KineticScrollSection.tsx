import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Leaf,
  Cpu,
  Truck,
  Flame,
  Radio,
  BarChart3,
  BatteryCharging,
  Recycle,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface CharacterProps {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
}

export const CharacterV1: React.FC<CharacterProps> = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}) => {
  const isSpace = char === ' ';
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.75], [distanceFromCenter * 30, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.75], [distanceFromCenter * 20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75], [0.35, 0.8, 1]);

  return (
    <motion.span
      className={cn(
        'inline-block font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-eco-400 via-emerald-300 to-cyan-400 drop-shadow-[0_4px_16px_rgba(34,197,94,0.35)] select-none transform-gpu will-change-transform',
        isSpace && 'w-2 sm:w-4'
      )}
      style={{
        x,
        rotateX,
        opacity,
        transformOrigin: 'center bottom',
      }}
    >
      {char}
    </motion.span>
  );
};

interface KineticCardProps {
  item: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
    badge: string;
  };
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
}

export const KineticCardV2: React.FC<KineticCardProps> = ({
  item,
  index,
  centerIndex,
  scrollYProgress,
}) => {
  const distanceFromCenter = index - centerIndex;

  // Ultra-smooth transform interpolation
  const x = useTransform(scrollYProgress, [0, 0.8], [distanceFromCenter * 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.82, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.8],
    [Math.abs(distanceFromCenter) * 28, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.75], [0.4, 0.85, 1]);

  return (
    <motion.div
      className={cn(
        'inline-flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-sky-50 via-cyan-50/95 to-blue-50/95 backdrop-blur-xl border border-sky-200/90 shadow-xl shadow-sky-950/10 hover:border-sky-400 hover:shadow-sky-400/30 w-32 sm:w-44 text-center shrink-0 group transform-gpu will-change-transform cursor-pointer transition-colors duration-200',
        item.color
      )}
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        x,
        scale,
        y,
        opacity,
        transformOrigin: 'center',
      }}
    >
      <div className="p-2 sm:p-2.5 rounded-xl bg-sky-100/90 border border-sky-200/80 mb-1.5 group-hover:scale-110 group-hover:bg-sky-200/80 transition-all duration-200">
        {item.icon}
      </div>
      <span className="text-[8px] sm:text-[9px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-800 border border-sky-500/30 font-bold mb-1">
        {item.badge}
      </span>
      <h4 className="text-[11px] sm:text-xs font-black text-slate-900 leading-tight">{item.title}</h4>
      <p className="text-[9px] text-slate-600 mt-0.5 font-mono font-medium hidden sm:block">{item.subtitle}</p>
    </motion.div>
  );
};

export const KineticCardV3: React.FC<KineticCardProps> = ({
  item,
  index,
  centerIndex,
  scrollYProgress,
}) => {
  const distanceFromCenter = index - centerIndex;

  // Ultra-smooth rotational and parallax transform
  const x = useTransform(scrollYProgress, [0, 0.8], [distanceFromCenter * 55, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.8], [distanceFromCenter * 14, 0]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.8],
    [-Math.abs(distanceFromCenter) * 22, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.75], [0.4, 0.85, 1]);

  return (
    <motion.div
      className={cn(
        'inline-flex flex-col items-start p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-sky-50 via-cyan-50/95 to-blue-50/95 backdrop-blur-xl border border-sky-200/90 shadow-xl shadow-sky-950/10 hover:border-cyan-400 hover:shadow-cyan-400/30 w-36 sm:w-48 text-left shrink-0 group transform-gpu will-change-transform cursor-pointer transition-colors duration-200',
        item.color
      )}
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        transformOrigin: 'center',
      }}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <div className="p-1.5 sm:p-2 rounded-lg bg-sky-100/90 border border-sky-200/80 group-hover:scale-110 group-hover:bg-cyan-200/80 transition-all duration-200">
          {item.icon}
        </div>
        <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-800 border border-cyan-500/30 font-bold">
          {item.badge}
        </span>
      </div>
      <h4 className="text-[11px] sm:text-xs font-black text-slate-900 leading-tight">{item.title}</h4>
      <p className="text-[9px] text-slate-600 mt-0.5 leading-snug font-medium">{item.subtitle}</p>
    </motion.div>
  );
};

export const KineticScrollSection: React.FC = () => {
  const targetRef1 = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  // Raw Scroll Progress
  const { scrollYProgress: rawProgress1 } = useScroll({
    target: targetRef1,
    offset: ['start 0.95', 'center 0.35'],
  });

  const { scrollYProgress: rawProgress2 } = useScroll({
    target: targetRef2,
    offset: ['start 0.95', 'center 0.35'],
  });

  const { scrollYProgress: rawProgress3 } = useScroll({
    target: targetRef3,
    offset: ['start 0.95', 'center 0.35'],
  });

  // Physics Spring Smoothing (Stops jitter and produces butter-smooth 60fps interpolation)
  const springConfig = { stiffness: 65, damping: 22, mass: 0.15, restDelta: 0.0001 };
  const smoothProgress1 = useSpring(rawProgress1, springConfig);
  const smoothProgress2 = useSpring(rawProgress2, springConfig);
  const smoothProgress3 = useSpring(rawProgress3, springConfig);

  const textHeading = 'DECENTRALIZED BIO-ENERGY';
  const characters = textHeading.split('');
  const textCenterIndex = Math.floor(characters.length / 2);

  const techCardsStage1 = [
    {
      title: 'Neural Vision AI',
      subtitle: 'YOLOv8 88% Purity',
      icon: <Cpu className="w-4 h-4 text-purple-600" />,
      color: 'hover:shadow-purple-500/20',
      badge: 'Edge AI'
    },
    {
      title: 'Smart EV Route',
      subtitle: '39% Distance Saving',
      icon: <Truck className="w-4 h-4 text-cyan-600" />,
      color: 'hover:shadow-cyan-500/20',
      badge: 'Fleet Mesh'
    },
    {
      title: 'UASB Digester',
      subtitle: '65% Pure Methane',
      icon: <Flame className="w-4 h-4 text-amber-600" />,
      color: 'hover:shadow-amber-500/20',
      badge: 'Bio-Reactor'
    },
    {
      title: 'Micro-CHP Grid',
      subtitle: '45 kW Clean Power',
      icon: <Zap className="w-4 h-4 text-emerald-600" />,
      color: 'hover:shadow-emerald-500/20',
      badge: 'Microgrid'
    },
    {
      title: 'ESP32 MQTT Node',
      subtitle: '250ms Telemetry',
      icon: <Radio className="w-4 h-4 text-sky-600" />,
      color: 'hover:shadow-sky-500/20',
      badge: 'IoT Edge'
    },
  ];

  const techCardsStage2 = [
    {
      title: 'Automated Slurry',
      subtitle: 'Hydro-cyclone organic maceration with precision moisture probe',
      icon: <Recycle className="w-4 h-4 text-teal-600" />,
      color: 'hover:shadow-teal-500/20',
      badge: 'Pre-Treatment'
    },
    {
      title: 'BESS Battery Mesh',
      subtitle: '120 kWh solid-state storage balancing community street lighting',
      icon: <BatteryCharging className="w-4 h-4 text-emerald-600" />,
      color: 'hover:shadow-emerald-500/20',
      badge: 'Storage'
    },
    {
      title: 'Green Carbon Ledger',
      subtitle: 'IPCC Tier-2 greenhouse gas diversion certification hash',
      icon: <ShieldCheck className="w-4 h-4 text-cyan-600" />,
      color: 'hover:shadow-cyan-500/20',
      badge: 'Carbon Credit'
    },
    {
      title: 'Predictive Forecaster',
      subtitle: '7-day LSTM waste surge models proactively pre-positioning trucks',
      icon: <BarChart3 className="w-4 h-4 text-violet-600" />,
      color: 'hover:shadow-violet-500/20',
      badge: 'Predictive ML'
    },
  ];

  const cardCenterIndex1 = Math.floor(techCardsStage1.length / 2);
  const cardCenterIndex2 = Math.floor(techCardsStage2.length / 2);

  return (
    <div className="w-full bg-dark-950 text-slate-100 overflow-hidden relative z-10 border-y border-white/5 py-8 sm:py-10">
      {/* Ambient glow backgrounds */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-eco-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Part 1: Kinetic 3D Typography Convergence */}
      <div
        ref={targetRef1}
        className="relative flex flex-col items-center justify-center px-4 py-8 sm:py-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eco-500/10 border border-eco-500/20 text-eco-300 text-[11px] font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-eco-400" />
          Kinetic Multi-Vector Architecture
        </div>

        <p className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
          ↓ Scroll down to observe component convergence ↓
        </p>

        {/* Single Line Kinetic Typography */}
        <div
          className="w-full max-w-6xl flex items-center justify-center whitespace-nowrap flex-nowrap text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black tracking-tight overflow-visible px-2 select-none"
          style={{ perspective: '800px' }}
        >
          {characters.map((char, index) => (
            <CharacterV1
              key={index}
              char={char}
              index={index}
              centerIndex={textCenterIndex}
              scrollYProgress={smoothProgress1}
            />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-4 leading-relaxed font-normal">
          Every decentralized node synchronizes in real time — from AI image inference to methane generation in local digesters.
        </p>
      </div>

      {/* Part 2: Kinetic Parabolic Tech Cards (V2) */}
      <div
        ref={targetRef2}
        className="relative flex flex-col items-center justify-center px-4 py-8 sm:py-10 text-center space-y-6"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-eco-400 font-mono uppercase tracking-widest">
            Kinetic Stage 01
          </span>
          <h3 className="text-xl sm:text-3xl font-display font-black text-white">
            Core Bio-Conversion Hardware Stack
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Modules snap into dynamic equilibrium along parabolic velocity curves.
          </p>
        </div>

        <div
          className="w-full max-w-5xl flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap px-2"
          style={{ perspective: '800px' }}
        >
          {techCardsStage1.map((item, index) => (
            <KineticCardV2
              key={index}
              item={item}
              index={index}
              centerIndex={cardCenterIndex1}
              scrollYProgress={smoothProgress2}
            />
          ))}
        </div>
      </div>

      {/* Part 3: Kinetic 3D Rotational Warp Cards (V3) */}
      <div
        ref={targetRef3}
        className="relative flex flex-col items-center justify-center px-4 py-8 sm:py-10 text-center space-y-6"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 font-mono uppercase tracking-widest">
            Kinetic Stage 02
          </span>
          <h3 className="text-xl sm:text-3xl font-display font-black text-white">
            Decentralized Grid & Carbon Mesh
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Rotational 3D alignment locking into verified zero-landfill microgrid topology.
          </p>
        </div>

        <div
          className="w-full max-w-5xl flex items-center justify-center gap-3 sm:gap-4 flex-wrap px-2"
          style={{ perspective: '800px' }}
        >
          {techCardsStage2.map((item, index) => (
            <KineticCardV3
              key={index}
              item={item}
              index={index}
              centerIndex={cardCenterIndex2}
              scrollYProgress={smoothProgress3}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
