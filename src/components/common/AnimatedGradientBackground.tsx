import React from 'react';

export const AnimatedGradientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#eef4fb]">
      {/* 100% Solid & Lightweight Pastel Iridescent Mesh - Exactly Matching Reference Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 12%, rgba(125, 211, 252, 0.55) 0%, transparent 45%),
            radial-gradient(circle at 90% 12%, rgba(196, 181, 253, 0.55) 0%, transparent 45%),
            radial-gradient(circle at 50% 45%, rgba(251, 207, 232, 0.45) 0%, transparent 50%),
            radial-gradient(circle at 12% 85%, rgba(167, 243, 208, 0.45) 0%, transparent 45%),
            radial-gradient(circle at 88% 85%, rgba(196, 181, 253, 0.45) 0%, transparent 45%)
          `,
        }}
      />
    </div>
  );
};
