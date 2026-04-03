"use client";

import PageHeader from "@/components/shared/PageHeader";
import { Button, Input } from "@/components/ui";
import { useRole } from "@/providers/RoleProvider";
import { useTransactions } from "@/providers/TransactionProvider";
import {
  Filter,
  Search,
  TrendingDown,
  TrendingUp,
  Edit2,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import TransactionFormModal from "./TransactionFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const Transactions = () => {
  const { role } = useRole();
  const { 
    transactions, 
    filters, 
    setFilters, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction,
    ICON_MAP
  } = useTransactions();

  // Local UI stats for the table
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.merchant.toLowerCase().includes(filters.search.toLowerCase()) ||
        tx.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === "all" || tx.type === filters.type;
      return matchesSearch && matchesType;
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

  const onSave = (data) => {
    if (selectedTx) {
      updateTransaction({ ...selectedTx, ...data });
    } else {
      addTransaction(data);
    }
  };

  const onConfirmDelete = (tx) => {
    deleteTransaction(tx.id);
  };

  return (
    <section className="pb-20 space-y-8">
      <PageHeader
        title="Transactions Activity"
        description="Detailed breakdown of your financial history and activity..."
        onAddClick={handleCreate}
      />

      <div className="space-y-6">
        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-app-inner-bg p-1 rounded-xl w-max border border-border-color">
            {["all", "income", "expense"].map((type) => (
              <button
                key={type}
                onClick={() => setFilters({ ...filters, type })}
                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all border border-transparent ${
                  filters.type === type
                    ? "bg-background text-foreground border-border-color shadow-sm"
                    : "text-text-base hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Input
              placeholder="Search merchant or category..."
              icon={Search}
              className="w-full md:w-72"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
            <Button variant="outline" className="w-max! px-3! py-2.5! mt-0!">
              <Filter className="size-5" />
            </Button>
          </div>
        </div>

        {/* Transactions List Table */}
        <div className="bg-background rounded-xl border border-border-color overflow-hidden">
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
                {filteredTransactions.map((tx) => {
                  const Icon = ICON_MAP[tx.iconName] || Search;
                  return (
                    <tr
                      key={tx.id}
                      className="hover:bg-app-inner-bg/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4 text-nowrap">
                          <div className="size-11 rounded-full bg-app-inner-bg flex items-center justify-center border border-border-color">
                            <Icon className="size-5 text-text-base" />
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
                          tx.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <div className="flex items-center justify-end gap-1">
                          {tx.type === "income" ? (
                            <TrendingDown className="size-4" />
                          ) : (
                            <TrendingUp className="size-4" />
                          )}
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
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={role === "admin" ? 5 : 4}
                      className="px-6 py-12 text-center text-text-light"
                    >
                      No matching transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TransactionFormModal
        key={isFormOpen ? `form-${selectedTx?.id || "new"}` : "form-closed"}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={onSave}
        transaction={selectedTx}
      />
      <DeleteConfirmationModal
        key={isDeleteOpen ? `del-${selectedTx?.id || "none"}` : "del-closed"}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={onConfirmDelete}
        transaction={selectedTx}
      />
    </section>
  );
};

export default Transactions;
