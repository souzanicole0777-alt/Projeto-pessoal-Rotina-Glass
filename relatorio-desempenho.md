# Rotina Glass — Auditoria e otimização de desempenho

**Aplicação 5.6.1 · Dados 5.5.0.** Base: `rotina-glass-fase12.html`, a última entrega desta conversa. Nenhuma nova fase foi implementada. HTML completo atualizado: `rotina-glass-otimizado.html`.

## Gargalos encontrados e correções

- **Reconstrução das abas:** conteúdo, calendário e gráficos agora são reutilizados quando permanecem válidos. Dados, filtros, meses, expansões, data/hora e tamanho da janela invalidam o cache. Configurações mantém seu preenchimento original a cada entrada.
- **Vínculos de notas recalculados por item:** índices temporários atendem uma renderização inteira e são descartados ao terminar. Alterações, importação, exclusão e restauração continuam consultando as fontes atuais.
- **Consultas repetidas ao armazenamento:** o indicador trabalha quando está visível, reúne solicitações do mesmo ciclo e compartilha a consulta de quota pendente. Os bytes locais continuam atualizados mesmo se a quota demorar.
- **Gravações idênticas:** o salvamento compara o conteúdo real da chave antes de repetir uma escrita. Gravações necessárias permanecem imediatas, com proteção e reversão preservadas. Chaves alteradas externamente continuam sendo reparadas.
- **Eventos duplicados em modais:** após 100 aberturas havia 101 manipuladores e 101 alterações de classe ao fechar. Agora há um manipulador atual e uma alteração, preservando confirmação, cancelamento, teclado e foco.
- **Trabalho repetido no DOM e no calendário:** referências estáticas da navegação são reutilizadas; títulos iguais deixam de ser reescritos; o painel diário mensal usa os eventos já consultados para a grade, mantendo a consulta original para datas externas.

## Comparação de desempenho

| Medida | Antes | Depois | Redução |
| --- | ---: | ---: | ---: |
| Pequeno: Mediana de navegação | 26,7 ms | 7,9 ms | 70,4% |
| Pequeno: P95 de navegação | 72,3 ms | 17,2 ms | 76,2% |
| Estresse: Mediana de navegação | 292,1 ms | 210,3 ms | 28,0% |
| Estresse: P95 de navegação | 13.931,1 ms | 304,2 ms | 97,8% |
| Estresse: primeira visita medida a Estudos | 14.460,9 ms | 904,1 ms | 93,7% |

Tempo síncrono inclui armazenamento e eventual layout; P95 descreve os casos mais lentos da amostra. Em 30 navegações de estresse, os nós DOM removidos caíram de **11.073 para 62** e o tempo acumulado de tarefas do navegador de **77,5 para 22,6 segundos**. O tempo mediano até dois quadros de animação passou de 118,5 para 108,9 ms no conjunto pequeno e de 525,7 para 492,8 ms no estresse; essa medida não representa a duração completa da animação.

Chromium com CPU limitada a 4×, viewport 1280 × 800, mesmos dados sintéticos, contextos isolados e navegador offline. As versões foram comparadas no mesmo processo, sem testes concorrentes. Cada conjunto incluiu primeiras visitas, 30 trocas repetidas, três visões do calendário, seis visões financeiras, filtros do cronograma, modais de notas e 90 quadros de rolagem. Os tempos variam conforme o dispositivo.

Conjunto pequeno: 48 itens de Estudos, 28 tarefas do Canadá, 15 eventos, 25 lançamentos e 20 notas. Conjunto de estresse: 2.800 itens de Estudos, 336 tarefas do Canadá, 200 eventos, 350 lançamentos e 200 notas.

Em uma medição específica com dez cópias de proteção e dez navegações fora de Configurações, as leituras `getItem` caíram de **220 para 10**, as consultas `key` de **220 para zero** e as solicitações de quota de **20 para zero**. A aba ativa continua sendo persistida.

**Rolagem:** não houve ganho uniforme de FPS comprovado. No benchmark principal, o P95 dos intervalos de frame passou de 100 para 483,3 ms no conjunto pequeno e de 133,3 para 400 ms no estresse. Foram feitas oito medições adicionais com ordem balanceada, movimento contínuo, cursor neutro e animações finitas encerradas. A piora não se reproduziu consistentemente: o P95 variou de 183,4–516,7 ms na base contra 200–250 ms no otimizado pequeno, e de 349,9–800 ms contra 466,6–500,1 ms no grande.

Os rastreamentos mostraram esperas pela composição visual de 231–817 ms nas duas versões; uma execução grande da base também sofreu coleta de memória. As oito medições tiveram DOM e dimensões iguais, sem novos cálculos de layout ou estilos. Nenhum renderizador nem gravação foi executado durante a rolagem do benchmark. O Chromium deste ambiente usa composição em software; os resultados não permitem prometer FPS em outros dispositivos. Os efeitos visuais foram preservados.

Na troca direta de algumas visões financeiras também houve variação de tempo, sem ganho uniforme; o renderizador e o motor existentes foram mantidos.

## Validação e preservação

**63 cenários aprovados:** 17 de armazenamento/persistência; 14 de renderização/vínculos; 14 de navegação; sete de estados temporários; seis de modais; cinco de rolagem. Cobertura: filtros, meses, três visões do calendário, onze visões financeiras, expansões, timer, alteração/remoção/restauração de origens, exportação/importação, recarga e falhas simuladas de armazenamento.

**292 comparações de equivalência aprovadas**, em 375 e 1280 pixels: conteúdo, marcação, posições, dimensões, cores, fontes e efeitos. Após finalizar as animações, a diferença de geometria foi **zero**. Dados e resultados de Estudos, Canadá, Calendário, Notas e Finanças coincidiram, excluindo somente metadados da versão da aplicação.

Não ocorreram erros JavaScript inesperados nem requisições externas nos testes. Os erros de quota registrados foram provocados pelos testes para verificar a proteção e reversão dos dados.

CSS, animações, efeitos, marcação estática e motor financeiro permanecem iguais à base, exceto o número da versão da aplicação. Regras de negócio, cálculos e integrações foram preservados. A chave `ROTINA_GLASS_PREMIUM_DATA`, o esquema 5.5.0, as migrações existentes e o formato de backup permanecem compatíveis. Os índices e controles de reutilização existem somente em memória.

Falhas das próprias otimizações foram corrigidas antes da entrega: quota pendente bloqueando o indicador; estados temporários preservados indevidamente pelo cache; resets de rolagem causando layout na entrada. A limpeza desses estados agora segue a base. Canadá, Calendário e Notas zeram suas rolagens internas na saída; o Dashboard mantém sua posição original. Chamadas diretas ao renderizador também foram verificadas.

Limitação: o navegador do ambiente bloqueia `file://`. O HTML foi executado localmente por interceptação, com o navegador offline e sem servidor. A abertura direta pelo sistema de arquivos não foi executada neste ambiente. O aplicativo continua em um único HTML, sem novas dependências.

Para atualizar sua cópia local, substitua o HTML mantendo o local e o nome de arquivo usados atualmente. Isso conserva a origem usada pelo navegador para o armazenamento. As entregas anteriores permanecem intactas no repositório.
