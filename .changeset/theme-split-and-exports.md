---
"@victorzix/controlbio-ui": minor
---

Move default design tokens to `theme.css`, keep `globals.css` focused on Tailwind (`@theme`, fonts, base border). Remove the tsup CSS entry and the `./index.css` package export; align `exports` with ESM (`.mjs`) and CJS (`.js`) outputs. Storybook loads `theme.css` after `globals.css`.
