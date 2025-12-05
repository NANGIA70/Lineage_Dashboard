# UAT Walkthrough – Lineage Dashboard

Purpose: demo the document → run → value → lineage flow for financial analysis.

Scenario: You are a credit analyst reviewing **“AQRR – Acme Q4 2024”**.

## Click path
1) Start the stack (see commands in README quick start).
2) Open the frontend at http://localhost:3000.
3) On Home, locate “AQRR – Acme Q4 2024” and click it (Document Detail).
4) In the Runs table, click the most recent run (version 3).
5) On Run Detail → Tables tab:
   - Open “Financial Statement Analysis”.
   - Click **Gross Margin Q4** (ID `VAL-GM-Q4`). Lineage Drawer should show inputs: Gross Profit (`VAL-GP-Q4`) and Revenue (`VAL-REV-Q4`), with transformation “gross margin = gross profit / revenue”.
   - Optionally click **Revenue Growth** (`VAL-REV-GROWTH`) to see inputs from current/prior revenue.
6) Run Detail → Narrative tab:
   - Find the sentence “Revenue reached $892M (12.5% growth) with gross margin at 42.1%.”
   - Click **42.1%** (`VAL-GM-Q4`) or **12.5%** (`VAL-REV-GROWTH`); the drawer should match the table lineage above.
7) Optional: click leverage (`VAL-LEVERAGE`) to see debt (`VAL-DEBT-Q4`) and EBITDA (`VAL-EBITDA-Q4`) as inputs.

## What success looks like
- No 404s for seeded IDs (`VAL-REV-Q4`, `VAL-REV-GROWTH`, `VAL-GM-Q4`, `VAL-LEVERAGE`, etc.).
- Lineage Drawer opens quickly and shows inputs/transformations consistent with table/narrative.
- Navigation path works: Home → Document → Run → Tables/Narrative → click value → lineage drawer.***
