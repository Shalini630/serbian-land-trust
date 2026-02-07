import pptxgen from 'pptxgenjs';

interface SlideContent {
  title: string;
  subtitle?: string;
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
  formula?: { name: string; equation: string; description: string };
}

const COLORS = {
  primary: '1a2332',
  accent: 'd4a853',
  white: 'FFFFFF',
  lightGray: 'F5F5F5',
  success: '22c55e',
  warning: 'f59e0b',
  danger: 'ef4444',
};

const createTitleSlide = (pptx: pptxgen, title: string, subtitle: string) => {
  const slide = pptx.addSlide();
  slide.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: COLORS.primary } });
  slide.addText(title, {
    x: 0.5, y: 2, w: 9, h: 1.5,
    fontSize: 44, bold: true, color: COLORS.white, fontFace: 'Arial',
  });
  slide.addText(subtitle, {
    x: 0.5, y: 3.5, w: 9, h: 0.5,
    fontSize: 20, color: COLORS.accent, fontFace: 'Arial',
  });
  slide.addText('National Digital Land Registry | Serbia', {
    x: 0.5, y: 5, w: 9, h: 0.3,
    fontSize: 14, color: COLORS.white, fontFace: 'Arial', italic: true,
  });
};

const createKPISlide = (
  pptx: pptxgen,
  title: string,
  kpis: { name: string; value: string; description: string; formula?: string }[]
) => {
  const slide = pptx.addSlide();
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.primary, fontFace: 'Arial',
  });
  
  kpis.forEach((kpi, index) => {
    const yPos = 1.2 + index * 1.3;
    slide.addShape('rect', {
      x: 0.5, y: yPos, w: 9, h: 1.1,
      fill: { color: COLORS.lightGray }, line: { color: COLORS.accent, width: 1 },
    });
    slide.addText(kpi.name, {
      x: 0.7, y: yPos + 0.1, w: 4, h: 0.4,
      fontSize: 16, bold: true, color: COLORS.primary, fontFace: 'Arial',
    });
    slide.addText(kpi.value, {
      x: 7, y: yPos + 0.1, w: 2.3, h: 0.4,
      fontSize: 18, bold: true, color: COLORS.accent, fontFace: 'Arial', align: 'right',
    });
    slide.addText(kpi.description, {
      x: 0.7, y: yPos + 0.5, w: 8.5, h: 0.5,
      fontSize: 11, color: '666666', fontFace: 'Arial',
    });
  });
};

const createFormulaSlide = (
  pptx: pptxgen,
  title: string,
  formulas: { name: string; equation: string; variables: string[]; interpretation: string }[]
) => {
  const slide = pptx.addSlide();
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.primary, fontFace: 'Arial',
  });

  formulas.forEach((formula, index) => {
    const yPos = 1 + index * 1.6;
    slide.addText(formula.name, {
      x: 0.5, y: yPos, w: 9, h: 0.35,
      fontSize: 16, bold: true, color: COLORS.primary, fontFace: 'Arial',
    });
    slide.addShape('rect', {
      x: 0.5, y: yPos + 0.4, w: 9, h: 0.5,
      fill: { color: COLORS.primary },
    });
    slide.addText(formula.equation, {
      x: 0.7, y: yPos + 0.45, w: 8.6, h: 0.4,
      fontSize: 14, bold: true, color: COLORS.accent, fontFace: 'Courier New',
    });
    
    const variablesText = formula.variables.join(' | ');
    slide.addText(`Variables: ${variablesText}`, {
      x: 0.5, y: yPos + 0.95, w: 9, h: 0.25,
      fontSize: 10, color: '666666', fontFace: 'Arial', italic: true,
    });
    slide.addText(formula.interpretation, {
      x: 0.5, y: yPos + 1.2, w: 9, h: 0.3,
      fontSize: 11, color: '444444', fontFace: 'Arial',
    });
  });
};

