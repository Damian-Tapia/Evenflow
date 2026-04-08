# Atomic Design Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the Evenflow codebase into a full 5-level atomic design structure (`atoms / molecules / organisms / templates / pages`) under `src/`, migrating all existing Login/Auth screen code into properly scoped components.

**Architecture:** Move `app/` to `src/app/`, create `src/components/` with four atomic layers. Extract every UI unit from `LoginForm.tsx` and `auth/page.tsx` into its correct atomic level. The final `src/app/auth/page.tsx` becomes a thin composition of `AuthLayout` + `BrandingPanel` + `LoginForm`. The import convention rule (atoms can't import molecules, etc.) is documented but not yet enforced by linting.

**Tech Stack:** Next.js 16.2.2 (App Router), React 19, TypeScript, Tailwind CSS v4

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `tsconfig.json` | Modify | Update `@/*` path alias from `./*` to `./src/*` |
| `app/` (entire dir) | Move → `src/app/` | Next.js App Router root |
| `src/components/atoms/Button/index.tsx` | Create | Dark fill button, variants via className, disabled state |
| `src/components/atoms/InputField/index.tsx` | Create | Icon + input, error ring, aria attributes |
| `src/components/atoms/Divider/index.tsx` | Create | Centered label between two horizontal lines |
| `src/components/atoms/TextLink/index.tsx` | Create | Blue underlined anchor |
| `src/components/molecules/FormField/index.tsx` | Create | Label + InputField slot + error message |
| `src/components/molecules/SocialButton/index.tsx` | Create | Logo image + Button |
| `src/components/organisms/BrandingPanel/index.tsx` | Create | EVENFLOW logo + tagline + gradient bg |
| `src/components/organisms/LoginForm/index.tsx` | Create | Form state + validation + composed from atoms/molecules |
| `src/components/templates/AuthLayout/index.tsx` | Create | Two-panel layout shell |
| `src/app/auth/page.tsx` | Modify | Thin composition: AuthLayout + BrandingPanel + LoginForm |
| `src/app/auth/LoginForm.tsx` | Delete | Logic moved to organism |

---

## Task 1: Migrate app/ to src/app/ and Update tsconfig

**Files:**
- Move: `app/` → `src/app/`
- Modify: `tsconfig.json`

- [ ] **Step 1: Create src/ and move app/**

```bash
cd /home/damian_tapia/side_projects/evenflow-app
mkdir -p src
cp -r app src/app
```

- [ ] **Step 2: Verify src/app/ contents match app/**

```bash
diff -r app src/app
```

Expected: no output (directories are identical).

- [ ] **Step 3: Update tsconfig.json path alias**

Open `tsconfig.json`. Change the `paths` block from:

```json
"paths": {
  "@/*": ["./*"]
}
```

to:

```json
"paths": {
  "@/*": ["./src/*"]
}
```

- [ ] **Step 4: Remove original app/ directory**

```bash
rm -rf app
```

> ⚠️ Next.js ignores `src/app` when `app/` exists at the root. The root `app/` must be deleted for `src/app/` to take effect.

- [ ] **Step 5: Run build**

```bash
cd /home/damian_tapia/side_projects/evenflow-app && npm run build 2>&1 | tail -15
```

Expected:
```
Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /auth
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: migrate app/ to src/app/ and update tsconfig paths"
```

---

## Task 2: Atom — Button

**Files:**
- Create: `src/components/atoms/Button/index.tsx`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /home/damian_tapia/side_projects/evenflow-app/src/components/atoms/Button
```

Create `src/components/atoms/Button/index.tsx`:

```tsx
interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  type = "button",
  disabled,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full bg-[#0a0e27] text-white font-semibold text-2xl py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${className ?? ""}`.trim()}
      style={{ letterSpacing: "-0.48px" }}
    >
      {children}
    </button>
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
git add src/components/atoms/Button/index.tsx
git commit -m "feat: add Button atom"
```

---

## Task 3: Atom — InputField

**Files:**
- Create: `src/components/atoms/InputField/index.tsx`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /home/damian_tapia/side_projects/evenflow-app/src/components/atoms/InputField
```

Create `src/components/atoms/InputField/index.tsx`:

```tsx
interface InputFieldProps {
  id: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon: string;
  hasError?: boolean;
  ariaDescribedBy?: string;
}

export function InputField({
  id,
  type,
  value,
  onChange,
  placeholder,
  icon,
  hasError,
  ariaDescribedBy,
}: InputFieldProps) {
  return (
    <div
      className={`bg-white flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg ${
        hasError ? "ring-2 ring-red-500" : ""
      }`}
    >
      <img src={icon} alt="" className="w-6 h-6 shrink-0" />
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError ?? false}
        className="flex-1 bg-transparent outline-none text-[#7d7d7d] font-normal text-xl placeholder:text-[#7d7d7d]"
        style={{ letterSpacing: "-0.4px" }}
      />
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
git add src/components/atoms/InputField/index.tsx
git commit -m "feat: add InputField atom"
```

---

## Task 4: Atom — Divider

**Files:**
- Create: `src/components/atoms/Divider/index.tsx`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /home/damian_tapia/side_projects/evenflow-app/src/components/atoms/Divider
```

Create `src/components/atoms/Divider/index.tsx`:

```tsx
interface DividerProps {
  label: string;
}

export function Divider({ label }: DividerProps) {
  return (
    <div className="flex items-center gap-4">
      <hr className="flex-1 border-[#7d7d7d]" />
      <span
        className="text-[#7d7d7d] font-semibold text-2xl"
        style={{ letterSpacing: "-0.48px" }}
      >
        {label}
      </span>
      <hr className="flex-1 border-[#7d7d7d]" />
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
git add src/components/atoms/Divider/index.tsx
git commit -m "feat: add Divider atom"
```

---

## Task 5: Atom — TextLink

**Files:**
- Create: `src/components/atoms/TextLink/index.tsx`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /home/damian_tapia/side_projects/evenflow-app/src/components/atoms/TextLink
```

Create `src/components/atoms/TextLink/index.tsx`:

```tsx
interface TextLinkProps {
  href: string;
  children: React.ReactNode;
}

export function TextLink({ href, children }: TextLinkProps) {
  return (
    <a
      href={href}
      className="font-semibold text-[#5c8fff] underline"
      style={{ letterSpacing: "-0.32px" }}
    >
      {children}
    </a>
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
git add src/components/atoms/TextLink/index.tsx
git commit -m "feat: add TextLink atom"
```

---

## Task 6: Molecule — FormField

**Files:**
- Create: `src/components/molecules/FormField/index.tsx`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /home/damian_tapia/side_projects/evenflow-app/src/components/molecules/FormField
```

Create `src/components/molecules/FormField/index.tsx`:

```tsx
interface FormFieldProps {
  label: string;
  inputId: string;
  error?: string | null;
  children: React.ReactNode;
}

export function FormField({ label, inputId, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className="text-black font-normal text-xl"
        style={{ letterSpacing: "-0.4px" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${inputId}-error`} className="text-red-500 text-sm">
          {error}
        </p>
      )}
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
git add src/components/molecules/FormField/index.tsx
git commit -m "feat: add FormField molecule"
```

---

## Task 7: Molecule — SocialButton

**Files:**
- Create: `src/components/molecules/SocialButton/index.tsx`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /home/damian_tapia/side_projects/evenflow-app/src/components/molecules/SocialButton
```

Create `src/components/molecules/SocialButton/index.tsx`:

```tsx
import { Button } from "@/components/atoms/Button";

interface SocialButtonProps {
  logo: string;
  logoAlt: string;
  label: string;
  onClick?: () => void;
}

export function SocialButton({ logo, logoAlt, label, onClick }: SocialButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2.5"
    >
      <img src={logo} alt={logoAlt} className="h-8 w-8" />
      {label}
    </Button>
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
git add src/components/molecules/SocialButton/index.tsx
git commit -m "feat: add SocialButton molecule"
```

---

## Task 8: Organism — BrandingPanel

**Files:**
- Create: `src/components/organisms/BrandingPanel/index.tsx`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /home/damian_tapia/side_projects/evenflow-app/src/components/organisms/BrandingPanel
```

Create `src/components/organisms/BrandingPanel/index.tsx`:

```tsx
export function BrandingPanel() {
  return (
    <section
      className="hidden md:flex flex-col justify-center items-start px-8 py-10 lg:w-1/2 lg:min-h-screen min-h-40"
      style={{
        background: "linear-gradient(135deg, #0a0e27 0%, #24338d 100%)",
      }}
    >
      <div className="flex flex-col gap-4">
        <h1
          className="text-white font-extrabold text-4xl lg:text-[64px] lg:leading-none"
          style={{ letterSpacing: "-1.28px" }}
        >
          EVENFLOW
        </h1>
        <p
          className="hidden lg:block text-[#d3d3d3] font-normal text-2xl leading-relaxed"
          style={{ letterSpacing: "-0.48px" }}
        >
          Descrubre eventos, compra tus boletos, crea experiencias
        </p>
      </div>
    </section>
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
git add src/components/organisms/BrandingPanel/index.tsx
git commit -m "feat: add BrandingPanel organism"
```

---

## Task 9: Organism — LoginForm

**Files:**
- Create: `src/components/organisms/LoginForm/index.tsx`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /home/damian_tapia/side_projects/evenflow-app/src/components/organisms/LoginForm
```

Create `src/components/organisms/LoginForm/index.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { InputField } from "@/components/atoms/InputField";
import { TextLink } from "@/components/atoms/TextLink";
import { FormField } from "@/components/molecules/FormField";
import { SocialButton } from "@/components/molecules/SocialButton";

const MAIL_ICON =
  "https://www.figma.com/api/mcp/asset/a645cf39-489e-4d70-804d-f093794dc14b";
const LOCK_ICON =
  "https://www.figma.com/api/mcp/asset/632e64f9-758a-4903-a0e0-3ebe735132c9";
const GOOGLE_LOGO =
  "https://www.figma.com/api/mcp/asset/e7af6129-ecae-4d78-a1c2-d334b43970d7";

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

export function LoginForm() {
  const [values, setValues] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({
    emailError: null,
    passwordError: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field === "email") {
      setErrors((prev) => ({ ...prev, emailError: null }));
    } else {
      setErrors((prev) => ({ ...prev, passwordError: null }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (validationErrors.emailError || validationErrors.passwordError) return;
    setIsSubmitting(true);
    // Auth integration goes here
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full" noValidate>
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

      <FormField label="Email" inputId="email" error={errors.emailError}>
        <InputField
          id="email"
          type="email"
          value={values.email}
          onChange={(v) => handleChange("email", v)}
          placeholder="example@mailing.com"
          icon={MAIL_ICON}
          hasError={!!errors.emailError}
          ariaDescribedBy={errors.emailError ? "email-error" : undefined}
        />
      </FormField>

      <FormField label="Contraseña" inputId="password" error={errors.passwordError}>
        <InputField
          id="password"
          type="password"
          value={values.password}
          onChange={(v) => handleChange("password", v)}
          placeholder="*************"
          icon={LOCK_ICON}
          hasError={!!errors.passwordError}
          ariaDescribedBy={errors.passwordError ? "password-error" : undefined}
        />
      </FormField>

      <Button type="submit" disabled={isSubmitting}>
        Iniciar sesión
      </Button>

      <Divider label="O" />

      <SocialButton
        logo={GOOGLE_LOGO}
        logoAlt="Google"
        label="Google"
        onClick={() => console.log("Google auth not implemented")}
      />

      <p className="text-center text-black text-base">
        <span className="font-normal">No tienes cuenta? </span>
        <TextLink href="#">Registrate</TextLink>
      </p>
    </form>
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
git add src/components/organisms/LoginForm/index.tsx
git commit -m "feat: add LoginForm organism"
```

---

## Task 10: Template — AuthLayout

**Files:**
- Create: `src/components/templates/AuthLayout/index.tsx`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /home/damian_tapia/side_projects/evenflow-app/src/components/templates/AuthLayout
```

Create `src/components/templates/AuthLayout/index.tsx`:

```tsx
interface AuthLayoutProps {
  brandingPanel: React.ReactNode;
  children: React.ReactNode;
}

export function AuthLayout({ brandingPanel, children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {brandingPanel}
      <section className="flex flex-col justify-center items-center px-8 py-10 lg:p-16 lg:w-1/2 bg-[#efefef] h-screen">
        <div className="w-full max-w-[592px]">{children}</div>
      </section>
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
git add src/components/templates/AuthLayout/index.tsx
git commit -m "feat: add AuthLayout template"
```

---

## Task 11: Wire Up auth/page.tsx and Remove Old LoginForm.tsx

**Files:**
- Modify: `src/app/auth/page.tsx`
- Delete: `src/app/auth/LoginForm.tsx`

- [ ] **Step 1: Replace src/app/auth/page.tsx**

```tsx
import { AuthLayout } from "@/components/templates/AuthLayout";
import { BrandingPanel } from "@/components/organisms/BrandingPanel";
import { LoginForm } from "@/components/organisms/LoginForm";

export default function AuthPage() {
  return (
    <AuthLayout brandingPanel={<BrandingPanel />}>
      <LoginForm />
    </AuthLayout>
  );
}
```

- [ ] **Step 2: Delete the old LoginForm.tsx**

```bash
rm /home/damian_tapia/side_projects/evenflow-app/src/app/auth/LoginForm.tsx
```

- [ ] **Step 3: Run build**

```bash
cd /home/damian_tapia/side_projects/evenflow-app && npm run build 2>&1 | tail -15
```

Expected:
```
Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /auth
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: wire auth page with atomic components, remove old LoginForm"
```
