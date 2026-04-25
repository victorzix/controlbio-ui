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

### Fluxo correto de versão (NUNCA quebrar esse fluxo)

1. Ao finalizar um conjunto de mudanças, criar o arquivo `.changeset/<nome-descritivo>.md`:
   ```md
   ---
   "@victorzix/controlbio-ui": minor | major | patch
   ---
   Descrição das mudanças.
   ```
2. Commitar o arquivo `.changeset/*.md` junto com o código e fazer push
3. O `changesets/action` no CI detecta e abre automaticamente o PR "Version Packages"
4. Revisar e mergear o PR — o CI faz o bump de versão, atualiza o CHANGELOG e publica no GitHub Packages automaticamente

### Proibido
- NUNCA rodar `npx changeset version` localmente — isso bypassa o PR de release e quebra o histórico
- NUNCA commitar diretamente alterações em `version` do `package.json` para fins de release
- NUNCA rodar `npm run release` (changeset publish) manualmente em produção

### Classificação semver
- `patch` — bugfix, ajuste visual, correção de tipo
- `minor` — novo componente, nova prop, nova variante (sem breaking change)
- `major` — breaking change em API existente (renomear prop, remover componente, mudar comportamento padrão)

### Publicação
- Pacote: `@victorzix/controlbio-ui`
- Registry: GitHub Packages (`https://npm.pkg.github.com`)
- Escopo vinculado ao owner do repo (`victorzix`) — para mudar o escopo é preciso criar org correspondente no GitHub
