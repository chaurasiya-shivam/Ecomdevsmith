import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";

export default function CategoryShowcase() {
  const { categories } = ecommerceConfig;

  return (
    <section className="bg-slate-50/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Curated Collections
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Shop By Category
            </h2>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-slate-600 transition-colors"
          >
            <span>Browse All Items</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative flex h-96 flex-col justify-end overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/50"
            >
              {/* Category Background Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-80"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Category Content */}
              <div className="relative z-10">
                {category.productCount !== undefined && (
                  <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-md mb-2">
                    {category.productCount} Products
                  </span>
                )}
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-amber-300">
                  {category.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-300">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-white">
                  <span>Explore Collection</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
