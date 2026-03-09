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
