# Tooltip — referência para agentes de IA

> Componente: `Tooltip` de `@victorzix/controlbio-ui`
> Arquivo-fonte: `src/components/tooltip/tooltip.tsx`
> Status: **NOVO componente** (aditivo → bump `minor`).
> Base: Radix UI (`@radix-ui/react-tooltip`).

Primitivo de tooltip acessível (hover + foco por teclado, portal, posicionamento
automático). Substitui os tooltips feitos à mão com `group-hover/opacity`.

---

## 1. API

```ts
interface TooltipProps {
  content: React.ReactNode;   // conteúdo da bolha; se vazio/null → sem tooltip
  children: React.ReactNode;  // o trigger (hover/focus)
  side?: "top" | "right" | "bottom" | "left";  // default "top"
  align?: "start" | "center" | "end";          // default "center"
  sideOffset?: number;        // default 6
  delayDuration?: number;     // ms antes de abrir; default 200
  disabled?: boolean;         // renderiza só o trigger, sem tooltip
  className?: string;         // classe extra da bolha
}
```

Também exporta **`TooltipProvider`** (re-export do Radix). Opcional: coloque
UMA vez perto da raiz do app para compartilhar o delay entre tooltips
(skip-delay ao mover de um para outro). Sem ele, cada `Tooltip` cria o seu.

Visual da bolha: `bg-foreground text-background text-xs rounded-md px-2.5 py-1.5`
+ seta (`Arrow`). O trigger recebe `asChild` — passe um único elemento focável
(ex.: `Button`).

---

## 2. Exemplos

```tsx
<Tooltip content="Validade: 01/01/2026">
  <CalibrationBadge status={status} />
</Tooltip>

// Botão de ícone (o aria-label do botão continua sendo o nome acessível)
<Tooltip content="Excluir">
  <Button variant="ghost" tone="destructive" size="icon-sm" aria-label="Excluir">
    <Trash2 />
  </Button>
</Tooltip>

// Condicional: sem permissão mostra a bolha; com permissão, nada
<Tooltip content={!hasPermission ? "Você não possui permissão" : undefined}>
  <Button>Novo</Button>
</Tooltip>
```

> `content` vazio/`undefined` ⇒ o trigger é renderizado direto, sem wrapper de
> tooltip. Útil para casos condicionais.

---

## 3. Guia de adoção — substituindo tooltips manuais no app

Os dois tooltips feitos à mão (`group/... absolute opacity-0 group-hover:opacity-100`
+ seta) viram:

| Local                                          | Substituir por                                              |
|------------------------------------------------|-------------------------------------------------------------|
| `equipment-page.tsx` (validade de calibração)  | `<Tooltip content={"Validade: " + data}><CalibrationBadge/></Tooltip>` |
| `permission-button.tsx` ("Você não possui permissão") | envolver o `Button` interno com `<Tooltip content={!hasPermission ? "Você não possui permissão" : undefined}>` e remover o `<div>`/`<span>` de tooltip manual |

Ganhos: acessível por teclado (foco), fecha no `Esc`, posicionamento com
portal (não é cortado por `overflow`/`z-index` de tabelas), e sem markup manual.

---

## 4. Dependências

- `@radix-ui/react-tooltip` (adicionado às `dependencies`).
- Sem dependência de `tailwindcss-animate` — a bolha não usa `animate-in`
  (esse plugin não está instalado na lib).
