/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const timeFilters = ["D", "W", "M", "Y"];

const dataMapping = {
  D: {
    series: [24200, 24100, 24300, 24250, 24400, 24300, 24350, 24300],
    categories: [
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
      "22:00",
    ],
  },
  W: {
    series: [22000, 23500, 22800, 24200, 25500, 24800, 24300],
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  M: {
    series: [
      12000, 14500, 13800, 16200, 15500, 18000, 17200, 19500, 21000, 20500,
      22800, 24300,
    ],
    categories: [
      "Jan 01",
      "Jan 03",
      "Jan 06",
      "Jan 09",
      "Jan 12",
      "Jan 15",
      "Jan 18",
      "Jan 21",
      "Jan 24",
      "Jan 27",
      "Jan 30",
      "Jan 31",
    ],
  },
  Y: {
    series: [
      15000, 18000, 21000, 24000, 23000, 27000, 30000, 34000, 31000, 38000,
      42000, 45000,
    ],
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
};

const BalanceTrendChart = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("M");

  useEffect(() => {
    setMounted(true);
  }, []);

  const series = [
    {
      name: "Balance",
      data: dataMapping[activeFilter].series,
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
      categories: dataMapping[activeFilter].categories,
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        formatter: (val) => `$${val / 1000}k`,
        style: {
          colors: mounted && theme === "dark" ? "#999999" : "#a6a6a6",
          fontSize: "12px",
        },
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
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
            Your financial growth over the last{" "}
            {activeFilter === "D"
              ? "Day"
              : activeFilter === "W"
                ? "Week"
                : activeFilter === "M"
                  ? "Month"
                  : "Year"}
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex bg-app-inner-bg p-1 rounded-lg gap-1 border border-border-color">
          {timeFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all border border-transparent ${activeFilter === filter ? "bg-background text-foreground shadow-inner border-border-color!" : "text-text-base hover:text-foreground"}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[250px] w-full">
        <Chart options={options} series={series} type="area" height="100%" />
      </div>
    </div>
  );
};

export default BalanceTrendChart;
