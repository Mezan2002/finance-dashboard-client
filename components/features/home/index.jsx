import BalanceTrendChart from "@/components/features/home/BalanceTrendChart";
import GridOverviewCards from "@/components/features/home/GridOverviewCards";
import PrimaryGoals from "@/components/features/home/PrimaryGoals";
import SpendingBreakdownChart from "@/components/features/home/SpendingBreakdownChart";
import TotalBalanceCard from "@/components/features/home/TotalBalanceCard";
import MyCards from "@/components/features/home/MyCards";
import RecentActivity from "@/components/features/home/RecentActivity";
import PageHeader from "@/components/shared/PageHeader";

const Home = () => {
  return (
    <section className="pb-5 space-y-4">
      <PageHeader
        title="Welcome back, Mezanur 👋"
        description="Your financial health is looking great. Track your wealth and insights below."
      />

      {/* Main Stats Row */}
      <div className="grid grid-cols-12 gap-4">
        <TotalBalanceCard />
        <GridOverviewCards />
        <PrimaryGoals />
      </div>

      {/* Modern Dashboard Core */}
      <div className="grid grid-cols-12 gap-4">
        <MyCards />
        <RecentActivity />
      </div>

      {/* Insightful Visuals */}
      <div className="grid grid-cols-12 gap-4">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
    </section>
  );
};
export default Home;
