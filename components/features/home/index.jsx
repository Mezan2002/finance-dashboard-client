import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui";

import BalanceTrendChart from "@/components/features/home/BalanceTrendChart";
import GridOverviewCards from "@/components/features/home/GridOverviewCards";
import PrimaryGoals from "@/components/features/home/PrimaryGoals";
import SpendingBreakdownChart from "@/components/features/home/SpendingBreakdownChart";
import TotalBalanceCard from "@/components/features/home/TotalBalanceCard";

const Home = () => {
  return (
    <section className="pb-20">
      <div className="flex items-center justify-between">
        {/* Greeting */}
        <div>
          <h4 className="text-2xl font-semibold">Welcome back, Mezanur 👋</h4>
          <span className="text-md text-text-base">
            Manage your finances and track your monthly expenses...
          </span>
        </div>
        {/* Date range */}
        <div className="max-w-max">
          <Button variant="outline" className="rounded-full!">
            <span className="text-xs font-semibold">
              01 January 2026 - 31 January 2026
            </span>{" "}
            <ChevronDown className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 mt-8">
        {/* Overview cards */}
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
