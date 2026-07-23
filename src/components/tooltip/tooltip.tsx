import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/utils";

/**
 * Provider opcional. Coloque UMA vez perto da raiz do app para compartilhar o
 * comportamento de delay entre tooltips (skip-delay ao passar de um para outro).
 * O `Tooltip` já funciona sem ele — cada instância cria o seu próprio provider.
 */
export const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps {
  /** Conteúdo da bolha. Se vazio/null, o trigger é renderizado sem tooltip. */
  content: React.ReactNode;
  /** Elemento que dispara o tooltip (hover/focus). */
  children: React.ReactNode;
  /** Lado preferido. Padrão: "top". */
  side?: "top" | "right" | "bottom" | "left";
  /** Alinhamento. Padrão: "center". */
  align?: "start" | "center" | "end";
  /** Distância (px) entre trigger e bolha. Padrão: 6. */
  sideOffset?: number;
  /** Atraso (ms) antes de abrir. Padrão: 200. */
  delayDuration?: number;
  /** Desabilita o tooltip (renderiza só o trigger). */
  disabled?: boolean;
  /** Classe extra para a bolha. */
  className?: string;
}

export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  sideOffset = 6,
  delayDuration = 200,
  disabled = false,
  className,
}: TooltipProps) {
  if (disabled || content == null || content === "") {
    return <>{children}</>;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn(
              "z-50 max-w-xs select-none rounded-md bg-foreground px-2.5 py-1.5",
              "text-xs text-background shadow-md",
              className
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-foreground" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
