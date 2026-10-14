# Rotina Glass — acesso pelo iPhone

Base oficial preservada: `rotina-glass-financas.html`, aplicativo 5.7.0 e dados 5.5.0. O HTML oficial para download não foi alterado.

## Preparação

- Edição web em `site/`, gerada diretamente da base oficial, com o JavaScript inteiro do aplicativo idêntico ao original.
- Manifest, ícones PNG locais e metadados Apple para adicionar à Tela de Início.
- Service worker com seis arquivos estáticos: HTML, manifest, complemento web e três ícones. Não guarda JSON de backup nem URLs externas/arbitrárias no cache.
- Status de disponibilidade offline e instruções em Configurações → Uso no iPhone.
- Mesma chave de localStorage, backup, migrações, cálculos, módulos e layout existente.
- Atualização instalada somente depois que as janelas antigas forem fechadas; nenhuma recarga forçada durante formulários. Falhas de instalação/atualização preservam o cache anterior e os dados.
- Cache identificado pela pasta de instalação e por uma versão derivada dos arquivos, sem apagar caches de outros projetos.
- Geração reproduzível com `python3 scripts/build-site.py`. Ícones já incluídos, sem dependência de internet no aplicativo.

## Testes

11 casos passaram com servidor HTTP real, Playwright/Chromium em tamanho de iPhone e perfil persistente:

1. Instalação do service worker e conferência dos seis arquivos offline.
2. Manifest, metadados e dimensões reais dos ícones.
3. Gravação de registros, exportação de JSON e importação real com cópia de proteção.
4. Recarga sem internet.
5. Abertura offline com parâmetros na URL.
6. Fechamento e reabertura do navegador sem internet, mantendo registros.
7. Nenhum cache de backups ou arquivos fora da lista permitida.
8. Falha inicial de download sem deixar cache parcial ou impedir gravação de dados.
9. Falha de atualização preservando a versão anterior e seus registros.
10. Atualização válida aguardando fechamento das janelas e ativando offline com preservação dos dados.
11. Nenhuma requisição do aplicativo transportando registros pessoais.

O servidor também foi tornado indisponível durante os testes offline, além de desligar a rede do contexto. Não houve erros de JavaScript. Um 404 era esperado na sondagem intencional de URL fora do aplicativo. Os testes não foram executados em um iPhone físico nem no Safari real.

Após a publicação, outras 12 verificações funcionais passaram contra o endereço real em Chromium móvel: instalação e controle do service worker, seis arquivos no cache, manifest/ícones, painel visível, persistência sintética, exportação JSON, nova aba e reinício completo offline. Foram observadas apenas requisições GET da mesma origem, sem corpo de envio e sem erros JavaScript. Esse teste funcional precisou de exceção de certificado no navegador por causa do proxy do ambiente e não comprova a validação TLS do Chromium nem substitui teste no Safari. A validação HTTPS foi feita separadamente, sem desabilitar TLS, pelo curl do fluxo e pelo download/conferência de todos os arquivos via Python.

## Publicação

O fluxo `.github/workflows/pages.yml` publica somente a pasta `site/`, por GitHub Pages, e confere o HTML publicado. O Pages precisa estar habilitado no repositório com Source = GitHub Actions. O token automático dos fluxos não tem permissão de administração para habilitar esse recurso inicialmente.

Após a ativação do Pages na conta proprietária, o fluxo [38583255460](https://github.com/souzanicole0777-alt/Projeto-pessoal-Rotina-Glass/actions/runs/38583255460), commit `af43004`, concluiu todas as etapas com sucesso, incluindo download HTTPS e comparação exata do HTML publicado.

Endereço publicado e conferido: **https://souzanicole0777-alt.github.io/Projeto-pessoal-Rotina-Glass/**. Os sete arquivos públicos (HTML, manifest, complemento web, service worker e três ícones) responderam HTTP 200, com conteúdo e SHA-256 idênticos aos arquivos testados. Release offline: `4e6749b2d19deacc`.

Os destinos `api.github.com` e `souzanicole0777-alt.github.io` foram adicionados ao rascunho da configuração de rede, preservando os destinos predefinidos. Após a liberação, as consultas ao Pages e a verificação HTTPS funcionaram. A confirmação de publicação acima usa respostas reais do GitHub e do endereço publicado.

## Transferência de dados

O endereço HTTPS e o HTML local usam armazenamentos separados. No iPhone, o Safari e o aplicativo adicionado à Tela de Início também podem separar armazenamento: instalar primeiro, abrir pelo ícone e importar o JSON dentro dele.

A importação substitui os dados do destino. Não há sincronização nem união automática de registros entre aparelhos. Aportes, finanças e demais dados continuam no aparelho; a publicação contém apenas o programa. Instruções completas em `como-usar-no-iphone.md`.
