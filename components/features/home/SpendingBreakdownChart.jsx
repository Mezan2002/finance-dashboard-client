/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SpendingBreakdownChart = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const series = [44, 55, 13, 33, 22, 11];
  const labels = ["Food", "Rent", "Entertainment", "Travel", "Health", "Other"];

  const options = {
    chart: {
      type: "donut",
      fontFamily: "var(--font-montserrat)",
      background: "transparent",
      selection: {
        enabled: false,
      },
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
    labels: labels,
    colors: ["#F43F5E", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#64748B"],
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontSize: "12px",
      labels: {
        colors: mounted && theme === "dark" ? "#ededed" : "#171717",
      },
    },
    theme: {
      mode: mounted && theme === "dark" ? "dark" : "light",
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Spent",
              fontSize: "14px",
              color: mounted && theme === "dark" ? "#a6a6a6" : "#4d4d4d",
              formatter: () => `$4,250`,
            },
            name: {
              fontSize: "14px",
              color: mounted && theme === "dark" ? "#a6a6a6" : "#4d4d4d",
            },
            value: {
              fontSize: "20px",
              fontWeight: 600,
              color: mounted && theme === "dark" ? "#ededed" : "#171717",
              formatter: (val) => `$${val}`,
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val}`,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="bg-background rounded-2xl p-6 col-span-4 flex flex-col">
      <div className="mb-4">
        <h5 className="text-xl font-semibold">Spending Breakdown</h5>
        <p className="text-sm text-text-base">Categorical expenses summary</p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Chart options={options} series={series} type="donut" width="100%" />
      </div>
    </div>
  );
};

export default SpendingBreakdownChart;
