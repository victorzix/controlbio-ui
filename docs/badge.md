# Badge — referência para agentes de IA

> Componente: `Badge` de `@victorzix/controlbio-ui`
> Arquivo-fonte: `src/components/badge/badge.tsx`
> Última mudança: reescrita da API para **`appearance` × `tone`** + `shape`, com estilo **soft/tonal** como padrão.
> **Status: BREAKING CHANGE → bump `major` no changeset.**

Primitivo de pílula/etiqueta de status. O componente só expõe cor + forma;
o **texto e o mapeamento de status → tone** ficam no chamador (domínio do app).

---

## 1. O que mudou (resumo executivo)

A API antiga tinha um único `variant` com fills sólidos
(`default | secondary | success | warning | destructive | outline`).
A nova separa em eixos ortogonais e adota o visual **soft** (tonal) como padrão,
que é o que o app usa em 100% dos casos:

- **`appearance`** = o preenchimento → `soft | solid | outline` (default `soft`)
- **`tone`** = a cor/intenção → `neutral | primary | success | warning | danger | info` (default `neutral`)
- **`shape`** = o formato → `pill` (rounded-full, default) | `rounded` (rounded-md, etiqueta)

`<span>` (antes era `<div>`). Aceita `children` (texto e/ou ícone) e todos os
atributos HTML de span.

---

## 2. API completa

```ts
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  appearance?: "soft" | "solid" | "outline";                        // default: "soft"
  tone?: "neutral" | "primary" | "success" | "warning" | "danger" | "info"; // default: "neutral"
  shape?: "pill" | "rounded";                                       // default: "pill"
}
```

`<Badge>` sem props = **soft + neutral + pill**.

### Cores por tone
| tone      | paleta                                   |
|-----------|------------------------------------------|
| `neutral` | token `muted`                            |
| `primary` | token `primary` (verde da marca)         |
| `success` | `emerald`                                |
| `warning` | `amber`                                  |
| `danger`  | token `destructive` (vermelho)           |
| `info`    | `blue`                                   |

Dark mode: tons por token (`neutral`/`primary`/`danger`) adaptam via CSS vars;
tons de paleta (`success`/`warning`/`info`) usam overrides `dark:` para contraste.

---

## 3. Matriz appearance × tone

|            | neutral | primary | success | warning | danger | info |
|------------|---------|---------|---------|---------|--------|------|
| `soft`     | muted   | primary/10 | emerald/10 | amber/10 | destructive/10 | blue/10 |
| `solid`    | secondary | primary | emerald-600 | amber-500 | destructive | blue-600 |
| `outline`  | border  | primary | emerald | amber | destructive | blue |

---

## 4. Mapa de migração (API antiga → nova)

| Antes                     | Depois                                  |
|---------------------------|-----------------------------------------|
| `variant="default"`       | `appearance="solid" tone="primary"`     |
| `variant="secondary"`     | `appearance="solid" tone="neutral"`     |
| `variant="success"`       | `tone="success"` (soft) — ou `appearance="solid"` |
| `variant="warning"`       | `tone="warning"`                        |
| `variant="destructive"`   | `tone="danger"`                         |
| `variant="outline"`       | `appearance="outline" tone="neutral"`   |

> Os valores antigos de `variant` deixaram de existir. Por isso é `major`.

---

## 5. Exemplos

```tsx
<Badge tone="success">Vigente</Badge>
<Badge tone="warning">A vencer</Badge>
<Badge tone="danger">Vencido</Badge>
<Badge tone="neutral">Desconhecido</Badge>

// Etiqueta (tag) uppercase com ícone
<Badge tone="success" shape="rounded" className="uppercase tracking-wide">
  <ShieldCheck className="size-3" /> INMETRO
</Badge>

// Preenchido (CTA-like)
<Badge appearance="solid" tone="primary">Novo</Badge>
```

---

## 6. Guia de adoção — substituindo badges ad-hoc no app

O app tem badges soft reimplementados à mão. Correspondência:

| Local / string crua                                                        | Substituir por                                        |
|----------------------------------------------------------------------------|-------------------------------------------------------|
| `CalibrationBadge` (`bg-emerald-500/10 text-emerald-600 border-emerald-500/30`) | `<Badge tone="success">` (valid) / `warning` / `danger` / `neutral` |
| `specifications-page` StatusBadge (`bg-green-100 text-green-700`)          | `<Badge tone="success">Vigente</Badge>` / `tone="danger"` (Revogada) |
| `method-versions-dialog` (`bg-emerald-500/15 ... rounded-md uppercase`)    | `<Badge tone="success" shape="rounded" className="uppercase tracking-wide">` |
| `analysis-group-form-fields` INMETRO (rounded-md uppercase + ícone)        | `<Badge tone="success" shape="rounded" className="uppercase">` + ícone no children |
| `customer-addresses-fields` "Padrão"                                       | `<Badge tone="neutral">` ou `tone="primary"`          |
| `customers-page` tipo / "Inadimplente"                                     | `<Badge tone="neutral">` (tipo) / `<Badge tone="danger">Inadimplente</Badge>` |

O **mapeamento status → tone/label** continua no app (domínio). O Badge é só o primitivo visual.

Relacionado: `StatusIndicator` (bolinha de status pulsante) é um primitivo
separado, permanece inalterado.

---

## 7. Notas de tema

Depende de `@custom-variant dark (&:where(.dark, .dark *))` em `src/styles/globals.css`
para os overrides `dark:` (paleta emerald/amber/blue) responderem à classe `.dark`.
