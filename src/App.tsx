import React, { useEffect } from 'react';
import { useAppStore, AppPage } from './store/useAppStore';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { JuryDemoBar } from './components/layout/JuryDemoBar';

// 18 Fully Functional Pages
import { LandingPage } from './pages/LandingPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { ReportWastePage } from './pages/ReportWastePage';
import { AIAnalysisPage } from './pages/AIAnalysisPage';
import { MyReportsPage } from './pages/MyReportsPage';
import { LiveMapPage } from './pages/LiveMapPage';
import { CollectorDashboard } from './pages/CollectorDashboard';
import { SmartRoutePage } from './pages/SmartRoutePage';
import { CollectionVerifyPage } from './pages/CollectionVerifyPage';
import { SegregationPage } from './pages/SegregationPage';
import { BiogasPlantPage } from './pages/BiogasPlantPage';
import { EnergyDashboardPage } from './pages/EnergyDashboardPage';
import { ImpactDashboardPage } from './pages/ImpactDashboardPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AIPredictionPage } from './pages/AIPredictionPage';
import { IoTHardwarePage } from './pages/IoTHardwarePage';

import { AnimatedGradientBackground } from './components/common/AnimatedGradientBackground';

export function App() {
  const { currentPage, pulseTelemetry, isSimulationMode, theme } = useAppStore();

  // Initialize and synchronize theme class on document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // Background live telemetry pulse
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSimulationMode) {
        pulseTelemetry();
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isSimulationMode, pulseTelemetry]);

  // Scroll to top whenever page transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderActivePage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'citizen':
        return <CitizenDashboard />;
      case 'report':
        return <ReportWastePage />;
      case 'ai-scanner':
        return <AIAnalysisPage />;
      case 'my-reports':
        return <MyReportsPage />;
      case 'live-map':
        return <LiveMapPage />;
      case 'collector':
        return <CollectorDashboard />;
      case 'smart-route':
        return <SmartRoutePage />;
      case 'verification':
        return <CollectionVerifyPage />;
      case 'segregation':
        return <SegregationPage />;
      case 'biogas':
        return <BiogasPlantPage />;
      case 'energy':
        return <EnergyDashboardPage />;
      case 'impact':
        return <ImpactDashboardPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'prediction':
        return <AIPredictionPage />;
      case 'iot':
        return <IoTHardwarePage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-eco-500 selection:text-dark-950 relative">
      {/* Persistent Multi-Colored Moving Gradient Aurora Backdrop */}
      <AnimatedGradientBackground />

      {/* Sticky Global Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 w-full relative z-10">{renderActivePage()}</main>

      {/* Global 24-Step Jury Demonstration Floating Controller */}
      <JuryDemoBar />

      {/* Global Project Footer */}
      <Footer />
    </div>
  );
}

export default App;
