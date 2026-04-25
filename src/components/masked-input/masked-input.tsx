import { useId } from "react";
import { IMaskInput, type IMaskInputProps } from "react-imask";
import { cn } from "@/lib/utils";

export type MaskedInputProps = IMaskInputProps<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

const inputBase = [
  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground",
  "ring-offset-background placeholder:text-muted-foreground",
  "transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

export const MaskedInput = ({
  label,
  error,
  hint,
  required,
  className,
  id,
  ...props
}: MaskedInputProps) => {
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
          {required && (
            <span className="ml-1 text-destructive" aria-hidden="true">*</span>
          )}
        </label>
      )}

      <IMaskInput
        id={inputId}
        required={required}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        aria-invalid={!!error}
        className={cn(
          inputBase,
          error
            ? "border-destructive focus-visible:ring-destructive"
            : "border-input focus-visible:ring-ring",
          className
        )}
        {...props}
      />

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
};

MaskedInput.displayName = "MaskedInput";
