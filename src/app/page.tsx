import { Hero } from "@/features/hero";
import { TrustBadges } from "@/features/trust-badges";
import { CategoryShowcase } from "@/features/categories";
import { FeaturedProducts } from "@/features/featured-products";
import { PromoBanner } from "@/features/promo-banner";
import { Testimonials } from "@/features/testimonials";
import { Newsletter } from "@/features/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryShowcase />
      <FeaturedProducts />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
    </>
  );
}
