# 💰 Finzo - Premium Finance Dashboard

Finance dashboard UI assignment for the **Frontend Developer Intern** position at **Zorvyn FinTech Pvt. Ltd.**  
This project is a clean, interactive, and high-fidelity finance dashboard built with **Next.js 15**, **Tailwind CSS v4**, **ApexCharts**, and **Context API**, focused on summary insights, advanced transactions, and role-based UI.

---

## 🔗 Assignment & Live Links

> - **Assignment Portal:** [screening.zorvyn.io](https://screening.zorvyn.io/)
> - **GitHub Repository:** [github.com/Mezan2002/finance-dashboard-client](https://github.com/Mezan2002/finance-dashboard-client)
> - **Live Demo (Vercel):** `[Your Deployment Link Here]`

---

## Tech Stack & Tools

<p align="left">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=ffffff&style=for-the-badge" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=061c2e&style=for-the-badge" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=ffffff&style=for-the-badge" />
  <img alt="ApexCharts" src="https://img.shields.io/badge/ApexCharts-charts-ffb01a?style=for-the-badge" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ESNext-F7DF1E?logo=javascript&logoColor=000000&style=for-the-badge" />
  <img alt="Lucide" src="https://img.shields.io/badge/Lucide-Icons-f59e0b?logo=lucide&logoColor=ffffff&style=for-the-badge" />
  <img alt="Vercel" src="https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=ffffff&style=for-the-badge" />
</p>

---

## Objective

Build a sophisticated and expressive **finance dashboard interface** that allows a user to:

- View a high-level financial summary (**Total Balance**, **Income**, **Expenses**, **Savings Rate**) with real-time updates.
- Visualize trends over time via an interactive **Balance Trend** chart and categorical **Spending Breakdowns**.
- Explore, filter, sort, and manage (**CRUD**) a rich list of transactions.
- See intelligent, data-driven **insights** and **observations** about their spending habits.
- Experience a seamless **Role-Based UI** (Viewer vs Admin) simulated entirely on the frontend.

The focus is on **premium frontend architecture**, fluid UI/UX, clean state management, and clear data visualization.

---

## Features

- **Dashboard Overview**
  - **Summary Cards**: Dynamic tracking of key financial metrics (Balance, Income, Expenses, Savings).
  - **Balance Trend**: High-performance interactive area chart visualizing the financial trajectory.
  - **Spending Breakdown**: Categorical donut chart showing exactly where your money goes.

- **Advanced Transactions Section**
  - **Full CRUD**: Admins can Add, Edit, and Delete transactions via modern modal forms.
  - **Intelligent Filtering**: Filter by Type, Category, or Date Range (Month, 90 Days, All Time).
  - **Search & Sort**: Instant search by merchant/category; toggle sorting for date and amount.
  - **Data Export**: One-click export of filtered data to **JSON** or **CSV**.

- **Role-Based UI (Viewer vs Admin)**
  - **Viewer**: Read-only dashboard; management actions (Add/Edit/Delete) are hidden.
  - **Admin**: Full control over transaction data and dashboard management.
  - Role selection via a profile dropdown in the header, persisted via localStorage.

- **Insights & Observations**
  - **Highest Spend Category**: Automatically identifies top expense categories.
  - **Monthly Comparison**: Visual bar chart comparison of Income vs. Expenses over time.
  - **Smart Observations**: Intelligent alerts for savings efficiency, spending spikes, and frequent habits.

- **UI & UX Excellence**
  - Clean, premium dark-theme design built with **Tailwind CSS v4**.
  - **Responsive Design**: Mobile-native drawer navigation and fluid grid layouts.
  - Handling of **empty data** cases for charts, tables, and insights.
  - Persistence of application state and user roles via **localStorage**.

---

## Project Structure

```text
finance-dashboard-client
├── app/                        # Next.js App Router (Layout & Pages)
│   ├── insights/               # Insights page
│   ├── transactions/           # Transactions page
│   ├── layout.js               # Root layout & Metadata
│   └── page.js                 # Dashboard home page
├── components/
│   ├── features/               # Feature-specific logic (Home, Insights, Transactions)
│   ├── shared/                 # Shared Layout components (Header, Sidebar, Theme)
│   └── ui/                     # Base UI components (Button, Input, Select, etc.)
├── providers/                # Global State (TransactionProvider, RoleProvider, ThemeProvider)
├── hooks/                    # Custom React hooks for data aggregation & theme
├── utils/                    # Data transformation and Export utilities (JSON/CSV)
├── public/                   # Static assets (fonts, icons, profile images)
├── next.config.mjs           # Next.js configuration
└── tailwind.config.js        # Tailwind CSS v4 Configuration
```

---

## Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/Mezan2002/finance-dashboard-client
cd finance-dashboard-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Next.js will print a local URL, for example:

- [http://localhost:3000](http://localhost:3000)

Open it in your browser to view the dashboard.

---

## Implementation Notes

- **Data & Mocking**
  - All transactions are mock data initially, defined within the `TransactionProvider`.
  - Application state and initial data are persisted to `localStorage` for a consistent experience across sessions.
  - No backend required; all data logic is handled on the client via React Context.

- **State Management**
  - `TransactionProvider`: Manages the global transaction pool, handles CRUD operations, and persists data.
  - `RoleProvider`: Tracks and broadcasts the current user role (`admin` or `viewer`).
  - `ThemeProvider`: Handles system-aware dark/light mode toggling using `next-themes`.
  - Data is aggregated in real-time using `useMemo` hooks to ensure zero performance lag during filtering.

- **Visualizations (ApexCharts)**
  - **BalanceTrendChart**: Gradient area chart for visualizing wealth growth over time.
  - **SpendingDonut**: Categorical expense distribution with custom labels.
  - **ComparisonBarChart**: Side-by-side comparison of Income vs Expenses.

- **Responsiveness & UX**
  - Layout built with Tailwind CSS v4 responsive utilities.
  - Custom sidebar implementation: A flexible sticky sidebar on desktop that transitions into a slide-out drawer on mobile.
  - All grids use a 12-column system that adapts fluidly across mobile, tablet, and desktop viewports.

---

## How to Review

1. **Explore the dashboard**
   - Toggle between **Viewer** and **Admin** roles in the top-right profile dropdown.
   - Observe how management actions (Add/Edit/Delete) disappear for the Viewer role.

2. **Test transactions**
   - Add, Edit, or Delete a transaction as Admin. Observe instant updates across all cards and charts.
   - Filter by date (e.g., "This Month") and sort by amount.
   - Export your filtered results to **CSV** or **JSON**.

3. **Check charts & insights**
   - Confirm that the **Balance Trend** and **Spending Breakdown** respond to active filters.
   - Review the **Insights** page for the Spending Comparison and Smart Observations.

4. **Review code structure**
   - Inspect `providers/` for clean state management logic.
   - Check `components/features/` for modular component architecture.
   - Review `utils/` for data export and aggregation helpers.

---

## Author

**Mezanur Rahman**  
Frontend Developer  
📍 Dhaka, Bangladesh

---

<div align="center">
Built and designed with ❤️ by <strong>Mezanur Rahman</strong> &copy; 2026
</div>

---
