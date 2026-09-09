import type { Metadata } from "next";
import { CartView } from "@/features/cart";
import { ecommerceConfig } from "@/../devsmith.config";

export const metadata: Metadata = {
  title: `Shopping Cart | ${ecommerceConfig.store.name}`,
  description: `Manage your cart and proceed to checkout on ${ecommerceConfig.store.name}.`,
};

export default function CartPage() {
  return <CartView />;
}
