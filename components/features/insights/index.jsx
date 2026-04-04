"use client";

import ComparisonBarChart from "@/components/features/insights/ComparisonBarChart";
import HighestSpendCategory from "@/components/features/insights/HighestSpendCategory";
import Observations from "@/components/features/insights/Observations";
import PageHeader from "@/components/shared/PageHeader";

const Insights = () => {
  return (
    <section className="pb-5 space-y-8">
      <PageHeader
        title="Financial Insights"
        description="Analyzing your spending patterns and trends to optimize your finances..."
      />

      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-8 col-span-12 h-full">
          <ComparisonBarChart />
        </div>

        <HighestSpendCategory />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Observations />
      </div>
    </section>
  );
};

export default Insights;
