# Rotina Glass — planejamento de inglês no aplicativo

Aplicativo **5.7.2**, dados **5.5.0**. A aba Estudos oferece **Inserir curso de inglês**, permitindo salvar o planejamento no próprio aparelho, sem importar um arquivo externo. Depois da inserção, o backup normal já contém os módulos, aulas e progresso.

O planejamento enviado contém **24 módulos e 152 aulas**, divididos em A1 (4 módulos/32 aulas), A2, B1, B2 e IELTS General Training (5 módulos/30 aulas cada). Títulos e descrições correspondem integralmente à fonte. Objetivos e metas das fases ficam nas anotações da primeira aula de cada fase; as referências IELTS/CLB 9 e a observação sobre conferir os requisitos na aplicação foram preservadas. Novas aulas começam pendentes, sem prazos ou horas inventados.

O curso existente de inglês é sugerido automaticamente. Se houver mais de um destino possível, a seleção é obrigatória. Também é possível criar o curso quando ele ainda não existe. A confirmação mostra a quantidade de módulos/aulas a adicionar. Registros existentes são reconhecidos pelos identificadores anteriores, códigos e nomes correspondentes; nomes editados e aulas reorganizadas são preservados. Conflitos e ambiguidades interrompem a inserção antes de qualquer mudança. Repetir a operação com o planejamento completo não cria registros, atividade, cópias ou gravações adicionais.

A gravação utiliza a validação de backup, a cópia de proteção verificada e a transação com reversão já existentes. Conclusões, anotações, horas, datas, materiais, links, checklists, identidade e metadados do curso permanecem intactos. As demais coleções não são substituídas nem renormalizadas. A grade publicada contém somente o currículo genérico; nenhum backup ou dado pessoal foi incorporado ao site. Os registros reais continuam em `appData.courses`, com a mesma chave local, esquema, migrações e formato de backup.

**34 verificações aprovadas:** 28 de inserção/preservação/UI e seis do aplicativo instalado offline. Cobertura: curso existente/novo, cancelamento, inserção parcial, nomes e códigos manuais, identificadores anteriores, aulas movidas, prevenção de duplicação, ambiguidade de destinos, conflitos de identificadores, todos os bloqueios de migração, cópia/gravação com falhas simuladas, reversão, conclusões e vínculos, Dashboard, exportação/importação real, recarga, reinício completo offline, modais e disciplinas independentes em 320/390 pixels e navegação pelas dez abas. Sem erros JavaScript inesperados nem envio de registros pela rede. Os testes usam somente dados sintéticos, Chromium e HTTP local; não representam teste em um Windows ou iPhone físico.

A primeira execução do teste móvel mediu o layout durante a transição existente ao reduzir a janela de desktop para celular. A mesma largura temporária foi reproduzida na versão anterior e desaparece após a animação. O teste passou a aguardar o término real da transição; nenhuma animação ou regra de layout anterior foi alterada. A ambiguidade entre dois cursos de inglês foi corrigida para exigir seleção explícita antes de inserir.

A comparação do código confirmou que o programa anterior permanece idêntico fora do novo botão, grade, auxiliares de inserção, vínculo do botão e versão. As otimizações de desempenho da 5.7.1 permanecem presentes. O JavaScript da edição web é igual ao HTML oficial, e todo o currículo fica inline para funcionamento offline.

Release web: `88531e37b5126a80`. HTML oficial SHA-256: `ec25c3d0df3e12e66f43cee5dca91e3b2e71a161c3584649ec96c72ce75a482d`.

Para usar: receber a atualização 5.7.2, abrir **Estudos → Inserir curso de inglês**, conferir o curso de destino e clicar em **Adicionar planejamento**. O backup pode ser exportado em **Configurações → Backup & Restauração**.
