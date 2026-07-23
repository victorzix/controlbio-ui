import { forwardRef } from "react";
import { Search } from "lucide-react";
import { Input, type InputProps } from "../input";

export interface SearchInputProps
  extends Omit<InputProps, "leftElement" | "type"> {}

/**
 * Input de busca: `Input` com ícone de lupa embutido à esquerda.
 * Puramente visual — o debounce e o estado ficam no chamador.
 * Aceita todas as props do `Input` (label, error, hint, rightElement, etc.).
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = "Buscar...", ...props }, ref) => (
    <Input
      ref={ref}
      type="search"
      leftElement={<Search className="size-4" aria-hidden="true" />}
      placeholder={placeholder}
      {...props}
    />
  )
);

SearchInput.displayName = "SearchInput";
