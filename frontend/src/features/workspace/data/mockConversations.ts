import { Conversation } from '../types/workspace';

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'chat_01',
    title: 'Solid-State Battery Thermal Degradation Analysis',
    createdAt: '2026-11-25T14:22:00Z',
    updatedAt: '2026-11-25T14:26:00Z',
    pinned: true,
    messages: [
      {
        id: 'msg_01_user',
        role: 'user',
        content: 'Compare the thermal runaway threshold of solid-state electrolyte batteries versus standard lithium-ion NCA chemistries using our indexed lab papers.',
        timestamp: '2026-11-25T14:22:00Z',
      },
      {
        id: 'msg_01_assistant',
        role: 'assistant',
        content: `Based on synthesis across your indexed research papers, solid-state electrolyte (SSE) configurations demonstrate a significantly higher thermal stability envelope compared to conventional liquid-electrolyte NCA (Nickel-Cobalt-Aluminum) lithium-ion cells:

1. **Self-Heating & Decomposition Onset:**
   - **Conventional NCA:** Exothermic self-heating begins at ~135°C–150°C due to SEI decomposition, escalating rapidly to uncontrolled thermal runaway above 210°C with severe oxygen release.
   - **Solid-State (Sulfide/Oxide LLZO):** Thermal decomposition of the LLZO solid matrix is delayed until ~340°C–380°C. Oxygen evolution is virtually eliminated in ceramic separators, reducing peak heat release rate by 78%.

2. **Interface Resistance & Mechanical Shear:**
   - Although thermal runaway resilience is vastly superior in SSEs, lithium dendrite penetration at grain boundaries under high C-rates (≥3C) remains a key vulnerability unless compressive stack pressures (>5 MPa) are maintained.

3. **Synthesis Verdict:**
   - Solid-state architectures improve the thermal critical safety margin by **+190°C**, eliminating flammable volatile organic solvents while introducing micro-mechanical pressure containment requirements.`,
        timestamp: '2026-11-25T14:23:15Z',
        tokens: 342,
        reasoningTimeSeconds: 2.1,
        toolSteps: [
          {
            id: 't1',
            toolName: 'Vector Search (Knowledge Base)',
            status: 'completed',
            executionTimeMs: 142,
            summary: 'Retrieved 8 chunks from "Battery_Cell_Degradation_Report.pdf"',
          },
          {
            id: 't2',
            toolName: 'Cross-Encoder Re-ranker',
            status: 'completed',
            executionTimeMs: 88,
            summary: 'Re-ranked top 4 relevant passages (Threshold > 0.85)',
          },
          {
            id: 't3',
            toolName: 'Evidence Verification',
            status: 'completed',
            executionTimeMs: 110,
            summary: 'Synthesized citations and verified quantitative metrics',
          },
        ],
        sources: [
          {
            id: 'src_1',
            documentId: 'doc_01',
            documentTitle: 'Battery_Cell_Degradation_Report.pdf',
            fileType: 'pdf',
            pageNumber: 14,
            section: 'Thermal Stability Profiling',
            snippet: 'LLZO ceramic electrolytes exhibit thermal decomposition resistance up to 365°C under dry inert atmospheric testing, outperforming liquid carbonates by over 180°C.',
            relevanceScore: 0.96,
          },
          {
            id: 'src_2',
            documentId: 'doc_01',
            documentTitle: 'Battery_Cell_Degradation_Report.pdf',
            fileType: 'pdf',
            pageNumber: 22,
            section: 'Critical Current Density',
            snippet: 'Dendrite growth along solid electrolyte grain boundaries necessitates external isobaric pressure fixtures above 5 MPa during high-rate cycling.',
            relevanceScore: 0.91,
          },
        ],
        suggestedFollowUps: [
          'What are the mechanical packaging tradeoffs of the 5 MPa stack pressure?',
          'How do sulfide-based solid electrolytes compare to oxide-based LLZO?',
          'Extract all quantitative temperature tables into CSV format.',
        ],
      },
    ],
  },
  {
    id: 'chat_02',
    title: 'Financial Risk Exposure & Portfolio Volatility',
    createdAt: '2026-11-24T09:15:00Z',
    updatedAt: '2026-11-24T09:18:00Z',
    pinned: false,
    messages: [
      {
        id: 'msg_02_user',
        role: 'user',
        content: 'Summarize the counterparty exposure and liquidity risk highlighted in the Q3 Financial Disclosures.',
        timestamp: '2026-11-24T09:15:00Z',
      },
      {
        id: 'msg_02_assistant',
        role: 'assistant',
        content: `From the Q3 Financial Disclosures, counterparty exposure is concentrated within short-duration credit facilities and interest rate derivatives:

- **Tier-1 Counterparty Limit:** 82% of derivative hedging contracts are backed by tri-party collateral agreements with AA-rated clearing houses.
- **Liquidity Coverage Ratio (LCR):** Maintained at 142%, well above the 100% regulatory baseline, providing a $1.4B liquid buffer against short-term stress scenarios.
- **Unhedged Foreign Exchange Volatility:** Emerging market exposure represents 14% of gross revenue, with a ±5% currency shift estimated to impact EBITDA by $28M.`,
        timestamp: '2026-11-24T09:16:30Z',
        tokens: 280,
        reasoningTimeSeconds: 1.8,
        toolSteps: [
          {
            id: 't_f1',
            toolName: 'Keyword Index Lookup',
            status: 'completed',
            executionTimeMs: 95,
            summary: 'Identified Table 4.2 in "Q3_Financial_Disclosures.docx"',
          },
          {
            id: 't_f2',
            toolName: 'Financial Metrics Parser',
            status: 'completed',
            executionTimeMs: 120,
            summary: 'Extracted Liquidity Coverage Ratio and Net Derivatives exposure',
          },
        ],
        sources: [
          {
            id: 'src_f1',
            documentId: 'doc_02',
            documentTitle: 'Q3_Financial_Disclosures.docx',
            fileType: 'docx',
            pageNumber: 31,
            section: 'Liquidity & Capital Resources',
            snippet: 'The firm maintained an average Liquidity Coverage Ratio of 142% for the quarter ended September 30, supported by high-quality liquid assets.',
            relevanceScore: 0.94,
          },
        ],
        suggestedFollowUps: [
          'Show a sensitivity matrix for foreign exchange shocks.',
          'Which counterparties exceed 5% total exposure?',
        ],
      },
    ],
  },
];
