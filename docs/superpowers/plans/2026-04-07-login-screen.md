# Login Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Evenflow Login/Auth screen at `/auth` with a two-panel responsive layout and client-side form validation, matching the Figma design at node 187:559.

**Architecture:** A Server Component (`app/auth/page.tsx`) renders the two-panel shell and the static branding panel. A Client Component (`app/auth/LoginForm.tsx`) owns all interactive form state and validation. The homepage (`/`) redirects to `/auth`. The Syne font is loaded globally via `next/font/google` and exposed as a CSS variable.

**Tech Stack:** Next.js 16.2.2 (App Router), React 19, TypeScript, Tailwind CSS v4, `next/font/google`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `app/layout.tsx` | Modify | Add Syne font, expose `--font-syne` CSS var, update metadata |
| `app/globals.css` | Modify | Add design tokens (CSS vars), set font-family via `@theme` |
| `app/page.tsx` | Modify | Redirect `/` → `/auth` |
| `app/auth/page.tsx` | Create | Server Component — two-panel layout shell + branding panel |
| `app/auth/LoginForm.tsx` | Create | Client Component — form UI, state, and validation |

---

## Task 1: Add Syne Font to Root Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace font imports with Syne**

Open `app/layout.tsx`. Replace the Geist imports and font setup with Syne:

```tsx
import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Evenflow",
  description: "Descrubre eventos, compra tus boletos, crea experiencias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${syne.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Run build to verify no TypeScript errors**

```bash
cd /home/damian_tapia/side_projects/evenflow-app && npm run build 2>&1 | tail -20
```

Expected: build succeeds (exit 0). If it fails with "Module not found: Can't resolve 'next/font/google'", verify Next.js version with `cat package.json | grep next`.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add Syne font and update layout metadata"
```

---

## Task 2: Add Design Tokens to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css content**

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
  --ink-black: #0a0e27;
  --mid-gray: #7d7d7d;
  --light-gray: #d3d3d3;
  --input-gray: #efefef;
  --link-blue: #5c8fff;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-syne);
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

- [ ] **Step 2: Run build to confirm no CSS errors**

```bash
cd /home/damian_tapia/side_projects/evenflow-app && npm run build 2>&1 | tail -10
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add design tokens and Syne font-family to globals"
```

---

## Task 3: Redirect Homepage to /auth

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace page.tsx with redirect**

```tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth");
}
```

- [ ] **Step 2: Run build**

```bash
cd /home/damian_tapia/side_projects/evenflow-app && npm run build 2>&1 | tail -10
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: redirect / to /auth"
```

---

## Task 4: Create Auth Page — Two-Panel Shell + Branding Panel

**Files:**
- Create: `app/auth/page.tsx`
- Create: `app/auth/LoginForm.tsx` (stub — filled in Task 5)

- [ ] **Step 1: Create stub LoginForm so the auth page compiles**

Create `app/auth/LoginForm.tsx`:

```tsx
"use client";

export default function LoginForm() {
  return <div>Form coming soon</div>;
}
```

- [ ] **Step 2: Create app/auth/page.tsx**

```tsx
import LoginForm from "./LoginForm";

export default function AuthPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Branding panel */}
      <section
        className="
          flex flex-col justify-center items-start
          px-8 py-10
          lg:w-1/2 lg:min-h-screen
          min-h-[160px]
        "
        style={{
          background: "linear-gradient(135deg, #0a0e27 0%, #24338d 100%)",
        }}
      >
        <div className="flex flex-col gap-4">
          <h1
            className="
              text-white font-extrabold tracking-tight
              text-4xl lg:text-[64px] lg:leading-[1]
            "
            style={{ letterSpacing: "-1.28px" }}
          >
            EVENFLOW
          </h1>
          <p
            className="
              hidden lg:block
              text-[#d3d3d3] font-normal
              text-2xl leading-relaxed
            "
            style={{ letterSpacing: "-0.48px" }}
          >
            Descrubre eventos, compra tus boletos, crea experiencias
          </p>
        </div>
      </section>

      {/* Form panel */}
      <section
        className="
          flex flex-col justify-center items-center
          px-8 py-10 lg:p-16
          lg:w-1/2
          bg-[#efefef]
        "
      >
        <div className="w-full max-w-[592px]">
          <LoginForm />
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Run build**

```bash
cd /home/damian_tapia/side_projects/evenflow-app && npm run build 2>&1 | tail -10
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/auth/page.tsx app/auth/LoginForm.tsx
git commit -m "feat: add auth route with two-panel layout and branding panel"
```

---

## Task 5: Implement LoginForm UI

**Files:**
- Modify: `app/auth/LoginForm.tsx`

The Figma asset URLs below are temporary (valid ~7 days from 2026-04-07). Replace with inline SVGs in a follow-up.

- [ ] **Step 1: Replace stub with full form UI (no validation yet)**

```tsx
"use client";

