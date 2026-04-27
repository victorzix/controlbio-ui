# @controlbio/ui

## 0.5.0

### Minor Changes

- b6f860f: Adicionado componente de Badge com suporte a variantes de status (Primary, Secondary, Success, Destructive) e estilo integrado à identidade visual da ControlBio.
- bfa914c: Adicionado componente de Card modular para organização de conteúdo e layouts de dashboard, integrado com a identidade visual da marca.
- d8b2595: Adicionado componente de Dialog (Modal) baseado em Radix UI com suporte a composição flexível, incluindo botões de ação especializados e controles de responsividade. Melhorado MaskedInput com suporte a prefixos estáticos.
- 16a2943: Adicionado sistema de notificações (Toast) utilizando a biblioteca `sonner`, com suporte a temas e estados de sucesso, erro, info e aviso.

### Patch Changes

- 42dbc4d: Adicionada variante `warning` ao componente Badge e criado o componente `StatusIndicator` com efeito de pulso para sinalização de estados (neutral, success, warning, destructive).
- 12d6c8e: Refinado componente de Toast com suporte a ícones nativos e controles aprimorados no Storybook.
- 3527873: Configurada a identidade visual da ControlBio: paleta de cores oficial, fontes personalizadas (BlauerNue) e branding no Storybook.

## 0.4.0

### Minor Changes

- Adiciona RichTextEditor e token de radius configurável.

  - RichTextEditor: editor TipTap com toolbar completa (bold, italic, strike, code, h1, h2, listas, citação, bloco de código, undo/redo), suporte a label/error/hint/required/disabled, uso controlado via value+onChange
  - globals.css: token --radius (padrão 0.5rem) mapeado para --radius-sm/md/lg/xl via @theme inline — consumer sobrescreve com uma linha no CSS do projeto
  - Estilos ProseMirror integrados aos tokens de cor e radius

## 0.3.0

### Minor Changes

- Adiciona componentes de input: Input, Textarea e MaskedInput.

  - Input: label, hint, error, leftElement, rightElement, required, forwardRef, aria completo
  - Textarea: auto-resize via react-textarea-autosize, minRows/maxRows, mesma API do Input
  - MaskedInput: wraper do react-imask com mesma API — masks prontas para telefone, CPF, CNPJ, CEP, data e moeda
  - Instala react-textarea-autosize, react-imask, @tiptap/react, @tiptap/pm, @tiptap/starter-kit

## 0.2.0

### Minor Changes

- Adiciona componente Button com suporte a variantes, ícones e loading.

  - Variantes: primary, secondary, ghost, outline, destructive, link
  - Tamanhos: sm, md, lg, icon
  - Props: leftIcon, rightIcon, isLoading, loadingText
  - Acessibilidade: forwardRef, aria-busy, cursor-not-allowed no disabled
  - Design tokens com suporte a light e dark mode via CSS custom properties

- ef30ad2: Setup da infraestrutura de lib: tsup para build, GitHub Packages para publicação, CI de release com changesets.
