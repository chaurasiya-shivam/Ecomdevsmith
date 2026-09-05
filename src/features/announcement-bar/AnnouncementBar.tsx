"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const announcement = ecommerceConfig.store.announcement;

  if (!announcement?.enabled || !isVisible) return null;

  return (
    <aside aria-label="Announcement" className="relative z-40 bg-slate-950 px-4 py-2 text-center text-xs font-medium text-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
        <span>{announcement.text}</span>
        {announcement.linkText && (
          <Link
            href={announcement.linkHref || "/products"}
            className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 font-bold tracking-wider text-amber-300 hover:bg-white/20 hover:text-amber-200 transition-colors"
          >
            <span>{announcement.linkText}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-white transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </aside>
  );
}
