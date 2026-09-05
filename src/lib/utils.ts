import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ecommerceConfig } from "@/../devsmith.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  amount: number,
  options?: {
    currency?: string;
    symbol?: string;
    position?: "prefix" | "suffix";
  }
): string {
  const symbol = options?.symbol ?? ecommerceConfig.store.currency.symbol ?? "$";
  const position = options?.position ?? ecommerceConfig.store.currency.position ?? "prefix";
  const formatted = amount.toFixed(ecommerceConfig.store.currency.decimals ?? 2);

  if (position === "suffix") {
    return `${formatted} ${symbol}`;
  }
  return `${symbol}${formatted}`;
}

export function calculateDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
