// Dummy data for the Land Registry Dashboard

export interface RegionData {
  id: string;
  name: string;
  displayName: string;
  totalParcels: number;
  activeDisputes: number;
  pendingTransfers: number;
  activeMortgages: number;
  avgProcessingDays: number;
  fraudAttempts: number;
  disputeRate: number; // percentage
  coordinates: { x: number; y: number }; // for heat map positioning
}

export interface DisputeRecord {
  id: string;
  parcelId: string;
  region: string;
  type: 'ownership' | 'boundary' | 'inheritance' | 'encumbrance';
  status: 'open' | 'investigation' | 'resolved' | 'court';
  filedDate: string;
  parties: string[];
  estimatedValue: number;
  daysOpen: number;
}

export interface TransferRecord {
  id: string;
  parcelId: string;
  region: string;
  type: 'sale' | 'inheritance' | 'subdivision' | 'donation';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  submittedDate: string;
  completedDate: string | null;
  value: number;
  processingDays: number;
  buyer: string;
  seller: string;
}

export interface MortgageRecord {
  id: string;
  parcelId: string;
  region: string;
  bank: string;
  amount: number;
  status: 'active' | 'paid' | 'defaulted' | 'foreclosure';
  startDate: string;
  endDate: string | null;
  remainingBalance: number;
  monthlyPayment: number;
}

export interface SystemMetrics {
  totalTransactionsToday: number;
  avgValidationTime: number;
  blocksCreated: number;
  activeNodes: number;
  systemUptime: number;
  pendingValidations: number;
}

export const regions: RegionData[] = [
  { id: 'belgrade', name: 'belgrade', displayName: 'Belgrade', totalParcels: 245000, activeDisputes: 342, pendingTransfers: 1250, activeMortgages: 8500, avgProcessingDays: 3.2, fraudAttempts: 12, disputeRate: 0.14, coordinates: { x: 55, y: 35 } },
  { id: 'vojvodina', name: 'vojvodina', displayName: 'Vojvodina', totalParcels: 520000, activeDisputes: 456, pendingTransfers: 2100, activeMortgages: 12000, avgProcessingDays: 4.1, fraudAttempts: 8, disputeRate: 0.09, coordinates: { x: 50, y: 15 } },
  { id: 'sumadija', name: 'sumadija', displayName: 'Šumadija', totalParcels: 180000, activeDisputes: 198, pendingTransfers: 890, activeMortgages: 4200, avgProcessingDays: 3.8, fraudAttempts: 5, disputeRate: 0.11, coordinates: { x: 45, y: 45 } },
  { id: 'nisava', name: 'nisava', displayName: 'Nišava', totalParcels: 165000, activeDisputes: 234, pendingTransfers: 720, activeMortgages: 3800, avgProcessingDays: 4.5, fraudAttempts: 7, disputeRate: 0.14, coordinates: { x: 70, y: 55 } },
  { id: 'zlatibor', name: 'zlatibor', displayName: 'Zlatibor', totalParcels: 145000, activeDisputes: 156, pendingTransfers: 580, activeMortgages: 2900, avgProcessingDays: 5.2, fraudAttempts: 3, disputeRate: 0.11, coordinates: { x: 30, y: 50 } },
  { id: 'podunavlje', name: 'podunavlje', displayName: 'Podunavlje', totalParcels: 98000, activeDisputes: 87, pendingTransfers: 340, activeMortgages: 1800, avgProcessingDays: 3.5, fraudAttempts: 2, disputeRate: 0.09, coordinates: { x: 65, y: 40 } },
  { id: 'branicevo', name: 'branicevo', displayName: 'Braničevo', totalParcels: 125000, activeDisputes: 145, pendingTransfers: 490, activeMortgages: 2400, avgProcessingDays: 4.8, fraudAttempts: 4, disputeRate: 0.12, coordinates: { x: 75, y: 35 } },
  { id: 'jablanica', name: 'jablanica', displayName: 'Jablanica', totalParcels: 78000, activeDisputes: 112, pendingTransfers: 280, activeMortgages: 1200, avgProcessingDays: 5.5, fraudAttempts: 6, disputeRate: 0.14, coordinates: { x: 60, y: 70 } },
  { id: 'pcinja', name: 'pcinja', displayName: 'Pčinja', totalParcels: 92000, activeDisputes: 134, pendingTransfers: 310, activeMortgages: 1500, avgProcessingDays: 5.8, fraudAttempts: 5, disputeRate: 0.15, coordinates: { x: 75, y: 75 } },
  { id: 'kolubara', name: 'kolubara', displayName: 'Kolubara', totalParcels: 110000, activeDisputes: 98, pendingTransfers: 420, activeMortgages: 2100, avgProcessingDays: 4.2, fraudAttempts: 2, disputeRate: 0.09, coordinates: { x: 35, y: 40 } },
];

