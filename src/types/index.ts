export type WasteCategory = 'organic' | 'recyclable' | 'paper' | 'residual' | 'hazardous';

export type ReportStatus = 'reported' | 'assigned' | 'in_progress' | 'collected' | 'verified' | 'digesting' | 'converted';

export type PriorityLevel = 'low' | 'normal' | 'high' | 'urgent';

export interface BoundingBox {
  x: number; // percentage
  y: number; // percentage
  width: number;
  height: number;
  label: string;
  confidence: number;
  category: WasteCategory;
}

export interface WasteReport {
  id: string; // e.g. WW-2026-00452
  citizenId: string;
  citizenName: string;
  citizenAvatar?: string;
  imageUrl: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    sector: string;
  };
  classification: {
    primaryCategory: WasteCategory;
    confidence: number;
    breakdown: {
      organic: number;
      plastic: number;
      paper: number;
      residual: number;
    };
    suggestedAction: string;
    calorificValueKcalPerKg?: number;
    estimatedMethaneYieldM3PerKg?: number;
    detectedObjects: string[];
    boundingBoxes: BoundingBox[];
  };
  quantityKg: number;
  containerType: 'household_bin' | 'bulk_bag' | 'canteen_drum' | 'street_pile';
  priority: PriorityLevel;
  status: ReportStatus;
  assignedCollectorId?: string;
  assignedCollectorName?: string;
  collectedAt?: string;
  verifiedAt?: string;
  beforePhoto?: string;
  afterPhoto?: string;
  actualWeightKg?: number;
  ecoPointsAwarded: number;
  biogasGeneratedM3?: number;
  energyGeneratedKwh?: number;
  co2SavedKg?: number;
}

export interface Collector {
  id: string;
  name: string;
  vehicleId: string;
  vehicleType: 'EV Tipper Truck' | 'Compactor EV' | 'E-Cart Tricycle';
  phone: string;
  rating: number;
  status: 'available' | 'en_route' | 'collecting' | 'off_duty';
  currentLocation: {
    lat: number;
    lng: number;
    sector: string;
  };
  currentRouteId?: string;
  assignedReports: string[];
  totalCollectedKgToday: number;
  completedStopsToday: number;
  batteryPercent: number;
}

export interface RouteStop {
  stopNumber: number;
  reportId: string;
  address: string;
  lat: number;
  lng: number;
  wasteType: WasteCategory;
  quantityKg: number;
  priority: PriorityLevel;
  status: 'pending' | 'arrived' | 'completed';
}

export interface SmartRoute {
  id: string;
  collectorId: string;
  collectorName: string;
  vehicleId: string;
  stops: RouteStop[];
  totalDistanceKm: number;
  estimatedDurationMins: number;
  traditionalDistanceKm: number;
  traditionalDurationMins: number;
  distanceSavedKm: number;
  fuelSavedLiters: number;
  status: 'optimized' | 'active' | 'completed';
  startedAt?: string;
  completedAt?: string;
}

export interface BiogasDigesterTelemetry {
  tankId: string;
  tankName: string;
  capacityKg: number;
  currentSlurryKg: number;
  temperatureC: number;
  ph: number;
  pressureBar: number;
  gasFlowLpm: number;
  methanePercent: number;
  co2Percent: number;
  moisturePercent: number;
  digesterStatus: 'OPTIMAL' | 'ACTIVE' | 'FEEDING' | 'MAINTENANCE';
  hydraulicRetentionDays: number;
  dailyBiogasM3: number;
  dailyElectricityKwh: number;
  lastFedTimestamp: string;
}

export interface EnergyGridMetrics {
  chpGeneratorKw: number;
  turbineRpm: number;
  instantaneousKw: number;
  totalKwhToday: number;
  totalMwhLifetime: number;
  batteryStoragePercent: number;
  batteryCapacityKwh: number;
  currentBatteryKwh: number;
  gridExportKw: number;
  microgridLoads: {
    name: string;
    loadKw: number;
    status: 'online' | 'standby';
  }[];
}

export interface EnvironmentalImpactMetrics {
  totalWasteDivertedKg: number;
  organicWasteProcessedKg: number;
  totalBiogasProducedM3: number;
  cleanEnergyGeneratedKwh: number;
  co2eAvoidedKg: number;
  landfillMethanePreventedKg: number;
  equivalentTreesPlanted: number;
  coalBurnAvoidedKg: number;
  dieselSavedLiters: number;
}

export interface EcoUser {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'collector' | 'plant_operator' | 'admin' | 'auditor';
  sector: string;
  avatar: string;
  ecoPoints: number;
  level: string;
  reportsSubmitted: number;
  wasteDivertedKg: number;
  energyCreatedKwh: number;
  badges: {
    id: string;
    title: string;
    icon: string;
    description: string;
    unlockedAt?: string;
  }[];
}

export interface EcoReward {
  id: string;
  title: string;
  pointsCost: number;
  partner: string;
  category: 'voucher' | 'compost' | 'solar' | 'cafeteria';
  image: string;
  description: string;
  availableCount: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  targetRole?: string;
  link?: string;
}
