---
"@victorzix/controlbio-ui": major
---

Button: reescrita da API para o eixo `tone` × `variant` (BREAKING).

- `variant` agora é só a forma: `solid | outline | ghost | link`.
- Novo `tone` para a cor/intenção: `neutral | primary | destructive` (combinável com qualquer `variant`).
- Novos `size`s: `xs`, e os de ícone `icon-xs` (24px) e `icon-sm` (32px).
- Nova prop `fullWidth`.
- Nova prop `asChild` (polimorfismo via Radix Slot — renderiza `<a>`/`<Link>` com aparência de botão).
- Tom neutro de `ghost`/`outline` passou a usar `muted` no hover.

Migração: `variant="primary"` → default (ou `tone="primary"`); `variant="secondary"` → `tone="neutral"`; `variant="destructive"` → `tone="destructive"`; `variant="ghost"|"outline"` → mesmo `variant` + `tone="neutral"`. Ver `docs/button.md`.
