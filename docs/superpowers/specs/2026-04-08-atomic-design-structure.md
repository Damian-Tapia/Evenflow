# Atomic Design Structure — Design Spec

**Date:** 2026-04-08
**Branch:** develop

---

## Overview

Reorganize the Evenflow codebase to follow Brad Frost's full 5-level atomic design pattern. Move `app/` to `src/app/`, create `src/components/` with `atoms / molecules / organisms / templates` layers, and migrate the existing Login/Auth screen components into their correct levels. This structure becomes the enforced convention for all future UI work.

---

## Directory Structure

```
src/
├── app/                          (moved from app/)
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   └── auth/
│       └── page.tsx
└── components/
    ├── atoms/
    │   ├── Button/
    │   │   └── index.tsx
    │   ├── InputField/
    │   │   └── index.tsx
    │   ├── Divider/
    │   │   └── index.tsx
    │   └── TextLink/
    │       └── index.tsx
    ├── molecules/
    │   ├── FormField/
    │   │   └── index.tsx
    │   └── SocialButton/
    │       └── index.tsx
    ├── organisms/
    │   ├── LoginForm/
    │   │   └── index.tsx
    │   └── BrandingPanel/
    │       └── index.tsx
    └── templates/
        └── AuthLayout/
            └── index.tsx
```

---

## Migration Steps

1. Move `app/` → `src/app/` (Next.js auto-detects `src/` — no config change needed)
2. Delete `app/auth/LoginForm.tsx` (split into atoms/molecules/organisms)
3. Create all component files under `src/components/`
4. Update `app/auth/page.tsx` (now `src/app/auth/page.tsx`) to use atomic components
5. Add `@/*` path alias to `tsconfig.json` pointing to `./src/*`
6. Verify build passes

---

## Path Alias

Add to `tsconfig.json` `compilerOptions.paths`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Component Interfaces

### Atoms

#### `Button` (`src/components/atoms/Button/index.tsx`)

```ts
interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}
```

- Dark fill (`bg-[#0a0e27]`), white text, full-width, rounded-lg
- `disabled` → `opacity-50 cursor-not-allowed`
- `hover:opacity-90 transition-opacity`
- Syne SemiBold 24px, letterSpacing -0.48px
- `className` prop allows callers to add `flex items-center justify-center gap-2.5` for icon+text layout

#### `InputField` (`src/components/atoms/InputField/index.tsx`)

```ts
interface InputFieldProps {
  id: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon: string;           // img src — decorative, alt=""
  hasError?: boolean;     // true → ring-2 ring-red-500 on wrapper
  ariaDescribedBy?: string;
}
```

- White bg wrapper, rounded-lg, padding 10px, flex row
- Icon: 24×24px, shrink-0
- Input: flex-1, transparent bg, no outline, Syne Regular 20px, mid-gray text + placeholder

#### `Divider` (`src/components/atoms/Divider/index.tsx`)

```ts
interface DividerProps {
  label: string;   // e.g. "O"
}
```

- Two `<hr>` lines (flex-1, border mid-gray) flanking centered label text
- Syne SemiBold 24px, mid-gray

#### `TextLink` (`src/components/atoms/TextLink/index.tsx`)

```ts
interface TextLinkProps {
  href: string;
  children: React.ReactNode;
}
```

- `text-[#5c8fff] font-semibold underline`, letterSpacing -0.32px

---

### Molecules

#### `FormField` (`src/components/molecules/FormField/index.tsx`)

```ts
interface FormFieldProps {
  label: string;
  error?: string | null;
  children: React.ReactElement<InputFieldProps>;
}
```

- Renders label (Syne Regular 20px, black) above the child `InputField`
- When `error` is non-null: renders `<p id="{inputId}-error" className="text-red-500 text-sm">`
- The `id` for the error element is derived from the child input's `id` prop: `${child.props.id}-error`

#### `SocialButton` (`src/components/molecules/SocialButton/index.tsx`)

```ts
interface SocialButtonProps {
  logo: string;       // img src
  logoAlt: string;    // e.g. "Google"
  label: string;      // e.g. "Google"
  onClick?: () => void;
}
```

- Wraps `Button` with `className="flex items-center justify-center gap-2.5"`
- Logo: `h-8 w-8` img
- Uses `type="button"`

---

### Organisms

#### `BrandingPanel` (`src/components/organisms/BrandingPanel/index.tsx`)

No props — static content fixed to the Evenflow brand.

- Gradient background: `linear-gradient(135deg, #0a0e27 0%, #24338d 100%)`
- "EVENFLOW" h1: Syne ExtraBold 64px (desktop) / 36px (mobile), white, letterSpacing -1.28px
- Tagline p: hidden on mobile (`hidden lg:block`), Syne Regular 24px, `#d3d3d3`, letterSpacing -0.48px
- Layout: `flex flex-col justify-center items-start px-8 py-10 lg:w-1/2 lg:min-h-screen min-h-[160px]`

#### `LoginForm` (`src/components/organisms/LoginForm/index.tsx`)

No props — owns its own form state and validation.

State:
```ts
const [values, setValues] = useState<FormState>({ email: "", password: "" });
const [errors, setErrors] = useState<FormErrors>({ emailError: null, passwordError: null });
const [isSubmitting, setIsSubmitting] = useState(false);
```

Validation (same rules as before — extracted into `validate()` pure function in the same file):
- Empty email → "El email es requerido"
- Invalid format → "Ingresa un email válido"
- Empty password → "La contraseña es requerida"
- Password < 6 chars → "Mínimo 6 caracteres"

Composed of:
- Heading + subtitle (inline — too simple to extract)
- `FormField` > `InputField` (email)
- `FormField` > `InputField` (password)
- `Button` (submit, `type="submit"`)
- `Divider` (label="O")
- `SocialButton` (Google)
- Register link: inline text + `TextLink`

Wrapped in `<form onSubmit={handleSubmit} noValidate>`.

Icon asset URLs (temporary — valid ~7 days from 2026-04-07, replace with SVGs):
- `MAIL_ICON` — Figma asset URL
- `LOCK_ICON` — Figma asset URL
- `GOOGLE_LOGO` — Figma asset URL

---

### Templates

#### `AuthLayout` (`src/components/templates/AuthLayout/index.tsx`)

```ts
interface AuthLayoutProps {
  brandingPanel: React.ReactNode;
  children: React.ReactNode;   // right panel slot
}
```

- Outer: `flex flex-col lg:flex-row h-screen`
- Left: branding panel slot (no extra wrapper — `BrandingPanel` owns its own sizing)
- Right: `flex flex-col justify-center items-center px-8 py-10 lg:p-16 lg:w-1/2 bg-[#efefef]`
- Inner right: `w-full max-w-[592px]` containing `{children}`

---

## Final `src/app/auth/page.tsx`

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

---

## Import Convention Rule

| Level | Can import from | Cannot import from |
|-------|----------------|-------------------|
| Atom | (nothing below it, shared utilities only) | molecules, organisms, templates |
| Molecule | atoms | organisms, templates |
| Organism | atoms, molecules | templates |
| Template | atoms, molecules, organisms | other templates |
| Page (`src/app/`) | any component level | — |

This rule applies to all future components. When adding a new component, place it at the lowest level that describes it.

---

## Out of Scope

- Adding ESLint rules to enforce import conventions (follow-up)
- Storybook or component documentation
- Dark mode variants
- Unit tests for individual components
