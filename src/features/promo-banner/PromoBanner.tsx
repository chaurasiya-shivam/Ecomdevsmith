"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Copy, Check, Tag } from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";
import { Button } from "@/components/ui/button";

export default function PromoBanner() {
  const { promoBanner } = ecommerceConfig;
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoBanner.discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white shadow-2xl">
        {/* Background Radial Glow */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-slate-800/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="grid grid-cols-1 items-center lg:grid-cols-12">
          {/* Text & Coupon Column */}
          <div className="p-8 sm:p-12 lg:col-span-7 lg:p-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
              <Tag className="h-3.5 w-3.5" />
              <span>{promoBanner.badge}</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {promoBanner.title}
            </h2>

            <p className="mt-4 text-base text-slate-300 sm:text-lg max-w-xl leading-relaxed">
              {promoBanner.subtitle}
            </p>

            {/* Coupon Code Pill */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/90 p-1.5 pl-4 backdrop-blur-md">
                <span className="text-xs font-mono font-bold tracking-widest text-amber-400 mr-3">
                  {promoBanner.discountCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <Button
                asChild
                size="lg"
                className="rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-semibold gap-2"
              >
                <Link href={promoBanner.ctaHref}>
                  <span>{promoBanner.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              {promoBanner.expiresText}
            </p>
          </div>

          {/* Right Image Column */}
          <div className="relative h-72 lg:h-full lg:col-span-5 min-h-[340px]">
            <Image
              src={promoBanner.image}
              alt={promoBanner.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-950 lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
