import { forwardRef, useState } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export interface CollapsibleProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
}

export const Collapsible = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsibleProps
>(
  (
    {
      title,
      children,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      className,
      contentClassName,
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const open = controlledOpen ?? internalOpen;

    const handleOpenChange = (next: boolean) => {
      onOpenChange?.(next);
      if (controlledOpen === undefined) setInternalOpen(next);
    };

    return (
      <CollapsiblePrimitive.Root
        ref={ref}
        open={open}
        onOpenChange={handleOpenChange}
        className={cn("w-full", className)}
      >
        <CollapsiblePrimitive.Trigger
          className={cn(
            "flex w-full items-center justify-between rounded-md border border-border bg-muted/40 px-4 py-2.5",
            "text-sm font-medium text-foreground",
            "transition-colors hover:bg-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "cursor-pointer select-none"
          )}
        >
          {title}
          <ChevronDown
            className={cn(
              "shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </CollapsiblePrimitive.Trigger>

        <CollapsiblePrimitive.Content
          className={cn(
            "overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=open]:slide-in-from-top-1 data-[state=closed]:slide-out-to-top-1"
          )}
        >
          <div
            className={cn(
              "mt-1 rounded-md border border-border px-4 py-3",
              contentClassName
            )}
          >
            {children}
          </div>
        </CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    );
  }
);

Collapsible.displayName = "Collapsible";