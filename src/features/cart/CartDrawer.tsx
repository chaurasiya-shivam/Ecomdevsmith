"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    itemCount,
    promoCode,
    discountPercent,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [promoMessage, setPromoMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const freeShippingThreshold = 75;
  const freeShippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setInputCode("");
  };

  const handleCheckout = () => {
    setIsDrawerOpen(false);
    router.push("/checkout");
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-lg">
        {/* Drawer Header */}
        <SheetHeader className="border-b border-slate-100 p-6 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-slate-900" />
              <SheetTitle className="text-lg font-bold text-slate-950">
                Your Bag
              </SheetTitle>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                {itemCount}
              </span>
            </div>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="mt-4 rounded-xl bg-slate-50 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">
                {remainingForFreeShipping > 0
                  ? `Add ${formatPrice(remainingForFreeShipping)} for Free Shipping`
                  : "🎉 You have earned Free Global Shipping!"}
              </span>
              <span className="font-bold text-slate-900">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-slate-900 transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        </SheetHeader>

        {/* Items List / Body */}
        {items.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 p-3 transition-colors hover:border-slate-200"
              >
                {/* Thumbnail */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.product.slug || item.product.id}`}
                        onClick={() => setIsDrawerOpen(false)}
                        className="text-sm font-semibold text-slate-900 hover:text-slate-600 line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() =>
                          removeFromCart(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Color / Size info */}
                    <div className="mt-0.5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {item.selectedColor && (
                        <span>Color: {item.selectedColor}</span>
                      )}
                      {item.selectedSize && (
                        <span>Size: {item.selectedSize}</span>
                      )}
                    </div>
                  </div>

                  {/* Pricing and Qty Controls */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-0.5">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="p-1 text-slate-600 hover:text-slate-900"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="p-1 text-slate-600 hover:text-slate-900"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-slate-950">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code Form */}
            <div className="border-t border-slate-100 pt-4">
              {promoCode ? (
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    <span>Coupon {promoCode} ({discountPercent}% off applied)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="font-bold underline hover:text-emerald-950"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. DEVSMITH20)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="h-9 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-xs uppercase placeholder:normal-case focus:border-slate-900 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    className="h-9 rounded-xl text-xs font-semibold px-4"
                  >
                    Apply
                  </Button>
                </form>
              )}

              {promoMessage && (
                <p
                  className={`mt-1.5 text-xs ${
                    promoMessage.isError ? "text-red-500" : "text-emerald-600"
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Empty Bag State */
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400 mb-4">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Your bag is empty</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-xs">
              Explore our collection of studio-grade acoustics and ergonomic workspace goods.
            </p>
            <Button
              onClick={() => {
                setIsDrawerOpen(false);
                router.push("/products");
              }}
              className="mt-6 rounded-full text-xs font-semibold px-6"
            >
              Start Shopping
            </Button>
          </div>
        )}

        {/* Drawer Footer with Calculations & Checkout */}
        {items.length > 0 && (
          <SheetFooter className="border-t border-slate-100 bg-slate-50/50 p-6 flex flex-col gap-4">
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-slate-900">
                  {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-bold text-slate-950">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              size="lg"
              className="w-full rounded-2xl h-12 shadow-lg gap-2 text-sm font-bold bg-slate-950 hover:bg-slate-800 text-white"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Link
              href="/cart"
              onClick={() => setIsDrawerOpen(false)}
              className="text-center text-xs font-medium text-slate-500 hover:text-slate-900 underline underline-offset-4"
            >
              View Full Cart Details
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
