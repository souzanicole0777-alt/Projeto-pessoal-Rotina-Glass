# Rotina Glass no iPhone

## Instalar

1. Abra o endereço publicado do Rotina Glass no **Safari**, conectado à internet.
2. Toque em **Compartilhar** (quadrado com a seta para cima).
3. Escolha **Adicionar à Tela de Início** e confirme em **Adicionar**. Se aparecer a opção **Abrir como App**, deixe-a ativada.
4. Abra o **Rotina Glass pelo novo ícone** da Tela de Início.
5. Entre em **Configurações → Uso no iPhone** e aguarde a mensagem **Disponível offline**. Depois disso, pode abrir pelo ícone mesmo sem internet.

## Levar seus dados ao iPhone

1. No aplicativo que já usa no computador, abra **Configurações → Backup & Restauração → Exportar Backup (.json)**.
2. Envie esse JSON ao iPhone por AirDrop, iCloud Drive ou outro meio e salve no aplicativo **Arquivos**.
3. Abra o Rotina Glass pelo ícone da Tela de Início, entre em **Configurações → Backup & Restauração → Carregar Arquivo JSON** e selecione o arquivo.
4. Confira a confirmação e confirme a importação. Ela **substitui os dados do destino**, com uma cópia de proteção anterior no navegador.
5. Confira seus registros no aplicativo.

Instale primeiro e importe dentro do aplicativo instalado. O Safari e o ícone da Tela de Início podem guardar dados separadamente. O HTML antigo no computador também usa armazenamento separado do endereço na internet.

Para levar alterações de volta ao computador, faça o caminho inverso: exporte no iPhone, salve o JSON e importe no computador. **Não há sincronização automática nem união de dois backups.** Exporte a versão mais recente antes de trocar de aparelho para não sobrescrever alterações.

## Uso offline e atualizações

- A primeira preparação precisa de internet. A mensagem em Configurações informa quando o aparelho está pronto para uso offline.
- Os arquivos do aplicativo ficam guardados no próprio aparelho. Seus registros continuam locais e não são enviados ao GitHub.
- Atualizações são preparadas quando há internet e aplicadas depois que as janelas antigas forem fechadas. Não há recarga forçada durante a edição.
- Mantenha backups JSON fora do aplicativo. Apagar os dados do Safari ou remover o aplicativo pode apagar o armazenamento local.
- Use o mesmo endereço e o mesmo navegador para manter o acesso aos seus dados.

## Publicação e manutenção

A pasta `site/` é a edição para navegador e Tela de Início. O arquivo `rotina-glass-financas.html` continua sendo a edição única para download e permanece inalterado.

O fluxo `.github/workflows/pages.yml` publica somente `site/` pelo GitHub Pages. O endereço publicado é:

`https://souzanicole0777-alt.github.io/Projeto-pessoal-Rotina-Glass/`

Se o GitHub exigir ativação inicial, abra **Settings → Pages → Build and deployment → Source → GitHub Actions** no repositório e execute o fluxo **Publicar Rotina Glass para iPhone**. A disponibilidade do endereço precisa ser confirmada após a publicação.

Para atualizar a edição web após alterar a base oficial: execute `python3 scripts/build-site.py` e envie a base e os arquivos gerados. O comando não altera o HTML oficial. Os ícones já estão incluídos; recriá-los exige Node, Playwright e Chromium, com `node scripts/make-icons.cjs`.
