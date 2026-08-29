import { create } from 'zustand';
import {
  AppNotification,
  BiogasDigesterTelemetry,
  Collector,
  EcoReward,
  EcoUser,
  EnergyGridMetrics,
  EnvironmentalImpactMetrics,
  PriorityLevel,
  ReportStatus,
  SmartRoute,
  WasteCategory,
  WasteReport
} from '../types';
import {
  INITIAL_COLLECTORS,
  INITIAL_DIGESTERS,
  INITIAL_ENERGY_GRID,
  INITIAL_IMPACT_METRICS,
  INITIAL_REPORTS,
  INITIAL_REWARDS,
  INITIAL_USERS
} from '../data/initialData';
import { calculateBiogasOutput, calculateElectricityOutput, calculateEnvironmentalMitigation, calculateEcoPoints } from '../data/conversionMath';
import { COMMUNITY_LOCATIONS } from '../data/mockLocations';

export type AppPage =
  | 'landing'
  | 'citizen'
  | 'report'
  | 'ai-scanner'
  | 'my-reports'
  | 'live-map'
  | 'collector'
  | 'smart-route'
  | 'verification'
  | 'segregation'
  | 'biogas'
  | 'energy'
  | 'impact'
  | 'leaderboard'
  | 'admin'
  | 'analytics'
  | 'prediction'
  | 'iot';

export interface JuryStepInfo {
  step: number;
  title: string;
  description: string;
  targetPage: AppPage;
  actionText: string;
}

