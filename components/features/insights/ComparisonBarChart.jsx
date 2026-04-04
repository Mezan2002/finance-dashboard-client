/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useTransactions } from "@/providers/TransactionProvider";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ComparisonBarChart = () => {
  const { theme } = useTheme();
  const { transactions } = useTransactions();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate dynamic 6-month comparison
  const { series, categories } = useMemo(() => {
    const months = [];
    const now = new Date();
    
    // Generate last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        label: d.toLocaleString("default", { month: "short" }),
        month: d.getMonth(),
        year: d.getFullYear(),
        income: 0,
        expense: 0,
      });
    }

    // Aggregate data
    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      const match = months.find(
        (m) => m.month === txDate.getMonth() && m.year === txDate.getFullYear()
      );
      if (match) {
        if (tx.type === "income") match.income += tx.amount;
        else match.expense += Math.abs(tx.amount);
      }
    });

    return {
      series: [
        { name: "Income", data: months.map((m) => m.income) },
        { name: "Expense", data: months.map((m) => m.expense) },
      ],
      categories: months.map((m) => m.label),
    };
  }, [transactions]);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      background: "transparent",
      toolbar: {
        show: false,
      },
      fontFamily: "var(--font-montserrat)",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 6,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: mounted && theme === "dark" ? "#999999" : "#a6a6a6",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Monthly Comparison ($)",
        style: {
          color: mounted && theme === "dark" ? "#999999" : "#a6a6a6",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
      labels: {
        style: {
          colors: mounted && theme === "dark" ? "#999999" : "#a6a6a6",
          fontSize: "12px",
        },
        formatter: (val) => `${(val / 1000).toFixed(1)}k`,
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#10B981", "#F43F5E"],
    grid: {
      show: false,
    },
    tooltip: {
      theme: mounted && theme === "dark" ? "dark" : "light",
      y: {
        formatter: (val) => `$${val.toLocaleString()}`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: mounted && theme === "dark" ? "#ededed" : "#171717",
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
  };

  return (
    <div className="bg-background rounded-3xl p-6 border border-border-color shadow-sm h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h5 className="text-xl font-bold">Monthly Comparison</h5>
          <p className="text-sm text-text-base">Income vs Expenses Analysis</p>
        </div>
      </div>
      <div className="h-[300px] w-full">
        {mounted && (
          <Chart options={options} series={series} type="bar" height="100%" />
        )}
      </div>
    </div>
  );
};

export default ComparisonBarChart;
