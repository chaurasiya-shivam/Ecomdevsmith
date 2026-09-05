"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const router = useRouter();
  const { itemCount, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const { store, navigation } = ecommerceConfig;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu Button & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-slate-950 font-mono">
              {store.logoText}
            </span>
            {store.logoBadge && (
              <span className="rounded bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold text-white tracking-widest uppercase">
                {store.logoBadge}
              </span>
            )}
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
            >
              <span className="flex items-center gap-1.5">
                {item.label}
                {item.badge && (
                  <Badge
                    variant="accent"
                    className="h-4 px-1.5 text-[10px] leading-none"
                  >
                    {item.badge}
                  </Badge>
                )}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right: Search, Cart, Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden items-center sm:flex"
          >
            <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search acoustics, keyboards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-48 rounded-full border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs text-slate-900 transition-all focus:w-64 focus:border-slate-900 focus:bg-white focus:outline-none"
            />
          </form>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-full p-2 text-slate-700 hover:bg-slate-100 sm:hidden transition-colors"
            aria-label="Open search input"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Cart Drawer Trigger Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="group relative flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 text-slate-900 transition-all duration-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            aria-label="Open shopping cart"
          >
            <ShoppingBag className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="text-xs font-semibold">Cart</span>
            {itemCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white group-hover:bg-white group-hover:text-slate-900 transition-colors">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Form Dropdown */}
      {searchOpen && (
        <div className="border-t border-slate-100 bg-slate-50 p-4 sm:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm focus:border-slate-900 focus:outline-none"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-6 shadow-xl lg:hidden">
          <nav className="flex flex-col space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="accent" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
            <p className="font-semibold text-slate-700">{store.name}</p>
            <p>{store.contact.supportHours}</p>
          </div>
        </div>
      )}
    </header>
  );
}