const createBulletSlide = (pptx: pptxgen, title: string, bullets: string[]) => {
  const slide = pptx.addSlide();
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 28, bold: true, color: COLORS.primary, fontFace: 'Arial',
  });
  
  bullets.forEach((bullet, index) => {
    slide.addText(`• ${bullet}`, {
      x: 0.7, y: 1.2 + index * 0.5, w: 8.5, h: 0.45,
      fontSize: 14, color: '333333', fontFace: 'Arial',
    });
  });
};

// ==================== DASHBOARD-SPECIFIC GENERATORS ====================

export const generateAffordableHousingPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Affordable Housing Dashboard';
  pptx.author = 'National Digital Land Registry';
  pptx.subject = 'Housing Affordability Analysis';

  createTitleSlide(pptx, 'Affordable Housing Dashboard', 'Housing Affordability Index & Policy Simulation');

  // KPIs Slide
  createKPISlide(pptx, 'Key Performance Indicators', [
    { name: 'Housing Affordability Index (HAI)', value: '72.5', description: 'Measures the proportion of households that can afford median-priced housing. Higher = more affordable.' },
    { name: 'Price-to-Income Ratio', value: '8.2x', description: 'Median house price divided by median annual household income. Benchmark: <5x is affordable.' },
    { name: 'Eligible Households', value: '34.2%', description: 'Percentage of households qualifying for affordable housing programs based on income criteria.' },
    { name: 'New Affordable Units (YoY)', value: '+2,450', description: 'Net new affordable housing units added in the current year compared to previous year.' },
  ]);

  // Formulas Slide 1
  createFormulaSlide(pptx, 'Core Formulas (1/2)', [
    {
      name: 'Housing Affordability Index (HAI)',
      equation: 'HAI = (Median Household Income × 0.28 × 12) / (Monthly Mortgage Payment) × 100',
      variables: ['Median Income = Annual household income', '0.28 = Max housing cost ratio', 'Mortgage = P&I at current rates'],
      interpretation: 'HAI > 100 means median family can afford median home. HAI < 100 = affordability stress.',
    },
    {
      name: 'Price-to-Income Ratio (PIR)',
      equation: 'PIR = Median House Price / Median Annual Household Income',
      variables: ['Median House Price = 50th percentile sale price', 'Median Income = 50th percentile household income'],
      interpretation: 'PIR < 3 = Very affordable | 3-5 = Moderate | 5-7 = Stretched | >7 = Severely unaffordable',
    },
  ]);

  // Formulas Slide 2
  createFormulaSlide(pptx, 'Core Formulas (2/2)', [
    {
      name: 'EMI-to-Income Ratio',
      equation: 'EMI Ratio = (Monthly EMI / Monthly Gross Income) × 100',
      variables: ['Monthly EMI = Equated Monthly Installment', 'Gross Income = Pre-tax monthly income'],
      interpretation: 'Banks typically require EMI Ratio < 40%. Policy threshold can be set at 30-35%.',
    },
    {
      name: 'Affordability Gap Index',
      equation: 'AGI = (Affordable Price Ceiling - Actual Median Price) / Actual Median Price × 100',
      variables: ['Affordable Ceiling = Max price at 30% income allocation', 'Actual Price = Current median'],
      interpretation: 'Negative AGI = Gap between what people can afford vs actual prices. Policy intervention trigger.',
    },
  ]);

  // Policy Levers Slide
  createBulletSlide(pptx, 'Policy Simulation Parameters', [
    'Max Price-to-Income Ratio: Regulatory ceiling (e.g., 5x) triggers developer incentives',
    'Max EMI % of Income: Central bank guideline affecting loan eligibility (25-40%)',
    'Subsidy Rate: Government contribution to first-time buyer down payments',
    'Interest Rate Subsidy: Basis points reduction on home loans for eligible buyers',
    'Land Cost Cap: Maximum land component as % of total unit cost for affordable projects',
    'FSI Bonus: Additional floor space index for developers building affordable units',
  ]);

  // Data Sources Slide
  createBulletSlide(pptx, 'Data Sources & Methodology', [
    'Property prices: Land Registry blockchain transactions (real-time)',
    'Household income: Statistical Office annual survey + tax records',
    'Mortgage rates: Central Bank reference rate + bank spread data',
    'New units: Building permits + occupancy certificates issued',
    'Eligibility: Cross-referenced income declarations + asset registry',
    'Update frequency: Prices - daily | Income - quarterly | Units - monthly',
  ]);

  await pptx.writeFile({ fileName: 'Affordable_Housing_Dashboard.pptx' });
};

