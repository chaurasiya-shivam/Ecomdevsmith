import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductGrid } from "@/features/product-grid";
import { ecommerceConfig } from "@/../devsmith.config";

export const metadata: Metadata = {
  title: `All Products | ${ecommerceConfig.store.name}`,
  description: `Browse the complete collection of ${ecommerceConfig.store.tagline.toLowerCase()}.`,
};

export default function ProductsPage() {
  return (
    <div className="bg-slate-50/30 min-h-screen">
      <div className="border-b border-slate-200/80 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Catalog & Collections
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            All Products
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-xl">
            Explore our precision-crafted hardware, acoustic drivers, and everyday essentials.
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-20 text-center text-sm text-slate-400">
            Loading products catalog...
          </div>
        }
      >
        <ProductGrid />
      </Suspense>
    </div>
  );
}
