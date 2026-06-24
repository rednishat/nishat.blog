# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Note: `CLAUDE.md` is a symlink to `AGENTS.md` — edit `AGENTS.md` directly.

## About this blog

Personal blog for **Nishat Shahriyar** at [nishat.blog](https://nishat.blog). Nishat is a marketer and content systems builder at WPManageNinja (Fluent Forms, Ninja Tables, Fluent Support, and others). The blog covers WordPress SaaS marketing, systems thinking, SEO, AI-augmented content workflows, and personal topics. He also runs 4 newsletters (WPMore, SERP Lab SEO, nishishere.com, Nishnama) and writes in Bangla at nishnama.com.

## Commands

Always start the dev server in background mode:

```bash
npx astro dev --background   # start
npx astro dev status         # check if running (shows URL + PID)
npx astro dev stop           # stop
npx astro dev logs           # tail logs
npm run build                # production build → dist/
npm run preview              # preview the production build locally
```

No test runner or linter is configured.

## Architecture

Astro v7 static blog with MDX support. No UI framework (React/Vue/etc.) — all components are `.astro` files. No Tailwind — vanilla CSS only.

**Pages:**
- `/` — `src/pages/index.astro` (intro + 5 most recent posts)
- `/blog` — `src/pages/blog/index.astro` (full post listing)
- `/[slug]/` — `src/pages/[...slug].astro` (individual post — posts live at root, not under `/blog/`)
- `/about` — `src/pages/about.astro`
- `/rss.xml` — `src/pages/rss.xml.js`

**Content:** Blog posts in `src/content/blog/` as `.md` or `.mdx`. Schema in `src/content.config.ts`.

Post frontmatter:
```md
---
title: 'Post title'
description: 'Short description'
pubDate: 'Jul 08 2022'
updatedDate: 'Jan 01 2024'        # optional
heroImage: '../../assets/img.jpg' # optional — path relative to the post file
---
```

**Layout:** `src/layouts/BlogPost.astro` wraps each post with `BaseHead`, `Header`, `Footer`, hero image, and auto-injects JSON-LD `BlogPosting` schema. No frontmatter changes needed for schema — it's automatic.

**Styling:** `src/styles/global.css` — global styles, CSS variables, dark mode via `prefers-color-scheme`. Per-component styles in scoped `<style>` blocks. Max content width: 680px.

CSS variable palette: `--accent`, `--accent-hover`, `--bg`, `--bg-subtle`, `--text`, `--text-muted`, `--border`, `--code-bg`, `--box-shadow`.

**Fonts:** Local Atkinson Hyperlegible (regular + bold `.woff`) via Astro's font API — `var(--font-atkinson)`.

**Site constants:** `src/consts.ts` — `SITE_TITLE`, `SITE_DESCRIPTION`.

**Integrations:** `@astrojs/mdx`, `@astrojs/sitemap` (auto-generates `/sitemap-index.xml` + `/sitemap-0.xml` on every build).

## Third-party scripts

`src/components/ExternalSnippets.astro` is the single file for all third-party head scripts (Google Analytics, GTM, Pixel, Hotjar, etc.). It is imported first inside `BaseHead.astro` so it loads at the top of `<head>` on every page. To add or disable a script, edit only this file.

Current active scripts: Google Analytics 4 (`G-QNTCGMT79H`).

## SEO

- JSON-LD `BlogPosting` schema — auto-injected in `BlogPost.astro` for every post
- Sitemap — `@astrojs/sitemap` generates it at build time; `public/robots.txt` references it; footer links to it
- `BaseHead.astro` includes canonical URL, OG tags, Twitter card, and `<link rel="sitemap">`
- Default OG image falls back to `src/assets/nishat.png`

## Deploy

- GitHub repo: `github.com/rednishat/nishat.blog`
- `.github/workflows/deploy.yml` — GitHub Actions deploys to GitHub Pages on every push to `main`
- `public/CNAME` contains `nishat.blog` — preserves custom domain after each deploy; do not delete
- Custom domain DNS: Spaceship.com → 4 A records to GitHub Pages IPs + CNAME `www` → `rednishat.github.io`

## Current state (as of 2026-06-25)

- About page complete with real bio, avatar (`src/assets/nishat.png`), social links
- One real post: `how-my-fear-became-my-main-motivator.md` (originally from Medium, Nov 2022)
- Google Analytics wired up via `ExternalSnippets.astro`
- Sitemap, robots.txt, and JSON-LD schema all in place

## Documentation

- Full docs: https://docs.astro.build
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Routing](https://docs.astro.build/en/guides/routing/)
- [Styling](https://docs.astro.build/en/guides/styling/)
