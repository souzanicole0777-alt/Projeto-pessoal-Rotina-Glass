# Rotina Glass — revisão de Finanças e ressalvas visuais

Versão do aplicativo: **5.7.0**. Versão dos dados mantida: **5.5.0**.
Base exclusiva: `rotina-glass-revisado.html` (5.6.3).
Arquivo atualizado: `rotina-glass-financas.html`.

## Implementado

- Canadá: ícone de folha de bordo; gráfico substituído por linha do tempo visual, com etapas, datas, estados, filtros e atalhos existentes. Datas estimadas continuam identificadas e não são gravadas como prazos reais.
- Dashboard: removido o card Resumo de Metas e seu processamento específico. Metas, valores guardados e integrações permanecem nos módulos correspondentes.
- Finanças: quatro áreas principais — Resumo, Receitas, Despesas e Reserva do Canadá — com um único seletor de mês compartilhado.
- Resumo somente para consulta: saldo anterior/inicial, receitas do mês, despesas do mês e saldo previsto, além do resultado mensal descrito em uma frase. A posição atual da conta e o dinheiro realmente disponível ficam em uma seção recolhível separada.
- Histórico automático com receitas, despesas, parcelas, movimentações de reservas e pagamentos de fatura. Filtros por tipo, origem, situação, categoria e pesquisa; os filtros não alteram os totais mensais. Os primeiros 60 registros são exibidos inicialmente e o botão Mostrar mais permite consultar todos.
- Receitas: formulário de entrada com tipo fixado, recebimentos, edição, exclusão e gerenciamento de receitas recorrentes.
- Despesas: cartões de crédito, cartões de lojas, empréstimos e financiamentos, despesas fixas e variáveis. Compras parceladas fora do cartão ficam junto das variáveis, em seção recolhível.
- Cartões e empréstimos mostram as faturas/parcelas com vencimento no mês selecionado. Valores diferentes por parcela continuam disponíveis.
- Reserva: total acumulado, movimentações do mês, meta em reais e uso dos formulários existentes de aporte e retirada, com data.
- Planejamento, relatórios, categorias, lixeira e configuração do saldo inicial permanecem em Ferramentas financeiras.

## Dados e cálculos

- Mesma chave de localStorage, persistência, cópias de proteção, migrações, exportação e importação de backup.
- Nenhum lançamento é copiado para construir o histórico: os valores vêm dos registros originais.
- Compras e parcelas de cartão entram nas despesas pelo vencimento da fatura. Pagar a fatura altera o saldo bancário, sem somar a despesa novamente.
- Aportes e retiradas são movimentações de reserva; não são receitas/despesas. O saldo bancário continua incluindo o dinheiro reservado, conforme a regra anterior.
- Saldo previsto do mês = saldo anterior/inicial + receitas − despesas do período. Não é apresentado como dinheiro já recebido ou disponível hoje.
- Cartões antigos sem classificação continuam em Cartões de crédito. É possível editar apenas o tipo para movê-los a Cartões de lojas, preservando identificadores, compras, faturas e pagamentos. A classificação é um campo opcional validado e incluído no backup.
- Os cálculos do motor financeiro foram preservados integralmente. Sua única extensão é a validação da classificação opcional dos cartões.

## Limpeza segura

Removidos o gráfico e seus estilos/cálculos de apresentação exclusivos, o card de Metas do Dashboard e seu renderizador específico, o painel informativo da reserva que estava oculto em Metas, a ramificação sem uso do antigo resumo de documentos, o botão flutuante de lançamentos e os estilos exclusivos do Resumo anterior.

O formulário duplicado de aporte foi substituído pelo formulário já existente em Metas. Foram mantidos os dados e as funções compartilhadas necessárias a outras áreas. A limpeza não remove registros financeiros, documentos nem metas.

## Testes

- 30 verificações do motor financeiro: arredondamento, parcelas iguais/diferentes, fechamento/vencimento de cartão, recorrências, pagamentos sem duplicidade, planejamento por mês, saldo inicial, lixeira e normalização/backup.
- 41 casos de navegador: criação, edição, recebimento/pagamento, exclusão confirmada, restauração, parcelas por mês, separação dos cartões, filtros e pesquisa, reserva compartilhada, persistência após recarga, exportação e importação real de JSON, rejeição de backup inválido e reversão de alteração diante de falha de armazenamento.
- Comparação com o HTML-base dos dados carregados, cálculos financeiros, eventos do Calendário e estatísticas de Estudos. Também foi conferida a identidade das funções de carga, salvamento, exportação, validação de backup e resumo financeiro do Dashboard.
- Interface validada em larguras de 320, 375, 768 e 1440 pixels; linha do tempo e ações por teclado verificadas; nenhuma rolagem horizontal da página nas áreas testadas.
- 40 alternâncias repetidas entre Dashboard e Finanças sem duplicação de dados ou elementos principais.
- Execução offline, sem requisições externas e sem erros de JavaScript nas verificações. Sintaxe JavaScript validada.

## Ajustes feitos durante a validação

- Mantido o mês correto da fatura após registrar compras, inclusive quando o vencimento cai no mês seguinte.
- Atualização da listagem após salvar um lançamento em outro mês.
- Inclusão da data ISO nos itens de leitura da reserva para o filtro mensal funcionar corretamente.
- Preservação das seções de parcelas e séries abertas durante operações financeiras.
- Remoção de um manipulador residual de clique ao trocar da listagem antiga para as novas áreas, evitando acionamentos duplicados.

## Fora do escopo e limites

Não foram identificados novos problemas fora do escopo nas comparações de compatibilidade executadas; não foi realizada uma auditoria completa dos demais módulos. Não houve mudança nas regras de Estudos, Canadá, Calendário, Pets, Notas, Documentos ou Metas.

Os testes usam dados de verificação, pois o arquivo HTML não contém os dados pessoais armazenados no navegador da usuária. A validação de navegador ocorreu no Chromium com conteúdo servido localmente por interceptação, com a rede desativada. O aplicativo entregue continua sendo um único HTML autônomo.

## Como usar

Extraia `rotina-glass-financas.html` do ZIP. Para continuar usando o armazenamento local associado ao arquivo anterior, substitua seu HTML mantendo o mesmo nome e local que você já utiliza, no mesmo navegador. O relatório acompanha o HTML no ZIP.
