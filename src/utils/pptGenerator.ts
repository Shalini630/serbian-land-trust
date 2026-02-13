import pptxgen from 'pptxgenjs';

// ==================== SHARED STYLES & HELPERS ====================

const COLORS = {
  primary: '1a2332',
  accent: 'd4a853',
  white: 'FFFFFF',
  lightGray: 'F5F5F5',
  medGray: 'E8E8E8',
  success: '22c55e',
  warning: 'f59e0b',
  danger: 'ef4444',
  blue: '3b82f6',
  purple: '8b5cf6',
};

const createTitleSlide = (pptx: pptxgen, title: string, subtitle: string, tagline?: string) => {
  const slide = pptx.addSlide();
  slide.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: COLORS.primary } });
  slide.addShape('rect', { x: 0, y: 4.8, w: '100%', h: 0.04, fill: { color: COLORS.accent } });
  slide.addText(title, {
    x: 0.5, y: 1.8, w: 9, h: 1.5,
    fontSize: 40, bold: true, color: COLORS.white, fontFace: 'Arial',
  });
  slide.addText(subtitle, {
    x: 0.5, y: 3.3, w: 9, h: 0.5,
    fontSize: 20, color: COLORS.accent, fontFace: 'Arial',
  });
  slide.addText(tagline || 'National Digital Land Registry | Republic of Serbia', {
    x: 0.5, y: 5, w: 9, h: 0.3,
    fontSize: 12, color: 'AAAAAA', fontFace: 'Arial', italic: true,
  });
};

const addFooter = (slide: pptxgen.Slide, text: string) => {
  slide.addText(text, {
    x: 0.5, y: 5.2, w: 9, h: 0.25,
    fontSize: 8, color: 'AAAAAA', fontFace: 'Arial', italic: true,
  });
};

const createSectionDivider = (pptx: pptxgen, title: string, sectionNumber?: string) => {
  const slide = pptx.addSlide();
  slide.addShape('rect', { x: 0, y: 0, w: '100%', h: '100%', fill: { color: COLORS.primary } });
  if (sectionNumber) {
    slide.addText(sectionNumber, {
      x: 0.5, y: 1.5, w: 2, h: 1,
      fontSize: 60, bold: true, color: COLORS.accent, fontFace: 'Arial',
    });
  }
  slide.addText(title, {
    x: 0.5, y: 2.5, w: 9, h: 1,
    fontSize: 32, bold: true, color: COLORS.white, fontFace: 'Arial',
  });
};

const createKPISlide = (
  pptx: pptxgen,
  title: string,
  kpis: { name: string; value: string; description: string }[]
) => {
  const slide = pptx.addSlide();
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.primary, fontFace: 'Arial',
  });

  kpis.forEach((kpi, index) => {
    const yPos = 1.1 + index * 1.15;
    slide.addShape('rect', {
      x: 0.5, y: yPos, w: 9, h: 1.0,
      fill: { color: COLORS.lightGray }, line: { color: COLORS.accent, width: 1 },
    });
    slide.addText(kpi.name, {
      x: 0.7, y: yPos + 0.08, w: 5, h: 0.35,
      fontSize: 14, bold: true, color: COLORS.primary, fontFace: 'Arial',
    });
    slide.addText(kpi.value, {
      x: 7, y: yPos + 0.08, w: 2.3, h: 0.35,
      fontSize: 16, bold: true, color: COLORS.accent, fontFace: 'Arial', align: 'right',
    });
    slide.addText(kpi.description, {
      x: 0.7, y: yPos + 0.48, w: 8.5, h: 0.45,
      fontSize: 10, color: '666666', fontFace: 'Arial',
    });
  });
  addFooter(slide, 'National Digital Land Registry – Confidential');
};

const createFormulaSlide = (
  pptx: pptxgen,
  title: string,
  formulas: { name: string; equation: string; variables: string[]; interpretation: string; sampleCalc?: string }[]
) => {
  const slide = pptx.addSlide();
  slide.addText(title, {
    x: 0.5, y: 0.2, w: 9, h: 0.5,
    fontSize: 24, bold: true, color: COLORS.primary, fontFace: 'Arial',
  });

  formulas.forEach((formula, index) => {
    const yPos = 0.85 + index * (formula.sampleCalc ? 2.2 : 1.7);
    slide.addText(formula.name, {
      x: 0.5, y: yPos, w: 9, h: 0.3,
      fontSize: 14, bold: true, color: COLORS.primary, fontFace: 'Arial',
    });
    slide.addShape('rect', {
      x: 0.5, y: yPos + 0.35, w: 9, h: 0.45,
      fill: { color: COLORS.primary },
    });
    slide.addText(formula.equation, {
      x: 0.7, y: yPos + 0.38, w: 8.6, h: 0.4,
      fontSize: 13, bold: true, color: COLORS.accent, fontFace: 'Courier New',
    });

    const variablesText = formula.variables.join(' | ');
    slide.addText(`Variables: ${variablesText}`, {
      x: 0.5, y: yPos + 0.85, w: 9, h: 0.22,
      fontSize: 9, color: '888888', fontFace: 'Arial', italic: true,
    });
    slide.addText(`Interpretation: ${formula.interpretation}`, {
      x: 0.5, y: yPos + 1.1, w: 9, h: 0.3,
      fontSize: 10, color: '444444', fontFace: 'Arial',
    });
    if (formula.sampleCalc) {
      slide.addShape('rect', {
        x: 0.7, y: yPos + 1.45, w: 8.6, h: 0.4,
        fill: { color: 'F0F8FF' }, line: { color: COLORS.blue, width: 0.5 },
      });
      slide.addText(`Example: ${formula.sampleCalc}`, {
        x: 0.9, y: yPos + 1.48, w: 8.2, h: 0.35,
        fontSize: 9, color: COLORS.blue, fontFace: 'Courier New',
      });
    }
  });
  addFooter(slide, 'National Digital Land Registry – Confidential');
};

const createBulletSlide = (pptx: pptxgen, title: string, bullets: string[], subtitle?: string) => {
  const slide = pptx.addSlide();
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 24, bold: true, color: COLORS.primary, fontFace: 'Arial',
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: 0.8, w: 9, h: 0.3,
      fontSize: 12, color: '888888', fontFace: 'Arial', italic: true,
    });
  }
  const startY = subtitle ? 1.2 : 1.0;
  bullets.forEach((bullet, index) => {
    slide.addText(`• ${bullet}`, {
      x: 0.7, y: startY + index * 0.48, w: 8.5, h: 0.42,
      fontSize: 13, color: '333333', fontFace: 'Arial',
    });
  });
  addFooter(slide, 'National Digital Land Registry – Confidential');
};

const createTableSlide = (
  pptx: pptxgen,
  title: string,
  headers: string[],
  rows: string[][],
  subtitle?: string
) => {
  const slide = pptx.addSlide();
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.5,
    fontSize: 24, bold: true, color: COLORS.primary, fontFace: 'Arial',
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: 0.8, w: 9, h: 0.25,
      fontSize: 11, color: '888888', fontFace: 'Arial', italic: true,
    });
  }

  const tableRows: pptxgen.TableRow[] = [
    headers.map(h => ({
      text: h,
      options: { bold: true, fontSize: 10, color: COLORS.white, fill: { color: COLORS.primary }, fontFace: 'Arial' as const },
    })),
    ...rows.map(row =>
      row.map(cell => ({
        text: cell,
        options: { fontSize: 9, color: '333333', fill: { color: COLORS.lightGray }, fontFace: 'Arial' as const },
      }))
    ),
  ];

  slide.addTable(tableRows, {
    x: 0.5, y: subtitle ? 1.15 : 1.0, w: 9,
    border: { type: 'solid' as const, pt: 0.5, color: 'CCCCCC' },
    colW: Array(headers.length).fill(9 / headers.length),
  });
  addFooter(slide, 'National Digital Land Registry – Confidential');
};

