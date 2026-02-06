// Policy Dashboard Mock Data for Serbia Real Estate Digitization

// ===== CITIES & REGIONS =====
export const serbianCities = [
  { id: 'belgrade', name: 'Belgrade', population: 1397000, region: 'Central Serbia' },
  { id: 'novisad', name: 'Novi Sad', population: 289128, region: 'Vojvodina' },
  { id: 'nis', name: 'Niš', population: 183164, region: 'Southern Serbia' },
  { id: 'kragujevac', name: 'Kragujevac', population: 150835, region: 'Central Serbia' },
  { id: 'subotica', name: 'Subotica', population: 97910, region: 'Vojvodina' },
  { id: 'zrenjanin', name: 'Zrenjanin', population: 76511, region: 'Vojvodina' },
  { id: 'pancevo', name: 'Pančevo', population: 76203, region: 'Vojvodina' },
  { id: 'cacak', name: 'Čačak', population: 73331, region: 'Western Serbia' },
  { id: 'leskovac', name: 'Leskovac', population: 60288, region: 'Southern Serbia' },
  { id: 'kraljevo', name: 'Kraljevo', population: 68749, region: 'Western Serbia' },
];

// ===== AFFORDABLE HOUSING DATA =====
export interface AffordabilityData {
  cityId: string;
  cityName: string;
  housingAffordabilityIndex: number; // Lower is better (price/income ratio)
  medianHousePrice: number; // in EUR
  medianHouseholdIncome: number; // annual in EUR
  priceToIncomeRatio: number;
  eligibleHouseholds: number; // percentage
  newAffordableUnits: number;
  newAffordableUnitsChange: number; // MoM change %
  affordabilityStatus: 'affordable' | 'stressed' | 'critical';
}

export const affordabilityByCity: AffordabilityData[] = [
  { cityId: 'belgrade', cityName: 'Belgrade', housingAffordabilityIndex: 12.8, medianHousePrice: 185000, medianHouseholdIncome: 14500, priceToIncomeRatio: 12.8, eligibleHouseholds: 18, newAffordableUnits: 342, newAffordableUnitsChange: -5.2, affordabilityStatus: 'critical' },
  { cityId: 'novisad', cityName: 'Novi Sad', housingAffordabilityIndex: 10.2, medianHousePrice: 145000, medianHouseholdIncome: 14200, priceToIncomeRatio: 10.2, eligibleHouseholds: 24, newAffordableUnits: 187, newAffordableUnitsChange: 8.4, affordabilityStatus: 'critical' },
  { cityId: 'nis', cityName: 'Niš', housingAffordabilityIndex: 7.4, medianHousePrice: 78000, medianHouseholdIncome: 10500, priceToIncomeRatio: 7.4, eligibleHouseholds: 38, newAffordableUnits: 124, newAffordableUnitsChange: 12.1, affordabilityStatus: 'stressed' },
  { cityId: 'kragujevac', cityName: 'Kragujevac', housingAffordabilityIndex: 6.8, medianHousePrice: 68000, medianHouseholdIncome: 10000, priceToIncomeRatio: 6.8, eligibleHouseholds: 42, newAffordableUnits: 98, newAffordableUnitsChange: 15.3, affordabilityStatus: 'affordable' },
  { cityId: 'subotica', cityName: 'Subotica', housingAffordabilityIndex: 7.1, medianHousePrice: 72000, medianHouseholdIncome: 10100, priceToIncomeRatio: 7.1, eligibleHouseholds: 40, newAffordableUnits: 76, newAffordableUnitsChange: 6.8, affordabilityStatus: 'stressed' },
  { cityId: 'zrenjanin', cityName: 'Zrenjanin', housingAffordabilityIndex: 5.9, medianHousePrice: 55000, medianHouseholdIncome: 9300, priceToIncomeRatio: 5.9, eligibleHouseholds: 48, newAffordableUnits: 54, newAffordableUnitsChange: 9.2, affordabilityStatus: 'affordable' },
  { cityId: 'pancevo', cityName: 'Pančevo', housingAffordabilityIndex: 8.2, medianHousePrice: 95000, medianHouseholdIncome: 11600, priceToIncomeRatio: 8.2, eligibleHouseholds: 35, newAffordableUnits: 67, newAffordableUnitsChange: -2.1, affordabilityStatus: 'stressed' },
  { cityId: 'cacak', cityName: 'Čačak', housingAffordabilityIndex: 5.5, medianHousePrice: 48000, medianHouseholdIncome: 8700, priceToIncomeRatio: 5.5, eligibleHouseholds: 52, newAffordableUnits: 43, newAffordableUnitsChange: 18.4, affordabilityStatus: 'affordable' },
  { cityId: 'leskovac', cityName: 'Leskovac', housingAffordabilityIndex: 5.2, medianHousePrice: 42000, medianHouseholdIncome: 8100, priceToIncomeRatio: 5.2, eligibleHouseholds: 55, newAffordableUnits: 38, newAffordableUnitsChange: 22.6, affordabilityStatus: 'affordable' },
  { cityId: 'kraljevo', cityName: 'Kraljevo', housingAffordabilityIndex: 5.8, medianHousePrice: 52000, medianHouseholdIncome: 9000, priceToIncomeRatio: 5.8, eligibleHouseholds: 50, newAffordableUnits: 45, newAffordableUnitsChange: 14.2, affordabilityStatus: 'affordable' },
];

