"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Truck,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
  Check,
  ChevronRight,
  Minus,
  Plus,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { Product } from "@/types/ecommerce";
import { ecommerceConfig } from "@/../devsmith.config";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const { addToCart, setIsDrawerOpen } = useCart();

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0]?.name || ""
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  const discountPercent = calculateDiscount(product.price, product.originalPrice);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push("/checkout");
  };

  // Find related products in same category
  const relatedProducts = ecommerceConfig.products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link
            href={`/products?category=${product.category}`}
            className="capitalize hover:text-slate-900 transition-colors"
          >
            {product.category.replace("-", " ")}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="font-semibold text-slate-900 truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Product Images Gallery */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            {/* Main Active Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-sm">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-all duration-300"
              />

              {/* Badges Overlay */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {product.badge && (
                  <Badge className="bg-slate-950 text-white font-bold text-xs uppercase px-3 py-1">
                    {product.badge}
                  </Badge>
                )}
                {discountPercent > 0 && (
                  <Badge variant="destructive" className="bg-red-500 font-bold text-xs">
                    Save {discountPercent}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Carousel / List */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                      selectedImage === img
                        ? "border-slate-950 shadow-md ring-2 ring-slate-950/20"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Purchase Config */}
          <div className="flex flex-col lg:col-span-5">
            {/* Category & Ratings */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {product.category.replace("-", " ")}
              </span>
              <StarRating
                rating={product.rating}
                size="md"
                showNumber
                reviewCount={product.reviewCount}
              />
            </div>

            {/* Title */}
            <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-950">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.inStock ? (
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  In Stock ({product.stockCount || 10} available)
                </span>
              ) : (
                <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                  Backorder
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-6 text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatch Picker */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Color: <span className="font-semibold text-slate-600">{selectedColor}</span>
                  </label>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                        selectedColor === c.name
                          ? "border-slate-950 ring-2 ring-slate-950/20 scale-105"
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                      aria-label={`Select color ${c.name}`}
                    >
                      <span
                        className="h-7 w-7 rounded-full shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Variant Picker */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6 border-t border-slate-100 pt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Dimensions / Size: <span className="font-semibold text-slate-600">{selectedSize}</span>
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSize(s.name)}
                      className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                        selectedSize === s.name
                          ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex h-12 items-center rounded-2xl border border-slate-200 bg-slate-50 px-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-white hover:text-slate-950 disabled:opacity-30 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-white hover:text-slate-950 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 rounded-2xl h-12 shadow-md gap-2 font-semibold text-sm bg-slate-950 hover:bg-slate-800"
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Instant Buy Now Button */}
              <Button
                onClick={handleBuyNow}
                variant="outline"
                size="lg"
                className="w-full rounded-2xl h-12 border-slate-300 font-semibold text-sm hover:bg-slate-100"
              >
                Instant Checkout
              </Button>
            </div>

            {/* Value Highlights */}
            <div className="mt-8 space-y-3 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Truck className="h-4 w-4 text-slate-800" />
                <span>Complimentary express delivery on orders over $75</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="h-4 w-4 text-slate-800" />
                <span>30-day risk-free home testing & return guarantee</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-slate-800" />
                <span>2-year certified comprehensive hardware warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature List & Technical Specifications Tabs */}
        <div className="mt-16 border-t border-slate-200/80 pt-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Feature Bullets */}
            {product.features && (
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-4">
                  Engineering & Performance
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications */}
            {product.specifications && (
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-4">
                  Technical Specifications
                </h3>
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <tbody>
                      {product.specifications.map((spec, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? "bg-slate-50/70" : "bg-white"}
                        >
                          <td className="px-4 py-3 font-semibold text-slate-900 w-1/3">
                            {spec.label}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-slate-200/80 pt-16">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 mb-8">
              Complete Your Studio
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
