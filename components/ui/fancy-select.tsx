"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function FancySelect({
  value,
  options,
  onChange,
  className,
  label
}: {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function close(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {label ? <span className="sr-only">{label}</span> : null}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 min-w-44 items-center justify-between gap-3 rounded-md border border-white/15 bg-slate-950/70 px-4 text-sm font-semibold text-white shadow-sm outline-none transition hover:border-cyan-300/40 hover:bg-slate-900/90 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected.label}
        <ChevronDown size={17} className={cn("text-cyan-200 transition", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="absolute left-0 top-12 z-40 w-full min-w-48 overflow-hidden rounded-md border border-cyan-300/20 bg-slate-950/95 p-1 shadow-glow backdrop-blur-xl">
          <div className="max-h-72 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded px-3 py-2.5 text-left text-sm font-medium text-slate-200 transition hover:bg-cyan-300/10 hover:text-cyan-100",
                  option.value === value && "bg-cyan-300/15 text-cyan-100"
                )}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
                {option.value === value ? <Check size={16} /> : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
