"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-background border border-border-color rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-border-color flex items-center justify-between bg-app-inner-bg/30">
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-border-color hover:bg-app-inner-bg text-text-base hover:text-foreground transition-all"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
