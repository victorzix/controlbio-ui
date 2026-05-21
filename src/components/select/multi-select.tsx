import { forwardRef, useId, useState, useCallback, useRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import type { SelectOption } from "./select";

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
    className={cn("h-3 w-3", className)}
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

const XIcon = ({ className }: { className?: string }) => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export interface MultiSelectProps {
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
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
  /** Max labels shown before "+ N more". Default: 3 */
  maxDisplay?: number;
}

export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value: controlledValue,
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
      maxDisplay = 3,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string[]>(
      defaultValue ?? []
    );
    const listboxId = useId();
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;

    const selected = controlledValue ?? internalValue;

    const toggle = useCallback(
      (optValue: string) => {
        const next = selected.includes(optValue)
          ? selected.filter((v) => v !== optValue)
          : [...selected, optValue];
        onValueChange?.(next);
        if (controlledValue === undefined) setInternalValue(next);
      },
      [selected, onValueChange, controlledValue]
    );

    const clearAll = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onValueChange?.([]);
        if (controlledValue === undefined) setInternalValue([]);
      },
      [onValueChange, controlledValue]
    );

    const selectedOptions = options.filter((o) => selected.includes(o.value));

    const displayText =
      selectedOptions.length === 0
        ? null
        : selectedOptions.length > maxDisplay
          ? `${selectedOptions
              .slice(0, maxDisplay)
              .map((o) => o.label)
              .join(", ")} +${selectedOptions.length - maxDisplay}`
          : selectedOptions.map((o) => o.label).join(", ");

    const handleItemKeyDown = (
      e: React.KeyboardEvent<HTMLDivElement>,
      opt: SelectOption
    ) => {
      if ((e.key === "Enter" || e.key === " ") && !opt.disabled) {
        e.preventDefault();
        toggle(opt.value);
      }
    };

    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const focusable = itemRefs.current.filter(Boolean) as HTMLDivElement[];
      const current = focusable.indexOf(document.activeElement as HTMLDivElement);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        focusable[(current + 1) % focusable.length]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        focusable[(current - 1 + focusable.length) % focusable.length]?.focus();
      }
    };

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

        <Popover.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
          <Popover.Trigger asChild>
            <button
              ref={ref}
              id={selectId}
              type="button"
              disabled={disabled}
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : hint ? hintId : undefined}
              className={cn(
                "group flex w-full items-center justify-between rounded-md border bg-background px-3 text-sm",
                "ring-offset-background transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "cursor-pointer select-none",
                size === "sm" && "h-8 text-xs",
                size === "md" && "h-10",
                size === "lg" && "h-11 text-base",
                error
                  ? "border-destructive focus:ring-destructive"
                  : "border-input focus:ring-ring",
                className
              )}
            >
              <span
                className={cn(
                  "truncate text-left",
                  !displayText && "text-muted-foreground"
                )}
              >
                {displayText ?? placeholder}
              </span>
              <span className="ml-2 flex shrink-0 items-center gap-1">
                {selected.length > 0 && !disabled && (
                  <span
                    role="button"
                    aria-label="Limpar seleção"
                    tabIndex={0}
                    onClick={clearAll}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") clearAll(e as unknown as React.MouseEvent);
                    }}
                    className="rounded p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <XIcon />
                  </span>
                )}
                <ChevronDown
                  className={cn(
                    "text-muted-foreground",
                    open && "rotate-180"
                  )}
                />
              </span>
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              align="start"
              sideOffset={4}
              style={{ width: "var(--radix-popover-trigger-width)" }}
              onOpenAutoFocus={(e) => e.preventDefault()}
              className={cn(
                "z-50 overflow-hidden rounded-md border border-border bg-card shadow-md",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
              )}
            >
              <div
                id={listboxId}
                role="listbox"
                aria-multiselectable="true"
                aria-label={label}
                className="p-1"
                onKeyDown={handleListKeyDown}
              >
                {options.map((opt, index) => {
                  const checked = selected.includes(opt.value);
                  return (
                    <div
                      key={opt.value}
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      role="option"
                      aria-selected={checked}
                      aria-disabled={opt.disabled}
                      tabIndex={opt.disabled ? -1 : 0}
                      onClick={() => !opt.disabled && toggle(opt.value)}
                      onKeyDown={(e) => handleItemKeyDown(e, opt)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm outline-none",
                        "cursor-pointer select-none",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus:bg-accent focus:text-accent-foreground",
                        opt.disabled && "pointer-events-none opacity-50"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                          checked
                            ? "border-primary bg-primary"
                            : "border-input bg-background"
                        )}
                        aria-hidden="true"
                      >
                        {checked && <Check className="text-primary-foreground" />}
                      </span>
                      <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
                        <span className="shrink-0 font-semibold">{opt.label}</span>
                        {opt.description && (
                          <span className="truncate text-muted-foreground">
                            {opt.description}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* Hidden inputs for form submission */}
        {name &&
          selected.map((v) => (
            <input key={v} type="hidden" name={name} value={v} />
          ))}

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

MultiSelect.displayName = "MultiSelect";