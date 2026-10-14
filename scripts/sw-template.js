/* Cache exclusivo dos arquivos do aplicativo; dados e backups nunca passam por aqui. */
'use strict';
const RELEASE = '__RELEASE__';
const CACHE_PREFIX = 'rotina-glass-web:' + new URL(self.registration.scope).pathname + ':';
const CACHE_NAME = CACHE_PREFIX + RELEASE;
const BASE = new URL('./', self.location.href);
const SHELL = new URL('index.html', BASE).href;
const FILES = ['index.html', 'manifest.webmanifest', 'web-app.js', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
const URLS = FILES.map(path => new URL(path, BASE).href);
const ASSET_PATHS = new Map(URLS.map(url => [new URL(url).pathname, url]));

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    // Só cria o cache depois que todos os downloads foram conferidos.
    const responses = await Promise.all(URLS.map(async url => {
      const response = await fetch(new Request(url, { cache: 'reload', credentials: 'same-origin' }));
      if (!response.ok || response.type === 'opaque') throw new Error('Arquivo offline indisponível.');
      if (url === SHELL && !(await response.clone().text()).includes('content="' + RELEASE + '"')) throw new Error('Publicação ainda incompleta.');
      return response;
    }));
    const cache = await caches.open(CACHE_NAME);
    try { await Promise.all(URLS.map((url, i) => cache.put(url, responses[i]))); }
    catch (error) { await caches.delete(CACHE_NAME); throw error; }
    // Sem skipWaiting: atualizações aguardam o fechamento das janelas antigas.
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== BASE.origin) return;
  const appNavigation = request.mode === 'navigate' && (url.pathname === BASE.pathname || url.href.split('?')[0] === SHELL);
  const asset = ASSET_PATHS.get(url.pathname);
  if (!appNavigation && !asset) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const stored = await cache.match(appNavigation ? SHELL : asset);
    if (stored) return stored;
    // Uma falta de cache não transforma URLs arbitrárias ou backups em arquivos offline.
    return fetch(request);
  })());
});

self.addEventListener('message', event => {
  if (!event.data || event.data.type !== 'RG_OFFLINE_STATUS' || !event.ports[0]) return;
  const port = event.ports[0];
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      const matches = await Promise.all(URLS.map(url => cache.match(url)));
      port.postMessage({ type: 'RG_OFFLINE_STATUS', ready: matches.every(Boolean), release: RELEASE });
    } catch (error) { port.postMessage({ type: 'RG_OFFLINE_STATUS', ready: false }); }
    finally { port.close(); }
  })());
});
