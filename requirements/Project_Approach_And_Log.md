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

### 5.5 Next Steps

- **FR-5: Email Nurturing** — SendGrid/Resend integration to trigger automated email sequences on lead creation and resource download.
- Implement a rich-text editor (e.g. TipTap) for the blog post create/edit forms.
- Add pagination to Blog and Portfolio public pages.
- Production deployment configuration (Docker, CI/CD, environment variables).
