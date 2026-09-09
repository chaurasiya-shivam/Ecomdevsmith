# DevSmith Template Rules

This repository is a **DevSmith template**. Build templates so DevSmith can assemble and customize them without manual setup.

## 1. Required Stack

Every template MUST use:

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui

Do not replace these with other frameworks or UI libraries.

## 2. Required Structure

Use the `src` directory:

```text
project-root/
├── src/
│   ├── app/
│   ├── components/
│   │   └── ui/
│   └── features/
├── public/
├── devsmith.config.ts
├── package.json
└── tsconfig.json
```

Keep application source code inside `src/`.

## 3. DevSmith Configuration

Every template MUST contain:

```text
devsmith.config.ts
```

at the project root.

Use it for template-specific configurable data such as:

* content
* navigation
* personal/business information
* projects
* links
* feature options

Do not put secrets, API keys, or implementation logic in this file.

UI should consume configurable content from `devsmith.config.ts` instead of hardcoding it when practical.

Use safe placeholder data in templates.

## 4. shadcn/ui Must Be Ready

shadcn/ui MUST already be initialized and configured in the template.

A freshly generated project must allow users to run from the project root:

```bash
npx shadcn@latest add <component-or-registry-url>
```

For example:

```bash
npx shadcn@latest add https://tweakcn.com/r/themes/claude.json
```

without requiring additional shadcn initialization or manual configuration.

Ensure the shadcn configuration, Tailwind setup, TypeScript path aliases, and `components/ui` location are compatible with the project.

## 5. Architecture

Keep pages focused on composition.

Use:

```text
src/app/
```

for routes and page composition,

```text
src/features/
```

for substantial page sections or feature-specific logic,

and

```text
src/components/
```

for reusable components.

Do not create unnecessary feature directories for trivial UI elements.

## 6. Template Generation Rules

When implementing a new template:

1. Follow the template details provided by the user.
2. Reuse the existing project structure and conventions.
3. Keep template-specific content configurable through `devsmith.config.ts`.
4. Do not add unnecessary technologies or dependencies.
5. Do not modify DevSmith-required files or structure without a reason.
6. Ensure the completed template builds and TypeScript checks successfully.

The final result must be a **complete, runnable DevSmith template**, not a partially implemented scaffold.