// ==================== 1. MINISTERIAL OVERVIEW PPT ====================

export const generateMinisterialOverviewPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Ministerial Command Center – Policy Overview';
  pptx.author = 'National Digital Land Registry';
  pptx.subject = 'Executive Policy Dashboard Overview';

  // Slide 1: Title
  createTitleSlide(pptx, 'Ministerial Command Center', 'Executive Policy Dashboard – Overview of All Four Pillars', 'Real-time policy monitoring for Serbia\'s real estate digitization initiative');

  // Slide 2: What is this dashboard?
  createBulletSlide(pptx, 'What Is the Ministerial Command Center?', [
    'A single-screen executive summary of Serbia\'s housing policy health',
    'Monitors 4 core policy pillars in real time: Affordability, Legal, Subsidy, Stability',
    'Data flows directly from blockchain-verified land registry transactions',
    'Designed for ministerial-level decision-making with drill-down capability',
    'Each pillar is color-coded by status: On Track (green), Monitor (amber), Action Required (red)',
    'Updated every 15 minutes with blockchain verification',
  ]);

  // Slide 3: The Four Pillars
  createKPISlide(pptx, 'The Four Policy Pillars – At a Glance', [
    { name: '1. Affordability Score', value: '62/100', description: 'Composite index measuring housing affordability. Score < 50 = crisis. Score 50-70 = monitor. Score > 70 = on track. Currently stressed in Belgrade & Novi Sad.' },
    { name: '2. Legal Cleanliness', value: '78.4%', description: 'Percentage of properties with fully verified legal documentation (title, zoning, env. clearance, occupancy). Target: 90%+.' },
    { name: '3. Subsidy Effectiveness', value: '71.6%', description: 'Delivery rate of subsidized housing units. Measures ratio of units delivered to units subsidized. 3.2% leakage detected.' },
    { name: '4. Bubble Risk Index', value: '68/100', description: 'Composite risk score measuring speculative activity, price-income divergence, and credit quality. Score > 60 = elevated risk.' },
  ]);

  // Slide 4: How each score is calculated
  createFormulaSlide(pptx, 'Master Policy Index (MPI)', [
    {
      name: 'Housing Policy Health Score',
      equation: 'MPI = 0.25 × Affordability + 0.25 × Legal + 0.25 × Subsidy + 0.25 × Stability',
      variables: ['Each pillar normalized 0-100', 'Weights adjustable by policy priority', 'Updated daily from live data'],
      interpretation: 'MPI > 75 = Healthy housing market. MPI 50-75 = Intervention needed. MPI < 50 = Crisis mode.',
      sampleCalc: 'MPI = 0.25(62) + 0.25(78.4) + 0.25(71.6) + 0.25(32) = 61.0 → "Monitor"',
    },
  ]);

  // Slide 5: Status logic
  createBulletSlide(pptx, 'Status Assignment Logic', [
    'Affordability: Score ≥ 70 → On Track | 50-69 → Monitor | < 50 → Action Required',
    'Legal Cleanliness: ≥ 85% → On Track | 70-84% → Monitor | < 70% → Action Required',
    'Subsidy Effectiveness: ≥ 80% → On Track | 65-79% → Monitor | < 65% → Action Required',
    'Bubble Risk: ≤ 40 → On Track | 41-60 → Monitor | > 60 → Action Required',
    'Each card shows trend vs. last quarter with directional arrows',
    'Clicking any card navigates to the dedicated deep-dive dashboard',
  ], 'How the traffic-light badges (On Track / Monitor / Action Required) are assigned');

  // Slide 6: Data sources
  createBulletSlide(pptx, 'Data Sources & Refresh Rates', [
    'Property Prices: Blockchain transaction log – updated in real time',
    'Income Data: Statistical Office survey + tax records – quarterly',
    'Legal Status: Registry verification engine – daily batch + real-time for new registrations',
    'Subsidy Disbursements: Treasury integration – weekly settlement data',
    'Bubble Indicators: Composite of bank data (LTV, DTI), transaction patterns, vacancy rates',
    'All data blockchain-verified with tamper-detection alerts',
  ]);

  // Slide 7: Sample sizes
  createTableSlide(pptx, 'Data Coverage & Sample Sizes', 
    ['Metric', 'Data Source', 'Sample Size', 'Update Frequency'],
    [
      ['Affordability Score', 'Registry + StatOffice', '1,397,000 households (Belgrade metro)', 'Quarterly'],
      ['Legal Cleanliness', 'Blockchain Registry', '2,450,000 registered parcels', 'Daily'],
      ['Subsidy Effectiveness', 'Treasury + Registry', '12,450 beneficiaries FY2024', 'Weekly'],
      ['Bubble Risk Index', 'Banks + Registry + StatOffice', '156,000 transactions/year', 'Monthly'],
    ],
    'Coverage across all Serbian municipalities'
  );

  // Slide 8: Decision framework
  createBulletSlide(pptx, 'Decision Framework: Monitor → Detect → Act', [
    'Monitor: Real-time KPI tracking across all four policy pillars',
    'Detect: AI-powered anomaly detection flags emerging issues within 24 hours',
    'Analyze: Drill-down dashboards provide root cause insights with city-level granularity',
    'Simulate: Policy simulation tools model intervention outcomes before implementation',
    'Decide: Evidence-based recommendations with confidence scores and impact estimates',
    'Act: Automated triggers for pre-approved regulatory responses',
    'Review: Outcome tracking measures policy effectiveness over 6/12/24 month horizons',
  ]);

  await pptx.writeFile({ fileName: 'Ministerial_Command_Center_Overview.pptx' });
};

// ==================== 2. AFFORDABLE HOUSING PPT ====================

