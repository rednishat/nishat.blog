# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About this blog

Personal blog for **Nishat Shahriyar** at [nishat.blog](https://nishat.blog). Nishat is a marketer and content systems builder at WPManageNinja (Fluent Forms, Ninja Tables, Fluent Support, and others). The blog covers WordPress SaaS marketing, systems thinking, SEO, AI-augmented content workflows, and personal topics. He also runs 4 newsletters (WPMore, SERP Lab SEO, nishishere.com, Nishnama) and writes in Bangla at nishnama.com.

## Commands

```bash
npm run dev        # start dev server (use background mode below)
npm run build      # production build to dist/
npm run preview    # preview the production build locally
```

When starting the dev server, always use background mode:

```bash
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

No test runner or linter is configured.

## Architecture

Astro v7 static blog with MDX support. No UI framework (React/Vue/etc.) — all components are `.astro` files. No Tailwind — vanilla CSS only.

**Pages:**
- `/` — `src/pages/index.astro` (intro section + 5 most recent posts)
- `/blog` — `src/pages/blog/index.astro` (full post listing)
- `/[slug]/` — `src/pages/[...slug].astro` (individual post, uses `BlogPost` layout — posts are at root, not under /blog/)
- `/about` — `src/pages/about.astro` (fully written with real bio, avatar, social links)
- `/rss.xml` — `src/pages/rss.xml.js`

**Content:** Blog posts live in `src/content/blog/` as `.md` or `.mdx` files. Schema defined in `src/content.config.ts`.

Post frontmatter:
```md
---
title: 'Post title'
description: 'Short description'
pubDate: 'Jul 08 2022'
updatedDate: 'Jan 01 2024'        # optional
heroImage: '../../assets/img.jpg' # optional
---
```

**Layout:** `src/layouts/BlogPost.astro` wraps individual posts with `BaseHead`, `Header`, `Footer`, and optional hero image.

**Styling:** Global styles + CSS variables in `src/styles/global.css`. Dark mode via `prefers-color-scheme`. Per-component styles in scoped `<style>` blocks. Max content width: 680px.

CSS variable palette: `--accent`, `--accent-hover`, `--bg`, `--bg-subtle`, `--text`, `--text-muted`, `--border`, `--code-bg`, `--box-shadow`.

**Fonts:** Local Atkinson Hyperlegible (regular + bold `.woff`) via Astro's font API — `var(--font-atkinson)`.

**Site constants:** `src/consts.ts` — `SITE_TITLE`, `SITE_DESCRIPTION`.

**Integrations:** `@astrojs/mdx`, `@astrojs/sitemap`. Images go in `src/assets/` and are processed by sharp.

## Current state

- About page is complete with real bio and avatar (`src/assets/nishat.png`)
- Blog posts are still placeholder/template content — real posts not yet added
- Deploy target: user's own hosting via GitHub push (Vercel/Netlify not used)

## Documentation

Full docs: https://docs.astro.build

- [Routing & pages](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)
