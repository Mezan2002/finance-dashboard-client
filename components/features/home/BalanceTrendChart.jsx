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

  // Process data based on transactions and active filter
  const chartData = useMemo(() => {
    if (!transactions.length) return { series: [], categories: [] };

    const now = new Date();
    const filterDays = { D: 1, W: 7, M: 30, Y: 365 };

    const daysToLookBack = filterDays[activeFilter] || 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(now.getDate() - daysToLookBack);

    // Filter and sort by date
    const filtered = transactions
      .filter((tx) => new Date(tx.date) >= cutoffDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (filtered.length === 0) return { series: [], categories: [] };

    // Group by date to avoid overlaps
    const dailyTotals = filtered.reduce((acc, tx) => {
      if (!acc[tx.date]) acc[tx.date] = 0;
      acc[tx.date] += tx.amount;
      return acc;
    }, {});

    const sortedDates = Object.keys(dailyTotals).sort((a, b) => new Date(a) - new Date(b));

    let runningBalance = 0;
    const series = [];
    const categories = [];

    sortedDates.forEach((date) => {
      runningBalance += dailyTotals[date];
      series.push(runningBalance);
      categories.push(date.split("-").slice(1).join("/")); // MM/DD
    });

    return { series, categories };
  }, [transactions, activeFilter]);

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
    plotOptions: {
      area: {
        fillTo: "end", // Ensures gradient is always at the bottom
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
      tickAmount: 10,
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
        offsetX: -10,
        formatter: (val) => `$${(val / 1000).toFixed(1)}k`,
        style: {
          colors: mounted && theme === "dark" ? "#999999" : "#a6a6a6",
          fontSize: "12px",
        },
      },
    },
    grid: {
      show: false,
      padding: {
        left: 20,
        right: 0,
        bottom: 0,
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
    <div className="bg-background rounded-2xl col-span-8 overflow-hidden flex flex-col pt-6 border border-border-color shadow-sm">
      <div className="flex items-start justify-between px-6 mb-2">
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
                  ? "bg-background text-foreground shadow-inner border-shadow!"
                  : "text-text-base hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[250px] w-full mt-auto">
        {!mounted ? (
          <div className="animate-pulse bg-app-inner-bg w-full h-full" />
        ) : chartData.series.length > 0 ? (
          <Chart
            options={options}
            series={series}
            type="area"
            height="100%"
            width="100%"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 p-6 animate-fade-in">
            <div className="size-12 rounded-full bg-app-inner-bg flex items-center justify-center mb-2">
              <span className="text-2xl">📊</span>
            </div>
            <p className="font-bold text-sm">No Data Found</p>
            <p className="text-xs text-text-base text-center max-w-[200px]">
              We couldn&apos;t find any transactions for the selected period.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceTrendChart;