export const JURY_STEPS: JuryStepInfo[] = [
  { step: 1, title: 'Circular Ecosystem Overview', description: 'Experience the 15-section continuous circular storytelling from household waste segregation to community clean microgrid energy.', targetPage: 'landing', actionText: 'Explore Ecosystem' },
  { step: 2, title: 'Citizen Waste Reporting', description: 'Citizen uploads segregated kitchen biomass image for instant computer vision analysis.', targetPage: 'report', actionText: 'Open Waste Reporter' },
  { step: 3, title: 'AI Classification & Confidence', description: 'Neural vision detects 88% Organic purity, calculates calorific energy & routes directly to Biogas Digester.', targetPage: 'report', actionText: 'Run AI Scan & Bounding Box' },
  { step: 4, title: 'Submit Geotagged Report', description: 'Report WW-2026-00452 is generated and broadcasted across the decentralized network.', targetPage: 'report', actionText: 'Submit Geotagged Report' },
  { step: 5, title: 'Live Community Map', description: 'New green organic marker appears on the interactive map with real-time sector priority.', targetPage: 'live-map', actionText: 'Inspect Live Waste Map' },
  { step: 6, title: 'Collector Queue Alert', description: 'Zero-emission EV Collection truck receives high-priority organic pickup task.', targetPage: 'collector', actionText: 'Open Collector Dashboard' },
  { step: 7, title: 'AI Smart Route Generation', description: 'Optimized multi-stop TSP route solver recalculates path, saving 39% travel distance.', targetPage: 'smart-route', actionText: 'Generate Smart Route' },
  { step: 8, title: 'Truck Traversal & Arrival', description: 'Collector arrives at location and marks pickup in progress.', targetPage: 'smart-route', actionText: 'Simulate Truck Arrival' },
  { step: 9, title: 'Collection Verification', description: 'Collector uploads clean after-site photo, logs actual scale weight (26.5 kg), and verifies.', targetPage: 'verification', actionText: 'Verify & Stamp Collection' },
  { step: 10, title: 'Smart Segregation Intake', description: 'Collected batch enters segregation station, undergoes shredding and slurry preparation.', targetPage: 'segregation', actionText: 'Process Segregation Feedstock' },
  { step: 11, title: 'Biogas Digester Feeding', description: 'Slurry is fed into Anaerobic Digester Tank #1; temperature, pH & pressure react dynamically.', targetPage: 'biogas', actionText: 'Feed Organic Digester Batch' },
  { step: 12, title: 'Biogas & Methane Surge', description: 'Methanogenesis produces +1.64 m³ raw biogas (65% CH4) inside the digester core.', targetPage: 'biogas', actionText: 'Monitor Gas Production' },
  { step: 13, title: 'CHP Clean Energy Generation', description: 'Biogas fuels the CHP gas turbine, generating +4.02 kWh clean electricity for the microgrid.', targetPage: 'energy', actionText: 'Inspect Microgrid Generation' },
  { step: 14, title: 'Community Microgrid Distribution', description: 'Clean energy directly powers campus streetlights, hostel water heating & EV chargers.', targetPage: 'energy', actionText: 'Review Grid Load Distribution' },
  { step: 15, title: 'Global Environmental Impact', description: 'Real-time counters update: Landfill diverted, CO2e greenhouse gas mitigated, coal displaced.', targetPage: 'impact', actionText: 'View Environmental Impact' },
  { step: 16, title: 'Citizen Eco-Points & Rewards', description: 'Citizen account is credited with +126 Eco-Points, unlocking green badge and tier status.', targetPage: 'leaderboard', actionText: 'Check Gamified Leaderboard' },
  { step: 17, title: 'Citizen Personal Portal', description: 'Citizen views report history and energy generation receipt for their personal waste.', targetPage: 'my-reports', actionText: 'View Citizen Receipt' },
  { step: 18, title: 'Deep AI Scanner Workbench', description: 'Explore the dedicated AI computer vision tool with multiple waste streams & moisture analytics.', targetPage: 'ai-scanner', actionText: 'Test AI Detection Lab' },
  { step: 19, title: 'IoT Hardware Telemetry', description: 'ESP32 microcontroller with real-time sensor streams & MQTT telemetry payloads.', targetPage: 'iot', actionText: 'Inspect IoT Telemetry' },
  { step: 20, title: 'AI Predictive Load Forecasting', description: '7-day neural waste load forecast predicts surge patterns and optimizes fleet dispatch.', targetPage: 'prediction', actionText: 'View Predictive Heatmap' },
  { step: 21, title: 'Municipality Master Command Center', description: 'City & campus administration monitors SLA compliance, sector health, and plant efficiency.', targetPage: 'admin', actionText: 'Open Municipality Command' },
  { step: 22, title: 'Comprehensive Analytics', description: 'Deep time-series charts of waste-to-energy conversion efficiency and diversion rates.', targetPage: 'analytics', actionText: 'Open Analytics Engine' },
  { step: 23, title: 'Live Telemetry Simulation', description: 'Toggle live sensor pulse oscillation and trigger simulated peak methane events.', targetPage: 'iot', actionText: 'Test Hardware Simulation' },
  { step: 24, title: 'Complete Circular Ecosystem', description: 'Summary view: Full circular decentralized bio-energy loop successfully operating in real time.', targetPage: 'landing', actionText: 'Finish Demonstration' },
];

interface AppState {
  // Navigation & User Context
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
  currentUser: EcoUser;
  allUsers: EcoUser[];
  activeRole: 'citizen' | 'collector' | 'plant_operator' | 'admin' | 'auditor';
  setActiveRole: (role: 'citizen' | 'collector' | 'plant_operator' | 'admin' | 'auditor') => void;

  // Waste Reports
  reports: WasteReport[];
  activeReportId: string | null;
  setActiveReportId: (id: string | null) => void;
  addReport: (report: Partial<WasteReport>) => WasteReport;
  assignReportToCollector: (reportId: string, collectorId: string) => void;
  updateReportStatus: (reportId: string, status: ReportStatus, extra?: Partial<WasteReport>) => void;
  verifyCollection: (reportId: string, afterPhoto: string, actualWeightKg: number) => void;

  // Collectors & Smart Routing
  collectors: Collector[];
  currentRoute: SmartRoute | null;
  generateSmartRoute: (collectorId: string) => SmartRoute;
  advanceRouteProgress: () => void;

  // Biogas & Energy Telemetry
  digesters: BiogasDigesterTelemetry[];
  feedOrganicBatch: (tankId: string, organicKg: number) => { biogasM3: number; electricityKwh: number };
  updateDigesterTelemetry: (tankId: string, patch: Partial<BiogasDigesterTelemetry>) => void;
  energyGrid: EnergyGridMetrics;
  updateEnergyGrid: (patch: Partial<EnergyGridMetrics>) => void;

