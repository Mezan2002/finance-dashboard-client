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
        opacityFrom: 0.35,
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
    <div className="bg-background rounded-3xl p-6 lg:col-span-3 md:col-span-6 col-span-12 relative overflow-hidden min-h-[240px]">
      <div>
        <h5 className="text-xl font-bold">Goals</h5>
        <p className="text-xs text-text-light font-medium tracking-wide uppercase opacity-70">
          Primary Savings Targets
        </p>
      </div>

      <div className="mt-6">
        <span className="text-[10px] uppercase tracking-[0.15em] text-text-light">
          Current Progress
        </span>
        <p className="text-3xl font-bold mt-1">$32,675.25</p>
      </div>

      <div className="absolute -bottom-6 -left-2 -right-2 w-[110%]">
        <Chart options={options} series={series} type="area" height={180} />
      </div>
    </div>
  );
};
export default PrimaryGoals;