export const generateLegalCompliancePPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Legal Compliance Dashboard';
  pptx.author = 'National Digital Land Registry';
  pptx.subject = 'Property Legal Verification & Compliance';

  createTitleSlide(pptx, 'Legal Compliance Dashboard', 'Property Verification, Blockchain Audit Trail & Risk Flags');

  createKPISlide(pptx, 'Key Performance Indicators', [
    { name: 'Properties Fully Verified', value: '87.3%', description: 'Properties with complete legal documentation: title deed, zoning approval, environmental clearance, occupancy certificate.' },
    { name: 'Pending Legal Checks', value: '8.2%', description: 'Properties awaiting verification of one or more legal documents. Target: <5% within 30 days.' },
    { name: 'Under Litigation/Disputed', value: '4.5%', description: 'Properties with active legal disputes, court cases, or ownership conflicts requiring resolution.' },
    { name: 'Average Registration Time', value: '3.2 days', description: 'Mean time from application submission to complete registration. Benchmark: <5 days.' },
  ]);

  createFormulaSlide(pptx, 'Compliance Metrics & Formulas', [
    {
      name: 'Verification Completeness Score (VCS)',
      equation: 'VCS = (Σ Verified Documents / Total Required Documents) × 100',
      variables: ['Required Docs = Title, Zoning, Environmental, Occupancy, Tax clearance', 'Verified = Blockchain-confirmed'],
      interpretation: 'VCS = 100% means fully compliant. VCS < 80% triggers manual review. VCS < 60% = registration hold.',
    },
    {
      name: 'Dispute Resolution Rate (DRR)',
      equation: 'DRR = (Disputes Resolved in Period / Total Active Disputes at Start) × 100',
      variables: ['Resolved = Court order or settlement recorded', 'Period = Monthly/Quarterly'],
      interpretation: 'DRR > 25% quarterly = healthy resolution. DRR < 10% = systemic backlog requiring intervention.',
    },
    {
      name: 'Title Chain Integrity Score',
      equation: 'TCIS = 1 - (Title Breaks + Unverified Transfers) / Total Chain Length',
      variables: ['Title Breaks = Missing links in ownership', 'Chain Length = Total ownership transfers'],
      interpretation: 'TCIS = 1.0 = Perfect chain. TCIS < 0.95 = Requires title insurance or legal review.',
    },
  ]);

  createBulletSlide(pptx, 'Blockchain Audit Trail Components', [
    'Transaction Hash: Unique SHA-256 identifier for each ownership event',
    'Timestamp: Immutable record of when transaction was confirmed',
    'Previous Hash: Cryptographic link to prior transaction (chain integrity)',
    'Digital Signatures: Buyer, seller, and notary public key verification',
    'Document Hashes: IPFS links to legal documents with integrity verification',
    'Smart Contract State: Current ownership status, liens, encumbrances',
  ]);

  createBulletSlide(pptx, 'Risk Flag Categories', [
    'Title Conflict: Multiple parties claiming ownership (auto-detected via registry cross-check)',
    'Duplicate Registration: Same parcel registered under different IDs (geo-spatial analysis)',
    'Zoning Violation: Post-construction zoning changes affecting property use',
    'Unregistered Extension: Building footprint exceeds registered dimensions (satellite imagery)',
    'Encumbrance Override: Attempt to transfer property with active mortgage/lien',
    'Tampering Alert: Hash mismatch indicating document or record modification attempt',
  ]);

  createBulletSlide(pptx, 'Data Sources & Verification', [
    'Land Registry: Blockchain-based ownership records (real-time)',
    'Court Records: Integration with judicial case management system',
    'Municipal Zoning: GIS-linked zoning maps with change tracking',
    'Tax Authority: Property tax payment status and clearances',
    'Banks/NBFCs: Mortgage and lien registration (encrypted API)',
    'Satellite Imagery: Quarterly building footprint verification',
  ]);

  await pptx.writeFile({ fileName: 'Legal_Compliance_Dashboard.pptx' });
};

