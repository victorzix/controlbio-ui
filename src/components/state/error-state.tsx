import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../button";
import { EmptyState, type EmptyStateProps } from "./empty-state";

export interface ErrorStateProps
  extends Omit<EmptyStateProps, "title" | "action"> {
  /** Título do erro. Padrão: "Erro ao carregar". */
  title?: React.ReactNode;
  /** Callback do botão "Tentar novamente". Se ausente, o botão não é exibido. */
  onRetry?: () => void;
  /** Texto do botão de retry. Padrão: "Tentar novamente". */
  retryLabel?: string;
  /** Substitui a ação padrão (botão de retry) por um conteúdo próprio. */
  action?: React.ReactNode;
}

/**
 * Estado de erro: `EmptyState` com ícone de alerta e botão "Tentar novamente".
 * Passe `onRetry` para exibir o botão, ou `action` para uma ação customizada.
 */
export function ErrorState({
  icon,
  title = "Erro ao carregar",
  onRetry,
  retryLabel = "Tentar novamente",
  action,
  ...props
}: ErrorStateProps) {
  const resolvedAction =
    action ??
    (onRetry ? (
      <Button
        variant="outline"
        tone="neutral"
        size="sm"
        leftIcon={<RefreshCw className="size-4" />}
        onClick={onRetry}
      >
        {retryLabel}
      </Button>
    ) : undefined);

  return (
    <EmptyState
      icon={icon ?? <AlertCircle className="text-destructive" />}
      title={title}
      action={resolvedAction}
      {...props}
    />
  );
}
