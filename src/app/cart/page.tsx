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

export default function CartPage() {
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
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400 mb-6">
          <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950">Your Cart is Empty</h1>
        <p className="mt-2 text-sm text-slate-500">
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
    <div className="bg-slate-50/50 py-10 sm:py-16 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Shopping Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Cart Items Table/List */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
              <div className="divide-y divide-slate-100">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${index}`}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100 border border-slate-100">
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
                          className="font-bold text-slate-900 hover:text-slate-600 text-sm sm:text-base line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.selectedColor ? `Color: ${item.selectedColor}` : ""}
                          {item.selectedSize ? ` • Size: ${item.selectedSize}` : ""}
                        </p>
                        <p className="text-xs font-semibold text-slate-700 mt-1 sm:hidden">
                          {formatPrice(item.product.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full sm:w-auto items-center justify-between sm:gap-8">
                      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-2 py-1">
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
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-900">
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
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-extrabold text-slate-950">
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
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
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
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-950 mb-6">
                Order Summary
              </h2>

              {/* Promo code form */}
              {promoCode ? (
                <div className="mb-6 flex items-center justify-between rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    <span>Coupon {promoCode} applied ({discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="font-bold underline hover:text-emerald-950"
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
                  className={`mb-4 text-xs ${
                    promoMessage.isError ? "text-red-500" : "text-emerald-600"
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}

              <div className="space-y-3 border-t border-slate-100 pt-6 text-xs text-slate-600">
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
                    {shippingFee === 0 ? "Complimentary (Free)" : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-bold text-slate-950">
                  <span>Total Due</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                onClick={() => router.push("/checkout")}
                size="lg"
                className="mt-6 w-full rounded-2xl h-12 shadow-md gap-2 font-bold text-sm bg-slate-950 hover:bg-slate-800 text-white"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Risk-free 30-day trial & zero-hassle returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
