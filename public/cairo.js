(function () {
  if (document.querySelector('#cairoView')) return;

  const places = [
    { name: 'Giza Pyramids', category: 'Ancient Egypt', time: '2–3 hrs', description: 'Iconic pyramids of Khufu, Khafre and Menkaure.', left: '13%', top: '38%', icon: 'attraction', image: '/legacy/assets/cairo-cards/giza-pyramids.png' },
    { name: 'Great Sphinx', category: 'Ancient Egypt', time: '1 hr', description: 'The legendary guardian of Giza.', left: '17%', top: '52%', icon: 'attraction', image: '/legacy/assets/cairo-cards/great-sphinx.png' },
    { name: 'Grand Egyptian Museum', category: 'Museums', time: '2–3 hrs', description: 'A world-class museum of ancient Egypt.', left: '18%', top: '65%', icon: 'museum', image: '/legacy/assets/cairo-cards/grand-egyptian-museum.png' },
    { name: 'Cairo Tower', category: 'Experiences', time: '1 hr', description: 'Panoramic views over Cairo and the Nile.', left: '37%', top: '42%', icon: 'viewpoint', image: '/legacy/assets/cairo-cards/cairo-tower.png' },
    { name: 'Egyptian Museum', category: 'Museums', time: '2 hrs', description: 'Home to Tutankhamun’s treasures and more.', left: '47%', top: '24%', icon: 'museum', image: '/legacy/assets/cairo-cards/egyptian-museum.png' },
    { name: 'Al-Azhar Mosque', category: 'Islamic Cairo', time: '1 hr', description: 'A living center of learning and architecture.', left: '70%', top: '26%', icon: 'mosque', image: '/legacy/assets/cairo-cards/al-azhar-mosque.png' },
    { name: 'Khan el-Khalili', category: 'Islamic Cairo', time: '1–2 hrs', description: 'Famous historic market and bazaars.', left: '65%', top: '36%', icon: 'viewpoint', image: '/legacy/assets/cairo-cards/khan-el-khalili.png' },
    { name: 'Cairo Citadel', category: 'Islamic Cairo', time: '2 hrs', description: 'Historic fortress and the Mosque of Muhammad Ali.', left: '72%', top: '45%', icon: 'mosque', image: '/legacy/assets/cairo-cards/cairo-citadel.png' },
    { name: 'Sultan Hassan Mosque', category: 'Islamic Cairo', time: '1 hr', description: 'Monumental Mamluk architecture beside the Citadel.', left: '66%', top: '56%', icon: 'mosque', image: '/legacy/assets/cairo-cards/sultan-hassan-mosque.png' },
    { name: 'Ibn Tulun Mosque', category: 'Islamic Cairo', time: '1 hr', description: 'A peaceful courtyard and Cairo’s oldest minaret style.', left: '57%', top: '62%', icon: 'mosque', image: '/legacy/assets/cairo-cards/ibn-tulun-mosque.png' },
    { name: 'Coptic Museum', category: 'Coptic Cairo', time: '1 hr', description: 'Art and stories from Egypt’s Christian heritage.', left: '51%', top: '70%', icon: 'museum', image: '/legacy/assets/cairo-cards/coptic-museum.png' },
    { name: 'Hanging Church', category: 'Coptic Cairo', time: '1 hr', description: 'One of Cairo’s most beloved historic churches.', left: '60%', top: '75%', icon: 'church', image: '/legacy/assets/cairo-cards/hanging-church.png' },
    { name: 'Nile Cruise Port', category: 'Experiences', time: '2 hrs', description: 'See Cairo’s lights and landmarks from the river.', left: '47%', top: '82%', icon: 'port', image: '/legacy/assets/cairo-cards/nile-cruise-port.png' }
  ];

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = '/cairo.css?v=20261015-1';
  document.head.appendChild(stylesheet);

  const icon = (type) => ({ attraction: '●', museum: '▥', mosque: '♟', church: '✚', viewpoint: '●', port: '⚓' }[type] || '●');
  const card = (place) => `
    <button class="cairo-place-card" type="button" data-cairo-place="${place.name}" data-category="${place.category}" aria-pressed="false">
      <img src="${place.image}" alt="${place.name}" loading="lazy"><span class="cairo-card-copy"><strong>${place.name}</strong><small>${icon(place.icon)} &nbsp; ${place.time}</small><em>${place.description}</em></span><span class="cairo-check" aria-hidden="true"></span>
    </button>`;
  const pin = (place) => `
    <button class="cairo-pin ${place.icon}" type="button" data-cairo-place="${place.name}" data-category="${place.category}" style="left:${place.left};top:${place.top}" aria-label="Explore ${place.name}">
      <span class="cairo-pin-icon">${icon(place.icon)}</span><span class="cairo-pin-label"><strong>${place.name}</strong></span>
    </button>`;

  const view = document.createElement('section');
  view.className = 'cairo-view';
  view.id = 'cairoView';
  view.hidden = true;
  view.setAttribute('aria-label', 'Interactive Cairo and Giza map');
  view.innerHTML = `
    <div class="cairo-backdrop"></div><div class="cairo-wash"></div>
    <header class="cairo-nav">
      <a class="cairo-brand" href="#top" aria-label="Nilora home"><span>𓂀</span><b>NILORA</b><small>TIME LIVES HERE</small></a>
      <div class="cairo-actions"><button type="button" class="cairo-language" aria-label="Change language">◎</button><button type="button" class="cairo-signin">Sign In</button></div>
    </header>
    <button class="cairo-back" type="button">← <span>Back to Egypt</span></button>
    <div class="cairo-map" aria-label="Cairo and Giza landmarks">${places.map(pin).join('')}</div>
    <button class="cairo-panel-toggle" type="button" aria-label="Close Cairo places panel" aria-controls="cairoPanel" aria-expanded="true">−</button>
    <aside class="cairo-panel" id="cairoPanel" aria-labelledby="cairoPanelTitle">
      <div class="cairo-panel-head"><p>CAIRO &amp; GIZA GUIDE</p><h2 id="cairoPanelTitle">Explore Cairo</h2><span>Select the places you want to explore</span></div>
      <div class="cairo-place-list">${places.map(card).join('')}</div>
    </aside>
    <div class="cairo-mascot" aria-live="polite"><img src="/legacy/assets/felfel.png" alt="Felfel"><div class="cairo-mascot-caption"><strong>So many incredible<br>places in Cairo!</strong><span>Where will you go first?</span><button type="button" aria-label="Continue">→</button></div></div>
    <div class="cairo-legend" role="group" aria-label="Filter Cairo landmarks">
      <button type="button" class="cairo-filter-button is-active" data-cairo-filter="All" aria-pressed="true"><i class="all">✦</i><span>All</span></button>
      <button type="button" class="cairo-filter-button" data-cairo-filter="Ancient Egypt" aria-pressed="false"><i class="attraction">●</i><span>Ancient Egypt</span></button>
      <button type="button" class="cairo-filter-button" data-cairo-filter="Museums" aria-pressed="false"><i class="museum">▥</i><span>Museums</span></button>
      <button type="button" class="cairo-filter-button" data-cairo-filter="Islamic Cairo" aria-pressed="false"><i class="mosque">♟</i><span>Islamic Cairo</span></button>
      <button type="button" class="cairo-filter-button" data-cairo-filter="Coptic Cairo" aria-pressed="false"><i class="church">✚</i><span>Coptic Cairo</span></button>
      <button type="button" class="cairo-filter-button" data-cairo-filter="Experiences" aria-pressed="false"><i class="viewpoint">●</i><span>Experiences</span></button>
    </div>`;
  document.body.appendChild(view);

  const closeExistingService = () => {
    const panel = document.querySelector('#servicePanel');
    const shade = document.querySelector('#panelShade');
    if (panel) panel.hidden = true;
    if (shade) shade.hidden = true;
    document.body.classList.remove('panel-open');
  };
  const closeOtherViews = () => ['closeRedSea', 'closeFayoum', 'closeLuxor', 'closeDestination'].forEach((name) => { if (typeof window[name] === 'function') window[name](); });
  const openCairo = () => { closeOtherViews(); closeExistingService(); view.hidden = false; document.body.classList.add('cairo-open'); history.replaceState(null, '', '#destination/cairo'); window.requestAnimationFrame(() => view.classList.add('is-ready')); };
  const closeCairo = () => { view.classList.remove('is-ready'); document.body.classList.remove('cairo-open'); window.setTimeout(() => { view.hidden = true; }, 220); history.replaceState(null, '', location.pathname); };

  const selected = new Set();
  const panel = view.querySelector('.cairo-panel');
  const panelToggle = view.querySelector('.cairo-panel-toggle');
  const setPanelOpen = (open) => {
    panel.classList.toggle('is-collapsed', !open);
    panelToggle.textContent = open ? '−' : '+';
    panelToggle.setAttribute('aria-expanded', String(open));
    panelToggle.setAttribute('aria-label', open ? 'Close Cairo places panel' : 'Open Cairo places panel');
    panelToggle.title = open ? 'Close places panel' : 'Open places panel';
  };
  panelToggle.addEventListener('click', () => setPanelOpen(panel.classList.contains('is-collapsed')));
  const caption = view.querySelector('.cairo-mascot-caption');
  const showPlace = (name) => { const place = places.find((entry) => entry.name === name); if (!place || !caption) return; caption.querySelector('strong').textContent = place.name; caption.querySelector('span').textContent = `${place.category} · ${place.description}`; view.classList.add('mascot-active'); };
  const resetPlace = () => { if (!caption) return; caption.querySelector('strong').innerHTML = 'So many incredible<br>places in Cairo!'; caption.querySelector('span').textContent = 'Where will you go first?'; view.classList.remove('mascot-active'); };
  const updateSelection = () => { view.querySelectorAll('.cairo-place-card').forEach((cardEl) => { const active = selected.has(cardEl.dataset.cairoPlace); cardEl.classList.toggle('is-selected', active); cardEl.setAttribute('aria-pressed', String(active)); }); view.querySelectorAll('.cairo-pin').forEach((pinEl) => pinEl.classList.toggle('is-selected', selected.has(pinEl.dataset.cairoPlace))); };
  const openCruiseFromCairo = (trigger) => { if (typeof window.openCruise === 'function') window.openCruise(trigger); };
  const selectPlace = (name, trigger) => { selected.add(name); updateSelection(); view.querySelector(`.cairo-place-card[data-cairo-place="${CSS.escape(name)}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); showPlace(name); if (name === 'Nile Cruise Port') openCruiseFromCairo(trigger); };
  view.querySelectorAll('.cairo-place-card').forEach((cardEl) => { cardEl.addEventListener('click', () => { const name = cardEl.dataset.cairoPlace; if (selected.has(name)) selected.delete(name); else selected.add(name); updateSelection(); showPlace(name); if (name === 'Nile Cruise Port') openCruiseFromCairo(cardEl); }); cardEl.addEventListener('pointerenter', () => showPlace(cardEl.dataset.cairoPlace)); cardEl.addEventListener('pointerleave', resetPlace); cardEl.addEventListener('focus', () => showPlace(cardEl.dataset.cairoPlace)); cardEl.addEventListener('blur', resetPlace); });
  view.querySelectorAll('.cairo-pin').forEach((pinEl) => { pinEl.addEventListener('click', () => selectPlace(pinEl.dataset.cairoPlace, pinEl)); pinEl.addEventListener('pointerenter', () => showPlace(pinEl.dataset.cairoPlace)); pinEl.addEventListener('pointerleave', resetPlace); pinEl.addEventListener('focus', () => showPlace(pinEl.dataset.cairoPlace)); pinEl.addEventListener('blur', resetPlace); });
  const filterButtons = [...view.querySelectorAll('.cairo-filter-button')];
  const applyFilter = (category, activeButton) => { filterButtons.forEach((button) => { const active = button === activeButton; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); }); view.querySelectorAll('[data-category]').forEach((element) => { element.hidden = category !== 'All' && element.dataset.category !== category; }); };
  filterButtons.forEach((filter) => filter.addEventListener('click', () => applyFilter(filter.dataset.cairoFilter, filter)));
  applyFilter('All', filterButtons[0]);

  view.querySelector('.cairo-back').addEventListener('click', closeCairo); view.querySelector('.cairo-brand').addEventListener('click', closeCairo); view.querySelector('.cairo-language').addEventListener('click', () => document.querySelector('#languageToggle')?.click()); view.querySelector('.cairo-signin').addEventListener('click', () => { closeCairo(); window.setTimeout(() => document.querySelector('#loginButton')?.click(), 220); });
  window.openCairo = openCairo; window.closeCairo = closeCairo;
  const cairoPoint = document.querySelector('[data-route="cairo"]'); const interceptCairo = (event) => { event.preventDefault(); event.stopImmediatePropagation(); openCairo(); }; cairoPoint?.addEventListener('click', interceptCairo, true); cairoPoint?.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') interceptCairo(event); }, true);
  window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !view.hidden) closeCairo(); });
  if (location.hash === '#destination/cairo') window.setTimeout(openCairo, 0);
})();
