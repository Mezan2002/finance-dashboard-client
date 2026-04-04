# 💰 Finzo - Premium Finance Dashboard

A clean, interactive, and high-fidelity finance dashboard built to fulfill the "Finance Dashboard UI" assignment. This application provides users with a comprehensive overview of their financial health, detailed transaction management, and data-driven insights.

## 🚀 Live Features

### 1. Dashboard Overview (Core Requirement)
- **Summary Cards**: Real-time tracking of Total Balance, Monthly Income, Expenses, and Savings Rate.
- **Balance Trend**: A dynamic line chart visualizing financial trajectory over time.
- **Spending Breakdown**: A categorical donut chart showing exactly where the money goes.

### 2. Advanced Transactions (Core Requirement)
- **Full CRUD**: Admins can Add, Edit, and Delete transactions.
- **Real-time Filtering**: Filter by Transaction Type (Income/Expense), Category, or Date Period (This Month, Last Month, Last 90 Days).
- **Search & Sort**: Instant search by merchant/category and interactive sorting by Date and Amount.
- **Global Export**: One-click export of filtered data to **JSON** or **CSV** formats.

### 3. Smart Insights (Core Requirement)
- **Highest Spending**: Automatically identifies the primary expense hub.
- **Monthly Comparison**: A 6-month side-by-side analysis of Income vs. Expenses.
- **Data-Driven Observations**: Intelligent alerts for savings progress, spending spikes, and frequent category patterns based on real transaction data.

### 4. RBAC - Role Based Access Control (Core Requirement)
- **Admin Role**: Full access to manage transactions and data.
- **Viewer Role**: View-only access. Management actions (Add/Edit/Delete) are hidden to simulate a restricted profile.
- **Switching**: Accessible via the user profile dropdown in the top-right corner.

### 5. Technical Excellence & UX (Optional Enhancements)
- **Responsive Design**: Custom-built mobile drawer sidebar and fluid grid layouts for all devices.
- **Dark Mode**: Fully themed support for both Light and Dark modes.
- **Persistence**: Application state (transactions, role, theme) is persisted using `localStorage`.
- **State Management**: Robust implementation using React Context API and custom hooks for scalable data flow.

## 🛠️ Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: ApexCharts (React-ApexCharts)
- **Fonts**: Montserrat (via Google Fonts)

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **View the Dashboard**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Design Philosophy
The design prioritizes **visual hierarchy** and **scannability**. By using a curated color palette (Emerald for Income, Rose for Expenses) and premium "Glassmorphism" touches, the dashboard feels both professional and modern. The mobile experience was treated with equal importance, featuring a native-app-like navigation drawer.
