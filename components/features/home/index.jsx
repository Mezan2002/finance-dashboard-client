import BalanceTrendChart from "@/components/features/home/BalanceTrendChart";
import GridOverviewCards from "@/components/features/home/GridOverviewCards";
import PrimaryGoals from "@/components/features/home/PrimaryGoals";
import SpendingBreakdownChart from "@/components/features/home/SpendingBreakdownChart";
import TotalBalanceCard from "@/components/features/home/TotalBalanceCard";
import PageHeader from "@/components/shared/PageHeader";

const Home = () => {
  return (
    <section className="pb-20">
      <PageHeader
        title="Welcome back, Mezanur 👋"
        description="Manage your finances and track your monthly expenses..."
      />

      <div className="grid grid-cols-12 gap-3 mt-8">
        <TotalBalanceCard />
        <GridOverviewCards />
        <PrimaryGoals />
      </div>

      <div className="grid grid-cols-12 gap-3 mt-3">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
    </section>
  );
};
export default Home;
