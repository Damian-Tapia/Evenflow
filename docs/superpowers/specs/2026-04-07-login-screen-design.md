# Login/Auth Screen — Design Spec

**Date:** 2026-04-07
**Figma:** [node 187:559](https://www.figma.com/design/B09iZhrWSrmeqD50ohqVbw/Evenflow?node-id=187-559)
**Branch:** develop

---

## Overview

Implement the Login/Auth screen for Evenflow — an event discovery app. The screen is a two-panel desktop layout that collapses to a stacked single-column layout on mobile. It lives at `/auth` and the current homepage (`/`) redirects to it. The form has client-side validation only; no auth backend is wired up at this stage.

---

## File Structure

```
app/
├── layout.tsx          — update: add Syne font, update page metadata
├── globals.css         — update: add design tokens as CSS custom properties
├── page.tsx            — update: redirect() to /auth
└── auth/
    ├── page.tsx        — Server Component: two-panel layout shell + branding panel
    └── LoginForm.tsx   — Client Component ("use client"): form state + validation
```

---

## Routing

- `/` → `redirect('/auth')` via Next.js `redirect()` in `app/page.tsx`
- `/auth` → Login screen (`app/auth/page.tsx`)

---

## Typography

Font: **Syne** (loaded via `next/font/google`)

| Weight | Variable | Usage |
|--------|----------|-------|
| 800 (ExtraBold) | — | EVENFLOW logo |
| 600 (SemiBold) | — | "Welcome!", buttons, "O" divider, "Registrate" link |
| 400 (Regular) | — | Tagline, subtitle, field labels, placeholders |

Add Syne to `layout.tsx` and expose it as a CSS variable (e.g. `--font-syne`). Apply via `globals.css` body rule.

---

## Design Tokens

Added to `globals.css` as CSS custom properties:

```css
--ink-black: #0a0e27;
--mid-gray:  #7d7d7d;
--light-gray: #d3d3d3;
--input-gray: #efefef;
--link-blue: #5c8fff;
```

---

## Layout

### Desktop (≥ 1024px)
- Two equal columns side-by-side, full viewport height (`min-h-screen`)
- Left: Branding panel
- Right: Form panel

### Mobile (< 1024px)
- Single column, stacked vertically
- Branding panel becomes a compact top strip (~160px tall)
- Logo scales down (~36px), tagline hidden
- Form panel fills remaining height

---

## Branding Panel (`app/auth/page.tsx`)

- **Background:** linear gradient `135deg, #0a0e27 → #24338d`
- **Logo:** "EVENFLOW" — Syne ExtraBold, 64px desktop / 36px mobile, white, tracking-tight
- **Tagline:** "Descrubre eventos, compra tus boletos, crea experiencias" — Syne Regular, 24px, `#d3d3d3`, hidden on mobile
- **Padding:** 32px horizontal, centered vertically on desktop; centered content on mobile strip

---

## Form Panel (`app/auth/LoginForm.tsx` — `"use client"`)

- **Background:** `#efefef`
- **Padding:** 64px desktop / 32px mobile
- **Max width of form content:** ~592px, centered

### Content (top to bottom)

1. **Heading:** "Welcome!" — Syne SemiBold, 40px, black, centered
2. **Subtitle:** "Inicia sesion para acceder a tus boletos o eventos guardados" — Syne Regular, 24px, `#7d7d7d`, centered
3. **Email field**
   - Label: "Email" — Syne Regular, 20px, black
   - Input: white bg, rounded-lg, 10px padding, mail icon (SVG) on left, placeholder `example@mailing.com`
   - Error: inline below input, `text-red-500`, small
4. **Password field**
   - Label: "Contraseña" — Syne Regular, 20px, black
   - Input: white bg, rounded-lg, 10px padding, lock icon (SVG) on left, placeholder `*************`
   - Error: inline below input, `text-red-500`, small
5. **"Iniciar sesión" button** — full width, ink-black bg, white Syne SemiBold 24px, rounded-lg
6. **"O" divider** — two `<hr>` lines flanking "O" in mid-gray, Syne SemiBold 24px
7. **"Google" button** — full width, ink-black bg, Google logo image + "Google" in white Syne SemiBold 24px, rounded-lg
8. **Register link** — "No tienes cuenta?" (Regular) + " Registrate" (SemiBold, `#5c8fff`, underlined) — `<a href="#">` for now

### Icons
- Mail icon and lock icon: rendered as `<img>` tags using Figma asset URLs (valid for 7 days). In a follow-up, replace with inline SVGs or an icon library.
- Google logo: rendered as `<img>` tag using Figma asset URL.

---

## Validation Logic

Runs on form submit. Field errors clear when the user edits the field.

| Field | Rule | Error message |
|-------|------|---------------|
| Email | Required | `"El email es requerido"` |
| Email | Matches `/.+@.+\..+/` | `"Ingresa un email válido"` |
| Password | Required | `"La contraseña es requerida"` |
| Password | Min 6 characters | `"Mínimo 6 caracteres"` |

**Form state:**
```ts
{ email: string; password: string }
{ emailError: string | null; passwordError: string | null }
{ isSubmitting: boolean }
```

---

## Behavior Notes

- **Google button:** renders visually; `onClick` logs `"Google auth not implemented"` to console.
- **"Registrate" link:** `<a href="#">` — no `/register` route exists yet.
- **Submit:** on valid form, `isSubmitting` is set to `true` and button shows disabled state. No API call is made.

---

## Out of Scope

- Auth backend / API integration
- Registration screen
- Password visibility toggle
- "Forgot password" flow
- Dark mode