export const generateSubsidyAllocationPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Subsidy Allocation Dashboard';
  pptx.author = 'National Digital Land Registry';
  pptx.subject = 'Housing Subsidy Tracking & Leakage Detection';

  createTitleSlide(pptx, 'Subsidy Allocation Dashboard', 'Budget Tracking, Eligibility Matrix & Leakage Detection');

  createKPISlide(pptx, 'Key Performance Indicators', [
    { name: 'Total Subsidy Budget', value: '€45.2M', description: 'Annual budget allocated for housing subsidies across all programs and regions.' },
    { name: 'Subsidy Utilization Rate', value: '78.5%', description: 'Percentage of allocated budget actually disbursed to beneficiaries. Target: >85%.' },
    { name: 'Leakage/Mismatch Rate', value: '3.2%', description: 'Subsidies identified as potentially misallocated or fraudulent. Target: <2%.' },
    { name: 'Beneficiaries Served', value: '12,450', description: 'Total households receiving subsidy assistance in current fiscal year.' },
  ]);

  createFormulaSlide(pptx, 'Subsidy Calculation Formulas (1/2)', [
    {
      name: 'Subsidy Eligibility Score (SES)',
      equation: 'SES = w₁(Income Score) + w₂(Asset Score) + w₃(Location Score) + w₄(Family Score)',
      variables: ['w₁-w₄ = Policy weights (sum=1)', 'Scores = Normalized 0-100', 'Threshold = 60 for eligibility'],
      interpretation: 'SES ≥ 60 = Eligible for base subsidy. SES ≥ 80 = Priority allocation. SES < 40 = Ineligible.',
    },
    {
      name: 'Subsidy Amount Calculation',
      equation: 'Subsidy = min(Max Subsidy, Property Price × Subsidy Rate × Eligibility Multiplier)',
      variables: ['Max Subsidy = Program cap (e.g., €15,000)', 'Rate = 10-25% based on program', 'Multiplier = 1.0-1.5'],
      interpretation: 'Ensures subsidy scales with need but never exceeds program limits or creates windfall.',
    },
  ]);

  createFormulaSlide(pptx, 'Subsidy Calculation Formulas (2/2)', [
    {
      name: 'Leakage Detection Index (LDI)',
      equation: 'LDI = Σ(Anomaly Flags × Severity Weight) / Total Disbursements',
      variables: ['Anomaly Flags = Income mismatch, repeat beneficiary, premium property', 'Weight = 1-5 severity'],
      interpretation: 'LDI > 0.05 (5%) triggers audit. Individual transactions with 3+ flags auto-frozen.',
    },
    {
      name: 'Subsidy Effectiveness Ratio (SER)',
      equation: 'SER = (Units Delivered × Avg Price Reduction) / Total Subsidy Spent',
      variables: ['Units = Completed affordable homes', 'Price Reduction = Market vs actual price', 'Spent = Disbursed amount'],
      interpretation: 'SER > 1.5 = Good ROI. SER < 1.0 = Subsidy not achieving affordability goals.',
    },
  ]);

  createBulletSlide(pptx, 'Eligibility Matrix Criteria', [
    'Income Bracket: Household income ≤ 80% of Area Median Income (AMI)',
    'Property Size: Maximum 60-90 sq.m depending on family size',
    'Location Tier: Priority for Tier 2/3 cities and affordable housing zones',
    'First-Time Buyer: No prior property ownership in household name',
    'Asset Test: Total assets (excluding primary home) ≤ €50,000',
    'Age Criteria: Primary applicant 21-55 years for standard programs',
  ]);

  createBulletSlide(pptx, 'Leakage Detection Mechanisms', [
    'Cross-Registry Check: Verify applicant owns no other property (blockchain scan)',
    'Income Verification: Tax return + employer confirmation + bank statement analysis',
    'Repeat Beneficiary Alert: Same PAN/ID receiving subsidy within 7-year window',
    'Premium Property Flag: Subsidy claimed for property above affordable threshold',
    'Shell Company Detection: Beneficial ownership tracing for corporate buyers',
    'Geographic Anomaly: Subsidy for zone not designated as affordable housing area',
  ]);

  await pptx.writeFile({ fileName: 'Subsidy_Allocation_Dashboard.pptx' });
};

