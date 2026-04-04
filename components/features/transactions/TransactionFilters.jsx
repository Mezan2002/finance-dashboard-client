"use client";

import { Input, Select } from "@/components/ui";
import { FileJson, FileSpreadsheet, Search } from "lucide-react";

const TransactionFilters = ({
  filters,
  setFilters,
  categories,
  onExportJSON,
  onExportCSV,
}) => {
  return (
    <div className="bg-background p-6 rounded-2xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-end shadow-sm border border-border-color/50">
      {/* Search */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-text-light ml-1">
          Search
        </label>
        <Input
          placeholder="Merchant or category..."
          icon={Search}
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="bg-app-inner-bg/50 h-11"
        />
      </div>

      {/* Type Select */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-text-light ml-1">
          Type
        </label>
        <Select
          value={filters.type}
          onChange={(val) => setFilters({ ...filters, type: val })}
          options={[
            { value: "all", label: "All Types" },
            { value: "income", label: "Income Only" },
            { value: "expense", label: "Expenses Only" },
          ]}
          className="bg-app-inner-bg/50 h-11"
        />
      </div>

      {/* Category Select */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-text-light ml-1">
          Category
        </label>
        <Select
          value={filters.category}
          onChange={(val) => setFilters({ ...filters, category: val })}
          options={[
            { value: "all", label: "All Categories" },
            ...(categories || []).map((c) => ({ value: c, label: c })),
          ]}
          className="bg-app-inner-bg/50 h-11"
        />
      </div>

      {/* Period Select */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-text-light ml-1">
          Period
        </label>
        <Select
          value={filters.dateRange}
          onChange={(val) => setFilters({ ...filters, dateRange: val })}
          options={[
            { value: "all", label: "All Time" },
            { value: "this-month", label: "This Month" },
            { value: "last-month", label: "Last Month" },
            { value: "last-90", label: "Last 90 Days" },
          ]}
          className="bg-app-inner-bg/50 h-11"
        />
      </div>

      {/* Export Group */}
      <div className="space-y-1.5 lg:ml-auto w-full lg:w-fit">
        <label className="text-[10px] font-bold uppercase tracking-wider text-text-light ml-1 lg:text-right block">
          Export Data
        </label>
        <div className="flex bg-app-inner-bg/50 rounded-xl border border-border-color overflow-hidden h-11 min-w-[200px]">
          <button
            className="flex-1 flex items-center justify-center gap-2 text-xs font-bold hover:bg-app-inner-bg transition-all border-r border-border-color/60 whitespace-nowrap group"
            onClick={onExportJSON}
          >
            <FileJson className="size-4 text-app-accent opacity-60 group-hover:opacity-100 transition-opacity" />
            <span>JSON</span>
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 text-xs font-bold hover:bg-app-inner-bg transition-all whitespace-nowrap group"
            onClick={onExportCSV}
          >
            <FileSpreadsheet className="size-4 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span>CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
