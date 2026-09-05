"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types/ecommerce";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  priority = false,
}) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = React.useState(false);

  const discountPercent = calculateDiscount(product.price, product.originalPrice);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 ${
        className || ""
      }`}
    >
      {/* Image & Badges Container */}
      <Link
        href={`/products/${product.slug || product.id}`}
        className="relative block aspect-square w-full overflow-hidden bg-slate-100"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <Badge
              variant="default"
              className="bg-slate-900/90 text-white backdrop-blur-md text-[10px] uppercase font-bold tracking-wider px-2.5 py-1"
            >
              {product.badge}
            </Badge>
          )}
          {discountPercent > 0 && (
            <Badge
              variant="destructive"
              className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5"
            >
              -{discountPercent}%
            </Badge>
          )}
          {product.isNew && !product.badge && (
            <Badge
              variant="default"
              className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5"
            >
              NEW
            </Badge>
          )}
        </div>

        {/* Quick Add Overlay on hover for desktop */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden md:flex opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <Button
            onClick={handleQuickAdd}
            size="sm"
            className="w-full shadow-lg backdrop-blur-md bg-slate-900/95 hover:bg-slate-900 text-white gap-2 font-medium"
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                Quick Add
              </>
            )}
          </Button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {product.category.replace("-", " ")}
          </span>
          <StarRating
            rating={product.rating}
            size="sm"
            showNumber
            className="text-[11px]"
          />
        </div>

        {/* Title */}
        <Link
          href={`/products/${product.slug || product.id}`}
          className="group-hover:text-slate-600 transition-colors"
        >
          <h3 className="line-clamp-1 text-base font-semibold text-slate-900">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        {product.shortDescription && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {product.shortDescription}
          </p>
        )}

        {/* Color swatches preview if available */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            {product.colors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="h-3 w-3 rounded-full border border-black/10 shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
            ))}
            <span className="text-[10px] text-muted-foreground ml-1">
              {product.colors.length} {product.colors.length === 1 ? "color" : "colors"}
            </span>
          </div>
        )}

        {/* Pricing & Mobile Add Button */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-950">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-800 transition-all duration-200 hover:bg-slate-900 hover:text-white md:hidden active:scale-95"
          >
            {isAdded ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
