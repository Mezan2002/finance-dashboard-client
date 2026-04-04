"use client";

import { Button, Modal } from "@/components/ui";
import { Trash2, Loader2 } from "lucide-react";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  transaction,
  isMutating,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Transaction">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="size-16 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
          <Trash2 className="size-8 text-rose-500" />
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-bold text-foreground">Are you sure?</h4>
          <p className="text-sm text-text-base leading-relaxed">
            You are about to delete the transaction from{" "}
            <span className="font-bold text-foreground">
              {transaction?.merchant}
            </span>
            . This action cannot be undone.
          </p>
        </div>

        <div className="w-full pt-6 flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 mt-0!"
            onClick={onClose}
            disabled={isMutating}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 mt-0! bg-rose-500 hover:bg-rose-600 text-white border-transparent gap-2"
            onClick={() => {
              onConfirm(transaction);
            }}
            disabled={isMutating}
          >
            {isMutating && <Loader2 className="size-4 animate-spin" />}
            Delete Permanently
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
