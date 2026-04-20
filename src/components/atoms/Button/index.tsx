import type React from "react";

export type ButtonVariant = "black" | "acid";

export const buttonVariants: Record<
  ButtonVariant,
  {
    base: string;
    loading: string;
    disabled: string;
    focus: string;
    text: string;
    disabledText: string;
  }
> = {
  black: {
    base: "bg-[var(--ink-black)]",
    loading: "bg-[var(--ink-black-80)]",
    disabled: "bg-[var(--ink-black-40)]",
    focus: "focus-visible:ring-2 focus-visible:ring-[var(--accent-lime)]",
    text: "text-white",
    disabledText: "text-white/40",
  },
  acid: {
    base: "bg-[var(--accent-lime)]",
    loading: "bg-[var(--accent-lime)]",
    disabled: "bg-[var(--accent-lime-40)]",
    focus: "focus-visible:ring-2 focus-visible:ring-[var(--ink-black)]",
    text: "text-[var(--ink-black)]",
    disabledText: "text-[var(--ink-black-40)]",
  },
};

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  type = "button",
  variant = "black",
  disabled,
  isLoading,
  onClick,
  className,
}: ButtonProps) {
  const v = buttonVariants[variant];
  const bgClass = isLoading ? v.loading : disabled ? v.disabled : v.base;
  const textClass = disabled && !isLoading ? v.disabledText : v.text;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={` ${bgClass} ${textClass} ${v.focus} font-semibold text-2xl py-2 rounded-lg hover:opacity-90 active:scale-95 active:opacity-80 transition-all duration-150 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className ?? ""}`.trim()}
      style={{ letterSpacing: "-0.48px" }}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
