import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ecommerceConfig } from "@/../devsmith.config";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/features/announcement-bar";
import { Navbar } from "@/features/navbar";
import { CartDrawer } from "@/features/cart";
import { Footer } from "@/features/footer";
import { ToastNotification } from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${ecommerceConfig.store.name} — ${ecommerceConfig.store.tagline}`,
  description: ecommerceConfig.store.description,
  keywords: [
    "minimalist ecommerce",
    "studio acoustics",
    "audiophile",
    "ergonomic workspace",
    "mechanical keyboards",
    "devsmith template",
  ],
  authors: [{ name: "DevSmith" }],
  openGraph: {
    title: `${ecommerceConfig.store.name} — ${ecommerceConfig.store.tagline}`,
    description: ecommerceConfig.store.description,
    siteName: ecommerceConfig.store.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex min-h-full flex-col bg-white text-slate-900`}>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <ToastNotification />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
