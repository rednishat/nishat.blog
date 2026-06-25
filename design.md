# nishat.blog — Design System

A reference for the visual language, layout rules, and component patterns used across the site. Follow this when building new pages or components.

---

## Philosophy

Minimal, readable, and fast. No frameworks, no Tailwind — just vanilla CSS with custom properties. The design never competes with the writing. Every decision favors legibility and whitespace over decoration.

---

## Typography

**Primary font:** Atkinson Hyperlegible (local `.woff`, via Astro font API)
- Regular: `weight: 400`
- Bold: `weight: 700`
- CSS variable: `var(--font-atkinson)`
- Fallback stack: `system-ui, -apple-system, sans-serif`

**Monospace (code):** `'Fira Code', 'Cascadia Code', 'Consolas', monospace`

**Base type scale:**

| Element | Size | Weight | Line height |
|---|---|---|---|
| Body | 18px (16px mobile) | 400 | 1.75 |
| h1 | 2.25rem (1.75rem mobile) | 700 | 1.25 |
| h2 | 1.75rem (1.375rem mobile) | 700 | 1.25 |
| h3 | 1.375rem | 700 | 1.25 |
| h4 | 1.125rem | 700 | 1.25 |
| h5 | 1rem | 700 | 1.25 |
| Small / meta / labels | 0.875rem | varies | — |
| Uppercase labels | 0.8rem | 600 | letter-spacing: 0.07–0.1em |

**Rendering:** `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`

---

## Color Palette

All colors are CSS custom properties defined in `src/styles/global.css`. Dark mode is automatic via `@media (prefers-color-scheme: dark)` — no toggle, no JS.

| Variable | Light | Dark | Usage |
|---|---|---|---|
| `--accent` | `#4f46e5` (indigo-600) | `#818cf8` (indigo-400) | Links, active nav, buttons, blockquote border |
| `--accent-hover` | `#4338ca` (indigo-700) | `#a5b4fc` (indigo-300) | Hover state for accented elements |
| `--bg` | `#ffffff` | `#0f0f13` | Page background, header background |
| `--bg-subtle` | `#f9f9fb` | `#17171d` | Nav link hover fill, subtle surfaces |
| `--text` | `#111118` | `#e8e8f0` | Body text, headings |
| `--text-muted` | `#6b7280` | `#9ca3af` | Dates, descriptions, footer, labels |
| `--border` | `#e5e7eb` | `#2a2a35` | Dividers, input borders, card outlines |
| `--code-bg` | `#f3f4f6` | `#1e1e28` | Inline code and code block background |
| `--box-shadow` | `0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)` | darker equivalents | Elevation if needed |

**Rule:** Never hardcode a color value. Always use a CSS variable so dark mode is automatic.

---

## Layout

**Max content width:** `680px`

```css
main {
  width: 680px;
  max-width: calc(100% - 2rem);
  margin: 0 auto;
  padding: 3rem 1rem;       /* 2rem 1rem on mobile */
}
```

All layout containers (header nav, footer inner, subscribe strip) use the same `max-width: 680px; margin: 0 auto` pattern. This keeps everything optically aligned.

**Breakpoints:**
- `max-width: 680px` — body font drops to 16px, h1/h2 scale down, main padding reduces
- `max-width: 500px` — list rows stack vertically (post title + date)
- `max-width: 480px` — footer row stacks vertically

---

## Header

- Sticky, `top: 0`, `z-index: 10`
- Height: `56px`
- Background: `var(--bg)`, bottom border: `1px solid var(--border)`
- Padding: `0 1.5rem`

**Logo:** 20×20 favicon image + site title in one flex row, `gap: 0.45rem`. Font: 1rem, weight 700, `letter-spacing: -0.01em`, color `var(--text)`. Hover → `var(--accent)`.

**Nav links** (`HeaderLink.astro`):
- Size: 0.9rem, weight 500, color `var(--text-muted)`
- Padding: `0.35rem 0.65rem`, border-radius: `6px`
- Hover: color → `var(--text)`, background → `var(--bg-subtle)`
- Active (current page): color → `var(--accent)`, weight 600

---

## Footer

Three-part structure (top to bottom inside `<footer>`):

1. **Subscribe strip** — compact Kit form above the divider
2. **Divider** — `1px solid var(--border)` via `border-bottom` on `.subscribe`
3. **Footer bar** — copyright left, links right