export const generateBubbleProtectionPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Bubble Protection Dashboard';
  pptx.author = 'National Digital Land Registry';
  pptx.subject = 'Real Estate Market Risk & Early Warning System';

  createTitleSlide(pptx, 'Bubble Protection Dashboard', 'Early Warning Indicators, AI Forecasting & Regulator Triggers');

  createKPISlide(pptx, 'Key Performance Indicators', [
    { name: 'Bubble Risk Index', value: '62/100', description: 'Composite score measuring overall market risk. >70 = High risk, >85 = Critical intervention needed.' },
    { name: 'Price-to-Rent Ratio', value: '24.5', description: 'Annual rent equivalent to buy. Healthy: 15-20. >25 = Speculative premium.' },
    { name: 'Investor Transaction Share', value: '38%', description: 'Percentage of purchases by investors vs end-users. >40% = Speculation concern.' },
    { name: 'Vacancy Rate Trend', value: '+2.3%', description: 'Year-over-year change in vacant inventory. Rising vacancy with rising prices = bubble signal.' },
  ]);

  createFormulaSlide(pptx, 'Bubble Detection Formulas (1/2)', [
    {
      name: 'Price-Income Divergence Index (PIDI)',
      equation: 'PIDI = (YoY Price Growth - YoY Income Growth) / Historical Std Dev',
      variables: ['Price Growth = Median price change %', 'Income Growth = Median income change %', 'Std Dev = 10-year historical'],
      interpretation: 'PIDI > 2.0 = Prices outpacing incomes abnormally. PIDI > 3.0 = Bubble territory.',
    },
    {
      name: 'Speculative Activity Index (SAI)',
      equation: 'SAI = (Short-term Resales + Multi-property Buyers + Cash Purchases) / Total Transactions',
      variables: ['Short-term = Resale within 12 months', 'Multi-property = >2 purchases/year', 'Cash = Non-mortgage deals'],
      interpretation: 'SAI > 0.35 = High speculation. SAI > 0.50 = Regulatory intervention recommended.',
    },
  ]);

  createFormulaSlide(pptx, 'Bubble Detection Formulas (2/2)', [
    {
      name: 'Credit Risk Composite (CRC)',
      equation: 'CRC = 0.3(LTV Trend) + 0.3(DTI Trend) + 0.2(Subprime Share) + 0.2(Default Rate)',
      variables: ['LTV = Avg loan-to-value', 'DTI = Debt-to-income', 'Subprime = High-risk loans %', 'Default = 90+ day delinquency'],
      interpretation: 'CRC > 0.6 = Credit quality deteriorating. CRC > 0.8 = Systemic risk.',
    },
    {
      name: 'Market Stress Score (MSS)',
      equation: 'MSS = w₁(PIDI) + w₂(SAI) + w₃(CRC) + w₄(Vacancy Δ) + w₅(Construction/Demand)',
      variables: ['Weights policy-adjustable', 'All inputs normalized 0-1', 'Output scaled 0-100'],
      interpretation: 'MSS 0-40 = Healthy | 40-60 = Watch | 60-80 = Elevated | 80-100 = Crisis mode.',
    },
  ]);

  createBulletSlide(pptx, 'Early Warning Indicators', [
    'Price Growth vs Income Growth: Divergence >5% annually = Yellow flag',
    'Rapid Resales (<12 months): >15% of transactions = Speculation signal',
    'Multiple Property Concentration: >10% of buyers owning 3+ properties',
    'Debt-Backed Purchase Surge: Mortgage volume growing >2x price growth',
    'Construction Starts vs Absorption: Oversupply ratio >1.3 = Inventory risk',
    'Foreign Investment Spike: >25% of purchases by non-residents',
  ]);

  createBulletSlide(pptx, 'Regulator Action Triggers', [
    'Tighten LTV Norms: Reduce max loan-to-value from 80% to 70%',
    'Increase Stamp Duty: Add 2-5% surcharge in overheated zones',
    'Freeze Subsidies: Suspend affordable housing subsidies in bubble zones',
    'Holding Period Mandate: Minimum 3-year hold before resale (speculation tax)',
    'Investor Quota: Cap investor purchases to 30% of new project inventory',
    'Stress Test Requirement: Banks must qualify borrowers at +2% interest rate',
  ]);

  await pptx.writeFile({ fileName: 'Bubble_Protection_Dashboard.pptx' });
};

