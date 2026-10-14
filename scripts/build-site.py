#!/usr/bin/env python3
"""Gera somente a edição web, preservando o HTML oficial e seus dados/cálculos."""
from pathlib import Path
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'rotina-glass-financas.html'
SITE = ROOT / 'site'
base = SOURCE.read_text(encoding='utf-8')
support_files = ['manifest.webmanifest', 'web-app.js', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png']
template = (ROOT / 'scripts/sw-template.js').read_text(encoding='utf-8')
digest = hashlib.sha256(base.encode('utf-8') + template.encode('utf-8') + Path(__file__).read_bytes())
for name in support_files:
    digest.update(name.encode('utf-8'))
    digest.update((SITE / name).read_bytes())
release = digest.hexdigest()[:16]
head = f'''  <!-- Integração web: o aplicativo e a chave de dados continuam os mesmos. -->
  <meta name="rotina-glass-web-release" content="{release}">
  <meta name="theme-color" content="#7850c8">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Rotina Glass">
  <link rel="manifest" href="./manifest.webmanifest">
  <link rel="apple-touch-icon" sizes="180x180" href="./icons/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="./icons/icon-192.png">
'''
settings = '''          <!-- Instruções exclusivas da edição web. -->
          <section class="glass-card" id="webIphoneSettings" style="max-width:650px; margin-top:1rem;" aria-labelledby="webIphoneTitle">
            <h3 id="webIphoneTitle">Uso no iPhone</h3>
            <p class="data-item-sub" id="webOfflineStatus" role="status" aria-live="polite">Preparando o uso offline neste aparelho…</p>
            <p class="data-item-sub">No Safari, toque em Compartilhar e em Adicionar à Tela de Início. Abra pelo novo ícone e importe seu backup aqui, dentro do aplicativo instalado.</p>
            <p class="data-item-sub">Os dados ficam neste aparelho. Para transferir ao computador ou ao celular, use Exportar e Importar Backup abaixo. A importação substitui os dados; não há sincronização automática. Guarde uma cópia do JSON fora do aplicativo.</p>
          </section>

'''
assert base.count('</head>') == base.count('</body>') == 1
assert base.count('        <!-- BACKUP DENTRO DE CONFIGURAÇÕES') == 1
html = base.replace('</head>', head + '</head>')
html = html.replace('        <!-- BACKUP DENTRO DE CONFIGURAÇÕES', settings + '        <!-- BACKUP DENTRO DE CONFIGURAÇÕES')
html = html.replace('</body>', '  <script src="./web-app.js" defer></script>\n</body>')
# Confere a igualdade do programa inteiro, incluindo backup, migrações e cálculos.
inline = lambda text: re.findall(r'<script(?:\s[^>]*)?>([\s\S]*?)</script>', text)
assert inline(html)[:-1] == inline(base)
(SITE / 'index.html').write_text(html, encoding='utf-8')
(SITE / 'sw.js').write_text(template.replace('__RELEASE__', release), encoding='utf-8')
(SITE / '.nojekyll').touch()
print(json.dumps({'release': release, 'base': SOURCE.name, 'base_sha256': hashlib.sha256(base.encode()).hexdigest(), 'web_bytes': len(html.encode()), 'inline_code_unchanged': True}, indent=2))
