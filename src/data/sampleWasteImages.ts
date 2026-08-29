import { BoundingBox, WasteCategory } from '../types';

export interface SampleWasteItem {
  id: string;
  name: string;
  category: WasteCategory;
  thumbnail: string;
  description: string;
  defaultWeightKg: number;
  confidence: number;
  breakdown: {
    organic: number;
    plastic: number;
    paper: number;
    residual: number;
  };
  suggestedAction: string;
  calorificValueKcalPerKg: number;
  estimatedMethaneYieldM3PerKg: number;
  moisturePercent: number;
  detectedObjects: string[];
  boundingBoxes: BoundingBox[];
}

export const SAMPLE_WASTE_DATASET: SampleWasteItem[] = [
  {
    id: 'sample-kitchen-peels',
    name: 'Canteen Kitchen Scraps & Fruit Peels',
    category: 'organic',
    thumbnail: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    description: 'High-moisture vegetable peels, fruit rinds, and cooked food scraps from hostel mess.',
    defaultWeightKg: 18.5,
    confidence: 0.94,
    breakdown: {
      organic: 88,
      plastic: 4,
      paper: 5,
      residual: 3,
    },
    suggestedAction: 'Route to Community Biogas Digester Tank 1 (High Methane Yield)',
    calorificValueKcalPerKg: 3850,
    estimatedMethaneYieldM3PerKg: 0.078,
    moisturePercent: 74,
    detectedObjects: ['Banana Peels', 'Vegetable Scraps', 'Citrus Rinds', 'Rice Residue'],
    boundingBoxes: [
      { x: 12, y: 15, width: 45, height: 50, label: 'Organic: Vegetable Scraps (96%)', confidence: 0.96, category: 'organic' },
      { x: 55, y: 30, width: 35, height: 42, label: 'Organic: Fruit Peels (93%)', confidence: 0.93, category: 'organic' },
      { x: 20, y: 68, width: 25, height: 22, label: 'Trace Plastic Film (72%)', confidence: 0.72, category: 'recyclable' },
    ],
  },
  {
    id: 'sample-leaf-litter',
    name: 'Campus Lawn Leaves & Horticultural Trimmings',
    category: 'organic',
    thumbnail: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
    description: 'Dry tree leaves, pruned twigs, and grass clippings from IIT Guwahati botanical zone.',
    defaultWeightKg: 32.0,
    confidence: 0.91,
    breakdown: {
      organic: 82,
      plastic: 2,
      paper: 12,
      residual: 4,
    },
    suggestedAction: 'Route to Biogas Hydrolysis Tank or High-Carbon Inoculum Prep',
    calorificValueKcalPerKg: 4200,
    estimatedMethaneYieldM3PerKg: 0.054,
    moisturePercent: 32,
    detectedObjects: ['Fallen Leaves', 'Grass Clippings', 'Dry Foliage', 'Cellulosic Twigs'],
    boundingBoxes: [
      { x: 10, y: 10, width: 80, height: 75, label: 'Organic: Cellulosic Leaf Biomass (92%)', confidence: 0.92, category: 'organic' },
    ],
  },
  {
    id: 'sample-market-mixed',
    name: 'Market Produce & Mixed Packaging',
    category: 'organic',
    thumbnail: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80',
    description: 'Damaged tomatoes, greens, cardboard cartons, and polythene wrap from shopping complex.',
    defaultWeightKg: 24.0,
    confidence: 0.86,
    breakdown: {
      organic: 68,
      plastic: 16,
      paper: 12,
      residual: 4,
    },
    suggestedAction: 'Route to Smart Segregation Station -> Extract Organic Stream for Digester',
    calorificValueKcalPerKg: 3400,
    estimatedMethaneYieldM3PerKg: 0.061,
    moisturePercent: 62,
    detectedObjects: ['Spoiled Produce', 'Cardboard Tray', 'LDPE Wrap', 'Organic Mash'],
    boundingBoxes: [
      { x: 15, y: 20, width: 48, height: 60, label: 'Organic: Perishable Produce (89%)', confidence: 0.89, category: 'organic' },
      { x: 62, y: 18, width: 30, height: 35, label: 'Recyclable: Cardboard Container (91%)', confidence: 0.91, category: 'paper' },
      { x: 50, y: 60, width: 38, height: 30, label: 'Recyclable: Plastic Film (84%)', confidence: 0.84, category: 'recyclable' },
    ],
  },
  {
    id: 'sample-plastic-bottles',
    name: 'PET Beverage Bottles & Aluminum Cans',
    category: 'recyclable',
    thumbnail: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    description: 'Empty beverage bottles and metal cans discarded near student sports complex.',
    defaultWeightKg: 8.5,
    confidence: 0.97,
    breakdown: {
      organic: 3,
      plastic: 78,
      paper: 4,
      residual: 15,
    },
    suggestedAction: 'Direct Route to Material Recovery Facility (MRF) Plastic Baling Unit',
    calorificValueKcalPerKg: 5200,
    estimatedMethaneYieldM3PerKg: 0.0,
    moisturePercent: 5,
    detectedObjects: ['PET Bottles', 'HDPE Bottle Caps', 'Aluminum Can'],
    boundingBoxes: [
      { x: 18, y: 22, width: 32, height: 55, label: 'Recyclable: PET Bottle (98%)', confidence: 0.98, category: 'recyclable' },
      { x: 52, y: 35, width: 35, height: 48, label: 'Recyclable: Beverage Can (95%)', confidence: 0.95, category: 'recyclable' },
    ],
  },
];
