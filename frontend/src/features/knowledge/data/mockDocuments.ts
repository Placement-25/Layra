import { DocumentItem } from '../types/knowledge';

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc_01',
    name: 'Battery_Cell_Degradation_Report.pdf',
    fileType: 'pdf',
    fileSize: 4404019, // 4.2 MB
    uploadDate: '2026-11-20T10:14:00Z',
    indexingStatus: 'indexed',
    category: 'Engineering & Materials',
    totalChunks: 48,
    totalTokens: 24800,
    summary: 'Comprehensive empirical evaluation of thermal degradation, critical current densities, and solid-state electrolyte boundary stability.',
    extractedPreview: 'Section 4.1: The ceramic LLZO sample showed no structural decomposition at temperatures up to 365°C. At higher C-rates, localized current convergence induced dendrite formation along inter-granular surfaces unless external mechanical load was maintained above 5 MPa.',
    chunks: [
      {
        id: 'chunk_01_1',
        chunkIndex: 1,
        text: 'Experimental Setup: Testing was conducted in an argon-purged glovebox with moisture levels below 0.1 ppm to prevent surface contamination.',
        tokenCount: 420,
        embeddingDimension: 1536,
      },
      {
        id: 'chunk_01_2',
        chunkIndex: 2,
        text: 'Thermal Stability Profiling: Thermal gravimetric analysis (TGA) demonstrated mass loss of less than 0.4% up to 400°C for oxide-based ceramics.',
        tokenCount: 512,
        embeddingDimension: 1536,
      },
      {
        id: 'chunk_01_3',
        chunkIndex: 3,
        text: 'Critical Current Density (CCD): The CCD threshold was measured at 1.8 mA/cm² at 25°C and increased to 4.2 mA/cm² when heated to 60°C.',
        tokenCount: 480,
        embeddingDimension: 1536,
      },
    ],
  },
  {
    id: 'doc_02',
    name: 'Q3_Financial_Disclosures.docx',
    fileType: 'docx',
    fileSize: 1887436, // 1.8 MB
    uploadDate: '2026-11-18T16:30:00Z',
    indexingStatus: 'indexed',
    category: 'Finance & Regulatory',
    totalChunks: 32,
    totalTokens: 16400,
    summary: 'Quarterly financial statements detailing liquidity coverage ratios, credit derivatives exposure, and foreign currency volatility.',
    extractedPreview: 'Liquidity & Capital Resources: Total cash and cash equivalents stood at $4.2B at the end of the third fiscal quarter. Net derivative exposure decreased by 4.2% following collateral optimization with clearing houses.',
    chunks: [
      {
        id: 'chunk_02_1',
        chunkIndex: 1,
        text: 'Consolidated Statements: Revenue rose 12.4% year-over-year driven by cloud intelligence subscriptions and enterprise analytics tiers.',
        tokenCount: 390,
        embeddingDimension: 1536,
      },
      {
        id: 'chunk_02_2',
        chunkIndex: 2,
        text: 'Risk Management: Forward foreign exchange swap contracts have hedged 74% of planned Euro and Yen obligations through Q2 next year.',
        tokenCount: 440,
        embeddingDimension: 1536,
      },
    ],
  },
  {
    id: 'doc_03',
    name: 'Regulatory_Compliance_Framework.txt',
    fileType: 'txt',
    fileSize: 348160, // 340 KB
    uploadDate: '2026-11-15T08:00:00Z',
    indexingStatus: 'indexed',
    category: 'Legal & Compliance',
    totalChunks: 14,
    totalTokens: 6800,
    summary: 'Standard operating procedures and compliance audit criteria aligned with ISO 27001 and EU AI Act classification.',
    extractedPreview: 'Article 6 Risk Categorization: High-risk AI systems must implement continuous logging, risk assessment pipelines, and human-in-the-loop oversight capabilities before deployment in commercial settings.',
    chunks: [
      {
        id: 'chunk_03_1',
        chunkIndex: 1,
        text: 'Audit Trail Requirements: Every decision output must trace back to grounded vector citations and immutable execution logs.',
        tokenCount: 310,
        embeddingDimension: 1536,
      },
    ],
  },
  {
    id: 'doc_04',
    name: 'Enterprise_Telemetry_Data.csv',
    fileType: 'csv',
    fileSize: 8388608, // 8.0 MB
    uploadDate: '2026-11-24T12:00:00Z',
    indexingStatus: 'processing',
    category: 'Operations',
    totalChunks: 64,
    totalTokens: 38000,
    summary: 'Time-series sensor telemetry recording latency, token consumption, and server CPU saturation across distributed inference clusters.',
    extractedPreview: 'timestamp,node_id,cluster_zone,latency_ms,tokens_per_sec,memory_pct\n2026-11-24T00:00:00Z,srv-us-east-1a,zone-alpha,42.1,840,68.4\n2026-11-24T00:00:05Z,srv-us-east-1a,zone-alpha,39.8,890,69.1',
    chunks: [
      {
        id: 'chunk_04_1',
        chunkIndex: 1,
        text: 'Telemetry Chunk 1: Initializing tabular embedding indexing for sensor streams.',
        tokenCount: 600,
        embeddingDimension: 1536,
      },
    ],
  },
  {
    id: 'doc_05',
    name: 'Clinical_Trial_Metrics_Phase2.xlsx',
    fileType: 'xlsx',
    fileSize: 2621440, // 2.5 MB
    uploadDate: '2026-11-12T11:45:00Z',
    indexingStatus: 'indexed',
    category: 'Biomedical Research',
    totalChunks: 22,
    totalTokens: 11200,
    summary: 'Biomarker tracking, patient cohort stratification, and efficacy response rates for targeted oncology inhibitor trials.',
    extractedPreview: 'Cohort B demonstrated a 68% objective response rate with manageable Grade 1-2 adverse events. No dose-limiting toxicities observed in the 150mg escalation cohort.',
    chunks: [
      {
        id: 'chunk_05_1',
        chunkIndex: 1,
        text: 'Cohort Stratification: 140 participants randomized across 4 dosing arms with regular pharmacokinetic monitoring.',
        tokenCount: 350,
        embeddingDimension: 1536,
      },
    ],
  },
];
