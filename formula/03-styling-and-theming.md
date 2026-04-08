# Step 3: Styling & Theming

## 3.1 Brand Color System

Define your brand colors as CSS custom properties in `src/app/globals.css`. This is the Tailwind v4 approach — no `tailwind.config.ts` needed.

```css
@import "tailwindcss";

:root {
  --brand-primary:       #______;  /* Dark color — headers, admin bg */
  --brand-primary-light: #______;  /* Hover state for primary */
  --brand-accent:        #______;  /* Accent — CTAs, highlights */
  --brand-accent-light:  #______;  /* Hover state for accent */
  --brand-bg:            #______;  /* Page background */
  --brand-bg-alt:        #______;  /* Alternate section background */
  --brand-text:          #6b7280;  /* Secondary text color (gray works universally) */
  --background:          var(--brand-bg);
  --foreground:          var(--brand-primary);
}

@theme inline {
  --color-background:         var(--background);
  --color-foreground:         var(--foreground);
  --color-brand-primary:      var(--brand-primary);
  --color-brand-primary-light:var(--brand-primary-light);
  --color-brand-accent:       var(--brand-accent);
  --color-brand-accent-light: var(--brand-accent-light);
  --color-brand-bg:           var(--brand-bg);
  --color-brand-bg-alt:       var(--brand-bg-alt);
  --color-brand-text:         var(--brand-text);
  --font-sans:  var(--font-body),    system-ui, sans-serif;
  --font-serif: var(--font-display), Georgia,   serif;
}
```

This lets you use classes like `bg-brand-primary`, `text-brand-accent`, etc.

**To customize for a new business**: change the hex values in `:root`. The entire site theme updates automatically.

## 3.2 Typography

Load two Google Fonts in the root layout — one serif for headings, one sans for body:

```tsx
// src/app/layout.tsx
import { Your_Serif_Font, Your_Sans_Font } from "next/font/google";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Apply to <html>:
<html className={`${serif.variable} ${sans.variable}`}>
```

Use `font-serif` for headings and `font-sans` for body text.

## 3.3 Animations

Add to `globals.css`:

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.animate-fade-up  { animation: fade-up  0.75s cubic-bezier(0.22, 1, 0.36, 1) both; }
.animate-fade-in  { animation: fade-in  0.6s  ease both; }

.delay-100 { animation-delay: 0.10s; }
.delay-200 { animation-delay: 0.20s; }
.delay-300 { animation-delay: 0.30s; }
```

Usage: `<h1 className="animate-fade-up">` or `<p className="animate-fade-up delay-200">` for staggered reveals.

## 3.4 Texture Overlay (Grain)

A subtle noise texture overlay class for dark sections:

```css
.grain { position: relative; }
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* inline SVG noise */
  background-repeat: repeat;
  pointer-events: none;
  z-index: 1;
}
```

**Important**: Apply `.grain` directly on the container element, not on an absolutely-positioned child. The class sets `position: relative` which conflicts with `absolute` positioning.

## 3.5 Reusable UI Patterns

### Section with label + heading
```html
<section class="bg-brand-bg px-4 py-20">
  <div class="mx-auto max-w-6xl">
    <p class="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
      Section Label
    </p>
    <h2 class="font-serif text-3xl font-bold text-brand-primary">
      Section Heading
    </h2>
  </div>
</section>
```

### CTA Button (gold/accent)
```html
<a class="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-brand-primary hover:bg-brand-accent-light">
```

### Card with ring border
```html
<div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-primary/5">
```

### Dark section
```html
<section class="grain bg-brand-primary px-4 py-20">
  <!-- white text content -->
</section>
```

## 3.6 Admin Theme

Admin uses a darker variant of the primary color for backgrounds:
- Page bg: a color slightly darker than `--brand-primary` (e.g., `#0a1520`)
- Cards: `bg-white/5` with `border border-white/5`
- Text hierarchy: `text-white`, `text-white/50`, `text-white/30`
- Form inputs: `bg-white/5 border-white/10 text-white`
- Active nav item: `bg-brand-accent/15 text-brand-accent`
