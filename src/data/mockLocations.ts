export interface CommunityLocation {
  id: string;
  name: string;
  sector: string;
  lat: number;
  lng: number;
  type: 'household' | 'mess' | 'market' | 'commercial' | 'biogas_plant' | 'mrf_hub';
  address: string;
  estimatedDailyOrganicKg: number;
}

export const COMMUNITY_LOCATIONS: CommunityLocation[] = [
  {
    id: 'loc-1',
    name: 'Brahmaputra Hostel Dining Hall',
    sector: 'Sector A (Hostel Zone)',
    lat: 26.1925,
    lng: 91.6948,
    type: 'mess',
    address: 'Brahmaputra Mess Block, IIT Guwahati Campus, 781039',
    estimatedDailyOrganicKg: 65,
  },
  {
    id: 'loc-2',
    name: 'Dihing & Manas Mess Complex',
    sector: 'Sector A (Hostel Zone)',
    lat: 26.1942,
    lng: 91.6931,
    type: 'mess',
    address: 'Dihing Dining Corridor, IIT Guwahati, 781039',
    estimatedDailyOrganicKg: 78,
  },
  {
    id: 'loc-3',
    name: 'Core Academic Canteen & Food Court',
    sector: 'Sector B (Academic Hub)',
    lat: 26.1885,
    lng: 91.6912,
    type: 'commercial',
    address: 'Academic Complex Block Canteen, IIT Guwahati',
    estimatedDailyOrganicKg: 42,
  },
  {
    id: 'loc-4',
    name: 'Faculty Quarters - Block D',
    sector: 'Sector C (Residential)',
    lat: 26.1852,
    lng: 91.6965,
    type: 'household',
    address: 'Faculty Housing Sector 2, Lane 4, IIT Guwahati',
    estimatedDailyOrganicKg: 28,
  },
  {
    id: 'loc-5',
    name: 'North Guwahati Market Produce Ward',
    sector: 'Sector D (Community Market)',
    lat: 26.1965,
    lng: 91.6850,
    type: 'market',
    address: 'Amingaon Main Market Produce Sheds, North Guwahati',
    estimatedDailyOrganicKg: 120,
  },
  {
    id: 'loc-6',
    name: 'Sports Complex & Student Gymkhana',
    sector: 'Sector E (Recreational)',
    lat: 26.1870,
    lng: 91.6890,
    type: 'commercial',
    address: 'Sports Pavilion & Activity Center, IIT Guwahati',
    estimatedDailyOrganicKg: 15,
  },
  {
    id: 'loc-biogas',
    name: 'Waste2Watt Central Biogas & Energy Digester',
    sector: 'Clean Energy Zone',
    lat: 26.1905,
    lng: 91.6915,
    type: 'biogas_plant',
    address: 'Bio-Energy Microgrid Station, Clean Tech Innovation Park',
    estimatedDailyOrganicKg: 0,
  },
  {
    id: 'loc-mrf',
    name: 'Material Recovery Facility (MRF Recycler)',
    sector: 'Recovery Hub',
    lat: 26.1830,
    lng: 91.6880,
    type: 'mrf_hub',
    address: 'Circular Recycling Depot, South Gate Industrial Zone',
    estimatedDailyOrganicKg: 0,
  }
];

export const MAP_CENTER_DEFAULT = {
  lat: 26.1905,
  lng: 91.6915,
  zoom: 15,
};
