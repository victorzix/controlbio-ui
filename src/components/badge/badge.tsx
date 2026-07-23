import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 border font-medium whitespace-nowrap",
    "px-2.5 py-0.5 text-xs transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ],
  {
    variants: {
      /** Aparência do badge */
      appearance: {
        soft: "",
        solid: "border-transparent",
        outline: "bg-transparent",
      },
      /** Cor / intenção */
      tone: {
        neutral: "",
        primary: "",
        success: "",
        warning: "",
        danger: "",
        info: "",
      },
      /** Formato */
      shape: {
        pill: "rounded-full",
        rounded: "rounded-md",
      },
    },
    compoundVariants: [
      /* -------- soft (tonal) -------- */
      { appearance: "soft", tone: "neutral", class: "bg-muted text-muted-foreground border-border" },
      { appearance: "soft", tone: "primary", class: "bg-primary/10 text-primary border-primary/30" },
      { appearance: "soft", tone: "success", class: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300" },
      { appearance: "soft", tone: "warning", class: "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300" },
      { appearance: "soft", tone: "danger", class: "bg-destructive/10 text-destructive border-destructive/30" },
      { appearance: "soft", tone: "info", class: "bg-blue-500/10 text-blue-700 border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-300" },

      /* -------- solid -------- */
      { appearance: "solid", tone: "neutral", class: "bg-secondary text-secondary-foreground" },
      { appearance: "solid", tone: "primary", class: "bg-primary text-primary-foreground" },
      { appearance: "solid", tone: "success", class: "bg-emerald-600 text-white dark:bg-emerald-500" },
      { appearance: "solid", tone: "warning", class: "bg-amber-500 text-white" },
      { appearance: "solid", tone: "danger", class: "bg-destructive text-destructive-foreground" },
      { appearance: "solid", tone: "info", class: "bg-blue-600 text-white dark:bg-blue-500" },

      /* -------- outline -------- */
      { appearance: "outline", tone: "neutral", class: "border-border text-foreground" },
      { appearance: "outline", tone: "primary", class: "border-primary/50 text-primary" },
      { appearance: "outline", tone: "success", class: "border-emerald-500/50 text-emerald-700 dark:text-emerald-300" },
      { appearance: "outline", tone: "warning", class: "border-amber-500/50 text-amber-700 dark:text-amber-300" },
      { appearance: "outline", tone: "danger", class: "border-destructive/50 text-destructive" },
      { appearance: "outline", tone: "info", class: "border-blue-500/50 text-blue-700 dark:text-blue-300" },
    ],
    defaultVariants: {
      appearance: "soft",
      tone: "neutral",
      shape: "pill",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, appearance, tone, shape, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ appearance, tone, shape }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