const MAIL_ICON = "https://www.figma.com/api/mcp/asset/a645cf39-489e-4d70-804d-f093794dc14b";
const LOCK_ICON = "https://www.figma.com/api/mcp/asset/632e64f9-758a-4903-a0e0-3ebe735132c9";
const GOOGLE_LOGO = "https://www.figma.com/api/mcp/asset/e7af6129-ecae-4d78-a1c2-d334b43970d7";

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Heading */}
      <div className="flex flex-col gap-2 text-center">
        <h2
          className="text-black font-semibold text-[40px] leading-[1.2]"
          style={{ letterSpacing: "-0.8px" }}
        >
          Welcome!
        </h2>
        <p
          className="text-[#7d7d7d] font-normal text-2xl leading-relaxed"
          style={{ letterSpacing: "-0.48px" }}
        >
          Inicia sesion para acceder a tus boletos o eventos guardados
        </p>
      </div>

      {/* Email field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-black font-normal text-xl"
          style={{ letterSpacing: "-0.4px" }}
        >
          Email
        </label>
        <div className="bg-white flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg">
          <img src={MAIL_ICON} alt="" className="w-6 h-6 shrink-0" />
          <input
            id="email"
            type="email"
            placeholder="example@mailing.com"
            className="
              flex-1 bg-transparent outline-none
              text-[#7d7d7d] font-normal text-xl
              placeholder:text-[#7d7d7d]
            "
            style={{ letterSpacing: "-0.4px" }}
          />
        </div>
      </div>

      {/* Password field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-black font-normal text-xl"
          style={{ letterSpacing: "-0.4px" }}
        >
          Contraseña
        </label>
        <div className="bg-white flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg">
          <img src={LOCK_ICON} alt="" className="w-6 h-6 shrink-0" />
          <input
            id="password"
            type="password"
            placeholder="*************"
            className="
              flex-1 bg-transparent outline-none
              text-[#7d7d7d] font-normal text-xl
              placeholder:text-[#7d7d7d]
            "
            style={{ letterSpacing: "-0.4px" }}
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="button"
        className="
          w-full bg-[#0a0e27] text-white font-semibold text-2xl
          py-2 rounded-lg
          hover:opacity-90 transition-opacity
        "
        style={{ letterSpacing: "-0.48px" }}
      >
        Iniciar sesión
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-[#7d7d7d]" />
        <span
          className="text-[#7d7d7d] font-semibold text-2xl"
          style={{ letterSpacing: "-0.48px" }}
        >
          O
        </span>
        <hr className="flex-1 border-[#7d7d7d]" />
      </div>

      {/* Google button */}
      <button
        type="button"
        className="
          w-full bg-[#0a0e27] text-white font-semibold text-2xl
          py-2 rounded-lg flex items-center justify-center gap-2.5
          hover:opacity-90 transition-opacity
        "
        style={{ letterSpacing: "-0.48px" }}
        onClick={() => console.log("Google auth not implemented")}
      >
        <img src={GOOGLE_LOGO} alt="Google" className="h-8 w-8" />
        Google
      </button>

      {/* Register link */}
      <p className="text-center text-black text-base">
        <span className="font-normal">No tienes cuenta? </span>
        <a
          href="#"
          className="font-semibold text-[#5c8fff] underline"
          style={{ letterSpacing: "-0.32px" }}
        >
          Registrate
        </a>
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Run build**

```bash
cd /home/damian_tapia/side_projects/evenflow-app && npm run build 2>&1 | tail -10
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/auth/LoginForm.tsx
git commit -m "feat: implement login form UI"
```

---

## Task 6: Add Form Validation

**Files:**
- Modify: `app/auth/LoginForm.tsx`

- [ ] **Step 1: Add form state and validation to LoginForm**

Replace the entire file content with the validated version:

```tsx
"use client";

import { useState } from "react";

const MAIL_ICON = "https://www.figma.com/api/mcp/asset/a645cf39-489e-4d70-804d-f093794dc14b";
const LOCK_ICON = "https://www.figma.com/api/mcp/asset/632e64f9-758a-4903-a0e0-3ebe735132c9";
const GOOGLE_LOGO = "https://www.figma.com/api/mcp/asset/e7af6129-ecae-4d78-a1c2-d334b43970d7";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  emailError: string | null;
  passwordError: string | null;
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = { emailError: null, passwordError: null };

  if (!values.email.trim()) {
    errors.emailError = "El email es requerido";
  } else if (!/.+@.+\..+/.test(values.email)) {
    errors.emailError = "Ingresa un email válido";
  }

  if (!values.password) {
    errors.passwordError = "La contraseña es requerida";
  } else if (values.password.length < 6) {
    errors.passwordError = "Mínimo 6 caracteres";
  }

  return errors;
}

export default function LoginForm() {
  const [values, setValues] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({ emailError: null, passwordError: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field === "email") {
      setErrors((prev) => ({ ...prev, emailError: null }));
    } else {
      setErrors((prev) => ({ ...prev, passwordError: null }));
    }
  }

  function handleSubmit() {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (validationErrors.emailError || validationErrors.passwordError) {
      return;
    }

    setIsSubmitting(true);
    // Auth integration goes here
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Heading */}
      <div className="flex flex-col gap-2 text-center">
        <h2
          className="text-black font-semibold text-[40px] leading-[1.2]"
          style={{ letterSpacing: "-0.8px" }}
        >
          Welcome!
        </h2>
        <p
          className="text-[#7d7d7d] font-normal text-2xl leading-relaxed"
          style={{ letterSpacing: "-0.48px" }}
        >
          Inicia sesion para acceder a tus boletos o eventos guardados
        </p>
      </div>

      {/* Email field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-black font-normal text-xl"
          style={{ letterSpacing: "-0.4px" }}
        >
          Email
        </label>
        <div
          className={`bg-white flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg ${
            errors.emailError ? "ring-2 ring-red-500" : ""
          }`}
        >
          <img src={MAIL_ICON} alt="" className="w-6 h-6 shrink-0" />
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="example@mailing.com"
            className="
              flex-1 bg-transparent outline-none
              text-[#7d7d7d] font-normal text-xl
              placeholder:text-[#7d7d7d]
            "
            style={{ letterSpacing: "-0.4px" }}
          />
        </div>
        {errors.emailError && (
          <p className="text-red-500 text-sm">{errors.emailError}</p>
        )}
      </div>

      {/* Password field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-black font-normal text-xl"
          style={{ letterSpacing: "-0.4px" }}
        >
          Contraseña
        </label>
        <div
          className={`bg-white flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg ${
            errors.passwordError ? "ring-2 ring-red-500" : ""
          }`}
        >
          <img src={LOCK_ICON} alt="" className="w-6 h-6 shrink-0" />
          <input
            id="password"
            type="password"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="*************"
            className="
              flex-1 bg-transparent outline-none
              text-[#7d7d7d] font-normal text-xl
              placeholder:text-[#7d7d7d]
            "
            style={{ letterSpacing: "-0.4px" }}
          />
        </div>
        {errors.passwordError && (
          <p className="text-red-500 text-sm">{errors.passwordError}</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="
          w-full bg-[#0a0e27] text-white font-semibold text-2xl
          py-2 rounded-lg
          hover:opacity-90 transition-opacity
          disabled:opacity-50 disabled:cursor-not-allowed
        "
        style={{ letterSpacing: "-0.48px" }}
      >
        Iniciar sesión
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-[#7d7d7d]" />
        <span
          className="text-[#7d7d7d] font-semibold text-2xl"
          style={{ letterSpacing: "-0.48px" }}
        >
          O
        </span>
        <hr className="flex-1 border-[#7d7d7d]" />
      </div>

      {/* Google button */}
      <button
        type="button"
        className="
          w-full bg-[#0a0e27] text-white font-semibold text-2xl
          py-2 rounded-lg flex items-center justify-center gap-2.5
          hover:opacity-90 transition-opacity
        "
        style={{ letterSpacing: "-0.48px" }}
        onClick={() => console.log("Google auth not implemented")}
      >
        <img src={GOOGLE_LOGO} alt="Google" className="h-8 w-8" />
        Google
      </button>

      {/* Register link */}
      <p className="text-center text-black text-base">
        <span className="font-normal">No tienes cuenta? </span>
        <a
          href="#"
          className="font-semibold text-[#5c8fff] underline"
          style={{ letterSpacing: "-0.32px" }}
        >
          Registrate
        </a>
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Run build**

```bash
cd /home/damian_tapia/side_projects/evenflow-app && npm run build 2>&1 | tail -10
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 3: Verify validation scenarios mentally**

Check the validate function covers all rules from the spec:
- Empty email → `"El email es requerido"` ✓
- Invalid format email → `"Ingresa un email válido"` ✓
- Empty password → `"La contraseña es requerida"` ✓
- Password < 6 chars → `"Mínimo 6 caracteres"` ✓
- On field change, that field's error clears ✓

- [ ] **Step 4: Commit**

```bash
git add app/auth/LoginForm.tsx
git commit -m "feat: add client-side form validation to login form"
```

---

## Task 7: Final Verification

- [ ] **Step 1: Run final build**

```bash
cd /home/damian_tapia/side_projects/evenflow-app && npm run build 2>&1
```

Expected: exits 0, no TypeScript or lint errors.

- [ ] **Step 2: Start dev server and manually verify**

```bash
cd /home/damian_tapia/side_projects/evenflow-app && npm run dev
```

Check the following:
- `http://localhost:3000` redirects to `http://localhost:3000/auth`
- Desktop (≥1024px): two columns side by side — gradient left panel + gray right panel
- Mobile (<1024px): branding strip on top, form below
- Syne font applied throughout
- Empty submit shows both error messages in red
- Invalid email format (`test@`) shows "Ingresa un email válido"
- Password with 3 chars shows "Mínimo 6 caracteres"
- Typing in a field clears its error
- "Iniciar sesión" button disables on valid submit

- [ ] **Step 3: Final commit (if any tweaks were needed)**

```bash
git add -p
git commit -m "fix: login screen visual tweaks"
```
