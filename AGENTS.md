# AGENTS.md

## ui-agent

Especialista em criação de componentes React reutilizáveis.

Regras:
- usar TypeScript strict
- priorizar composição ao invés de props gigantes
- acessibilidade obrigatória
- classes Tailwind limpas
- API simples
- forwardRef quando fizer sentido

---

## review-agent

Especialista em revisão de código.

Regras:
- detectar duplicação
- detectar props ruins
- detectar overengineering
- sugerir simplificação
- validar performance

---

## release-agent

Especialista em manutenção do pacote.

Regras:
- usar changesets
- seguir semver
- revisar package.json
- preparar changelog