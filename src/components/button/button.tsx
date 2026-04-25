import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium",
    "text-sm transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer select-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/70",
        outline:
          "border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/70",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        link: "bg-transparent text-primary underline-offset-4 hover:underline h-auto px-0",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-4 text-sm rounded-md",
        lg: "h-11 px-6 text-base rounded-md",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Ícone exibido antes do texto */
  leftIcon?: React.ReactNode;
  /** Ícone exibido depois do texto */
  rightIcon?: React.ReactNode;
  /** Exibe spinner e desabilita o botão */
  isLoading?: boolean;
  /** Texto exibido durante o loading. Padrão: "Carregando" */
  loadingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      className,
      leftIcon,
      rightIcon,
      isLoading = false,
      loadingText = "Carregando",
      disabled,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner />
          {loadingText}
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  )
);

Button.displayName = "Button";
