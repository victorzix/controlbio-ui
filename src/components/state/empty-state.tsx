import * as React from "react";
import { cn } from "../../lib/utils";

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Ícone (ex.: um ícone lucide). Renderizado acima do título, dimensionado a size-10. */
  icon?: React.ReactNode;
  /** Título do estado. */
  title: React.ReactNode;
  /** Texto de apoio opcional. */
  description?: React.ReactNode;
  /** Ação opcional (ex.: um `Button`) exibida abaixo do texto. */
  action?: React.ReactNode;
}

/**
 * Bloco genérico de "estado" (slot-based): ícone + título + descrição + ação.
 * Base visual do design system para vazio/erro/carregando — sem domínio.
 * As mensagens e ícones específicos ficam no chamador.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-12 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="text-muted-foreground [&_svg]:size-10" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
