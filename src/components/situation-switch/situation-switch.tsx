import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SituationSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  isPending?: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  className?: string;
}

export const SituationSwitch = forwardRef<HTMLButtonElement, SituationSwitchProps>(
  (
    {
      checked,
      onCheckedChange,
      disabled,
      isPending,
      activeLabel = "Ativo",
      inactiveLabel = "Inativo",
      className,
    },
    ref
  ) => {
    const isDisabled = disabled || isPending;

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={isDisabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "inline-flex h-6 items-center overflow-hidden rounded-full border border-border transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className
        )}
      >
        <span
          className={cn(
            "flex h-full items-center px-2.5 text-[11px] font-semibold tracking-wide transition-all duration-200",
            checked ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {activeLabel}
        </span>
        <span
          className={cn(
            "flex h-full items-center px-2.5 text-[11px] font-semibold tracking-wide transition-all duration-200",
            !checked ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
          )}
        >
          {inactiveLabel}
        </span>
      </button>
    );
  }
);

SituationSwitch.displayName = "SituationSwitch";