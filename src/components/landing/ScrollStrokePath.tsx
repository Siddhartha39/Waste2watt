import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const ScrollStrokePath: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 25,
    mass: 0.1,
    restDelta: 0.0001,
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0.02, 1]);

  // Flowing energy circuit path through all 16 landing sections
  const strokePathD = `
    M 720 180
    C 980 320, 1260 520, 1180 850
    C 1100 1180, 540 1280, 320 1520
    C 100 1760, 180 2150, 480 2380
    C 780 2610, 1320 2750, 1240 3120
    C 1160 3490, 680 3680, 380 3950
    C 80 4220, 160 4600, 520 4820
    C 880 5040, 1340 5220, 1220 5600
    C 1100 5980, 560 6150, 310 6420
    C 60 6690, 140 7050, 500 7280
    C 860 7510, 1320 7700, 1200 8050
    C 1080 8400, 540 8580, 290 8850
    C 40 9120, 120 9500, 480 9720
    C 840 9940, 1300 10120, 1180 10480
    C 1060 10840, 520 11050, 280 11320
    C 40 11590, 180 12000, 520 12250
    C 860 12500, 1280 12700, 1160 13050
    C 1040 13400, 720 13700, 720 14000
  `;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-visible transform-gpu will-change-transform">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 14000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bioEnergyScrollGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.95" />
            <stop offset="20%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="40%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#8b5cf6" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Ambient Guide Path */}
        <path
          d={strokePathD}
          stroke="rgba(34, 197, 94, 0.08)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic Scroll-Driven Animated Energy Path */}
        <motion.path
          d={strokePathD}
          stroke="url(#bioEnergyScrollGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            pathLength,
          }}
        />

        {/* Luminous Inner Core Line */}
        <motion.path
          d={strokePathD}
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.8"
          style={{
            pathLength,
          }}
        />
      </svg>
    </div>
  );
};
