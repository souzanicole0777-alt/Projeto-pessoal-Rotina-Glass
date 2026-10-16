# Rotina Glass 5.7.3 — planejamento Canadá e ajustes autorizados

O planejamento enviado foi incluído no HTML oficial, com nove etapas (0–8), 38 blocos e 280 itens de checklist. O aplicativo continua em um único HTML, offline, com a mesma chave de armazenamento e versão de dados 5.5.0.

## Uso

Na aba Canadá, selecionar **Aplicar planejamento do Canadá**, revisar o destino de cada etapa atual e confirmar. Etapas com nomes personalizados exigem escolha de destino. A atualização do site não substitui automaticamente o planejamento do aparelho. Depois da aplicação, exportar o backup normal em Configurações para transferir os dados a outro aparelho.

O conteúdo foi conferido integralmente contra o texto enviado: 540 linhas de conteúdo, cinco tabelas e os 280 textos de checklist preservados. Custos, previsões e referências permanecem conforme o documento; não foi feita validação da vigência das regras ou dos preços. Nenhum vencimento foi inventado. As orientações explicam as frentes paralelas e o início antecipado da documentação do casal.

## Implementação e preservação

- Etapas e blocos recolhíveis; orientações, custos e histórico disponíveis dentro de cada etapa.
- Prévia revisável das correspondências entre as etapas antigas e as novas.
- Cópia local completa verificada antes da aplicação; restauração em caso de falha de gravação.
- Tarefas existentes transferidas uma única vez, mantendo IDs, conclusões, checklists, notas, prazos e dependências.
- Títulos, estados e demais metadados das etapas antigas preservados no histórico, sem copiar novamente suas tarefas.
- Vínculos de Documentos e Notas ativos e na lixeira, Metas e acompanhamento dos Pets transferidos ao destino correto.
- Identidades internas positivas preservam a compatibilidade; os números exibidos são 0–8, inclusive no Calendário, Dashboard e seletores relacionados.
- Bloqueio de aplicação repetida, de prévia desatualizada, de colisões, de dependências inválidas e de operações que truncariam dados.
- Cursos, cidades, reserva, lançamentos financeiros e outros registros permanecem na fonte de dados existente. Não foram criados lançamentos ou registros duplicados nesses módulos.

Etapas antigas com progresso passam para **Em andamento** porque recebem novos blocos pendentes. As tarefas concluídas continuam concluídas e o estado anterior da etapa permanece no histórico.

## Três ressalvas atendidas

- Lista de módulos recolhível e independente em todos os cursos, com preferência local de abertura; o recolhimento interno das disciplinas foi mantido.
- Card de empréstimo/financiamento adaptado ao celular, preservando valores, operações e cálculos.
- Botão de inclusão do inglês oculto quando as 152 aulas já existem; volta a aparecer se faltar conteúdo.

## Validação

Foram aprovados 67 testes da transformação e preservação, 23 testes de navegador para o Canadá, seis verificações do PWA offline, cinco de atualização do PWA e 15 testes das três ressalvas: **116 verificações aprovadas**.

Incluem criação, edição, conclusão, checklist, exclusão com confirmação, vínculos ativos/lixeira, dependências, cancelamento, reaplicação, prévia desatualizada, falhas simuladas de cópia/gravação, persistência, exportação/importação nativa, calendário, notas, telas de 320/390 px e ausência de erros JavaScript. O financiamento também foi verificado em desktop e 768 px. A atualização real do cache 5.7.2 para 5.7.3 preservou os registros e manteve o funcionamento offline após fechar e reabrir o navegador.

JavaScript, geração da edição web e consistência do diff também foram verificados. Foram usados somente dados sintéticos nos testes. Nenhum backup pessoal foi publicado.

As correções ficaram limitadas ao novo fluxo do Canadá e às três ressalvas autorizadas. Não houve alteração de cálculos financeiros, migrações, regras de negócio ou funcionalidades de outros módulos.
