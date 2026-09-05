# 🛍️ Devsmith — E-Commerce Platform

A precision-crafted, high-performance modern e-commerce storefront built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🎨 Theme & Aesthetic

This application is built around the **"Minimalist Studio Luxury" (Slate & Obsidian)** theme inspired by premium design-led brands like Teenage Engineering, Apple, and Dieter Rams' minimalist aesthetics.

### 🌟 Theme Highlights:
- **Design Style:** Modern Minimalist & Studio Hardware Aesthetic. Clean lines, generous negative space, crisp typography, and subtle micro-interactions.
- **Color Palette:**
  - **Dark Base / Accents:** Deep Slate & Obsidian (`bg-slate-950`, `text-slate-200`) for headers, footers, and badges.
  - **Light Canvas:** High-contrast pure white and neutral slates (`#ffffff`, `slate-50`, `slate-100`) for product showcases.
  - **System Tokens:** Fully dynamic HSL CSS color variables (`--primary`, `--secondary`, `--accent`, `--border`, `--ring`) for easy theme tweaking.
- **Component Architecture:** Radix UI primitives with shadcn/ui-inspired styling, offering accessible, smooth modals, sheets, and dropdowns.
- **Iconography:** Cohesive Lucide React studio icons.

---

## ✨ Key Features

- ⚡ **Next.js 14 App Router:** Built using React Server & Client Components for speed and SEO.
- 🛒 **Slide-out Cart Drawer:** Smooth slide-out cart drawer with instant quantity adjustments and total calculation.
- 📦 **Interactive Product Catalog:** Dynamic categorization (Audio, Workspace, Everyday Carry), star ratings, and sale badges.
- 🔍 **Product Detail Views:** Dynamic product routing (`/products/[id]`) with product specifications and stock statuses.
- 💳 **Checkout Flow:** Dedicated checkout page (`/checkout`) with address and payment forms.
- 🔔 **Interactive Toast Feedback:** Real-time feedback when adding or removing items from the cart.
- ⚙️ **Centralized Configuration:** The entire store's branding, social links, navigation, and product catalog are managed in [`devsmith.config.ts`](./devsmith.config.ts).

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **[Next.js 14](https://nextjs.org/)** | Full-stack React Framework (App Router) |
| **[React 18](https://react.dev/)** | UI Component Architecture |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe development |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS styling |
| **[Radix UI](https://www.radix-ui.com/)** | Headless accessible UI primitives |
| **[Lucide Icons](https://lucide.dev/)** | Crisp, scalable SVG iconography |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/chaurasiya-shivam/Ecomdevsmith.git
cd Ecomdevsmith
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the store.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```text
├── public/                 # Static assets and icons
├── src/
│   ├── app/                # Next.js App Router (pages & layout)
│   │   ├── cart/           # Cart page
│   │   ├── checkout/       # Checkout page
│   │   ├── products/       # Products catalog & details
│   │   ├── globals.css     # Global styles and theme CSS variables
│   │   └── layout.tsx      # Root layout with CartProvider
│   ├── components/         # Shared UI components (ProductCard, Toast, Button, etc.)
│   ├── context/            # Global state (CartContext)
│   ├── features/           # Modular feature components (Hero, Navbar, Footer, etc.)
│   ├── lib/                # Utility helpers (cn class merger)
│   └── types/              # TypeScript definitions
├── devsmith.config.ts      # Store settings, navigation, and products configuration
├── tailwind.config.ts      # Tailwind CSS theme configuration
└── package.json            # Project dependencies and scripts
```

---

## 🖌️ How to Customize the Theme

1. **Colors & Design Tokens:**
   Edit the HSL variables in [`src/app/globals.css`](./src/app/globals.css) under `:root` or `.dark`.
2. **Store Info & Products:**
   Edit [`devsmith.config.ts`](./devsmith.config.ts) to change your store name, logo, social links, contact info, and product items.
3. **Tailwind Tweaks:**
   Modify [`tailwind.config.ts`](./tailwind.config.ts) to adjust fonts, container sizes, or border-radii.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
