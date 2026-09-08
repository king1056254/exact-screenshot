import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div className="grid-backdrop absolute inset-0 opacity-70" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-20">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-5 py-16 md:py-20 ${className}`}>{children}</section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "Live" || status === "Paid" || status === "Completed"
      ? "bg-success/12 text-success"
      : status === "Coming Soon" || status === "Draft" || status === "Pending"
        ? "bg-muted text-muted-foreground"
        : "bg-primary/15 text-primary";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider ${tone}`}>
      {status}
    </span>
  );
}
