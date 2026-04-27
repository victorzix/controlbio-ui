import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusIndicatorVariants = cva(
  "relative inline-flex rounded-full h-3 w-3",
  {
    variants: {
      variant: {
        neutral: "bg-secondary",
        success: "bg-accent",
        warning: "bg-yellow-500",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusIndicatorVariants> {
  pulse?: boolean;
}

function StatusIndicator({ className, variant, pulse = true, ...props }: StatusIndicatorProps) {
  return (
    <span className="relative flex h-3 w-3 items-center justify-center">
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            variant === "neutral" && "bg-secondary",
            variant === "success" && "bg-accent",
            variant === "warning" && "bg-yellow-500",
            variant === "destructive" && "bg-destructive"
          )}
        />
      )}
      <span
        className={cn(statusIndicatorVariants({ variant }), className)}
        {...props}
      />
    </span>
  );
}

export { StatusIndicator, statusIndicatorVariants };
