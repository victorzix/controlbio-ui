# Button — referência para agentes de IA

> Componente: `Button` de `@victorzix/controlbio-ui`
> Arquivo-fonte: `src/components/button/button.tsx`
> Última mudança: reescrita da API para o eixo **`tone` × `variant`** + novos `size`s + `fullWidth` + `asChild`.
> **Status: BREAKING CHANGE → bump `major` no changeset.**

Este documento é a fonte de verdade para gerar/editar código que usa o `Button`.
Se você é um agente migrando código, use o **mapa de migração** e a **tabela de adoção de `<button>` cru** no fim.

---

## 1. O que mudou (resumo executivo)

A API antiga misturava cor e forma num único `variant`
(`primary | secondary | ghost | outline | destructive | link`).
A nova separa em dois eixos ortogonais:

- **`variant`** = a *forma* → `solid | outline | ghost | link`
- **`tone`** = a *cor/intenção* → `neutral | primary | destructive`

Qualquer `variant` combina com qualquer `tone` (12 combinações), eliminando a
explosão de variantes (`destructive-outline`, `primary-ghost`, etc.).

Também foram adicionados:
- `size`s menores: **`xs`** e os de ícone **`icon-xs` (24px)** e **`icon-sm` (32px)**
- **`fullWidth`** (boolean)
- **`asChild`** (polimorfismo via Radix Slot — renderiza `<a>`/`<Link>` com aparência de botão)
- Tom neutro de `ghost`/`outline` passou a usar **`muted`** (cinza) no hover, em vez de `accent` (verde vivo).

### Exceção deliberada — NÃO existe `variant="dashed"`

Havia 1 caso no app de um CTA de adição com **borda tracejada** full-width
(`customer-addresses-fields.tsx`, "Adicionar endereço"). **Optou-se por NÃO criar
uma variante `dashed`** no Button — a decisão é manter a API enxuta e não modelar
um empty-state de adição como botão.

Como fazer esse caso: use `Button` com `fullWidth` + a borda tracejada via
`className` (ex.: `variant="outline" tone="neutral" fullWidth className="border-dashed"`).
Se o padrão se repetir, tratar num primitivo de empty-state dedicado — **não** no Button.

---

## 2. API completa

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost" | "link";      // default: "solid"
  tone?: "neutral" | "primary" | "destructive";          // default: "primary"
  size?: "xs" | "sm" | "md" | "lg"
       | "icon-xs" | "icon-sm" | "icon";                 // default: "md"
  fullWidth?: boolean;                                    // w-full
  leftIcon?: React.ReactNode;                             // ícone antes do texto
  rightIcon?: React.ReactNode;                            // ícone depois do texto
  isLoading?: boolean;                                    // spinner + disabled + aria-busy
  loadingText?: string;                                   // default: "Carregando"
  asChild?: boolean;                                      // renderiza o filho (Slot)
  // ...todos os atributos nativos de <button> (onClick, type, disabled, form, etc.)
}
```

`<Button>` sem props = **solid + primary + md** (o CTA primário de sempre).

### Sizes

| size      | dimensões                        | uso típico                          |
|-----------|----------------------------------|-------------------------------------|
| `xs`      | h-7, px-2.5, text-xs             | botões secundários densos (text-xs) |
| `sm`      | h-8, px-3, text-xs               | toolbars                            |
| `md`      | h-10, px-4, text-sm  *(default)* | CTA padrão                          |
| `lg`      | h-11, px-6, text-base            | destaque                            |
| `icon-xs` | 24×24 (h-6 w-6)                  | ação de linha bem pequena           |
| `icon-sm` | 32×32 (h-8 w-8)                  | editar/excluir/mover, chevrons      |
| `icon`    | 40×40 (h-10 w-10)                | ícone padrão                        |

Para `size="icon-*"` passe **só o ícone** como `children` e sempre um `aria-label`.

---

## 3. Matriz tone × variant (o que cada combinação renderiza)

| variant \ tone | `neutral`                                  | `primary`                           | `destructive`                               |
|----------------|--------------------------------------------|-------------------------------------|---------------------------------------------|
| `solid`        | fundo `secondary` (cinza)                  | fundo `primary` (verde)             | fundo `destructive` (vermelho)              |
| `outline`      | borda `input` + hover `bg-muted`           | borda/texto `primary` + hover 10%   | borda/texto `destructive` + hover 10%       |
| `ghost`        | texto `muted-foreground` + hover `bg-muted`| texto `primary` + hover 10%         | texto `destructive` + hover 10%             |
| `link`         | texto `foreground` sublinhado no hover     | texto `primary` sublinhado          | texto `destructive` sublinhado              |

---

## 4. Mapa de migração (API antiga → nova)

| Antes                        | Depois                                  |
|------------------------------|-----------------------------------------|
| `variant="primary"`          | *(remover — é o default)* ou `tone="primary"` |
| `variant="secondary"`        | `tone="neutral"`                        |
| `variant="destructive"`      | `tone="destructive"`                    |
| `variant="ghost"`            | `variant="ghost" tone="neutral"`        |
| `variant="outline"`          | `variant="outline" tone="neutral"`      |
| `variant="link"`             | `variant="link" tone="primary"` (ou `neutral`) |
| `size="icon"` (40px)         | mantém `icon`; para menores use `icon-sm`/`icon-xs` |
| `className="w-full"`         | prop `fullWidth`                        |

> `variant="primary" | "secondary" | "destructive"` **deixaram de ser valores válidos de `variant`** e causam erro de tipo. É por isso que a mudança é `major`.

---

## 5. Exemplos

```tsx
// CTA primário (default)
<Button leftIcon={<Plus />}>Novo cliente</Button>

