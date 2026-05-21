import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost-dark";

export function GoldButton({
  children,
  variant = "solid",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: Variant }) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-sans-soft text-[12px] uppercase tracking-[0.32em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F3] disabled:opacity-50 disabled:cursor-not-allowed";
  const styles: Record<Variant, string> = {
    solid:
      "border border-[#C9A84C]/40 bg-gradient-to-b from-[#E8D5A3] via-[#C9A84C] to-[#8B7355] text-[#2B1B14] shadow-[0_18px_40px_-18px_rgba(201,168,76,0.65)] hover:shadow-[0_22px_55px_-15px_rgba(201,168,76,0.75)]",
    outline:
      "border border-[#C9A84C]/60 text-[#163C32] bg-transparent hover:bg-[#C9A84C]/10",
    "ghost-dark":
      "border border-[#C9A84C]/40 text-[#FAF8F3] bg-transparent hover:bg-[#C9A84C]/15",
  };
  return (
    <button {...rest} className={`${base} ${styles[variant]} ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
      />
    </button>
  );
}
