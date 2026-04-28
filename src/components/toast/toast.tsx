"use client";

import { Toaster as Sonner } from "sonner";
import { cn } from "../../lib/utils";
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";

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
          success: "group-[.toaster]:text-green-600 group-[.toaster]:border-green-200 group-[.toaster]:bg-green-50",
          error: "group-[.toaster]:text-destructive group-[.toaster]:border-destructive/20 group-[.toaster]:bg-destructive/5",
          info: "group-[.toaster]:text-blue-600 group-[.toaster]:border-blue-200 group-[.toaster]:bg-blue-50",
          warning: "group-[.toaster]:text-yellow-600 group-[.toaster]:border-yellow-200 group-[.toaster]:bg-yellow-50",
        },
      }}
      icons={{
        success: <CheckCircle2 className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <AlertTriangle className="h-4 w-4" />,
        error: <AlertCircle className="h-4 w-4" />,
      }}
      {...props}
    />
  );
};

export { Toaster };
