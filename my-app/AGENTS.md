<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Project Rules — Personal Task Manager

## 🚫 No Direct Code Changes Without Permission

1. **DO NOT** create, modify, or delete any source code files directly.
2. **DO NOT** run commands that modify the project (e.g., `npm install`, migrations, file writes, `docker compose up`) without explicit user approval.
3. Instead, **present all code in the chat** as code blocks for the user to review.
4. The user will **copy and paste** the code into the correct files themselves.
5. Always specify the **exact file path** where the code should be placed.

## 📋 Step-by-Step Guidance

1. Guide the user **one step at a time** — do not dump all files at once.
2. Clearly explain **what** each file does and **why** it's needed before showing code.
3. After showing code, wait for the user to confirm they've added it before moving to the next step.
4. If a step involves terminal commands (e.g., installing packages, running migrations, Docker), show the command and let the user run it themselves.

## 📐 Alignment with Implementation Plan

1. All code and guidance **must align** with the approved implementation plan (PRD & Plan for the Personal Task Manager).
2. Reference the plan's file structure, component names, API routes, and design decisions.
3. If a deviation from the plan is needed, explain why and get user approval first.
4. Follow the data architecture: PostgreSQL accessed via Sequelize models, with `zod` schemas shared between API and forms.

## 🎨 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL
- **ORM:** Sequelize (+ `sequelize-cli` for migrations/seeders, `pg` driver)
- **Validation:** zod
- **Testing:** Vitest + React Testing Library (node + jsdom environments)
- **Containerization:** Docker + Docker Compose (app + postgres)
- **CI:** GitHub Actions (lint, typecheck, test, build)

## 📂 Structure Conventions

- App lives in `my-app/`; API via Route Handlers under `src/app/api/tasks/`.
- DB singleton in `src/lib/db.ts`; models in `src/models/`; validation in `src/lib/validation.ts`.
- UI components in `src/components/`; migrations/seeders under `db/`.
- Tests colocated or under `__tests__/`, run with Vitest.
