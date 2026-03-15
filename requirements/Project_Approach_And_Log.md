# Project Approach and Decision Log

This document tracks the project's evolution, key decisions, and the steps we are taking.

## 1. Project Initiation (Date: 2026-03-09)

- **Objective:** Build a comprehensive full-stack production-level web application for a tech agency, including an integrated sales and marketing funnel.
- **Methodology:** Follow the Software Development Life Cycle (SDLC) phases, starting with requirements and design.

## 2. Initial Planning & Technology Stack (Phase 1)

- **Activity:** Created initial planning documents.
  - `Software_Requirement_Specification.md`
  - `System_Design_Document.md`
- **Initial Proposed Stack:**
  - **Frontend:** Next.js
  - **Backend:** Node.js with Express.js
  - **Database:** MongoDB
- **Architecture:** Monolithic Backend with a Decoupled Frontend.

## 3. Key Decision: Technology Stack Pivot (Date: 2026-03-09)

- **Change Request:** The user proposed a more robust and scalable technology stack.
- **New Approved Stack:**
  - **Frontend:** Next.js
  - **Backend:** **Nest.js** (replaces Express.js)
  - **AI Service:** **Python** (new microservice)
  - **Database:** MongoDB
- **Justification:**
  - **Nest.js** provides better structure, scalability, and maintainability for a large, long-term project.
  - A dedicated **Python microservice** for AI tasks allows us to use the best-in-class AI libraries and scale the AI functionality independently from the core application.
- **Impact:**
  - The architecture shifts from a monolith to a **Microservice Architecture**.
  - The `System_Design_Document.md` and `Software_Requirement_Specification.md` have been updated to reflect this change.

## 4. Current Status & Next Steps (Phase 2 - Development)

- **Current Status:** All planning and design documents are updated. We are ready to begin the development phase.
- **Next Immediate Step:** Set up the project structure for the **Nest.js backend service**. This will include:
  1. Creating a `server` directory for the backend code.
  2. Initializing a new Nest.js project using the Nest CLI.
  3. Establishing the basic folder structure for modules, controllers, and services.

## 5. Development Progress (Phase 2)

### 5.1 Backend (NestJS) — Completed

- **Auth module:** JWT-based register/login (`/auth/register`, `/auth/login`).
- **Blog module:** Full CRUD for blog posts with slug-based lookup.
- **Portfolio module:** Full CRUD for portfolio items.
- **Leads module:** Lead capture with status management (new/contacted/qualified/unqualified).
- **AI module:** Proxy to Python AI service (`/ai/process`, `/ai/chat`).

### 5.2 Python AI Service — Completed

- **`/process-text`:** Basic NLP (word count, sentence splitting).
- **`/analyze`:** Keyword extraction, sentiment analysis, reading-time estimate.
- **`/summarize`:** Extractive summarization via TF-IDF scoring.
- **`/chat`:** Rule-based lead-qualification chatbot (5-stage conversation flow: greeting → service identification → project detail → budget → timeline → CTA).

### 5.3 Frontend (Next.js) — Completed

- **Public pages:** Home (hero + services + portfolio + testimonials + CTA), Blog listing, Blog detail (`/blog/[slug]`), Portfolio, Contact/Lead form.
- **Auth pages:** Login (`/auth/login`).
- **Admin dashboard:** Stats overview, quick actions.
- **Admin — Blog:** List, create, edit, delete posts.
- **Admin — Portfolio:** List, create, edit, delete portfolio items.
- **Admin — Leads:** View leads, update status, delete.
- **ChatWidget:** Floating AI chatbot widget on all public pages (FR-9). Drives visitors through a qualification funnel and directs them to the contact page.

### 5.4 Phase 3 Additions (2026-03-12)

#### FR-3: Resource Downloads

