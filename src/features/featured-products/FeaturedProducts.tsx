"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export default function FeaturedProducts() {
  const { products, categories } = ecommerceConfig;
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const featured = products.filter((p) => p.isFeatured);

  const displayedProducts =
    activeCategory === "all"
      ? featured
      : featured.filter((p) => p.category === activeCategory);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Studio Picks</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Featured Instruments & Gear
            </h2>
            <p className="mt-2 text-sm text-slate-500 max-w-xl">
              Precision-machined acoustic and tactile artifacts, engineered to empower deep creative focus.
            </p>
          </div>

          <Button asChild variant="outline" className="rounded-full gap-2">
            <Link href="/products">
              <span>View All ({products.length})</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            All Featured ({featured.length})
          </button>

          {categories.map((cat) => {
            const count = featured.filter((p) => p.category === cat.slug).length;
            if (count === 0) return null;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat.slug
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
