"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PrimaryGoals = () => {
  const series = [
    {
      name: "Goals",
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35, 63, 40],
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 80,
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: true,
        easing: "linear",
        speed: 800,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    colors: ["#10B981"],
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div className="bg-background rounded-2xl p-4 col-span-3 relative overflow-hidden">
      <h5 className="text-xl font-semibold">Goals</h5>
      <p className="text-sm text-text-base">Manage your primary goals</p>

      <div className="mt-6 text-center">
        <span className="text-xs font-medium text-text-base">Total Goal</span>
        <p className="text-3xl font-semibold">$32,675.25</p>
      </div>

      <div className="-mx-4 absolute bottom-0 w-full">
        <Chart options={options} series={series} type="area" height={140} />
      </div>
    </div>
  );
};
export default PrimaryGoals;
