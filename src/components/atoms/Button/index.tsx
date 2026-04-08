import type React from "react";

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
