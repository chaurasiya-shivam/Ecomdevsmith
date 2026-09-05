import React from "react";
import Link from "next/link";
import {
  Twitter,
  Instagram,
  Github,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { ecommerceConfig } from "@/../devsmith.config";

const socialIcons: Record<string, any> = {
  Twitter,
  Instagram,
  Github,
  Youtube,
};

export default function Footer() {
  const { store, footer } = ecommerceConfig;

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight font-mono text-white">
                {store.logoText}
              </span>
              {store.logoBadge && (
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-slate-200 tracking-widest uppercase">
                  {store.logoBadge}
                </span>
              )}
            </Link>

            <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
              {store.description}
            </p>

            <div className="mt-6 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                <span>{store.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                <span>{store.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-slate-500" />
                <span>{store.contact.phone}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {store.socialLinks.map((social) => {
                const Icon = socialIcons[social.icon] || Twitter;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    aria-label={`Follow on ${social.platform}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Link Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footer.columns.map((col, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Methods */}
        <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-slate-500">
          <p>{footer.copyright}</p>

          <div className="flex flex-wrap items-center gap-2">
            {footer.paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-slate-300"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
