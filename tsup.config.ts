import { defineConfig } from "tsup";

export default defineConfig({
  // Entry point da lib
  entry: ["src/index.ts", "src/styles/globals.css"],
  // Gera ESM e CJS
  format: ["esm", "cjs"],
  // Gera arquivos .d.ts
  dts: true,
  // Divide chunks por módulo (melhor tree-shaking)
  splitting: false,
  // Source maps para debugging
  sourcemap: true,
  // Limpa dist antes de cada build
  clean: true,
  // React e react-dom são peerDeps, não bundleia
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.conditions = ["style"];
  },
});