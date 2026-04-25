# @controlbio/ui

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
