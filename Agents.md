\# DevSmith Template Rules

This project is a \*\*DevSmith template\*\*.

The template must remain clean, modular, configurable, and easy for DevSmith to assemble or modify.

\## 1. Mandatory Technology Stack

Every DevSmith template MUST use:

\* Next.js

\* TypeScript

\* Tailwind CSS

\* shadcn/ui

Do not replace these technologies with alternative frameworks or UI libraries.

\### Required Next.js Structure

The application MUST use the `src` directory.

The expected structure is:

```text

project-root/

├── src/

│   ├── app/

│   ├── components/

│   ├── features/

│   └── ...

├── public/

├── devsmith.config.ts

├── package.json

├── tsconfig.json

├── next.config.ts

└── ...

```

Do not move the application outside of `src`.

\---

\## 2. Required DevSmith Configuration

Every DevSmith template MUST contain:

```text

devsmith.config.ts

```

The file MUST be located in the project root.

Example:

```text

project-root/

├── devsmith.config.ts

├── src/

├── public/

└── package.json

```

The configuration file is the primary data/configuration layer for the template.

For example, a portfolio template may contain:

```ts

export const portfolioConfig = {

&#x20; personalInfo: {

&#x20;   name: "Maurya Suryakant",

&#x20;   title: "Software Engineer",

&#x20;   email: "mauryasuryakant99@example.com",

&#x20;   github: "https://github.com/mauryasuryakant",

&#x20;   linkedin: "https://linkedin.com/in/suryakant-maurya-b3b879385",

&#x20;   about:

&#x20;     "I build clean, accessible, and performant web applications with modern technologies. I focus on backend architecture and delivering high-quality user experiences.",

&#x20; },



&#x20; skills: \[

&#x20;   "TypeScript",

&#x20;   "React",

&#x20;   "Next.js",

&#x20;   "Node.js",

&#x20;   "Tailwind CSS",

&#x20;   "PostgreSQL",

&#x20; ],



&#x20; projects: \[

&#x20;   {

&#x20;     title: "Project Alpha",

&#x20;     description: "A high-performance SaaS platform.",

&#x20;     techStack: \["Next.js", "TypeScript", "Prisma"],

&#x20;     link: "https://example.com/alpha",

&#x20;   },

&#x20;   {

&#x20;     title: "Project Beta",

&#x20;     description: "An open-source developer tool.",

&#x20;     techStack: \["React", "Go", "Tailwind CSS"],

&#x20;     link: "https://example.com/beta",

&#x20;   },

&#x20; ],



&#x20; experience: \[

&#x20;   {

&#x20;     role: "Senior Developer",

&#x20;     company: "Tech Corp",

&#x20;     period: "2021 - Present",

&#x20;     description:

&#x20;       "Led the backend architecture and performance optimization of core services.",

&#x20;   },

&#x20;   {

&#x20;     role: "Software Engineer",

&#x20;     company: "Startup Inc",

&#x20;     period: "2019 - 2021",

&#x20;     description:

&#x20;       "Developed and maintained full-stack web applications.",

&#x20;   },

&#x20; ],

};

```

Components should consume data from `devsmith.config.ts` instead of hardcoding template-specific content inside UI components whenever practical.

\---

\## 3. Feature-Based Architecture

Every major website section or feature MUST have its own directory.

Do not create one giant page component containing the entire website.

Required pattern:

```text

src/

└── features/

&#x20;   ├── about/

&#x20;   │   ├── About.tsx

&#x20;   │   └── index.ts

&#x20;   │

&#x20;   ├── contact/

&#x20;   │   ├── Contact.tsx

&#x20;   │   └── index.ts

&#x20;   │

&#x20;   ├── footer/

&#x20;   │   ├── Footer.tsx

&#x20;   │   └── index.ts

&#x20;   │

&#x20;   └── hero/

&#x20;       ├── Hero.tsx

&#x20;       └── index.ts

```

Each feature MUST be independently organized.

\### Feature Rules

A feature directory should normally contain:

```text

feature-name/

├── FeatureName.tsx

└── index.ts

```

`index.ts` should expose the feature:

```ts
export { default as Hero } from "./Hero";
```

The feature component should contain the UI and behavior specific to that feature.

\---

\## 4. Page Composition

Pages should primarily compose features rather than implement every feature directly.

For example:

```tsx

import { About } from "@/features/about";

import { Contact } from "@/features/contact";

import { Footer } from "@/features/footer";

import { Hero } from "@/features/hero";



export default function HomePage() {

&#x20; return (

&#x20;   <>

&#x20;     <Hero />

&#x20;     <About />

&#x20;     <Contact />

&#x20;     <Footer />

&#x20;   </>

&#x20; );

}

```

The page should act as a \*\*composition layer\*\*.

Avoid putting large amounts of feature-specific UI inside `page.tsx`.

\---

\## 5. Reusable Components

Reusable UI components should live separately from website-specific features.

Use:

```text

src/components/

```

for shared components.

shadcn/ui components should remain in the appropriate shadcn/ui component location.

Example:

```text

src/

├── components/

│   ├── ui/

│   │   ├── button.tsx

│   │   ├── card.tsx

│   │   └── ...

│   └── ...

│

└── features/

&#x20;   ├── hero/

&#x20;   ├── about/

&#x20;   └── ...

```

Do not duplicate reusable UI components across multiple features.

\---

\## 6. shadcn/ui

Use shadcn/ui for reusable interface components whenever an appropriate component exists.

Do not introduce another component library such as:

\* Material UI

\* Chakra UI

\* Ant Design

\* Bootstrap

\* Mantine

unless explicitly required by the DevSmith template specification.

Custom components are allowed when the required UI does not exist in shadcn/ui.

\---

\## 7. Styling

Tailwind CSS MUST be the primary styling system.

Prefer:

```tsx

<div className="flex items-center gap-4">

```

over creating unnecessary CSS files.

Do not introduce another styling framework.

CSS files should only be created when they provide a genuine benefit that cannot reasonably be handled through Tailwind CSS.

\---

\## 8. TypeScript

The project MUST use TypeScript.

Avoid:

```text

.js

.jsx

```

for application code.

Prefer:

```text

.ts

.tsx

```

All configuration objects, component props, feature data, and reusable structures should have appropriate TypeScript types where useful.

Do not use `any` unless there is a legitimate technical reason.

\---

\## 9. Configuration Over Hardcoding

Template-specific content should be separated from UI structure.

For example, avoid:

```tsx

<h1>Maurya Suryakant</h1>

<p>Software Engineer</p>

```

when the content belongs in `devsmith.config.ts`.

Prefer:

```tsx

<h1>{portfolioConfig.personalInfo.name}</h1>

<p>{portfolioConfig.personalInfo.title}</p>

```

This allows DevSmith to modify the template without rewriting the UI structure.

\---

\## 10. Keep Features Independent

Features should avoid unnecessary coupling.

For example:

```text

src/features/

├── about/

├── contact/

├── experience/

├── footer/

├── hero/

├── navbar/

├── projects/

└── skills/

```

Removing one feature should require minimal changes to unrelated features.

Features should not depend on unrelated features unless there is a clear architectural reason.

\---

\## 11. Template Cleanliness

A DevSmith template is not a finished personal project.

It is a \*\*reusable project blueprint\*\*.

Therefore:

\* Do not include unnecessary files.

\* Do not include unused dependencies.

\* Do not include experimental code.

\* Do not include abandoned components.

\* Do not include duplicate implementations.

\* Do not add unnecessary abstractions.

\* Do not create files without a clear purpose.

\* Do not add features that are not part of the template specification.

Keep the template as small and understandable as possible.

\---

\## 12. Do Not Overengineer

Prefer simple solutions.

Do not introduce:

\* unnecessary state management libraries

\* unnecessary utility layers

\* unnecessary design patterns

\* unnecessary custom frameworks

\* unnecessary abstractions

\* unnecessary API layers

unless the template genuinely requires them.

The goal is:

```text

Simple

↓

Modular

↓

Configurable

↓

Reusable

↓

DevSmith-ready

```

\---

\## 13. File Naming

Use clear and predictable names.

React components:

```text

PascalCase.tsx

```

Examples:

```text

Hero.tsx

About.tsx

Navbar.tsx

ProjectCard.tsx

```

Directories:

```text

kebab-case/

```

Examples:

```text

hero/

project-card/

contact-form/

```

Barrel exports:

```text

index.ts

```

\---

\## 14. Imports

Use the project's configured path aliases when available.

Prefer:

```ts
import { Hero } from "@/features/hero";
```

over deeply nested relative imports such as:

```ts
import { Hero } from "../../../features/hero/Hero";
```

\---

\## 15. DevSmith Compatibility

Every template must be designed so DevSmith can eventually:

1\. Download the template.

2\. Read `devsmith.config.ts`.

3\. Modify configuration values.

4\. Add or remove features.

5\. Assemble the final project.

6\. Install dependencies.

7\. Run the resulting Next.js application.

Do not structure the project in a way that makes feature-level modification unnecessarily difficult.

\---

\## 16. Final Architecture Rule

When creating or modifying a DevSmith template, always prioritize:

```text

Next.js

\+ TypeScript

\+ Tailwind CSS

\+ shadcn/ui

\+ src/

\+ devsmith.config.ts

\+ feature-based architecture

\+ reusable components

\+ minimal dependencies

\+ clean project structure

```

- Never edit AGENTS.md

> **Template Directive:** This repository contains a reusable DevSmith template, NOT a standalone project to be built as a final application. When working here, focus on creating clean, modular, configurable, reusable template components that DevSmith can later assemble, modify, add, or remove; do not treat the template as a finished personal project.

> **AI Enforcement:** These rules are mandatory. Whenever creating, modifying, or reviewing a DevSmith template, you MUST follow every rule defined in this document, prioritize DevSmith compatibility over personal preferences, and never introduce patterns, technologies, dependencies, files, or architecture that violate these rules unless the DevSmith template specification explicitly overrides them.