# Premium Service Business Website — Build Template

> **Purpose:** Drop this document into any new premium service business website project and Claude (or any AI agent) has everything it needs to execute the build. Derived from the Green Light Construction Ottawa build. Reusable for renovations, law firms, medical practices, real estate, and any high-end local service business.

---

## Table of Contents

- [Section 0 — Quick Start](#section-0--quick-start)
- [Section 1 — Stack & Dependencies](#section-1--stack--dependencies)
- [Section 2 — Design System — "Midnight Luxe"](#section-2--design-system--midnight-luxe)
- [Section 3 — Project Structure](#section-3--project-structure)
- [Section 4 — Bootstrap Sequence](#section-4--bootstrap-sequence)
- [Section 5 — Core Config Files](#section-5--core-config-files)
- [Section 6 — Animation System](#section-6--animation-system)
- [Section 7 — UI Component Library](#section-7--ui-component-library)
- [Section 8 — Layout Architecture](#section-8--layout-architecture)
- [Section 9 — Data Schema Patterns](#section-9--data-schema-patterns)
- [Section 10 — Page Templates](#section-10--page-templates)
- [Section 11 — Conventions & Rules](#section-11--conventions--rules)
- [Section 12 — AI Agent Build System](#section-12--ai-agent-build-system)
- [Section 13 — Deployment](#section-13--deployment)
- [Section 14 — Brand Voice & Copy Standards](#section-14--brand-voice--copy-standards)
- [Section 15 — Brand Swap Checklist](#section-15--brand-swap-checklist)
- [Section 16 — Client Intake Protocol](#section-16--client-intake-protocol)
- [Appendix — CLAUDE.md Template](#appendix--claudemd-template)

---

## Section 0 — Quick Start

**One-sentence purpose:** Drop this document into any new premium service business website project and Claude (or any AI agent) has everything it needs to execute the build.

### Two Usage Modes

**(a) AI-agent build** — inject Section 12 prompts into three Claude sessions. PM Alpha runs first to produce the foundation and UI components, then PM Beta and PM Gamma run simultaneously to build pages, after which PM Alpha returns for QA and final build validation.

**(b) Manual / single-agent build** — follow Sections 4–11 sequentially. Use the bootstrap sequence in Section 4 as your checklist, then implement each config file, hook, component, layout file, data file, and page in order.

### Build Order

```
Config → index.css + main.jsx → Hooks → UI Components → Layout → Data Files → Pages → App.jsx → QA
```

### Pre-flight Checklist

After the initial scaffold and install, verify these three things before writing any component code:

- `npm run dev` starts on localhost:5173 with zero console errors
- Tailwind color tokens render correctly — check that a `bg-gl-accent` div shows champagne gold (#C9A84C)
- Google Fonts load — open DevTools Network tab and confirm Inter, Playfair Display, and JetBrains Mono are served from fonts.googleapis.com

---

## Section 1 — Stack & Dependencies

### Install Sequence (exact order matters)

```bash
npm create vite@latest client-website -- --template react
cd client-website

# Step 1: Install React 18 explicitly (do NOT allow React 19)
npm install react@18 react-dom@18

# Step 2: Install runtime dependencies (lenis is required from day 1)
npm install gsap lenis react-router-dom lucide-react react-compare-slider

# Step 3: Install dev dependencies
npm install -D tailwindcss@3.4.17 postcss autoprefixer

# Step 4: Init Tailwind
npx tailwindcss init -p
```

### Confirmed Package Versions

| Package | Version | Notes |
|---------|---------|-------|
| React | **18** | Do NOT use 19 — peer dependency conflicts with some packages |
| react-dom | **18** | Must match React version |
| Vite | latest | Framework preset: react |
| Tailwind CSS | **3.4.17** | Do NOT use v4 — breaking API changes |
| GSAP | 3.x | ScrollTrigger registered globally in main.jsx |
| Lenis | latest | Smooth scroll — init in main.jsx from day 1 |
| react-compare-slider | latest | Used for BeforeAfterSlider — NOT react-compare-image |
| lucide-react | latest | Icon library |
| React Router | v6 | Client-side routing |

> **Critical note:** Use `react-compare-slider`, not `react-compare-image`. The former is actively maintained with no React 18 peer issues and provides a more accessible comparison handle.

> **Critical note:** Lenis is part of the initial install, not added later. It must be initialized in `main.jsx` on day one because it patches the native scroll behavior that GSAP ScrollTrigger depends on. Adding it later requires re-testing all scroll animations.

---

## Section 2 — Design System — "Midnight Luxe"

Inspired by a private members' club meets a high-end watchmaker's atelier. Every design decision reinforces exclusivity, craft, and permanence.

### Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `gl-bg` | `#0D0D12` | Page background (Obsidian) |
| `gl-surface` | `#FAF8F5` | Primary text + light card surfaces (Ivory) |
| `gl-accent` | `#C9A84C` | CTAs, highlights, active states (Champagne Gold) |
| `gl-dark` | `#2A2A35` | Cards, secondary backgrounds (Slate) |
| `gl-muted` | `#9A9A9F` | Secondary text, captions, placeholders |
| border | `rgba(201,168,76,0.15)` | Subtle gold borders — use inline style or Tailwind arbitrary |

**Rule: NEVER hardcode hex values in JSX. Always use Tailwind tokens (`bg-gl-accent`, `text-gl-surface`, etc.).**

### Typography

| Role | Font | Usage |
|------|------|-------|
| Body / Headings | Inter | All sans-serif text, weights 400/500/600/700 |
| Drama / Serif | Playfair Display Italic | Use `<em>` inside headings — globally styled in index.css. **Never** use `className="font-serif italic"` |
| Mono / Labels | JetBrains Mono | Tags, eyebrows, step numbers, prices, form labels |

**The `<em>` tag convention:** In `index.css`, the `em` selector is styled globally as Playfair Display italic. This means any `<em>` inside a heading automatically renders in the drama serif. Never override this with Tailwind classes — always use bare `<em>` tags.

```jsx
// Correct:
<h1>Transforming Ottawa Homes.<br /><em>On Time, On Budget.</em></h1>

// Wrong:
<h1>Transforming Ottawa Homes.<br /><span className="font-serif italic">On Time, On Budget.</span></h1>
```

### Google Fonts Load Order

Preconnect links MUST come before the stylesheet link. The order matters for performance.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

### Spacing System

```
Section padding:    py-24 lg:py-36
Horizontal padding: px-6 md:px-16
Container:          max-w-7xl mx-auto
Cards (grid):       max-w-6xl mx-auto
Single content:     max-w-4xl mx-auto
Border radius:      rounded-2xl (cards), rounded-3xl (large containers), rounded-full (pills/buttons)
```

No sharp corners anywhere — the design system enforces rounded edges at every scale.

### Hero H1 Pattern (canonical)

```jsx
<h1 className="text-5xl md:text-7xl font-bold text-gl-surface leading-tight tracking-tight">
  Transforming [City] Homes.<br />
  <em>On Time, On Budget.</em>
</h1>
```

Always two lines: a bold sans statement + a Playfair italic emotional line. The contrast between the two typefaces creates the signature "Midnight Luxe" visual tension.

### CTA Copy Rules

| Context | Use | Never use |
|---------|-----|-----------|
| Primary contact | "Get My Project Estimate" | "Submit", "Send", "Contact Us" |
| Booking prompt | "Book Your Free Consultation" | "Click Here" |
| Service learn-more | "Explore [Service] →" | "Learn More", "Read More" |
| Form final step | "Get My Estimate" | "Submit Form", "Send Request" |

Price language: always "investment", never "cost" or "price" in client-facing copy.

### Micro-interactions (reference)

- Buttons: `scale(1.03)` on hover with `cubic-bezier(0.25, 0.46, 0.45, 0.94)` via useMagneticEffect
- Cards: `translateY(-4px)` lift + shadow increase on hover
- Links in nav: `translateY(-1px)` lift on hover

---

## Section 3 — Project Structure

Full directory tree after all sprints are complete:

```
src/
├── App.jsx                    # Router + LeadMagnetPopup
├── main.jsx                   # Lenis + GSAP + ScrollTrigger bootstrap
├── index.css                  # Design tokens + animation classes
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         # Fixed pill, scroll morph
│   │   ├── Footer.jsx         # 4-col grid, NAP block
│   │   └── PageLayout.jsx     # Outlet + FloatingCTA + ChatWidget
│   ├── sections/
│   │   ├── ProjectCard.jsx    # Portfolio grid card
│   │   └── ProjectModal.jsx   # Portfolio detail lightbox
│   └── ui/
│       ├── Accordion.jsx
│       ├── Badge.jsx
│       ├── BeforeAfterSlider.jsx
│       ├── Button.jsx         # Magnetic + shimmer
│       ├── Card.jsx
│       ├── ChatWidget.jsx     # Fixed bottom-left
│       ├── CostEstimatorSlider.jsx
│       ├── FilterBar.jsx
│       ├── FloatingCTA.jsx    # Fixed bottom-right phone FAB
│       ├── GoogleReviewsWidget.jsx
│       ├── LeadMagnetPopup.jsx
│       ├── MultiStepForm.jsx
│       ├── SectionHeader.jsx
│       ├── TrustBadge.jsx
│       └── VideoModal.jsx
│
├── hooks/
│   ├── useScrollReveal.js     # IntersectionObserver → .is-visible
│   └── useMagneticEffect.js   # Cursor-following translate (desktop only)
│
├── data/
│   ├── services.js
│   ├── projects.js
│   ├── faq.js
│   ├── team.js
│   ├── careers.js
│   ├── inspiration.js
│   └── testimonials.js
│
└── pages/
    ├── HomePage.jsx
    ├── ServicesPage.jsx
    ├── services/
    │   ├── KitchensPage.jsx   # Template for all service sub-pages
    │   ├── BathroomsPage.jsx
    │   ├── BasementsPage.jsx
    │   └── AdditionsPage.jsx
    ├── PortfolioPage.jsx
    ├── AboutPage.jsx
    ├── FaqPage.jsx
    ├── ContactPage.jsx
    ├── CareersPage.jsx
    ├── PrivacyPage.jsx
    └── NotFoundPage.jsx
```

---

## Section 4 — Bootstrap Sequence

Create files in this exact sequence. Each step depends on the previous.

1. `tailwind.config.js` + `postcss.config.js`
2. `vite.config.js` + `vercel.json`
3. `index.html` (fonts + meta tags)
4. `src/index.css` (design tokens + all animation classes)
5. `src/main.jsx` (Lenis + GSAP + ScrollTrigger bootstrap)
6. `src/hooks/useScrollReveal.js`
7. `src/hooks/useMagneticEffect.js`
8. All `src/components/ui/` files (15 components)
9. `src/components/layout/` files — Navbar.jsx, Footer.jsx, PageLayout.jsx
10. `src/data/` files (all 7 data files)
11. `src/pages/` files (stub first, then fill content)
12. `src/App.jsx` — wires all routes together, mounts LeadMagnetPopup

> **Parallel build option:** Steps 10–11 (data files + content pages) can run simultaneously in a separate agent context while the UI components from Step 8 are still being built — provided Step 8 is at least 80% complete so the component APIs are stable. See Section 12 for the full AI Agent Build System.

---

## Section 5 — Core Config Files

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'bg-gl-accent', 'text-gl-bg', 'hover:bg-gl-accent/90',
    'border-gl-accent', 'text-gl-accent', 'hover:bg-gl-accent/10',
    'text-gl-surface', 'hover:text-gl-accent',
    'bg-gl-dark', 'bg-gl-surface', 'bg-gl-bg',
    'text-gl-muted', 'border-gl-muted',
    'text-sm', 'text-base', 'text-lg',
    'px-3', 'px-4', 'px-6', 'px-8',
    'py-1', 'py-2', 'py-3', 'py-4',
  ],
  theme: {
    extend: {
      colors: {
        'gl-bg':      '#0D0D12',
        'gl-surface': '#FAF8F5',
        'gl-accent':  '#C9A84C',
        'gl-dark':    '#2A2A35',
        'gl-muted':   '#9A9A9F',
      },
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### `vercel.json`

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### `index.html` (full file)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="[Company Name] — [City]'s premier Design &amp; Build firm. [Services]. On time, on budget." />
  <title>[Company Name] | [City] Design &amp; Build</title>
  <!-- Google Fonts: preconnect first, then stylesheet -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,700&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

### `src/index.css` (full file — all animation classes)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Design System CSS Variables ─────────────────────────── */
:root {
  --color-bg:      #0D0D12;
  --color-surface: #FAF8F5;
  --color-accent:  #C9A84C;
  --color-dark:    #2A2A35;
  --color-text:    #FAF8F5;
  --color-muted:   #9A9A9F;
  --color-border:  rgba(201, 168, 76, 0.15);
}

/* ─── Base Reset ───────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Playfair Italic shorthand — use <em> inside headings */
em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

/* ─── Focus-Visible Accessibility ─────────────────────────── */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* ─── Noise Overlay (eliminates flat gradient look) ─────────── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
}

/* ─── Scroll Reveal Animations ──────────────────────────────── */
.reveal-up {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity  0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.reveal-up.is-visible {
  opacity: 1;
  transform: none;
}

/* Staggered children — set --i on each child as inline style */
.stagger-children > * {
  transition-delay: calc(var(--i, 0) * 80ms);
}

/* ─── Process Connector Line ─────────────────────────────────── */
.connector-line {
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.connector-line.is-visible { transform: scaleX(1); }

/* ─── Animated Gold Bar ──────────────────────────────────────── */
.gold-bar {
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.gold-bar.is-visible { transform: scaleX(1); }

/* ─── Line-mask reveal (SectionHeader) ──────────────────────── */
.line-mask { display: block; overflow: hidden; }
.line-mask > span {
  display: block;
  transform: translateY(100%);
  transition: transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.line-mask.is-visible > span { transform: translateY(0); }

/* ─── Page Transition Fade ────────────────────────────────────── */
.page-enter { opacity: 0; transform: translateY(12px); }
.page-enter-active {
  opacity: 1; transform: translateY(0);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.page-exit { opacity: 1; }
.page-exit-active { opacity: 0; transition: opacity 0.2s ease; }

/* ─── Reduced Motion ─────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .reveal-up, .stagger-children > *, .connector-line,
  .gold-bar, .line-mask > span, .page-enter-active, .page-exit-active {
    transition: none !important;
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}

/* ─── Floating CTA Pulse Animation ──────────────────────────── */
@keyframes fab-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(201,168,76,0.6); }
  70%  { box-shadow: 0 0 0 12px rgba(201,168,76,0); }
  100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
}

/* ─── Scrollbar ──────────────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 3px; }
```

---

## Section 6 — Animation System

### `src/main.jsx` — Lenis + GSAP Bootstrap

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
})

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>
)
```

### `src/hooks/useScrollReveal.js`

```js
import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el) // fire once — don't re-animate on scroll back
        }
      },
      { threshold: 0, rootMargin: '0px 0px -20% 0px', ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}
```

**Usage:**

```jsx
// Basic reveal:
<div className="reveal-up" ref={useScrollReveal()}>
  ...content
</div>

// Staggered children:
<div className="stagger-children">
  {items.map((item, i) => (
    <div key={item.id} style={{ '--i': i }} className="reveal-up" ref={useScrollReveal()}>
      ...
    </div>
  ))}
</div>
```

### `src/hooks/useMagneticEffect.js`

```js
import { useRef, useEffect } from 'react'

export function useMagneticEffect(maxMove = 6) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none)').matches) return      // skip touch devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMouseEnter = () => {
      el.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      el.style.transform = `translate(${dx * maxMove}px, ${dy * maxMove}px) scale(1.03)`
      el.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
    const onMouseLeave = () => {
      el.style.transform = 'translate(0, 0) scale(1)'
      el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }

    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    return () => {
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [maxMove])
  return ref
}
```

### GSAP Parallax Hero Pattern (service sub-pages)

```jsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Inside the component:
const heroRef = useRef(null)
const heroImgRef = useRef(null)

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(heroImgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
  return () => ctx.revert()
}, [])

// In JSX:
// <section ref={heroRef} className="min-h-[60vh] relative flex items-end overflow-hidden">
//   <img
//     ref={heroImgRef}
//     src="..."
//     alt="..."
//     loading="lazy"
//     decoding="async"
//     style={{ height: '130%', top: '-15%', willChange: 'transform' }}
//     className="absolute inset-0 w-full object-cover"
//   />
//   ...overlay + content
// </section>
```

### GSAP Hero Entrance Pattern (HomePage only)

```jsx
import gsap from 'gsap'
import { useRef, useEffect } from 'react'

// Create refs for each element:
const badgeRef = useRef(null)
const h1Ref = useRef(null)
const h2Ref = useRef(null)
const subRef = useRef(null)
const ctaRef = useRef(null)

useEffect(() => {
  gsap.from(
    [badgeRef.current, h1Ref.current, h2Ref.current, subRef.current, ctaRef.current],
    {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      ease: 'power3.out',
      duration: 0.9,
    }
  )
}, [])

// Attach refs to JSX elements:
// <div ref={badgeRef}>...</div>
// <h1 ref={h1Ref}>...</h1>
// <em ref={h2Ref}>...</em>
// <p ref={subRef}>...</p>
// <div ref={ctaRef}>...</div>
```

### GSAP Counter Animation Pattern (AboutPage stats)

```jsx
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useEffect } from 'react'

// For each stat: { end: 500, suffix: '+', label: 'Projects Delivered' }
const statRef = useRef(null)

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      { val: 0 },
      {
        val: 500,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statRef.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate: function () {
          if (statRef.current) {
            statRef.current.textContent = Math.round(this.targets()[0].val) + '+'
          }
        },
      }
    )
  })
  return () => ctx.revert()
}, [])

// In JSX: <span ref={statRef} className="font-mono text-4xl font-bold text-gl-accent">0</span>
```

---

## Section 7 — UI Component Library

All 15 components in alphabetical order. Each includes its file location, full implementation, and usage example.

---

### Accordion

```jsx
// src/components/ui/Accordion.jsx
// Props:
//   items: Array<{ id, question, answer }>
//
// Uses CSS max-height transition (NOT GSAP) for accessibility and performance.
// Each item has role="region", aria-labelledby, aria-expanded on trigger button.

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Accordion({ items = [] }) {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <div className="flex flex-col divide-y divide-[rgba(201,168,76,0.15)]">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id}>
            <button
              id={`accordion-trigger-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className="text-gl-surface font-medium pr-4 group-hover:text-gl-accent transition-colors">
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className={`text-gl-accent flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? '600px' : '0px' }}
            >
              <p className="text-gl-muted leading-relaxed pb-5 pr-8">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

**Usage:**

```jsx
import { Accordion } from '../components/ui/Accordion'
import { getFaqByCategory } from '../data/faq'

<Accordion items={getFaqByCategory('general')} />
```

---

### Badge

```jsx
// src/components/ui/Badge.jsx
// Props:
//   children: ReactNode
//   variant:  'default' | 'muted' | 'accent'   (default: 'default')
//
// All variants use font-mono text-xs — designed for tags, eyebrows, labels.

export function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-gl-accent/10 text-gl-accent border border-gl-accent/30',
    muted:   'bg-gl-dark text-gl-muted border border-[rgba(201,168,76,0.15)]',
    accent:  'bg-gl-accent text-gl-bg',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full font-mono text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
```

**Usage:**

```jsx
import { Badge } from '../components/ui/Badge'

<Badge>Kitchen</Badge>
<Badge variant="muted">8–14 weeks</Badge>
<Badge variant="accent">New</Badge>
```

---

### BeforeAfterSlider

```jsx
// src/components/ui/BeforeAfterSlider.jsx
// Props:
//   beforeImage: string (URL)
//   afterImage:  string (URL)
//   beforeLabel: string (default: 'Before')
//   afterLabel:  string (default: 'After')
//
// Wraps react-compare-slider with gold handle + badge overlays.
// Uses 16:9 aspect ratio wrapper.

import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { Badge } from './Badge'

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-video w-full">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeImage}
            alt={beforeLabel}
            style={{ objectFit: 'cover' }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterImage}
            alt={afterLabel}
            style={{ objectFit: 'cover' }}
          />
        }
        handle={
          <div className="flex flex-col items-center h-full">
            <div className="w-0.5 flex-1 bg-gl-accent opacity-80" />
            <div className="w-10 h-10 rounded-full bg-gl-accent flex items-center justify-center shadow-lg flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5 8H11M5 8L3 6M5 8L3 10M11 8L13 6M11 8L13 10" stroke="#0D0D12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="w-0.5 flex-1 bg-gl-accent opacity-80" />
          </div>
        }
        style={{ height: '100%' }}
      />
      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <Badge variant="muted">{beforeLabel}</Badge>
      </div>
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <Badge>{afterLabel}</Badge>
      </div>
    </div>
  )
}
```

**Usage:**

```jsx
import { BeforeAfterSlider } from '../components/ui/BeforeAfterSlider'

<BeforeAfterSlider
  beforeImage="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"
  afterImage="https://images.unsplash.com/photo-1556909195-b8842e4e61e3?w=1200&q=80"
/>
{/* TODO: replace with Greenlight portfolio images */}
```

---

### Button

```jsx
// src/components/ui/Button.jsx
// Props:
//   variant:  'primary' | 'secondary' | 'ghost'   (default: 'primary')
//   size:     'sm' | 'md' | 'lg'                  (default: 'md')
//   as:       'button' | 'a' | Link               (default: 'button')
//   children: ReactNode
//   ...rest:  all other HTML button / anchor / Link props
//
// Features: magnetic cursor effect via useMagneticEffect (desktop only),
// shimmer span overlay on primary variant.
// Uses forwardRef so parent can attach refs.

import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { useMagneticEffect } from '../../hooks/useMagneticEffect'

const variants = {
  primary:   'bg-gl-accent text-gl-bg font-semibold hover:bg-gl-accent/90',
  secondary: 'bg-transparent border border-gl-accent text-gl-accent hover:bg-gl-accent/10',
  ghost:     'bg-transparent text-gl-surface hover:text-gl-accent',
}

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
}

export const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', as: Component = 'button', children, className = '', ...rest },
  _ref
) {
  const magneticRef = useMagneticEffect(8)

  const base =
    'relative inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 overflow-hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gl-accent focus-visible:ring-offset-2 focus-visible:ring-offset-gl-bg'

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (Component === Link) {
    return (
      <Link ref={magneticRef} className={classes} {...rest}>
        {variant === 'primary' && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full bg-white/10 skew-x-12 transition-transform duration-500 group-hover:translate-x-full pointer-events-none"
          />
        )}
        {children}
      </Link>
    )
  }

  if (Component === 'a') {
    return (
      <a ref={magneticRef} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button ref={magneticRef} className={classes} {...rest}>
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-white/10 skew-x-12 transition-transform duration-500 group-hover:translate-x-full pointer-events-none"
        />
      )}
      {children}
    </button>
  )
})
```

**Usage:**

```jsx
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

// Internal navigation
<Button as={Link} to="/contact" variant="primary" size="lg">
  Get My Project Estimate
</Button>

// External link
<Button as="a" href="tel:+16135550100" variant="secondary">
  Call Now
</Button>

// Regular button
<Button onClick={handleClick} variant="ghost" size="sm">
  Learn More →
</Button>
```

---

### Card

```jsx
// src/components/ui/Card.jsx
// Props:
//   variant:   'default' | 'dark' | 'feature' | 'testimonial'   (default: 'default')
//   hover:     boolean — enables lift + shadow effect             (default: true)
//   className: string
//   children:  ReactNode
//
// All cards: rounded-2xl, no sharp corners.

export function Card({ variant = 'default', hover = true, className = '', children }) {
  const variants = {
    default:     'bg-gl-dark border border-[rgba(201,168,76,0.15)]',
    dark:        'bg-gl-bg border border-[rgba(201,168,76,0.15)]',
    feature:     'bg-gl-dark border border-[rgba(201,168,76,0.15)] overflow-hidden',
    testimonial: 'bg-gl-dark border border-[rgba(201,168,76,0.15)] italic',
  }

  const hoverClass = hover
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(201,168,76,0.12)]'
    : ''

  return (
    <div className={`rounded-2xl p-6 ${variants[variant]} ${hoverClass} ${className}`}>
      {children}
    </div>
  )
}
```

**Usage:**

```jsx
import { Card } from '../components/ui/Card'

<Card variant="feature">
  <img src="..." alt="..." className="w-full h-48 object-cover rounded-xl mb-4" loading="lazy" decoding="async" />
  <h3 className="text-gl-surface font-bold mb-2">Kitchen Renovations</h3>
  <p className="text-gl-muted text-sm">Transform your kitchen into the heart of your home.</p>
</Card>

<Card variant="testimonial" hover={false}>
  <p className="text-gl-surface mb-4">"They transformed our kitchen in 11 weeks, exactly as promised."</p>
  <p className="text-gl-muted text-sm font-mono not-italic">— Jane M., Westboro</p>
</Card>
```

---

### ChatWidget

```jsx
// src/components/ui/ChatWidget.jsx
// No props — self-contained, mounted by PageLayout.
//
// Fixed bottom-left, toggle open/close.
// Static MESSAGES array — read only, no actual send functionality.
// TODO: update COMPANY_NAME constant and MESSAGES array for each client.

import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

// TODO: update for each client
const COMPANY_NAME = '[Company Name]'

const MESSAGES = [
  {
    id: 1,
    from: 'agent',
    text: `Hi! I'm the ${COMPANY_NAME} virtual assistant. How can I help you today?`,
  },
  {
    id: 2,
    from: 'agent',
    text: 'I can answer questions about our services, pricing ranges, and process. Or I can connect you with our team directly.',
  },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {isOpen && (
        <div className="w-80 bg-gl-dark border border-[rgba(201,168,76,0.15)] rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(201,168,76,0.15)] bg-gl-bg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gl-surface text-sm font-medium">{COMPANY_NAME}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-gl-muted hover:text-gl-surface transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          {/* Messages */}
          <div className="flex flex-col gap-3 p-4 max-h-64 overflow-y-auto">
            {MESSAGES.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === 'agent' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.from === 'agent'
                      ? 'bg-gl-bg text-gl-surface'
                      : 'bg-gl-accent text-gl-bg'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          {/* Input (read-only placeholder — no submission) */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-[rgba(201,168,76,0.15)]">
            <input
              readOnly
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-gl-muted text-sm outline-none placeholder:text-gl-muted/60 cursor-not-allowed"
            />
            <button
              aria-label="Send message (not active in demo)"
              className="text-gl-accent/40"
              disabled
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-center text-[10px] text-gl-muted/40 font-mono pb-2">
            {/* TODO: activate when CRM integration is live */}
            Demo mode — chat not active
          </p>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="w-12 h-12 rounded-full bg-gl-dark border border-[rgba(201,168,76,0.15)] flex items-center justify-center text-gl-accent shadow-lg hover:border-gl-accent transition-colors"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  )
}
```

---

### CostEstimatorSlider

```jsx
// src/components/ui/CostEstimatorSlider.jsx
// Props:
//   minSqft:  number   (minimum square footage)
//   maxSqft:  number   (maximum square footage)
//   minCost:  number   (minimum estimated cost in dollars)
//   maxCost:  number   (maximum estimated cost in dollars)
//   label:    string   (e.g., "Kitchen Size")
//   unit:     string   (e.g., "sq ft")    (default: 'sq ft')
//
// Calculates estimated investment via linear interpolation.
// Formats as CAD currency with en-CA locale.
// Uses CSS custom property for accent-colored range input thumb.

import { useState } from 'react'

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t)
}

export function CostEstimatorSlider({
  minSqft = 100,
  maxSqft = 500,
  minCost = 45000,
  maxCost = 120000,
  label = 'Project Size',
  unit = 'sq ft',
}) {
  const [sqft, setSqft] = useState(Math.round((minSqft + maxSqft) / 2))

  const t = (sqft - minSqft) / (maxSqft - minSqft)
  const estimated = lerp(minCost, maxCost, t)

  const formatted = estimated.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  })

  return (
    <div className="bg-gl-dark rounded-2xl p-6 border border-[rgba(201,168,76,0.15)]">
      <div className="flex items-center justify-between mb-2">
        <label className="text-gl-muted text-sm font-mono">{label}</label>
        <span className="text-gl-surface font-mono text-sm">
          {sqft.toLocaleString()} {unit}
        </span>
      </div>
      <input
        type="range"
        min={minSqft}
        max={maxSqft}
        value={sqft}
        onChange={(e) => setSqft(Number(e.target.value))}
        aria-label={`${label} slider`}
        className="w-full h-2 rounded-full appearance-none cursor-pointer mb-6"
        style={{ accentColor: '#C9A84C' }}
      />
      <div className="text-center">
        <p className="text-gl-muted text-xs font-mono mb-1">Estimated Investment</p>
        <p className="text-gl-accent font-mono text-3xl font-bold">{formatted}</p>
        <p className="text-gl-muted text-xs mt-2">
          * Estimate based on typical {label.toLowerCase()} projects. Final investment confirmed in consultation.
        </p>
      </div>
    </div>
  )
}
```

**Usage:**

```jsx
import { CostEstimatorSlider } from '../../components/ui/CostEstimatorSlider'
import { getServiceBySlug } from '../../data/services'

const service = getServiceBySlug('kitchens')

<CostEstimatorSlider
  minSqft={service.costRanges.minSqft}
  maxSqft={service.costRanges.maxSqft}
  minCost={service.costRanges.minCost}
  maxCost={service.costRanges.maxCost}
  label="Kitchen Size"
/>
```

---

### FilterBar

```jsx
// src/components/ui/FilterBar.jsx
// Props:
//   filters:  Array<{ label: string, value: string }>
//   active:   Array<string>   — array of currently active filter values
//   onChange: (value: string) => void   — called when a pill is clicked
//
// Toggle logic is managed by the parent component.
// This component renders pill buttons only.
// Note: uses ternary not template literal — safe for Tailwind JIT purging.

export function FilterBar({ filters = [], active = [], onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          aria-pressed={active.includes(f.value)}
          className={
            active.includes(f.value)
              ? 'px-4 py-2 rounded-full text-sm font-mono border border-gl-accent bg-gl-accent/10 text-gl-accent transition-all'
              : 'px-4 py-2 rounded-full text-sm font-mono border border-gl-muted/30 text-gl-muted hover:border-gl-accent/50 hover:text-gl-surface transition-all'
          }
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
```

**Usage (PortfolioPage toggle pattern):**

```jsx
import { FilterBar } from '../components/ui/FilterBar'
import { useState } from 'react'

const TYPE_FILTERS = [
  { label: 'Kitchen', value: 'kitchen' },
  { label: 'Bathroom', value: 'bathroom' },
  { label: 'Basement', value: 'basement' },
  { label: 'Addition', value: 'addition' },
]

// In component:
const [activeType, setActiveType] = useState(null)

const handleTypeChange = (value) => {
  setActiveType((prev) => (prev === value ? null : value))
}

// In JSX:
<FilterBar
  filters={TYPE_FILTERS}
  active={activeType ? [activeType] : []}
  onChange={handleTypeChange}
/>
```

---

### FloatingCTA

```jsx
// src/components/ui/FloatingCTA.jsx
// No props — self-contained, mounted by PageLayout.
//
// Fixed bottom-right, pulsing gold ring animation via fab-pulse keyframes.
// TODO: update PHONE_NUMBER and PHONE_DISPLAY for each client.

import { Phone } from 'lucide-react'

// TODO: update for each client
const PHONE_NUMBER = '+16135550100'
const PHONE_DISPLAY = '(613) 555-0100'

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <div
        className="flex items-center gap-2 bg-gl-dark border border-[rgba(201,168,76,0.15)] rounded-full px-4 py-2 shadow-lg"
      >
        <span className="text-gl-muted text-xs font-mono hidden sm:block">
          {PHONE_DISPLAY}
        </span>
      </div>
      <a
        href={`tel:${PHONE_NUMBER}`}
        aria-label={`Call [Company Name] at ${PHONE_DISPLAY}`}
        className="w-14 h-14 rounded-full bg-gl-accent flex items-center justify-center text-gl-bg shadow-xl"
        style={{ animation: 'fab-pulse 2.5s ease-in-out infinite' }}
      >
        <Phone size={22} strokeWidth={2} />
      </a>
    </div>
  )
}
```

---

### GoogleReviewsWidget

```jsx
// src/components/ui/GoogleReviewsWidget.jsx
// No props — self-contained with static review data.
//
// Auto-rotates through reviews every 4 seconds.
// Displays dot indicators for navigation.
// TODO: update RATING, REVIEW_COUNT, and REVIEWS array with real client data.

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

// TODO: update with real client Google review data
const RATING = 4.9
const REVIEW_COUNT = 47

const REVIEWS = [
  {
    id: 'r1',
    author: 'Sarah M.',
    rating: 5,
    text: 'Absolutely exceptional work. Our kitchen is now the envy of the neighbourhood. The team was professional, on time, and on budget.',
    // TODO: replace with real client review
  },
  {
    id: 'r2',
    author: 'David K.',
    rating: 5,
    text: 'From design to handover, every step was seamless. The attention to detail is remarkable. We could not be happier.',
    // TODO: replace with real client review
  },
  {
    id: 'r3',
    author: 'Michelle T.',
    rating: 5,
    text: 'They transformed our basement into a stunning living space in 8 weeks. Communication was clear throughout the entire process.',
    // TODO: replace with real client review
  },
]

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-gl-accent text-gl-accent" />
      ))}
    </div>
  )
}

export function GoogleReviewsWidget() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REVIEWS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const review = REVIEWS[activeIndex]

  return (
    <div className="bg-gl-dark border border-[rgba(201,168,76,0.15)] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* Google G logo */}
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold" style={{ color: '#4285F4' }}>G</span>
          </div>
          <div>
            <p className="text-gl-surface text-sm font-medium">Google Reviews</p>
            <div className="flex items-center gap-1">
              <Stars />
              <span className="text-gl-accent font-mono text-xs ml-1">{RATING}</span>
              <span className="text-gl-muted text-xs">({REVIEW_COUNT} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Review */}
      <div className="min-h-[80px]">
        <p className="text-gl-surface text-sm leading-relaxed italic mb-3">
          "{review.text}"
        </p>
        <div className="flex items-center justify-between">
          <p className="text-gl-muted text-xs font-mono">{review.author}</p>
          <Stars count={review.rating} />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`View review ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-4 h-1.5 bg-gl-accent'
                : 'w-1.5 h-1.5 bg-gl-muted/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
```

---

### LeadMagnetPopup

```jsx
// src/components/ui/LeadMagnetPopup.jsx
// No props — self-contained, mounted directly in App.jsx (outside Routes).
//
// Shows after 12 seconds. sessionStorage guard prevents showing more than once per session.
// Email capture logs to console.log only — no actual submission.
// TODO: update OFFER_HEADLINE, OFFER_BODY, and CTA_TEXT for each client.
// role="dialog" for accessibility.

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

// TODO: update offer copy for each client
const OFFER_HEADLINE = 'Get Our Free Renovation Guide'
const OFFER_BODY = 'Download our 12-page guide: "What Every Ottawa Homeowner Should Know Before Starting a Renovation." No fluff — just process, pricing, and pitfalls.'
const CTA_TEXT = 'Send Me the Guide'
const DELAY_MS = 12000

export function LeadMagnetPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('lead_popup_shown')) return
    const timer = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setVisible(false)
    sessionStorage.setItem('lead_popup_shown', 'true')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Lead magnet email:', email)
    // TODO: connect to CRM/email automation in Phase 2
    setSubmitted(true)
    sessionStorage.setItem('lead_popup_shown', 'true')
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={OFFER_HEADLINE}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gl-bg/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel */}
      <div className="relative z-10 bg-gl-dark border border-[rgba(201,168,76,0.15)] rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute top-4 right-4 text-gl-muted hover:text-gl-surface transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <p className="text-gl-accent font-mono text-sm mb-2">Guide on its way.</p>
            <p className="text-gl-surface font-bold text-xl mb-1">
              Check your inbox.
            </p>
            <p className="text-gl-muted text-sm">
              <em>We will not spam you. One guide, and that is it.</em>
            </p>
          </div>
        ) : (
          <>
            <div className="mb-1">
              <span className="font-mono text-xs text-gl-accent">Free Resource</span>
            </div>
            <h2 className="text-gl-surface font-bold text-xl mb-3 leading-tight">
              {OFFER_HEADLINE}
            </h2>
            <p className="text-gl-muted text-sm leading-relaxed mb-6">
              {OFFER_BODY}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label htmlFor="leadEmail" className="sr-only">Email address</label>
                <input
                  id="leadEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-gl-bg border border-[rgba(201,168,76,0.15)] rounded-xl px-4 py-3 text-gl-surface placeholder:text-gl-muted focus:outline-none focus:border-gl-accent transition-colors text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gl-accent text-gl-bg font-semibold py-3 rounded-full text-sm hover:bg-gl-accent/90 transition-colors"
              >
                {CTA_TEXT}
              </button>
              <p className="text-center text-xs text-gl-muted/60">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
```

---

### MultiStepForm

```jsx
// src/components/ui/MultiStepForm.jsx
// Props:
//   mode: 'contact' | 'careers'   (default: 'contact')
//
// contact mode — 4 steps + Thank You:
//   Step 1: Contact Info (Full Name, Email, Phone)
//   Step 2: Project Type (4 visual tile buttons)
//   Step 3: Timeline + Budget
//   Step 4: Photos + Notes
//   Step 5: Thank You screen
//
// careers mode — 2 steps + Thank You:
//   Step 1: Contact Info (Full Name, Email)
//   Step 2: Experience (textarea + resume placeholder)
//   Step 3: Thank You screen
//
// All submissions → console.log only — no actual data sent.

import { useState } from 'react'
import { Link } from 'react-router-dom'

const CONTACT_STEPS = 4
const CAREERS_STEPS = 2

const PROJECT_TYPES = [
  { id: 'kitchen',  label: 'Kitchen',       icon: '🍳' },
  { id: 'bathroom', label: 'Bathroom',      icon: '🛁' },
  { id: 'basement', label: 'Basement',      icon: '🏗️' },
  { id: 'addition', label: 'Home Addition', icon: '🏠' },
]

const TIMELINES = [
  'As soon as possible',
  'Within 3 months',
  'Within 6 months',
  'Just exploring',
]

const BUDGETS = ['Under $50k', '$50k – $100k', '$100k+']

export function MultiStepForm({ mode = 'contact' }) {
  const totalSteps = mode === 'contact' ? CONTACT_STEPS : CAREERS_STEPS
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})

  const update = (key, val) => setFormData((prev) => ({ ...prev, [key]: val }))

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((s) => s + 1)
    } else {
      console.log('Form data:', formData)
      // TODO: connect to CRM/email automation in Phase 2
      setStep(totalSteps + 1)
    }
  }

  const handleBack = () => setStep((s) => s - 1)

  const inputClass =
    'bg-gl-dark border border-[rgba(201,168,76,0.15)] rounded-xl px-4 py-3 text-gl-surface placeholder:text-gl-muted focus:outline-none focus:border-gl-accent transition-colors w-full'

  // Thank you screen
  if (step === totalSteps + 1) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-gl-accent/10 border border-gl-accent/30 flex items-center justify-center mx-auto mb-4">
          <span className="text-gl-accent text-2xl">✓</span>
        </div>
        <h3 className="text-xl font-bold text-gl-surface mb-2">
          {mode === 'contact'
            ? "We've received your project details."
            : "Thanks for your interest in joining us."}
        </h3>
        <p className="text-gl-muted text-sm mb-1">
          <em>
            {mode === 'contact'
              ? 'A consultant will reach out within 24 hours.'
              : "We'll review your application within 5 business days."}
          </em>
        </p>
        <Link
          to="/"
          className="mt-6 inline-block text-gl-accent font-mono text-sm hover:underline"
        >
          ← Return to Homepage
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <p className="font-mono text-xs text-gl-muted mb-2">
          Step {step} of {totalSteps}
        </p>
        <div className="h-1 bg-gl-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-gl-accent rounded-full transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Contact mode steps ── */}

      {mode === 'contact' && step === 1 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gl-surface mb-2">Contact Information</h3>
          <div>
            <label htmlFor="fullName" className="block text-gl-muted text-sm mb-1">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Jane Smith"
              className={inputClass}
              onChange={(e) => update('fullName', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gl-muted text-sm mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              className={inputClass}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gl-muted text-sm mb-1">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="(613) 555-0000"
              className={inputClass}
              onChange={(e) => update('phone', e.target.value)}
            />
          </div>
        </div>
      )}

      {mode === 'contact' && step === 2 && (
        <div>
          <h3 className="text-lg font-bold text-gl-surface mb-4">What are you renovating?</h3>
          <div className="grid grid-cols-2 gap-3">
            {PROJECT_TYPES.map((pt) => (
              <button
                key={pt.id}
                onClick={() => update('projectType', pt.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  formData.projectType === pt.id
                    ? 'border-gl-accent bg-gl-accent/10'
                    : 'border-[rgba(201,168,76,0.15)] bg-gl-dark/60'
                }`}
              >
                <span className="text-2xl block mb-2">{pt.icon}</span>
                <span className="text-gl-surface font-medium text-sm">{pt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === 'contact' && step === 3 && (
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-bold text-gl-surface mb-3">When are you looking to start?</h3>
            <label htmlFor="timeline" className="sr-only">Project timeline</label>
            <select
              id="timeline"
              className={inputClass}
              onChange={(e) => update('timeline', e.target.value)}
            >
              <option value="">Select timeline...</option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gl-surface mb-3">Budget range?</h3>
            <div className="flex flex-col gap-2">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  onClick={() => update('budget', b)}
                  className={`px-4 py-3 rounded-xl border text-left text-sm transition-all ${
                    formData.budget === b
                      ? 'border-gl-accent bg-gl-accent/10 text-gl-accent'
                      : 'border-[rgba(201,168,76,0.15)] text-gl-muted'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === 'contact' && step === 4 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gl-surface mb-2">Photos &amp; Notes</h3>
          <div className="border-2 border-dashed border-gl-muted/40 rounded-xl p-6 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              id="photoUpload"
              onChange={(e) => update('photos', e.target.files)}
            />
            <label htmlFor="photoUpload" className="cursor-pointer text-gl-muted text-sm">
              Click to upload photos (optional)
            </label>
            <p className="text-xs text-gl-muted/60 mt-2">
              {/* TODO: Photo uploads activate when backend is connected */}
              JPG, PNG up to 10MB each
            </p>
          </div>
          <div>
            <label htmlFor="notes" className="block text-gl-muted text-sm mb-1">
              Describe your space (optional)
            </label>
            <textarea
              id="notes"
              rows={4}
              className={inputClass}
              placeholder="Tell us about your current space and what you have in mind..."
              onChange={(e) => update('notes', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* ── Careers mode steps ── */}

      {mode === 'careers' && step === 1 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gl-surface mb-2">Your Information</h3>
          <div>
            <label htmlFor="careerName" className="block text-gl-muted text-sm mb-1">Full Name</label>
            <input
              id="careerName"
              type="text"
              placeholder="Jane Smith"
              className={inputClass}
              onChange={(e) => update('fullName', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="careerEmail" className="block text-gl-muted text-sm mb-1">Email Address</label>
            <input
              id="careerEmail"
              type="email"
              placeholder="jane@example.com"
              className={inputClass}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>
        </div>
      )}

      {mode === 'careers' && step === 2 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gl-surface mb-2">Experience</h3>
          <div>
            <label htmlFor="experience" className="block text-gl-muted text-sm mb-1">
              Tell us about your experience
            </label>
            <textarea
              id="experience"
              rows={5}
              className={inputClass}
              placeholder="Describe your background, years of experience, and why you'd like to join our team..."
              onChange={(e) => update('experience', e.target.value)}
            />
          </div>
          <div className="border-2 border-dashed border-gl-muted/40 rounded-xl p-4 text-center">
            <p className="text-gl-muted text-sm">Resume (PDF) — Coming in Phase 2</p>
            <p className="text-xs text-gl-muted/50 mt-1">
              {/* TODO: activate file upload when backend is connected */}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 rounded-full border border-gl-muted/30 text-gl-muted text-sm font-mono hover:border-gl-accent hover:text-gl-surface transition-all"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="flex-1 bg-gl-accent text-gl-bg font-semibold py-3 rounded-full text-sm hover:bg-gl-accent/90 transition-colors"
        >
          {step === totalSteps ? 'Get My Estimate' : 'Continue →'}
        </button>
      </div>
    </div>
  )
}
```

---

### SectionHeader

```jsx
// src/components/ui/SectionHeader.jsx
// Props:
//   eyebrow:    string   — small mono label above heading (optional)
//   heading:    ReactNode — main heading content (can include <em> for Playfair)
//   subheading: string   — paragraph below heading (optional)
//   align:      'left' | 'center'   (default: 'center')
//   className:  string
//
// Uses line-mask reveal animation via internal IntersectionObserver.

import { useRef, useEffect } from 'react'

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = 'center',
  className = '',
}) {
  const wrapperRef = useRef(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const masks = el.querySelectorAll('.line-mask')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          masks.forEach((m) => m.classList.add('is-visible'))
          observer.unobserve(el)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -15% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const alignClass = align === 'left' ? 'text-left' : 'text-center'

  return (
    <div ref={wrapperRef} className={`${alignClass} ${className}`}>
      {eyebrow && (
        <span className="line-mask inline-block mb-3">
          <span className="font-mono text-xs text-gl-accent tracking-widest uppercase">
            {eyebrow}
          </span>
        </span>
      )}
      <h2 className="line-mask text-3xl md:text-5xl font-bold text-gl-surface leading-tight tracking-tight mb-4">
        <span>{heading}</span>
      </h2>
      {subheading && (
        <p className="line-mask text-gl-muted text-lg max-w-2xl mx-auto leading-relaxed">
          <span>{subheading}</span>
        </p>
      )}
    </div>
  )
}
```

**Usage:**

```jsx
import { SectionHeader } from '../components/ui/SectionHeader'

<SectionHeader
  eyebrow="Our Services"
  heading={<>Renovations Built to <em>Last a Lifetime</em></>}
  subheading="From kitchens to full home additions, we manage every detail from design through handover."
/>
```

---

### TrustBadge

```jsx
// src/components/ui/TrustBadge.jsx
// Props:
//   icon:     ReactNode — Lucide icon at size={20}
//   label:    string
//   variant:  'accreditation' | 'rating' | 'stat'   (default: 'accreditation')
//   value:    string — stat variant only (large number e.g. "500+")
//   sublabel: string — stat variant only (text below value)
//
// No background, no border — lives inside a container with its own styling.

export function TrustBadge({ icon, label, variant = 'accreditation', value, sublabel }) {
  if (variant === 'stat') {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="text-gl-accent">{icon}</div>
        <p className="font-mono text-2xl font-bold text-gl-accent leading-none">{value}</p>
        <p className="text-xs text-gl-muted font-mono">{sublabel}</p>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-gl-accent">{icon}</span>
      <span className="text-gl-surface text-sm font-medium">{label}</span>
    </div>
  )
}
```

**Usage:**

```jsx
import { TrustBadge } from '../components/ui/TrustBadge'
import { ShieldCheck, Award, Home, Star } from 'lucide-react'

// Accreditation badges (horizontal strip):
<TrustBadge variant="accreditation" icon={<ShieldCheck size={20} />} label="BBB A+ Rated" />
<TrustBadge variant="accreditation" icon={<Award size={20} />} label="Licensed & Insured" />
<TrustBadge variant="rating" icon={<Star size={20} />} label="5-Star Rated" />

// Stat badges (vertical stack):
<TrustBadge variant="stat" value="500+" sublabel="Projects Completed" icon={<Home size={20} />} />
<TrustBadge variant="stat" value="15+" sublabel="Years Experience" icon={<Award size={20} />} />
```

---

### VideoModal

```jsx
// src/components/ui/VideoModal.jsx
// Props:
//   isOpen:  boolean
//   onClose: () => void
//
// role="dialog" for accessibility.
// Backdrop blur. Placeholder play button — replace iframe src when real video is available.
// TODO: replace VIDEO_EMBED_URL with actual YouTube/Vimeo embed URL.

import { useEffect } from 'react'
import { X, Play } from 'lucide-react'

// TODO: update for each client
const VIDEO_EMBED_URL = ''
// e.g. "https://www.youtube.com/embed/VIDEO_ID?autoplay=1"

export function VideoModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Project video"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gl-bg/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-4xl">
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-10 right-0 text-gl-muted hover:text-gl-surface transition-colors flex items-center gap-1 text-sm font-mono"
        >
          <X size={16} /> Close
        </button>

        <div className="relative aspect-video bg-gl-dark rounded-2xl overflow-hidden">
          {VIDEO_EMBED_URL ? (
            <iframe
              src={VIDEO_EMBED_URL}
              title="Project video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            // Placeholder when no video URL is configured
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gl-accent/20 border border-gl-accent/40 flex items-center justify-center mb-4">
                <Play size={28} className="text-gl-accent ml-1" />
              </div>
              <p className="text-gl-muted text-sm font-mono">
                {/* TODO: add VIDEO_EMBED_URL to activate */}
                Video coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

**Usage:**

```jsx
import { VideoModal } from '../components/ui/VideoModal'
import { useState } from 'react'

const [videoOpen, setVideoOpen] = useState(false)

<button onClick={() => setVideoOpen(true)}>Watch Our Process</button>
<VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
```

---

## Section 8 — Layout Architecture

### `src/App.jsx` (full file)

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import { LeadMagnetPopup } from './components/ui/LeadMagnetPopup'

// Page imports — stub pattern during initial build:
const Stub = ({ name }) => (
  <div className="min-h-screen flex items-center justify-center text-gl-muted font-mono text-sm">
    [{name}] — stub, pending build
  </div>
)

// Replace stubs with real page imports as each page is completed:
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import KitchensPage from './pages/services/KitchensPage'
import BathroomsPage from './pages/services/BathroomsPage'
import BasementsPage from './pages/services/BasementsPage'
import AdditionsPage from './pages/services/AdditionsPage'
import PortfolioPage from './pages/PortfolioPage'
import AboutPage from './pages/AboutPage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'
import CareersPage from './pages/CareersPage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      {/* LeadMagnetPopup is outside Routes so it persists across navigation */}
      <LeadMagnetPopup />
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/kitchens" element={<KitchensPage />} />
          <Route path="services/bathrooms" element={<BathroomsPage />} />
          <Route path="services/basements" element={<BasementsPage />} />
          <Route path="services/additions" element={<AdditionsPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

### `src/components/layout/PageLayout.jsx` (full file)

```jsx
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { FloatingCTA } from '../ui/FloatingCTA'
import { ChatWidget } from '../ui/ChatWidget'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function PageLayout() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('page-enter-active')

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('page-exit-active')
    }
  }, [location, displayLocation])

  const handleAnimationEnd = () => {
    if (transitionStage === 'page-exit-active') {
      setDisplayLocation(location)
      setTransitionStage('page-enter-active')
    }
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className={transitionStage} onTransitionEnd={handleAnimationEnd}>
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
      <ChatWidget />
    </>
  )
}
```

### Navbar Specification

The Navbar is too large to include in full here but must implement these behaviors:

- **Fixed pill** — `position: fixed`, `top: 1.5rem`, centered horizontally, pill shape (`rounded-full`)
- **Scroll morph** — transparent on hero, `bg-gl-bg/80 backdrop-blur-xl border border-[rgba(201,168,76,0.15)]` on scroll
- **Scroll detection** — `IntersectionObserver` watching `#navbar-sentinel` div placed at bottom of HomePage hero. When sentinel exits viewport upward, `setScrolled(true)`.
- **Fallback** — On all non-home routes (where no `#navbar-sentinel` exists), default to `scrolled = true` immediately.
- **Threshold** — Use `threshold: 0` on the IntersectionObserver, not `0.5`. Higher values cause flickering on fast scrolls.
- **Mobile** — Hamburger button with `aria-expanded` attribute. Full-screen overlay with `role="dialog"`, `aria-label="Navigation menu"`. Close on route change via `useEffect` watching `pathname`.
- **Active route** — `useLocation()` to compare `pathname`, highlight active link with `text-gl-accent`.

### Footer Specification

- 4-column grid (`lg:grid-cols-4`): Brand column / Services links / Company links / Contact NAP
- **Brand column** — Logo/name, 1-sentence tagline, pulsing status dot (`animate-ping`) with "Ottawa, ON" label
- **Services links** — list of service page routes using `<Link>`
- **Company links** — About, Portfolio, FAQ, Careers, Privacy
- **Contact NAP** — Address, `tel:` phone link, `mailto:` email link
- **Bottom bar** — copyright + Privacy Policy link, both `font-mono text-xs text-gl-muted`
- **Pulsing dot pattern:**

```jsx
<span className="relative flex h-2 w-2 mr-2">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
</span>
```

---

## Section 9 — Data Schema Patterns

All 7 data files, their schemas, helper exports, and usage notes.

### `src/data/services.js`

```js
export const services = [
  {
    id: 'kitchens',
    slug: 'kitchens',
    name: 'Kitchen Renovations',
    tagline: 'The heart of your home, reimagined.',
    description:
      'From custom cabinetry and premium stone countertops to chef-grade appliances and statement lighting — we design and build kitchens that balance beauty with everyday function.',
    priceRange: '$45,000 – $120,000',
    timeline: '8–14 weeks',
    imageUrl:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    // TODO: replace with client photography
    included: [
      'Full design consultation and 3D rendering',
      'Custom cabinetry (local millwork)',
      'Stone or quartz countertop supply and installation',
      'Plumbing rough-in and fixture installation',
      'Electrical panel upgrade and lighting design',
      'Flooring supply and installation',
      'Full cleanup and site protection throughout',
    ],
    costRanges: {
      minSqft: 100,
      maxSqft: 500,
      minCost: 45000,
      maxCost: 120000,
    },
    // faqTags drives the FAQ preview section on this service's page
    faqTags: ['kitchen', 'pricing', 'process'],
  },
  {
    id: 'bathrooms',
    slug: 'bathrooms',
    name: 'Bathroom Renovations',
    tagline: 'Spa-grade finishes, zero compromise.',
    description:
      'Custom tile work, heated floors, frameless glass, and luxury fixtures — we create bathrooms that feel like personal retreats and add measurable resale value.',
    priceRange: '$25,000 – $75,000',
    timeline: '5–10 weeks',
    imageUrl:
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
    // TODO: replace with client photography
    included: [
      'Complete waterproofing and tile installation',
      'Custom vanity and millwork',
      'Heated floor system',
      'Frameless glass shower enclosure',
      'Plumbing fixture supply and installation',
      'Exhaust fan and lighting upgrade',
    ],
    costRanges: {
      minSqft: 50,
      maxSqft: 200,
      minCost: 25000,
      maxCost: 75000,
    },
    faqTags: ['bathroom', 'pricing', 'process'],
  },
  {
    id: 'basements',
    slug: 'basements',
    name: 'Basement Finishing',
    tagline: 'Unlock the potential beneath your feet.',
    description:
      'Transform unused basement space into a legal suite, home theatre, gym, or guest suite. We handle permits, egress windows, and every finishing detail.',
    priceRange: '$40,000 – $100,000',
    timeline: '10–16 weeks',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
    // TODO: replace with client photography
    included: [
      'Structural and egress window assessment',
      'Waterproofing and insulation system',
      'Framing, drywall, and finishing',
      'Plumbing rough-in for wet bar or bathroom',
      'Electrical and lighting design',
      'Flooring and built-in millwork',
    ],
    costRanges: {
      minSqft: 400,
      maxSqft: 1500,
      minCost: 40000,
      maxCost: 100000,
    },
    faqTags: ['basement', 'permits', 'pricing'],
  },
  {
    id: 'additions',
    slug: 'additions',
    name: 'Home Additions',
    tagline: 'More space. Same address.',
    description:
      'Whether a second-storey addition, a rear extension, or an attached garage conversion — we engineer and build additions that look like they were always part of your home.',
    priceRange: '$80,000 – $200,000+',
    timeline: '16–28 weeks',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    // TODO: replace with client photography
    included: [
      'Structural engineering and permit drawings',
      'Foundation or cantilevered addition construction',
      'Roofline integration and exterior cladding',
      'Full interior finishing to match existing home',
      'HVAC extension and electrical service upgrade',
      'Landscaping restoration post-construction',
    ],
    costRanges: {
      minSqft: 200,
      maxSqft: 1000,
      minCost: 80000,
      maxCost: 200000,
    },
    faqTags: ['addition', 'permits', 'pricing', 'process'],
  },
]

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug)
```

### `src/data/projects.js`

> **Critical:** This is the CORRECT schema. Do NOT use the old schema with `{ year, budget, duration, imageUrl, gallery, highlights }`. The new schema uses `beforeImage/afterImage` (for BeforeAfterSlider), `quote` (for ProjectModal testimonial block), `style` + `budgetRange` (for FilterBar matching), and `scope` (for ProjectModal metadata display).

```js
// CORRECT schema — verified from build.
const projects = [
  {
    id: 'p1',
    title: 'Westboro Kitchen Transformation',
    type: 'kitchen',          // matches service id — used by type FilterBar
    style: 'modern',          // 'modern' | 'transitional' | 'traditional' — used by style FilterBar
    budgetRange: '$75k–$100k', // exact string matched by FilterBar value
    budgetLabel: '$75k – $100k', // human-readable display string for ProjectModal
    beforeImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    afterImage:  'https://images.unsplash.com/photo-1556909195-b8842e4e61e3?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    description:
      'A full gut renovation of a 1970s galley kitchen. Custom white oak cabinetry, Calacatta marble waterfall island, integrated Miele appliances, and hand-laid herringbone tile floors.',
    quote:
      'We have hosted three dinner parties since the renovation. Our kitchen has become the reason people come over.',
    timeline: '11 weeks',
    scope: 'Full gut renovation, custom cabinetry, countertops, appliances, flooring, lighting',
    location: 'Westboro, Ottawa',
  },
  {
    id: 'p2',
    title: 'Glebe Master Bathroom Suite',
    type: 'bathroom',
    style: 'transitional',
    budgetRange: '$50k–$75k',
    budgetLabel: '$50k – $75k',
    beforeImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    afterImage:  'https://images.unsplash.com/photo-1620626011761-996317702a7a?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    description:
      'A tired 1990s master bathroom reimagined as a spa retreat. Heated Arabescato marble floors, frameless steam shower, freestanding soaking tub, and custom double vanity.',
    quote:
      'I take longer showers now — on purpose. The space is simply stunning and exactly what we described in our first meeting.',
    timeline: '7 weeks',
    scope: 'Full gut, marble tile, steam shower, heated floors, custom vanity, soaking tub',
    location: 'Glebe, Ottawa',
  },
  {
    id: 'p3',
    title: 'Kanata Basement Entertainment Suite',
    type: 'basement',
    style: 'modern',
    budgetRange: '$50k–$75k',
    budgetLabel: '$50k – $75k',
    beforeImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    afterImage:  'https://images.unsplash.com/photo-1594740581239-4d0a3813ff75?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    description:
      'An unfinished basement converted into a full entertainment suite with home theatre, wet bar, and a dedicated exercise room. Egress windows added for code compliance.',
    quote:
      'The crew treated our home with respect and delivered exactly what was promised — not a dollar over budget.',
    timeline: '13 weeks',
    scope: 'Framing, electrical, wet bar, home theatre, exercise room, egress windows, flooring',
    location: 'Kanata, Ottawa',
  },
  {
    id: 'p4',
    title: 'Barrhaven Rear Addition',
    type: 'addition',
    style: 'transitional',
    budgetRange: '$100k+',
    budgetLabel: '$100k+',
    beforeImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    afterImage:  'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    description:
      'A 650 sq ft rear addition adding an open-plan great room and mudroom to a semi-detached home. The roofline and exterior cladding were matched perfectly to the existing structure.',
    quote:
      'You cannot tell where the old house ends and the addition begins. That seamless integration was everything to us.',
    timeline: '22 weeks',
    scope: 'Foundation, framing, exterior cladding, roofline integration, interior finishing, HVAC',
    location: 'Barrhaven, Ottawa',
  },
  {
    id: 'p5',
    title: 'Rockcliffe Kitchen & Dining',
    type: 'kitchen',
    style: 'traditional',
    budgetRange: '$100k+',
    budgetLabel: '$100k+',
    beforeImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    afterImage:  'https://images.unsplash.com/photo-1556909195-b8842e4e61e3?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    description:
      'A heritage home kitchen restored with period-appropriate shaker cabinetry, hand-painted in Farrow & Ball, with unlacquered brass hardware and a La Cornue range.',
    quote:
      'They understood the character of our 1928 home and enhanced it — rather than replacing it with something generic.',
    timeline: '14 weeks',
    scope: 'Custom shaker cabinetry, heritage tile, La Cornue range installation, millwork restoration',
    location: 'Rockcliffe Park, Ottawa',
  },
  {
    id: 'p6',
    title: 'Centretown Ensuite Renovation',
    type: 'bathroom',
    style: 'modern',
    budgetRange: '$30k–$50k',
    budgetLabel: '$30k – $50k',
    beforeImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    afterImage:  'https://images.unsplash.com/photo-1620626011761-996317702a7a?w=1200&q=80',
    // TODO: replace with Greenlight portfolio images
    description:
      'A compact ensuite redesigned for maximum efficiency without sacrificing luxury. Large-format porcelain slabs eliminate grout lines and make the space read larger.',
    quote:
      'Exceptional quality in a small space. Every centimetre was considered and the result is a joy to use every single day.',
    timeline: '5 weeks',
    scope: 'Large-format porcelain, niche shelving, rainfall shower, heated floors, LED mirrors',
    location: 'Centretown, Ottawa',
  },
]

export { projects }
export const getProjectsByType = (type) => projects.filter((p) => p.type === type)
export const getProjectById = (id) => projects.find((p) => p.id === id)
```

### `src/data/faq.js`

> **Critical:** Items have BOTH `category` (single string for tab navigation) AND `tags` (array for service page filtering). Both fields are required. Both helper functions must be exported.

```js
// IMPORTANT: Each item has BOTH category AND tags[] fields.
// category → used by getFaqByCategory() for FaqPage tab navigation
// tags     → used by getFaqByTag() for service page FAQ preview sections
const faq = [
  // ── General ──────────────────────────────────────────────────────
  {
    id: 'faq-g1',
    category: 'general',
    tags: ['general', 'process'],
    question: 'Is [Company Name] a general contractor or a design-build firm?',
    answer:
      'We are a full-service Design & Build firm, which means you work with one team from the first sketch to the final walkthrough. Unlike hiring a designer separately and then tendering to contractors, our integrated model eliminates the communication gaps that cause most renovations to go over budget and over time. Your project manager is your single point of contact throughout.',
  },
  {
    id: 'faq-g2',
    category: 'general',
    tags: ['general', 'process'],
    question: 'What areas of [City] do you serve?',
    answer:
      'We serve all of [City] and the surrounding region, including [Neighbourhood 1], [Neighbourhood 2], [Neighbourhood 3], [Neighbourhood 4], [Neighbourhood 5], and [Neighbourhood 6]. For projects outside these areas, contact us to discuss — we may be able to accommodate based on project size and schedule.',
  },
  {
    id: 'faq-g3',
    category: 'general',
    tags: ['general'],
    question: 'Are you licensed and insured?',
    answer:
      'Yes. [Company Name] holds a valid [Province] contractor licence and carries $[X]M in general liability insurance and WSIB coverage. We are happy to provide proof of coverage before any work begins. We also hold a BBB A+ accreditation, which you can verify directly on the Better Business Bureau website.',
  },
  {
    id: 'faq-g4',
    category: 'general',
    tags: ['general', 'process'],
    question: 'How do I get started?',
    answer:
      'The fastest way is to fill out our project estimate form — it takes about two minutes and gives us the context we need to have a productive first call. A project manager will contact you within one business day to schedule a no-obligation site visit. There is no cost to the consultation.',
  },
  {
    id: 'faq-g5',
    category: 'general',
    tags: ['general'],
    question: 'Do you work on condos and townhomes?',
    answer:
      'Yes, with some important caveats. Condo renovations require board approval and may have specific rules about noise hours, elevator usage for materials, and approved trades. We have extensive experience navigating these requirements and can advise you on the approval process before work begins.',
  },
  {
    id: 'faq-g6',
    category: 'general',
    tags: ['general'],
    question: 'Can you work with our existing designer?',
    answer:
      'Absolutely. We are comfortable working from your architect or interior designer\'s drawings and specifications. In this case, we act as the construction management layer. We will review the drawings for constructability and flag any issues before work begins.',
  },
  // ── Pricing ──────────────────────────────────────────────────────
  {
    id: 'faq-p1',
    category: 'pricing',
    tags: ['pricing', 'kitchen'],
    question: 'How much does a kitchen renovation cost?',
    answer:
      'Kitchen renovation investments in [City] typically range from $45,000 for a straightforward layout refresh to $120,000+ for a full gut with custom cabinetry, high-end appliances, and structural changes. The biggest variables are cabinetry (stock vs. semi-custom vs. full custom), countertop material, and whether you are changing the layout. We provide a detailed line-item quote after the site visit so you know exactly what is included.',
  },
  {
    id: 'faq-p2',
    category: 'pricing',
    tags: ['pricing', 'bathroom'],
    question: 'How much does a bathroom renovation cost?',
    answer:
      'Bathroom renovations in [City] typically range from $25,000 for a clean, well-designed refresh to $75,000+ for a spa-grade master ensuite with heated floors, steam shower, and custom millwork. The size of the space and the level of material selection drive the investment. A small ensuite can look exceptional at the lower end of that range with the right design decisions.',
  },
  {
    id: 'faq-p3',
    category: 'pricing',
    tags: ['pricing', 'basement'],
    question: 'How much does finishing a basement cost?',
    answer:
      'Basement finishing investments typically range from $40,000 for a straightforward open-plan layout to $100,000+ for a legal suite with a full bathroom, kitchen, and egress windows. The primary cost drivers are: whether you need a bathroom added, whether egress windows are required, and the level of interior finishing selected.',
  },
  {
    id: 'faq-p4',
    category: 'pricing',
    tags: ['pricing'],
    question: 'Do you provide fixed-price contracts?',
    answer:
      'Yes. Every project is quoted with a fixed scope and fixed price. The only way costs change is if you request changes to the scope mid-project (which we document in writing as a change order) or if unforeseen structural conditions are discovered during demolition. We explain exactly what is and is not included in the original quote so there are no surprises.',
  },
  {
    id: 'faq-p5',
    category: 'pricing',
    tags: ['pricing'],
    question: 'What is your payment schedule?',
    answer:
      'Our standard payment schedule is tied to project milestones: a deposit to secure your start date, a payment at the start of construction, one or two progress payments at defined milestones, and a final holdback released after the final walkthrough and deficiency list is resolved. We never ask for large upfront payments — your money is protected by the milestone structure.',
  },
  {
    id: 'faq-p6',
    category: 'pricing',
    tags: ['pricing'],
    question: 'Can we phase the renovation to spread the investment?',
    answer:
      'Yes, many clients choose to phase their renovations. For example, completing the kitchen in Year 1 and the master bathroom in Year 2. We will design both phases together upfront so that the finished result is cohesive. Phasing does mean some duplication in mobilization costs, but it can make the investment more manageable.',
  },
  // ── Process ──────────────────────────────────────────────────────
  {
    id: 'faq-pr1',
    category: 'process',
    tags: ['process', 'general'],
    question: 'What does your renovation process look like?',
    answer:
      'Our process has five phases: Discovery (site visit, measurements, design brief), Design (3D rendering, material selection, final specifications), Permits (we prepare and file all applications), Build (construction with weekly progress updates), and Handover (final walkthrough, deficiency list, clean site). Your project manager is present at all key milestones and available by phone throughout.',
  },
  {
    id: 'faq-pr2',
    category: 'process',
    tags: ['process'],
    question: 'How long will my renovation take?',
    answer:
      'Timeline depends on the scope. A bathroom typically takes 5–10 weeks, a kitchen 8–14 weeks, a basement 10–16 weeks, and a home addition 16–28 weeks. These timelines include permit approval time. We provide a detailed project schedule with your quote so you know exactly when each trade will be on site.',
  },
  {
    id: 'faq-pr3',
    category: 'process',
    tags: ['process'],
    question: 'Do I need to move out during the renovation?',
    answer:
      'For kitchen and bathroom renovations, most clients stay in their homes. We set up temporary facilities (a makeshift kitchen or bathroom access) and maintain site protection throughout. For large additions or full home renovations, we typically recommend temporary accommodation for the first 4–6 weeks of active construction. We will advise you honestly during the discovery meeting.',
  },
  {
    id: 'faq-pr4',
    category: 'process',
    tags: ['process'],
    question: 'How do you handle communication during the build?',
    answer:
      'You will receive a weekly written update every Friday summarizing what was completed that week, what is planned for the following week, and any decisions needed from you. Your project manager is also reachable by phone or text on business days. We use a project management portal where you can view progress photos and the live project schedule.',
  },
  {
    id: 'faq-pr5',
    category: 'process',
    tags: ['process', 'general'],
    question: 'What happens if something goes wrong?',
    answer:
      'Every project has a warranty period after handover during which we return to address any deficiencies at no cost. Beyond the warranty, our workmanship is backed by our trade contractors who each carry their own licences and warranties. We have been completing renovations in [City] for [X] years and our business depends on referrals — we have every incentive to make things right.',
  },
  {
    id: 'faq-pr6',
    category: 'process',
    tags: ['process'],
    question: 'Can we make changes once construction starts?',
    answer:
      'Yes, but with important considerations. Changes during construction are documented as written change orders that specify the cost and schedule impact before any additional work proceeds. Some changes are simple — swapping a tile selection. Others can cascade through the schedule. We advise on the impact honestly before you decide.',
  },
  // ── Permits ──────────────────────────────────────────────────────
  {
    id: 'faq-pe1',
    category: 'permits',
    tags: ['permits', 'addition'],
    question: 'Do I need a permit for my renovation?',
    answer:
      'Most significant renovations in [City] require a permit. Kitchens typically require an electrical permit and possibly a plumbing permit. Bathrooms require plumbing and potentially structural permits. Basement finishing requires a building permit. Home additions always require a full building permit plus structural drawings. Cosmetic work (painting, flooring, cabinet resurfacing) generally does not. We handle all permit applications as part of our service.',
  },
  {
    id: 'faq-pe2',
    category: 'permits',
    tags: ['permits'],
    question: 'How long does the permit process take?',
    answer:
      'In [City], residential building permit approvals typically take 3–8 weeks depending on the complexity of the project and the current volume at the building department. Electrical and plumbing permits are often issued faster — sometimes same-day. We submit permit applications as early in the project as possible so approvals come in before your construction start date.',
  },
  {
    id: 'faq-pe3',
    category: 'permits',
    tags: ['permits'],
    question: 'What happens if a renovation was done without permits?',
    answer:
      'Unpermitted work is a significant liability for homeowners. When you sell, a home inspector may flag it, and your real estate lawyer may need to disclose it. In some cases, the city can order unpermitted work to be exposed and re-inspected — or removed. We always recommend pulling the proper permits. The cost is minor relative to the risk.',
  },
  {
    id: 'faq-pe4',
    category: 'permits',
    tags: ['permits', 'basement'],
    question: 'What is an egress window and does my basement need one?',
    answer:
      'An egress window is a window large enough to allow occupant exit or emergency access in a bedroom or basement living space. The [Province] Building Code requires egress windows in any bedroom below grade and in any basement that will be used as a dwelling unit. If your basement finishing includes a bedroom, egress compliance is not optional — and we will build it into the project plan.',
  },
  {
    id: 'faq-pe5',
    category: 'permits',
    tags: ['permits', 'addition'],
    question: 'Do I need a zoning variance for an addition?',
    answer:
      'It depends on the size and placement of the proposed addition relative to your lot. Most additions require a building permit but not a zoning variance if they stay within the setback requirements and maximum lot coverage for your zone. If the design as desired exceeds those limits, a minor variance application to the Committee of Adjustment may be required — a process we have navigated many times.',
  },
  {
    id: 'faq-pe6',
    category: 'permits',
    tags: ['permits'],
    question: 'Can you guarantee my permit will be approved?',
    answer:
      'No contractor can guarantee permit approval — that decision rests with the municipality. What we can guarantee is that our permit applications are prepared by licensed designers and engineers to the correct code standard, submitted with complete documentation, and followed up on regularly. Applications prepared correctly the first time rarely require revision.',
  },
]

export { faq }
export const getFaqByCategory = (category) => faq.filter((f) => f.category === category)
export const getFaqByTag = (tag) => faq.filter((f) => f.tags?.includes(tag))
```

### `src/data/team.js`

```js
export const team = [
  {
    id: 'tm1',
    name: '[First Name Last Name]',
    title: 'Founder & Lead Project Manager',
    bio: 'Founded [Company Name] after [X] years in residential construction across [City]. Personally oversees every project from design through handover and believes no renovation is too small to deserve exceptional craft.',
    imageUrl:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    // TODO: replace with actual team photography
  },
  {
    id: 'tm2',
    name: '[First Name Last Name]',
    title: 'Senior Designer',
    bio: 'Trained at [Institution], with a portfolio spanning luxury residential projects in [City] and [City]. Specializes in translating client vision into buildable, code-compliant design packages.',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    // TODO: replace with actual team photography
  },
  {
    id: 'tm3',
    name: '[First Name Last Name]',
    title: 'Site Superintendent',
    bio: '[X] years of on-site supervision across kitchen, bathroom, and addition projects throughout [Province]. Responsible for daily trade coordination, quality control inspections, and homeowner communication.',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    // TODO: replace with actual team photography
  },
]
```

### `src/data/careers.js`

```js
export const careers = [
  {
    id: 'c1',
    title: 'Lead Carpenter',
    type: 'Full-time',
    department: 'Trades',
    description:
      'We are looking for an experienced finish carpenter to lead custom cabinetry installation and millwork on high-end residential renovation projects throughout [City].',
    responsibilities: [
      'Lead finish carpentry on kitchen, bathroom, and addition projects',
      'Install custom cabinetry and built-in millwork to specification',
      'Coordinate with site superintendent on scheduling and quality inspections',
      'Train and supervise junior carpenters on site',
      'Maintain tools and report material requirements in advance',
    ],
    requirements: [
      'Minimum 5 years experience in custom cabinetry and finish carpentry',
      'Red Seal certification (or equivalent) preferred',
      'Own tools and reliable transportation',
      'Strong attention to detail and ability to read architectural drawings',
    ],
    location: '[City], [Province]',
  },
  {
    id: 'c2',
    title: 'Project Manager',
    type: 'Full-time',
    department: 'Management',
    description:
      'We need a detail-oriented project manager to own the client relationship and trade coordination from permit approval through final handover on renovation projects ranging from $50k to $200k+.',
    responsibilities: [
      'Manage 3–5 active renovation projects simultaneously',
      'Own weekly client communication and Friday progress reports',
      'Coordinate subcontractor scheduling and resolve site issues',
      'Manage project budgets and document change orders',
      'Conduct quality inspections at each phase milestone',
    ],
    requirements: [
      'Minimum 3 years experience in residential construction project management',
      'PMP certification an asset',
      'Proficiency with project management software (Buildertrend, CoConstruct, or similar)',
      'Excellent written and verbal communication skills',
    ],
    location: '[City], [Province]',
  },
  {
    id: 'c3',
    title: 'Tile Setter',
    type: 'Contract',
    department: 'Trades',
    description:
      'We are seeking an experienced tile setter for recurring contract work on our bathroom and kitchen renovation projects. Precision, speed, and an eye for layout are essential.',
    responsibilities: [
      'Install ceramic, porcelain, and natural stone tile on walls and floors',
      'Execute complex patterns including herringbone, chevron, and large-format installs',
      'Waterproof shower enclosures to code',
      'Work cleanly and respect occupied homes',
    ],
    requirements: [
      'Minimum 4 years tile setting experience on residential projects',
      'Experience with large-format porcelain slabs (900x1800mm+)',
      'Own tools and vehicle',
      'WSIB clearance certificate required',
    ],
    location: '[City], [Province]',
  },
  {
    id: 'c4',
    title: 'Interior Design Coordinator',
    type: 'Full-time',
    department: 'Design',
    description:
      'Support our senior designer and project managers by managing material selections, supplier relationships, and design documentation across multiple active renovation projects.',
    responsibilities: [
      'Prepare material specification packages for client review',
      'Source products from our approved supplier network',
      'Coordinate design decisions with project timeline milestones',
      'Maintain the design library and sample collection',
      'Assist with 3D rendering revisions and presentation prep',
    ],
    requirements: [
      'Diploma or degree in Interior Design or Architecture',
      'Proficiency with AutoCAD, SketchUp, or Revit',
      'Strong organizational skills and ability to manage multiple projects',
      'Experience in a residential renovation or design-build environment preferred',
    ],
    location: '[City], [Province]',
  },
  {
    id: 'c5',
    title: 'Estimator',
    type: 'Full-time',
    department: 'Business Development',
    description:
      'Prepare accurate, detailed renovation estimates that reflect our quality standard and allow us to win projects at the right margin. This role is critical to our growth.',
    responsibilities: [
      'Conduct site visits with the project manager and prepare line-item estimates',
      'Maintain and update our unit cost database quarterly',
      'Solicit and compare subcontractor bids for each project',
      'Identify value engineering opportunities without compromising quality',
      'Prepare formal quote documents for client presentation',
    ],
    requirements: [
      'Minimum 3 years experience estimating residential renovation projects',
      'Proficiency with estimating software (PlanSwift, Bluebeam, or similar)',
      'Understanding of [Province] building codes and permit requirements',
      'Analytical mind with strong spreadsheet skills',
    ],
    location: '[City], [Province]',
  },
]
```

### `src/data/testimonials.js`

```js
// TODO: replace all items with real client testimonials before launch
export const testimonials = [
  {
    id: 't1',
    quote:
      'They transformed our Westboro kitchen in 11 weeks without a single dollar over budget. The custom cabinetry alone is worth the investment — it will outlast the house.',
    author: 'Sarah M.',
    location: 'Westboro, Ottawa',
    project: 'Westboro Kitchen Transformation',
    rating: 5,
    // TODO: replace with real client testimonial
  },
  {
    id: 't2',
    quote:
      'Our Glebe bathroom went from a dated 1990s eyesore to a genuine spa. The heated marble floors were the best investment we have ever made in our home.',
    author: 'David K.',
    location: 'Glebe, Ottawa',
    project: 'Glebe Master Bathroom Suite',
    rating: 5,
    // TODO: replace with real client testimonial
  },
  {
    id: 't3',
    quote:
      'The communication was exceptional throughout. A Friday update every single week, every question answered same day. I have never experienced that level of professionalism from a contractor.',
    author: 'Michelle T.',
    location: 'Kanata, Ottawa',
    project: 'Kanata Basement Entertainment Suite',
    rating: 5,
    // TODO: replace with real client testimonial
  },
  {
    id: 't4',
    quote:
      'Our addition looks like it was always part of the original house. The exterior match is flawless. We get compliments from neighbours who had no idea we built it.',
    author: 'James R.',
    location: 'Barrhaven, Ottawa',
    project: 'Barrhaven Rear Addition',
    rating: 5,
    // TODO: replace with real client testimonial
  },
  {
    id: 't5',
    quote:
      'Fixed price, fixed timeline, zero surprises. I have renovated three homes with three different contractors. This was the first time the process felt completely under control.',
    author: 'Lisa P.',
    location: 'Rockcliffe Park, Ottawa',
    project: 'Rockcliffe Kitchen & Dining',
    rating: 5,
    // TODO: replace with real client testimonial
  },
  {
    id: 't6',
    quote:
      'They designed our small ensuite beautifully. Nothing feels cramped or compromised. The large-format tiles were a brilliant recommendation — the space reads twice as large as it is.',
    author: 'Omar A.',
    location: 'Centretown, Ottawa',
    project: 'Centretown Ensuite Renovation',
    rating: 5,
    // TODO: replace with real client testimonial
  },
]

export const featuredTestimonial = testimonials[0]
```

### `src/data/inspiration.js`

```js
// Used by InspirationPage sticky tab navigation and masonry grid.
// Each category has a serviceLink so users can navigate to the relevant service page.

export const inspirationCategories = [
  {
    id: 'kitchen-modern',
    label: 'Modern Kitchens',
    headline: 'Clean Lines, Warm Finishes',
    subline: 'Handleless cabinetry, waterfall islands, integrated appliances.',
    serviceLink: '/services/kitchens',
    items: [
      {
        id: 'ik1',
        title: 'White Oak & Quartzite',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ik2',
        title: 'Matte Black & Marble',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1556909195-b8842e4e61e3?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ik3',
        title: 'Walnut Grain Island',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ik4',
        title: 'Integrated Appliance Wall',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1556909195-b8842e4e61e3?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ik5',
        title: 'Concrete & Steel',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ik6',
        title: 'Calacatta Waterfall',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1556909195-b8842e4e61e3?w=800&q=80',
        // TODO: replace with client photography
      },
    ],
  },
  {
    id: 'bathroom-spa',
    label: 'Spa Bathrooms',
    headline: 'Hotel-Grade Luxury at Home',
    subline: 'Heated floors, frameless glass, soaking tubs, natural stone.',
    serviceLink: '/services/bathrooms',
    items: [
      {
        id: 'ib1',
        title: 'Arabescato Steam Shower',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ib2',
        title: 'Freestanding Tub Suite',
        style: 'Transitional',
        imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317702a7a?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ib3',
        title: 'Double Vanity with Mirrors',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ib4',
        title: 'Limestone Floor & Wall',
        style: 'Transitional',
        imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317702a7a?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ib5',
        title: 'Rain Head System',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ib6',
        title: 'Midnight Marble Ensuite',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1620626011761-996317702a7a?w=800&q=80',
        // TODO: replace with client photography
      },
    ],
  },
  {
    id: 'basement-living',
    label: 'Basement Living',
    headline: 'The Space You Never Used, Transformed',
    subline: 'Entertainment rooms, home offices, gyms, legal suites.',
    serviceLink: '/services/basements',
    items: [
      {
        id: 'ibl1',
        title: 'Cinema Room',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ibl2',
        title: 'Wet Bar & Lounge',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1594740581239-4d0a3813ff75?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ibl3',
        title: 'Home Office Suite',
        style: 'Transitional',
        imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ibl4',
        title: 'Exercise & Recovery Room',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1594740581239-4d0a3813ff75?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ibl5',
        title: 'Legal Suite with Kitchen',
        style: 'Transitional',
        imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
        // TODO: replace with client photography
      },
      {
        id: 'ibl6',
        title: 'Kids Play Zone',
        style: 'Modern',
        imageUrl: 'https://images.unsplash.com/photo-1594740581239-4d0a3813ff75?w=800&q=80',
        // TODO: replace with client photography
      },
    ],
  },
]
```

---

## Section 10 — Page Templates

### Service Sub-Page Template

All service sub-pages (KitchensPage, BathroomsPage, BasementsPage, AdditionsPage) follow this 9-section structure:

```
1. Hero (parallax GSAP + h1 + tagline)
2. BeforeAfterSlider (max-w-4xl mx-auto)
3. Testimonial block (single quote, border-l-2 border-gl-accent)
4. Overview 3-col (Included / Timeline / Investment Range)
5. 5-Step Process Timeline
6. CostEstimatorSlider
7. Gallery preview grid (3 images → link to portfolio)
8. FAQ Preview (Accordion, 3 items via getFaqByTag)
9. Bottom CTA
```

**The PROCESS_STEPS constant** (shared across all service pages):

```js
const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We visit your space, take measurements, and understand your vision and budget. No fee, no obligation.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Our design team produces a full 3D rendering and material specification package for your approval.',
  },
  {
    num: '03',
    title: 'Permits',
    desc: 'We prepare and submit all required permit applications on your behalf. No paperwork for you.',
  },
  {
    num: '04',
    title: 'Build',
    desc: 'Our trades arrive on a fixed schedule. Weekly written updates keep you informed throughout.',
  },
  {
    num: '05',
    title: 'Handover',
    desc: 'Final walkthrough, deficiency list resolved, and a spotless space delivered on the agreed date.',
  },
]
```

**JSX skeleton for a service sub-page:**

```jsx
// src/pages/services/KitchensPage.jsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Accordion } from '../../components/ui/Accordion'
import { BeforeAfterSlider } from '../../components/ui/BeforeAfterSlider'
import { CostEstimatorSlider } from '../../components/ui/CostEstimatorSlider'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { getServiceBySlug } from '../../data/services'
import { getFaqByTag } from '../../data/faq'

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'We visit your space, take measurements, and understand your vision and budget. No fee, no obligation.' },
  { num: '02', title: 'Design', desc: 'Our design team produces a full 3D rendering and material specification package for your approval.' },
  { num: '03', title: 'Permits', desc: 'We prepare and submit all required permit applications on your behalf. No paperwork for you.' },
  { num: '04', title: 'Build', desc: 'Our trades arrive on a fixed schedule. Weekly written updates keep you informed throughout.' },
  { num: '05', title: 'Handover', desc: 'Final walkthrough, deficiency list resolved, and a spotless space delivered on the agreed date.' },
]

// Replace 'kitchens' with the correct slug for each service page:
const service = getServiceBySlug('kitchens')
const faqItems = getFaqByTag('kitchen').slice(0, 3)

export default function KitchensPage() {
  const heroRef = useRef(null)
  const heroImgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroImgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* 1. Hero */}
      <section ref={heroRef} className="min-h-[60vh] relative flex items-end overflow-hidden">
        <img
          ref={heroImgRef}
          src={service.imageUrl}
          alt="Kitchen renovation by [Company Name]"
          loading="lazy"
          decoding="async"
          style={{ height: '130%', top: '-15%', position: 'absolute', willChange: 'transform' }}
          className="inset-0 w-full object-cover"
        />
        {/* TODO: replace with client photography */}
        <div className="absolute inset-0 bg-gradient-to-t from-gl-bg via-gl-bg/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
          <Badge variant="muted" className="mb-4">{service.timeline} typical timeline</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gl-surface leading-tight tracking-tight mb-4">
            {service.name}.<br />
            <em>{service.tagline}</em>
          </h1>
          <p className="text-gl-muted text-lg max-w-xl mb-8">{service.description}</p>
          <Button as={Link} to="/contact" variant="primary" size="lg">
            Get My Kitchen Estimate
          </Button>
        </div>
      </section>

      {/* 2. Before/After Slider */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-xs text-gl-muted mb-4 text-center">Drag to compare</p>
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80"
            afterImage="https://images.unsplash.com/photo-1556909195-b8842e4e61e3?w=1200&q=80"
          />
          {/* TODO: replace with Greenlight kitchen before/after photography */}
        </div>
      </section>

      {/* 3. Testimonial block */}
      <section className="py-12 bg-gl-dark/40">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <blockquote className="border-l-2 border-gl-accent pl-6">
            <p className="text-gl-surface text-xl italic leading-relaxed mb-4">
              "They transformed our Westboro kitchen in 11 weeks without a single dollar over budget. The custom cabinetry alone is worth the investment — it will outlast the house."
            </p>
            {/* TODO: replace with real client testimonial */}
            <footer className="font-mono text-sm text-gl-muted">
              — Sarah M., Westboro, Ottawa
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 4. Overview 3-col */}
      <section className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="reveal-up" ref={useScrollReveal()}>
              <p className="font-mono text-xs text-gl-accent mb-3 uppercase tracking-widest">What's Included</p>
              <ul className="flex flex-col gap-2">
                {service.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gl-muted text-sm">
                    <span className="text-gl-accent mt-0.5 flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal-up" ref={useScrollReveal()}>
              <p className="font-mono text-xs text-gl-accent mb-3 uppercase tracking-widest">Typical Timeline</p>
              <p className="text-3xl font-bold text-gl-surface mb-2">{service.timeline}</p>
              <p className="text-gl-muted text-sm">From design kick-off to handover, including permit time.</p>
            </div>
            <div className="reveal-up" ref={useScrollReveal()}>
              <p className="font-mono text-xs text-gl-accent mb-3 uppercase tracking-widest">Investment Range</p>
              <p className="text-3xl font-bold text-gl-surface mb-2">{service.priceRange}</p>
              <p className="text-gl-muted text-sm">Confirmed to the dollar after a site visit and design consultation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Process */}
      <section className="py-24 lg:py-36 bg-gl-dark/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeader
            eyebrow="How It Works"
            heading={<>The [Company Name] <em>Build Process</em></>}
            subheading="Five phases. One team. Zero surprises."
            className="mb-16"
          />
          <div className="grid md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className="reveal-up" ref={useScrollReveal()} style={{ '--i': i }}>
                <p className="font-mono text-gl-accent text-2xl font-bold mb-3">{step.num}</p>
                <h3 className="text-gl-surface font-semibold mb-2">{step.title}</h3>
                <p className="text-gl-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Cost Estimator */}
      <section className="py-24 lg:py-36">
        <div className="max-w-xl mx-auto px-6 lg:px-12">
          <SectionHeader
            eyebrow="Estimate Tool"
            heading={<>What Will Your Kitchen <em>Investment</em> Be?</>}
            subheading="Use our estimator to get a ballpark — then book a consultation for a precise quote."
            className="mb-10"
          />
          <CostEstimatorSlider
            minSqft={service.costRanges.minSqft}
            maxSqft={service.costRanges.maxSqft}
            minCost={service.costRanges.minCost}
            maxCost={service.costRanges.maxCost}
            label="Kitchen Size"
          />
        </div>
      </section>

      {/* 7. Gallery preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-[4/3] rounded-2xl overflow-hidden bg-gl-dark">
                <img
                  src={`https://images.unsplash.com/photo-155690911${n}-f6e7ad7d3136?w=800&q=80`}
                  alt={`Kitchen project ${n}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* TODO: replace with Greenlight portfolio images */}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button as={Link} to="/portfolio" variant="secondary">
              View All Kitchen Projects →
            </Button>
          </div>
        </div>
      </section>

      {/* 8. FAQ Preview */}
      <section className="py-24 lg:py-36 bg-gl-dark/30">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <SectionHeader
            eyebrow="Common Questions"
            heading={<>Kitchen Renovation <em>FAQ</em></>}
            className="mb-10"
          />
          <Accordion items={faqItems} />
          <div className="text-center mt-8">
            <Link to="/faq" className="font-mono text-sm text-gl-accent hover:underline">
              View all questions →
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Bottom CTA */}
      <section className="py-24 lg:py-36">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <SectionHeader
            heading={<>Ready to Transform Your <em>Kitchen?</em></>}
            subheading="Book a free site visit and get a precise, no-surprise quote from our team."
            className="mb-8"
          />
          <Button as={Link} to="/contact" variant="primary" size="lg">
            Get My Kitchen Estimate
          </Button>
        </div>
      </section>
    </>
  )
}
```

---

### HomePage Pattern

9 sections in order:

```
1. Hero:        min-h-[100dvh], GSAP stagger entrance, bg image + gradient
                navbar-sentinel div at bottom of hero (required for Navbar scroll detection)
                GSAP: gsap.from([badge,h1,h2,sub,cta], { y:40, opacity:0, stagger:0.12, ease:'power3.out', duration:0.9 })

2. Trust Strip: bg-gl-dark/60 backdrop-blur-sm border-y, 4 TrustBadges in horizontal flex
                BBB A+ Rated | Licensed & Insured | 500+ Projects | 5-Star Rated

3. Service Pathways: 2×2 grid, aspect-[4/3] cards, image bg + gradient overlay
                     group-hover:scale-105 on image, "Explore →" text appears on hover

4. Social Proof: 3 testimonials, lg:grid-cols-3, Card variant="testimonial"
                 5-star row, italic quote, author name in font-mono

5. Before/After Showcase: BeforeAfterSlider with heading + drag instructions

6. FAQ Preview: first 6 FAQ items, Accordion component, max-w-3xl mx-auto

7. Process Preview: 3 steps (Consultation / Design & Permits / Build & Handover)
                    connector-line divs between steps (desktop only, hidden on mobile)

8. Google Reviews: GoogleReviewsWidget in max-w-sm mx-auto

9. Bottom CTA: large em heading + estimate button, max-w-3xl centered
```

**Hero section JSX pattern:**

```jsx
{/* Hero */}
<section className="relative min-h-[100dvh] flex flex-col justify-end">
  {/* Background image */}
  <img
    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
    alt="Luxury renovation by [Company Name]"
    loading="eager"
    decoding="async"
    className="absolute inset-0 w-full h-full object-cover"
  />
  {/* TODO: replace with Greenlight hero photography */}
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-gl-bg via-gl-bg/70 to-gl-bg/20" />

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-24 w-full">
    <div ref={badgeRef}>
      <Badge variant="muted">Ottawa's Premier Design & Build Firm</Badge>
    </div>
    <h1 ref={h1Ref} className="text-5xl md:text-7xl font-bold text-gl-surface leading-tight tracking-tight mt-4 mb-2">
      Transforming Ottawa Homes.
    </h1>
    <p ref={h2Ref} className="text-4xl md:text-6xl font-bold text-gl-surface leading-tight tracking-tight mb-6">
      <em>On Time, On Budget.</em>
    </p>
    <p ref={subRef} className="text-gl-muted text-lg max-w-xl mb-8">
      [Company Name] is Ottawa's most-referred Design & Build firm. From kitchen renovations to full home additions, we manage every detail so you don't have to.
    </p>
    <div ref={ctaRef} className="flex flex-wrap gap-4">
      <Button as={Link} to="/contact" variant="primary" size="lg">
        Get My Project Estimate
      </Button>
      <Button as={Link} to="/portfolio" variant="secondary" size="lg">
        View Our Work
      </Button>
    </div>
  </div>

  {/* Navbar sentinel — IntersectionObserver target for Navbar scroll morph */}
  <div id="navbar-sentinel" className="absolute bottom-0 left-0 w-full h-px" />
</section>
```

---

### PortfolioPage Pattern

3 sections:

```
1. Hero — SectionHeader, project count stat

2. Filter + Grid:
   Sticky FilterBar (top-24): 3 filter groups (type/style/budget)
   AND filter logic: all active groups must match
   lg:grid-cols-3 ProjectCards + ProjectModal overlay
   Empty state: "No projects match your filters." + "Clear filters" button

3. Bottom CTA
```

**FilterBar groups:**

```js
const FILTER_GROUPS = [
  {
    key: 'type',
    label: 'Room Type',
    filters: [
      { label: 'Kitchen',  value: 'kitchen' },
      { label: 'Bathroom', value: 'bathroom' },
      { label: 'Basement', value: 'basement' },
      { label: 'Addition', value: 'addition' },
    ],
  },
  {
    key: 'style',
    label: 'Style',
    filters: [
      { label: 'Modern',        value: 'modern' },
      { label: 'Transitional',  value: 'transitional' },
      { label: 'Traditional',   value: 'traditional' },
    ],
  },
  {
    key: 'budget',
    label: 'Investment',
    filters: [
      { label: '$30k–$50k',   value: '$30k–$50k' },
      { label: '$50k–$75k',   value: '$50k–$75k' },
      { label: '$75k–$100k',  value: '$75k–$100k' },
      { label: '$100k+',      value: '$100k+' },
    ],
  },
]
```

**Filter state and logic:**

```js
const [activeFilters, setActiveFilters] = useState({})
// activeFilters = { type: 'kitchen', style: 'modern' }  (only one value per group)

const handleFilterChange = (groupKey, value) => {
  setActiveFilters((prev) => ({
    ...prev,
    // toggle off if same value, otherwise set
    [groupKey]: prev[groupKey] === value ? undefined : value,
  }))
}

const filtered = projects.filter((p) => {
  const typeMatch   = !activeFilters.type   || activeFilters.type   === p.type
  const styleMatch  = !activeFilters.style  || activeFilters.style  === p.style
  const budgetMatch = !activeFilters.budget || activeFilters.budget === p.budgetRange
  return typeMatch && styleMatch && budgetMatch
})
```

**ProjectModal accessibility requirements:**
- `role="dialog"` `aria-modal="true"` `aria-label={project.title}`
- ESC key closes via `useEffect` keydown listener
- Auto-focus close button on mount: `useEffect(() => { closeButtonRef.current?.focus() }, [])`
- Rendered via `ReactDOM.createPortal(..., document.body)`
- Body scroll lock when open: `document.body.style.overflow = 'hidden'` on open, restore on close

---

### AboutPage Pattern

6 sections:

```
1. Hero — SectionHeader

2. Story section — 2-col: image left + copy right
   "EST. [YEAR] · [CITY], [PROVINCE]" eyebrow in font-mono text-gl-muted
   2 paragraphs about founding story and mission
   Founding Year Badge + CTA button

3. Stats strip — 4 animated counters (GSAP ScrollTrigger, once: true)
   Pattern: gsap.fromTo from { val: 0 } to { val: END, scrollTrigger: { once: true } }
   Typical stats: "15+" Years / "500+" Projects / "$0" Overruns / "4.9★" Rating

4. Team Grid — lg:grid-cols-3, Card per team member
   Circular image (w-20 h-20 rounded-full object-cover)
   name (font-bold text-gl-surface), title (font-mono text-xs text-gl-accent), bio (text-gl-muted text-sm)
   import { team } from '../data/team'

5. Values Grid — lg:grid-cols-3, 3 brand values
   Lucide icon + title + description
   Values: Transparency / Craftsmanship / Accountability

6. Bottom CTA
```

**Counter animation pattern (repeat for each of 4 stats):**

```jsx
// In the component body:
const counterRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]
const STATS = [
  { end: 15,  suffix: '+',  label: 'Years in Business',   prefix: '' },
  { end: 500, suffix: '+',  label: 'Projects Completed',  prefix: '' },
  { end: 0,   suffix: '',   label: 'Budget Overruns',     prefix: '$' },
  { end: 4.9, suffix: '★', label: 'Google Rating',       prefix: '' },
]

useEffect(() => {
  const ctx = gsap.context(() => {
    STATS.forEach((stat, i) => {
      const el = counterRefs[i].current
      if (!el) return
      gsap.fromTo(
        { val: 0 },
        {
          val: stat.end,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          onUpdate: function () {
            const v = this.targets()[0].val
            const display = stat.end % 1 !== 0
              ? v.toFixed(1)
              : Math.round(v)
            el.textContent = stat.prefix + display + stat.suffix
          },
        }
      )
    })
  })
  return () => ctx.revert()
}, [])
```

---

### FaqPage Pattern

4 sections:

```
1. Hero — SectionHeader
   eyebrow="Knowledge Base"
   heading={<>Your Questions, <em>Answered</em></>}
   subheading="Everything Ottawa homeowners ask before starting a renovation."

2. Sticky category tab bar (top-24 z-40)
   bg-gl-bg/80 backdrop-blur-xl border-b border-[rgba(201,168,76,0.15)]
   4 tabs: General | Pricing | Process | Permits & Timeline
   Active: border-b-2 border-gl-accent text-gl-accent transition-all
   Inactive: text-gl-muted hover:text-gl-surface
   import { getFaqByCategory } from '../data/faq'
   State: activeCategory = 'general'

3. FAQ content area (max-w-3xl mx-auto py-16)
   <Accordion items={getFaqByCategory(activeCategory)} key={activeCategory} />
   key prop triggers component remount → re-runs animation on tab change

4. Bottom CTA
   "Still have questions? Talk to our team directly."
   "Our project managers answer questions personally — no bots, no scripts."
```

**Tab bar JSX pattern:**

```jsx
const CATEGORIES = [
  { value: 'general',  label: 'General' },
  { value: 'pricing',  label: 'Pricing' },
  { value: 'process',  label: 'Process' },
  { value: 'permits',  label: 'Permits & Timeline' },
]

<div className="sticky top-24 z-40 bg-gl-bg/80 backdrop-blur-xl border-b border-[rgba(201,168,76,0.15)]">
  <div className="max-w-3xl mx-auto px-6 lg:px-12 flex gap-6 overflow-x-auto">
    {CATEGORIES.map((cat) => (
      <button
        key={cat.value}
        onClick={() => setActiveCategory(cat.value)}
        className={`py-4 text-sm font-mono whitespace-nowrap border-b-2 transition-all ${
          activeCategory === cat.value
            ? 'border-gl-accent text-gl-accent'
            : 'border-transparent text-gl-muted hover:text-gl-surface'
        }`}
      >
        {cat.label}
      </button>
    ))}
  </div>
</div>
```

---

### ContactPage Pattern

Two-column layout (`lg:grid-cols-2 gap-16`):

```
Left column:
  - 4 TrustBadges stacked (gap-6):
      BBB A+ Rated | Licensed & Insured | 5-Star Rated | Ottawa-Based
  - NAP block (mt-10):
      Address line (MapPin icon)
      Phone (Phone icon, tel: link)
      Email (Mail icon, mailto: link)
  - Map placeholder image (mt-8):
      Unsplash aerial city image, aspect-video, rounded-2xl, overlay Badge "Ottawa, ON Service Area"
      // TODO: Replace with embedded Google Maps when CRM integration is live

Right column:
  - Heading: "Tell Us About Your Project"
  - <MultiStepForm mode="contact" />
```

---

## Section 11 — Conventions & Rules

### Import Order

```js
// 1. React core
import { useState, useEffect, useRef } from 'react'

// 2. Third-party libraries
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Phone } from 'lucide-react'

// 3. Local components
import { Button } from '../../components/ui/Button'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { Card } from '../../components/ui/Card'

// 4. Local data
import { services, getServiceBySlug } from '../../data/services'
import { getFaqByTag } from '../../data/faq'

// 5. Styles (rare — prefer Tailwind utility classes)
// import './SpecialComponent.css'
```

### Import Path Rules

| File location | Import components as |
|--------------|---------------------|
| `src/pages/` | `'../components/ui/ComponentName'` |
| `src/pages/services/` | `'../../components/ui/ComponentName'` |
| `src/components/sections/` | `'../ui/ComponentName'` |
| `src/components/layout/` | `'../ui/ComponentName'` |

### Tailwind Class Construction Rules

```jsx
// WRONG — template literals break Tailwind JIT purging:
<div className={`bg-gl-${variant} text-${color}`} />

// WRONG — partial class names:
<div className={`text-gl-${size}`} />

// CORRECT — lookup objects with full class strings:
const variants = {
  primary:   'bg-gl-accent text-gl-bg',
  secondary: 'bg-transparent text-gl-accent border border-gl-accent',
  ghost:     'bg-transparent text-gl-surface',
}
<div className={variants[variant]} />

// CORRECT — ternary with full class strings:
<div className={isActive ? 'border-gl-accent text-gl-accent' : 'border-gl-muted text-gl-muted'} />
```

### GSAP Rules

- Always use `gsap.context()` inside `useEffect`, return `ctx.revert()` for cleanup
- Register plugins **once** globally in `main.jsx` — never in individual components
- Parallax with ScrollTrigger scrub → service page heroes only
- Hero entrance animation (no ScrollTrigger) → HomePage hero only
- Counter animations with ScrollTrigger `once: true` → AboutPage stats only
- Never import `ScrollTrigger` without first checking it's registered in `main.jsx`

### Image Rules

Every `<img>` tag must have:
```jsx
<img
  src="..."
  alt="Descriptive alt text"
  loading="lazy"
  decoding="async"
  className="..."
/>
{/* TODO: replace with [client] photography */}
```

- Exception: hero images that are above the fold should use `loading="eager"`
- All images inside sized containers: `className="w-full h-full object-cover"`

### Typography Rules

```jsx
// CORRECT — always use bare <em> for Playfair Display italic:
<h2>Renovations Built to <em>Last a Lifetime</em></h2>

// WRONG — never use className for this purpose:
<h2>Renovations Built to <span className="font-serif italic">Last a Lifetime</span></h2>

// Exception: NotFoundPage 404 text (special case, large standalone numeral):
<p className="font-serif italic text-8xl text-gl-accent">404</p>
```

### Form Rules

- All form submissions: `console.log('Form data:', formData)` only — never send data anywhere
- Never use "Submit" as button copy — use specific action language
- All inputs: associated `<label>` with matching `htmlFor`/`id` pairing
- File inputs: always hidden with a styled `<label>` trigger
- Form success state: replace form with thank-you message, no redirect

### Nested `<main>` Rule

Pages are children of `PageLayout`'s `<main>` element. Page components must NOT contain their own `<main>` wrapper. Use `<>` fragment or a bare `<div>` as the page root.

```jsx
// WRONG:
export default function KitchensPage() {
  return <main>...</main>
}

// CORRECT:
export default function KitchensPage() {
  return (
    <>
      <section>...</section>
      <section>...</section>
    </>
  )
}
```

### Anti-Patterns Reference

| Anti-pattern | Correct approach |
|-------------|-----------------|
| Hardcoded hex in JSX | Use Tailwind tokens: `bg-gl-accent` |
| Template literal class construction | Use lookup objects or full-string ternaries |
| Wrong relative import path (../ vs ../../) | Check file location first |
| Nested `<main>` elements | Pages return fragments or `<div>` |
| `className="font-serif italic"` in headings | Always use bare `<em>` tag |
| "cost" in client-facing copy | Use "investment" |
| "Submit" button text | Use specific action copy |
| GSAP plugin imported without prior registration | Plugins registered once in main.jsx |
| `loading` attribute missing on `<img>` | Always include `loading="lazy" decoding="async"` |
| Missing `<label>` for form inputs | Every input gets an associated label |

---

## Section 12 — AI Agent Build System

This section contains the full three-agent parallel build system. Read this entire section before starting a build.

### 12.1 — Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                      THREE-AGENT SYSTEM                           │
├─────────────────┬──────────────────┬─────────────────────────────┤
│   PM ALPHA      │   PM BETA        │   PM GAMMA                  │
│   Claude Code   │   Claude CLI     │   Claude CLI                │
│   (Foundation)  │   (Complex Pages)│   (Data + Content)          │
│                 │                  │                              │
│   Sprint 1:     │   Entry: waits   │   Entry: immediate          │
│   • Config      │   for Gate 1     │   (no dependencies)         │
│   • index.css   │                  │                              │
│   • UI Comps    │   Writes:        │   Writes:                   │
│   • Hooks       │   • HomePage     │   • data/*.js (all 7)       │
│   • Layout      │   • Portfolio    │   • ServicesPage            │
│   • App stubs   │   • Contact      │   • Service sub-pages       │
│                 │   • Careers      │   • AboutPage               │
│   Gate 1:       │   • ProjectCard  │   • FaqPage                 │
│   COMPONENT_API │   • ProjectModal │   • PrivacyPage             │
│   .md + clean   │                  │   • NotFoundPage            │
│   dev server    │   Exit:          │                              │
│                 │   BETA_HANDOFF   │   Exit:                     │
│   Sprint 4:     │   .md            │   GAMMA_HANDOFF.md          │
│   QA + Reconcile│                  │                              │
│   imports       │                  │                              │
│   Gate 3:       │                  │                              │
│   npm run build │                  │                              │
│   passes clean  │                  │                              │
└─────────────────┴──────────────────┴─────────────────────────────┘

Flow:
  Step 1: Launch PM Alpha → Sprint 1
  Step 2: Gate 1 — COMPONENT_API.md exists + dev server clean
  Step 3: Launch PM Beta + PM Gamma SIMULTANEOUSLY
  Step 4: Gate 2 — BETA_HANDOFF.md + GAMMA_HANDOFF.md both exist
  Step 5: Notify PM Alpha → Sprint 4 (QA + data reconciliation)
  Step 6: Gate 3 — npm run build passes, zero errors
```

### 12.2 — File Ownership Zones

| Zone | Owner | Files |
|------|-------|-------|
| Alpha | PM Alpha | All config files (`tailwind.config.js`, `vite.config.js`, `vercel.json`, `postcss.config.js`), `index.html`, `src/index.css`, `src/main.jsx`, `src/App.jsx`, `src/hooks/*`, `src/components/ui/*`, `src/components/layout/*` |
| Beta | PM Beta | `src/pages/HomePage.jsx`, `src/pages/PortfolioPage.jsx`, `src/pages/ContactPage.jsx`, `src/pages/CareersPage.jsx`, `src/components/sections/ProjectCard.jsx`, `src/components/sections/ProjectModal.jsx` |
| Gamma | PM Gamma | `src/data/*.js` (all 7 data files), `src/pages/ServicesPage.jsx`, `src/pages/services/*.jsx` (all service sub-pages), `src/pages/AboutPage.jsx`, `src/pages/FaqPage.jsx`, `src/pages/PrivacyPage.jsx`, `src/pages/NotFoundPage.jsx` |

**Hard rule:** Agents NEVER write to files outside their zone. PM Alpha reconciles cross-zone data imports in Sprint 4.

### 12.3 — Gate Definitions

**Gate 0 — Entry condition for Alpha Sprint 1:**
- Project folder exists
- `package.json` exists (post-scaffolding)
- If no `package.json`: run Phase 0 scaffolding first

**Gate 1 — Alpha Sprint 1 exit / Beta+Gamma entry:**
1. `npm run dev` starts on localhost:5173 with zero console errors
2. All stub routes render without crashing (even as minimal placeholder divs)
3. `COMPONENT_API.md` exists at project root
4. **HALT RULE:** PM Beta must NOT begin until `COMPONENT_API.md` exists. If missing: output `BETA HALTED: COMPONENT_API.md not found at project root.` and stop.

**Gate 2 — Beta+Gamma exit / Alpha Sprint 4 entry:**
- `BETA_HANDOFF.md` exists at project root
- `GAMMA_HANDOFF.md` exists at project root
- Alpha reads both handoff files before beginning QA

**Gate 3 — Alpha Sprint 4 exit / deployment ready:**
1. `npm run build` completes with zero errors
2. Zero console errors on all routes in `npm run dev`
3. No hardcoded hex values in JSX (grep check)
4. No "Submit" button text anywhere (grep check)
5. No "React 19" in any file (grep check)

---

### 12.4 — PM Alpha Injection Template

```
# PM ALPHA — INJECTION PROMPT
## [Company Name] Website Build
### Role: Foundation, UI System & QA
---

## YOUR ROLE IN THIS BUILD

You are PM Alpha. You own the foundation layer of this codebase. Two other agents (PM Beta and PM Gamma) will build on top of your output. Nothing they write will work correctly unless your components, layout, routing, and config are correct first.

**Your responsibilities:**
- Sprint 1: Phase 0 scaffolding + Phase 1 UI components + Phase 2 layout + COMPONENT_API.md
- Sprint 4: Phase 4 data reconciliation + scroll reveal wiring + Phase 5 QA + npm run build validation

**Your file ownership zone (ONLY write to files in this list):**
- tailwind.config.js, postcss.config.js, vite.config.js, vercel.json
- index.html
- src/index.css
- src/main.jsx
- src/App.jsx
- src/hooks/useScrollReveal.js
- src/hooks/useMagneticEffect.js
- src/components/ui/* (all 15 UI components)
- src/components/layout/Navbar.jsx, Footer.jsx, PageLayout.jsx

**You must NEVER write to:**
- src/data/ ← owned by Gamma
- src/pages/ ← owned by Beta and Gamma
- src/components/sections/ ← owned by Beta

---

## GATE CONDITIONS

**Gate 1 exit condition (your Sprint 1 is done when ALL of these are true):**
1. npm run dev starts on localhost:5173 with zero console errors
2. All stub routes render without crashing
3. COMPONENT_API.md exists at project root with all 15 components documented

**Gate 2 entry condition (before Sprint 4):**
- Read BETA_HANDOFF.md and GAMMA_HANDOFF.md before beginning QA work
- Note all flagged issues, data shape mismatches, and NEEDS PROP comments

**Gate 3 exit condition (your Sprint 4 is done when ALL of these are true):**
1. npm run build passes with zero errors
2. Zero console errors on all routes in npm run dev
3. grep for hardcoded hex in src/ returns zero results
4. grep for "Submit" button text returns zero results

---

## PHASE 0 — SCAFFOLDING

Run these commands in order:

```bash
cd [project-folder]
npm install react@18 react-dom@18
npm install gsap lenis react-router-dom lucide-react react-compare-slider
npm install -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

Write these files immediately after scaffolding (exact content from Section 5 of build template):
- index.html: with [Company Name] title, meta description, Google Fonts preconnect + stylesheet
- tailwind.config.js: gl-* color tokens + font families + safelist
- postcss.config.js: standard tailwindcss + autoprefixer
- vite.config.js: minimal @vitejs/plugin-react config
- vercel.json: SPA rewrites rule
- src/index.css: full design tokens + all animation classes
- src/main.jsx: Lenis + GSAP + ScrollTrigger bootstrap

App.jsx stub pattern:
```jsx
const Stub = ({ name }) => (
  <div className="min-h-screen flex items-center justify-center text-gl-muted font-mono text-sm">
    [{name}] — stub, pending build
  </div>
)
// Wire all routes, using <Stub name="HomePage" /> etc. for pages not yet built
```

---

## PHASE 1 — UI COMPONENTS

Build all 15 components. Strict build order to respect dependencies:

1. Badge.jsx — no dependencies
2. TrustBadge.jsx — no dependencies
3. Card.jsx — no dependencies
4. SectionHeader.jsx — internal IntersectionObserver, line-mask reveal
5. Button.jsx — requires useMagneticEffect hook (build hook first)
6. Accordion.jsx — CSS max-height transition, full aria attributes
7. BeforeAfterSlider.jsx — wraps react-compare-slider, gold handle
8. CostEstimatorSlider.jsx — linear interpolation, en-CA locale
9. FilterBar.jsx — pill buttons, ternary classes, aria-pressed
10. MultiStepForm.jsx — contact (4-step) + careers (2-step) modes
11. FloatingCTA.jsx — fab-pulse, tel: link
12. ChatWidget.jsx — toggle open/close, static messages
13. LeadMagnetPopup.jsx — sessionStorage, 12s delay, console.log
14. VideoModal.jsx — role=dialog, backdrop blur, ESC close
15. GoogleReviewsWidget.jsx — auto-rotate, dot indicators

For each component:
- Use variants lookup object (never template literals for class construction)
- Include all props and behaviors as documented in Section 7 of build template
- No hardcoded hex values — use Tailwind gl-* tokens only

---

## PHASE 2 — HOOKS

Build in this order:

1. src/hooks/useScrollReveal.js — IntersectionObserver, fires once, .is-visible class
2. src/hooks/useMagneticEffect.js — mouse tracking, desktop-only, respects prefers-reduced-motion

Both hooks are documented with full implementation in Section 6 of build template.

---

## PHASE 2 — LAYOUT

Build in this order:

1. Navbar.jsx
   - Fixed pill, top: 1.5rem
   - IntersectionObserver watching #navbar-sentinel (placed at bottom of HomePage hero)
   - Fallback to scrolled=true when no sentinel found (all non-home routes)
   - threshold: 0 (not 0.5 — prevents flicker)
   - Mobile: aria-expanded on hamburger, role="dialog" on overlay
   - Active route highlighting via useLocation()

2. Footer.jsx
   - 4-column grid (lg:grid-cols-4)
   - Brand, Services links, Company links, NAP block
   - Pulsing status dot (animate-ping)
   - All links via <Link> (internal) or <a> (external)
   - font-mono text-xs for bottom bar copyright

3. PageLayout.jsx
   - Outlet + Navbar + Footer + FloatingCTA + ChatWidget
   - ScrollToTop component (useLocation pathname watch)
   - CSS page transition (see Section 8 for full implementation)

---

## PHASE 1 GATE DELIVERABLE — COMPONENT_API.md

After all components are complete and npm run dev is clean, generate COMPONENT_API.md at the project root.

Format for each component:

```markdown
## [ComponentName]
Import: `import { ComponentName } from '../components/ui/ComponentName'`
Sub-pages: `import { ComponentName } from '../../components/ui/ComponentName'`

Props:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'default' | ... |

Example:
\`\`\`jsx
<ComponentName prop="value" otherProp={3} />
\`\`\`

Notes:
- behavioral or usage notes
```

This file is the contract PM Beta and PM Gamma build against. It must be complete and accurate before they begin.

---

## PHASE 4 — QA & DATA RECONCILIATION (Sprint 4, after Gate 2)

**Read BETA_HANDOFF.md and GAMMA_HANDOFF.md before anything else.**

### Data reconciliation

Replace Beta's hardcoded local constants with Gamma's data file imports:

```jsx
// In HomePage.jsx — replace local SERVICES constant:
// OLD: const SERVICES = [{ id, name, tagline, imageUrl, slug }]
// NEW:
import { services as SERVICES } from '../data/services'

// In PortfolioPage.jsx — replace local PROJECTS constant:
// OLD: const PROJECTS = [{ id, title, type, ... }]
// NEW:
import { projects as PROJECTS } from '../data/projects'

// In CareersPage.jsx — replace local CAREERS constant:
// OLD: const CAREERS = [{ id, title, type, ... }]
// NEW:
import { careers as CAREERS } from '../data/careers'
```

**Preserve these local constants** — do NOT replace with data imports:
- TESTIMONIALS in HomePage (homepage-curated selection, separate from data/testimonials.js)
- PROCESS_STEPS / STEPS (page-specific UI constants)
- FILTER_GROUPS in PortfolioPage (UI constants, not from data)
- VALUES in AboutPage (brand copy, not from data)

### QA checklist

Run through every item before Gate 3:

```
Build & Errors:
[ ] npm run build completes with zero errors
[ ] npm run preview — all routes load in production build
[ ] Zero console errors on any route in npm run dev

Visual & Content:
[ ] Hero text readable at 375px viewport width
[ ] All cards stack vertically on mobile (grid → 1 col)
[ ] Section padding consistent: py-24 lg:py-36 on all sections
[ ] No "Lorem ipsum" anywhere in the codebase
[ ] All CTAs: "Get My Project Estimate" or "Book Your Consultation" — no "Submit"

Accessibility:
[ ] Accordion has aria-expanded and aria-controls on trigger buttons
[ ] ProjectModal has role="dialog" aria-modal="true" and closes on ESC
[ ] All form inputs have associated <label> with matching htmlFor/id
[ ] All <img> tags have loading="lazy" decoding="async" (heroes: loading="eager")
[ ] All interactive elements have :focus-visible ring visible
[ ] Hamburger menu aria-expanded updates correctly on open/close
[ ] Form inputs have min 44px touch targets (py-3 = ~48px height with text)

Mobile:
[ ] Hamburger menu opens and closes on mobile
[ ] All grids collapse to single column at 375px
[ ] BeforeAfterSlider drag handle works on touch devices
[ ] FloatingCTA and ChatWidget don't overlap at 375px

Code Quality:
[ ] grep for hardcoded hex in src/: should return zero results
[ ] grep for "Submit" button text: should return zero results
[ ] grep for "React 19": should return zero results
[ ] All data imports reconciled (no local constants overriding data files)
[ ] All GSAP useEffect blocks use gsap.context() and return ctx.revert()
```

**After Gate 3:** Generate ALPHA_QA_COMPLETE.md at project root with build status, final bundle sizes, and any remaining TODOs for client handoff.
```

---

### 12.5 — PM Beta Injection Template

```
# PM BETA — INJECTION PROMPT
## [Company Name] Website Build
### Role: Complex & Interactive Pages
---

## YOUR ROLE IN THIS BUILD

You are PM Beta. You own the complex, stateful, and interactive pages of this codebase.
PM Alpha has completed the foundation and UI components. PM Gamma is running simultaneously.

**Entry condition — HALT if not met:**
- COMPONENT_API.md must exist at project root.
- If it does not exist: output exactly "BETA HALTED: COMPONENT_API.md not found at project root." and stop all work.

**Your file ownership zone (ONLY write to these files):**
- src/pages/HomePage.jsx
- src/pages/PortfolioPage.jsx
- src/components/sections/ProjectCard.jsx
- src/components/sections/ProjectModal.jsx
- src/pages/ContactPage.jsx
- src/pages/CareersPage.jsx

**You must NEVER write to:**
- src/components/ui/ ← owned by Alpha (use as-is from COMPONENT_API.md)
- src/data/ ← owned by Gamma (use local constants with TODO comments)
- src/App.jsx ← owned by Alpha
- src/components/layout/ ← owned by Alpha

---

## DATA FILE STRATEGY

PM Gamma is writing src/data/ files simultaneously. You cannot import from src/data/ yet.

For every page you write, use hardcoded local constants that mirror the expected data shape exactly. Add this comment at the top of each file:

```jsx
// TODO: Replace local constants below with data file imports during Alpha QA sprint (Sprint 4)
// Expected imports:
//   import { services } from '../data/services'
//   import { projects } from '../data/projects'
//   import { careers } from '../data/careers'
```

**Data shapes your local constants MUST mirror exactly:**

```js
// services shape (for HomePage service pathways):
{
  id: string,
  name: string,
  slug: string,
  tagline: string,
  description: string,
  priceRange: string,
  timeline: string,
  imageUrl: string,
}

// projects shape — CRITICAL: use this EXACT shape, not any older version:
{
  id: string,
  title: string,
  type: string,       // 'kitchen' | 'bathroom' | 'basement' | 'addition'
  style: string,      // 'modern' | 'transitional' | 'traditional'
  budgetRange: string, // exact value matched by FilterBar: '$75k–$100k' etc.
  budgetLabel: string, // display string: '$75k – $100k'
  beforeImage: string, // URL for BeforeAfterSlider "before" side
  afterImage: string,  // URL for BeforeAfterSlider "after" side
  description: string,
  quote: string,       // client testimonial for ProjectModal
  timeline: string,
  scope: string,
  location: string,
}

// careers shape (for CareersPage):
{
  id: string,
  title: string,
  type: string,       // 'Full-time' | 'Contract'
  department: string,
  description: string,
  responsibilities: string[],
  requirements: string[],
  location: string,
}
```

---

## PARALLEL ORCHESTRATION

Spawn three sub-agents simultaneously:
- **Sub-Agent 1:** HomePage.jsx only
- **Sub-Agent 2:** PortfolioPage.jsx + ProjectCard.jsx + ProjectModal.jsx
- **Sub-Agent 3:** ContactPage.jsx + CareersPage.jsx

**Hard rules for ALL sub-agents:**
1. Write ONLY your assigned files — nothing else
2. Import components from paths relative to your file location (src/pages/ = `../components/ui/`)
3. NEVER import from src/data/ — use local constants with TODO comment
4. NEVER create new hooks, utilities, or helpers
5. NEVER modify files you did not create
6. If a required component prop is not in COMPONENT_API.md: add `{/* NEEDS PROP: [propName] — [description] */}` as a comment in JSX
7. All images: `loading="lazy" decoding="async"` + `{/* TODO: replace with [client] photography */}`
8. No hardcoded hex values in any className
9. No "Submit" as button text — ever

---

## SUB-AGENT 1 — HOMEPAGE SPEC

**File:** src/pages/HomePage.jsx

**Sections (6 minimum, 9 preferred):**

**1. Hero** (required)
- `min-h-[100dvh]` flex flex-col justify-end
- Background image with `loading="eager"` (above fold)
- Gradient overlay: `bg-gradient-to-t from-gl-bg via-gl-bg/70 to-gl-bg/20`
- GSAP stagger entrance on mount:
  ```js
  gsap.from([badgeRef.current, h1Ref.current, h2Ref.current, subRef.current, ctaRef.current],
    { y: 40, opacity: 0, stagger: 0.12, ease: 'power3.out', duration: 0.9 }
  )
  ```
- Wrap in gsap.context() + return ctx.revert()
- H1: "[Company Name]." — bold, 5xl to 7xl
- H2: `<em>"[Sub-tagline]."</em>` — Playfair italic via em tag
- Subtitle paragraph: 1–2 sentences, text-gl-muted
- CTA row: "Get My Project Estimate" (primary, Link to /contact) + "View Our Work" (secondary, Link to /portfolio)
- `<div id="navbar-sentinel" className="absolute bottom-0 left-0 w-full h-px" />` at hero bottom

**2. Trust Strip** (required)
- `bg-gl-dark/60 backdrop-blur-sm border-y border-[rgba(201,168,76,0.15)]`
- 4 TrustBadges in horizontal flex, gap-8, py-6, centered
- Badges: BBB A+ Rated / Licensed & Insured / 500+ Projects Completed / 5-Star Rated
- Each uses `<TrustBadge icon={...} label="..." />`

**3. Service Pathways** (required)
- Heading: "What We Build" or similar
- 2×2 grid (md:grid-cols-2 lg:grid-cols-4)
- Each card: image bg with hover scale, gradient overlay, service name + tagline + "Explore →" link
- 4 services: Kitchen / Bathroom / Basement / Addition

**4. Social Proof** (required)
- 3 testimonials, lg:grid-cols-3
- Each: 5 stars, italic quote, author + location
- `<Card variant="testimonial">` for each

**5. Before/After Showcase** (required)
- `<BeforeAfterSlider beforeImage={...} afterImage={...} />`
- Add "Drag to compare" instruction below

**6. Process Preview** (required)
- 3 steps: "Free Consultation" / "Design & Permits" / "Build & Handover"
- Connector lines between steps (desktop only): `hidden md:block connector-line`

**7. FAQ Preview** (optional but encouraged)
- First 4–6 FAQ items
- `<Accordion items={FAQ_ITEMS} />`

**8. Google Reviews** (optional but encouraged)
- `<GoogleReviewsWidget />`

**9. Bottom CTA** (required)
- `<em>` Playfair heading
- "Get My Project Estimate" button → /contact

---

## SUB-AGENT 2 — PORTFOLIO SPEC

**Files:** src/pages/PortfolioPage.jsx + src/components/sections/ProjectCard.jsx + src/components/sections/ProjectModal.jsx

**PortfolioPage:**
- Hero: SectionHeader + project count stat
- Sticky FilterBar area (top-24): 3 filter groups
  - Render each group's label + its FilterBar
  - State: `const [activeFilters, setActiveFilters] = useState({})`
  - Toggle logic: clicking same value deselects (see Section 10 for exact implementation)
- Grid: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`
  - Map over `filtered` array → `<ProjectCard project={p} onClick={() => setSelectedProject(p)} />`
- Empty state:
  ```jsx
  {filtered.length === 0 && (
    <div className="col-span-3 text-center py-16">
      <p className="text-gl-muted mb-4">No projects match your current filters.</p>
      <button onClick={() => setActiveFilters({})} className="text-gl-accent font-mono text-sm hover:underline">
        Clear all filters
      </button>
    </div>
  )}
  ```
- `{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}`
- Bottom CTA: estimate button

**ProjectCard:**
- Props: `project` (full project object), `onClick` (fn)
- `role="button"` `tabIndex={0}` `onKeyDown={(e) => e.key === 'Enter' && onClick()}`
- Displays `project.afterImage` as the primary card image (the "after" state is the portfolio showpiece)
- Group hover overlay with "View Project →" text
- Badge: `project.type` in font-mono top-left
- No `<Link>` — cards open the modal, not a route

**ProjectModal:**
- Props: `project`, `onClose`
- Rendered via `ReactDOM.createPortal(content, document.body)`
- `role="dialog"` `aria-modal="true"` `aria-label={project.title}`
- ESC key: `useEffect(() => { const handler = (e) => e.key === 'Escape' && onClose(); document.addEventListener('keydown', handler); return () => document.removeEventListener('keydown', handler) }, [onClose])`
- Auto-focus close button: `useEffect(() => { closeButtonRef.current?.focus() }, [])`
- Body scroll lock: `useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])`
- Layout: `<BeforeAfterSlider>` at top, then project metadata (timeline, scope, location, budgetLabel), then client quote block
- Quote block: `border-l-2 border-gl-accent pl-4 italic text-gl-surface`
- CTA at bottom: "Get My Project Estimate" → /contact

---

## SUB-AGENT 3 — CONTACT + CAREERS SPEC

**Files:** src/pages/ContactPage.jsx + src/pages/CareersPage.jsx

**ContactPage:**
- Hero section: SectionHeader (eyebrow "Get In Touch", heading with em)
- Two-column layout: `max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16`
- Left column:
  - 4 TrustBadges stacked (gap-6)
  - NAP block (mt-10): address, phone (tel:), email (mailto:)
  - Map placeholder: Unsplash aerial city image, rounded-2xl, Badge overlay "Ottawa, ON Service Area"
    `{/* TODO: Replace with embedded Google Maps when CRM integration is live */}`
- Right column:
  - `<h3>` heading: "Tell Us About Your Project"
  - `<MultiStepForm mode="contact" />`

**CareersPage:**
- Hero: SectionHeader + 3 stats in grid (Jobs Available / Average Tenure / Employee Rating)
- Values section: 3 brand values, lg:grid-cols-3, Card variant="feature"
  Values: Safety First / Master Craftsmen / Growth Culture
- Open positions: Map over CAREERS local constant
  Each position: Card with title, type Badge, department, description, "Apply Now" button
  State: `const [selectedJob, setSelectedJob] = useState(null)` + `const [showForm, setShowForm] = useState(false)`
  "Apply Now" sets selectedJob + showForm = true
- Application form (conditional, below positions list):
  `{showForm && selectedJob && (` ... `<MultiStepForm mode="careers" />` ... `)}`

---

## EXIT DELIVERABLE — BETA_HANDOFF.md

When all 6 files are complete, generate BETA_HANDOFF.md at project root:

```markdown
# BETA HANDOFF
Generated: [date/time]

## Status
[COMPLETE / PARTIAL — note if partial and what remains]

## Files Written
- src/pages/HomePage.jsx ✓
- src/pages/PortfolioPage.jsx ✓
- src/components/sections/ProjectCard.jsx ✓
- src/components/sections/ProjectModal.jsx ✓
- src/pages/ContactPage.jsx ✓
- src/pages/CareersPage.jsx ✓

## NEEDS PROP Flags
[ComponentName in file.jsx — prop name — description of what's needed]
[or "None" if all components had sufficient API in COMPONENT_API.md]

## Local Constants Requiring Data File Reconciliation
- HomePage.jsx: SERVICES constant (4 items) → replace with import from services.js
- PortfolioPage.jsx: PROJECTS constant (6 items) → replace with import from projects.js
- CareersPage.jsx: CAREERS constant (5 items) → replace with import from careers.js

## Console Errors Observed
[list any errors seen during dev testing, or "None detected"]

## Notes for Alpha QA
[observations, design decisions, edge cases discovered during build]
```
```

---

### 12.6 — PM Gamma Injection Template

```
# PM GAMMA — INJECTION PROMPT
## [Company Name] Website Build
### Role: Data Files, Content Pages & Static Pages
---

## YOUR ROLE IN THIS BUILD

You are PM Gamma. You own all data files and content/static pages.
You run simultaneously with PM Beta. Your output does NOT depend on Beta's.
PM Alpha reconciles all cross-zone imports in Sprint 4.

**Entry condition:** Begin immediately — no dependencies, no gate to wait for.
**Build order within your sprint:** Data files FIRST (Sprint 2A), then pages (Sprint 2B).
PM Beta's pages will import from your data files after Alpha's Sprint 4 reconciliation.

**Your file ownership zone (ONLY write to these files):**
- src/data/services.js
- src/data/projects.js
- src/data/faq.js
- src/data/team.js
- src/data/careers.js
- src/data/inspiration.js
- src/data/testimonials.js
- src/pages/ServicesPage.jsx
- src/pages/services/KitchensPage.jsx
- src/pages/services/BathroomsPage.jsx
- src/pages/services/BasementsPage.jsx
- src/pages/services/AdditionsPage.jsx
- src/pages/AboutPage.jsx
- src/pages/FaqPage.jsx
- src/pages/PrivacyPage.jsx
- src/pages/NotFoundPage.jsx

**You must NEVER write to:**
- src/components/ui/ ← owned by Alpha
- src/components/layout/ ← owned by Alpha
- src/components/sections/ ← owned by Beta
- src/pages/HomePage.jsx ← owned by Beta
- src/pages/PortfolioPage.jsx ← owned by Beta
- src/pages/ContactPage.jsx ← owned by Beta
- src/pages/CareersPage.jsx ← owned by Beta
- src/App.jsx ← owned by Alpha

**CONTENT QUALITY RULE: NO LOREM IPSUM.**
Every word in every data file must be specific to [Company Name]'s industry in [City].
FAQ answers must be detailed (3–6 sentences), pre-sell the service, and handle the implied objection in the question.

---

## SPRINT 2A — DATA FILES

Build all data files first. Pages will import from these.

### services.js
Required schema per item:
```js
{
  id: string,         // matches route slug
  slug: string,       // URL slug (same as id typically)
  name: string,
  tagline: string,
  description: string,
  priceRange: string, // e.g. '$45,000 – $120,000'
  timeline: string,   // e.g. '8–14 weeks'
  imageUrl: string,   // Unsplash URL
  included: string[], // 6–8 items
  costRanges: { minSqft, maxSqft, minCost, maxCost }, // for CostEstimatorSlider
  faqTags: string[],  // tags that match faq.js items for FAQ preview on this page
}
```
Exports: `services` array + `getServiceBySlug(slug)` function
Minimum: 4 services (kitchens, bathrooms, basements, additions)

### projects.js — CRITICAL SCHEMA
Use ONLY this schema — no other version is compatible with Beta's PortfolioPage:
```js
{
  id: string,
  title: string,
  type: string,        // must match a service id exactly: 'kitchen', 'bathroom', 'basement', 'addition'
  style: string,       // must be: 'modern' | 'transitional' | 'traditional'
  budgetRange: string, // must match FilterBar values exactly: '$30k–$50k', '$50k–$75k', '$75k–$100k', '$100k+'
  budgetLabel: string, // human-readable version: '$30k – $50k'
  beforeImage: string,
  afterImage: string,
  description: string, // 2–3 sentences
  quote: string,       // client testimonial (first person)
  timeline: string,    // e.g. '11 weeks'
  scope: string,       // comma-separated scope summary
  location: string,    // '[Neighbourhood], [City]'
}
```
Exports: `projects` array + `getProjectsByType(type)` + `getProjectById(id)` functions
Minimum: 6 projects (at least 2 kitchen, 2 bathroom, 1 basement, 1 addition)
Use [City] neighbourhood names for location field.

### faq.js — BOTH FIELDS REQUIRED
```js
{
  id: string,
  category: string,   // REQUIRED: 'general' | 'pricing' | 'process' | 'permits'
  tags: string[],     // REQUIRED: array, can include multiple tags for cross-referencing
  question: string,
  answer: string,     // 3–6 sentences, specific to [City], pre-sell the service
}
```
Exports: `faq` array + `getFaqByCategory(category)` + `getFaqByTag(tag)` functions
Minimum: 24 items (6 per category)
Both helper functions are required — FaqPage uses getFaqByCategory, service pages use getFaqByTag.

### team.js
```js
{ id, name, title, bio, imageUrl }
```
Exports: `team` array
Minimum: 3 team members with credibility-building bios (not generic)

### careers.js
```js
{
  id, title, type, department, description,
  responsibilities: string[],
  requirements: string[],
  location
}
```
Exports: `careers` array
Minimum: 5 positions

### testimonials.js
```js
{ id, quote, author, location, project, rating }
```
Exports: `testimonials` array + `featuredTestimonial` (= testimonials[0])
Minimum: 6 items
All marked: `// TODO: replace with real client testimonials`

### inspiration.js
```js
// Categories with items for InspirationPage
{
  id, label, headline, subline, serviceLink,
  items: [{ id, title, style, imageUrl }]
}
```
Exports: `inspirationCategories` array
Minimum: 3 categories, 6 items each

---

## SPRINT 2B — PAGE FILES

Build pages after all data files are complete. Import from data files directly.

### ServicesPage.jsx
- Hero SectionHeader
- Services grid (lg:grid-cols-3), Card variant="feature" per service
  - Image, timeline Badge, name, description, priceRange, "Explore [Service] →" Button as Link
  - Import: `import { services } from '../data/services'`

### [Service]Page.jsx — use template from Section 10

Apply the 9-section service sub-page template for each:
KitchensPage, BathroomsPage, BasementsPage, AdditionsPage

Key requirements:
- Import path for sub-pages: `'../../components/ui/ComponentName'`
- Import data: `import { getServiceBySlug } from '../../data/services'`
- Import FAQ: `import { getFaqByTag } from '../../data/faq'`
- GSAP parallax hero: see Section 6 for exact implementation
- BeforeAfterSlider with matching service photography
- Testimonial block (single quote from testimonials.js)
- CostEstimatorSlider with costRanges from service data
- getFaqByTag using service.faqTags[0] for FAQ preview

### AboutPage.jsx
- GSAP counter animations on 4 stats (ScrollTrigger, once: true)
  Stats: 15+ Years / 500+ Projects / $0 Overruns / 4.9★ Rating
  See Section 10 for exact counter animation pattern
- Team grid from team data: `import { team } from '../data/team'`
- Values grid: 3 cards, lg:grid-cols-3
  Values: Transparency / Craftsmanship / Accountability

### FaqPage.jsx
- Sticky category tab bar (top-24 z-40)
  4 tabs: General / Pricing / Process / Permits & Timeline
- `<Accordion items={getFaqByCategory(activeCategory)} key={activeCategory} />`
  The `key` prop forces remount on tab change → re-runs reveal animation
- Import: `import { getFaqByCategory } from '../data/faq'`

### PrivacyPage.jsx
IMPORTANT: Include a prominent DRAFT banner as the FIRST element (before everything else):
```jsx
<div className="bg-gl-dark border-b border-gl-accent/30 py-3 text-center">
  <p className="font-mono text-xs text-gl-accent">
    [DRAFT — NOT FOR PUBLICATION — Replace with reviewed legal copy before launch]
  </p>
</div>
```

Include 6 PIPEDA-compliant sections with anchor IDs:
1. Information We Collect (#collection)
2. How We Use Your Information (#use)
3. How We Share Your Information (#sharing)
4. Data Retention (#retention)
5. Your Rights (#rights)
6. Contact Us (#contact)

Content must be placeholder PIPEDA language — clearly marked as DRAFT throughout.

### NotFoundPage.jsx
```jsx
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Exception: className="font-serif italic" is acceptable here for a standalone large numeral */}
      <p className="font-serif italic text-[12rem] leading-none text-gl-accent/20 select-none">
        404
      </p>
      <h1 className="text-3xl font-bold text-gl-surface mb-4">Page Not Found</h1>
      <p className="text-gl-muted mb-8 max-w-md">
        The page you are looking for has moved, been renamed, or does not exist.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button as={Link} to="/" variant="primary">Return to Homepage</Button>
        <Button as={Link} to="/contact" variant="secondary">Get In Touch</Button>
      </div>
    </div>
  )
}
```

---

## EXIT DELIVERABLE — GAMMA_HANDOFF.md

Generate at project root when all files are complete:

```markdown
# GAMMA HANDOFF
Generated: [date/time]

## Status
[COMPLETE / PARTIAL]

## Files Written

### Data Files
- src/data/services.js ✓ ([N] services)
- src/data/projects.js ✓ ([N] projects, [N] types)
- src/data/faq.js ✓ ([N] items, [N] categories)
- src/data/team.js ✓ ([N] members)
- src/data/careers.js ✓ ([N] positions)
- src/data/testimonials.js ✓ ([N] items)
- src/data/inspiration.js ✓ ([N] categories)

### Page Files
- src/pages/ServicesPage.jsx ✓
- src/pages/services/KitchensPage.jsx ✓
- src/pages/services/BathroomsPage.jsx ✓
- src/pages/services/BasementsPage.jsx ✓
- src/pages/services/AdditionsPage.jsx ✓
- src/pages/AboutPage.jsx ✓
- src/pages/FaqPage.jsx ✓
- src/pages/PrivacyPage.jsx ✓
- src/pages/NotFoundPage.jsx ✓

## Data Shape Confirmation
- projects.js uses beforeImage/afterImage/quote/style/budgetRange schema: [YES/NO]
- faq.js has both `category` (string) and `tags` (array) fields on every item: [YES/NO]
- faq.js exports both getFaqByCategory and getFaqByTag: [YES/NO]
- services.js includes costRanges object on every item: [YES/NO]
- services.js includes faqTags array on every item: [YES/NO]

## Image TODOs
[N] Unsplash images marked with `// TODO: replace with [client] photography`

## Notes for Alpha QA
[content decisions, data edge cases, anything Alpha needs to know before reconciliation]
```
```

---

### 12.7 — Orchestration Instructions (Human Operator)

Follow these steps in order:

```
STEP 1 — SETUP (5 minutes)
  a. Create project folder at agreed path
  b. Fill in this build template with client details (brand swap from Section 15)
  c. Create CLAUDE.md at project root using Appendix template, filled for client
  d. Confirm: folder exists, CLAUDE.md is in place

STEP 2 — LAUNCH PM ALPHA (30–40 minutes)
  a. Open Claude Code Desktop (or Claude CLI) in the project folder
  b. CLAUDE.md auto-loads as context in Claude Code Desktop
  c. Paste or say: "Execute PM Alpha Sprint 1 from docs/WEBSITE-BUILD-TEMPLATE.md Section 12.4"
  d. Let Alpha run to completion — do not interrupt
  e. Verify Gate 1:
     - COMPONENT_API.md exists at project root
     - npm run dev starts on localhost:5173
     - No console errors
  f. Alpha enters standby mode (it is done with Sprint 1)

STEP 3 — LAUNCH PM BETA + PM GAMMA SIMULTANEOUSLY (30–50 minutes)
  a. Open TWO separate terminal windows or Claude CLI sessions
  b. Session A (PM Beta): Paste Section 12.5 injection template
     - Replace [Company Name], [City] placeholders
  c. Session B (PM Gamma): Paste Section 12.6 injection template
     - Replace [Company Name], [City] placeholders
  d. Start both sessions at the same time — they are independent
  e. Do NOT wait for one to finish before starting the other

STEP 4 — MONITOR GATE 2 (check both sessions)
  a. Wait for BETA_HANDOFF.md to appear in project root
  b. Wait for GAMMA_HANDOFF.md to appear in project root
  c. Read both handoff documents
  d. Note any NEEDS PROP flags or data shape mismatches
  e. Both must exist before notifying Alpha

STEP 5 — NOTIFY PM ALPHA FOR SPRINT 4 (15–30 minutes)
  a. Resume the PM Alpha session
  b. Say: "Gate 2 is complete. BETA_HANDOFF.md and GAMMA_HANDOFF.md both exist in the project root. Begin Sprint 4: read both handoffs, reconcile data imports, run the full QA checklist."
  c. Let Alpha complete QA
  d. Verify Gate 3:
     - npm run build passes with zero errors
     - ALPHA_QA_COMPLETE.md generated

STEP 6 — DEPLOYMENT (see Section 13)
  a. Push to GitHub
  b. Import to Vercel
  c. Run pre-launch checklist from Section 13

Estimated total wall-clock time: 75–120 minutes for a complete 12+ page site.
```

---

### 12.8 — Client-Agnostic Transformation Rules

How to adapt all templates for a new client:

| Template string | Replace with |
|----------------|-------------|
| `[Company Name]` | Client's legal business name |
| `[City]` | Client's city (e.g., Ottawa, Toronto, Vancouver) |
| `[Province]` | Province abbreviation (e.g., ON, BC, AB) |
| `[Phone]` | Client's phone in E.164 format for `tel:` href: `+16135550100` |
| `[Phone Display]` | Client's phone in display format: `(613) 555-0100` |
| `[Email]` | Client's contact email |
| `[Year]` | Company founding year |
| `[project-folder]` | Project directory name |
| `[Neighbourhood 1..6]` | Client's actual service area neighbourhoods |
| Service list in App.jsx | Client's actual service lineup |
| `[X]M` in FAQ | Client's actual liability insurance coverage amount |

**What stays the same for every client:**
- All design system tokens (gl-* prefix)
- All animation patterns (GSAP timings, eases, ScrollTrigger configurations)
- All 15 component APIs (just update content inside them)
- All accessibility requirements
- All Tailwind safelist entries
- The three-agent architecture and gate system

**Service lineup adaptation:**
If client has 3 services instead of 4, remove one route from App.jsx and delete that service's page file. If client has a specialty service (e.g., custom millwork, commercial fit-outs), add a route and create a corresponding page following the service sub-page template.

**City-specific content:**
The faq.js answers must reference the client's city, local permit authorities (e.g., "City of [City] building department"), and local neighbourhoods. Generic FAQ answers that could apply to any city reduce conversion — specificity builds trust.

---

## Section 13 — Deployment

### Deploying to Vercel

1. Push codebase to a GitHub repository (public or private — both work with Vercel)
2. Go to [vercel.com](https://vercel.com) → New Project → Import Git Repository
3. Select the repository
4. Vercel auto-detects Vite — confirm these settings:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click Deploy
6. `vercel.json` already handles SPA routing (all routes rewrite to `index.html`)

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `greenlightrenovations.ca`)
3. Follow DNS configuration instructions (add A record or CNAME to your DNS provider)
4. SSL certificate is automatically provisioned by Vercel (typically within 2 minutes)

### Pre-Launch Checklist

All items must be resolved before sharing the URL with the client or any stakeholder:

```
Content & Branding:
[ ] Replace all Unsplash placeholder images with real client photography
[ ] Update <title> in index.html with client's actual business name
[ ] Update <meta name="description"> in index.html
[ ] Update favicon: replace /public/vite.svg with client's actual favicon.ico or .svg
[ ] Remove any remaining "stub" page content or placeholder text
[ ] Search for "[PLACEHOLDER]" strings across all src/ files — should return zero

Contact Details:
[ ] FloatingCTA.jsx: update PHONE_NUMBER and PHONE_DISPLAY constants
[ ] Footer.jsx: update phone, email, and physical address
[ ] ChatWidget.jsx: update COMPANY_NAME constant

Reviews & Testimonials:
[ ] GoogleReviewsWidget.jsx: update RATING, REVIEW_COUNT, and REVIEWS array with real data
[ ] testimonials.js: replace placeholder testimonials with real client quotes
[ ] team.js: replace Unsplash team photos with actual team photography

Legal & Compliance:
[ ] PrivacyPage.jsx: remove DRAFT banner, replace with reviewed legal copy
[ ] Verify all form submissions log to console only (no accidental data transmission)

Technical QA:
[ ] Test all routes in Vercel Preview environment (not just local dev)
[ ] Test on mobile (375px): hero text, hamburger menu, forms, BeforeAfterSlider touch
[ ] Verify no console errors in Vercel Preview (production build differs from dev)
[ ] Verify Lenis smooth scroll works in production (not just dev server)
[ ] Test page transitions on route change
[ ] Verify LeadMagnetPopup appears after 12 seconds on first visit (test in incognito)
[ ] Test FilterBar on PortfolioPage: all three filter groups work, empty state appears

Phase 2 Reminders (not blocking launch but document for client):
[ ] ChatWidget: activate when CRM/chat integration is ready
[ ] Photo upload in MultiStepForm: activate when backend is connected
[ ] VideoModal: add VIDEO_EMBED_URL when client records process video
[ ] Google Maps embed: replace map placeholder image when GMB listing is set up
[ ] LeadMagnetPopup: connect to email automation when CRM is live
```

---

## Section 14 — Brand Voice & Copy Standards

### Tone Definition

- **Confident** — state facts without hedging. "We complete projects on time" not "We try to complete projects on time"
- **Authoritative** — position as the expert advisor, not a vendor seeking approval
- **Results-driven** — always tie copy back to tangible outcomes for the homeowner
- **Not salesy** — premium brands do not beg. State value clearly, then invite action naturally
- **Not casual** — no slang, no excessive exclamation marks, no "Hey there!" or "Amazing!" openers

### Hero H1 Pattern (canonical)

Two lines: a bold sans statement + a Playfair italic emotional hook.

```jsx
<h1 className="text-5xl md:text-7xl font-bold text-gl-surface leading-tight tracking-tight">
  Transforming [City] Homes.<br />
  <em>On Time, On Budget.</em>
</h1>
```

The `<em>` tag invokes Playfair Display italic automatically via the global index.css rule. The visual contrast between Inter (rational, modern) and Playfair (emotive, prestigious) is the signature of the Midnight Luxe system.

**Variations for different businesses:**
- Law firm: "Protecting [City] Families." / *"With Precision. With Care."*
- Medical: "Exceptional Care, [City]." / *"Where Every Detail Matters."*
- Real estate: "Finding Your [City] Home." / *"In Every Neighbourhood. At Every Budget."*

### CTA Copy Table

| Context | Use | Never use |
|---------|-----|-----------|
| Primary contact button | "Get My Project Estimate" | "Submit", "Send", "Go" |
| Scheduling prompt | "Book Your Free Consultation" | "Contact Us", "Reach Out" |
| Service learn-more | "Explore [Service] →" | "Click Here", "Learn More" |
| Form final step | "Get My Estimate" | "Submit Form", "Send Request" |
| After-form return | "Return to Homepage" | "Go Back" |
| Navigation CTA | "View Our Work" | "See More" |

### Price Language Rules

```
Always use:    "investment" → "Your renovation investment starts at $45,000..."
                              "What will your investment be?"
               "pricing confirmed in consultation" at every estimate display
               Specific ranges: "$45,000–$120,000" (anchors the right buyer)
               "What you'll invest" in process descriptions

Never use:     "cost", "costs", "costing"
               "price", "pricing" in client-facing headline copy
               "fee" (implies a service charge, not a value exchange)
               "cheap", "affordable", "budget-friendly" — these undermine premium positioning
               "expensive" or "premium" either — let the work speak
```

### Trust Indicators (use consistently)

Rotate these throughout the site — not all on every page:

```
"[City]'s premier Design & Build firm"
"Licensed & insured in [Province]"
"BBB A+ Rated"
"5-Star rated — [X] Google reviews"
"[X]+ projects completed in [City]"
"On time, on budget — our track record speaks"
"Serving [Neighbourhood 1], [Neighbourhood 2], and [more] for [X] years"
```

### Numbers That Convert

Specificity signals credibility. Vague is cheap; specific is premium.

| Vague (avoid) | Specific (use) |
|---------------|---------------|
| "many projects" | "500+ projects completed" |
| "serving Ottawa" | "serving Westboro, Glebe, Kanata, Barrhaven, Rockcliffe, and Orleans" |
| "fast turnaround" | "11-week typical kitchen renovation" |
| "competitive pricing" | "$0 in budget overruns last year" |
| "great reviews" | "4.9 stars — 47 verified Google reviews" |
| "years of experience" | "Founded in 2008 — 15+ years in [City]" |

### What to Avoid

- Exclamation marks in headings — maximum one per entire page
- Superlatives without evidence: "best", "most trusted", "top-rated" (qualify with stats)
- Passive CTAs: "Feel free to reach out" → "Book your consultation"
- Generic copy that could apply to any contractor in any city
- Referring to renovations as a "cost" in any client-facing sentence
- Starting with "We" in hero headlines — leads with company, not client benefit
- Over-explaining process steps — confident brands summarize; insecure brands over-explain

---

## Section 15 — Brand Swap Checklist

Use this checklist when adapting this build for a new client.

### Global Find-Replace

Run these find-replace operations across the entire `src/` directory:

| Find | Replace with |
|------|-------------|
| `Green Light Construction` | `[New Company Name]` |
| `greenlightrenovations.ca` | `[new-domain.ca]` |
| `Ottawa` | `[New City]` |
| `Ontario` | `[New Province]` |
| `ON` | `[Province abbreviation]` |
| `+16135550100` | `+1[NPA][NXX][XXXX]` (E.164 format) |
| `(613) 555-0100` | `([area]) [prefix]-[line]` |
| `hello@greenlightrenovations.ca` | `[hello@newdomain.ca]` |
| `4.9` (rating) | `[actual Google rating]` |
| `47 reviews` | `[actual review count]` |

### Files to Update

| File | What to update |
|------|---------------|
| `index.html` | `<title>`, `<meta description>`, favicon href |
| `src/data/services.js` | Service names, slugs, prices, timelines, descriptions, included items, costRanges |
| `src/data/projects.js` | All 6+ projects with real before/after images and [City] neighbourhood names |
| `src/data/faq.js` | [City]-specific answers, local permit authority names, local neighbourhood references |
| `src/data/team.js` | Real team members, bios, and professional photos |
| `src/data/testimonials.js` | Real client testimonials with first-name + last initial, real neighbourhood locations |
| `src/data/careers.js` | Actual open positions, [City], [Province] in location field |
| `src/data/inspiration.js` | Update imageUrl entries with real client portfolio photography |
| `src/components/ui/GoogleReviewsWidget.jsx` | RATING, REVIEW_COUNT, REVIEWS array — real Google reviews |
| `src/components/ui/ChatWidget.jsx` | COMPANY_NAME constant, MESSAGES array opening text |
| `src/components/ui/LeadMagnetPopup.jsx` | OFFER_HEADLINE, OFFER_BODY, CTA_TEXT — client-specific lead magnet |
| `src/components/ui/FloatingCTA.jsx` | PHONE_NUMBER (E.164), PHONE_DISPLAY, aria-label |
| `src/pages/HomePage.jsx` | Hero headline, hero sub-tagline, trust strip stats |
| `src/components/layout/Navbar.jsx` | Company name/logo in nav, nav link labels if service names changed |
| `src/components/layout/Footer.jsx` | Company name, address, phone, email, service link labels |
| `src/pages/PrivacyPage.jsx` | Remove DRAFT banner, replace with reviewed PIPEDA-compliant legal copy |

### Routes to Add or Remove

Edit `src/App.jsx`:

```jsx
// Adding a new service route:
<Route path="services/[new-slug]" element={<NewServicePage />} />

// Removing an unused route (e.g., if client has no basement service):
// Delete: <Route path="services/basements" element={<BasementsPage />} />
// Delete: src/pages/services/BasementsPage.jsx
// Remove from Navbar services dropdown
// Remove from Footer services links
// Remove from services.js data
```

Create corresponding page file in `src/pages/services/` following the service sub-page template in Section 10.

### Design Token Swaps

If the client has a different brand palette, update only two files:

**1. `tailwind.config.js`** — update hex values:
```js
colors: {
  'gl-bg':      '#[new-background]',
  'gl-surface': '#[new-surface]',
  'gl-accent':  '#[new-accent]',
  'gl-dark':    '#[new-dark]',
  'gl-muted':   '#[new-muted]',
},
```

**2. `src/index.css`** — update CSS custom properties:
```css
:root {
  --color-bg:      #[new-background];
  --color-surface: #[new-surface];
  --color-accent:  #[new-accent];
  --color-dark:    #[new-dark];
  --color-text:    #[new-surface];
  --color-muted:   #[new-muted];
  --color-border:  rgba([new-accent-rgb], 0.15);
}
```

Note: The `gl-` token prefix stays the same — it is an internal identifier, not a brand identifier.

### Feature Expansion Components — Per-Client Required Updates

| Component | Required updates before launch |
|-----------|-------------------------------|
| `LeadMagnetPopup.jsx` | OFFER_HEADLINE, OFFER_BODY, CTA_TEXT — must be specific to client's actual lead magnet offer |
| `ChatWidget.jsx` | COMPANY_NAME string + first 1–2 MESSAGES lines — must feel like the client's brand voice |
| `FloatingCTA.jsx` | `href="tel:..."` + `aria-label="Call [Company Name]..."` — real phone number required |

---

## Appendix — CLAUDE.md Template

Use this template to create the `CLAUDE.md` at the root of every new client build. Fill in all `[PLACEHOLDER]` values before the first agent session begins.

```markdown
# [Company Name] — Website Build

## Project Overview
Premium static website for [Company Name], a [service type e.g. Design & Build renovation] firm in [City], [Province]. This is a flagship case study project for [Agency Name]. The goal is a client-ready demo showcasing high-end digital positioning before backend integrations are added.

## What We're Building
A fully interactive static React website with [N] pages, cinematic GSAP animations, client-side portfolio filtering, before/after image sliders, multi-step form UI, and a premium dark luxury design system.

## What We're NOT Building (Out of Scope)
- GHL/CRM integrations or form submissions
- Live review widgets or external APIs
- AI chat/voice agents
- Analytics tracking scripts
- Email/SMS automations
- Any backend or server-side code

## Pages
| Route | Page | Priority |
|-------|------|----------|
| `/` | Homepage | P0 |
| `/services` | Services Overview | P0 |
| `/services/[slug-1]` | [Service 1 Name] | P1 |
| `/services/[slug-2]` | [Service 2 Name] | P1 |
| `/services/[slug-3]` | [Service 3 Name] | P1 |
| `/services/[slug-4]` | [Service 4 Name] | P1 |
| `/portfolio` | Portfolio & Case Studies | P0 |
| `/about` | About Us | P1 |
| `/faq` | FAQ / Education Hub | P1 |
| `/careers` | Careers | P2 |
| `/contact` | Contact (multi-step form UI) | P0 |
| `/privacy` | Privacy Policy | P2 |

## Tech Stack
- **React 18** + **Vite**
- **Tailwind CSS v3.4.17** with custom design tokens
- **GSAP 3** + ScrollTrigger plugin for all animations
- **Lenis** for smooth scroll (init in main.jsx from day 1)
- **React Router v6** for client-side routing
- **react-compare-slider** for before/after image comparison
- **Lucide React** for icons
- **Google Fonts** (loaded via `<link>` in `index.html`)

## Design System — "Midnight Luxe"

### Color Tokens
```
--color-bg:       #0D0D12  (Obsidian — page background)
--color-surface:  #FAF8F5  (Ivory — primary text, light surfaces)
--color-accent:   #C9A84C  (Champagne Gold — CTAs, highlights)
--color-dark:     #2A2A35  (Slate — secondary backgrounds, cards)
--color-text:     #FAF8F5  (primary text on dark backgrounds)
--color-muted:    #9A9A9F  (secondary text, captions)
--color-border:   rgba(201,168,76,0.15) (subtle gold borders)
```

### Typography
- **Headings:** Inter — tight tracking
- **Serif accent:** Playfair Display Italic — use via bare `<em>` tag ONLY, never `className="font-serif italic"`
- **Mono:** JetBrains Mono — labels, tags, step numbers, prices

### Key Rules
- NEVER hardcode hex values in JSX — always use Tailwind tokens (gl-bg, gl-accent, etc.)
- NEVER use "Submit" as button text — use action-specific copy
- Always use "investment" not "cost" in all client-facing copy
- Section padding: py-24 lg:py-36
- Horizontal padding: px-6 md:px-16
- Container: max-w-7xl mx-auto
- No nested `<main>` elements — pages are children of PageLayout's `<main>`
- All images: loading="lazy" decoding="async" plus TODO: replace comment

## Client Details
- Company: [Company Name]
- City: [City], [Province]
- Phone: [Phone in display format e.g. (613) 555-0100]
- Phone E.164: [+1XXXXXXXXXX for tel: links]
- Email: [hello@domain.ca]
- Services: [list service names matching routes above]
- Target project budget range: $[min]k – $[max]k+
- Google Reviews: [N.N] stars, [N] reviews (or "not yet available")
- Founding year: [YEAR]

## Placeholder Content Rules
- Use Unsplash URLs matching: dark marble, gold accents, architectural shadows, luxury interiors, renovation craftsmanship
- All testimonials: `// TODO: replace with real client quotes`
- All project photos: `// TODO: replace with [Company Name] portfolio images`
- Form submissions: `console.log('Form data:', formData)` only — never send data anywhere

## Conventions
- One component per file for anything >50 lines
- Pages → `src/pages/`; service sub-pages → `src/pages/services/`
- Shared UI → `src/components/ui/`; section-specific → `src/components/sections/`
- Static data → `src/data/*.js` as arrays/objects
- Import order: React → third-party → local components → local data
- No CSS Modules — Tailwind utility classes only
- No TypeScript — plain JavaScript
- GSAP: always gsap.context() in useEffect, return ctx.revert() on cleanup
- GSAP plugins registered once in main.jsx only — never in components
- All images: loading="lazy" decoding="async" (hero images: loading="eager")
```

---

---

## Section 16 — Client Intake Protocol

> **Purpose:** Before any build agent touches code, this protocol ensures the operator has collected every piece of client-specific information the build requires. The agent interrogates the operator, surfaces all gaps, generates a research checklist, and only approves the build once `CLIENT_BRIEF.md` is complete and validated.

---

### 16.1 — How to Trigger This Protocol

Place this `docs/WEBSITE-BUILD-TEMPLATE.md` file in your project folder alongside any available client documents (PSA, signed proposal, intake form, brand guide, etc.). Then say:

```
Read Section 16 of docs/WEBSITE-BUILD-TEMPLATE.md and initiate the Client Intake Protocol.
Available client documents: [list any files you've placed in the project folder, or "none yet"].
```

The agent will:
1. Read all available client documents
2. Extract what it can determine on its own
3. Generate a structured questionnaire for every gap it cannot fill
4. Output a **Research Checklist** — a prioritized list of what you need to go collect
5. Wait for you to return with `CLIENT_BRIEF.md` completed
6. Validate the brief for completeness
7. Generate `CLAUDE.md` automatically from the brief
8. Signal that the build is ready to launch (Section 12)

**Hard rule for the agent:** Do NOT proceed to any build phase until `CLIENT_BRIEF.md` is marked `STATUS: COMPLETE` and all REQUIRED fields are filled. If fields are missing, output a numbered list of exactly what is still needed and stop.

---

### 16.2 — Agent Interrogation Instructions

When triggered, the agent must execute the following steps in order:

**Step 1 — Document scan**

Read every file in the project folder. For each document found, extract:
- Company name, city, province
- Services offered (names, not just categories)
- Pricing mentioned
- Contact details (phone, email, address)
- Team names mentioned
- Any brand guidelines
- Google review data (rating, count)
- Testimonials or client quotes
- Project photos or portfolio references

Note what was extracted and from which document.

**Step 2 — Gap identification**

Compare what was extracted against the full `CLIENT_BRIEF.md` schema (Section 16.3). For every field that could not be populated from existing documents, flag it as a gap.

Categorize gaps by urgency:
- 🔴 **REQUIRED** — Build cannot start without this
- 🟡 **RECOMMENDED** — Affects content quality; placeholder will be used if missing
- 🟢 **OPTIONAL** — Enhancement; template default applies if not provided

**Step 3 — Output the Research Checklist**

Generate a clean, numbered checklist the operator can take to a client meeting or use to request information. Group by who has the answer:

- **Operator already knows** — fill in now
- **Get from PSA/proposal** — extract from signed documents
- **Get from client** — schedule a 15-min call or send a form
- **Research independently** — Google Maps, Google Reviews, LinkedIn, BBB lookup

**Step 4 — Wait**

Output:
```
CLIENT_BRIEF.md template has been generated at [project root].
Complete all REQUIRED fields, then return and say:
"CLIENT_BRIEF.md is ready — validate and generate CLAUDE.md"
```

Do not write any code. Do not create any project files. Wait.

**Step 5 — Validation + CLAUDE.md generation**

When the operator returns with a completed `CLIENT_BRIEF.md`:
1. Read the file
2. Check every 🔴 REQUIRED field is populated (not blank, not "[TBD]")
3. If any REQUIRED field is still blank: list them and stop
4. If all REQUIRED fields are complete: generate `CLAUDE.md` at project root using the Appendix template, substituting all `[PLACEHOLDER]` values from `CLIENT_BRIEF.md`
5. Output: "CLAUDE.md generated. Review it, then trigger the build with: 'Execute Section 12 build sequence.'"

---

### 16.3 — CLIENT_BRIEF.md Schema

The agent generates this file as a template at project root during Step 4. The operator fills it in and returns it.

```markdown
# CLIENT_BRIEF.md
## Neovate Project Brief — [Company Name]
STATUS: IN PROGRESS  <!-- Change to COMPLETE when all REQUIRED fields are filled -->

---

## A. Business Identity 🔴 REQUIRED

Company legal name:
Trading name (if different):
Tagline / positioning line:
Industry / niche:
Year founded:
City:
Province:
Postal code:

---

## B. Contact Details 🔴 REQUIRED

Primary phone (client-facing):
Secondary phone (optional):
Primary email (client-facing):
Website (current, if any):
Physical address (full):
Service area (neighbourhoods, radius, or city-wide):

---

## C. Services 🔴 REQUIRED

<!-- List each service the client offers. One per line. -->
<!-- Include: service name | price range | typical timeline -->
<!-- Example: Kitchen Renovations | $45k–$120k | 8–14 weeks -->

Service 1:
Service 2:
Service 3:
Service 4:
Service 5 (if applicable):
Service 6 (if applicable):

Primary service (the one they're best known for):
Services to EXCLUDE from website (out of scope for them):

---

## D. Pages Required 🔴 REQUIRED

<!-- Check all that apply. Add custom pages at the bottom. -->

- [ ] Homepage (/)
- [ ] Services Overview (/services)
- [ ] Portfolio (/portfolio)
- [ ] About Us (/about)
- [ ] FAQ (/faq)
- [ ] Contact (/contact)
- [ ] Privacy Policy (/privacy)
- [ ] Careers (/careers)
- [ ] [Custom page 1]:
- [ ] [Custom page 2]:

Service sub-pages needed (one per service):
- [ ] /services/[slug-1] —
- [ ] /services/[slug-2] —
- [ ] /services/[slug-3] —
- [ ] /services/[slug-4] —

---

## E. Trust & Credibility 🔴 REQUIRED

Google Reviews rating (e.g., 4.9):
Google Reviews count (e.g., 47):
BBB rating (A+, A, not listed):
Licensed in province: YES / NO
Insured (general liability): YES / NO
Years in business:
Number of projects completed (approx):
Notable credentials or certifications:

---

## F. Brand Assets 🟡 RECOMMENDED

Logo file available: YES / NO — file name if yes:
Brand colours (if client has existing brand):
  Primary:
  Secondary:
  Accent:
Use Midnight Luxe design system as-is: YES / NO / MODIFIED
If MODIFIED — describe what changes:

Existing tagline (if any):
Brand voice notes (formal/casual, technical/plain, etc.):

---

## G. Content Assets 🟡 RECOMMENDED

Photography available: YES / NO
  If YES — describe what's available (interior shots, team, process, before/after):
  If NO — Unsplash placeholders will be used with TODO markers

Before/after project photos available: YES / NO — count:
Team headshots available: YES / NO — count:
Video content available: YES / NO — describe:

---

## H. Portfolio Projects 🟡 RECOMMENDED

<!-- List up to 12 projects to feature in the portfolio -->
<!-- Format: Project name | type | neighbourhood | budget range | timeline | 1-line outcome -->

Project 1:
Project 2:
Project 3:
Project 4:
Project 5:
Project 6:

---

## I. Team Members 🟡 RECOMMENDED

<!-- List key team members to feature on the About page -->
<!-- Format: Name | Title | 1-sentence bio highlight -->

Team member 1:
Team member 2:
Team member 3:

---

## J. Testimonials 🟡 RECOMMENDED

<!-- List 3–6 real client testimonials -->
<!-- Format: Quote | Client name (first name + last initial) | Project type | Neighbourhood -->

Testimonial 1:
Testimonial 2:
Testimonial 3:
Testimonial 4:
Testimonial 5:
Testimonial 6:

---

## K. FAQ Content 🟡 RECOMMENDED

<!-- List the top questions this client gets from prospects -->
<!-- The agent will write full answers using these as prompts -->

Top question 1:
Top question 2:
Top question 3:
Top question 4:
Top question 5:
Top question 6:

Key objections the client commonly handles:
What makes them different from competitors:

---

## L. Open Job Positions 🟢 OPTIONAL

<!-- List current openings for the Careers page. Leave blank if no Careers page needed. -->

Position 1:
Position 2:
Position 3:

---

## M. Lead Magnet 🟢 OPTIONAL

Lead magnet offer (e.g., "Free Ottawa Renovation Cost Guide"):
Lead magnet description (1 sentence):
Lead magnet CTA text (e.g., "Send Me the Guide"):
Popup delay preferred: 12 seconds (default) / OTHER:

---

## N. Niche-Specific Requirements 🟡 RECOMMENDED

<!-- Answer what applies to this client's niche -->

Industry niche:
  (renovation / law / medical / real estate / home services / retail / other)

Niche-specific trust signals needed:
  (e.g., bar association for law, board certifications for medical, license numbers for trades)

Niche-specific compliance notes:
  (e.g., HIPAA for medical, legal disclaimers for law firms, PIPEDA specific to their data handling)

Niche-specific content sections needed that are NOT in the standard template:
  (e.g., Case Results for law, Treatment Menu for med spa, Listings Feed for real estate)

Any integrations planned for Phase 2 (CRM, booking, payments, live chat):

---

## O. Competitive Positioning 🟢 OPTIONAL

Top 2–3 competitors (names only — agent will research):
What the client does BETTER than competitors:
Price positioning (premium / mid-market / value):
Target ideal client profile (demographic, budget, geography):

---

## P. Operator Notes 🟢 OPTIONAL

<!-- Anything the agent should know that doesn't fit above -->
<!-- Include PSA scope notes, client personality, build constraints, deadline -->

PSA scope notes:
Build deadline:
Special client requests not in standard template:
Anything to AVOID or NOT include:
```

---

### 16.4 — Niche Adaptation Rules

When `CLIENT_BRIEF.md` Section N identifies a non-renovation niche, the agent must apply the following adaptations during CLAUDE.md generation and build execution:

#### Law Firm
- Replace "Investment" language with "Fees" or "Consultation" language
- Replace CostEstimatorSlider with a "Practice Areas" grid component
- Add: Bar association credentials to TrustBadge strip
- Add: Case result statistics (settled, won, recovered) as stat counters
- Add: Legal disclaimers block to Footer
- FAQ categories: `general | process | fees | expectations`
- Remove: BeforeAfterSlider (not applicable)
- Portfolio → Case Studies (anonymized, outcome-focused)
- CTA: "Book a Free Consultation" (never "Get My Estimate")

#### Medical / Medspa / Wellness
- Replace price language with "starting from" or "consultation required"
- Add: Board certifications and credentials to team cards
- Add: Insurance/payment accepted grid
- Add: Conditions/treatments menu as a filterable service grid
- Add: Before/after image grid (separate from BeforeAfterSlider — static image pairs)
- FAQ categories: `general | treatments | recovery | pricing`
- Compliance note in PrivacyPage: PIPEDA + note that no medical advice is given online
- CTA: "Book Your Consultation" (never "Get a Quote")

#### Real Estate
- Services become Property Types (residential, condo, commercial, investment)
- Portfolio → Listings / Sold Properties (static, no live feed)
- Add: Neighbourhood expertise grid
- Add: Market stats strip (avg days on market, list-to-sale ratio, etc.)
- BeforeAfterSlider: staging before/after use case
- CTA: "Book a Discovery Call" or "Get My Home Valuation"
- FAQ categories: `buying | selling | process | market`

#### Home Services (Plumbing, Electrical, HVAC, Roofing)
- Add: Emergency services CTA (FloatingCTA becomes "Call Now — 24/7 Emergency")
- Add: License number display in Footer and TrustBadge strip
- Add: Service area map with visible radius
- Replace portfolio with Service Gallery (jobs completed photos)
- Add: Manufacturer certifications (e.g., Lennox Premier Dealer)
- FAQ categories: `general | emergency | pricing | maintenance`
- Price language: "service call from $X" + "free estimate"

#### Renovation (Standard — this template's native niche)
- No adaptation needed — use template as-is

#### Other Niches
When a niche is identified that doesn't match the above:
1. Note the niche in `CLAUDE.md` under `## Niche Adaptations`
2. List which standard components need renaming or replacing
3. List any net-new components required (flag for manual build, not from template)
4. Flag to operator: "This niche requires [X] custom components not in the template library. Confirm scope before build launch."

---

### 16.5 — Research Checklist Template

When the agent generates its gap list in Step 3, it must output in this format:

```markdown
## RESEARCH CHECKLIST — [Company Name]
Generated: [date]
Gaps found: [N] REQUIRED | [N] RECOMMENDED | [N] OPTIONAL

---
### 🔴 REQUIRED — Build cannot start without these

Fill in now (you already know these):
- [ ] Confirm legal company name spelling
- [ ] ...

Extract from PSA/proposal:
- [ ] Confirm agreed service lineup (Section C)
- [ ] ...

Get from client (15-min call or email):
- [ ] Google Reviews rating + count (ask them to check Google Business Profile)
- [ ] BBB membership status
- [ ] ...

Research independently (5 minutes each):
- [ ] Search "[Company Name] [City]" on Google — note the displayed review count and rating
- [ ] Check BBB directory at bbb.org/ca
- [ ] Check if they have existing social profiles (LinkedIn, Instagram, Facebook)
- [ ] ...

---
### 🟡 RECOMMENDED — Collect before build for best output

- [ ] Request 3–6 real client testimonials (first name + last initial only)
- [ ] Request team headshots or confirm placeholder photos are OK
- [ ] Request before/after project photos (or confirm Unsplash placeholders)
- [ ] ...

---
### 🟢 OPTIONAL — Nice to have

- [ ] Lead magnet offer details
- [ ] Current open job positions
- [ ] Competitor names for positioning notes
```

---

### 16.6 — Validation Rules

When the operator returns with a completed `CLIENT_BRIEF.md`, the agent checks:

| Check | Rule |
|-------|------|
| STATUS field | Must be `COMPLETE` |
| Company name | Not blank, not `[TBD]` |
| City + Province | Not blank |
| Phone | Valid format (digits only, or formatted with brackets/dashes) |
| Email | Contains `@` and `.` |
| Services | At least 1 service with name + price range + timeline |
| Pages list | At least one page checked |
| Google Reviews | Rating between 1.0–5.0 AND count > 0, OR operator has written "NOT YET LISTED" |
| Licensed | YES or NO (not blank) |
| Insured | YES or NO (not blank) |

If any check fails:

```
INTAKE VALIDATION FAILED
The following REQUIRED fields need attention before the build can proceed:
1. [field name] — [what's wrong]
2. ...
Please update CLIENT_BRIEF.md and return.
```

If all checks pass:

```
INTAKE VALIDATION PASSED ✓
All REQUIRED fields confirmed.
Generating CLAUDE.md...
[output the generated CLAUDE.md content]
CLAUDE.md written to project root.

Next step: Review CLAUDE.md for accuracy, then say:
"Execute Section 12 build sequence."
```

---

*Template compiled from the Green Light Construction website build — Ottawa, ON — 2026-03-03*
*Tech: React 18 + Vite + Tailwind CSS 3.4.17 + GSAP 3 + Lenis + React Router v6*
*Verified build: zero errors, 13 routes passing, npm run build clean*
