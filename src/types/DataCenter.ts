export interface DataCenter {
  id: string;
  name: string;
  location: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tier: string;
  description: string;
  website: string;
  established: string;
  operator: string;
  specifications: {
    totalSpace: string;
    power: string;
    cooling: string;
    floors: number;
    rackCount: number;
    powerDensity: string;
  };
  capacity: {
    used: number;
    availableRacks: number;
    status: 'Available' | 'Limited' | 'Full';
    lastUpdated: string;
  };
  connectivity: {
    carriers: string[];
    bandwidth: string;
    internetExchanges: string[];
    fiberProviders: string[];
    cloudOnRamps: string[];
  };
  services: string[];
  security: {
    level: string;
    accessControl: string;
    surveillance: string;
    compliance: string[];
  };
  certifications: string[];
  sustainability: {
    pue: number;
    renewableEnergy: number;
    carbonNeutral: boolean;
    greenCertifications: string[];
  };
  contact: {
    phone: string;
    email: string;
    website: string;
    salesTeam: string;
    support: string;
  };
  pricing: {
    colocation: string;
    dedicatedServer: string;
    cloudHosting: string;
    bandwidth: string;
    setup: string;
  };
  amenities: string[];
  nearbyServices: string[];
  reviews: {
    rating: number;
    totalReviews: number;
    reliability: number;
    support: number;
    value: number;
  };
  realTimeData: {
    temperature: number;
    humidity: number;
    powerUsage: number;
    networkLatency: number;
    uptime: number;
  };
}