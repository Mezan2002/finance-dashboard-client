"use client";

import { Button, Input, Modal, Select } from "@/components/ui";
import { useState } from "react";

const CATEGORIES = [
  "Shopping",
  "Freelancing",
  "Food",
  "Rent",
  "Entertainment",
  "Subscriptions",
  "Salary",
  "Other",
];

const TransactionFormModal = ({ isOpen, onClose, onSave, transaction }) => {
  const [formData, setFormData] = useState({
    merchant: transaction?.merchant || "",
    amount: transaction?.amount ? Math.abs(transaction.amount) : "",
    category: transaction?.category || "Shopping",
    type: transaction?.type || "expense",
    date: transaction?.date || new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={transaction ? "Edit Transaction" : "Create Transaction"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-xs font-bold uppercase text-text-light mb-2 block">
            Merchant / Description
          </label>
          <Input
            placeholder="e.g. Apple Store"
            value={formData.merchant}
            onChange={(e) =>
              setFormData({ ...formData, merchant: e.target.value })
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase text-text-light mb-2 block">
              Amount ($)
            </label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-text-light mb-2 block">
              Date
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-text-light mb-2 block">
            Category
          </label>
          <Select
            options={CATEGORIES}
            value={formData.category}
            onChange={(val) => setFormData({ ...formData, category: val })}
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-text-light mb-2 block">
            Transaction Type
          </label>
          <div className="flex items-center gap-2 bg-app-inner-bg p-1 rounded-xl border border-border-color">
            {["income", "expense"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, type })}
                className={`flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-all border border-transparent duration-200 ${
                  formData.type === type
                    ? "bg-background text-foreground shadow-lg border-border-color!"
                    : "text-text-base hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 mt-0!"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1 mt-0!">
            {transaction ? "Save Changes" : "Create Transaction"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TransactionFormModal;
