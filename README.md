# EZParkr

AI-assisted parking finder and navigation demo built with Next.js (App Router), React, and TypeScript. The app simulates an end-to-end flow: chat-style intent capture, AI "thinking"/status, ranked parking options, and an AR-like navigation overlay.

This repository was bootstrapped with create-next-app and customized for a hackathon prototype.

## Overview

- Landing chat input to describe where you want to park
- Animated AI processing and status messages
- Ranked parking recommendations with availability, cost, score, and insights
- Navigation modal with step-by-step directions (mocked)
- Mobile-friendly UI with Tailwind CSS and Framer Motion animations

Note: All data and AI steps are mocked for demo purposes in app/page.tsx and components/*.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4 (via @tailwindcss/postcss)
- Framer Motion
- lucide-react
- ESLint (Next.js config)

## Requirements

- Node.js >= 18.18 (LTS recommended) or >= 20
- npm (primary) — package-lock.json is present
- Optional: Bun — bun.lock is present (you may use Bun if installed)

## Getting Started (Local Development)

Install dependencies:

```bash
npm install
# or, if you prefer Bun and have it installed
bun install
```

Run the dev server:

```bash
npm run dev
# or
bun run dev
```

Open http://localhost:3000 in your browser.

Hot reloading is enabled. You can start by editing app/page.tsx.

## Scripts

Defined in package.json:

- dev: next dev — start development server
- build: next build — build production bundle
- start: next start — run the production server (after build)
- lint: eslint — run ESLint using the Next.js config

Examples:

```bash
# Production build and start
npm run build
npm run start

# Lint
npm run lint
```

Equivalent with Bun:

```bash
bun run build
bun run start
bun run lint
```

## Project Structure

- app/
  - layout.tsx — Root layout, metadata, and global styles wiring
  - page.tsx — Main landing/flow page (client component)
  - globals.css — Global styles (Tailwind)
- components/
  - Landing/ChatInput.tsx — Input UI for user intent
  - Processing/AIThinking.tsx — Animated AI "thinking"
  - Processing/StatusMessages.tsx — Status updates during processing
  - Results/ParkingCard.tsx — Parking option card UI
  - HUD/NavigationModal.tsx — Directions/modal overlay
  - Shared/BlurredMapBackground.tsx — Background visual treatment
  - Preferences/PreferencesModal.tsx — Preferences UI
- public/ — Static assets
- next.config.ts — Next.js configuration
- postcss.config.mjs — Tailwind CSS v4 PostCSS plugin config
- eslint.config.mjs — ESLint config
- tsconfig.json — TypeScript config
- package.json — Scripts and dependencies

## Environment Variables

- None are required to run the local demo as configured.
- TODO: Document any future API keys or services when they are introduced. Use NEXT_PUBLIC_* for client-exposed values.

## Tests

- No tests are present in this repository at the moment.
- TODO: Add a testing setup (e.g., Vitest/Jest + React Testing Library) and CI workflow.

## Building and Running in Production

```bash
# Install deps
npm install
# Build
npm run build
# Start production server
npm run start
```

You can deploy to any Node.js hosting where you can run the above commands. For serverless/static hosting on platforms like Vercel, follow their Next.js deployment guides.

## License

No explicit license file is included.
- TODO: Add a LICENSE file (e.g., MIT) or clarify usage rights.

## Acknowledgements

This app uses next/font for optimized fonts (Geist) and Tailwind CSS for styling. Many sections are prototype/demo logic with mocked data to illustrate the product concept.
