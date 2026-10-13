# Rotina Glass — Sidebar e opções do Calendário

Aplicação **5.6.2**, dados **5.5.0**. Base: `rotina-glass-otimizado.html`, mantendo as otimizações da entrega anterior. HTML atualizado: **`rotina-glass-interface.html`**.

## Implementado

- **Sidebar:** ocupa toda a altura disponível da janela e permanece fixa durante a rolagem da página. Cabeçalho e rodapé ficam visíveis; somente a lista de menus rola, com barra automática quando há excesso de conteúdo. Navegação, modo compacto e abertura/fechamento no celular foram preservados.
- **Calendário:** legenda, filtros e configurações de feriados ficam dentro de **▼ Filtros e Legenda**, fechado inicialmente. A seção reutiliza todos os controles existentes e pode ser acionada por mouse ou teclado. Mês, ano, lista e criação de eventos continuam acessíveis.
- **Persistência:** o último estado aberto/fechado fica salvo em uma chave local exclusiva de interface. Recolher a seção preserva as seleções. A preferência de expansão não altera registros, formato dos backups, migrações ou contagem de cópias de proteção. Se sua gravação falhar, a interface continua funcionando e informa que o estado será mantido somente naquela sessão.

## Validação

**13 cenários aprovados:** seção inicialmente fechada; equivalência dos controles, legenda e eventos; alteração de feriados, província e filtros; recolhimento/expansão; troca de mês e das três visões; navegação entre módulos; teclado; falha simulada de armazenamento; atualização imediata com eventos de expansão pendentes; preservação dos dados; validação/exportação de backup; geometria e rolagem da sidebar em cinco tamanhos; fechamento e reabertura reais do navegador em três sessões.

Tamanhos verificados: **1280 × 900, 1280 × 420, 900 × 600, 375 × 667 e 375 × 420**. Sem erros JavaScript nem requisições externas. O aplicativo continua em um único HTML, offline. O navegador do ambiente bloqueia `file://`; os testes utilizaram o HTML local por interceptação, sem servidor, com conexão desativada.

Nenhuma regra de negócio, cálculo ou integração foi alterada. As demais áreas e os arquivos das entregas anteriores foram preservados.

O **item 3** veio sem descrição e não recebeu implementação.

Para atualizar sua cópia local, substitua o HTML mantendo o nome e o local utilizados atualmente, conservando a origem do armazenamento do navegador.
