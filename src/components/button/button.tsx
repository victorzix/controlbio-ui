import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "cursor-pointer select-none",
  ],
  {
    variants: {
      /** Forma do botão */
      variant: {
        solid: "",
        outline: "border bg-transparent",
        ghost: "bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline h-auto px-0",
      },
      /** Cor / intenção (combina com qualquer variant) */
      tone: {
        neutral: "",
        primary: "",
        destructive: "",
      },
      size: {
        xs: "h-7 gap-1.5 px-2.5 text-xs",
        sm: "h-8 gap-1.5 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        "icon-xs": "h-6 w-6",
        "icon-sm": "h-8 w-8",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    compoundVariants: [
      /* -------- solid -------- */
      {
        variant: "solid",
        tone: "neutral",
        class:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
      },
      {
        variant: "solid",
        tone: "primary",
        class:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
      },
      {
        variant: "solid",
        tone: "destructive",
        class:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
      },

      /* -------- outline -------- */
      {
        variant: "outline",
        tone: "neutral",
        class:
          "border-input text-foreground hover:bg-muted active:bg-muted/70",
      },
      {
        variant: "outline",
        tone: "primary",
        class:
          "border-primary/50 text-primary hover:bg-primary/10 active:bg-primary/15",
      },
      {
        variant: "outline",
        tone: "destructive",
        class:
          "border-destructive text-destructive hover:bg-destructive/10 active:bg-destructive/15",
      },

      /* -------- ghost -------- */
      {
        variant: "ghost",
        tone: "neutral",
        class:
          "text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted/70",
      },
      {
        variant: "ghost",
        tone: "primary",
        class: "text-primary hover:bg-primary/10 active:bg-primary/15",
      },
      {
        variant: "ghost",
        tone: "destructive",
        class:
          "text-destructive hover:bg-destructive/10 active:bg-destructive/15",
      },

      /* -------- link -------- */
      { variant: "link", tone: "neutral", class: "text-foreground" },
      { variant: "link", tone: "primary", class: "text-primary" },
      { variant: "link", tone: "destructive", class: "text-destructive" },
    ],
    defaultVariants: {
      variant: "solid",
      tone: "primary",
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
  /**
   * Renderiza o elemento filho no lugar do `<button>`, mesclando as classes do
   * Button nele (via Radix Slot). Útil para `<a>` / `<Link>` com aparência de
   * botão. Nesse modo o filho deve ser um único elemento e `leftIcon`,
   * `rightIcon` e `isLoading` são ignorados (coloque o conteúdo dentro do filho).
   */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      tone,
      size,
      fullWidth,
      className,
      leftIcon,
      rightIcon,
      isLoading = false,
      loadingText = "Carregando",
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      buttonVariants({ variant, tone, size, fullWidth }),
      className
    );

    // Modo polimórfico: mescla as classes no elemento filho (ex.: <a>/<Link>).
    // Slot exige um único filho, então não injetamos ícones/spinner aqui.
    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
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
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