export const generateAffordableHousingPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Affordable Housing – Deep Dive';
  pptx.author = 'National Digital Land Registry';

  createTitleSlide(pptx, 'Affordable Housing Dashboard', 'Housing Affordability Index, Policy Simulation & City Analysis', 'Pillar 1 of 4 – Ministerial Policy Dashboard');

  // Slide 2: Dashboard overview
  createBulletSlide(pptx, 'What Does This Dashboard Track?', [
    'Housing affordability across all Serbian cities and municipalities',
    'Price-to-income ratios compared against EU and regional benchmarks',
    'Income decile analysis showing which population segments are priced out',
    'Policy simulation tools to model effects of interventions (rate changes, subsidies)',
    'City-level heatmap with affordability status: Affordable / Stressed / Critical',
    'Monthly trend tracking of new affordable unit supply',
  ]);

  // Slide 3: KPIs
  createKPISlide(pptx, 'Key Performance Indicators (KPIs)', [
    { name: 'National Housing Affordability Index (HAI)', value: '8.4', description: 'National median price-to-income ratio. < 5 = affordable, 5-7 = moderate, 7-10 = stretched, > 10 = severely unaffordable. Currently "stretched" nationally.' },
    { name: 'Median Price-to-Income Ratio', value: '7.8x', description: 'Median house price (€78,000 nationally) divided by median annual household income (€10,000). Belgrade: 12.8x, Čačak: 5.5x.' },
    { name: 'Eligible Households', value: '34%', description: 'Percentage of households qualifying for affordable housing programs. Ranges from 18% (Belgrade) to 55% (Leskovac).' },
    { name: 'New Affordable Units (YoY)', value: '1,074', description: 'Net new affordable housing units added nationally. +8.2% growth. Belgrade contributes 342 units, Novi Sad 187.' },
  ]);

  // Slide 4: HAI Formula
  createFormulaSlide(pptx, 'Core Formula: Housing Affordability Index', [
    {
      name: 'Housing Affordability Index (HAI)',
      equation: 'HAI = (Median Income × 0.28 × 12) / Monthly Mortgage Payment × 100',
      variables: [
        'Median Income = Annual household income (€10,000 nationally)',
        '0.28 = Max housing cost ratio (28% of gross income)',
        'Mortgage = P&I at current rate (3.5% avg, 25yr term)',
      ],
      interpretation: 'HAI > 100 means median family can afford median home. HAI < 100 = affordability stress. Serbia national HAI ≈ 72.5.',
      sampleCalc: 'Belgrade: (€14,500 × 0.28 × 12) / €928/mo × 100 = 52.5 → Severely stressed',
    },
  ]);

  // Slide 5: PIR & EMI formulas
  createFormulaSlide(pptx, 'Supporting Formulas', [
    {
      name: 'Price-to-Income Ratio (PIR)',
      equation: 'PIR = Median House Price / Median Annual Household Income',
      variables: ['Median House Price = 50th percentile sale price from registry', 'Median Income = 50th percentile from tax records'],
      interpretation: 'PIR < 3 = Very affordable | 3-5 = Moderate | 5-7 = Stretched | > 7 = Severely unaffordable.',
      sampleCalc: 'Belgrade: €185,000 / €14,500 = 12.8x → "Severely unaffordable"',
    },
    {
      name: 'EMI-to-Income Ratio',
      equation: 'EMI Ratio = (Monthly EMI / Monthly Gross Income) × 100',
      variables: ['Monthly EMI = Equated Monthly Installment (principal + interest)', 'Gross Income = Pre-tax monthly income'],
      interpretation: 'Banks require EMI Ratio < 40%. Policy threshold: 30-35%. Above 40% = household financial stress.',
      sampleCalc: 'EMI €928 / Monthly Income €1,208 = 76.8% → Far above threshold',
    },
  ]);

  // Slide 6: Affordability Gap
  createFormulaSlide(pptx, 'Affordability Gap Index', [
    {
      name: 'Affordability Gap Index (AGI)',
      equation: 'AGI = (Affordable Price Ceiling - Actual Median Price) / Actual Median Price × 100',
      variables: [
        'Affordable Ceiling = Max price at 30% income allocation over 25yr mortgage',
        'Actual Price = Current median transaction price from blockchain',
      ],
      interpretation: 'Negative AGI = gap between what people can afford vs actual prices. Triggers policy intervention when AGI < -30%.',
      sampleCalc: 'Belgrade: (€52,000 - €185,000) / €185,000 × 100 = -71.9% → Severe gap',
    },
  ]);

  // Slide 7: City breakdown table
  createTableSlide(pptx, 'City-Level Affordability Analysis',
    ['City', 'Median Price', 'Median Income', 'PIR', 'Eligible %', 'Status'],
    [
      ['Belgrade', '€185,000', '€14,500', '12.8x', '18%', 'Critical'],
      ['Novi Sad', '€145,000', '€14,200', '10.2x', '24%', 'Critical'],
      ['Niš', '€78,000', '€10,500', '7.4x', '38%', 'Stressed'],
      ['Kragujevac', '€68,000', '€10,000', '6.8x', '42%', 'Affordable'],
      ['Subotica', '€72,000', '€10,100', '7.1x', '40%', 'Stressed'],
      ['Zrenjanin', '€55,000', '€9,300', '5.9x', '48%', 'Affordable'],
      ['Pančevo', '€95,000', '€11,600', '8.2x', '35%', 'Stressed'],
      ['Čačak', '€48,000', '€8,700', '5.5x', '52%', 'Affordable'],
      ['Leskovac', '€42,000', '€8,100', '5.2x', '55%', 'Affordable'],
      ['Kraljevo', '€52,000', '€9,000', '5.8x', '50%', 'Affordable'],
    ],
    'Sample: 10 cities covering 78% of population | Source: Registry + Statistical Office'
  );

  // Slide 8: Income decile analysis
  createTableSlide(pptx, 'Income Decile vs Housing Affordability',
    ['Decile', 'Annual Income', 'Avg Property Price', 'PIR', 'Affordable?'],
    [
      ['D1 (Lowest)', '€3,200', '€42,000', '13.1x', 'No'],
      ['D2', '€5,100', '€48,000', '9.4x', 'No'],
      ['D3', '€6,800', '€55,000', '8.1x', 'No'],
      ['D4', '€8,200', '€68,000', '8.3x', 'No'],
      ['D5 (Median)', '€10,500', '€85,000', '8.1x', 'No'],
      ['D6', '€13,200', '€105,000', '8.0x', 'No'],
      ['D7', '€16,800', '€135,000', '8.0x', 'No'],
      ['D8', '€22,500', '€165,000', '7.3x', 'Borderline'],
      ['D9', '€32,000', '€210,000', '6.6x', 'Borderline'],
      ['D10 (Highest)', '€58,000', '€380,000', '6.6x', 'Yes'],
    ],
    'Sample: 1,397,000 households | Deciles from tax records cross-referenced with registry'
  );

  // Slide 9: Policy simulation
  createBulletSlide(pptx, 'Policy Simulation Parameters', [
    'Max Price-to-Income Ratio: Regulatory ceiling (e.g., 5x) – triggers developer incentives when exceeded',
    'Max EMI % of Income: Central bank guideline affecting loan eligibility (adjustable 25-40%)',
    'Subsidy Rate: Government contribution to first-time buyer down payments (5-25% of price)',
    'Interest Rate Subsidy: Basis points reduction on home loans for eligible buyers (50-200 bps)',
    'Land Cost Cap: Maximum land component as % of total unit cost for affordable projects (20-40%)',
    'FSI Bonus: Additional floor space index for developers building ≥30% affordable units',
  ], 'Interactive sliders allow real-time impact modeling');

  // Slide 10: Data sources
  createBulletSlide(pptx, 'Data Sources & Methodology', [
    'Property prices: Blockchain-verified land registry transactions (real-time, N=156,000/year)',
    'Household income: Statistical Office annual survey (N=45,000) + tax records (N=2.1M)',
    'Mortgage rates: National Bank of Serbia reference rate + commercial bank spread data (12 banks)',
    'New units: Building permits (N=8,200/year) + occupancy certificates (N=6,400/year)',
    'Eligibility: Cross-referenced income declarations + national asset registry',
    'Update frequency: Prices – daily | Income – quarterly | Units – monthly | Affordability index – weekly',
  ]);

  await pptx.writeFile({ fileName: 'Affordable_Housing_Deep_Dive.pptx' });
};

// ==================== 3. LEGAL COMPLIANCE PPT ====================

