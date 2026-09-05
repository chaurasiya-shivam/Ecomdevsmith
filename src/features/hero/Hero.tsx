import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { hero } = ecommerceConfig;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-16 sm:py-24 lg:py-28">
      {/* Background Decorative Blur Orbs */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Copy & CTAs */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>{hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {hero.headline}{" "}
              <span className="bg-gradient-to-r from-slate-950 via-slate-700 to-slate-500 bg-clip-text text-transparent">
                {hero.highlightedHeadline}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl font-normal leading-relaxed">
              {hero.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full shadow-lg shadow-slate-950/15 gap-2 px-8">
                <Link href={hero.primaryCta.href}>
                  <span>{hero.primaryCta.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="rounded-full border-slate-300 hover:bg-slate-100/80">
                <Link href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </Link>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-slate-200/80 pt-8 sm:grid-cols-4 sm:gap-8 w-full">
              {hero.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs font-medium text-slate-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual & Floating Card */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-2xl shadow-slate-300/40">
              <Image
                src={hero.image}
                alt="AURA Collection Hero"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />

              {/* Floating Product Highlight Widget */}
              {hero.floatingCard && (
                <div className="absolute bottom-6 inset-x-6 rounded-2xl border border-white/20 bg-slate-950/80 p-4 text-white shadow-2xl backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">
                        {hero.floatingCard.title}
                      </p>
                      <p className="text-xs text-slate-300">
                        {hero.floatingCard.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-amber-300">
                        {hero.floatingCard.price}
                      </p>
                      <div className="flex items-center justify-end gap-1 text-[11px] text-slate-300">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span>{hero.floatingCard.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
