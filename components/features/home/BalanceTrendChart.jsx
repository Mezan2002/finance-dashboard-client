/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTransactions } from "@/providers/TransactionProvider";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const timeFilters = ["D", "W", "M", "Y"];

const BalanceTrendChart = () => {
  const { theme } = useTheme();
  const { transactions } = useTransactions();
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("M");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Process data based on transactions
  const chartData = useMemo(() => {
    if (!transactions.length) return { series: [], categories: [] };

    // Grouping by date for the active month (simplification for demo)
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    let currentBalance = 0;
    const dataPoints = sorted.map((tx) => {
      currentBalance += tx.amount;
      return {
        date: tx.date.split("-").slice(1).join("/"), // MM/DD format
        balance: currentBalance,
      };
    });

    return {
      series: dataPoints.map((d) => d.balance),
      categories: dataPoints.map((d) => d.date),
    };
  }, [transactions]);

  const series = [
    {
      name: "Balance",
      data: chartData.series,
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 300,
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      fontFamily: "var(--font-montserrat)",
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
    colors: ["#6366F1"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: chartData.categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: mounted && theme === "dark" ? "#999999" : "#a6a6a6",
          fontSize: "10px",
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        formatter: (val) => `$${(val / 1000).toFixed(1)}k`,
        style: {
          colors: mounted && theme === "dark" ? "#999999" : "#a6a6a6",
          fontSize: "12px",
        },
      },
    },
    grid: {
      show: true,
      borderColor: mounted && theme === "dark" ? "#262626" : "#f1f1f1",
      strokeDashArray: 4,
      padding: {
        left: 10,
        right: 10,
      },
    },
    tooltip: {
      theme: mounted && theme === "dark" ? "dark" : "light",
      x: {
        show: true,
      },
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
  };

  return (
    <div className="bg-background rounded-2xl p-6 col-span-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h5 className="text-xl font-semibold">Balance Trend</h5>
          <p className="text-sm text-text-base">
            Your cumulative financial growth
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex bg-app-inner-bg p-1 rounded-lg gap-1 border border-border-color">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all border border-transparent ${
                activeFilter === filter
                  ? "bg-background text-foreground shadow-inner border-border-color!"
                  : "text-text-base hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[250px] w-full flex items-center justify-center">
        {mounted && chartData.series.length > 0 ? (
          <Chart
            options={options}
            series={series}
            type="area"
            height="100%"
            width="100%"
          />
        ) : mounted ? (
          <p className="text-text-base text-sm">No trend data available.</p>
        ) : (
          <div className="animate-pulse bg-app-inner-bg w-full h-[200px] rounded-xl" />
        )}
      </div>
    </div>
  );
};

export default BalanceTrendChart;