export const generateMinisterialOverviewPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Ministerial Command Center';
  pptx.author = 'National Digital Land Registry';
  pptx.subject = 'Executive Policy Dashboard Overview';

  createTitleSlide(pptx, 'Ministerial Command Center', 'Executive Overview: Policy → Data → Risk → Action');

  createKPISlide(pptx, 'The Four Pillars of Housing Policy', [
    { name: '1. Housing Affordability', value: 'HAI 72.5', description: 'Ensure housing prices remain within reach of median income households through monitoring and intervention.' },
    { name: '2. Legal Compliance', value: '87.3%', description: 'Maintain clean, verified, enforceable property titles through blockchain-based validation.' },
    { name: '3. Subsidy Effectiveness', value: '€35.5M', description: 'Maximize impact of housing subsidies through precise targeting and leakage prevention.' },
    { name: '4. Market Stability', value: 'Risk 62', description: 'Protect against speculative bubbles through early warning systems and proactive regulation.' },
  ]);

  createFormulaSlide(pptx, 'Master Policy Index (MPI)', [
    {
      name: 'Housing Policy Health Score',
      equation: 'MPI = 0.25(Affordability) + 0.25(Legal) + 0.25(Subsidy Efficiency) + 0.25(Stability)',
      variables: ['Each pillar normalized 0-100', 'Weights adjustable by policy priority', 'Updated daily'],
      interpretation: 'MPI > 75 = Healthy housing market. MPI 50-75 = Intervention needed. MPI < 50 = Crisis mode.',
    },
    {
      name: 'Policy Effectiveness Trend',
      equation: 'PET = (MPI_current - MPI_12months_ago) / MPI_12months_ago × 100',
      variables: ['Positive = Improving', 'Negative = Deteriorating', 'Measured quarterly'],
      interpretation: 'PET > 5% = Policies working. PET < -5% = Policy review required.',
    },
  ]);

  createBulletSlide(pptx, 'Decision Framework: Policy → Action', [
    'Monitor: Real-time KPI tracking across all four policy pillars',
    'Detect: AI-powered anomaly detection flags emerging issues',
    'Analyze: Drill-down dashboards provide root cause insights',
    'Simulate: Policy simulation tools model intervention outcomes',
    'Decide: Evidence-based recommendations with confidence scores',
    'Act: Automated triggers for pre-approved regulatory responses',
    'Review: Outcome tracking measures policy effectiveness over time',
  ]);

  createBulletSlide(pptx, 'Blockchain Data Integrity', [
    'All property data cryptographically secured on distributed ledger',
    'Immutable audit trail for every ownership transfer and document',
    'Smart contracts enforce regulatory compliance automatically',
    'Real-time verification eliminates manual data reconciliation',
    'Cross-agency data sharing with role-based access control',
    'Tamper detection alerts for any unauthorized modification attempts',
  ]);

  createBulletSlide(pptx, 'AI/ML Capabilities', [
    'Affordability Forecasting: 6-12 month price and income projections',
    'Fraud Detection: Pattern recognition for subsidy leakage and title fraud',
    'Bubble Prediction: Market stress indicators with probability scoring',
    'Eligibility Scoring: Automated beneficiary qualification assessment',
    'Risk Clustering: Geographic and demographic risk segmentation',
    'Natural Language Queries: "Ask the Housing Minister\'s AI" interface',
  ]);

  await pptx.writeFile({ fileName: 'Ministerial_Command_Center.pptx' });
};

