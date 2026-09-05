# DevSmith Template

This is a **DevSmith template**, not a standalone project.

The template is a collection of independent, reusable building blocks that DevSmith can assemble into a final application.

## Rules

* **Stack is strict:** Next.js + TypeScript + Tailwind CSS + shadcn/ui.
* Keep the UI **simple, clean, and minimal**.
* Keep the implementation **backend-focused**; avoid unnecessary frontend complexity.
* Every feature/functionality should live in its **own separate folder**.
* Features must be **loosely coupled and independently removable**.
* Removing one feature must **not break unrelated features**.
* Avoid unnecessary shared dependencies between features.
* Keep code reusable, predictable, and easy for DevSmith to assemble.
* Do not add unnecessary libraries, abstractions, animations, or features.
* Do not add project-specific branding, credentials, or hardcoded configuration.
* Preserve the existing architecture and conventions.
* Do not modify unrelated features unless required.

## Mental Model

```text
Feature A ──┐
Feature B ──┼──→ DevSmith ──→ Final Project
Feature C ──┘

Remove Feature B
       ↓
A and C still work.
```

**Every feature should behave like an independent Lego block.**
