/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTransactions } from "@/providers/TransactionProvider";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SpendingBreakdownChart = () => {
  const { theme } = useTheme();
  const { transactions } = useTransactions();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate categorical data
  const data = useMemo(() => {
    const expenses = transactions.filter((tx) => tx.type === "expense");
    const categories = {};
    expenses.forEach((tx) => {
      categories[tx.category] =
        (categories[tx.category] || 0) + Math.abs(tx.amount);
    });
    return categories;
  }, [transactions]);

  const series = Object.values(data);
  const labels = Object.keys(data);
  const totalSpent = series.reduce((acc, val) => acc + val, 0);

  const options = {
    chart: {
      type: "donut",
      fontFamily: "var(--font-montserrat)",
      background: "transparent",
      selection: {
        enabled: false,
      },
      toolbar: {
        show: false,
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
      fontSize: "11px",
      offsetY: 0,
      itemMargin: {
        horizontal: 8,
        vertical: 4,
      },
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
          size: "72%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Spent",
              fontSize: "12px",
              color: mounted && theme === "dark" ? "#a6a6a6" : "#4d4d4d",
              formatter: () => `$${totalSpent.toLocaleString()}`,
            },
            name: {
              fontSize: "12px",
              color: mounted && theme === "dark" ? "#a6a6a6" : "#4d4d4d",
            },
            value: {
              fontSize: "18px",
              fontWeight: 700,
              color: mounted && theme === "dark" ? "#ededed" : "#171717",
              formatter: (val) => `$${val.toLocaleString()}`,
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          legend: {
            position: "bottom",
            fontSize: "10px",
          },
          plotOptions: {
            pie: {
              donut: {
                size: "65%",
              },
            },
          },
        },
      },
    ],
  };

  return (
    <div className="bg-background rounded-3xl p-6 lg:col-span-4 col-span-12 flex flex-col min-h-[400px]">
      <div className="mb-4">
        <h5 className="text-xl font-semibold">Spending Breakdown</h5>
        <p className="text-sm text-text-base">Categorical expenses summary</p>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        {mounted && labels.length > 0 ? (
          <Chart options={options} series={series} type="donut" width="100%" />
        ) : mounted && labels.length === 0 ? (
          <div className="text-text-base text-sm">
            No expenses recorded yet.
          </div>
        ) : (
          <div className="animate-pulse bg-app-inner-bg size-48 rounded-full" />
        )}
      </div>
    </div>
  );
};

export default SpendingBreakdownChart;
