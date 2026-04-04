"use client";

import PageHeader from "@/components/shared/PageHeader";
import { Button, Input, Select } from "@/components/ui";
import { useRole } from "@/providers/RoleProvider";
import { useTransactions } from "@/providers/TransactionProvider";
import { exportToCSV, exportToJSON } from "@/utils/exportUtils";
import {
  Edit2,
  FileJson,
  FileSpreadsheet,
  Filter,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import TransactionFormModal from "./TransactionFormModal";

const Transactions = () => {
  const { role } = useRole();
  const {
    transactions,
    isLoading,
    isMutating,
    filters,
    setFilters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    ICON_MAP,
    CATEGORIES,
  } = useTransactions();

  // Local UI states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Search
      const matchesSearch =
        tx.merchant.toLowerCase().includes(filters.search.toLowerCase()) ||
        tx.category.toLowerCase().includes(filters.search.toLowerCase());

      // Type
      const matchesType = filters.type === "all" || tx.type === filters.type;

      // Category
      const matchesCategory =
        filters.category === "all" || tx.category === filters.category;

      // Date Range
      const matchesDate = (() => {
        if (filters.dateRange === "all") return true;
        const txDate = new Date(tx.date);
        const now = new Date();
        if (filters.dateRange === "this-month") {
          return (
            txDate.getMonth() === now.getMonth() &&
            txDate.getFullYear() === now.getFullYear()
          );
        }
        if (filters.dateRange === "last-month") {
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          return (
            txDate.getMonth() === lastMonth.getMonth() &&
            txDate.getFullYear() === lastMonth.getFullYear()
          );
        }
        if (filters.dateRange === "last-90") {
          const ninetyDaysAgo = new Date();
          ninetyDaysAgo.setDate(now.getDate() - 90);
          return txDate >= ninetyDaysAgo;
        }
        return true;
      })();

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [transactions, filters]);

  const handleEdit = (tx) => {
    setSelectedTx(tx);
    setIsFormOpen(true);
  };

  const handleDelete = (tx) => {
    setSelectedTx(tx);
    setIsDeleteOpen(true);
  };

  const handleCreate = () => {
    setSelectedTx(null);
    setIsFormOpen(true);
  };

  const onSave = async (data) => {
    if (selectedTx) {
      await updateTransaction({ ...selectedTx, ...data });
    } else {
      await addTransaction(data);
    }
    setIsFormOpen(false);
  };

  const onConfirmDelete = async (tx) => {
    await deleteTransaction(tx.id);
    setIsDeleteOpen(false);
  };

  return (
    <section className="pb-20 space-y-8">
      <PageHeader
        title="Transactions Activity"
        description="Detailed breakdown of your financial history and activity..."
        onAddClick={handleCreate}
        className="mb-0"
      />

      <div className="space-y-6">
        {/* Stable Full-Width Filter & Export Bar */}
        <div className="bg-background p-6 rounded-2xl border border-border-color shadow-sm w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
          {/* Filters */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-light ml-1">
              Search
            </label>
            <Input
              placeholder="Merchant or category..."
              icon={Search}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="bg-app-inner-bg/50 h-11"
            />
          </div>

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

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-light ml-1">
              Category
            </label>
            <Select
              value={filters.category}
              onChange={(val) => setFilters({ ...filters, category: val })}
              options={[
                { value: "all", label: "All Categories" },
                ...(CATEGORIES || []).map((c) => ({ value: c, label: c })),
              ]}
              className="bg-app-inner-bg/50 h-11"
            />
          </div>

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

          {/* Export Group - Anchored Right */}
          <div className="space-y-1.5 lg:ml-auto w-full lg:w-fit">
            <label className="text-[10px] font-bold uppercase tracking-wider text-text-light ml-1 lg:text-right block">
              Export Data
            </label>
            <div className="flex bg-app-inner-bg/50 rounded-xl border border-border-color overflow-hidden h-11 min-w-[200px]">
              <button
                className="flex-1 flex items-center justify-center gap-2 text-xs font-bold hover:bg-background transition-all border-r border-border-color/60 whitespace-nowrap"
                onClick={() => exportToJSON(filteredTransactions)}
              >
                <FileJson className="size-4" />
                <span>JSON</span>
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 text-xs font-bold hover:bg-background transition-all whitespace-nowrap"
                onClick={() => exportToCSV(filteredTransactions)}
              >
                <FileSpreadsheet className="size-4" />
                <span>CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-background rounded-2xl border border-border-color overflow-hidden shadow-sm relative">
          {/* Mutating Overlay */}
          {isMutating && (
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] z-10 flex items-center justify-center animate-fade-in">
              <div className="bg-background p-4 rounded-2xl shadow-xl border border-border-color flex items-center gap-3 animate-scale-in">
                <Loader2 className="size-5 animate-spin text-app-accent" />
                <span className="text-sm font-bold">Updating Data...</span>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-app-inner-bg/50 border-b border-border-color">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light">
                    Transaction
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light text-right">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light text-center">
                    Status
                  </th>
                  {role === "admin" && (
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-light text-right">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {isLoading
                  ? // Initial Loading Skeletons
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={`skeleton-${i}`} className="animate-shimmer">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="size-11 rounded-full bg-app-inner-bg" />
                            <div className="space-y-2">
                              <div className="h-4 w-32 bg-app-inner-bg rounded" />
                              <div className="h-3 w-20 bg-app-inner-bg rounded" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 w-24 bg-app-inner-bg rounded" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 w-20 bg-app-inner-bg rounded ml-auto" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-6 w-20 bg-app-inner-bg rounded-full mx-auto" />
                        </td>
                        {role === "admin" && (
                          <td className="px-6 py-4">
                            <div className="h-8 w-20 bg-app-inner-bg rounded ml-auto" />
                          </td>
                        )}
                      </tr>
                    ))
                  : filteredTransactions.map((tx, index) => {
                      const Icon = ICON_MAP[tx.iconName] || Search;
                      return (
                        <tr
                          key={tx.id}
                          className="hover:bg-app-inner-bg/30 transition-colors group animate-fade-in-up"
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4 text-nowrap">
                              <div className="size-11 rounded-full bg-app-inner-bg flex items-center justify-center border border-border-color group-hover:border-app-accent/30 transition-all">
                                <Icon className="size-5 text-text-base group-hover:text-app-accent transition-colors" />
                              </div>
                              <div>
                                <p className="font-bold text-foreground">
                                  {tx.merchant}
                                </p>
                                <p className="text-xs text-text-base">
                                  {tx.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-text-base text-nowrap">
                            {tx.date}
                          </td>
                          <td
                            className={`px-6 py-4 text-right font-bold text-nowrap ${
                              tx.type === "income"
                                ? "text-green-600"
                                : "text-rose-600"
                            }`}
                          >
                            <div className="flex items-center justify-end gap-1">
                              {tx.type === "income" ? "+" : "-"}$
                              {Math.abs(tx.amount).toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 rounded-full bg-app-inner-bg text-[10px] font-bold uppercase tracking-wide border border-border-color text-text-base">
                              Completed
                            </span>
                          </td>
                          {role === "admin" && (
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(tx)}
                                  className="p-1.5 rounded-lg border border-border-color hover:bg-app-inner-bg text-text-base hover:text-foreground transition-all"
                                >
                                  <Edit2 className="size-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(tx)}
                                  className="p-1.5 rounded-lg border border-border-color hover:bg-rose-500/10 text-text-base hover:text-rose-500 transition-all"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                {!isLoading && filteredTransactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={role === "admin" ? 5 : 4}
                      className="px-6 py-20 text-center"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="size-16 rounded-full bg-app-inner-bg flex items-center justify-center">
                          <Filter className="size-8 text-text-light" />
                        </div>
                        <p className="font-bold text-lg">
                          No transactions found
                        </p>
                        <p className="text-sm text-text-base">
                          Try adjusting your filters or search terms.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-2"
                          onClick={() =>
                            setFilters({
                              search: "",
                              type: "all",
                              category: "all",
                              dateRange: "all",
                            })
                          }
                        >
                          Clear All Filters
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals with loading states */}
      <TransactionFormModal
        key={isFormOpen ? `form-${selectedTx?.id || "new"}` : "form-closed"}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={onSave}
        transaction={selectedTx}
        isMutating={isMutating}
      />
      <DeleteConfirmationModal
        key={isDeleteOpen ? `del-${selectedTx?.id || "none"}` : "del-closed"}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={onConfirmDelete}
        transaction={selectedTx}
        isMutating={isMutating}
      />
    </section>
  );
};

export default Transactions;