export const generateExecutiveOverviewPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Executive Overview';
  pptx.author = 'National Digital Land Registry';
  pptx.subject = 'Strategic Vision & Project Brief';

  createTitleSlide(pptx, 'National Digital Land Registry', 'Executive Overview: Vision, Problem & Outcomes');

  createBulletSlide(pptx, 'Vision & Mission', [
    'Vision: Transform Serbia into a model for transparent, efficient land governance',
    'Mission: Deploy blockchain-based land registry eliminating fraud and inefficiency',
    'Goal: 100% digital property transactions within 5 years',
    'Outcome: Attract €2B+ in real estate investment through trust and transparency',
    'Impact: Reduce property disputes by 80%, registration time by 90%',
  ]);

  createBulletSlide(pptx, 'Current Challenges', [
    'Paper-based records vulnerable to fraud, loss, and manipulation',
    'Average registration time: 30+ days with multiple agency visits',
    'Property disputes: 15% of parcels have unclear ownership',
    'Subsidy leakage: Estimated 8-12% of housing subsidies misallocated',
    'Market opacity: No real-time visibility into price trends or bubbles',
    'Cross-border complexity: Foreign investment deterred by title uncertainty',
  ]);

  createBulletSlide(pptx, 'Solution Architecture', [
    'Blockchain Layer: Immutable ownership records with cryptographic verification',
    'Smart Contracts: Automated compliance checks, transfer validation, lien management',
    'AI/ML Engine: Fraud detection, affordability forecasting, bubble prediction',
    'API Gateway: Secure integration with banks, courts, tax authority, municipalities',
    'Dashboard Suite: Ministerial command center with drill-down analytics',
    'Mobile Access: Citizen portal for ownership verification and document access',
  ]);

  createKPISlide(pptx, 'Expected Outcomes', [
    { name: 'Registration Time', value: '30 days → 3 days', description: 'End-to-end property transfer processing time reduction through automation.' },
    { name: 'Dispute Reduction', value: '-80%', description: 'Property ownership disputes eliminated through clear, immutable title records.' },
    { name: 'Subsidy Accuracy', value: '98%+', description: 'Precise targeting of housing subsidies with blockchain-verified eligibility.' },
    { name: 'Foreign Investment', value: '+€500M', description: 'Increased real estate investment due to title security and transparency.' },
  ]);

  await pptx.writeFile({ fileName: 'Executive_Overview.pptx' });
};

