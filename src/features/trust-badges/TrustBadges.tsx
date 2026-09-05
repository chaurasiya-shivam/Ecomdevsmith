import React from "react";
import { Truck, ShieldCheck, RefreshCw, Headphones, Award, Zap } from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";

const iconMap = {
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Award,
  Zap,
};

export default function TrustBadges() {
  const { perks } = ecommerceConfig;

  return (
    <section aria-label="Customer Guarantees and Trust" className="border-y border-slate-200/80 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk) => {
            const IconComponent = iconMap[perk.icon] || ShieldCheck;

            return (
              <div
                key={perk.id}
                className="group flex items-start gap-4 rounded-2xl p-4 transition-all duration-300 hover:bg-slate-50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md shadow-slate-900/10 transition-transform duration-300 group-hover:scale-110">
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {perk.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
