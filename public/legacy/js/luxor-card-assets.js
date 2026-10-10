(function () {
  const images = {
    'Valley of the Kings': '/legacy/assets/luxor-valley-card.png',
    'Valley of the Queens': '/legacy/assets/luxor-queens-card.png',
    'Temple of Hatshepsut': '/legacy/assets/luxor-hatshepsut-card.png',
    'Deir el-Medina': '/legacy/assets/luxor-deir-card.png',
    'Medinet Habu': '/legacy/assets/luxor-medinet-card.png',
    'Ramesseum': '/legacy/assets/luxor-ramesseum-card.png',
    'Colossi of Memnon': '/legacy/assets/luxor-memnon-card.png',
    'Tombs of the Nobles': '/legacy/assets/luxor-nobles-card.png',
    'Carter House': '/legacy/assets/luxor-carter-card.png',
    'Karnak Temple Complex': '/legacy/assets/luxor-karnak-card.png',
    'Luxor Museum': '/legacy/assets/luxor-museum-card.png',
    'Avenue of Sphinxes': '/legacy/assets/luxor-sphinxes-card.png',
    'Luxor Temple': '/legacy/assets/luxor-temple-card.png',
    'Mummification Museum': '/legacy/assets/luxor-mummification-card.png',
    'Nile Cruise Port': '/legacy/assets/luxor-nile-card.png',
    'Luxor International Airport': '/legacy/assets/luxor-airport-card.png?v=20261002-1'
  };
  const apply = () => document.querySelectorAll('#luxorFinalView .luxor-final-card').forEach((card) => {
    const image = images[card.dataset.finalPlace];
    if (image && card.querySelector('img')) card.querySelector('img').src = image;
  });
  const setupLanguage = () => {
    const view = document.querySelector('#luxorFinalView');
    const button = view?.querySelector('.luxor-final-language');
    if (!button || button.dataset.ready) return;
    button.dataset.ready = 'true';
    const menu = document.createElement('div');
    menu.className = 'luxor-final-language-menu';
    menu.innerHTML = ['en','ar','es','de','fr','zh','it'].map((locale) => `<button type="button" data-locale="${locale}">${locale.toUpperCase()}</button>`).join('');
    button.after(menu);
    button.addEventListener('click', () => menu.classList.toggle('is-open'));
    menu.querySelectorAll('button').forEach((item) => item.addEventListener('click', () => {
      document.querySelector(`[data-locale="${item.dataset.locale}"]`)?.click();
      menu.classList.remove('is-open');
    }));
  };
  apply();
  setupLanguage();
  window.addEventListener('nilora:luxor-ready', setupLanguage, { once: true });
  const setupLegend = () => {
    const legend = document.querySelector('#luxorFinalView .luxor-final-legend');
    if (!legend || legend.dataset.ready) return;
    legend.dataset.ready = 'true';
    const all = document.createElement('button');
    all.type = 'button'; all.textContent = '⌂ All'; all.dataset.mapFilter = 'all'; all.setAttribute('aria-pressed', 'true'); legend.prepend(all);
    [...legend.querySelectorAll('span')].forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.dataset.mapFilter = text.includes('east') ? 'east' : text.includes('west') ? 'west' : text.includes('temple') ? 'Temples' : text.includes('tomb') ? 'Tombs' : text.includes('museum') ? 'Museums' : 'Experiences';
      item.setAttribute('role', 'button'); item.tabIndex = 0;
    });
    const choose = (filter) => { legend.querySelectorAll('[data-map-filter]').forEach((item) => item.setAttribute('aria-pressed', String(item.dataset.mapFilter === filter))); document.querySelectorAll('#luxorFinalView .luxor-final-pin').forEach((pin) => { const visible = filter === 'all' || (filter === 'east' || filter === 'west' ? pin.classList.contains(filter) : pin.dataset.category === filter); pin.hidden = !visible; pin.setAttribute('aria-hidden', String(!visible)); }); };
    legend.querySelectorAll('[data-map-filter]').forEach((item) => { item.addEventListener('click', () => choose(item.dataset.mapFilter)); item.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(item.dataset.mapFilter); } }); });
  };
  const setupCards = () => {
    const view = document.querySelector('#luxorFinalView');
    if (!view) return;
    view.querySelectorAll('.luxor-final-card').forEach((card) => {
      if (card.dataset.interactionReady) return;
      card.dataset.interactionReady = 'true';
      card.setAttribute('aria-pressed', 'false');
      card.addEventListener('click', (event) => {
        event.preventDefault(); event.stopImmediatePropagation();
        const name = card.dataset.finalPlace;
        if (name === 'Nile Cruise Port' && window.openNileDeck) {
          window.openNileDeck();
          return;
        }
        const selected = !card.classList.contains('is-selected');
        card.classList.toggle('is-selected', selected);
        card.setAttribute('aria-pressed', String(selected));
        view.querySelectorAll(`.luxor-final-pin[data-final-place="${CSS.escape(name)}"]`).forEach((pin) => pin.classList.toggle('is-selected', selected));
        const count = view.querySelector('.luxor-final-count');
        if (count) count.textContent = view.querySelectorAll('.luxor-final-card.is-selected').length;
      }, true);
    });
    const build = view.querySelector('.luxor-final-build');
    if (build && !build.dataset.interactionReady) {
      build.dataset.interactionReady = 'true';
      build.addEventListener('click', () => {
        const selected = [...view.querySelectorAll('.luxor-final-card.is-selected')]
          .map((card) => card.dataset.finalPlace)
          .filter(Boolean);
        if (window.NiloraItinerary) {
          selected.forEach((name) => window.NiloraItinerary.add({ id: `luxor-${name}`, type: 'luxor', name, route: 'Luxor' }));
        }
        build.textContent = `Saved ${selected.length} places ✓`;
        build.classList.add('is-complete');
        build.setAttribute('aria-live', 'polite');
      });
    }
  };
  setupCards();
  window.addEventListener('nilora:luxor-ready', setupCards, { once: true });
  setupLegend();
  window.addEventListener('nilora:luxor-ready', () => { setupLegend(); apply(); }, { once: true });
})();
