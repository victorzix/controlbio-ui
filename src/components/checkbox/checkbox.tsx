import { forwardRef, useId } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

const CheckIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "checked" | "onCheckedChange" | "id"
  > {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  error?: string;
  hint?: string;
}

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ id, checked, onCheckedChange, label, error, hint, className, ...props }, ref) => {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const hintId = `${checkboxId}-hint`;
  const errorId = `${checkboxId}-error`;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          checked={checked}
          onCheckedChange={(v) => onCheckedChange?.(v === true)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          aria-invalid={!!error}
          className={cn(
            "flex h-4 w-4 shrink-0 items-center justify-center rounded border bg-background transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
            error ? "border-destructive" : "border-border",
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className="text-primary-foreground">
            <CheckIcon />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {label && (
          <label
            htmlFor={checkboxId}
            className="cursor-pointer select-none text-sm text-foreground"
          >
            {label}
          </label>
        )}
      </div>

      {error && (
        <p id={errorId} className="pl-6 text-sm text-destructive">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="pl-6 text-sm text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";