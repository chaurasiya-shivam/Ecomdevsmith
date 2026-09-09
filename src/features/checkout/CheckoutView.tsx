"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Truck,
  CheckCircle2,
  CreditCard,
  ArrowRight,
  Sparkles,
  Tag,
  ChevronLeft,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ecommerceConfig } from "@/../devsmith.config";

export default function CheckoutView() {
  const router = useRouter();
  const {
    items,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    promoCode,
    discountPercent,
    applyPromoCode,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    email: "alex@example.com",
    firstName: "Alex",
    lastName: "Rivers",
    address: "742 Market Street, 8th Floor",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    cardNumber: "•••• •••• •••• 4242",
    cardExpiry: "12/28",
    cardCvc: "888",
  });

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [promoInput, setPromoInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const effectiveShippingFee = shippingMethod === "express" ? shippingFee + 15 : shippingFee;
  const grandTotal = Math.max(0, subtotal - discountAmount + effectiveShippingFee);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const prefix = ecommerceConfig.store.name.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4) || "ORD";
      const generatedOrder = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  if (orderComplete) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6 animate-fade-in">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
          Payment Confirmed
        </span>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl">
          Thank you for your order!
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Your order number is <strong className="text-slate-900 font-mono">{orderNumber}</strong>. We've sent a full receipt and tracking details to{" "}
          <span className="font-semibold text-slate-900">{formData.email}</span>.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 text-left text-sm space-y-2">
          <p className="font-semibold text-slate-900">Shipping To:</p>
          <p className="text-slate-600">
            {formData.firstName} {formData.lastName}<br />
            {formData.address}<br />
            {formData.city}, {formData.state} {formData.zipCode}
          </p>
          <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">
            Estimated dispatch: within 24 hours via carbon-neutral carrier.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Your bag is empty</h2>
        <p className="mt-2 text-sm text-slate-500">
          You don't have any items in your checkout session.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/products">Browse Collections</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Store</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              {/* Contact Information */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-950">
                    1. Contact Information
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
                    <Input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-950 mb-4">
                  2. Shipping Destination
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">First Name</label>
                    <Input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Last Name</label>
                    <Input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700">Street Address</label>
                    <Input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">City</label>
                    <Input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-700">State</label>
                      <Input
                        required
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700">Postal Code</label>
                      <Input
                        required
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Method Selector */}
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-900 block mb-3">
                    Delivery Speed
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setShippingMethod("standard")}
                      className={`flex flex-col rounded-2xl border p-4 text-left transition-all ${shippingMethod === "standard"
                        ? "border-slate-950 bg-slate-50/80 ring-2 ring-slate-950/10"
                        : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                      <span className="text-sm font-bold text-slate-900">Standard Global</span>
                      <span className="text-xs text-slate-500 mt-0.5">3-5 business days</span>
                      <span className="text-xs font-semibold text-emerald-600 mt-2">
                        {shippingFee === 0 ? "Free" : formatPrice(shippingFee)}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingMethod("express")}
                      className={`flex flex-col rounded-2xl border p-4 text-left transition-all ${shippingMethod === "express"
                        ? "border-slate-950 bg-slate-50/80 ring-2 ring-slate-950/10"
                        : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                      <span className="text-sm font-bold text-slate-900">Priority Courier</span>
                      <span className="text-xs text-slate-500 mt-0.5">Next-day guaranteed</span>
                      <span className="text-xs font-semibold text-slate-900 mt-2">
                        {formatPrice(shippingFee + 15)}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-950">
                    3. Secure Payment
                  </h2>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Lock className="h-3.5 w-3.5 text-emerald-600" />
                    <span>256-bit SSL</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Card Number</label>
                    <div className="relative mt-1">
                      <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        required
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="pl-10 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700">Expiration</label>
                      <Input
                        required
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="mt-1 font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700">CVC Code</label>
                      <Input
                        required
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="mt-1 font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full rounded-2xl h-14 text-base font-bold shadow-xl shadow-slate-900/10 gap-2 bg-slate-950 hover:bg-slate-800 text-white"
              >
                {isSubmitting ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <span>Place Order • {formatPrice(grandTotal)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-950 mb-6">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>

              {/* Items List */}
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover object-center"
                      />
                      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-semibold text-slate-900 line-clamp-1">
                        {item.product.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.selectedColor ? `Color: ${item.selectedColor}` : ""}
                        {item.selectedSize ? ` • Size: ${item.selectedSize}` : ""}
                      </span>
                    </div>

                    <span className="text-sm font-bold text-slate-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Code Box */}
              <div className="mt-6 border-t border-slate-100 pt-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (promoInput.trim()) {
                      applyPromoCode(promoInput);
                      setPromoInput("");
                    }
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder="Coupon (try DEVSMITH20)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="h-10 text-xs uppercase font-mono"
                  />
                  <Button type="submit" variant="outline" size="sm" className="h-10 text-xs font-semibold px-4">
                    Apply
                  </Button>
                </form>
              </div>

              {/* Price Breakdown */}
              <div className="mt-6 border-t border-slate-100 pt-6 space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({promoCode})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {effectiveShippingFee === 0 ? "Free" : formatPrice(effectiveShippingFee)}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-bold text-slate-950">
                  <span>Total Due</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 flex items-center justify-center gap-4 border-t border-slate-100 pt-4 text-slate-400 text-[11px]">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="h-4 w-4 text-slate-700" />
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