export const incomeDecileData = [
  { decile: 'D1', income: 3200, avgPrice: 42000, affordable: true },
  { decile: 'D2', income: 5100, avgPrice: 48000, affordable: true },
  { decile: 'D3', income: 6800, avgPrice: 55000, affordable: true },
  { decile: 'D4', income: 8200, avgPrice: 68000, affordable: true },
  { decile: 'D5', income: 10500, avgPrice: 85000, affordable: false },
  { decile: 'D6', income: 13200, avgPrice: 105000, affordable: false },
  { decile: 'D7', income: 16800, avgPrice: 135000, affordable: false },
  { decile: 'D8', income: 22500, avgPrice: 165000, affordable: false },
  { decile: 'D9', income: 32000, avgPrice: 210000, affordable: false },
  { decile: 'D10', income: 58000, avgPrice: 380000, affordable: true },
];

export const nationalAffordabilityKPIs = {
  nationalHAI: 8.4,
  nationalHAIChange: 0.3,
  medianPriceToIncome: 7.8,
  eligibleHouseholdsNational: 34,
  newAffordableUnitsNational: 1074,
  newAffordableUnitsChange: 8.2,
};

// ===== LEGAL COMPLIANCE DATA =====
export interface PropertyLegalStatus {
  id: string;
  parcelId: string;
  address: string;
  city: string;
  status: 'verified' | 'pending' | 'disputed' | 'litigation';
  ownershipLineage: number; // count of transfers
  zoningApproval: boolean;
  environmentalClearance: boolean;
  occupancyCertificate: boolean;
  mortgageStatus: 'clear' | 'active' | 'defaulted';
  lienStatus: boolean;
  blockchainHash: string;
  lastVerified: string;
  riskFlags: string[];
}

export const legalComplianceKPIs = {
  fullyVerified: 78.4,
  pendingLegalChecks: 14.2,
  disputed: 5.8,
  underLitigation: 1.6,
  avgRegistrationTime: 4.2, // days
  avgRegistrationTimeChange: -18.5, // % improvement
};

