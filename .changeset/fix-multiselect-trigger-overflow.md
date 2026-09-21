---
"@victorzix/controlbio-ui": patch
---

Corrige o `MultiSelect`: o `<span>` de texto do trigger era filho direto de um container `flex` sem `min-w-0`, então com múltiplos rótulos longos selecionados ele recusava encolher e empurrava o botão (e o diálogo pai) pra fora do layout em vez de truncar com reticências. Adiciona `min-w-0 flex-1` ao span, alinhando com o mesmo padrão já usado no item da lista de opções.
