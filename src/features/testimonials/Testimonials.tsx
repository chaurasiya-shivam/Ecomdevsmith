import React from "react";
import Image from "next/image";
import { CheckCircle2, Quote } from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";
import { StarRating } from "@/components/StarRating";

export default function Testimonials() {
  const { testimonials } = ecommerceConfig;

  return (
    <section className="bg-slate-50/70 py-16 sm:py-24 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Social Proof
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Trusted by Creators & Engineers
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Read authentic impressions from designers, architects, and audiophiles who use AURA daily.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-300"
            >
              <Quote className="h-8 w-8 text-slate-200 mb-4" />

              <p className="text-sm text-slate-700 leading-relaxed italic flex-1">
                "{item.comment}"
              </p>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-slate-200">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900">
                        {item.name}
                      </span>
                      {item.verifiedBuyer && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      )}
                    </div>
                    <span className="text-xs text-slate-500 block">
                      {item.role}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <StarRating rating={item.rating} size="sm" />
                  {item.productPurchased && (
                    <span className="text-[11px] font-medium text-slate-400">
                      Purchased {item.productPurchased}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
