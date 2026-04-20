import type React from "react";

interface AuthLayoutProps {
  brandingPanel: React.ReactNode;
  children: React.ReactNode;
}

export function AuthLayout({ brandingPanel, children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {brandingPanel}
      <section className="flex flex-col justify-center items-center px-8 py-10 lg:p-16 lg:w-1/2 bg-[#efefef] overflow-y-auto h-full">
        <div className="w-full max-w-148">{children}</div>
      </section>
    </div>
  );
}
