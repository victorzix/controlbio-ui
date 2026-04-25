# @controlbio/ui

## 0.2.0

### Minor Changes

- Adiciona componente Button com suporte a variantes, ícones e loading.

  - Variantes: primary, secondary, ghost, outline, destructive, link
  - Tamanhos: sm, md, lg, icon
  - Props: leftIcon, rightIcon, isLoading, loadingText
  - Acessibilidade: forwardRef, aria-busy, cursor-not-allowed no disabled
  - Design tokens com suporte a light e dark mode via CSS custom properties

- ef30ad2: Setup da infraestrutura de lib: tsup para build, GitHub Packages para publicação, CI de release com changesets.