export const generateLegalCompliancePPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Legal Compliance – Deep Dive';
  pptx.author = 'National Digital Land Registry';

  createTitleSlide(pptx, 'Legal Compliance Dashboard', 'Property Verification, Blockchain Audit Trail & Risk Analysis', 'Pillar 2 of 4 – Ministerial Policy Dashboard');

  // Slide 2: What this tracks
  createBulletSlide(pptx, 'What Does This Dashboard Track?', [
    'Legal verification status of every registered property across Serbia',
    'Blockchain audit trail showing complete ownership history with cryptographic proof',
    'Risk flag identification: title conflicts, duplicate registrations, zoning violations',
    'Property lifecycle tracking: registration → verification → monitoring → dispute resolution',
    'Dispute resolution rate and litigation backlog metrics',
    'Integration with court systems, banks, and municipal zoning databases',
  ]);

  // Slide 3: KPIs
  createKPISlide(pptx, 'Key Performance Indicators (KPIs)', [
    { name: 'Properties Fully Verified', value: '78.4%', description: '1,921,000 of 2,450,000 parcels have complete documentation: title deed + zoning approval + environmental clearance + occupancy certificate. Target: 90% by 2025.' },
    { name: 'Pending Legal Checks', value: '14.2%', description: '348,000 properties awaiting verification of 1+ legal documents. Avg queue time: 12 days. Target: < 5% within 30 days.' },
    { name: 'Disputed Properties', value: '5.8%', description: '142,100 properties with active disputes: 1,217 ownership conflicts, 156 under court litigation. Avg resolution: 8.2 months.' },
    { name: 'Average Registration Time', value: '4.2 days', description: 'Mean time from application to complete registration. Down 18.5% from 5.1 days. Pre-digitization benchmark: 30+ days.' },
  ]);

  // Slide 4: VCS formula
  createFormulaSlide(pptx, 'Verification Completeness Score (VCS)', [
    {
      name: 'Verification Completeness Score',
      equation: 'VCS = (Σ Verified Documents / Total Required Documents) × 100',
      variables: [
        'Required Docs = Title deed, Zoning approval, Environmental clearance, Occupancy cert, Tax clearance (5 docs)',
        'Verified = Blockchain-confirmed with valid hash',
      ],
      interpretation: 'VCS = 100% = fully compliant. VCS < 80% triggers manual review queue. VCS < 60% = registration hold placed.',
      sampleCalc: 'Parcel BG-2024-45893: 3 of 5 docs verified → VCS = 60% → Placed in review queue',
    },
  ]);

  // Slide 5: DRR and TCIS formulas
  createFormulaSlide(pptx, 'Dispute & Title Chain Metrics', [
    {
      name: 'Dispute Resolution Rate (DRR)',
      equation: 'DRR = (Disputes Resolved in Period / Total Active Disputes at Start) × 100',
      variables: ['Resolved = Court order or settlement recorded on blockchain', 'Period = Monthly or Quarterly'],
      interpretation: 'DRR > 25% quarterly = healthy resolution. DRR < 10% = systemic backlog requiring judicial intervention.',
      sampleCalc: 'Q4 2024: 312 resolved / 1,217 active = 25.6% → On track',
    },
    {
      name: 'Title Chain Integrity Score (TCIS)',
      equation: 'TCIS = 1 - (Title Breaks + Unverified Transfers) / Total Chain Length',
      variables: ['Title Breaks = Missing links in ownership history', 'Chain Length = Total ownership transfers on record'],
      interpretation: 'TCIS = 1.0 = Perfect chain. TCIS < 0.95 = Requires title insurance or legal review before transfer.',
      sampleCalc: 'Parcel KG-34567: 1 break + 0 unverified / 8 transfers → TCIS = 0.875 → Flagged',
    },
  ]);

  // Slide 6: Risk flags
  createTableSlide(pptx, 'Risk Flag Distribution',
    ['Risk Type', 'Count', 'Severity', 'Detection Method'],
    [
      ['Title Conflicts', '234', 'High', 'Registry cross-reference with court records'],
      ['Duplicate Registrations', '87', 'Critical', 'Geo-spatial analysis (satellite + GIS)'],
      ['Zoning Violations', '156', 'Medium', 'Municipal zoning map overlay comparison'],
      ['Unregistered Extensions', '412', 'Low', 'Satellite imagery vs registered footprint'],
      ['Missing Clearances', '328', 'Medium', 'Document completeness check (5-point)'],
      ['Post-sale Modifications', '145', 'Medium', 'Hash comparison pre/post transfer'],
    ],
    'Total flagged properties: 1,362 | Sample: 2,450,000 registered parcels'
  );

  // Slide 7: Blockchain audit trail
  createBulletSlide(pptx, 'Blockchain Audit Trail Components', [
    'Transaction Hash: Unique SHA-256 identifier for each ownership event (immutable)',
    'Timestamp: UTC timestamp of when transaction was confirmed by validator nodes',
    'Previous Hash: Cryptographic link to prior transaction ensuring chain integrity',
    'Digital Signatures: Buyer, seller, and notary public key verification (3-of-3 multisig)',
    'Document Hashes: IPFS links to legal documents with SHA-256 integrity verification',
    'Smart Contract State: Current ownership status, liens, encumbrances, dispute flags',
    'Validator Attestation: 5-of-7 node consensus required for block confirmation',
  ]);

  // Slide 8: Property verification table
  createTableSlide(pptx, 'Sample Property Verification Records',
    ['Parcel ID', 'City', 'Status', 'VCS', 'Risk Flags', 'Mortgage'],
    [
      ['BG-2024-45892', 'Belgrade', 'Verified', '100%', 'None', 'Clear'],
      ['BG-2024-45893', 'Belgrade', 'Pending', '60%', 'Env. clearance missing', 'Active'],
      ['NS-2024-12456', 'Novi Sad', 'Disputed', '80%', 'Title conflict, No occupancy', 'Clear'],
      ['NI-2024-78234', 'Niš', 'Verified', '100%', 'None', 'Active'],
      ['KG-2024-34567', 'Kragujevac', 'Litigation', '40%', 'Court stay, Zoning, Defaulted', 'Defaulted'],
      ['SU-2024-56789', 'Subotica', 'Verified', '100%', 'None', 'Clear'],
    ],
    'Sample of 8 records from 2,450,000 total registered parcels'
  );

  // Slide 9: Data sources
  createBulletSlide(pptx, 'Data Sources & Verification Pipeline', [
    'Land Registry: Blockchain-based ownership records – real-time (2,450,000 parcels)',
    'Court Records: Integration with judicial case management system (12 district courts)',
    'Municipal Zoning: GIS-linked zoning maps with change tracking (174 municipalities)',
    'Tax Authority: Property tax payment status and clearances (API integration)',
    'Banks: Mortgage and lien registration from 23 commercial banks (encrypted API)',
    'Satellite Imagery: Quarterly building footprint verification (0.5m resolution)',
  ]);

  await pptx.writeFile({ fileName: 'Legal_Compliance_Deep_Dive.pptx' });
};

// ==================== 4. SUBSIDY ALLOCATION PPT ====================

