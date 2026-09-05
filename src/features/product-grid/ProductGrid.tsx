"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ArrowUpDown, X, Tag } from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialSaleOnly = searchParams.get("sale") === "true";

  const { products, categories } = ecommerceConfig;

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [saleOnly, setSaleOnly] = useState<boolean>(initialSaleOnly);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category")!);
    }
    if (searchParams.get("search")) {
      setSearchQuery(searchParams.get("search")!);
    }
    if (searchParams.get("sale")) {
      setSaleOnly(searchParams.get("sale") === "true");
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false;
        }

        // Sale filter
        if (saleOnly && (!p.originalPrice || p.originalPrice <= p.price)) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchCategory && !matchTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        // Default: featured first
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, saleOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSaleOnly(false);
    setSortBy("featured");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Controls Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-6 md:flex-row md:items-center md:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search all items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-10 text-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort & Sale toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setSaleOnly(!saleOnly)}
            className={`inline-flex items-center gap-1.5 rounded-2xl border px-3.5 py-2.5 text-xs font-semibold transition-colors shadow-sm ${
              saleOnly
                ? "border-red-500 bg-red-50 text-red-600"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Tag className="h-3.5 w-3.5" />
            <span>On Sale Only</span>
          </button>

          {/* Sort selector */}
          <div className="relative inline-flex items-center rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm text-xs font-semibold text-slate-700">
            <ArrowUpDown className="h-3.5 w-3.5 mr-2 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-800 outline-none cursor-pointer pr-2"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-5 no-scrollbar">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
            selectedCategory === "all"
              ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          All Categories ({products.length})
        </button>

        {categories.map((category) => {
          const count = products.filter((p) => p.category === category.slug).length;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.slug
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {category.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
        <p>
          Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span>{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </p>

        {(selectedCategory !== "all" || searchQuery || saleOnly) && (
          <button
            onClick={resetFilters}
            className="font-medium text-slate-900 underline underline-offset-4 hover:text-slate-600"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 py-16 px-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
            <SlidersHorizontal className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No items match your criteria</h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            Try adjusting your search query, clearing category filters, or browsing our full collection.
          </p>
          <Button onClick={resetFilters} variant="outline" className="mt-6 rounded-full">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
