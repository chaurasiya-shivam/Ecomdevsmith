"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles } from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  const { newsletter } = ecommerceConfig;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:p-16 lg:p-20 text-white text-center">
          {/* Subtle glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-slate-700/50 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-slate-200 backdrop-blur-md mb-4">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>{newsletter.badge}</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              {newsletter.title}
            </h2>

            <p className="mt-4 text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
              {newsletter.subtitle}
            </p>

            {submitted ? (
              <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-white/10 p-4 text-emerald-400 backdrop-blur-md animate-fade-in">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  You are subscribed! Welcome to the {ecommerceConfig.store.name} community.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder={newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-slate-400 backdrop-blur-md focus:border-white focus:bg-white/15 focus:outline-none transition-all"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full sm:w-auto rounded-2xl px-6 bg-white text-slate-950 hover:bg-slate-100 font-bold gap-2 shrink-0"
                >
                  <span>{newsletter.buttonText}</span>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}

            {/* Newsletter Perks */}
            {newsletter.perks && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
                {newsletter.perks.map((perk, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                    {perk}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-6 text-[11px] text-slate-400">
              {newsletter.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
