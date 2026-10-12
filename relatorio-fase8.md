# Rotina Glass — entrega da Fase 8: Documentos

Aplicação e dados: **5.2.0**. A implementação parte do HTML oficial `rotina-glass-fase7-etapa7 (1).txt`, após leitura completa desse arquivo e da Bíblia V1.1. Os anexos originais foram preservados. O aplicativo continua em um único HTML, com CSS e JavaScript incorporados e sem dependências externas obrigatórias.

## Implementação

- Cadastro e edição de nome, categoria, status, emissão, validade, observação, link externo, tags, módulo relacionado e fase do Canadá.
- Categorias oficiais: Educação, Experiência, Idiomas, Imigração, Financeiro, Pets, Pessoal e Outros. Categorias personalizadas anteriores continuam disponíveis.
- Estados Válido, Vencendo, Vencido, Pendente e Sem validade. A validade calcula os estados por dia local; Vencendo compreende hoje e os próximos 30 dias. Pendente indica documento ainda não obtido. Alertas de validade consideram as datas, inclusive em documentos pendentes.
- Pesquisa local por nome, categoria, observação, link, tags e fase; filtros por categoria, estado e fase, com limpeza dos filtros e contagem real.
- Resumos dos cinco estados e mensagens para listas vazias e filtros sem resultados.
- Links HTTP(S) separados do cadastro local, abertos em outra aba com proteção `noopener noreferrer`. Nenhum botão de anexo local foi criado.
- Exclusão por identificador estável, com confirmação; desfazer imediato; lixeira persistente; restauração do registro completo e vínculos; exclusão definitiva com nova confirmação. Não há expiração silenciosa da lixeira.
- Salvamento automático das operações; reversão de documentos, lixeira e atividade se o armazenamento falhar.
- Registro das ações reais na atividade recente já existente.
- Formulários com labels, mensagens de validação, navegação por teclado e reaproveitamento do modal acessível existente; layout adaptado a celular e desktop.
- Atualização das informações de validade ao mudar o dia e ao retornar à janela.

## Integrações

Todas consultam `appData.documents`; nenhuma cria documentos ou eventos duplicados.

| Integração | Comportamento |
| --- | --- |
| Canadá | Cada uma das 14 fases mostra seus documentos vinculados, mesmo sem tarefas. Permite cadastrar já vinculado, abrir o documento e retornar à fase. |
| Calendário | Validades são eventos automáticos calculados para a janela exibida, nas visões mensal, anual e lista. Conservam origem e botão para abrir o documento. A preferência “Validades de documentos” permite ocultá-los. |
| Dashboard | Total e resumo dos documentos, estados reais, documentos recentes e validades de hoje/próximas datas. As demais fontes do Dashboard foram preservadas. |
| Alertas | Documentos vencidos e vencendo, ordenados por validade, com origem e ação para abrir o registro. Não foi implementado um módulo geral de alertas de fases futuras. |

Editar, excluir ou restaurar o registro atualiza essas consultas. Exclusão remove suas informações derivadas; restauração recupera os vínculos sem recadastro.

## Persistência, migração e backup

- A chave existente `ROTINA_GLASS_PREMIUM_DATA` foi mantida.
- Migração estruturada 5.1 → 5.2: cria e confere uma cópia de proteção antes de atualizar a chave principal. Se não puder proteger/gravar/conferir, mantém a versão anterior e bloqueia gravações sobre o original.
- A migração financeira 5.0 → 5.1 foi preservada. Dados anteriores recebem a adaptação documental no fluxo existente.
- Documentos antigos sem identificador recebem IDs estáveis. `Pronto` é adaptado, com o status original retido em `legacyStatus`. Categorias antigas e campos desconhecidos não são descartados.
- Links ou datas antigos incompatíveis são preservados como dados legados, sem executar conteúdo.
- Exportação existente inclui documentos completos e a nova lixeira. A validação/restauração foi ampliada somente para preservar esses campos e blocos.
- Importação mantém a proteção anterior, confirmação de substituição, verificação e reversão em caso de falha. Backups de versão futura são recusados.
- O motor financeiro entre `FIN-BEGIN` e `FIN-END` foi comparado com a base e permanece idêntico.

## Testes executados

Resultado: **16 cenários funcionais, 13 testes da camada de dados e 6 verificações visuais/interativas aprovados**. Nenhuma falha final, erro JavaScript inesperado ou requisição externa nos cenários funcionais.

Os 16 cenários funcionais em Playwright/Chromium offline:

