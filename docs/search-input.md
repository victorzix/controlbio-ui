# SearchInput — referência para agentes de IA

> Componente: `SearchInput` de `@victorzix/controlbio-ui`
> Arquivo-fonte: `src/components/search-input/search-input.tsx`
> Status: **NOVO componente** (aditivo → bump `minor`).

Wrapper fino do `Input` com um ícone de lupa (`lucide-react/Search`) embutido à
esquerda. **Puramente visual** — o estado e o debounce da busca ficam no chamador.

---

## 1. API

```ts
interface SearchInputProps extends Omit<InputProps, "leftElement" | "type"> {}
```

Aceita **todas as props do `Input`** (`label`, `error`, `hint`, `placeholder`,
`value`, `onChange`, `disabled`, `rightElement`, `className`, `ref`, ...), exceto
`leftElement` (reservado pra lupa) e `type` (fixo em `search`).

`placeholder` tem default `"Buscar..."`.

---

## 2. Exemplos

```tsx
// Controlado (padrão típico de página de listagem)
const [search, setSearch] = useState("");
const debounced = useDebounce(search);

<SearchInput
  placeholder="Buscar por razão social, CNPJ..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
```

> O componente NÃO faz debounce nem controla estado — mantenha isso no chamador,
> como já é feito nas páginas.

---

## 3. Guia de adoção — substituindo o input de busca cru no app

Padrão cru repetido em ~17 páginas de listagem (`*-page.tsx`):

```tsx
<div className="relative w-full max-w-sm">
  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
  <input className="w-full ... py-2 pl-9 pr-3 ... focus:ring-primary/30" ... />
</div>
```

Vira:

```tsx
<div className="w-full max-w-sm">
  <SearchInput
    placeholder="Buscar..."
    value={search}
    onChange={(e) => handleSearch(e.target.value)}
  />
</div>
```

Só o placeholder muda entre as páginas. O wrapper de largura (`max-w-sm`) fica
no chamador (layout), já que o `Input` é `w-full` por padrão.

---

## 4. Dependências

- Reusa o `Input` da lib e o ícone `Search` do `lucide-react` (já são dependências).