  // Environmental Impact & Rewards
  impactMetrics: EnvironmentalImpactMetrics;
  rewards: EcoReward[];
  redeemReward: (rewardId: string) => boolean;

  // Notifications
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Hardware Simulation
  isSimulationMode: boolean;
  toggleSimulationMode: () => void;
  pulseTelemetry: () => void;

  // Theme Mode
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;

  // Jury Walkthrough Engine
  juryDemoOpen: boolean;
  setJuryDemoOpen: (open: boolean) => void;
  currentJuryStep: number;
  isJuryAutoPlaying: boolean;
  setJuryStep: (stepNumber: number) => void;
  nextJuryStep: () => void;
  prevJuryStep: () => void;
  toggleJuryAutoPlay: () => void;
  executeCurrentJuryStepAction: () => void;
  resetToDefaultState: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentPage: 'landing',
  setCurrentPage: (page) => set({ currentPage: page }),

  currentUser: INITIAL_USERS[0],
  allUsers: INITIAL_USERS,
  activeRole: 'citizen',
  setActiveRole: (role) => {
    set({ activeRole: role });
    // Switch default user based on role
    const users = get().allUsers;
    if (role === 'citizen') set({ currentUser: users[0] });
    else if (role === 'collector') set({ currentUser: { ...users[0], role: 'collector', name: 'Rajesh Kumar' } });
    else if (role === 'plant_operator') set({ currentUser: { ...users[0], role: 'plant_operator', name: 'Biogas Plant Tech' } });
    else if (role === 'admin') set({ currentUser: { ...users[0], role: 'admin', name: 'Campus Municipal Officer' } });
    else if (role === 'auditor') set({ currentUser: { ...users[0], role: 'auditor', name: 'Clean Energy Auditor' } });
  },

  reports: INITIAL_REPORTS,
  activeReportId: 'WW-2026-00448',
  setActiveReportId: (id) => set({ activeReportId: id }),