export const generateSubsidyAllocationPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Subsidy Allocation – Deep Dive';
  pptx.author = 'National Digital Land Registry';

  createTitleSlide(pptx, 'Subsidy Allocation Dashboard', 'Budget Tracking, Eligibility Scoring & Leakage Detection', 'Pillar 3 of 4 – Ministerial Policy Dashboard');

  // Slide 2: What this tracks
  createBulletSlide(pptx, 'What Does This Dashboard Track?', [
    'End-to-end tracking of housing subsidy budget: allocation → disbursement → outcome',
    'Eligibility scoring for applicants using multi-factor weighted model',
    'Leakage and fraud detection through cross-registry verification',
    'Geographic and income-bracket distribution analysis',
    'Outcome tracking: units delivered, price reduction achieved, beneficiary satisfaction',
    'Red flag system for anomalous disbursements',
  ]);

  // Slide 3: KPIs
  createKPISlide(pptx, 'Key Performance Indicators (KPIs)', [
    { name: 'Total Subsidy Budget (FY2024)', value: '€125M', description: 'Annual budget allocated for housing subsidies across all programs. €98.5M allocated to specific programs, €26.5M reserve.' },
    { name: 'Utilization Rate', value: '77.4%', description: '€76.2M of €98.5M allocated has been disbursed to beneficiaries. Target: > 85%. Gap driven by processing delays in Tier 2 cities.' },
    { name: 'Leakage / Mismatch Rate', value: '3.2%', description: '€3.15M identified as potentially misallocated. 236 cases flagged: 67 income mismatch, 45 premium property, 23 repeat beneficiary, others.' },
    { name: 'Beneficiaries Served', value: '12,450', description: 'Total households receiving subsidy in FY2024. Avg subsidy per unit: €6,120. 78% first-time buyers, 22% low-income upgrade.' },
  ]);

  // Slide 4: Eligibility Score formula
  createFormulaSlide(pptx, 'Subsidy Eligibility Score (SES)', [
    {
      name: 'Subsidy Eligibility Score',
      equation: 'SES = w₁(Income) + w₂(Asset) + w₃(Location) + w₄(Family)',
      variables: [
        'w₁ = 0.35 (Income score: 0-100 based on % of AMI)',
        'w₂ = 0.25 (Asset score: inverse of total assets)',
        'w₃ = 0.20 (Location: Tier 2/3 cities get higher scores)',
        'w₄ = 0.20 (Family: household size, dependents, disability)',
      ],
      interpretation: 'SES ≥ 60 = Eligible for base subsidy. SES ≥ 80 = Priority allocation. SES < 40 = Ineligible.',
      sampleCalc: 'Applicant: Income=82 × 0.35 + Asset=70 × 0.25 + Location=90 × 0.20 + Family=75 × 0.20 = 79.2 → Eligible',
    },
  ]);

  // Slide 5: Subsidy amount and leakage formulas
  createFormulaSlide(pptx, 'Subsidy Calculation & Leakage Detection', [
    {
      name: 'Subsidy Amount Calculation',
      equation: 'Subsidy = min(Max Cap, Property Price × Rate × Eligibility Multiplier)',
      variables: [
        'Max Cap = €15,000 (standard) or €22,000 (priority)',
        'Rate = 10-25% based on program tier',
        'Multiplier = 1.0 (standard) to 1.5 (priority, large family)',
      ],
      interpretation: 'Ensures subsidy scales with need but never exceeds program limits or creates windfall gains.',
      sampleCalc: 'min(€15,000, €68,000 × 0.15 × 1.2) = min(€15,000, €12,240) = €12,240',
    },
    {
      name: 'Leakage Detection Index (LDI)',
      equation: 'LDI = Σ(Anomaly Flags × Severity Weight) / Total Disbursements',
      variables: [
        'Flags: Income mismatch (w=3), Repeat beneficiary (w=5), Premium property (w=4), False docs (w=5)',
        'Total Disbursements = count of all subsidies issued',
      ],
      interpretation: 'LDI > 0.05 (5%) triggers program audit. Individual transactions with 3+ flags auto-frozen.',
      sampleCalc: '(67×3 + 23×5 + 45×4 + 12×5) / 12,450 = 0.056 → Audit triggered',
    },
  ]);

  // Slide 6: SER formula
  createFormulaSlide(pptx, 'Subsidy Effectiveness Ratio (SER)', [
    {
      name: 'Subsidy Effectiveness Ratio',
      equation: 'SER = (Units Delivered × Avg Price Reduction %) / (Total Subsidy Spent / €1M)',
      variables: [
        'Units Delivered = 8,920 completed affordable homes',
        'Price Reduction = 18.4% avg discount vs market price',
        'Total Spent = €76.2M disbursed',
      ],
      interpretation: 'SER > 1.5 = Good ROI. SER = 1.0-1.5 = Acceptable. SER < 1.0 = Subsidy not achieving goals.',
      sampleCalc: '(8,920 × 18.4%) / (76.2) = 1,641 / 76.2 = 21.5 → Excellent effectiveness per €M',
    },
  ]);

  // Slide 7: Budget by income bracket
  createTableSlide(pptx, 'Budget Allocation by Income Bracket',
    ['Income Bracket', 'Allocated', 'Utilized', 'Beneficiaries', 'Utilization %', 'Leakage %'],
    [
      ['< €5,000', '€28.5M', '€24.8M', '4,850', '87.0%', '1.8%'],
      ['€5,000 – €10,000', '€35.2M', '€28.1M', '4,200', '79.8%', '2.4%'],
      ['€10,000 – €15,000', '€22.8M', '€16.2M', '2,400', '71.1%', '4.2%'],
      ['€15,000 – €20,000', '€8.5M', '€5.1M', '780', '60.0%', '5.8%'],
      ['> €20,000', '€3.5M', '€2.0M', '220', '57.1%', '8.1%'],
    ],
    'FY2024 data | 12,450 total beneficiaries | €98.5M total allocated'
  );

  // Slide 8: Budget by city
  createTableSlide(pptx, 'Geographic Distribution of Subsidies',
    ['City', 'Budget', 'Utilized', 'Units', 'Utilization %', 'Leakage %'],
    [
      ['Belgrade', '€42.0M', '€35.6M', '3,420', '84.8%', '2.8%'],
      ['Novi Sad', '€22.0M', '€18.2M', '2,150', '82.7%', '3.1%'],
      ['Niš', '€15.0M', '€11.8M', '1,680', '78.7%', '4.2%'],
      ['Kragujevac', '€9.5M', '€7.2M', '1,120', '75.8%', '3.5%'],
      ['Other', '€10.0M', '€3.4M', '2,080', '34.0%', '2.9%'],
    ],
    'Note: "Other" category has low utilization due to program rollout timing in smaller municipalities'
  );

  // Slide 9: Red flags
  createTableSlide(pptx, 'Subsidy Red Flags – Anomaly Detection',
    ['Flag Type', 'Cases', 'Total Amount', 'Detection Method'],
    [
      ['Premium property subsidy', '45', '€890,000', 'Price exceeds affordable ceiling for zone'],
      ['Repeated beneficiary', '23', '€456,000', 'Same PAN/ID in system within 7-year window'],
      ['Income mismatch', '67', '€1,230,000', 'Declared income vs tax return discrepancy > 20%'],
      ['Construction delay', '89', '€2,150,000', 'No occupancy certificate 18+ months after disbursement'],
      ['False documentation', '12', '€340,000', 'Document hash verification failed / forged signatures'],
    ],
    '236 total flagged cases out of 12,450 beneficiaries (1.9% flag rate)'
  );

  // Slide 10: Outcomes
  createKPISlide(pptx, 'Outcome Tracking', [
    { name: 'Units Delivered', value: '8,920', description: 'Of 12,450 subsidized, 8,920 have been completed and occupied. Delivery rate: 71.6%. Remaining in various construction stages.' },
    { name: 'Average Price Reduction', value: '18.4%', description: 'Beneficiaries pay 18.4% less than market price on average. Ranges from 12% (Belgrade) to 28% (small cities).' },
    { name: 'Avg Time to Possession', value: '14.2 months', description: 'From subsidy approval to key handover. Down from 22 months pre-digitization. Target: < 12 months.' },
    { name: 'Beneficiary Satisfaction', value: '7.8/10', description: 'Based on post-occupancy survey (N=4,200). Highest: unit quality (8.2). Lowest: processing time (6.9).' },
  ]);

  // Slide 11: Data sources
  createBulletSlide(pptx, 'Data Sources & Sample Sizes', [
    'Budget Data: Ministry of Finance treasury system – real-time settlement (€125M annual budget)',
    'Beneficiary Records: Social welfare database + blockchain registry (12,450 active beneficiaries)',
    'Income Verification: Tax authority API (2.1M taxpayers) + employer verification',
    'Construction Progress: Building inspectorate reports + satellite imagery (quarterly)',
    'Satisfaction Surveys: Post-occupancy questionnaire (N=4,200, 47% response rate)',
    'Fraud Detection: AI/ML anomaly detection on all 12,450 disbursements, 236 flagged (1.9%)',
  ]);

  await pptx.writeFile({ fileName: 'Subsidy_Allocation_Deep_Dive.pptx' });
};

// ==================== 5. BUBBLE PROTECTION PPT ====================

