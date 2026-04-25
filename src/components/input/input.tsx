import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftElement, rightElement, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-destructive" aria-hidden="true">*</span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {leftElement && (
            <span className="absolute left-3 flex items-center text-muted-foreground pointer-events-none">
              {leftElement}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            aria-invalid={!!error}
            className={cn(
              "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground",
              "ring-offset-background placeholder:text-muted-foreground",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-destructive focus-visible:ring-destructive"
                : "border-input focus-visible:ring-ring",
              leftElement && "pl-9",
              rightElement && "pr-9",
              className
            )}
            {...props}
          />

          {rightElement && (
            <span className="absolute right-3 flex items-center text-muted-foreground pointer-events-none">
              {rightElement}
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-sm text-destructive">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
