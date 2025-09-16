import { DataCenter } from '../types/DataCenter';

export const dataCenters: DataCenter[] = [
  {
    id: '1',
    name: 'TechVault NYC',
    location: 'New York, NY',
    city: 'New York',
    country: 'USA',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    tier: 'Tier 3',
    description: 'Premier data center facility in the heart of Manhattan, offering enterprise-grade colocation and cloud services with 99.982% uptime guarantee.',
    website: 'https://techvault-nyc.com',
    established: '2018',
    operator: 'TechVault Corporation',
    specifications: {
      totalSpace: '150,000 sq ft',
      power: '25 MW',
      cooling: 'N+1 Redundant',
      floors: 8,
      rackCount: 2400,
      powerDensity: '15 kW/rack'
    },
    capacity: {
      used: 78,
      availableRacks: 45,
      status: 'Available',
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    connectivity: {
      carriers: ['Verizon', 'AT&T', 'Level 3', 'Cogent', 'NTT'],
      bandwidth: '100 Gbps',
      internetExchanges: ['NYIIX', 'DE-CIX NY'],
      fiberProviders: ['Crown Castle', 'Zayo', 'Lightower'],
      cloudOnRamps: ['AWS Direct Connect', 'Azure ExpressRoute', 'Google Cloud Interconnect']
    },
    services: [
      'Colocation',
      'Dedicated Servers',
      'Cloud Hosting',
      'Disaster Recovery',
      'Managed Services',
      'Network Security',
      'Load Balancing',
      '24/7 Support',
      'Remote Hands',
      'Smart Hands'
    ],
    security: {
      level: 'Military Grade',
      accessControl: 'Biometric + Key Card',
      surveillance: '24/7 CCTV with AI monitoring',
      compliance: ['SOC 2 Type II', 'PCI DSS', 'HIPAA']
    },
    certifications: ['SOC 2 Type II', 'PCI DSS', 'HIPAA', 'ISO 27001', 'SSAE 18'],
    sustainability: {
      pue: 1.3,
      renewableEnergy: 85,
      carbonNeutral: true,
      greenCertifications: ['LEED Gold', 'Energy Star']
    },
    contact: {
      phone: '+1 (212) 555-0123',
      email: 'sales@techvault-nyc.com',
      website: 'www.techvault-nyc.com',
      salesTeam: 'sales@techvault-nyc.com',
      support: 'support@techvault-nyc.com'
    },
    pricing: {
      colocation: '450',
      dedicatedServer: '299',
      cloudHosting: '0.12',
      bandwidth: '2.50',
      setup: '500'
    },
    amenities: ['Conference Rooms', 'Break Area', 'Parking', 'Loading Dock', 'Visitor Center'],
    nearbyServices: ['Restaurants', 'Hotels', 'Airport (30 min)', 'Public Transit', 'Banks'],
    reviews: {
      rating: 4.7,
      totalReviews: 156,
      reliability: 4.8,
      support: 4.6,
      value: 4.5
    },
    realTimeData: {
      temperature: 22.5,
      humidity: 45,
      powerUsage: 18.2,
      networkLatency: 2.1,
      uptime: 99.98
    }
  },
  {
    id: '2',
    name: 'CloudCore London',
    location: 'London, UK',
    city: 'London',
    country: 'United Kingdom',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    tier: 'Tier 4',
    description: 'State-of-the-art Tier 4 data center in London\'s financial district, providing maximum uptime and security for mission-critical applications.',
    website: 'https://cloudcore-london.co.uk',
    established: '2016',
    operator: 'CloudCore International',
    specifications: {
      totalSpace: '200,000 sq ft',
      power: '40 MW',
      cooling: '2N Redundant',
      floors: 12,
      rackCount: 3200,
      powerDensity: '20 kW/rack'
    },
    capacity: {
      used: 65,
      availableRacks: 78,
      status: 'Available',
      lastUpdated: '2024-01-15T09:15:00Z'
    },
    connectivity: {
      carriers: ['BT', 'Virgin Media', 'TalkTalk', 'COLT', 'Zayo'],
      bandwidth: '200 Gbps',
      internetExchanges: ['LINX', 'DE-CIX London'],
      fiberProviders: ['Openreach', 'CityFibre', 'Hyperoptic'],
      cloudOnRamps: ['AWS Direct Connect', 'Azure ExpressRoute', 'Google Cloud', 'Oracle FastConnect']
    },
    services: [
      'Colocation',
      'Private Cloud',
      'Hybrid Cloud',
      'DDoS Protection',
      'Data Backup',
      'Remote Hands',
      'Power Management',
      'Compliance Support',
      'Managed Security',
      'Network Monitoring'
    ],
    security: {
      level: 'Maximum Security',
      accessControl: 'Multi-factor Authentication',
      surveillance: 'AI-powered 24/7 monitoring',
      compliance: ['SOC 2 Type II', 'ISO 27001', 'PCI DSS']
    },
    certifications: ['SOC 2 Type II', 'ISO 27001', 'PCI DSS', 'GDPR Compliant', 'ISO 14001'],
    sustainability: {
      pue: 1.25,
      renewableEnergy: 100,
      carbonNeutral: true,
      greenCertifications: ['BREEAM Excellent', 'Carbon Trust Standard']
    },
    contact: {
      phone: '+44 20 7946 0958',
      email: 'info@cloudcore-london.co.uk',
      website: 'www.cloudcore-london.co.uk',
      salesTeam: 'sales@cloudcore-london.co.uk',
      support: 'support@cloudcore-london.co.uk'
    },
    pricing: {
      colocation: '520',
      dedicatedServer: '389',
      cloudHosting: '0.15',
      bandwidth: '3.20',
      setup: '750'
    },
    amenities: ['Executive Lounge', 'Meeting Rooms', 'Café', 'Secure Parking', 'Concierge'],
    nearbyServices: ['Financial District', 'Hotels', 'Heathrow (45 min)', 'Underground', 'Restaurants'],
    reviews: {
      rating: 4.9,
      totalReviews: 203,
      reliability: 4.9,
      support: 4.8,
      value: 4.7
    },
    realTimeData: {
      temperature: 21.8,
      humidity: 42,
      powerUsage: 26.5,
      networkLatency: 1.8,
      uptime: 99.99
    }
  },
  {
    id: '3',
    name: 'DataFlex Tokyo',
    location: 'Tokyo, Japan',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    tier: 'Tier 3',
    description: 'Modern data center facility serving the Asia-Pacific region with cutting-edge infrastructure and local language support.',
    website: 'https://dataflex-tokyo.jp',
    established: '2019',
    operator: 'DataFlex Asia Pacific',
    specifications: {
      totalSpace: '120,000 sq ft',
      power: '30 MW',
      cooling: 'N+1 Redundant',
      floors: 6,
      rackCount: 1800,
      powerDensity: '12 kW/rack'
    },
    capacity: {
      used: 82,
      availableRacks: 28,
      status: 'Limited',
      lastUpdated: '2024-01-15T14:20:00Z'
    },
    connectivity: {
      carriers: ['NTT', 'KDDI', 'SoftBank', 'IIJ', 'ARTERIA'],
      bandwidth: '150 Gbps',
      internetExchanges: ['JPIX', 'JPNAP Tokyo'],
      fiberProviders: ['NTT East', 'KDDI', 'Colt'],
      cloudOnRamps: ['AWS Direct Connect', 'Azure ExpressRoute', 'Google Cloud', 'Alibaba Cloud']
    },
    services: [
      'Colocation',
      'Dedicated Servers',
      'CDN Services',
      'Gaming Infrastructure',
      'Streaming Services',
      'Mobile App Backend',
      'AI/ML Hosting',
      'IoT Platform',
      'Edge Computing',
      'Content Delivery'
    ],
    security: {
      level: 'High Security',
      accessControl: 'Biometric Scanning',
      surveillance: '360° monitoring with facial recognition',
      compliance: ['SOC 2 Type II', 'ISO 27001', 'ISMS']
    },
    certifications: ['SOC 2 Type II', 'ISO 27001', 'ISMS', 'Privacy Mark', 'FISC'],
    sustainability: {
      pue: 1.35,
      renewableEnergy: 70,
      carbonNeutral: false,
      greenCertifications: ['CASBEE A-rank']
    },
    contact: {
      phone: '+81 3-5555-0123',
      email: 'sales@dataflex-tokyo.jp',
      website: 'www.dataflex-tokyo.jp',
      salesTeam: 'sales@dataflex-tokyo.jp',
      support: 'support@dataflex-tokyo.jp'
    },
    pricing: {
      colocation: '420',
      dedicatedServer: '259',
      cloudHosting: '0.10',
      bandwidth: '2.80',
      setup: '400'
    },
    amenities: ['Traditional Tea Room', 'Business Center', 'Vending Area', 'Parking', 'Reception'],
    nearbyServices: ['Tech District', 'Hotels', 'Narita Airport (60 min)', 'JR Station', 'Convenience Stores'],
    reviews: {
      rating: 4.6,
      totalReviews: 89,
      reliability: 4.7,
      support: 4.8,
      value: 4.4
    },
    realTimeData: {
      temperature: 23.2,
      humidity: 48,
      powerUsage: 24.6,
      networkLatency: 3.2,
      uptime: 99.95
    }
  },
  {
    id: '4',
    name: 'SecureVault Frankfurt',
    location: 'Frankfurt, Germany',
    city: 'Frankfurt',
    country: 'Germany',
    coordinates: { lat: 50.1109, lng: 8.6821 },
    tier: 'Tier 3',
    description: 'European hub data center with excellent connectivity to major financial markets and strict data protection compliance.',
    website: 'https://securevault-frankfurt.de',
    established: '2017',
    operator: 'SecureVault Europe GmbH',
    specifications: {
      totalSpace: '180,000 sq ft',
      power: '35 MW',
      cooling: 'N+1 Redundant',
      floors: 10,
      rackCount: 2800,
      powerDensity: '18 kW/rack'
    },
    capacity: {
      used: 71,
      availableRacks: 52,
      status: 'Available',
      lastUpdated: '2024-01-15T11:45:00Z'
    },
    connectivity: {
      carriers: ['Deutsche Telekom', 'Vodafone', '1&1', 'Level 3', 'Telia'],
      bandwidth: '180 Gbps',
      internetExchanges: ['DE-CIX Frankfurt', 'ECIX-FRA'],
      fiberProviders: ['Deutsche Telekom', 'Vodafone', 'Telefónica'],
      cloudOnRamps: ['AWS Direct Connect', 'Azure ExpressRoute', 'Google Cloud', 'IBM Cloud']
    },
    services: [
      'Colocation',
      'Private Cloud',
      'Financial Services',
      'GDPR Compliance',
      'Data Analytics',
      'Blockchain Hosting',
      'High-Frequency Trading',
      'Disaster Recovery',
      'Managed Services',
      'Security Operations'
    ],
    security: {
      level: 'Bank Grade',
      accessControl: 'Multi-layered Security',
      surveillance: 'Military-grade monitoring',
      compliance: ['SOC 2 Type II', 'ISO 27001', 'PCI DSS']
    },
    certifications: ['SOC 2 Type II', 'ISO 27001', 'PCI DSS', 'GDPR', 'BSI C5', 'TISAX'],
    sustainability: {
      pue: 1.28,
      renewableEnergy: 95,
      carbonNeutral: true,
      greenCertifications: ['LEED Platinum', 'EU Green Building']
    },
    contact: {
      phone: '+49 69 5555 0123',
      email: 'info@securevault-frankfurt.de',
      website: 'www.securevault-frankfurt.de',
      salesTeam: 'sales@securevault-frankfurt.de',
      support: 'support@securevault-frankfurt.de'
    },
    pricing: {
      colocation: '480',
      dedicatedServer: '329',
      cloudHosting: '0.14',
      bandwidth: '3.50',
      setup: '650'
    },
    amenities: ['Executive Suites', 'Conference Center', 'Restaurant', 'Parking Garage', 'Helipad'],
    nearbyServices: ['Financial Hub', 'Hotels', 'Frankfurt Airport (15 min)', 'S-Bahn', 'Business District'],
    reviews: {
      rating: 4.8,
      totalReviews: 167,
      reliability: 4.9,
      support: 4.7,
      value: 4.6
    },
    realTimeData: {
      temperature: 22.1,
      humidity: 44,
      powerUsage: 25.2,
      networkLatency: 1.9,
      uptime: 99.97
    }
  },
  {
    id: '5',
    name: 'PowerGrid Sydney',
    location: 'Sydney, Australia',
    city: 'Sydney',
    country: 'Australia',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    tier: 'Tier 2',
    description: 'Reliable data center serving the Australian market with renewable energy focus and excellent local support.',
    website: 'https://powergrid-sydney.com.au',
    established: '2020',
    operator: 'PowerGrid Australia Pty Ltd',
    specifications: {
      totalSpace: '90,000 sq ft',
      power: '20 MW',
      cooling: 'N+1 Redundant',
      floors: 4,
      rackCount: 1200,
      powerDensity: '10 kW/rack'
    },
    capacity: {
      used: 58,
      availableRacks: 68,
      status: 'Available',
      lastUpdated: '2024-01-15T16:30:00Z'
    },
    connectivity: {
      carriers: ['Telstra', 'Optus', 'Vocus', 'TPG', 'Aussie Broadband'],
      bandwidth: '100 Gbps',
      internetExchanges: ['IX Australia', 'Megaport'],
      fiberProviders: ['NBN Co', 'Telstra', 'Optus'],
      cloudOnRamps: ['AWS Direct Connect', 'Azure ExpressRoute', 'Google Cloud']
    },
    services: [
      'Colocation',
      'Cloud Hosting',
      'Content Delivery',
      'Media Streaming',
      'E-commerce Hosting',
      'Mobile Backend',
      'Green Energy',
      'Local Support',
      'Backup Services',
      'Monitoring'
    ],
    security: {
      level: 'Standard Security',
      accessControl: 'Key Card Access',
      surveillance: 'Standard CCTV monitoring',
      compliance: ['SOC 2 Type II', 'ISO 27001']
    },
    certifications: ['SOC 2 Type II', 'ISO 27001', 'ACSC', 'Australian Privacy Principles'],
    sustainability: {
      pue: 1.4,
      renewableEnergy: 90,
      carbonNeutral: true,
      greenCertifications: ['Green Star', 'Climate Active']
    },
    contact: {
      phone: '+61 2 5555 0123',
      email: 'sales@powergrid-sydney.com.au',
      website: 'www.powergrid-sydney.com.au',
      salesTeam: 'sales@powergrid-sydney.com.au',
      support: 'support@powergrid-sydney.com.au'
    },
    pricing: {
      colocation: '380',
      dedicatedServer: '229',
      cloudHosting: '0.09',
      bandwidth: '2.20',
      setup: '350'
    },
    amenities: ['Surf Board Storage', 'BBQ Area', 'Parking', 'Bike Racks', 'Visitor Lounge'],
    nearbyServices: ['CBD', 'Hotels', 'Kingsford Smith Airport (20 min)', 'Train Station', 'Beaches'],
    reviews: {
      rating: 4.4,
      totalReviews: 72,
      reliability: 4.5,
      support: 4.6,
      value: 4.7
    },
    realTimeData: {
      temperature: 24.1,
      humidity: 52,
      powerUsage: 11.6,
      networkLatency: 4.1,
      uptime: 99.92
    }
  },
  {
    id: '6',
    name: 'NordicConnect Stockholm',
    location: 'Stockholm, Sweden',
    city: 'Stockholm',
    country: 'Sweden',
    coordinates: { lat: 59.3293, lng: 18.0686 },
    tier: 'Tier 3',
    description: 'Sustainable data center in Stockholm, powered by 100% renewable energy and offering excellent connectivity to Northern Europe.',
    website: 'https://nordicconnect-stockholm.se',
    established: '2021',
    operator: 'NordicConnect AB',
    specifications: {
      totalSpace: '100,000 sq ft',
      power: '22 MW',
      cooling: 'Free Cooling + N+1',
      floors: 5,
      rackCount: 1500,
      powerDensity: '14 kW/rack'
    },
    capacity: {
      used: 62,
      availableRacks: 57,
      status: 'Available',
      lastUpdated: '2024-01-15T18:00:00Z'
    },
    connectivity: {
      carriers: ['Telia', 'Tele2', 'GlobalConnect', 'Netnod', 'IP-Only'],
      bandwidth: '120 Gbps',
      internetExchanges: ['Netnod Stockholm', 'STHIX'],
      fiberProviders: ['Stokab', 'GlobalConnect', 'Telia'],
      cloudOnRamps: ['AWS Direct Connect', 'Azure ExpressRoute', 'Google Cloud']
    },
    services: [
      'Colocation',
      'Green Hosting',
      'Edge Computing',
      'IoT Solutions',
      'Managed Services',
      'Disaster Recovery',
      'Network Security',
      '24/7 Support'
    ],
    security: {
      level: 'High Security',
      accessControl: 'Biometric + Key Card',
      surveillance: '24/7 CCTV',
      compliance: ['ISO 27001', 'GDPR']
    },
    certifications: ['ISO 27001', 'GDPR Compliant', 'ISO 14001', 'LEED Gold'],
    sustainability: {
      pue: 1.15,
      renewableEnergy: 100,
      carbonNeutral: true,
      greenCertifications: ['Green Power Certified']
    },
    contact: {
      phone: '+46 8-5555-0123',
      email: 'sales@nordicconnect-stockholm.se',
      website: 'www.nordicconnect-stockholm.se',
      salesTeam: 'sales@nordicconnect-stockholm.se',
      support: 'support@nordicconnect-stockholm.se'
    },
    pricing: {
      colocation: '400',
      dedicatedServer: '280',
      cloudHosting: '0.11',
      bandwidth: '2.70',
      setup: '450'
    },
    amenities: ['Sauna', 'Gym', 'Cafeteria', 'Meeting Rooms', 'Parking'],
    nearbyServices: ['Tech Park', 'Hotels', 'Arlanda Airport (35 min)', 'Metro Station', 'Restaurants'],
    reviews: {
      rating: 4.7,
      totalReviews: 95,
      reliability: 4.8,
      support: 4.7,
      value: 4.6
    },
    realTimeData: {
      temperature: 20.0,
      humidity: 40,
      powerUsage: 15.5,
      networkLatency: 2.5,
      uptime: 99.99
    }
  },
  {
    id: '7',
    name: 'DesertCloud Dubai',
    location: 'Dubai, UAE',
    city: 'Dubai',
    country: 'United Arab Emirates',
    coordinates: { lat: 25.2048, lng: 55.2708 },
    tier: 'Tier 4',
    description: 'Cutting-edge data center in Dubai, offering high-density colocation and cloud services for the Middle East and Africa.',
    website: 'https://desertcloud-dubai.ae',
    established: '2022',
    operator: 'DesertCloud Innovations',
    specifications: {
      totalSpace: '130,000 sq ft',
      power: '30 MW',
      cooling: '2N Redundant + Adiabatic',
      floors: 7,
      rackCount: 2000,
      powerDensity: '16 kW/rack'
    },
    capacity: {
      used: 70,
      availableRacks: 60,
      status: 'Available',
      lastUpdated: '2024-01-15T19:30:00Z'
    },
    connectivity: {
      carriers: ['Etisalat', 'Du', 'STC', 'Omantel', 'Mobily'],
      bandwidth: '150 Gbps',
      internetExchanges: ['UAE-IX'],
      fiberProviders: ['Etisalat', 'Du'],
      cloudOnRamps: ['AWS Direct Connect', 'Azure ExpressRoute', 'Oracle FastConnect']
    },
    services: [
      'Colocation',
      'Cloud Hosting',
      'Managed Services',
      'Disaster Recovery',
      'Cybersecurity',
      'AI/ML Infrastructure',
      'Blockchain Hosting',
      'Content Delivery'
    ],
    security: {
      level: 'Military Grade',
      accessControl: 'Biometric + Retina Scan',
      surveillance: '24/7 AI-powered CCTV',
      compliance: ['ISO 27001', 'PCI DSS', 'NIST']
    },
    certifications: ['ISO 27001', 'PCI DSS', 'NIST', 'Tier IV Design Certified'],
    sustainability: {
      pue: 1.30,
      renewableEnergy: 60,
      carbonNeutral: false,
      greenCertifications: ['Estidama Pearl Rating']
    },
    contact: {
      phone: '+971 4-5555-0123',
      email: 'sales@desertcloud-dubai.ae',
      website: 'www.desertcloud-dubai.ae',
      salesTeam: 'sales@desertcloud-dubai.ae',
      support: 'support@desertcloud-dubai.ae'
    },
    pricing: {
      colocation: '550',
      dedicatedServer: '350',
      cloudHosting: '0.18',
      bandwidth: '3.00',
      setup: '800'
    },
    amenities: ['Executive Suites', 'Prayer Rooms', 'Cafeteria', 'Valet Parking', 'Concierge'],
    nearbyServices: ['Business Bay', 'Hotels', 'Dubai International Airport (20 min)', 'Metro Station', 'Shopping Malls'],
    reviews: {
      rating: 4.8,
      totalReviews: 110,
      reliability: 4.9,
      support: 4.7,
      value: 4.6
    },
    realTimeData: {
      temperature: 23.0,
      humidity: 35,
      powerUsage: 20.1,
      networkLatency: 3.0,
      uptime: 99.99
    }
  },
  {
    id: '8',
    name: 'Amazon Web Services (AWS) - us-east-1',
    location: 'North Virginia, USA',
    city: 'Ashburn',
    country: 'USA',
    coordinates: { lat: 39.0438, lng: -77.4874 },
    tier: 'Tier 4',
    description: 'One of the largest AWS regions globally, offering a vast array of cloud services with industry-leading reliability and scalability.',
    website: 'https://aws.amazon.com/about-aws/global-infrastructure/regions/us-east-1/',
    established: '2006',
    operator: 'Amazon Web Services',
    specifications: {
      totalSpace: 'Millions of sq ft',
      power: 'Hundreds of MW',
      cooling: 'Advanced Liquid Cooling',
      floors: 0, // Not applicable for cloud regions
      rackCount: 0, // Not applicable for cloud regions
      powerDensity: 'Variable'
    },
    capacity: {
      used: 90,
      availableRacks: 0, // Not applicable for cloud regions
      status: 'Limited',
      lastUpdated: '2024-01-15T20:00:00Z'
    },
    connectivity: {
      carriers: ['AWS Global Network'],
      bandwidth: 'Tbps',
      internetExchanges: ['Multiple peering points'],
      fiberProviders: ['AWS Global Network'],
      cloudOnRamps: ['AWS Direct Connect']
    },
    services: [
      'Compute (EC2)',
      'Storage (S3, EBS)',
      'Databases (RDS, DynamoDB)',
      'Networking (VPC, Route 53)',
      'Machine Learning',
      'Analytics',
      'Security',
      'Developer Tools'
    ],
    security: {
      level: 'Cloud Security Best Practices',
      accessControl: 'IAM, Multi-factor Authentication',
      surveillance: 'Proprietary Monitoring',
      compliance: ['SOC 1, 2, 3', 'PCI DSS', 'HIPAA', 'FedRAMP', 'GDPR']
    },
    certifications: ['SOC 1, 2, 3', 'PCI DSS', 'HIPAA', 'FedRAMP', 'GDPR', 'ISO 27001'],
    sustainability: {
      pue: 1.10, // Estimated for efficient cloud operations
      renewableEnergy: 80, // AWS commitment to 100% renewable by 2025
      carbonNeutral: false, // Working towards it
      greenCertifications: ['Various regional certifications']
    },
    contact: {
      phone: 'N/A',
      email: 'aws-sales@amazon.com',
      website: 'aws.amazon.com',
      salesTeam: 'aws-sales@amazon.com',
      support: 'aws-support@amazon.com'
    },
    pricing: {
      colocation: 'N/A',
      dedicatedServer: 'N/A',
      cloudHosting: '0.03', // Example for a basic EC2 instance
      bandwidth: '0.09', // Example for data transfer out
      setup: '0' // Pay-as-you-go
    },
    amenities: ['Global Reach', 'Scalability', 'Flexibility', 'Innovation', 'Extensive Partner Network'],
    nearbyServices: ['Global Data Centers', 'Edge Locations', 'Direct Connect Locations'],
    reviews: {
      rating: 4.9,
      totalReviews: 10000, // Placeholder for vast user base
      reliability: 5.0,
      support: 4.5,
      value: 4.7
    },
    realTimeData: {
      temperature: 21.0, // Internal data center temperature
      humidity: 40,
      powerUsage: 100.0, // Relative usage
      networkLatency: 1.0,
      uptime: 99.999
    }
  },
  {
    id: '9',
    name: 'Google Cloud Platform (GCP) - europe-west1',
    location: 'Belgium',
    city: 'St. Ghislain',
    country: 'Belgium',
    coordinates: { lat: 50.4547, lng: 3.8200 },
    tier: 'Tier 4',
    description: 'Google Cloud region in Europe, providing high-performance infrastructure and advanced analytics capabilities.',
    website: 'https://cloud.google.com/about/locations/regions/europe-west1',
    established: '2015',
    operator: 'Google Cloud',
    specifications: {
      totalSpace: 'Millions of sq ft',
      power: 'Hundreds of MW',
      cooling: 'Advanced Cooling Systems',
      floors: 0, // Not applicable for cloud regions
      rackCount: 0, // Not applicable for cloud regions
      powerDensity: 'Variable'
    },
    capacity: {
      used: 85,
      availableRacks: 0, // Not applicable for cloud regions
      status: 'Limited',
      lastUpdated: '2024-01-15T20:15:00Z'
    },
    connectivity: {
      carriers: ['Google Global Network'],
      bandwidth: 'Tbps',
      internetExchanges: ['Multiple peering points'],
      fiberProviders: ['Google Global Network'],
      cloudOnRamps: ['Google Cloud Interconnect']
    },
    services: [
      'Compute Engine (VMs)',
      'Cloud Storage',
      'BigQuery',
      'Kubernetes Engine',
      'AI Platform',
      'Networking',
      'Security',
      'Operations'
    ],
    security: {
      level: 'Google Cloud Security',
      accessControl: 'IAM, Multi-factor Authentication',
      surveillance: 'Proprietary Monitoring',
      compliance: ['ISO 27001', 'SOC 1, 2, 3', 'PCI DSS', 'HIPAA', 'GDPR']
    },
    certifications: ['ISO 27001', 'SOC 1, 2, 3', 'PCI DSS', 'HIPAA', 'GDPR', 'CSA STAR'],
    sustainability: {
      pue: 1.10, // Estimated for efficient cloud operations
      renewableEnergy: 100, // Google commitment to 100% renewable
      carbonNeutral: true,
      greenCertifications: ['Carbon Neutral Certified']
    },
    contact: {
      phone: 'N/A',
      email: 'cloud-sales@google.com',
      website: 'cloud.google.com',
      salesTeam: 'cloud-sales@google.com',
      support: 'cloud-support@google.com'
    },
    pricing: {
      colocation: 'N/A',
      dedicatedServer: 'N/A',
      cloudHosting: '0.04', // Example for a basic VM instance
      bandwidth: '0.12', // Example for data transfer out
      setup: '0' // Pay-as-you-go
    },
    amenities: ['Global Network', 'Scalability', 'AI/ML Integration', 'Open Source Friendly', 'Innovation'],
    nearbyServices: ['Global Data Centers', 'Edge Locations', 'Interconnect Locations'],
    reviews: {
      rating: 4.8,
      totalReviews: 8000, // Placeholder for vast user base
      reliability: 4.9,
      support: 4.6,
      value: 4.7
    },
    realTimeData: {
      temperature: 21.5,
      humidity: 42,
      powerUsage: 90.0,
      networkLatency: 1.5,
      uptime: 99.999
    }
  },
  {
    id: '10',
    name: 'Microsoft Azure - East US',
    location: 'Virginia, USA',
    city: 'Boydton',
    country: 'USA',
    coordinates: { lat: 36.6578, lng: -78.3839 },
    tier: 'Tier 4',
    description: 'One of the primary Azure regions in the US, offering a comprehensive suite of cloud services for enterprises.',
    website: 'https://azure.microsoft.com/en-us/global-infrastructure/regions/east-us/',
    established: '2014',
    operator: 'Microsoft Azure',
    specifications: {
      totalSpace: 'Millions of sq ft',
      power: 'Hundreds of MW',
      cooling: 'Advanced Cooling Technologies',
      floors: 0, // Not applicable for cloud regions
      rackCount: 0, // Not applicable for cloud regions
      powerDensity: 'Variable'
    },
    capacity: {
      used: 88,
      availableRacks: 0, // Not applicable for cloud regions
      status: 'Limited',
      lastUpdated: '2024-01-15T20:30:00Z'
    },
    connectivity: {
      carriers: ['Microsoft Global Network'],
      bandwidth: 'Tbps',
      internetExchanges: ['Multiple peering points'],
      fiberProviders: ['Microsoft Global Network'],
      cloudOnRamps: ['Azure ExpressRoute']
    },
    services: [
      'Virtual Machines',
      'Storage (Blob, Files)',
      'SQL Database',
      'Azure Kubernetes Service',
      'AI + Machine Learning',
      'Networking',
      'Security',
      'DevOps'
    ],
    security: {
      level: 'Azure Security Center',
      accessControl: 'Azure AD, Multi-factor Authentication',
      surveillance: 'Proprietary Monitoring',
      compliance: ['ISO 27001', 'SOC 1, 2, 3', 'PCI DSS', 'HIPAA', 'FedRAMP', 'GDPR']
    },
    certifications: ['ISO 27001', 'SOC 1, 2, 3', 'PCI DSS', 'HIPAA', 'FedRAMP', 'GDPR', 'CSA STAR'],
    sustainability: {
      pue: 1.12, // Estimated for efficient cloud operations
      renewableEnergy: 75, // Microsoft commitment to 100% renewable by 2025
      carbonNeutral: false, // Working towards it
      greenCertifications: ['Various regional certifications']
    },
    contact: {
      phone: 'N/A',
      email: 'azure-sales@microsoft.com',
      website: 'azure.microsoft.com',
      salesTeam: 'azure-sales@microsoft.com',
      support: 'azure-support@microsoft.com'
    },
    pricing: {
      colocation: 'N/A',
      dedicatedServer: 'N/A',
      cloudHosting: '0.035', // Example for a basic VM instance
      bandwidth: '0.10', // Example for data transfer out
      setup: '0' // Pay-as-you-go
    },
    amenities: ['Global Footprint', 'Enterprise Focus', 'Hybrid Cloud Solutions', 'Developer Tools', 'AI Services'],
    nearbyServices: ['Global Data Centers', 'Edge Locations', 'ExpressRoute Locations'],
    reviews: {
      rating: 4.7,
      totalReviews: 9000, // Placeholder for vast user base
      reliability: 4.8,
      support: 4.6,
      value: 4.7
    },
    realTimeData: {
      temperature: 22.0,
      humidity: 43,
      powerUsage: 95.0,
      networkLatency: 1.2,
      uptime: 99.999
    }
  }
];