// Secundário / toolbar
<Button variant="outline" tone="neutral" size="sm">Importar</Button>

// Ação de linha: editar (ícone pequeno, ghost neutro)
<Button variant="ghost" tone="neutral" size="icon-sm" aria-label="Editar">
  <Pencil />
</Button>

// Ação de linha: excluir (ghost destrutivo)
<Button variant="ghost" tone="destructive" size="icon-sm" aria-label="Excluir">
  <Trash2 />
</Button>

// Botão de retry em empty-state (outline destrutivo, denso)
<Button variant="outline" tone="destructive" size="xs" leftIcon={<RefreshCw />}>
  Tentar novamente
</Button>

// Largura total (ex.: CTA de formulário)
<Button type="submit" fullWidth isLoading={isPending} loadingText="Salvando...">
  Salvar
</Button>

// Link com aparência de botão (asChild)
<Button asChild>
  <Link href="/novo">Cadastrar</Link>
</Button>
```

### Regras do `asChild`
- O filho deve ser **um único elemento**.
- `leftIcon`, `rightIcon` e `isLoading` **são ignorados** no modo `asChild` — coloque
  ícones/conteúdo dentro do próprio filho.
- As classes do Button (variant/tone/size) são mescladas no elemento filho.

---

## 6. Guia de adoção — substituindo `<button>` cru no app

O app `labphase` tem ~122 `<button>` crus. Correspondência direta com a nova API:

| Padrão cru no app                                                        | Substituir por                                        |
|--------------------------------------------------------------------------|-------------------------------------------------------|
| `rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90` | `<Button leftIcon={...}>` (default)              |
| `border border-border bg-card px-3 py-2 hover:bg-muted` (toolbar)        | `<Button variant="outline" tone="neutral" size="sm">` |
| `rounded-md p-1.5 text-muted-foreground hover:bg-muted` (ícone ação)     | `<Button variant="ghost" tone="neutral" size="icon-sm" aria-label=...>` |
| idem + `hover:bg-destructive/10 hover:text-destructive` (excluir)        | `<Button variant="ghost" tone="destructive" size="icon-sm" aria-label=...>` |
| `border border-border p-1.5 hover:bg-muted` (chevron paginação)          | `<Button variant="outline" tone="neutral" size="icon-sm" aria-label=...>` |
| `border border-destructive px-3 py-1.5 text-xs hover:bg-destructive/10` (retry) | `<Button variant="outline" tone="destructive" size="xs">`       |
| `border border-border px-2 py-1 text-xs ... hover:border-primary/50` (add) | `<Button variant="outline" tone="neutral" size="xs">`         |
| `text-xs text-primary hover:underline` (link)                            | `<Button variant="link" tone="primary" size="xs">`   |
| `w-full ... border-dashed ...` (CTA adicionar full-width)                | `<Button variant="outline" tone="neutral" fullWidth>` (borda tracejada via className) |

**NÃO** transformar em `Button` (são outros primitivos):
- Triggers de Select/Combobox custom (`*-select.tsx`).
- Itens de navegação / disclosure do `app-shell`.
- Chips-toggle de classificação (candidato a `Toggle`/`ToggleGroup`).

### `PermissionButton` (shared)
Passou a **envolver o `Button` da lib** (antes era `<button>` cru).
Aceita **todas as props do `Button`** + `permission: string`. Mantém a lógica de
permissão e o tooltip "Você não possui permissão".

```tsx
<PermissionButton permission="cliente.criar" leftIcon={<Plus />}>
  Novo cliente
</PermissionButton>
```

---

## 7. Dependências

- Requer **`@radix-ui/react-slot`** (adicionado às `dependencies` da lib) para o `asChild`.
- Tokens de tema usados: `primary`, `secondary`, `muted`, `accent`, `destructive`,
  `border`, `input`, `ring`, `foreground` (definidos em `src/styles/theme.css`).
