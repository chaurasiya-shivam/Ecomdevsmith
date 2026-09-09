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
  ShieldCheck,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CartView() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
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

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setInputCode("");
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-muted text-muted-foreground mb-6">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Your Cart is Empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Looks like you haven't added any gear or acoustics to your bag yet.
        </p>
        <Button asChild size="lg" className="mt-8 rounded-full px-8">
          <Link href="/products" className="gap-2">
            <span>Explore Collection</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 py-10 sm:py-16 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Shopping Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Cart Items Table/List */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <div className="divide-y divide-border">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${index}`}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-muted border border-border">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover object-center"
                        />
                      </div>

                      <div>
                        <Link
                          href={`/products/${item.product.slug || item.product.id}`}
                          className="font-bold text-foreground hover:text-primary text-sm sm:text-base line-clamp-1 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.selectedColor ? `Color: ${item.selectedColor}` : ""}
                          {item.selectedSize ? ` • Size: ${item.selectedSize}` : ""}
                        </p>
                        <p className="text-xs font-semibold text-muted-foreground mt-1 sm:hidden">
                          {formatPrice(item.product.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full sm:w-auto items-center justify-between sm:gap-8">
                      <div className="flex items-center rounded-xl border border-border bg-muted/50 px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedColor,
                              item.selectedSize
                            )
                          }
                          className="p-1 text-muted-foreground hover:text-foreground"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-foreground">
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
                          className="p-1 text-muted-foreground hover:text-foreground"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-extrabold text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-card-foreground mb-6">
                Order Summary
              </h2>

              {/* Promo code form */}
              {promoCode ? (
                <div className="mb-6 flex items-center justify-between rounded-xl bg-emerald-500/10 px-3.5 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    <span>Coupon {promoCode} applied ({discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="font-bold underline hover:opacity-80"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="mb-6 flex gap-2">
                  <Input
                    placeholder="Coupon code (e.g. DEVSMITH20)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="h-10 text-xs font-mono uppercase"
                  />
                  <Button type="submit" variant="outline" size="sm" className="h-10 text-xs font-semibold px-4">
                    Apply
                  </Button>
                </form>
              )}

              {promoMessage && (
                <p
                  className={`mb-4 text-xs ${promoMessage.isError ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"
                    }`}
                >
                  {promoMessage.text}
                </p>
              )}

              <div className="space-y-3 border-t border-border pt-6 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-foreground">
                    {shippingFee === 0 ? "Complimentary (Free)" : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-foreground">
                  <span>Total Due</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                onClick={() => router.push("/checkout")}
                size="lg"
                className="mt-6 w-full rounded-2xl h-12 shadow-md gap-2 font-bold text-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Risk-free 30-day trial & zero-hassle returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