export const disputes: DisputeRecord[] = [
  { id: 'DSP-2024-001', parcelId: 'BEL-45892', region: 'belgrade', type: 'ownership', status: 'open', filedDate: '2024-01-15', parties: ['Petrović M.', 'Jovanović S.'], estimatedValue: 125000, daysOpen: 45 },
  { id: 'DSP-2024-002', parcelId: 'VOJ-12456', region: 'vojvodina', type: 'boundary', status: 'investigation', filedDate: '2024-01-20', parties: ['Nikolić D.', 'Marković T.'], estimatedValue: 45000, daysOpen: 40 },
  { id: 'DSP-2024-003', parcelId: 'BEL-78234', region: 'belgrade', type: 'inheritance', status: 'court', filedDate: '2023-11-08', parties: ['Estate of Kovačević', 'Kovačević A.', 'Kovačević B.'], estimatedValue: 320000, daysOpen: 112 },
  { id: 'DSP-2024-004', parcelId: 'SUM-34521', region: 'sumadija', type: 'encumbrance', status: 'open', filedDate: '2024-02-01', parties: ['Stojanović R.', 'Bank of Serbia'], estimatedValue: 89000, daysOpen: 28 },
  { id: 'DSP-2024-005', parcelId: 'NIS-67890', region: 'nisava', type: 'ownership', status: 'resolved', filedDate: '2023-10-15', parties: ['Ilić P.', 'Đorđević M.'], estimatedValue: 156000, daysOpen: 0 },
  { id: 'DSP-2024-006', parcelId: 'ZLA-23456', region: 'zlatibor', type: 'boundary', status: 'investigation', filedDate: '2024-01-28', parties: ['Municipality', 'Popović J.'], estimatedValue: 67000, daysOpen: 32 },
  { id: 'DSP-2024-007', parcelId: 'VOJ-89012', region: 'vojvodina', type: 'inheritance', status: 'open', filedDate: '2024-02-05', parties: ['Estate of Mitrović', 'Mitrović Family'], estimatedValue: 210000, daysOpen: 24 },
  { id: 'DSP-2024-008', parcelId: 'BEL-34567', region: 'belgrade', type: 'ownership', status: 'court', filedDate: '2023-09-20', parties: ['Development Corp', 'Residents Assoc.'], estimatedValue: 890000, daysOpen: 156 },
  { id: 'DSP-2024-009', parcelId: 'POD-11223', region: 'podunavlje', type: 'encumbrance', status: 'resolved', filedDate: '2023-12-10', parties: ['Janković L.', 'Credit Union'], estimatedValue: 34000, daysOpen: 0 },
  { id: 'DSP-2024-010', parcelId: 'BRA-44556', region: 'branicevo', type: 'boundary', status: 'open', filedDate: '2024-02-10', parties: ['Todorović V.', 'Stanković M.'], estimatedValue: 28000, daysOpen: 19 },
  { id: 'DSP-2024-011', parcelId: 'JAB-77889', region: 'jablanica', type: 'inheritance', status: 'investigation', filedDate: '2024-01-05', parties: ['Estate of Ristić', 'Ristić Heirs'], estimatedValue: 145000, daysOpen: 55 },
  { id: 'DSP-2024-012', parcelId: 'PCI-99001', region: 'pcinja', type: 'ownership', status: 'open', filedDate: '2024-02-08', parties: ['Savić N.', 'Unknown Claimant'], estimatedValue: 78000, daysOpen: 21 },
];

