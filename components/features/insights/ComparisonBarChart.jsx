/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ComparisonBarChart = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const series = [
    {
      name: "Income",
      data: [4400, 5500, 4100, 6700, 2200, 4300],
    },
    {
      name: "Expense",
      data: [3300, 3200, 3300, 5200, 1300, 4300],
    },
  ];

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
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
        <Chart options={options} series={series} type="bar" height="100%" />
      </div>
    </div>
  );
};

export default ComparisonBarChart;
