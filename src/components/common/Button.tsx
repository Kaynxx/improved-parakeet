import { type VariantProps, cva } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Tek CTA yüzeyi. `bg-ink` + `press` + `hover:bg-accent` kalıbı önceden dört
 * ayrı dosyada elle kopyalanmıştı. `buttonVariants` ayrıca dışa açık —
 * `<Link>`/`<a>` gibi `<button>` olmayan CTA'lar da aynı sınıfları giyebilir.
 */
export const buttonVariants = cva(
  "press inline-flex items-center justify-center gap-2 rounded-[var(--radius-inner)] font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-ink text-on-ink hover:bg-accent",
        ghost: "text-ink-muted hover:bg-elevated hover:text-ink",
      },
      size: {
        md: "h-11 px-5 text-md",
        sm: "h-9 px-3.5 text-sm",
        icon: "size-10 shrink-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