- **Backend:** `ResourcesModule` — schema, CRUD endpoints. `GET /resources` (public), `POST /resources` (admin), `DELETE /resources/:id` (admin), `POST /resources/:id/download` (public — captures name+email as a lead, returns `fileUrl`). `LeadsModule` now exports `LeadsService` for cross-module use.
- **Frontend:** `/resources` public page with gated download modal; `/admin/resources` admin page to create/delete resources; Resources added to Navbar and Admin sidebar.

#### FR-6: Newsletter Subscription

- **Backend:** `NewsletterModule` — `Subscriber` schema (unique email), `POST /newsletter/subscribe` (public, conflicts if already subscribed), `GET /newsletter/subscribers` (admin), `DELETE /newsletter/subscribers/:id` (admin).
- **Frontend:** `NewsletterSignup` client component embedded in the Footer; `/admin/newsletter` admin page to view and remove subscribers; Newsletter added to Admin sidebar.

#### FR-8: Appointment Scheduling

- `CalendlyWidget` component dynamically injects the Calendly inline widget script/CSS from Calendly's CDN.
- `/schedule` standalone page with the Calendly embed (URL configurable via `NEXT_PUBLIC_CALENDLY_URL` env var).
- "Book a Discovery Call" CTA block added to the bottom of the `/contact` page.
- "Book a Call" added to the Navbar.

#### SEO Improvements

- `generateMetadata()` added to `/blog/[slug]` page (dynamic title, description, and OpenGraph image from the post data).
- Static `metadata` exports added to `/blog`, `/portfolio`, `/schedule` pages.

#### New Public Pages

- `/about` — Mission statement, company values, team profiles.
- `/services` — Detailed service cards (Web Dev, AI, Design, API, Mobile, PM) with feature lists and CTA.
- Both pages added to the Footer. About and Services added to the Navbar.

### 5.5 Phase 3 Completions (2026-03-12)

#### FR-5: Email Nurturing

- **Backend:** `MailModule` (global) wrapping Resend SDK. `MailService` exposes four transactional methods:
  - `sendLeadConfirmation` — welcome email on contact form submission.
  - `sendResourceDownloadConfirmation` — delivery email with file URL on gated download.
  - `sendNewsletterWelcome` — welcome email on newsletter subscribe.
  - `sendLeadStatusUpdate` — notification when admin changes a lead's status.
- Server `.env.example` updated with `RESEND_API_KEY`, `MAIL_FROM`, `ADMIN_EMAIL`.

#### TipTap Rich-Text Editor

- `RichTextEditor.tsx` component built with `@tiptap/react` and `@tiptap/starter-kit`.
- Full toolbar: Bold, Italic, Strike, Code, H1–H4, Blockquote, Bullet/Ordered list, Hard-break, Undo, Redo.
- Loaded via `dynamic()` (SSR disabled) in `/admin/blog/create` and `/admin/blog/edit/[slug]`, replacing plain `<textarea>`.

#### Pagination

- **Backend:** `GET /blog?page=1&limit=6` and `GET /portfolio?page=1&limit=6` return `{ data, total, page, totalPages }`.
- **Frontend:** `PaginationControls.tsx` client component with Prev/Next buttons and page info. Blog and Portfolio public listing pages read from `searchParams.page`.

#### Production Deployment Configuration

- `server/Dockerfile`, `client/Dockerfile`, `ai-service/Dockerfile` — multi-stage builds.
- `docker-compose.yml` — four services (`mongo`, `server` on 3001, `ai-service` on 8000, `client` on 3000) with shared network and volume.
- `.github/workflows/ci.yml` — GitHub Actions CI pipeline (lint, test, build on push/PR to main).
- `next.config.ts` updated with `output: 'standalone'` for optimized Docker image.

### 5.6 Phase 4: Production Hardening & Bug Fixes (2026-03-12)

#### Security Hardening