1. Inicialização, versionamento, estado vazio e navegação nas nove abas existentes.
2. Criação/edição de todos os campos, validações, filtros, link longo e preservação dos dados dos outros módulos.
3. Estados automáticos, datas locais, validade passada, hoje, 30 dias e 31 dias.
4. Canadá, Calendário, Dashboard e Alertas consultando o mesmo registro e abrindo sua origem.
5. Cancelamento/confirmar exclusão, desfazer, lixeira, restauração, exclusão definitiva e remoção das informações derivadas.
6. Exportação JSON e importação real, preservando todos os campos, IDs e lixeira.
7. Carregamento e importação de dados 5.1, incluindo documentos legados e categorias personalizadas.
8. Migração financeira 5.0 e adaptação dos documentos, mantendo a reserva do Canadá.
9. Rejeição de backups documentais inválidos e versões futuras, sem substituir dados atuais.
10. Falhas de armazenamento ao criar, editar, excluir, restaurar e excluir definitivamente: dados, lixeira e atividade revertidos.
11. Falha de armazenamento na importação: estado e conteúdo anterior preservados.
12. Migração documental pura preservando campos desconhecidos e todos os demais blocos; cópia de proteção divergente impede gravação.
13. Falha da migração na abertura: conteúdo anterior intacto, versão mantida e novas gravações bloqueadas.
14. Conteúdo HTML/script tratado como texto e labels dos campos conectados corretamente.
15. Lista e formulário em celular de 375 px, sem ultrapassar a largura da tela.
16. Fechamento e reabertura reais do Chromium com perfil persistente: documentos e lixeira conservados.

Os 13 testes da camada de dados:

1. Normalização de legados com textos, tags, URLs longos e campos desconhecidos.
2. Normalização idempotente e IDs únicos/estáveis, inclusive para IDs legados duplicados.
3. Links inseguros e datas inválidas preservados como texto inerte.
4. Campos legados existentes não sobrescritos durante recuperação de outro valor.
5. Lixeira conservando documento completo, data, posição e campos desconhecidos.
6. Aceitação do backup legado e validação do esquema/lixeira atuais.
7. Migração pura restrita a Documentos, lixeira e metadados de versão.
8. Cópia verificada e atualização da versão apenas após sucesso.
9. Falha ao criar a cópia: original e versão intactos.
10. Falha ao gravar a chave principal: original e proteção preservados.
11. Leitura divergente após gravação: restauração do original.
12. Estrutura documental inválida: migração interrompida sem alterar o original.
13. Colisão de nome de cópia: a proteção anterior é mantida e outra chave é usada.

As 6 verificações complementares: criação no celular de 390 px; alerta “vence hoje”; ausência de rolagem horizontal; visual desktop de 1440 px; foco inicial do formulário; fechamento pelo Escape. Capturas foram inspecionadas. Também foram verificadas a sintaxe JavaScript, a existência de apenas um script incorporado, a ausência de fontes externas obrigatórias e a identidade do motor financeiro.

Limite da validação: o Chromium gerenciado deste ambiente bloqueia navegação `file://` por política. Os testes receberam o HTML local por interceptação do navegador, com conexão offline; não dependeram de servidor ou rede. A abertura direta do arquivo em navegador pessoal não foi executada aqui.

## Erros corrigidos na Fase 8

- O helper de links do Canadá truncava URLs em 500 caracteres: Documentos passou a usar validação sem truncamento, com limite explícito de 2048 no novo formulário; links antigos completos são preservados.
- O formulário podia exibir um status antigo apesar de a validade já ter mudado: abertura e gravação agora usam a classificação calculada, preservando a escolha Pendente.
- O aviso de bloqueio documental mencionava a migração de Finanças: foi substituído pelo aviso específico de Documentos.
- O importador antigo conservaria apenas título/categoria/status e perderia os novos campos: a validação/restauração documental agora conserva o registro completo e a lixeira.
- A exclusão anterior era definitiva e usava posição na lista: Documentos usa identificadores estáveis e recuperação persistente, com reversão das operações em falha de gravação.

## Problemas anteriores fora do escopo — não corrigidos

Confirmados por execução na base oficial:

- **Estudos, checklist:** os formulários usam `checklistItemsContainer`, mas o renderizador procura `checklistEditorContainer`. Itens existem em memória, porém não aparecem no editor.
- **Estudos, criação de disciplina:** uma falha de armazenamento pode deixar a disciplina em memória, apesar de a mensagem afirmar que a alteração foi desfeita.

Diferenças já existentes em relação ao Manual, constatadas por inspeção e preservadas nesta entrega:

- A inicialização restaura a última aba salva, em vez de sempre abrir o Dashboard.
- Backup oferece substituição; a opção de mesclar ainda não existe.
- Temas atuais são claro/escuro; temas sazonais ficam fora da Fase 8.
- Exclusões de metas/aportes pelo módulo Metas e tarefas do Canadá não têm a recuperação documental implementada nesta fase.
- Hoje/Próximos Eventos do Dashboard ainda não agregam todas as fontes automáticas de outros módulos. Nesta fase foram acrescentadas somente as validades de Documentos.

## Arquivo de entrega

`rotina-glass-fase8.html` é o aplicativo completo atualizado. O relatório e os testes são arquivos auxiliares e não são necessários para executá-lo. Nenhuma fase futura foi implementada. O HTML e este relatório foram enviados, com autorização da usuária, ao repositório `souzanicole0777-alt/Projeto-pessoal-Rotina-Glass`, na branch `main`. O envio ao GitHub disponibiliza os arquivos para download; o aplicativo continua local e offline, sem publicação de um site.
