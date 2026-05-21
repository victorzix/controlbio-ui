import { forwardRef, useId } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-4 w-4 shrink-0 transition-transform duration-200", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Check = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-3.5 w-3.5", className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = "Selecione...",
      label,
      error,
      hint,
      disabled,
      required,
      id,
      name,
      className,
      size = "md",
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-foreground">
            {label}
            {required && (
              <span className="ml-1 text-destructive" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <RadixSelect.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          name={name}
        >
          <RadixSelect.Trigger
            ref={ref}
            id={selectId}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            aria-invalid={!!error}
            className={cn(
              "group flex w-full items-center justify-between rounded-md border bg-background px-3 text-sm text-foreground",
              "ring-offset-background transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "cursor-pointer select-none",
              "data-[placeholder]:text-muted-foreground",
              size === "sm" && "h-8 text-xs",
              size === "md" && "h-10",
              size === "lg" && "h-11 text-base",
              error
                ? "border-destructive focus:ring-destructive"
                : "border-input focus:ring-ring",
              className
            )}
          >
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon asChild>
              <ChevronDown className="text-muted-foreground group-data-[state=open]:rotate-180" />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              position="popper"
              sideOffset={4}
              className={cn(
                "relative z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-border bg-card shadow-md",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
              )}
            >
              <RadixSelect.Viewport className="p-1">
                {options.map((opt) => (
                  <RadixSelect.Item
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className={cn(
                      "relative flex w-full items-center rounded-sm py-2 pl-7 pr-3 text-sm outline-none",
                      "cursor-pointer select-none",
                      "focus:bg-accent focus:text-accent-foreground",
                      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    )}
                  >
                    <RadixSelect.ItemIndicator className="absolute left-2 flex items-center">
                      <Check className="text-primary" />
                    </RadixSelect.ItemIndicator>
                    <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
                      <RadixSelect.ItemText>
                        <span className="font-semibold">{opt.label}</span>
                      </RadixSelect.ItemText>
                      {opt.description && (
                        <span className="truncate text-muted-foreground">
                          {opt.description}
                        </span>
                      )}
                    </div>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

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

Select.displayName = "Select";
