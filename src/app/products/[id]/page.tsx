import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";
import { ProductDetails } from "@/features/product-details";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return ecommerceConfig.products.map((product) => ({
    id: product.slug || product.id,
  }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = ecommerceConfig.products.find(
    (p) => p.slug === params.id || p.id === params.id
  );

  if (!product) {
    return {
      title: `Product Not Found | ${ecommerceConfig.store.name}`,
    };
  }

  return {
    title: `${product.name} — ${ecommerceConfig.store.name}`,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${ecommerceConfig.store.name}`,
      description: product.shortDescription || product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = ecommerceConfig.products.find(
    (p) => p.slug === params.id || p.id === params.id
  );

  if (!product) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Product Not Found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The item you are looking for does not exist or has been retired.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/products" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Catalog</span>
          </Link>
        </Button>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