export const propertyLegalStatuses: PropertyLegalStatus[] = [
  { id: 'P001', parcelId: 'BG-2024-45892', address: 'Knez Mihailova 22', city: 'Belgrade', status: 'verified', ownershipLineage: 4, zoningApproval: true, environmentalClearance: true, occupancyCertificate: true, mortgageStatus: 'clear', lienStatus: false, blockchainHash: '0x7a8b9c...3d4e5f', lastVerified: '2024-01-15', riskFlags: [] },
  { id: 'P002', parcelId: 'BG-2024-45893', address: 'Terazije 15', city: 'Belgrade', status: 'pending', ownershipLineage: 2, zoningApproval: true, environmentalClearance: false, occupancyCertificate: true, mortgageStatus: 'active', lienStatus: false, blockchainHash: '0x1f2e3d...6a7b8c', lastVerified: '2024-01-10', riskFlags: ['Environmental clearance missing'] },
  { id: 'P003', parcelId: 'NS-2024-12456', address: 'Zmaj Jovina 8', city: 'Novi Sad', status: 'disputed', ownershipLineage: 6, zoningApproval: true, environmentalClearance: true, occupancyCertificate: false, mortgageStatus: 'clear', lienStatus: true, blockchainHash: '0x9c8b7a...4e3d2c', lastVerified: '2024-01-08', riskFlags: ['Title conflict', 'Missing occupancy certificate'] },
  { id: 'P004', parcelId: 'NI-2024-78234', address: 'Obrenovićeva 42', city: 'Niš', status: 'verified', ownershipLineage: 3, zoningApproval: true, environmentalClearance: true, occupancyCertificate: true, mortgageStatus: 'active', lienStatus: false, blockchainHash: '0x5d6e7f...2a1b0c', lastVerified: '2024-01-14', riskFlags: [] },
  { id: 'P005', parcelId: 'KG-2024-34567', address: 'Kralja Petra I 18', city: 'Kragujevac', status: 'litigation', ownershipLineage: 8, zoningApproval: false, environmentalClearance: true, occupancyCertificate: false, mortgageStatus: 'defaulted', lienStatus: true, blockchainHash: '0x3c4d5e...8f9g0h', lastVerified: '2024-01-05', riskFlags: ['Under court stay', 'Zoning violation', 'Defaulted mortgage'] },
  { id: 'P006', parcelId: 'SU-2024-56789', address: 'Korzo 25', city: 'Subotica', status: 'verified', ownershipLineage: 2, zoningApproval: true, environmentalClearance: true, occupancyCertificate: true, mortgageStatus: 'clear', lienStatus: false, blockchainHash: '0x2b3c4d...7e8f9g', lastVerified: '2024-01-16', riskFlags: [] },
  { id: 'P007', parcelId: 'ZR-2024-23456', address: 'Glavna 12', city: 'Zrenjanin', status: 'pending', ownershipLineage: 5, zoningApproval: true, environmentalClearance: true, occupancyCertificate: false, mortgageStatus: 'active', lienStatus: false, blockchainHash: '0x8e9f0g...3a4b5c', lastVerified: '2024-01-12', riskFlags: ['Pending occupancy verification'] },
  { id: 'P008', parcelId: 'PA-2024-67890', address: 'Vojvode Radomira 5', city: 'Pančevo', status: 'verified', ownershipLineage: 3, zoningApproval: true, environmentalClearance: true, occupancyCertificate: true, mortgageStatus: 'clear', lienStatus: false, blockchainHash: '0x4d5e6f...9g0h1i', lastVerified: '2024-01-15', riskFlags: [] },
];

export const riskFlagsSummary = [
  { type: 'Title Conflicts', count: 234, severity: 'high' },
  { type: 'Duplicate Registrations', count: 87, severity: 'critical' },
  { type: 'Zoning Violations', count: 156, severity: 'medium' },
  { type: 'Unregistered Extensions', count: 412, severity: 'low' },
  { type: 'Missing Clearances', count: 328, severity: 'medium' },
  { type: 'Post-sale Modifications', count: 145, severity: 'medium' },
];

// ===== SUBSIDY ALLOCATION DATA =====
export const subsidyKPIs = {
  totalBudget: 125000000, // EUR
  allocated: 98500000,
  utilized: 76200000,
  leakageMismatch: 3.2, // %
  beneficiaries: 12450,
  avgSubsidyPerUnit: 6120,
};

export const subsidyByIncomeBracket = [
  { bracket: '< €5,000', allocated: 28500000, utilized: 24800000, beneficiaries: 4850, leakage: 1.8 },
  { bracket: '€5,000 - €10,000', allocated: 35200000, utilized: 28100000, beneficiaries: 4200, leakage: 2.4 },
  { bracket: '€10,000 - €15,000', allocated: 22800000, utilized: 16200000, beneficiaries: 2400, leakage: 4.2 },
  { bracket: '€15,000 - €20,000', allocated: 8500000, utilized: 5100000, beneficiaries: 780, leakage: 5.8 },
  { bracket: '> €20,000', allocated: 3500000, utilized: 2000000, beneficiaries: 220, leakage: 8.1 },
];

export const subsidyRedFlags = [
  { type: 'Premium property subsidy', count: 45, amount: 890000 },
  { type: 'Repeated beneficiary', count: 23, amount: 456000 },
  { type: 'Income mismatch', count: 67, amount: 1230000 },
  { type: 'Construction delay', count: 89, amount: 2150000 },
  { type: 'False documentation', count: 12, amount: 340000 },
];

export const subsidyOutcomes = {
  unitsDelivered: 8920,
  unitsSubsidized: 12450,
  deliveryRate: 71.6,
  avgPriceReduction: 18.4, // %
  avgTimeToPossession: 14.2, // months
  satisfactionScore: 7.8, // out of 10
};

export const subsidyByCity = [
  { city: 'Belgrade', budget: 42000000, utilized: 35600000, units: 3420, leakage: 2.8 },
  { city: 'Novi Sad', budget: 22000000, utilized: 18200000, units: 2150, leakage: 3.1 },
  { city: 'Niš', budget: 15000000, utilized: 11800000, units: 1680, leakage: 4.2 },
  { city: 'Kragujevac', budget: 9500000, utilized: 7200000, units: 1120, leakage: 3.5 },
  { city: 'Other', budget: 10000000, utilized: 3400000, units: 2080, leakage: 2.9 },
];