export const transfers: TransferRecord[] = [
  { id: 'TRF-2024-001', parcelId: 'BEL-45678', region: 'belgrade', type: 'sale', status: 'completed', submittedDate: '2024-01-10', completedDate: '2024-01-13', value: 185000, processingDays: 3, buyer: 'Stanković M.', seller: 'Petrović J.' },
  { id: 'TRF-2024-002', parcelId: 'VOJ-78901', region: 'vojvodina', type: 'inheritance', status: 'pending', submittedDate: '2024-02-15', completedDate: null, value: 120000, processingDays: 0, buyer: 'Nikolić Family Trust', seller: 'Estate of Nikolić' },
  { id: 'TRF-2024-003', parcelId: 'BEL-23456', region: 'belgrade', type: 'sale', status: 'approved', submittedDate: '2024-02-18', completedDate: null, value: 340000, processingDays: 2, buyer: 'Investment LLC', seller: 'Jovanović D.' },
  { id: 'TRF-2024-004', parcelId: 'SUM-56789', region: 'sumadija', type: 'subdivision', status: 'pending', submittedDate: '2024-02-20', completedDate: null, value: 95000, processingDays: 0, buyer: 'Marković Bros.', seller: 'Marković Estate' },
  { id: 'TRF-2024-005', parcelId: 'NIS-12345', region: 'nisava', type: 'sale', status: 'completed', submittedDate: '2024-02-01', completedDate: '2024-02-05', value: 67000, processingDays: 4, buyer: 'Ilić R.', seller: 'Pavlović S.' },
  { id: 'TRF-2024-006', parcelId: 'ZLA-67890', region: 'zlatibor', type: 'donation', status: 'completed', submittedDate: '2024-01-25', completedDate: '2024-01-30', value: 0, processingDays: 5, buyer: 'Popović A. (Family)', seller: 'Popović P.' },
  { id: 'TRF-2024-007', parcelId: 'VOJ-34567', region: 'vojvodina', type: 'sale', status: 'rejected', submittedDate: '2024-02-10', completedDate: '2024-02-12', value: 890000, processingDays: 2, buyer: 'Foreign Investment Co.', seller: 'Agricultural Coop' },
  { id: 'TRF-2024-008', parcelId: 'BEL-89012', region: 'belgrade', type: 'sale', status: 'pending', submittedDate: '2024-02-22', completedDate: null, value: 520000, processingDays: 0, buyer: 'Tech Holdings', seller: 'Manufacturing Ltd.' },
  { id: 'TRF-2024-009', parcelId: 'KOL-45678', region: 'kolubara', type: 'inheritance', status: 'approved', submittedDate: '2024-02-12', completedDate: null, value: 78000, processingDays: 8, buyer: 'Janković Heirs', seller: 'Estate of Janković' },
  { id: 'TRF-2024-010', parcelId: 'BRA-90123', region: 'branicevo', type: 'sale', status: 'completed', submittedDate: '2024-02-08', completedDate: '2024-02-11', value: 45000, processingDays: 3, buyer: 'Todorović M.', seller: 'Simić J.' },
];

