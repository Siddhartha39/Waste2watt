import React from 'react';
import { Skiper19ScrollStroke } from '../components/landing/Skiper19ScrollStroke';
import { HeroSection } from '../components/landing/HeroSection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { KineticScrollSection } from '../components/landing/KineticScrollSection';
import { SolutionPipeline } from '../components/landing/SolutionPipeline';
import { AIReportingSection } from '../components/landing/AIReportingSection';
import { LocationIntelligence } from '../components/landing/LocationIntelligence';
import { SmartRoutingSection } from '../components/landing/SmartRoutingSection';
import { VerificationSection } from '../components/landing/VerificationSection';
import { SegregationSection } from '../components/landing/SegregationSection';
import { BiogasSection } from '../components/landing/BiogasSection';
import { IoTHardwareSection } from '../components/landing/IoTHardwareSection';
import { ImpactSection } from '../components/landing/ImpactSection';
import { GamificationSection } from '../components/landing/GamificationSection';
import { PredictiveAISection } from '../components/landing/PredictiveAISection';
import { EcosystemNetwork } from '../components/landing/EcosystemNetwork';
import { FinalCTASection } from '../components/landing/FinalCTASection';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative w-full overflow-x-clip">
      {/* Skiper19 Dynamic Scroll-Driven SVG Stroke Path */}
      <Skiper19ScrollStroke />

      {/* 16 Sequential Storytelling Sections */}
      <HeroSection />
      <ProblemSection />
      <KineticScrollSection />
      <SolutionPipeline />
      <AIReportingSection />
      <LocationIntelligence />
      <SmartRoutingSection />
      <VerificationSection />
      <SegregationSection />
      <BiogasSection />
      <IoTHardwareSection />
      <ImpactSection />
      <GamificationSection />
      <PredictiveAISection />
      <EcosystemNetwork />
      <FinalCTASection />
    </div>
  );
};