// ===== BUBBLE PROTECTION DATA =====
export const bubbleIndicators = {
  priceGrowthVsIncome: 4.2, // divergence index (>3 = warning)
  priceToRentRatio: 28.5, // (>25 = elevated)
  investorTransactionShare: 34.2, // % (>30 = speculation)
  vacancyRate: 8.4, // %
  vacancyTrend: 1.2, // % increase YoY
};

export const marketStressSignals = [
  { signal: 'Rapid resales (<12mo)', count: 2340, trend: 18.5, severity: 'high' },
  { signal: 'Multiple properties/entity', count: 456, trend: 12.3, severity: 'medium' },
  { signal: 'Debt-backed purchases', count: 8920, trend: 24.1, severity: 'high' },
  { signal: 'Construction vs occupancy gap', count: 3200, trend: 8.4, severity: 'medium' },
  { signal: 'Foreign investment spike', count: 1890, trend: 42.5, severity: 'high' },
];

export const cityBubbleRisk = [
  { city: 'Belgrade', riskScore: 78, priceGrowth: 18.4, incomeGrowth: 4.2, status: 'high' },
  { city: 'Novi Sad', riskScore: 72, priceGrowth: 22.1, incomeGrowth: 5.1, status: 'high' },
  { city: 'Niš', riskScore: 45, priceGrowth: 8.2, incomeGrowth: 4.8, status: 'medium' },
  { city: 'Kragujevac', riskScore: 38, priceGrowth: 6.5, incomeGrowth: 3.9, status: 'low' },
  { city: 'Subotica', riskScore: 52, priceGrowth: 12.4, incomeGrowth: 4.5, status: 'medium' },
  { city: 'Pančevo', riskScore: 61, priceGrowth: 15.8, incomeGrowth: 5.2, status: 'medium' },
];

export const aiForecast = {
  sixMonthRiskScore: 68,
  twelveMonthRiskScore: 74,
  correctionProbability: 42, // %
  liquidityStress: 35, // %
  recommendedActions: [
    'Tighten LTV norms in Belgrade and Novi Sad',
    'Freeze subsidies in overheated zones',
    'Increase registration scrutiny for repeat buyers',
    'Monitor foreign investment inflows',
  ],
};

export const priceGrowthTrend = [
  { month: 'Jul 23', priceGrowth: 8.2, incomeGrowth: 3.8 },
  { month: 'Aug 23', priceGrowth: 9.1, incomeGrowth: 3.9 },
  { month: 'Sep 23', priceGrowth: 10.4, incomeGrowth: 4.0 },
  { month: 'Oct 23', priceGrowth: 11.8, incomeGrowth: 4.1 },
  { month: 'Nov 23', priceGrowth: 13.2, incomeGrowth: 4.2 },
  { month: 'Dec 23', priceGrowth: 14.5, incomeGrowth: 4.3 },
  { month: 'Jan 24', priceGrowth: 15.8, incomeGrowth: 4.4 },
  { month: 'Feb 24', priceGrowth: 16.2, incomeGrowth: 4.5 },
  { month: 'Mar 24', priceGrowth: 17.1, incomeGrowth: 4.6 },
  { month: 'Apr 24', priceGrowth: 18.4, incomeGrowth: 4.7 },
];

// ===== MASTER MINISTERIAL VIEW =====
export const ministerialKPIs = {
  affordabilityScore: 62, // out of 100, higher = more affordable
  affordabilityTrend: -3.2,
  legalCleanliness: 78.4, // %
  legalTrend: 5.8,
  subsidyEffectiveness: 71.6, // delivery rate %
  subsidyTrend: 2.4,
  bubbleRiskIndex: 68, // out of 100, higher = more risk
  bubbleTrend: 8.5,
};

// Helper functions
export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toFixed(0)}`;
};

export const getRiskColor = (status: string): string => {
  switch (status) {
    case 'critical':
    case 'high':
      return 'text-red-500';
    case 'stressed':
    case 'medium':
      return 'text-amber-500';
    case 'affordable':
    case 'low':
      return 'text-emerald-500';
    default:
      return 'text-muted-foreground';
  }
};

export const getRiskBgColor = (status: string): string => {
  switch (status) {
    case 'critical':
    case 'high':
      return 'bg-red-500';
    case 'stressed':
    case 'medium':
      return 'bg-amber-500';
    case 'affordable':
    case 'low':
      return 'bg-emerald-500';
    default:
      return 'bg-muted';
  }
};
