---
"@victorzix/controlbio-ui": major
---

Badge: reescrita da API para os eixos `appearance` × `tone` + `shape` (BREAKING).

- `appearance`: `soft` (default) | `solid` | `outline`.
- `tone`: `neutral` (default) | `primary` | `success` | `warning` | `danger` | `info` — combinável com qualquer `appearance`.
- `shape`: `pill` (default, rounded-full) | `rounded` (rounded-md, etiqueta).
- Estilo padrão passou a ser soft/tonal (o usado no app); elemento raiz mudou de `<div>` para `<span>`.
- Adiciona `@custom-variant dark` em `globals.css` para os utilitários `dark:` responderem à classe `.dark`.

Migração: `variant="default"` → `appearance="solid" tone="primary"`; `variant="secondary"` → `appearance="solid" tone="neutral"`; `variant="success"|"warning"` → `tone` correspondente; `variant="destructive"` → `tone="danger"`; `variant="outline"` → `appearance="outline"`. Ver `docs/badge.md`.
