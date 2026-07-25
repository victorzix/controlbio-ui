---
"@victorzix/controlbio-ui": minor
---

Os botões `DialogCancelButton` e `DialogConfirmButton` agora delegam ao `Button` da lib e expõem os eixos `tone`/`variant`. Isso permite a confirmação destrutiva (`tone="destructive"`) sem colar classes Tailwind inline, eliminando a duplicação nos diálogos de exclusão/inativação/revogação. Os padrões (`variant="outline"` no cancelar, `variant="solid"` + `tone="primary"` no confirmar) preservam a aparência anterior.
