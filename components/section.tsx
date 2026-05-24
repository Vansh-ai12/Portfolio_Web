import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  children,
  className
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8", className)}>
      {eyebrow || title ? (
        <div className="mb-10 max-w-3xl">
          {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">{eyebrow}</p> : null}
          {title ? <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">{title}</h2> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
