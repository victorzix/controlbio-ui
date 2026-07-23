# Pagination — referência para agentes de IA

> Componente: `Pagination` de `@victorzix/controlbio-ui`
> Arquivo-fonte: `src/components/pagination/pagination.tsx`
> Status: **NOVO componente** (aditivo → bump `minor`).

Barra de paginação "Página X de Y" + botões anterior/próxima. Primitivo puro,
sem domínio — a página e o total vêm por prop; o estado fica no chamador.

---

## 1. API

```ts
interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number;                          // página atual (1-based)
  totalPages: number;
  onPageChange: (page: number) => void;  // recebe a nova página
  previousLabel?: string;                // aria-label; default "Página anterior"
  nextLabel?: string;                    // aria-label; default "Próxima página"
  showOnSinglePage?: boolean;            // default false (esconde se totalPages <= 1)
}
```

Comportamento:
- Retorna `null` quando `totalPages <= 1` (a menos que `showOnSinglePage`).
- Botão anterior desabilita em `page <= 1`; próxima desabilita em `page >= totalPages`.
- Os chevrons usam o `Button` da lib (`variant="outline"`, `size="icon-sm"`).

---

## 2. Exemplo

```tsx
const [page, setPage] = useState(1);
const totalPages = Math.ceil(total / PER_PAGE);

<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
```

---

## 3. Guia de adoção — substituindo a paginação crua no app

Markup repetido byte-a-byte em ~16 `*-page.tsx`:

```tsx
{totalPages > 1 && (
  <div className="flex items-center justify-between border-t border-border px-5 py-3 text-sm text-muted-foreground">
    <span>Página {page} de {totalPages}</span>
    <div className="flex items-center gap-1">
      <button onClick={() => setPage((p) => p - 1)} disabled={page === 1} className="rounded-md border border-border p-1.5 ...">
        <ChevronLeft size={16} />
      </button>
      <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages} className="rounded-md border border-border p-1.5 ...">
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
)}
```

Vira (o `null` interno dispensa o `{totalPages > 1 && ...}`):

```tsx
<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
```

O componente já renderiza a barra `border-t` do rodapé da tabela; sobrescreva com
`className` se precisar de outro espaçamento/borda.

---

## 4. Dependências

- Reusa o `Button` da lib e os ícones `ChevronLeft`/`ChevronRight` do `lucide-react`.
