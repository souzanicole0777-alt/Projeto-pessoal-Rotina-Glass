/* Complemento da edição web. Não lê, envia ou altera registros do aplicativo. */
(() => {
  'use strict';
  const status = () => document.getElementById('webOfflineStatus');
  const say = message => { const element = status(); if (element) element.textContent = message; };
  function readyState(registration) {
    const worker = registration.active;
    if (!worker) return;
    const channel = new MessageChannel();
    channel.port1.onmessage = event => {
      channel.port1.close();
      if (!event.data || event.data.type !== 'RG_OFFLINE_STATUS') return;
      if (event.data.ready) say(registration.waiting
        ? 'Disponível offline. Uma atualização está pronta: feche todas as janelas deste aplicativo e abra novamente para aplicá-la.'
        : 'Disponível offline neste aparelho. Após a primeira abertura, você pode usar pelo ícone na Tela de Início mesmo sem internet.');
      else say('Conecte-se à internet e abra novamente para concluir a preparação do uso offline.');
    };
    worker.postMessage({ type: 'RG_OFFLINE_STATUS' }, [channel.port2]);
  }
  window.addEventListener('load', async () => {
    if (!('serviceWorker' in navigator) || !window.isSecureContext) {
      say('Para preparar o uso offline no iPhone, abra este endereço no Safari com conexão segura.');
      return;
    }
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', { scope: './', updateViaCache: 'none' });
      const watch = installing => {
        if (!installing) return;
        const changed = () => {
          if (installing.state === 'installed') readyState(registration);
          if (installing.state === 'redundant' && !registration.active) say('Não foi possível concluir o uso offline. Com internet, feche o aplicativo e abra novamente.');
        };
        installing.addEventListener('statechange', changed);
        changed();
      };
      registration.addEventListener('updatefound', () => watch(registration.installing));
      watch(registration.installing);
      if (registration.active) readyState(registration);
      navigator.serviceWorker.ready.then(readyState).catch(() => {});
      window.addEventListener('online', () => { readyState(registration); registration.update().catch(() => {}); });
      window.addEventListener('offline', () => readyState(registration));
    } catch (error) {
      say('O aplicativo abriu, mas a preparação do uso offline falhou. Conecte-se à internet e tente abrir novamente. Seus registros continuam no armazenamento deste aparelho.');
    }
  }, { once: true });
})();
