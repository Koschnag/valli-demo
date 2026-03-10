"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "warm";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          {
            "bg-[var(--color-primary-900)] text-white hover:bg-[var(--color-primary-700)] focus:ring-[var(--color-primary-500)]":
              variant === "primary",
            "bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-700)] focus:ring-[var(--color-accent-500)]":
              variant === "secondary",
            "border-2 border-[var(--color-primary-900)] text-[var(--color-primary-900)] hover:bg-[var(--color-primary-900)] hover:text-white focus:ring-[var(--color-primary-500)]":
              variant === "outline",
            "text-[var(--color-primary-900)] hover:bg-[var(--color-surface-200)] focus:ring-[var(--color-primary-500)]":
              variant === "ghost",
            "bg-[var(--color-warm-500)] text-[var(--color-primary-900)] hover:bg-[var(--color-warm-400)] focus:ring-[var(--color-warm-500)]":
              variant === "warm",
            "px-3 py-1.5 text-sm gap-1.5": size === "sm",
            "px-5 py-2.5 text-base gap-2": size === "md",
            "px-8 py-3.5 text-lg gap-2.5": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