- **Helmet:** `helmet()` middleware added to `server/src/main.ts` — sets 11 HTTP security headers (HSTS, CSP, X-Frame-Options, etc.).
- **Rate Limiting:** `ThrottlerModule.forRoot([{ ttl: 60000, limit: 30 }])` added globally in `app.module.ts`. Auth endpoints (`/auth/login`, `/auth/register`) have a stricter `@Throttle({ default: { ttl: 60000, limit: 5 } })` decorator to prevent brute-force attacks.
- **XSS Protection:** `sanitize-html` added to `client/src/app/blog/[slug]/page.tsx`. Blog HTML is sanitized with an allowlist (h1–h4, p, code, blockquote, img, figure, iframe) before being passed to `dangerouslySetInnerHTML`.
- **CORS:** `server/src/main.ts` now reads a comma-separated `CLIENT_URL` env var to support multiple allowed origins (dev + prod).

#### FR-7 Completion (Contact & Quote Forms)

- `company` (optional string) and `budget` (optional enum string: Under $5k / $5k–$15k / $15k–$50k / $50k+) fields added to:
  - `server/src/leads/dto/create-lead.dto.ts`
  - `server/src/leads/schemas/lead.schema.ts`
  - `client/src/app/contact/page.tsx` — UI fields and form state.

#### Bug Fixes

| File | Issue | Fix |
|---|---|---|
| `server/src/auth/auth.service.spec.ts` | Unused `Model` import, unused `userModel`/`jwtService` vars | Removed |
| `server/test/auth.e2e-spec.ts` | `access_token` vs `token` assertion mismatch; `mongodb-memory-server` type resolution with `nodenext` | Fixed token key; added scoped `eslint-disable` |
| `client/src/components/home/Portfolio.tsx` | `<img>` tag; Tailwind v4 `aspect-[16/9]` etc. | `<Image>` component; Tailwind v4 shorthands |
| `client/src/app/page.tsx` | Duplicate `focus-visible:outline`; Tailwind v4 classes | Removed duplicate; fixed class names |
| `client/src/app/contact/page.tsx` | Tailwind v4 arbitrary value classes | Replaced with v4 shorthands |
| `client/src/components/layout/NewsletterSignup.tsx` | `catch (err: any)` | Typed cast pattern |
| `client/src/components/home/CTA.tsx` | Duplicate `focus-visible:outline` + `focus-visible:outline-2` | Removed bare `outline` |
| `client/src/components/home/Testimonials.tsx` | `theme(colors.indigo.100)` (Tailwind v3 syntax) | `var(--color-indigo-100)` |
| `server/src/blog/blog.service.spec.ts` | `as any` on author; Prettier formatting; `unbound-method` on expects | `as unknown as User`; reformatted; `eslint-disable-next-line` |

#### All 12 SRS Functional Requirements — Final Status

| ID | Feature | Status |
|---|---|---|
| FR-1 | Blog System (full stack + TipTap editor) | ✅ Complete |
| FR-2 | SEO-Optimized Pages (generateMetadata, static metadata) | ✅ Complete |
| FR-3 | Resource Downloads (gated lead-capture, email confirmation) | ✅ Complete |
| FR-4 | Portfolio / Case Studies (full CRUD + public page) | ✅ Complete |
| FR-5 | Email Nurturing (Resend — 4 transactional emails) | ✅ Complete |
| FR-6 | Newsletter Subscription (subscribe + admin panel) | ✅ Complete |
| FR-7 | Contact & Quote Forms (company + budget fields added) | ✅ Complete |
| FR-8 | Appointment Scheduling (Calendly widget + /schedule page) | ✅ Complete |
| FR-9 | AI Chatbot (Python /chat + NestJS proxy + ChatWidget) | ✅ Complete |
| FR-10 | User Authentication (JWT, bcrypt, register/login) | ✅ Complete |
| FR-11 | Content Management (admin dashboard, blog/portfolio CRUD) | ✅ Complete |
| FR-12 | Lead Management (admin leads table, status management) | ✅ Complete |
