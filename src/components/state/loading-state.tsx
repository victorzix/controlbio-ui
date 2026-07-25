import * as React from "react";
import { cn } from "../../lib/utils";

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Texto exibido. Padrão: "Carregando...". */
  label?: React.ReactNode;
  /** Ícone opcional (ex.: um spinner) exibido antes do texto. */
  icon?: React.ReactNode;
}

/**
 * Estado de carregamento: linha centralizada com texto "Carregando...".
 * Sem spinner por padrão — passe `icon` se quiser um.
 */
export function LoadingState({
  label = "Carregando...",
  icon,
  className,
  ...props
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 px-6 py-10 text-sm text-muted-foreground",
        className
      )}
      role="status"
      aria-live="polite"
      {...props}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
