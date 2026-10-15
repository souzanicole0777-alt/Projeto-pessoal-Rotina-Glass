# Rotina Glass — desempenho no computador

Aplicativo **5.7.1**, dados **5.5.0**. Base: HTML oficial `rotina-glass-financas.html` da versão 5.7.0. A edição publicada continua sendo gerada pelo mesmo processo, com o JavaScript idêntico ao HTML oficial. Nenhum backup ou planejamento pessoal foi incluído na publicação.

O principal gargalo de rolagem estava no gradiente com `background-attachment: fixed` aplicado ao corpo da página: o navegador repintava o fundo durante os movimentos. O mesmo gradiente agora ocupa uma camada fixa própria, atrás dos efeitos existentes. Cores, desfoques, sombras, animações, organização e dimensões foram preservados.

Próximos Eventos também repetia a consulta de todas as fontes para cada data distante. A consulta agora agrupa essas datas, percorre as fontes finitas uma vez e reutiliza os compromissos financeiros já calculados. Recorrências são consultadas apenas nas datas necessárias, sem expandir intervalos vazios. Eventos, ordenação, filtros, ações de abertura e integrações permanecem equivalentes.

Foi corrigido ainda um loop mensal que ultrapassava o último mês solicitado e podia não terminar em dezembro de 9999. A condição de parada preserva os mesmos cálculos e ocorrências do período consultado.

| Medição | Antes | Depois |
| --- | ---: | ---: |
| Rasterização, rolagem de 60 quadros, rodada 1 | 3.638 tarefas | 908 tarefas |
| Rasterização, mesma rolagem, rodada 2 | 3.470 tarefas | 893 tarefas |
| Próximos Eventos, 100 prazos futuros | 22,33 ms / 101 consultas | 1,64 ms / 2 consultas |
| Próximos Eventos, 500 prazos futuros | 504,36 ms / 501 consultas | 6,02 ms / 2 consultas |
| Próximos Eventos, 1.500 prazos futuros | 4.273,89 ms / 1.501 consultas | 17,86 ms / 2 consultas |

A redução de rasterização foi de aproximadamente **75%** em ordem balanceada antes/depois/depois/antes. A comparação foi executada em Chromium com composição por software; FPS e P95 dos intervalos de quadro variaram e não demonstraram ganho uniforme. Os valores de Próximos Eventos medem apenas o cálculo JavaScript em Node VM, com aquecimento, sete amostras alternadas e dados sintéticos iguais; não representam o tempo total de abertura do aplicativo.

A verificação de navegação executou 60 trocas de abas em Chromium desktop com CPU limitada a 4×. As abas continuaram sendo reutilizadas, sem crescimento de conteúdo ou alterações de dados. O custo síncrono mediano das visitas repetidas variou de 8,6 para 11,0 ms; o tempo mediano até dois quadros passou de 107,9 para 103,9 ms. Essa rodada não comprova melhora uniforme de navegação e teve sobreposição parcial com um diagnóstico em outro processo; os tempos são apenas informativos. A conclusão de desempenho se apoia no rastreamento balanceado de rasterização e na redução comprovada de consultas. Dois quadros não correspondem à animação inteira.

A comparação visual cobriu 36 cenários em desktop (1280×800) e móvel (390×844), temas claro/escuro, Dashboard/Canadá/Finanças, topo/meio/fim da página. A geometria permaneceu idêntica. Foram comparadas 38 imagens, incluindo modais: diferença máxima de 4/255 por canal, com pequena variação de rasterização; ao restaurar o CSS anterior, todas voltaram a ser idênticas. Os modais mantiveram a sobreposição e o fundo inerte. Os testes móveis usam Chromium, não um iPhone físico ou Safari.

A revisão independente aprovou 480 comparações exatas de eventos e cálculos, 120 comparações das ações dos eventos, 240 verificações de ausência de mutação e quatro testes com limite de execução na fronteira de datas. Onze cenários adicionais verificaram as fontes, datas distantes, recorrências, exceções, ordenação, filtros e callbacks. A base não conclui o teste mensal de dezembro de 9999; a versão corrigida retorna a data esperada.

A chave `ROTINA_GLASS_PREMIUM_DATA`, o esquema 5.5.0, as migrações, o formato de backup, a persistência imediata dos registros e o funcionamento offline foram mantidos. Fora das consultas de calendário e da condição de parada mensal, o JavaScript do aplicativo permanece idêntico à base, exceto a versão. A estrutura HTML não mudou; o texto de versão no rodapé passou de 5.7.0 para 5.7.1.

**75 testes de uso e compatibilidade aprovados:** 28 financeiros, 13 complementares, 20 de paridade/navegação/calendário, 11 da edição instalável e três conferências do build final. Cobertura: criação, edição, exclusão confirmada e restauração; receitas, despesas fixas/variáveis, cartões de crédito e de lojas, compras e parcelas com valores diferentes, empréstimos, reserva, histórico e cálculos iguais à base; exportação/importação real com cópia de proteção; falha de localStorage com reversão; todas as abas e três visões do calendário; filtros e ações de origem; larguras de 320, 375, 768 e 1440 pixels; temas e modais; cache, persistência, reinício offline e falhas/sucesso de atualização do aplicativo. Sem erros JavaScript. Uma requisição 404 foi provocada deliberadamente no teste de URL fora do cache.

Foi identificado um comportamento anterior ao patch: ao recolher os filtros do calendário e recarregar imediatamente, antes de o navegador entregar o evento assíncrono `toggle`, a preferência pode ainda não ter sido gravada. Isso foi reproduzido na base e na versão otimizada; não foi alterado. A validação normal de persistência aguarda a gravação real do evento antes de recarregar.

Release web final: **29039bc448dd6543**. HTML oficial SHA-256: `3100b5d4fffb0d9a12008030d5e0df11bca2937e4dd459329258bb7fe053e716`. O rebuild final inclui apenas a atualização do rótulo de versão em relação às suítes completas; instalação, versão do cache, persistência e recarga offline foram reconferidas nesse release antes da publicação.

A atualização usa o fluxo existente do GitHub Pages: publica somente `site/` e confere por HTTPS se o HTML servido corresponde ao build. Para receber a versão em um navegador com cache offline, abra o site com internet, aguarde a preparação da atualização, feche todas as janelas do Rotina Glass e abra novamente. Os registros locais permanecem no aparelho.
