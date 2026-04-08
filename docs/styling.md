# Styling & Design System

## Tailwind CSS 4

The project uses Tailwind CSS v4 with the new `@theme inline` syntax in `globals.css`. No `tailwind.config.ts` file — all theme configuration is done via CSS custom properties.

## Brand Colors

| Token | Hex | Tailwind Class | Usage |
|-------|-----|---------------|-------|
| Navy | `#0d1b2a` | `bg-forteca-navy`, `text-forteca-navy` | Primary dark color, headers, admin |
| Navy Light | `#1b2e45` | `bg-forteca-navy-light` | Hover states |
| Gold | `#c9a84c` | `bg-forteca-gold`, `text-forteca-gold` | Accent, CTAs, highlights |
| Gold Light | `#e0c47a` | `bg-forteca-gold-light` | Hover states for gold buttons |
| Cream | `#f5f0e8` | `bg-forteca-cream` | Page backgrounds |
| Cream Dark | `#ede7da` | `bg-forteca-cream-dark` | Alternate section backgrounds |
| Slate | `#6b7280` | `text-forteca-slate` | Secondary text |
| Charcoal | `#1e293b` | `text-forteca-charcoal` | Dark text |

## Typography

| Font | Variable | Tailwind Class | Usage |
|------|----------|---------------|-------|
| Playfair Display | `--font-display` | `font-serif` | Headings, hero text, property names |
| DM Sans | `--font-body` | `font-sans` | Body text, UI, buttons |

Both loaded via `next/font/google` with `display: "swap"` in the root layout.

## Common Patterns

### Section Headers
```html
<p class="mb-2 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
  Section Label
</p>
<h2 class="font-serif text-3xl font-bold text-forteca-navy sm:text-4xl">
  Section Title
</h2>
```

### Gold CTA Button
```html
<a class="inline-flex items-center gap-2 rounded-full bg-forteca-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-forteca-navy transition-all hover:bg-forteca-gold-light">
  Button Text <ArrowRight />
</a>
```

### Ghost Button (on dark backgrounds)
```html
<a class="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white">
  Button Text
</a>
```

### Card
```html
<div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forteca-navy/5">
  <!-- content -->
</div>
```

### Dark Section (with grain texture)
```html
<section class="grain bg-forteca-navy px-4 py-20">
  <!-- .grain adds a subtle noise texture overlay via ::after pseudo-element -->
</section>
```

### Gold Decorative Rule
```html
<div class="gold-rule" />        <!-- centered gradient line -->
<div class="gold-rule-left w-24" /> <!-- left-aligned gradient line -->
```

## Animations

Defined in `globals.css`:
- `animate-fade-up` — opacity 0→1, translateY 28px→0 (0.75s)
- `animate-fade-in` — opacity 0→1 (0.6s)
- `animate-scale-in` — opacity 0→1, scale 0.96→1 (0.65s)
- `animate-slide-right` — opacity 0→1, translateX -20px→0 (0.65s)

Delay classes: `delay-100` through `delay-600` (100ms to 700ms)

Used primarily on the homepage hero for staggered reveal.

## Custom CSS Classes

- `.grain` — Adds SVG noise texture overlay (`::after` pseudo-element). Sets `position: relative`. Use directly on the container, not as an absolute child.
- `.gold-rule` — 1px gradient line (transparent → gold → transparent)
- `.gold-rule-left` — 1px gradient line (gold → transparent)
- `.card-lift` — Hover effect: translateY(-4px) + enhanced shadow
- `.img-zoom` — Hover effect: scale(1.04) on child images

## Admin Dark Theme

Admin pages use a darker palette:
- Background: `#0a1520` (set on the `(dashboard)/layout.tsx`)
- Cards: `bg-white/5` with `border border-white/5`
- Text: `text-white` (primary), `text-white/50` (secondary), `text-white/30` (tertiary)
- Hover: `hover:bg-white/[0.03]` or `hover:bg-white/5`
- Inputs: `bg-white/5 border-white/10 text-white placeholder-white/30`
- Active nav: `bg-forteca-gold/15 text-forteca-gold`
