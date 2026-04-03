"use client";

import ComparisonBarChart from "@/components/features/insights/ComparisonBarChart";
import HighestSpendCategory from "@/components/features/insights/HighestSpendCategory";
import Observations from "@/components/features/insights/Observations";
import PageHeader from "@/components/shared/PageHeader";

const Insights = () => {
  return (
    <section className="pb-20 space-y-8">
      <PageHeader
        title="Financial Insights"
        description="Analyzing your spending patterns and trends to optimize your finances..."
      />

      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-8">
          <ComparisonBarChart />
        </div>

        <HighestSpendCategory />
      </div>

      <div className="grid grid-cols-12 gap-3">
        <Observations />
      </div>
    </section>
  );
};

export default Insights;
