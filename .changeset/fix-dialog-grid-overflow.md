---
"@victorzix/controlbio-ui": patch
---

Corrige o `DialogContent`: era `display: grid` com uma única track implícita, cujo item-filho tem `min-width: auto` por padrão — então um `MultiSelect` com muitos rótulos longos selecionados (mesmo já truncando corretamente em si) ainda forçava o item de grid a crescer além da largura do diálogo, empurrando-o pra fora da tela. Define `grid-template-columns: minmax(0, 1fr)` (`grid-cols-[minmax(0,1fr)]`) para dar à única track um mínimo explícito de `0`, deixando o conteúdo truncar/quebrar dentro dos limites do diálogo em vez de estourá-lo. Corrige em conjunto com o fix do `MultiSelect` (patch anterior) — os dois eram necessários: um sem o outro não resolvia o overflow por completo.
