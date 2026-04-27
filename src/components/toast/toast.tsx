"use client";

import { Toaster as Sonner } from "sonner";
import { cn } from "@/lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ className, ...props }: ToasterProps) => {
  return (
    <Sonner
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:text-green-600 group-[.toaster]:border-green-200",
          error: "group-[.toaster]:text-destructive group-[.toaster]:border-destructive/20",
          info: "group-[.toaster]:text-blue-600 group-[.toaster]:border-blue-200",
          warning: "group-[.toaster]:text-yellow-600 group-[.toaster]:border-yellow-200",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
