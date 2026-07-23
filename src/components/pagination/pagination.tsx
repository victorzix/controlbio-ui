import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../button";

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Página atual (1-based). */
  page: number;
  /** Total de páginas. */
  totalPages: number;
  /** Chamado com a nova página ao clicar em anterior/próxima. */
  onPageChange: (page: number) => void;
  /** aria-label do botão anterior. Padrão: "Página anterior". */
  previousLabel?: string;
  /** aria-label do botão próxima. Padrão: "Próxima página". */
  nextLabel?: string;
  /** Se true, renderiza mesmo com totalPages <= 1. Padrão: false (esconde). */
  showOnSinglePage?: boolean;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  previousLabel = "Página anterior",
  nextLabel = "Próxima página",
  showOnSinglePage = false,
  className,
  ...props
}: PaginationProps) {
  if (totalPages <= 1 && !showOnSinglePage) return null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-border px-5 py-3 text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      <span>
        Página {page} de {totalPages}
      </span>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          tone="neutral"
          size="icon-sm"
          aria-label={previousLabel}
          disabled={!canPrev}
          onClick={() => canPrev && onPageChange(page - 1)}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          variant="outline"
          tone="neutral"
          size="icon-sm"
          aria-label={nextLabel}
          disabled={!canNext}
          onClick={() => canNext && onPageChange(page + 1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
