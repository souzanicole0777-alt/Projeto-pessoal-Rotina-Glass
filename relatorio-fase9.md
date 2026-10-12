# Rotina Glass — Fase 9: Pets

**Aplicação e dados: 5.3.0.** Base oficial: o HTML `rotina-glass-fase8.html` anexado pela usuária. Especificação: exclusivamente a Bíblia V1.1, especialmente a seção 25 e suas integrações. O HTML anterior permanece intacto; o aplicativo atualizado continua em um único HTML, offline, sem backend ou dependências externas obrigatórias.

## Funcionalidades implementadas

- Aba Pets integrada à navegação e ao layout existentes. Começa vazia para cadastrar os dois gatos reais, sem inventar nomes ou criar um terceiro perfil. Novos cadastros ficam limitados a dois; dados legados e recuperações explícitas não são descartados.
- Cadastro e edição de nome, foto/avatar, sexo, nascimento, castração, microchip, identificação e observações.
- Foto local PNG, JPEG ou WebP: validação do arquivo e de seu conteúdo, redução para avatar de 256 × 256, armazenamento incorporado ao perfil e ao backup; remoção confirmada ao salvar. Arquivos de entrada até 5 MB; resultado reduzido até 100 KiB.
- Histórico editável de vacinas, vermífugos, antipulgas, consultas, medicamentos e procedimentos, com título, situação agendada/realizada, data, próxima data e observações. Registros incompletos podem ficar sem datas.
- Checklist individual editável para o Canadá, com os nove itens da Bíblia: microchip/identificação, vacinas, documentação, veterinário, transporte, caixa de transporte, preparação para viagem, requisitos de entrada e outros. Permite adicionar, editar, concluir, excluir e relacionar documentos; nenhum requisito migratório é tratado como regra permanente.
- Exclusões confirmadas, desfazer imediato, lixeira persistente para perfis, saúde e checklist, restauração e exclusão definitiva com nova confirmação. Excluir um perfil conserva os documentos e lançamentos financeiros originais.
- Salvamento automático, atividade recente baseada em ações reais, reversão das alterações se a gravação falhar, formulários com labels e uso dos modais acessíveis existentes.

## Integrações realizadas

| Integração | Resultado |
| --- | --- |
| Pets ↔ Calendário | Datas de saúde e próximas datas aparecem nas visões mensal, anual e lista, com origem e abertura do registro. Preferência para exibir/ocultar; não cria cópias em `appData.calendar`. |
| Pets ↔ Canadá | A fase 13 consulta o checklist original de cada gato, mostra progresso calculado e abre seu perfil. Não altera automaticamente o status da fase nem duplica tarefas. |
| Pets ↔ Documentos | Cadastro ou vínculo com documento existente, abertura nos dois sentidos, vínculo direto editável e compartilhamento pelo checklist. Exclusão documental mantém referências recuperáveis; restauração recupera a consulta. |
| Pets ↔ Finanças | Vínculo com saídas existentes ou criação pelo formulário financeiro já implementado. Valores e pagamentos vêm dos lançamentos/faturas originais; o mesmo lançamento conta uma vez por pet mesmo quando também vinculado à saúde. Há navegação nos dois sentidos e desvinculação sem apagar a despesa. |

Perfis e cuidados ficam em `appData.pets`; documentos e despesas continuam em suas coleções originais. A criação de uma despesa e seu vínculo são gravados juntos e revertidos juntos em falha. Despesas compartilhadas pelos gatos continuam sendo um único lançamento em Finanças.

## Persistência, migrações e backup

A chave `ROTINA_GLASS_PREMIUM_DATA` foi mantida. A migração 5.2 → 5.3 cria e confere uma cópia de proteção antes de gravar. As migrações anteriores foram preservadas e encadeadas, mantendo a última versão concluída quando uma etapa falha; a versão nova não é marcada sobre uma migração incompleta.

Backup inclui fotos, perfis, histórico, checklist, identificadores dos vínculos e os três tipos de lixeira. Importação mantém validação, confirmação, cópia de proteção e reversão em falha. Compatibilidade verificada com dados e backups 5.0, 5.1 e 5.2. Campos desconhecidos e dados legados são preservados. O motor entre `FIN-BEGIN` e `FIN-END` permanece idêntico à base oficial.

