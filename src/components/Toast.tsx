"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, ShoppingBag, X } from "lucide-react";

export const ToastNotification: React.FC = () => {
  const { notification, dismissNotification, setIsDrawerOpen } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur-md transition-all duration-300 animate-fade-in">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
        <CheckCircle2 className="h-5 w-5" />
      </div>
      <div className="flex-1 text-sm font-medium text-slate-100">
        {notification}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setIsDrawerOpen(true);
            dismissNotification();
          }}
          className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          View Cart
        </button>
        <button
          onClick={dismissNotification}
          className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
