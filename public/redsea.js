(function () {
  if (document.querySelector('#redseaView')) return;

  const places = [
    { name: 'Hurghada', slug: 'hurghada', time: '2 hrs', category: 'Beaches', image: 'redsea-hurghada.png', description: 'Vibrant city, beaches, marina and marine life.', pin: 'hurghada' },
    { name: 'El Gouna', slug: 'el-gouna', time: '2 hrs', category: 'Beaches', image: 'redsea-el-gouna.png', description: 'Stylish lagoons, modern resorts and watersports.', pin: 'el-gouna' },
    { name: 'Giftun Islands', slug: 'giftun-islands', time: 'Full day', category: 'Diving', image: 'redsea-giftun-islands.png', description: 'White sand, reef gardens and clear water.', pin: 'giftun' },
    { name: 'Makadi Bay', slug: 'makadi-bay', time: '3 hrs', category: 'Diving', image: 'redsea-makadi-bay.png', description: 'Beautiful beaches and world-class diving.', pin: 'makadi' },
    { name: 'Soma Bay', slug: 'soma-bay', time: '3 hrs', category: 'Beaches', image: 'redsea-soma-bay.png', description: 'Luxury resort and turquoise waters.', pin: 'soma' },
    { name: 'Safaga', slug: 'safaga', time: '2 hrs', category: 'Diving', image: 'redsea-safaga.png', description: 'Authentic town and great diving sites.', pin: 'safaga' },
    { name: 'El Quseir', slug: 'el-quseir', time: '2 hrs', category: 'Heritage', image: 'redsea-el-quseir.png', description: 'Historic town, forts and traditional charm.', pin: 'el-quseir' },
    { name: 'Port Ghalib', slug: 'port-ghalib', time: '2 hrs', category: 'Beaches', image: 'redsea-port-ghalib.png', description: 'Marina, lagoons and Red Sea adventures.', pin: 'port-ghalib' },
    { name: 'Marsa Alam', slug: 'marsa-alam', time: '3 hrs', category: 'Nature', image: 'redsea-marsa-alam.png', description: 'Quiet beaches, reefs and desert horizons.', pin: 'marsa-alam' },
    { name: 'Abu Dabbab Bay', slug: 'abu-dabbab-bay', time: 'Half day', category: 'Nature', image: 'redsea-abu-dabbab-bay.png', description: 'Turtles, reefs and calm shallow waters.', pin: 'abu-dabbab' },
    { name: 'Dolphin House', slug: 'dolphin-house', time: 'Half day', category: 'Diving', image: 'redsea-dolphin-house.png', description: 'Wild dolphins and vivid coral gardens.', pin: 'dolphin-house' },
    { name: "St. Anthony's Monastery", slug: 'st-anthony', time: 'Full day', category: 'Heritage', image: 'redsea-st-anthony.png', description: 'Mountain heritage and timeless desert history.', pin: 'st-anthony' },
    { name: 'Wadi El Gemal', slug: 'wadi-el-gemal', time: 'Full day', category: 'Nature', image: 'redsea-wadi-el-gemal.png', description: 'National park, lagoons and wild coastal beauty.', pin: 'wadi-el-gemal' }
  ];

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = '/redsea.css?v=20261013-2';
  document.head.appendChild(stylesheet);
  const controlsStylesheet = document.createElement('link');
  controlsStylesheet.rel = 'stylesheet';
  controlsStylesheet.href = '/redsea-controls.css?v=20261014-1';
  document.head.appendChild(controlsStylesheet);

  const cardMarkup = (place) => `
    <button class="redsea-place" type="button" data-place="${place.name}" data-category="${place.category}" aria-pressed="false">
      <img src="/legacy/assets/${place.image}" alt="${place.name}" loading="lazy">
      <span class="redsea-place-copy"><strong>${place.name}</strong><span class="redsea-time">◷ ${place.time}</span><em>${place.description}</em></span>
      <span class="redsea-check" aria-hidden="true"></span>
    </button>`;

  const pinMarkup = (place) => `
    <button class="redsea-pin ${place.pin}" type="button" data-place="${place.name}" aria-label="Explore ${place.name}">
      <span class="redsea-pin-icon" aria-hidden="true"></span><b>${place.name}</b>
    </button>`;

  const view = document.createElement('section');
  view.className = 'redsea-view';
  view.id = 'redseaView';
  view.hidden = true;
  view.setAttribute('aria-label', 'Red Sea destination guide');
  view.innerHTML = `
    <div class="redsea-backdrop"></div><div class="redsea-shade"></div>
    <header class="redsea-nav">
      <a class="redsea-brand" href="#top" aria-label="Nilora home"><span>𓂀</span><b>NILORA</b><small>TIME LIVES HERE</small></a>
      <div class="redsea-actions"><button type="button" id="redseaLanguage" aria-label="Change language">◎</button><button type="button" id="redseaSignIn">Sign In</button></div>
    </header>
    <button class="redsea-back" id="redseaBack" type="button">← <span>Back to Egypt</span></button>
    <button class="redsea-panel-toggle" id="redseaPanelToggle" type="button" aria-controls="redseaPanel" aria-expanded="true"><span class="redsea-toggle-icon" aria-hidden="true">›</span><span class="redsea-toggle-label">Hide guide</span></button>
    <div class="redsea-map" aria-label="Interactive Red Sea map">${places.map(pinMarkup).join('')}</div>
    <aside class="redsea-panel" id="redseaPanel">
      <div class="redsea-panel-heading"><h2>Explore the Red Sea</h2><p>Select the places you want to explore</p></div>
      <div class="redsea-filters" role="tablist" aria-label="Filter destinations">
        <button type="button" class="is-active" data-filter="All" role="tab" aria-selected="true">All</button>
        <button type="button" data-filter="Beaches" role="tab" aria-selected="false">Beaches</button>
        <button type="button" data-filter="Diving" role="tab" aria-selected="false">Diving</button>
        <button type="button" data-filter="Nature" role="tab" aria-selected="false">Nature</button>
        <button type="button" data-filter="Heritage" role="tab" aria-selected="false">Heritage</button>
      </div>
      <div class="redsea-place-list">${places.map(cardMarkup).join('')}</div>
    </aside>
    <div class="redsea-mascot"><img src="/legacy/assets/felfel.png" alt="Felfel"><div class="redsea-mascot-caption" aria-live="polite"><strong>Plan your<br>Red Sea adventure</strong><span>Hover over a place to explore.</span></div></div>`;
  document.body.appendChild(view);

  const closeExistingService = () => {
    const panel = document.querySelector('#servicePanel');
    const shade = document.querySelector('#panelShade');
    if (panel) panel.hidden = true;
    if (shade) shade.hidden = true;
    document.body.classList.remove('panel-open');
  };

  const openRedSea = () => {
    closeExistingService();
    view.hidden = false;
    document.body.classList.add('redsea-open');
    history.replaceState(null, '', '#destination/redsea');
    window.requestAnimationFrame(() => view.classList.add('is-ready'));
  };

  const closeRedSea = () => {
    view.classList.remove('is-ready');
    window.setTimeout(() => {
      view.hidden = true;
      document.body.classList.remove('redsea-open');
      history.replaceState(null, '', location.pathname);
    }, 160);
  };

  const selected = new Set();
  const mascotCaption = view.querySelector('.redsea-mascot-caption');
  const mascotDefault = { title: 'Plan your Red Sea adventure', detail: 'Hover over a place to explore.' };
  const showMascotPlace = (name) => {
    const place = places.find((entry) => entry.name === name);
    if (!place || !mascotCaption) return;
    const title = mascotCaption.querySelector('strong');
    const detail = mascotCaption.querySelector('span');
    if (title) title.textContent = place.name;
    if (detail) detail.textContent = `${place.category} · ${place.description}`;
    view.classList.add('mascot-active');
  };
  const resetMascot = () => {
    if (!mascotCaption) return;
    const title = mascotCaption.querySelector('strong');
    const detail = mascotCaption.querySelector('span');
    if (title) title.textContent = mascotDefault.title;
    if (detail) detail.textContent = mascotDefault.detail;
    view.classList.remove('mascot-active');
  };
  const updateCount = () => {
    const count = selected.size;
    const countNode = view.querySelector('#redseaSelectedCount');
    if (countNode) countNode.textContent = `${count} ${count === 1 ? 'place' : 'places'} selected`;
  };

  const updateSelectionStyles = () => {
    view.querySelectorAll('.redsea-place').forEach((card) => {
      const active = selected.has(card.dataset.place);
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-pressed', String(active));
    });
    view.querySelectorAll('.redsea-pin').forEach((pin) => pin.classList.toggle('is-active', selected.has(pin.dataset.place)));
    updateCount();
  };

  const togglePlace = (name) => {
    if (selected.has(name)) selected.delete(name); else selected.add(name);
    updateSelectionStyles();
  };

  view.querySelectorAll('.redsea-place, .redsea-pin').forEach((item) => {
    item.addEventListener('click', () => { togglePlace(item.dataset.place); showMascotPlace(item.dataset.place); });
    item.addEventListener('pointerenter', () => showMascotPlace(item.dataset.place));
    item.addEventListener('pointerleave', resetMascot);
    item.addEventListener('focus', () => showMascotPlace(item.dataset.place));
    item.addEventListener('blur', resetMascot);
  });
  view.querySelectorAll('.redsea-filters button').forEach((filter) => filter.addEventListener('click', () => {
    const category = filter.dataset.filter;
    view.querySelectorAll('.redsea-filters button').forEach((button) => {
      const active = button === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
    });
    view.querySelectorAll('.redsea-place').forEach((card) => { card.hidden = category !== 'All' && card.dataset.category !== category; });
  }));

  view.querySelector('#redseaBuild')?.addEventListener('click', (event) => {
    places.filter((place) => selected.has(place.name)).forEach((place) => {
      window.NiloraItinerary?.add({ id: `redsea-${place.slug}`, type: 'destination', name: place.name, route: 'Red Sea' });
    });
    event.currentTarget.innerHTML = selected.size ? 'Itinerary ready <span>✓</span>' : 'Choose a place first <span>→</span>';
    event.currentTarget.setAttribute('aria-live', 'polite');
  });

  window.openRedSea = openRedSea;
  view.querySelector('#redseaBack')?.addEventListener('click', closeRedSea);
  view.querySelector('#redseaSignIn')?.addEventListener('click', () => { closeRedSea(); window.setTimeout(() => document.querySelector('#loginButton')?.click(), 180); });
  view.querySelector('#redseaLanguage')?.addEventListener('click', () => document.querySelector('#languageToggle')?.click());
  view.querySelector('#redseaPanelToggle')?.addEventListener('click', (event) => {
    const collapsed = view.classList.toggle('panel-collapsed');
    event.currentTarget.setAttribute('aria-expanded', String(!collapsed));
    const label = event.currentTarget.querySelector('.redsea-toggle-label');
    if (label) label.textContent = collapsed ? 'Show guide' : 'Hide guide';
  });

  const redSeaPoint = document.querySelector('[data-route="redsea"]');
  const interceptRedSea = (event) => { event.preventDefault(); event.stopImmediatePropagation(); openRedSea(); };
  redSeaPoint?.addEventListener('click', interceptRedSea, true);
  redSeaPoint?.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') interceptRedSea(event); }, true);
  window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !view.hidden) closeRedSea(); });
  if (location.hash === '#destination/redsea') openRedSea();
})();
