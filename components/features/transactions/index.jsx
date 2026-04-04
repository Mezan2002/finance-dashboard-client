"use client";

import { useMemo, useState } from "react";

import { useRole } from "@/providers/RoleProvider";
import { useTransactions } from "@/providers/TransactionProvider";

import { exportToCSV, exportToJSON } from "@/utils/exportUtils";

import DeleteConfirmationModal from "@/components/features/transactions/DeleteConfirmationModal";
import TransactionDetailModal from "@/components/features/transactions/TransactionDetailModal";
import TransactionFilters from "@/components/features/transactions/TransactionFilters";
import TransactionFormModal from "@/components/features/transactions/TransactionFormModal";
import TransactionTable from "@/components/features/transactions/TransactionTable";
import PageHeader from "@/components/shared/PageHeader";

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
    CATEGORIES,
  } = useTransactions();

  // Local UI states for Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [selectedDetailTx, setSelectedDetailTx] = useState(null);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  // Centralized Filtering Logic
  const filteredTransactions = useMemo(() => {
    const list = transactions.filter((tx) => {
      const matchesSearch =
        tx.merchant.toLowerCase().includes(filters.search.toLowerCase()) ||
        tx.category.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType = filters.type === "all" || tx.type === filters.type;

      const matchesCategory =
        filters.category === "all" || tx.category === filters.category;

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

    return list.sort((a, b) => {
      if (sortConfig.key === "date") {
        const dA = new Date(a.date);
        const dB = new Date(b.date);
        return sortConfig.direction === "asc" ? dA - dB : dB - dA;
      }
      if (sortConfig.key === "amount") {
        return sortConfig.direction === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      return 0;
    });
  }, [transactions, filters, sortConfig]);

  // Handler Actions
  const handleEdit = (tx) => {
    setSelectedTx(tx);
    setIsFormOpen(true);
  };

  const handleDelete = (tx) => {
    setSelectedTx(tx);
    setIsDeleteOpen(true);
  };

  const handleViewDetail = (tx) => {
    setSelectedDetailTx(tx);
    setIsDetailOpen(true);
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

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "all",
      category: "all",
      dateRange: "all",
    });
  };

  return (
    <section className="pb-5 space-y-8">
      {/* Header with Role-Based "Add" Action */}
      <PageHeader
        title="Transactions Activity"
        description="Detailed breakdown of your financial history and activity..."
        onAddClick={handleCreate}
        className="mb-0"
      />

      <div className="space-y-6">
        {/* Modular Filter & Export Bar */}
        <TransactionFilters
          filters={filters}
          setFilters={setFilters}
          categories={CATEGORIES}
          onExportJSON={() => exportToJSON(filteredTransactions)}
          onExportCSV={() => exportToCSV(filteredTransactions)}
        />

        {/* Modular Transactions Table */}
        <TransactionTable
          transactions={filteredTransactions}
          isLoading={isLoading}
          isMutating={isMutating}
          sortConfig={sortConfig}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetail={handleViewDetail}
          role={role}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Modals */}
      <TransactionFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={onSave}
        transaction={selectedTx}
        isMutating={isMutating}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={onConfirmDelete}
        transaction={selectedTx}
        isMutating={isMutating}
      />
      <TransactionDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        transaction={selectedDetailTx}
      />
    </section>
  );
};

export default Transactions;
