# Rotina Glass — Fase 10: Central de Notas

**Aplicação e dados: 5.4.0.** Base: `rotina-glass-fase9.html` anexado pela usuária. Especificação: Bíblia V1.1, seção 26 e integração contextual da seção 40. O HTML da Fase 9 permanece intacto. A aplicação atualizada continua em um único HTML, offline, com os componentes e modais existentes.

## Funcionalidades implementadas

- Criar e editar notas independentes ou vinculadas, com título, conteúdo em texto simples, tags, datas de criação/atualização, fixação e arquivamento.
- Pesquisa local por título, conteúdo, tags e identificação da origem, sem distinguir acentos; filtros por tag, tipo e item vinculado. A busca global da Fase 11 não foi implementada.
- Fixar/desfixar, arquivar/desarquivar, alterar vínculo e desvincular. Notas fixadas aparecem primeiro; arquivadas ficam em uma visão própria.
- Exclusão confirmada, desfazer imediato, lixeira persistente, restauração completa e exclusão definitiva com nova confirmação. Identificadores conflitantes impedem restauração e preservam o item na lixeira.
- Formulários com labels, funcionamento em celular e desktop, texto tratado como texto e atividade recente baseada em ações reais.
- Salvamento com conferência de leitura e reversão em falha. Conteúdo e campos legados maiores são preservados quando não editados.

## Integrações realizadas

As notas podem apontar para **curso, disciplina, aula/tarefa, Canadá, fase do Canadá, meta, Finanças, documento, pet e evento do Calendário**. Em Finanças, também podem apontar para lançamento, cartão, parcelamento, empréstimo ou recorrência.

Os painéis de origem permitem consultar notas vinculadas e criar uma nota já contextualizada. “Abrir origem” usa os formulários e a navegação existentes. Canadá e Finanças oferecem uma consulta agregada das notas de seus registros.

`appData.notes` é a única fonte das notas; os vínculos usam identificadores e consultam os registros originais. A remoção de uma origem mantém a referência recuperável, sem oferecer um botão de abertura fictício. Restaurar a origem reconecta a consulta. Nenhum item do Calendário, despesa ou registro de outro módulo é duplicado.

## Persistência, migrações e backup

A chave `ROTINA_GLASS_PREMIUM_DATA` foi mantida. A migração 5.3 → 5.4 cria e confere uma cópia de proteção antes de gravar; as etapas anteriores e suas proteções foram preservadas. Backups 5.0, 5.1, 5.2 e 5.3 continuam compatíveis.

Exportação/importação inclui conteúdo, tags, fixação, arquivamento, vínculos e lixeira. Importação conserva validação, confirmação, cópia de proteção e reversão em falha. Campos desconhecidos e dados legados são preservados. O motor financeiro entre `FIN-BEGIN` e `FIN-END` permanece idêntico ao HTML oficial.

## Testes executados

Resultado final: **16 cenários funcionais e 20 testes de dados aprovados** no Chromium offline.

- Criação, edição de todos os campos, pesquisa, filtros, ordenação, fixação e arquivamento.
- Os dez tipos de vínculo e os cinco tipos de registro financeiro; abertura real das origens, criação contextual, desvinculação e origem removida/restaurada.
- Exclusão cancelada/confirmada, desfazer, lixeira, restauração, conflito de identificadores e exclusão definitiva.
- Atualização da página e fechamento/reabertura reais do navegador, mantendo os dados.
- Exportação e importação JSON reais, incluindo flags, vínculos, lixeira e preservação dos demais módulos.
- Migrações e backups 5.0–5.4, idempotência, cópias de proteção, colisões de chaves, dados inválidos e versões futuras.
- Falhas de quota, gravação descartada e leitura divergente; reversão das notas, da atividade e do armazenamento anterior.
- Quebras de linha LF/CRLF/CR, tags legadas especiais, campos desconhecidos e textos HTML/script sem execução.
- Desktop e celular de 375 px, ausência de rolagem horizontal, labels, foco e Escape.
- Sintaxe JavaScript, arquivo único, ausência de dependências externas obrigatórias e identidade do motor financeiro.

Nos cenários executados: **zero erros JavaScript inesperados e zero requisições externas**. Limitação: o navegador gerenciado bloqueia `file://`; o HTML local foi servido por interceptação com o navegador offline, sem servidor ou rede. A abertura direta pelo sistema de arquivos não foi executada neste ambiente.

## Erros corrigidos na própria Fase 10

- Edição podia remover a primeira quebra de linha e normalizar texto CRLF/CR ou tags legadas. O formulário agora preserva os valores originais quando esses campos não são alterados.
- “Abrir origem” de uma fase do Canadá não trocava para a aba correta. A navegação agora abre o Canadá antes de selecionar a fase.
- Uma gravação silenciosamente descartada ou divergente podia parecer bem-sucedida. O salvamento agora confere o conteúdo persistido e restaura o estado anterior em falha, comunicando quando não consegue confirmar a restauração.
- Datas legadas inválidas agora recebem indicação legível nos cartões e na lixeira, sem exibir `Invalid Date`.

## Problemas anteriores fora do escopo — não corrigidos

- Estudos: o editor de checklist procura um identificador de contêiner diferente do usado pelos formulários.
- Estudos: falha de armazenamento ao criar disciplina pode deixá-la em memória apesar da mensagem de reversão.
- A aplicação restaura a última aba salva, em vez de sempre abrir o Dashboard.

## Entrega

HTML completo: **`rotina-glass-fase10.html`**. Relatório: **`relatorio-fase10.md`**. As entregas das Fases 8 e 9 são mantidas no repositório. Nenhuma fase futura foi implementada.