export const mortgages: MortgageRecord[] = [
  { id: 'MTG-2024-001', parcelId: 'BEL-11111', region: 'belgrade', bank: 'Banca Intesa', amount: 150000, status: 'active', startDate: '2022-03-15', endDate: null, remainingBalance: 125000, monthlyPayment: 1250 },
  { id: 'MTG-2024-002', parcelId: 'VOJ-22222', region: 'vojvodina', bank: 'Erste Bank', amount: 85000, status: 'active', startDate: '2021-06-20', endDate: null, remainingBalance: 62000, monthlyPayment: 780 },
  { id: 'MTG-2024-003', parcelId: 'BEL-33333', region: 'belgrade', bank: 'UniCredit', amount: 320000, status: 'active', startDate: '2023-01-10', endDate: null, remainingBalance: 305000, monthlyPayment: 2800 },
  { id: 'MTG-2024-004', parcelId: 'SUM-44444', region: 'sumadija', bank: 'Komercijalna Banka', amount: 95000, status: 'paid', startDate: '2018-05-12', endDate: '2024-01-15', remainingBalance: 0, monthlyPayment: 0 },
  { id: 'MTG-2024-005', parcelId: 'NIS-55555', region: 'nisava', bank: 'AIK Banka', amount: 45000, status: 'defaulted', startDate: '2020-09-01', endDate: null, remainingBalance: 38000, monthlyPayment: 520 },
  { id: 'MTG-2024-006', parcelId: 'ZLA-66666', region: 'zlatibor', bank: 'Raiffeisen', amount: 180000, status: 'active', startDate: '2022-11-20', endDate: null, remainingBalance: 165000, monthlyPayment: 1650 },
  { id: 'MTG-2024-007', parcelId: 'VOJ-77777', region: 'vojvodina', bank: 'OTP Banka', amount: 220000, status: 'active', startDate: '2023-04-05', endDate: null, remainingBalance: 215000, monthlyPayment: 1980 },
  { id: 'MTG-2024-008', parcelId: 'BEL-88888', region: 'belgrade', bank: 'Banca Intesa', amount: 450000, status: 'foreclosure', startDate: '2019-08-15', endDate: null, remainingBalance: 380000, monthlyPayment: 4200 },
  { id: 'MTG-2024-009', parcelId: 'POD-99999', region: 'podunavlje', bank: 'Erste Bank', amount: 65000, status: 'active', startDate: '2022-07-01', endDate: null, remainingBalance: 52000, monthlyPayment: 680 },
  { id: 'MTG-2024-010', parcelId: 'KOL-10101', region: 'kolubara', bank: 'UniCredit', amount: 110000, status: 'active', startDate: '2021-12-10', endDate: null, remainingBalance: 85000, monthlyPayment: 1100 },
];

export const systemMetrics: SystemMetrics = {
  totalTransactionsToday: 1247,
  avgValidationTime: 2.3,
  blocksCreated: 89,
  activeNodes: 24,
  systemUptime: 99.97,
  pendingValidations: 156,
};

export const monthlyTrends = [
  { month: 'Jul', transfers: 2100, disputes: 180, mortgages: 890, fraudBlocked: 8 },
  { month: 'Aug', transfers: 2350, disputes: 165, mortgages: 920, fraudBlocked: 12 },
  { month: 'Sep', transfers: 2480, disputes: 195, mortgages: 1050, fraudBlocked: 6 },
  { month: 'Oct', transfers: 2890, disputes: 142, mortgages: 980, fraudBlocked: 15 },
  { month: 'Nov', transfers: 2650, disputes: 158, mortgages: 1120, fraudBlocked: 9 },
  { month: 'Dec', transfers: 1980, disputes: 134, mortgages: 750, fraudBlocked: 4 },
  { month: 'Jan', transfers: 2780, disputes: 189, mortgages: 1280, fraudBlocked: 11 },
  { month: 'Feb', transfers: 3120, disputes: 167, mortgages: 1350, fraudBlocked: 7 },
];

export const disputesByType = [
  { name: 'Ownership', value: 38, fill: 'hsl(var(--chart-1))' },
  { name: 'Boundary', value: 28, fill: 'hsl(var(--chart-2))' },
  { name: 'Inheritance', value: 22, fill: 'hsl(var(--chart-3))' },
  { name: 'Encumbrance', value: 12, fill: 'hsl(var(--chart-4))' },
];

export const transfersByType = [
  { name: 'Sale', value: 62, fill: 'hsl(var(--chart-1))' },
  { name: 'Inheritance', value: 18, fill: 'hsl(var(--chart-2))' },
  { name: 'Subdivision', value: 12, fill: 'hsl(var(--chart-3))' },
  { name: 'Donation', value: 8, fill: 'hsl(var(--chart-4))' },
];

export function getRegionById(id: string): RegionData | undefined {
  return regions.find(r => r.id === id);
}

export function getDisputesByRegion(regionId: string): DisputeRecord[] {
  return disputes.filter(d => d.region === regionId);
}

export function getTransfersByRegion(regionId: string): TransferRecord[] {
  return transfers.filter(t => t.region === regionId);
}

export function getMortgagesByRegion(regionId: string): MortgageRecord[] {
  return mortgages.filter(m => m.region === regionId);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('sr-RS', { style: 'currency', currency: 'EUR' }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('sr-RS').format(num);
}