export const generateBubbleProtectionPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Bubble Protection – Deep Dive';
  pptx.author = 'National Digital Land Registry';

  createTitleSlide(pptx, 'Bubble Protection Dashboard', 'Early Warning System, AI Forecasting & Regulatory Triggers', 'Pillar 4 of 4 – Ministerial Policy Dashboard');

  // Slide 2: What this tracks
  createBulletSlide(pptx, 'What Does This Dashboard Track?', [
    'Real estate price bubble risk across all Serbian cities',
    'Price growth vs income growth divergence with historical comparison',
    'Speculative activity indicators: rapid resales, multi-property buyers, cash purchases',
    'Credit quality metrics: LTV trends, subprime exposure, default rates',
    'AI/ML 6-month and 12-month forecasts with correction probability',
    'Automated regulatory triggers with pre-approved intervention thresholds',
  ]);

  // Slide 3: KPIs
  createKPISlide(pptx, 'Key Performance Indicators (KPIs)', [
    { name: 'Bubble Risk Index (BRI)', value: '68/100', description: 'Composite score from 5 sub-indices. 0-40 = Healthy, 40-60 = Watch, 60-80 = Elevated, 80-100 = Crisis. Currently in "Elevated" zone.' },
    { name: 'Price-to-Rent Ratio', value: '28.5', description: 'Years of rent needed to buy. Healthy: 15-20. Elevated: 20-25. Speculative: > 25. Current 28.5 suggests speculative premium.' },
    { name: 'Investor Transaction Share', value: '34.2%', description: 'Percentage of purchases by investors (non-owner-occupiers). Healthy: < 25%. Watch: 25-35%. Speculation: > 35%.' },
    { name: 'Vacancy Rate Trend', value: '8.4% (+1.2%)', description: 'Rising vacancy with rising prices is a classic bubble signal. Current: 8.4%, up from 7.2% YoY. Threshold: > 10% = oversupply.' },
  ]);

  // Slide 4: PIDI formula
  createFormulaSlide(pptx, 'Price-Income Divergence Index (PIDI)', [
    {
      name: 'Price-Income Divergence Index',
      equation: 'PIDI = (YoY Price Growth % - YoY Income Growth %) / Historical Std Dev',
      variables: [
        'Price Growth = Median transaction price change (currently +18.4%)',
        'Income Growth = Median household income change (currently +4.7%)',
        'Std Dev = 10-year historical standard deviation of the spread (≈3.2%)',
      ],
      interpretation: 'PIDI > 2.0 = Prices outpacing incomes abnormally. PIDI > 3.0 = Bubble territory.',
      sampleCalc: 'Belgrade: (18.4% - 4.7%) / 3.2% = 4.28 → Well into bubble territory',
    },
  ]);

  // Slide 5: SAI and CRC
  createFormulaSlide(pptx, 'Speculative Activity & Credit Risk', [
    {
      name: 'Speculative Activity Index (SAI)',
      equation: 'SAI = (Short-term Resales + Multi-property + Cash Purchases) / Total Transactions',
      variables: [
        'Short-term = Resale within 12 months (2,340 cases)',
        'Multi-property = Buyer owns 3+ properties (456 cases)',
        'Cash = Non-mortgage purchases > €100K (varies)',
      ],
      interpretation: 'SAI > 0.35 = High speculation. SAI > 0.50 = Regulatory intervention recommended.',
      sampleCalc: '(2,340 + 456 + 1,200) / 15,600 = 0.256 → Watch zone, trending up',
    },
    {
      name: 'Credit Risk Composite (CRC)',
      equation: 'CRC = 0.3(LTV) + 0.3(DTI) + 0.2(Subprime %) + 0.2(Default Rate)',
      variables: [
        'LTV = Avg loan-to-value ratio trend (currently 72%)',
        'DTI = Avg debt-to-income ratio (currently 38%)',
        'Subprime = High-risk loans as % of portfolio',
        'Default = 90+ day delinquency rate',
      ],
      interpretation: 'CRC > 0.6 = Credit quality deteriorating. CRC > 0.8 = Systemic risk.',
      sampleCalc: '0.3(0.72) + 0.3(0.38) + 0.2(0.12) + 0.2(0.04) = 0.362 → Acceptable but rising',
    },
  ]);

  // Slide 6: Market Stress Score
  createFormulaSlide(pptx, 'Market Stress Score (MSS) – Composite', [
    {
      name: 'Market Stress Score',
      equation: 'MSS = w₁(PIDI) + w₂(SAI) + w₃(CRC) + w₄(Vacancy Δ) + w₅(Construction/Demand)',
      variables: [
        'w₁ = 0.25 (Price-Income Divergence)',
        'w₂ = 0.20 (Speculative Activity)',
        'w₃ = 0.25 (Credit Risk)',
        'w₄ = 0.15 (Vacancy trend)',
        'w₅ = 0.15 (Construction oversupply)',
      ],
      interpretation: 'MSS 0-40 = Healthy | 40-60 = Watch | 60-80 = Elevated | 80-100 = Crisis mode.',
      sampleCalc: '0.25(78) + 0.20(52) + 0.25(36) + 0.15(65) + 0.15(70) = 59.75 → Watch/Elevated boundary',
    },
  ]);

  // Slide 7: City risk table
  createTableSlide(pptx, 'City-Level Bubble Risk Analysis',
    ['City', 'Risk Score', 'Price Growth', 'Income Growth', 'PIDI', 'Status'],
    [
      ['Belgrade', '78', '+18.4%', '+4.2%', '4.4', 'High Risk'],
      ['Novi Sad', '72', '+22.1%', '+5.1%', '5.3', 'High Risk'],
      ['Niš', '45', '+8.2%', '+4.8%', '1.1', 'Medium'],
      ['Kragujevac', '38', '+6.5%', '+3.9%', '0.8', 'Low'],
      ['Subotica', '52', '+12.4%', '+4.5%', '2.5', 'Medium'],
      ['Pančevo', '61', '+15.8%', '+5.2%', '3.3', 'Medium-High'],
    ],
    'Sample: 156,000 transactions/year across 6 major cities | Source: Registry + National Bank'
  );

  // Slide 8: Market stress signals
  createTableSlide(pptx, 'Early Warning Signals – Market Stress',
    ['Signal', 'Count', 'YoY Trend', 'Severity'],
    [
      ['Rapid resales (< 12 months)', '2,340', '+18.5%', 'High'],
      ['Multiple properties per entity', '456', '+12.3%', 'Medium'],
      ['Debt-backed purchases', '8,920', '+24.1%', 'High'],
      ['Construction vs occupancy gap', '3,200 units', '+8.4%', 'Medium'],
      ['Foreign investment spike', '1,890 deals', '+42.5%', 'High'],
    ],
    'All signals cross-referenced with blockchain transaction records'
  );

  // Slide 9: AI forecast
  createKPISlide(pptx, 'AI/ML Forecasting Results', [
    { name: '6-Month Risk Score', value: '68/100', description: 'ML model (Random Forest + LSTM) trained on 10 years of Serbian + EU housing data. Predicts elevated risk continuing.' },
    { name: '12-Month Risk Score', value: '74/100', description: 'Longer-term model shows increasing risk trajectory. Key driver: continued price-income divergence in urban centers.' },
    { name: 'Correction Probability', value: '42%', description: 'Probability of ≥15% price correction in next 12 months. Threshold for pre-emptive action: > 35%.' },
    { name: 'Liquidity Stress', value: '35%', description: 'Probability of market liquidity freeze (transaction volume drop > 40%). Currently below intervention threshold (50%).' },
  ]);

  // Slide 10: Regulatory triggers
  createBulletSlide(pptx, 'Regulator Action Triggers', [
    'BRI > 70: Tighten LTV norms from 80% to 70% in overheated zones (auto-triggered)',
    'BRI > 75: Increase stamp duty by 2-5% surcharge in bubble zones (ministerial approval)',
    'SAI > 0.40: Impose minimum 3-year holding period before resale (speculation tax)',
    'PIDI > 3.0: Freeze affordable housing subsidies in overheated zones',
    'Investor Share > 40%: Cap investor purchases to 30% of new project inventory',
    'CRC > 0.60: Banks must stress-test borrowers at current rate + 200 bps',
  ], 'Thresholds are policy-adjustable via the simulation panel');

  // Slide 11: Data sources
  createBulletSlide(pptx, 'Data Sources & Sample Sizes', [
    'Transaction Data: Blockchain registry – 156,000 transactions/year, real-time',
    'Price Indices: Hedonic price model from 10 years of registry data (1.2M transactions)',
    'Income Data: Statistical Office (N=45,000 survey) + Tax Authority (N=2.1M)',
    'Bank Data: 23 commercial banks via National Bank API (LTV, DTI, default rates)',
    'Construction: Building permit database (8,200/year) + occupancy certificates',
    'AI Model: Trained on 10-year Serbian data + 15-year EU comparative data (22 countries)',
  ]);

  await pptx.writeFile({ fileName: 'Bubble_Protection_Deep_Dive.pptx' });
};

