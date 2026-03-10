import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "warm" | "outline";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide",
        {
          "bg-[var(--color-primary-100)] text-[var(--color-primary-900)]":
            variant === "default",
          "bg-[var(--color-accent-100)] text-[var(--color-accent-900)]":
            variant === "accent",
          "bg-[var(--color-warm-300)] text-[var(--color-primary-900)]":
            variant === "warm",
          "border border-[var(--color-surface-300)] text-[var(--color-text-secondary)]":
            variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