**Subscribe strip:**
- Label: 0.8rem, weight 600, uppercase, `letter-spacing: 0.07em`, color `var(--text-muted)`
- Input + button in a flex row, `gap: 0.5rem`
- Input: `border: 1px solid var(--border)`, `border-radius: 5px`, background `var(--bg)`, focus border → `var(--accent)`
- Button: background `var(--accent)`, white text, hover → `var(--accent-hover)`, border-radius `5px`

**Footer bar:**
- Font: 0.875rem, color `var(--text-muted)`
- Links: weight 500, `text-decoration: none`, hover → `var(--accent)`
- RSS link: uppercase, `letter-spacing: 0.05em`, 0.8rem
- Separators: `·` in color `var(--border)`

---

## Post Layout (`BlogPost.astro`)

```
[sticky header]
<main>
  <article>
    <header class="post-header">   ← date + h1 + description, border-bottom
    [hero image]                   ← full width, border-radius 8px
    <div class="prose">            ← slot for post body
  </article>
</main>
[footer with subscribe strip]
```

**Post header:**
- Meta (date): 0.875rem, `var(--text-muted)`
- h1: 2rem (1.625rem mobile), line-height 1.2
- Description: 1.1rem, `var(--text-muted)`
- Bottom border: `1px solid var(--border)`, padding-bottom `1.5rem`

**Hero image:** `width: 100%`, `border-radius: 8px`, rendered at 680×360

**Prose body:** `line-height: 1.8`

---

## Post List (Writings page / Homepage recent posts)

Each post row is a flex link:
- Title left (weight 500), date right (0.875rem, `var(--text-muted)`, `white-space: nowrap`)
- Padding: `0.75rem 0`, bottom border: `1px solid var(--border)`
- Hover: all text → `var(--accent)`, no underline
- Optional description below: 0.875rem, `var(--text-muted)`, margin `0.25rem 0 0.75rem 0`
- On `max-width: 500px`: column layout, title above date

---

## Prose Elements

**Links:** `var(--accent)`, no underline by default. Hover → `var(--accent-hover)` + underline.

**Blockquote:**
```css
border-left: 3px solid var(--accent);
padding: 0.25rem 0 0.25rem 1.25rem;
color: var(--text-muted);
font-style: italic;
```

**Inline code:** 0.875em, `padding: 0.15em 0.4em`, `background: var(--code-bg)`, `border-radius: 4px`

**Code blocks:** `padding: 1.25rem 1.5rem`, `border-radius: 8px`, `border: 1px solid var(--border)`, `background: var(--code-bg)`, `overflow-x: auto`

**HR:** `border-top: 1px solid var(--border)`, `margin: 2rem 0`, no other styling

**Images:** `max-width: 100%`, `border-radius: 6px`

**Tables:** full width, `border-collapse: collapse`, cells padded `0.5rem 0.75rem`, `border: 1px solid var(--border)`

---

## Spacing Rhythm

| Token | Value | Used for |
|---|---|---|
| `0.25rem` | 4px | Tight gaps (list item bottom, nav gap) |
| `0.5rem` | 8px | Input/button row gap |
| `0.75rem` | 12px | Post row padding, small margins |
| `1rem` | 16px | Base horizontal padding |
| `1.25rem` | 20px | Paragraph margin, blockquote indent |
| `1.5rem` | 24px | Section padding, horizontal nav padding |
| `2rem` | 32px | HR margin, section gaps |
| `2.5rem` | 40px | Large section separation |
| `3rem` | 48px | Main top/bottom padding |

---

## Border Radius

| Value | Used for |
|---|---|
| `4px` | Inline code, favicon image |
| `5px` | Form inputs, buttons |
| `6px` | Nav link hover background, images |
| `8px` | Code blocks, hero image |
| `999px` | Pill-shaped tags (about page social links) |

---

## Transitions

All interactive transitions use `0.15s` with no easing specified (defaults to `ease`):
```css
transition: color 0.15s;
transition: color 0.15s, background-color 0.15s;
transition: border-color 0.15s;
transition: background 0.15s;
```

No transform animations. No entrance animations. Keep it still.

---

## Patterns to Follow

- **No hardcoded colors.** Always use a CSS variable.
- **No Tailwind, no UI framework.** Scoped `<style>` blocks per component or additions to `global.css`.
- **Scoped styles in components.** Only truly global styles (reset, type scale, color vars) go in `global.css`.
- **New pages get the form automatically** — it lives in `Footer.astro`, not on individual pages.
- **JSON-LD schema** is injected by `BlogPost.astro` for every post — no action needed in frontmatter.
- **Third-party scripts** go only in `src/components/ExternalSnippets.astro` — never inline in pages.