// ==================== 6. PROBLEM-SOLUTION-IMPLEMENTATION PPT ====================

export const generateProblemSolutionPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Problem → Solution → Implementation';
  pptx.author = 'National Digital Land Registry';

  createTitleSlide(pptx, 'National Digital Land Registry', 'Problem → Solution → Implementation Roadmap', 'Comprehensive strategic brief for decision-makers');

  // SECTION 1: THE PROBLEM
  createSectionDivider(pptx, 'What Is the Problem?', '01');

  createBulletSlide(pptx, 'The Core Problem', [
    'Serbia\'s land registry system is paper-based, fragmented across 174 municipalities, and vulnerable to fraud',
    'No single source of truth for property ownership — records scattered across courts, cadastre, municipalities, and banks',
    'Property disputes affect 15% of parcels — unclear ownership deters investment and destabilizes markets',
    'Citizens must visit 4-6 offices and wait 30+ days for a simple property transfer',
    'Subsidy programs leak 8-12% due to inability to cross-verify eligibility across disconnected systems',
    'No real-time visibility into market bubbles or speculative activity — regulators react months late',
  ], 'Why the current system is failing Serbia');

  createKPISlide(pptx, 'Problem in Numbers', [
    { name: 'Registration Time', value: '30+ days', description: 'Average time for a property transfer. Citizens must visit cadastre, court, tax office, notary, and municipality. Each step is manual with no digital handoff.' },
    { name: 'Properties with Disputes', value: '15%', description: 'Approximately 367,500 of 2,450,000 registered parcels have some form of ownership ambiguity, boundary conflict, or pending litigation.' },
    { name: 'Subsidy Leakage', value: '8-12%', description: 'Estimated €10-15M annually in misallocated housing subsidies due to inability to verify income, ownership status, and prior benefits.' },
    { name: 'Fraud Vulnerability', value: 'High', description: 'Paper records can be altered, lost, or destroyed. No cryptographic verification of document authenticity. No audit trail for changes.' },
  ]);

  // SECTION 2: HOW IS IT CURRENTLY BEING SOLVED?
  createSectionDivider(pptx, 'How Is It Currently Being Solved?', '02');

  createBulletSlide(pptx, 'Current Approach & Its Limitations', [
    'Paper-Based Cadastre: Physical records stored in municipal offices — vulnerable to fire, flood, theft, and manipulation',
    'Manual Verification: Each transfer requires physical visits to 4-6 government offices for stamps and signatures',
    'Siloed Databases: Courts, banks, municipalities maintain separate systems with no interoperability',
    'Partial Digitization: Some cities scanned records but without data standardization or cross-linking',
    'No Fraud Detection: Duplicate registrations and forged documents discovered only during disputes',
    'Reactive Regulation: Market bubbles and subsidy fraud detected only after significant damage occurs',
  ]);

  createTableSlide(pptx, 'Current System vs. Proposed System',
    ['Dimension', 'Current System', 'Proposed TerraBlock Solution'],
    [
      ['Registration Time', '30+ days', '3-5 days (target)'],
      ['Data Integrity', 'Paper, alterable', 'Blockchain, immutable'],
      ['Fraud Detection', 'Post-incident', 'Real-time AI/ML'],
      ['Cross-Department', 'Manual coordination', 'Automated API integration'],
      ['Market Monitoring', 'Quarterly reports', 'Real-time dashboards'],
      ['Subsidy Verification', 'Self-declared', 'Cross-registry verified'],
      ['Dispute Resolution', '8+ months average', 'Clear evidence chain, faster resolution'],
      ['Citizen Experience', '4-6 office visits', 'Single portal access'],
    ],
    'Side-by-side comparison of current vs proposed capabilities'
  );

  // SECTION 3: IMPACT OF THE PROBLEM
  createSectionDivider(pptx, 'What Is the Impact of the Problem?', '03');

  createBulletSlide(pptx, 'Economic & Social Impact', [
    '€2B+ in foreign investment deterred annually due to title uncertainty and slow registration',
    'Property disputes cost the judicial system €45M+ annually in court time and legal aid',
    '34% of Serbian households cannot afford housing — undetected bubbles worsen affordability',
    'Banks face higher risk premiums (0.5-1.0% on mortgage rates) due to title chain uncertainty',
    'Small municipalities lose development projects because investors cannot verify land ownership in time',
    'EU accession progress stalled: acquis Chapter 23 (Judiciary) requires transparent property rights',
  ]);

  createKPISlide(pptx, 'Quantified Annual Impact', [
    { name: 'Deterred Foreign Investment', value: '€2B+', description: 'Real estate investment diverted to Croatia, Romania, and Montenegro — countries with clearer title systems.' },
    { name: 'Judicial System Cost', value: '€45M/year', description: 'Property dispute litigation costs including court time, public defenders, expert witnesses, and appeal processes.' },
    { name: 'Subsidy Leakage', value: '€10-15M/year', description: 'Housing subsidies reaching ineligible recipients or being diverted due to lack of cross-verification.' },
    { name: 'Citizen Time Cost', value: '12M hours/year', description: 'Estimated productive hours lost by citizens navigating manual property registration processes.' },
  ]);

  // SECTION 4: PROPOSED SOLUTION
  createSectionDivider(pptx, 'What Is the Solution We Propose?', '04');

  createBulletSlide(pptx, 'TerraBlock: National Digital Land Registry', [
    'Blockchain-Based Registry: Immutable, cryptographically verified ownership records for all 2.45M parcels',
    'Smart Contracts: Automated transfer validation, compliance checks, and escrow settlement',
    'AI/ML Engine: Real-time fraud detection, affordability forecasting, and bubble early warning',
    'Ministerial Dashboards: 4-pillar policy monitoring (Affordability, Legal, Subsidy, Bubble) for evidence-based governance',
    'API Integration: Secure connections to banks (23), courts (12 districts), municipalities (174), and tax authority',
    'Citizen Portal: Single digital interface for ownership verification, transfer initiation, and document access',
  ]);

  createBulletSlide(pptx, 'Technology Architecture', [
    'Permissioned Blockchain: Hyperledger Fabric — enterprise-grade, EU-compliant, energy-efficient',
    'Data Layer: PostgreSQL for analytics + IPFS for document storage with SHA-256 verification',
    'AI Models: Random Forest + LSTM for bubble prediction, trained on 10-year data (1.2M transactions)',
    'API Gateway: RESTful + GraphQL with OAuth 2.0, handling 10,000+ concurrent requests',
    'Dashboard: React-based ministerial control panels with real-time data refresh (every 15 minutes)',
    'Security: End-to-end encryption, 3-of-3 multisig for transfers, 5-of-7 validator consensus',
  ]);

  // SECTION 5: WHY IS THIS SOLUTION UNIQUE?
  createSectionDivider(pptx, 'How Is the Solution Relevant & Unique?', '05');

  createBulletSlide(pptx, 'What Makes TerraBlock Different', [
    'Policy-First Design: Built for ministerial decision-making, not just record-keeping — "policy → data → risk → action" workflow',
    'Blockchain as Legal Infrastructure: Not just a database — every transaction is legally defensible and court-admissible',
    'AI-Powered Governance: Predictive analytics for housing affordability, bubble detection, and subsidy fraud — not reactive reporting',
    'Cross-Registry Integration: First system to link cadastre + courts + banks + tax + municipalities in one blockchain',
    'Serbian Law Alignment: Smart contracts encode Serbian property law (inheritance, co-ownership, encumbrances, foreign restrictions)',
    'EU Standards Ready: Aligned with INSPIRE Directive, acquis Chapter 23, and eIDAS for cross-border recognition',
  ]);

  createTableSlide(pptx, 'Competitive Landscape',
    ['Feature', 'TerraBlock', 'Sweden (Lantmäteriet)', 'Georgia (Bitfury)', 'Dubai Land Dept.'],
    [
      ['Blockchain Type', 'Permissioned (HLF)', 'Pilot only', 'Public (Bitcoin)', 'Private (IBM)'],
      ['Policy Dashboards', '4-pillar ministerial', 'None', 'None', 'Basic analytics'],
      ['AI/ML Forecasting', 'Yes (bubble, fraud)', 'No', 'No', 'Limited'],
      ['Subsidy Integration', 'Full cross-verify', 'No', 'No', 'No'],
      ['Smart Contracts', 'Full lifecycle', 'Proof of concept', 'Timestamping only', 'Transfer only'],
      ['EU Compliance', 'INSPIRE + eIDAS', 'Yes', 'No', 'No'],
    ],
    'TerraBlock is the most comprehensive blockchain land registry solution globally'
  );

  // SECTION 6: IMPLEMENTATION STEPS
  createSectionDivider(pptx, 'Implementation Steps', '06');

  createBulletSlide(pptx, 'Step 1: Data Capture & Digitization', [
    'Objective: Digitize and standardize all existing land records across 174 municipalities',
    'Timeline: Months 1-6 | Budget: €2.5M | Team: 45 data entry specialists + 8 GIS experts',
    'Activities: Scan paper records, OCR processing, geocoding parcels, satellite footprint mapping',
    'Dependencies: Access agreements with municipal cadastre offices (may not exist for all municipalities)',
    'Risk: Incomplete historical records in rural areas — estimated 15% of parcels have gaps',
    'Deliverable: Standardized digital record for each of 2,450,000 registered parcels',
  ], 'Foundation phase — all subsequent steps depend on data quality');

  createBulletSlide(pptx, 'Step 2: Cross-Department Coordination', [
    'Objective: Establish API connections and data-sharing agreements across all government entities',
    'Timeline: Months 3-9 | Budget: €1.8M | Team: 6 integration engineers + 3 legal advisors',
    'Stakeholders: Cadastre (RGZ), Courts (12 districts), Banks (23), Tax Authority, 174 Municipalities',
    'Challenge: Data formats differ across departments — requires ETL pipelines and schema mapping',
    'Legal Framework: MoUs needed with each entity, data protection impact assessments (GDPR-aligned)',
    'Deliverable: Live API feeds from all major data sources into unified blockchain layer',
  ], 'Coordination is the hardest part — requires political will and institutional buy-in');

  createBulletSlide(pptx, 'Step 3: Blockchain Infrastructure Deployment', [
    'Objective: Deploy permissioned blockchain network with smart contracts and validator nodes',
    'Timeline: Months 6-12 | Budget: €3.2M | Team: 12 blockchain engineers + 4 security specialists',
    'Architecture: 7 validator nodes (Ministry, RGZ, NBS, 2 courts, 2 regional centers)',
    'Smart Contracts: PropertyRegistry, TransferManager, EncumbranceRegistry, DisputeHandler, SubsidyValidator',
    'Testing: 3-month parallel run with legacy system before cutover',
    'Deliverable: Production blockchain network processing live transactions',
  ]);

  createBulletSlide(pptx, 'Step 4: AI/ML Model Training & Validation', [
    'Objective: Train and validate predictive models for fraud detection, affordability, and bubble risk',
    'Timeline: Months 9-15 | Budget: €1.5M | Team: 6 data scientists + 2 domain experts',
    'Data: 10-year historical data (1.2M transactions) + 15-year EU comparative data (22 countries)',
    'Models: Random Forest for classification, LSTM for time-series forecasting, Anomaly detection for fraud',
    'Validation: Backtesting against known events (2008 crisis, COVID-19 impact, Belgrade 2021 spike)',
    'Deliverable: Production AI models with >85% accuracy integrated into dashboard suite',
  ]);

  createBulletSlide(pptx, 'Step 5: Dashboard & Portal Deployment', [
    'Objective: Launch ministerial dashboards and citizen portal for all stakeholders',
    'Timeline: Months 12-18 | Budget: €2.0M | Team: 8 frontend + 4 UX designers + 3 policy advisors',
    'Ministerial: 4-pillar command center (Affordability, Legal, Subsidy, Bubble) with drill-down',
    'Citizen Portal: Property lookup, transfer initiation, document access, mobile-responsive',
    'Government Portal: Data input, report generation, policy simulation tools',
    'Deliverable: Live dashboards accessible to all stakeholder tiers with role-based access',
  ]);

  createBulletSlide(pptx, 'Step 6: National Rollout & Training', [
    'Objective: Roll out system nationally with comprehensive training for all user groups',
    'Timeline: Months 15-24 | Budget: €1.5M | Team: 12 trainers + 6 regional coordinators',
    'Phase A (Months 15-18): Belgrade + Novi Sad + Niš (covering 60% of transactions)',
    'Phase B (Months 18-21): Remaining Tier 1 cities (Kragujevac, Subotica, Pančevo, Zrenjanin)',
    'Phase C (Months 21-24): All municipalities — mobile teams for rural areas',
    'Deliverable: Full national deployment with trained operators in every municipality',
  ]);

  // Summary timeline
  createTableSlide(pptx, 'Implementation Timeline Summary',
    ['Step', 'Activity', 'Timeline', 'Budget', 'Key Dependency'],
    [
      ['1', 'Data Capture & Digitization', 'Months 1-6', '€2.5M', 'Municipal access agreements'],
      ['2', 'Cross-Department Coordination', 'Months 3-9', '€1.8M', 'Political will, MoUs'],
      ['3', 'Blockchain Deployment', 'Months 6-12', '€3.2M', 'Infrastructure, validators'],
      ['4', 'AI/ML Model Training', 'Months 9-15', '€1.5M', 'Historical data quality'],
      ['5', 'Dashboard & Portal', 'Months 12-18', '€2.0M', 'Stakeholder requirements'],
      ['6', 'National Rollout', 'Months 15-24', '€1.5M', 'Training logistics'],
    ],
    'Total Budget: €12.5M over 24 months | Total Team: ~120 specialists'
  );

  await pptx.writeFile({ fileName: 'Problem_Solution_Implementation.pptx' });
};

