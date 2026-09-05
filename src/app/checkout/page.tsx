import type { Metadata } from "next";
import { CheckoutView } from "@/features/checkout";
import { ecommerceConfig } from "@/../devsmith.config";

export const metadata: Metadata = {
  title: `Secure Checkout | ${ecommerceConfig.store.name}`,
  description: "Complete your order with 256-bit encrypted checkout.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
