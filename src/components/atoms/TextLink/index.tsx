import type React from "react";

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