  addReport: (reportData) => {
    const nextSeq = get().reports.length + 449;
    const newId = `WW-2026-00${nextSeq}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const newReport: WasteReport = {
      id: newId,
      citizenId: get().currentUser.id,
      citizenName: get().currentUser.name,
      citizenAvatar: get().currentUser.avatar,
      imageUrl: reportData.imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      timestamp: `2026-08-29 ${timestamp}`,
      location: reportData.location || {
        lat: 26.1925,
        lng: 91.6948,
        address: 'Brahmaputra Mess Block, IIT Guwahati',
        sector: 'Sector A (Hostel Zone)',
      },
      classification: reportData.classification || {
        primaryCategory: 'organic',
        confidence: 0.94,
        breakdown: { organic: 88, plastic: 4, paper: 5, residual: 3 },
        suggestedAction: 'Route to Community Biogas Digester Tank 1',
        calorificValueKcalPerKg: 3850,
        estimatedMethaneYieldM3PerKg: 0.078,
        detectedObjects: ['Vegetable Peels', 'Kitchen Organics'],
        boundingBoxes: [],
      },
      quantityKg: reportData.quantityKg || 25.0,
      containerType: reportData.containerType || 'canteen_drum',
      priority: reportData.priority || 'normal',
      status: 'reported',
      ecoPointsAwarded: calculateEcoPoints(reportData.quantityKg || 25.0, 0.94, reportData.priority === 'urgent' || reportData.priority === 'high'),
      biogasGeneratedM3: calculateBiogasOutput(reportData.quantityKg || 25.0),
      energyGeneratedKwh: calculateElectricityOutput(calculateBiogasOutput(reportData.quantityKg || 25.0)),
      co2SavedKg: Number(((reportData.quantityKg || 25.0) * 1.58).toFixed(2)),
    };

    set((state) => ({
      reports: [newReport, ...state.reports],
      activeReportId: newId,
    }));

    get().addNotification({
      title: 'Waste Report Registered',
      message: `Report ${newId} (${newReport.quantityKg} kg ${newReport.classification.primaryCategory}) queued for smart collection.`,
      type: 'success',
      targetRole: 'citizen',
      link: 'my-reports',
    });

    get().addNotification({
      title: 'New Collection Task',
      message: `New pickup request ${newId} in ${newReport.location.sector} assigned to priority queue.`,
      type: 'info',
      targetRole: 'collector',
      link: 'collector',
    });

    return newReport;
  },

  assignReportToCollector: (reportId, collectorId) => {
    const collector = get().collectors.find((c) => c.id === collectorId) || get().collectors[0];
    set((state) => ({
      reports: state.reports.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'assigned' as ReportStatus,
              assignedCollectorId: collector.id,
              assignedCollectorName: `${collector.name} (${collector.vehicleType})`,
            }
          : r
      ),
    }));

    get().addNotification({
      title: 'Collector Dispatched',
      message: `${collector.name} has been assigned to collect report ${reportId}.`,
      type: 'info',
      targetRole: 'citizen',
    });
  },

  updateReportStatus: (reportId, status, extra = {}) => {
    set((state) => ({
      reports: state.reports.map((r) => (r.id === reportId ? { ...r, status, ...extra } : r)),
    }));
  },

  verifyCollection: (reportId, afterPhoto, actualWeightKg) => {
    const report = get().reports.find((r) => r.id === reportId);
    if (!report) return;

    const pointsEarned = calculateEcoPoints(actualWeightKg, 0.96, report.priority === 'urgent');
    const mitigation = calculateEnvironmentalMitigation(actualWeightKg);

    set((state) => ({
      reports: state.reports.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'verified' as ReportStatus,
              afterPhoto,
              actualWeightKg,
              verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
              ecoPointsAwarded: pointsEarned,
              biogasGeneratedM3: mitigation.biogasM3,
              energyGeneratedKwh: mitigation.electricityKwh,
              co2SavedKg: mitigation.co2eAvoidedKg,
            }
          : r
      ),
      currentUser: {
        ...state.currentUser,
        ecoPoints: state.currentUser.ecoPoints + pointsEarned,
        wasteDivertedKg: state.currentUser.wasteDivertedKg + actualWeightKg,
        energyCreatedKwh: state.currentUser.energyCreatedKwh + mitigation.electricityKwh,
      },
    }));

    get().addNotification({
      title: 'Collection Verified!',
      message: `Pickup ${reportId} confirmed (${actualWeightKg} kg). +${pointsEarned} Eco-Points added to your balance!`,
      type: 'success',
      targetRole: 'citizen',
    });

    // Automatically trigger feedstock feed to digester
    get().feedOrganicBatch('digester-01', actualWeightKg);
  },

  collectors: INITIAL_COLLECTORS,
  currentRoute: {
    id: 'route-live-01',
    collectorId: 'col-1',
    collectorName: 'Rajesh Kumar',
    vehicleId: 'AS-01-EV-4091',
    totalDistanceKm: 11.2,
    estimatedDurationMins: 36,
    traditionalDistanceKm: 18.4,
    traditionalDurationMins: 62,
    distanceSavedKm: 7.2,
    fuelSavedLiters: 2.8,
    status: 'active',
    stops: [
      {
        stopNumber: 1,
        reportId: 'WW-2026-00448',
        address: COMMUNITY_LOCATIONS[0].address,
        lat: COMMUNITY_LOCATIONS[0].lat,
        lng: COMMUNITY_LOCATIONS[0].lng,
        wasteType: 'organic',
        quantityKg: 24.5,
        priority: 'high',
        status: 'arrived',
      },
      {
        stopNumber: 2,
        reportId: 'WW-2026-00449',
        address: COMMUNITY_LOCATIONS[1].address,
        lat: COMMUNITY_LOCATIONS[1].lat,
        lng: COMMUNITY_LOCATIONS[1].lng,
        wasteType: 'organic',
        quantityKg: 38.0,
        priority: 'normal',
        status: 'pending',
      },
      {
        stopNumber: 3,
        reportId: 'WW-2026-00450',
        address: COMMUNITY_LOCATIONS[4].address,
        lat: COMMUNITY_LOCATIONS[4].lat,
        lng: COMMUNITY_LOCATIONS[4].lng,
        wasteType: 'organic',
        quantityKg: 62.0,
        priority: 'urgent',
        status: 'pending',
      },
      {
        stopNumber: 4,
        reportId: 'WW-2026-FACILITY',
        address: COMMUNITY_LOCATIONS[6].address,
        lat: COMMUNITY_LOCATIONS[6].lat,
        lng: COMMUNITY_LOCATIONS[6].lng,
        wasteType: 'organic',
        quantityKg: 0,
        priority: 'normal',
        status: 'pending',
      },
    ],
  },

  generateSmartRoute: (collectorId) => {
    const collector = get().collectors.find((c) => c.id === collectorId) || get().collectors[0];
    const pendingReports = get().reports.filter((r) => r.status === 'reported' || r.status === 'assigned');

    const stops = pendingReports.slice(0, 4).map((rep, idx) => ({
      stopNumber: idx + 1,
      reportId: rep.id,
      address: rep.location.address,
      lat: rep.location.lat,
      lng: rep.location.lng,
      wasteType: rep.classification.primaryCategory,
      quantityKg: rep.quantityKg,
      priority: rep.priority,
      status: (idx === 0 ? 'arrived' : 'pending') as 'arrived' | 'pending',
    }));

    stops.push({
      stopNumber: stops.length + 1,
      reportId: 'WW-DEST-BIOGAS',
      address: 'Waste2Watt Central Biogas Digester Plant #1',
      lat: COMMUNITY_LOCATIONS[6].lat,
      lng: COMMUNITY_LOCATIONS[6].lng,
      wasteType: 'organic',
      quantityKg: 0,
      priority: 'normal',
      status: 'pending',
    });

    const optimizedRoute: SmartRoute = {
      id: `route-${Date.now()}`,
      collectorId: collector.id,
      collectorName: collector.name,
      vehicleId: collector.vehicleId,
      stops,
      totalDistanceKm: 11.2,
      estimatedDurationMins: 36,
      traditionalDistanceKm: 18.4,
      traditionalDurationMins: 62,
      distanceSavedKm: 7.2,
      fuelSavedLiters: 2.8,
      status: 'optimized',
    };

    set({ currentRoute: optimizedRoute });

    get().addNotification({
      title: 'Smart Route Generated',
      message: `AI route generated with ${stops.length} stops. Estimated savings: 7.2 km (39% reduction).`,
      type: 'success',
      targetRole: 'collector',
    });

    return optimizedRoute;
  },

  advanceRouteProgress: () => {
    const route = get().currentRoute;
    if (!route) return;

    const stops = [...route.stops];
    const nextPendingIdx = stops.findIndex((s) => s.status !== 'completed');
    if (nextPendingIdx !== -1) {
      stops[nextPendingIdx].status = 'completed';
      if (nextPendingIdx + 1 < stops.length) {
        stops[nextPendingIdx + 1].status = 'arrived';
      }
    }

    set({
      currentRoute: {
        ...route,
        stops,
        status: stops.every((s) => s.status === 'completed') ? 'completed' : 'active',
      },
    });
  },

  digesters: INITIAL_DIGESTERS,
  feedOrganicBatch: (tankId, organicKg) => {
    const mitigation = calculateEnvironmentalMitigation(organicKg);

    set((state) => {
      const updatedDigesters = state.digesters.map((d) => {
        if (d.tankId === tankId) {
          const newSlurry = Math.min(d.capacityKg, d.currentSlurryKg + organicKg);
          return {
            ...d,
            currentSlurryKg: newSlurry,
            dailyBiogasM3: Number((d.dailyBiogasM3 + mitigation.biogasM3).toFixed(2)),
            dailyElectricityKwh: Number((d.dailyElectricityKwh + mitigation.electricityKwh).toFixed(2)),
            pressureBar: Number((1.42 + Math.random() * 0.08).toFixed(2)),
            gasFlowLpm: Number((34.5 + organicKg * 0.25).toFixed(1)),
            digesterStatus: 'FEEDING' as const,
            lastFedTimestamp: 'Just Now',
          };
        }
        return d;
      });

      const updatedEnergyGrid = {
        ...state.energyGrid,
        instantaneousKw: Number((state.energyGrid.instantaneousKw + mitigation.electricityKwh * 0.4).toFixed(1)),
        totalKwhToday: Number((state.energyGrid.totalKwhToday + mitigation.electricityKwh).toFixed(1)),
        batteryStoragePercent: Math.min(100, state.energyGrid.batteryStoragePercent + 2),
      };

      const updatedImpact = {
        ...state.impactMetrics,
        totalWasteDivertedKg: state.impactMetrics.totalWasteDivertedKg + organicKg,
        organicWasteProcessedKg: state.impactMetrics.organicWasteProcessedKg + organicKg,
        totalBiogasProducedM3: Number((state.impactMetrics.totalBiogasProducedM3 + mitigation.biogasM3).toFixed(1)),
        cleanEnergyGeneratedKwh: Number((state.impactMetrics.cleanEnergyGeneratedKwh + mitigation.electricityKwh).toFixed(1)),
        co2eAvoidedKg: Number((state.impactMetrics.co2eAvoidedKg + mitigation.co2eAvoidedKg).toFixed(1)),
        landfillMethanePreventedKg: Number((state.impactMetrics.landfillMethanePreventedKg + organicKg * 0.38).toFixed(1)),
        equivalentTreesPlanted: Number((state.impactMetrics.equivalentTreesPlanted + mitigation.treesEquivalence).toFixed(1)),
      };

      return {
        digesters: updatedDigesters,
        energyGrid: updatedEnergyGrid,
        impactMetrics: updatedImpact,
      };
    });

    get().addNotification({
      title: 'Digester Feedstock Injected',
      message: `Tank ${tankId} digested ${organicKg} kg organic slurry. Generated +${mitigation.biogasM3} m³ Biogas & +${mitigation.electricityKwh} kWh Clean Energy!`,
      type: 'success',
      targetRole: 'plant_operator',
    });

    return { biogasM3: mitigation.biogasM3, electricityKwh: mitigation.electricityKwh };
  },

  updateDigesterTelemetry: (tankId, patch) => {
    set((state) => ({
      digesters: state.digesters.map((d) => (d.tankId === tankId ? { ...d, ...patch } : d)),
    }));
  },

  energyGrid: INITIAL_ENERGY_GRID,
  updateEnergyGrid: (patch) => {
    set((state) => ({ energyGrid: { ...state.energyGrid, ...patch } }));
  },

  impactMetrics: INITIAL_IMPACT_METRICS,
  rewards: INITIAL_REWARDS,
  redeemReward: (rewardId) => {
    const reward = get().rewards.find((r) => r.id === rewardId);
    const user = get().currentUser;
    if (!reward || user.ecoPoints < reward.pointsCost) return false;

    set((state) => ({
      currentUser: {
        ...state.currentUser,
        ecoPoints: state.currentUser.ecoPoints - reward.pointsCost,
      },
      rewards: state.rewards.map((r) =>
        r.id === rewardId ? { ...r, availableCount: Math.max(0, r.availableCount - 1) } : r
      ),
    }));

    get().addNotification({
      title: 'Reward Redeemed!',
      message: `You successfully redeemed: "${reward.title}". Voucher code WW-RWD-${Math.floor(1000 + Math.random() * 9000)} issued.`,
      type: 'success',
      targetRole: 'citizen',
    });

    return true;
  },

  notifications: [
    {
      id: 'notif-1',
      title: 'Waste2Watt Network Live',
      message: 'Connected to decentralized bio-energy microgrid distribution mesh.',
      timestamp: '10:00 AM',
      type: 'info',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'High Organic Batch Processed',
      message: 'Digester Tank #1 produced 48.6 m³ Biogas today at 64.8% CH4 concentration.',
      timestamp: '11:30 AM',
      type: 'success',
      read: false,
    }
  ],
  addNotification: (notif) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      read: false,
    };
    set((state) => ({ notifications: [newNotif, ...state.notifications] }));
  },
  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  },
  clearAllNotifications: () => set({ notifications: [] }),

  theme: (typeof window !== 'undefined' && (localStorage.getItem('waste2watt-theme') as 'dark' | 'light')) || 'dark',
  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      localStorage.setItem('waste2watt-theme', nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    set({ theme: nextTheme });
  },
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('waste2watt-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    set({ theme });
  },

  isSimulationMode: true,
  toggleSimulationMode: () => set((state) => ({ isSimulationMode: !state.isSimulationMode })),

  pulseTelemetry: () => {
    if (!get().isSimulationMode) return;
    const jitter = (Math.random() - 0.5) * 0.4;
    set((state) => ({
      digesters: state.digesters.map((d) => ({
        ...d,
        temperatureC: Number((37.2 + Math.sin(Date.now() / 5000) * 0.3).toFixed(1)),
        pressureBar: Number((1.42 + Math.cos(Date.now() / 4000) * 0.05).toFixed(2)),
        gasFlowLpm: Number((34.0 + (Math.random() - 0.5) * 2.0).toFixed(1)),
      })),
      energyGrid: {
        ...state.energyGrid,
        instantaneousKw: Number((38.0 + jitter * 3).toFixed(1)),
        gridExportKw: Number((14.0 + jitter * 1.5).toFixed(1)),
      }
    }));
  },

  // Jury Live Demonstration Engine
  juryDemoOpen: false,
  setJuryDemoOpen: (open) => set({ juryDemoOpen: open }),
  currentJuryStep: 1,
  isJuryAutoPlaying: false,

  setJuryStep: (stepNumber) => {
    const validStep = Math.max(1, Math.min(24, stepNumber));
    const stepInfo = JURY_STEPS[validStep - 1];
    set({ currentJuryStep: validStep });
    if (stepInfo) {
      set({ currentPage: stepInfo.targetPage });
    }
  },

  nextJuryStep: () => {
    const next = Math.min(24, get().currentJuryStep + 1);
    get().setJuryStep(next);
  },

  prevJuryStep: () => {
    const prev = Math.max(1, get().currentJuryStep - 1);
    get().setJuryStep(prev);
  },

  toggleJuryAutoPlay: () => {
    set((state) => ({ isJuryAutoPlaying: !state.isJuryAutoPlaying }));
  },

  executeCurrentJuryStepAction: () => {
    const step = get().currentJuryStep;
    switch (step) {
      case 2:
      case 3:
      case 4:
        get().setCurrentPage('report');
        break;
      case 5:
        get().setCurrentPage('live-map');
        break;
      case 6:
        get().setCurrentPage('collector');
        break;
      case 7:
        get().generateSmartRoute('col-1');
        get().setCurrentPage('smart-route');
        break;
      case 8:
        get().advanceRouteProgress();
        get().setCurrentPage('smart-route');
        break;
      case 9:
        get().verifyCollection('WW-2026-00448', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80', 26.5);
        get().setCurrentPage('verification');
        break;
      case 10:
        get().setCurrentPage('segregation');
        break;
      case 11:
      case 12:
        get().feedOrganicBatch('digester-01', 35.0);
        get().setCurrentPage('biogas');
        break;
      case 13:
      case 14:
        get().setCurrentPage('energy');
        break;
      case 15:
        get().setCurrentPage('impact');
        break;
      case 16:
        get().setCurrentPage('leaderboard');
        break;
      case 17:
        get().setCurrentPage('my-reports');
        break;
      case 18:
        get().setCurrentPage('ai-scanner');
        break;
      case 19:
        get().setCurrentPage('iot');
        break;
      case 20:
        get().setCurrentPage('prediction');
        break;
      case 21:
        get().setCurrentPage('admin');
        break;
      case 22:
        get().setCurrentPage('analytics');
        break;
      case 23:
        get().setCurrentPage('iot');
        break;
      case 24:
        get().setCurrentPage('landing');
        break;
      default:
        break;
    }
  },

  resetToDefaultState: () => {
    set({
      reports: INITIAL_REPORTS,
      collectors: INITIAL_COLLECTORS,
      digesters: INITIAL_DIGESTERS,
      energyGrid: INITIAL_ENERGY_GRID,
      impactMetrics: INITIAL_IMPACT_METRICS,
      currentUser: INITIAL_USERS[0],
      currentJuryStep: 1,
      currentPage: 'landing',
      isJuryAutoPlaying: false,
    });
  }
}));
