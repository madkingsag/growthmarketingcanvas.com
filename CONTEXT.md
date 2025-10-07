# GrowthMarketingCanvas.com — Project Context

Last updated: 2025-10-06

## Overview
This repository will host a static marketing website for growthmarketingcanvas.com, with a reproducible development environment and an automated deployment pipeline to GitHub Pages using a custom domain.

## Deliverables
1) Dev Container to manage the project
- Reproducible Node.js development environment for all contributors.
- Pre-configured tooling to run, build, lint, and preview the site.

2) Static website generated with Astro + Tailwind CSS
- Astro as the static site generator.
- Tailwind CSS for utility-first styling.
- Minimal yet extensible scaffolding (pages, layouts, components, assets).

3) CI/CD workflow to publish on GitHub Pages with a custom domain
- GitHub Actions builds the site on push to main and deploys to GitHub Pages.
- Custom domain configured: growthmarketingcanvas.com.

---

## Architecture at a glance
- Source: Astro project (TypeScript-ready), Tailwind CSS, content in `src/` and `public/`.
- Build: `astro build` emits static assets into `dist/`.
- Deploy: GitHub Actions uploads the `dist/` artifact and deploys to GitHub Pages.
- Domain: DNS points the apex/root to GitHub Pages; repository includes a `CNAME` file with `growthmarketingcanvas.com`.

---

## 1) Dev Container
Goal: Provide a consistent, ready-to-code environment for Node-based web development.

Planned configuration
- Base image: `mcr.microsoft.com/devcontainers/javascript-node:24-bullseye` (Node.js 24 LTS)
- Features/tools: git, Node.js, corepack (pnpm), bash/zsh, curl
- Editor conveniences: recommended VS Code extensions (Astro, Tailwind CSS, ESLint, Prettier)
- Ports: 4321 exposed (Astro dev server)
- Post-create steps: `corepack enable`, install dependencies, verify `astro --version`

Acceptance criteria
- Opening the repo in VS Code Dev Containers starts a container with Node 24.
- `pnpm install` and `pnpm dev` work inside the container and serve the site on port 4321.
- Lint/format tasks run successfully (if configured).

---

## 2) Static website with Astro + Tailwind CSS
Goal: Bootstrap a clean Astro site styled with Tailwind, ready for content and future growth.

Planned configuration
- Initialize Astro with the minimal template.
- Add Tailwind via the official Astro integration `@astrojs/tailwind`.
- Enable `@astrojs/sitemap` and basic SEO meta tags.
- Project structure:
  - `src/pages/` for routes (e.g., `index.astro`)
  - `src/layouts/` for shared layout(s)
  - `src/components/` for UI building blocks
  - `public/` for static assets
- Scripts: `dev`, `build`, `preview`, `format`, `lint`

Acceptance criteria
- `pnpm dev` serves the site locally with Tailwind styles applied.
- `pnpm build` emits a working static site in `dist/`.
- Minimal homepage exists and passes a simple smoke test (loads, styled, no console errors).

---

## 3) CI/CD: GitHub Actions → GitHub Pages (custom domain)
Goal: On push to `main`, build and deploy the static site to GitHub Pages with the custom domain.

Planned workflow
- Trigger: `push` to `main` and manual dispatch.
- Job steps:
  1. Check out repo
  2. Setup Node 24 + corepack/pnpm
  3. Cache pnpm store for faster builds
  4. Install deps -> Build (`pnpm build`)
  5. Upload `dist/` as artifact
  6. Deploy to GitHub Pages using the official actions
- Permissions: `pages: write`, `id-token: write`
- Pages settings: Source set to "GitHub Actions"
- Custom domain:
  - `public/CNAME` containing `growthmarketingcanvas.com`
  - In repo Settings → Pages, set the same custom domain

Acceptance criteria
- Every push to `main` produces a successful build and deploys the latest site.
- The site is available at `https://growthmarketingcanvas.com/` with HTTPS.
- The workflow is deterministic and runs in < 5 minutes under typical conditions.

---

## Custom domain & DNS
To serve the site at `growthmarketingcanvas.com` with GitHub Pages:
- Apex/root domain (growthmarketingcanvas.com): Configure A records pointing to GitHub Pages IPs as per the latest GitHub documentation (values can change; verify in the GitHub Pages docs before applying). Optionally add AAAA (IPv6) records if supported by your DNS provider.
- If using the `www` subdomain, add a CNAME record from `www` to the user/organization Pages host (e.g., `<user>.github.io`).
- Add a `CNAME` file to the project (in `public/`) with the exact domain: `growthmarketingcanvas.com`.
- In GitHub → Repository Settings → Pages: enter the custom domain and enable HTTPS.

Notes
- DNS propagation can take time; verify with `dig`/`nslookup` after records are set.
- Use only one canonical hostname for SEO (prefer apex redirecting `www` → apex or vice versa).

---

## Planned repository layout
- `/.devcontainer/devcontainer.json` — Dev Container config
- `/src/` — Pages, layouts, components
- `/public/` — Static assets, including `CNAME`
- `/astro.config.mjs` — Astro configuration
- `/tailwind.config.[cjs|ts]` — Tailwind configuration
- `/package.json` — Scripts and dependencies
- `/.github/workflows/deploy.yml` — CI/CD to GitHub Pages
- `/CONTEXT.md` — This document

---

## Assumptions & dependencies
- Node.js 24 LTS and pnpm (via corepack) for local and CI environments.
- GitHub repository with Pages enabled and Actions allowed.
- DNS for the domain `growthmarketingcanvas.com` is controllable and can be updated.

---

## Next actions
1) Scaffold Dev Container files
2) Initialize Astro project and integrate Tailwind
3) Add GitHub Actions workflow for Pages deployments
4) Add `public/CNAME` and configure repository Pages & DNS

Once these are in place, we’ll document run/build commands in the README and start adding site content.