// ==================== EXECUTIVE OVERVIEW PPT ====================

export const generateExecutiveOverviewPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Executive Overview';
  pptx.author = 'National Digital Land Registry';

  createTitleSlide(pptx, 'National Digital Land Registry', 'Executive Overview: Vision, Problem & Strategic Outcomes');

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
    { name: 'Registration Time', value: '30 → 3 days', description: 'End-to-end property transfer processing time reduction through automation.' },
    { name: 'Dispute Reduction', value: '-80%', description: 'Property ownership disputes eliminated through clear, immutable title records.' },
    { name: 'Subsidy Accuracy', value: '98%+', description: 'Precise targeting of housing subsidies with blockchain-verified eligibility.' },
    { name: 'Foreign Investment', value: '+€500M', description: 'Increased real estate investment due to title security and transparency.' },
  ]);

  await pptx.writeFile({ fileName: 'Executive_Overview.pptx' });
};

// ==================== DATA ARCHITECTURE PPT ====================

export const generateDataArchitecturePPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Data Architecture';
  pptx.author = 'National Digital Land Registry';

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

// ==================== SMART CONTRACT PPT ====================

export const generateSmartContractPPT = async () => {
  const pptx = new pptxgen();
  pptx.title = 'Smart Contract Design';
  pptx.author = 'National Digital Land Registry';

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