## Testes executados

**Todos aprovados:** 24 cenários funcionais no Chromium offline, 15 testes de dados/migrações, 12 testes financeiros e 7 verificações de interface.

- Cadastro dos dois gatos com todos os campos, edição, limite de criação, foto real, avatar, remoção e rejeição de arquivos inválidos.
- Os seis tipos de saúde, edição, datas opcionais, validação de próximas datas e persistência.
- Os nove itens iniciais do checklist, adição, edição, conclusão, exclusão confirmada e desfazer.
- Exclusão/recuperação de perfis e registros dependentes, lixeira persistente, exclusão definitiva e bloqueio de restauração com identificadores conflitantes.
- Calendário nas três visões, origem clicável, preferência, edição/remoção das datas e ausência de duplicação quando data e próxima data coincidem.
- Canadá com progresso real; documentos com vínculo direto/compartilhado, desvinculação, lixeira e restauração.
- Finanças com saída real, vínculo à saúde, despesa compartilhada, totais sem duplicação, edição na fonte, pagamento de fatura parcial/total e referências preservadas após remoção.
- Exportação JSON e importação real recuperando fotos, saúde, checklist, documentos, referências financeiras e todos os tipos de lixeira.
- Migrações 5.0 → 5.1 → 5.2 → 5.3, cópias verificadas, idempotência, campos legados/desconhecidos, backups inválidos e versões futuras.
- Falhas simuladas de armazenamento no cadastro, edição, checklist, exclusão, restauração, exclusão definitiva, importação, criação de despesa e vínculos: estado e dados anteriores preservados.
- Texto HTML/script tratado como texto, imagens raster grandes legítimas reduzidas e SVG disfarçado rejeitado.
- Atualização da página e fechamento/reabertura reais do navegador, mantendo perfis, fotos, saúde e checklist.
- Celular de 375/390 px, desktop de 1440 px, ausência de rolagem horizontal, foco do modal e fechamento pelo Escape. Sintaxe JavaScript e ausência de fontes externas obrigatórias verificadas.

Nos cenários executados: **zero erros JavaScript inesperados e zero requisições externas**. Limite da validação: o navegador gerenciado bloqueia `file://`; os testes receberam o HTML local por interceptação com conexão offline, sem servidor ou rede. A abertura direta em navegador pessoal não foi executada neste ambiente.

## Erros corrigidos na Fase 9

- Restauração podia introduzir identificadores de saúde/checklist já usados em outro perfil, prejudicando o próximo backup. A restauração agora reutiliza a validação completa antes de salvar e preserva o item na lixeira em conflito.
- A foto precisava validar o conteúdo antes da decodificação, além do MIME informado. A validação foi centralizada, sem rejeitar fotos legítimas de entrada maiores que o limite da foto já reduzida.
- A composição inicial tinha declaração duplicada da lista de tipos de saúde. Foi removida; todos os formulários reutilizam as constantes da camada de dados.
- Datas iguais de registro e próximo cuidado passam a produzir uma única entrada de calendário, mantendo o próximo cuidado identificável.
- O bloqueio de migração de Pets passou a exibir o aviso específico, em vez da mensagem financeira anterior.

## Problemas anteriores fora do escopo — não corrigidos

- Estudos: o editor de checklist procura um identificador de contêiner diferente do usado pelos formulários, deixando os itens invisíveis.
- Estudos: falha ao salvar uma nova disciplina pode deixá-la em memória apesar da mensagem de reversão.
- A base restaura a última aba salva, em vez de sempre abrir o Dashboard.
- Backup ainda oferece substituição, sem mesclagem; temas sazonais e a agregação completa de outras fontes no Dashboard permanecem fora desta fase.
- A recuperação implementada em Pets não modifica as exclusões anteriores de Metas e tarefas do Canadá.

## Entrega

Arquivo completo: **`rotina-glass-fase9.html`**. Relatório: **`relatorio-fase9.md`**. Entrega pelo repositório `souzanicole0777-alt/Projeto-pessoal-Rotina-Glass`, na branch `main`, seguindo a preferência da usuária. As entregas da Fase 8 são mantidas. Nenhuma fase futura foi implementada.