export const generateDataArchitecturePPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Data Architecture';
  pptx.author = 'National Digital Land Registry';
  pptx.subject = 'Technical Data Collection & Processing Pipeline';

  createTitleSlide(pptx, 'Data Architecture', 'Data Collection, Processing Pipeline & Integration Points');

  createBulletSlide(pptx, 'Data Sources', [
    'Land Registry: Existing cadastral records (digitization required)',
    'Tax Authority: Property valuations, tax payments, owner identification',
    'Courts: Litigation records, judgments, encumbrances, injunctions',
    'Banks/NBFCs: Mortgage registrations, lien data, loan status',
    'Municipalities: Building permits, occupancy certificates, zoning maps',
    'Statistical Office: Income surveys, demographic data, economic indicators',
  ]);

  createBulletSlide(pptx, 'Blockchain Data Model', [
    'Parcel ID: Unique identifier linked to geo-coordinates (GIS integration)',
    'Ownership Block: Current owner, previous owners, transfer history',
    'Document Hashes: IPFS references to title deed, survey, approvals',
    'Encumbrance Layer: Mortgages, liens, easements, restrictions',
    'Smart Contract State: Current status, pending transfers, dispute flags',
    'Metadata: Timestamps, transaction fees, validator signatures',
  ]);

  createBulletSlide(pptx, 'Processing Pipeline', [
    'Ingestion: Batch import of legacy data + real-time transaction stream',
    'Validation: Schema checks, duplicate detection, cross-reference verification',
    'Enrichment: GIS coordinates, market valuation, risk scoring',
    'Transformation: Normalization to blockchain data model',
    'Consensus: Multi-node validation before block confirmation',
    'Indexing: Search-optimized copies for dashboard queries',
  ]);

  createBulletSlide(pptx, 'Integration Architecture', [
    'API Gateway: RESTful + GraphQL endpoints with OAuth 2.0 authentication',
    'Message Queue: Kafka for async event processing and audit logging',
    'Data Lake: Historical analytics on AWS S3 / Azure Blob',
    'Cache Layer: Redis for real-time dashboard performance',
    'Monitoring: Prometheus + Grafana for system health and SLAs',
    'Backup: Multi-region disaster recovery with 15-minute RPO',
  ]);

  await pptx.writeFile({ fileName: 'Data_Architecture.pptx' });
};

export const generateSmartContractPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Smart Contract Design';
  pptx.author = 'National Digital Land Registry';
  pptx.subject = 'Blockchain Transaction Workflows';

  createTitleSlide(pptx, 'Smart Contract Design', 'Blockchain Transaction Workflows & Validation Logic');

  createBulletSlide(pptx, 'Core Smart Contracts', [
    'PropertyRegistry: Ownership state, transfer authorization, document links',
    'TransferManager: Multi-party approval, escrow, settlement',
    'EncumbranceRegistry: Mortgage/lien creation, priority, release',
    'DisputeHandler: Freeze, arbitration triggers, resolution recording',
    'SubsidyValidator: Eligibility verification, disbursement authorization',
    'AuditLogger: Immutable event trail for compliance and forensics',
  ]);

  createBulletSlide(pptx, 'Transfer Workflow', [
    '1. Initiation: Seller signs intent, buyer deposits to escrow',
    '2. Validation: Smart contract checks clear title, no liens, owner match',
    '3. Documentation: Required documents hashed and linked (notary, survey)',
    '4. Approvals: All parties sign (seller, buyer, notary, bank if mortgage)',
    '5. Settlement: Funds released, ownership transferred atomically',
    '6. Recording: New ownership block confirmed, event emitted',
  ]);

  createBulletSlide(pptx, 'Validation Rules', [
    'Owner Match: Seller must be current registered owner',
    'Clean Title: No active disputes, injunctions, or freezes',
    'Lien Clearance: All mortgages/liens released or assumed by buyer',
    'Document Complete: Title deed, survey, tax clearance, ID verification',
    'Value Check: Transaction price within acceptable range (anti-fraud)',
    'Regulatory: Zoning compliance, foreign ownership restrictions',
  ]);

  createBulletSlide(pptx, 'Error Handling', [
    'Insufficient Signatures: Transaction held pending, parties notified',
    'Validation Failure: Transaction rejected with specific error codes',
    'Timeout: Escrow auto-released after 30-day hold period',
    'Dispute Filed: Transaction frozen, escalated to DisputeHandler',
    'Double-Spend Attempt: Rejected, flagged for fraud investigation',
    'System Error: Transaction logged for manual review, no state change',
  ]);

  await pptx.writeFile({ fileName: 'Smart_Contract_Design.pptx' });
};
