(function () {
  const stops = [
    ['Luxor', 'Luxor Temple, Karnak Temple', 'luxor', 'luxor-temple-card.png', '3–4 hrs'],
    ['Esna', 'Temple of Khnum', 'esna', 'luxor-east-card.png', '1–2 hrs'],
    ['Edfu', 'Temple of Horus', 'edfu', 'luxor-west-card.png', '2–3 hrs'],
    ['Kom Ombo', 'Temple of Kom Ombo', 'kom-ombo', 'luxor-nile-card.png', '1–2 hrs'],
    ['Aswan', 'Philae Temple, Aswan High Dam', 'aswan', 'aswan-high-dam-card.png', '2–3 hrs'],
  ];
  let view;
  let lastFocus;
  const selectedByDefault = (slug, index) => index === 0 || ['edfu', 'kom-ombo', 'aswan'].includes(slug);
  const stopCard = ([name, places, slug, image, duration], index) => { const selected = selectedByDefault(slug, index); return `<label class="nile-cruise-card ${selected ? 'is-selected' : ''}"><img src="/legacy/assets/${image}" alt="${name}"><span><strong>${name}</strong><small>${places}</small><em>◷ &nbsp;${duration}</em></span><input type="checkbox" data-stop-check="${slug}" ${selected ? 'checked' : ''}></label>`; };
  const stopPin = ([name, places, slug]) => `<button class="nile-cruise-stop" type="button" data-stop="${slug}" aria-label="Explore ${name}"><span class="pin"><b>●</b></span><span class="label"><strong>${name}</strong><small>${places.split(',')[0]}</small></span></button>`;

  function build() {
    if (view) return view;
    view = document.createElement('section');
    view.id = 'nileCruiseView'; view.className = 'nile-cruise-view'; view.hidden = true;
    view.innerHTML = `<div class="nile-cruise-backdrop"></div><header class="nile-cruise-header"><a class="nile-cruise-brand" href="#top" data-cruise-close><span>𓂀</span><b>NILORA</b><small>TIME LIVES HERE</small></a><div class="nile-cruise-actions"><button type="button" class="nile-cruise-language" aria-label="Change language">◎ EN</button><button type="button" class="nile-cruise-close" data-cruise-close>← Back to Egypt</button></div></header><main class="nile-cruise-main"><section class="nile-cruise-copy"><p class="eyebrow">A JOURNEY ON THE NILE</p><h1>Luxor<br><em>to Aswan</em></h1><p>Ancient temples. Timeless views.<br>A Nile cruise through history.</p><div class="nile-cruise-highlights"><div class="nile-cruise-highlight"><i>▱</i><span><strong>3–4 nights</strong><small>Unforgettable journey</small></span></div><div class="nile-cruise-highlight"><i>◉</i><span><strong>Iconic temples</strong><small>Along the Nile</small></span></div><div class="nile-cruise-highlight"><i>♨</i><span><strong>Scenic beauty</strong><small>Desert, villages & life on the river</small></span></div></div></section><section class="nile-cruise-map" aria-label="Interactive Nile cruise map"><svg class="nile-cruise-route" viewBox="0 0 180 700" preserveAspectRatio="none" aria-hidden="true"><path class="route-glow" d="M92 34 C44 120 128 180 78 265 S115 395 78 480 S122 590 88 670"></path><path d="M92 34 C44 120 128 180 78 265 S115 395 78 480 S122 590 88 670"></path></svg>${stops.map(stopPin).join('')}</section><aside class="nile-cruise-planner" aria-labelledby="nileCruiseTitle"><h2 id="nileCruiseTitle">Plan Your Nile Cruise</h2><p>Choose your route, duration and dates to create your perfect journey.</p><div class="nile-cruise-segment"><button class="is-selected" data-route-choice="luxor-aswan">Luxor → Aswan</button><button data-route-choice="aswan-luxor">Aswan → Luxor</button></div><div class="nile-cruise-nights"><button data-nights="3">3 nights</button><button class="is-selected" data-nights="4">4 nights</button><button data-nights="5">5 nights</button></div><div class="nile-cruise-fields"><label class="nile-cruise-field"><span>Departure date</span><select><option>Apr 15, 2025</option><option>May 02, 2025</option><option>Jun 18, 2025</option></select></label><label class="nile-cruise-field"><span>Travelers</span><select><option>2 Adults</option><option>1 Adult</option><option>2 Adults, 1 Child</option></select></label></div><h3>Select your stops <small>(North to South)</small></h3><div class="nile-cruise-stops">${stops.map(stopCard).join('')}</div><div class="nile-cruise-footer"><span><b class="nile-cruise-count">4</b> stops selected</span><button class="nile-cruise-build" type="button">Build My Cruise Itinerary →</button></div></aside></main><div class="nile-cruise-mascot"><img src="/legacy/assets/felfel.png" alt="Felfel"><div class="nile-cruise-bubble"><strong>Same river,<br>more stories!</strong><span>Ready to cruise?</span><button type="button">→</button></div></div><div class="nile-cruise-bottom"><div><strong>~ 230 km</strong><span>Luxor to Aswan</span></div><div><strong>◷ &nbsp;3–4 nights</strong><span>Relax. Explore. Discover.</span></div><div><strong>♨ &nbsp;Temples</strong><span>Villages · Timeless views</span></div></div>`;
    document.body.appendChild(view);
    const vessel = document.createElement('button');
    vessel.type = 'button';
    vessel.className = 'nile-cruise-vessel';
    vessel.setAttribute('aria-label', 'Cruise ship');
    vessel.title = 'Cruise';
    vessel.innerHTML = '<span aria-hidden="true">⌁</span><b>Cruise</b>';
    view.querySelector('.nile-cruise-map').appendChild(vessel);
    wire(); return view;
  }

  function wire() {
    const close = () => { const returnToCairo = document.body.classList.contains('cairo-open'); view.classList.remove('is-visible'); window.setTimeout(() => { view.hidden = true; document.body.classList.remove('nile-cruise-open'); }, 260); history.replaceState(null, '', returnToCairo ? '#destination/cairo' : location.pathname); if (lastFocus && document.contains(lastFocus)) { lastFocus.focus(); lastFocus = null; } };
    const open = (trigger) => {
      if (trigger && typeof trigger.focus === 'function') lastFocus = trigger;
      build();
      document.querySelector('#luxorFinalView')?.classList.remove('is-visible');
      document.querySelector('#luxorFinalView')?.setAttribute('hidden', '');
      document.querySelector('#aswanView')?.setAttribute('hidden', '');
      document.querySelector('#servicePanel')?.setAttribute('hidden', '');
      document.querySelector('#panelShade')?.setAttribute('hidden', '');
      document.body.classList.remove('luxor-open', 'panel-open');
      view.hidden = false;
      document.body.classList.add('nile-cruise-open');
      history.replaceState(null, '', '#cruise');
      window.requestAnimationFrame(() => view.classList.add('is-visible'));
    };
    view.querySelectorAll('[data-cruise-close]').forEach((button) => button.addEventListener('click', (event) => { event.preventDefault(); close(); }));
    view.querySelector('.nile-cruise-language').addEventListener('click', () => document.querySelector('#languageToggle')?.click());
    view.querySelectorAll('[data-route-choice]').forEach((button) => button.addEventListener('click', () => { view.querySelectorAll('[data-route-choice]').forEach((item) => item.classList.remove('is-selected')); button.classList.add('is-selected'); }));
    view.querySelectorAll('[data-nights]').forEach((button) => button.addEventListener('click', () => { view.querySelectorAll('[data-nights]').forEach((item) => item.classList.remove('is-selected')); button.classList.add('is-selected'); }));
    const count = view.querySelector('.nile-cruise-count');
    const update = () => { const selected = view.querySelectorAll('[data-stop-check]:checked').length; count.textContent = String(selected); view.querySelectorAll('.nile-cruise-card').forEach((card) => card.classList.toggle('is-selected', card.querySelector('input').checked)); view.querySelectorAll('.nile-cruise-stop').forEach((pin) => pin.classList.toggle('is-active', view.querySelector(`[data-stop-check="${pin.dataset.stop}"]`)?.checked)); };
    view.querySelectorAll('[data-stop-check]').forEach((input) => input.addEventListener('change', update));
    view.querySelectorAll('.nile-cruise-stop').forEach((pin) => pin.addEventListener('click', () => { const input = view.querySelector(`[data-stop-check="${pin.dataset.stop}"]`); if (input) { input.checked = !input.checked; update(); } }));
    view.querySelector('.nile-cruise-build').addEventListener('click', (event) => {
      const selected = [...view.querySelectorAll('[data-stop-check]:checked')].map((input) => input.dataset.stopCheck);
      if (window.NiloraItinerary) {
        window.NiloraItinerary.add({
          id: 'nile-cruise-route',
          type: 'cruise',
          name: 'Nile Cruise',
          route: view.querySelector('[data-route-choice].is-selected')?.dataset.routeChoice || 'luxor-aswan',
          nights: view.querySelector('[data-nights].is-selected')?.dataset.nights || '4',
          stops: selected
        });
      }
      event.currentTarget.textContent = `Saved ${selected.length} stops ✓`;
      event.currentTarget.classList.add('is-complete');
      event.currentTarget.setAttribute('aria-live', 'polite');
    });
    update(); window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !view.hidden) close(); }); window.openCruise = open;
  }
  build();
  if (location.hash === '#cruise') window.openCruise();
  const planner = document.querySelector('#nileCruiseView .nile-cruise-planner');
  if (planner && !planner.dataset.toggleReady) {
    planner.id = 'nileCruisePlanner';
    planner.dataset.toggleReady = 'true';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nile-cruise-planner-toggle';
    toggle.setAttribute('aria-label', 'Collapse cruise planner');
    toggle.setAttribute('aria-controls', 'nileCruisePlanner');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.title = 'Collapse planner';
    toggle.textContent = '−';
    planner.prepend(toggle);
    toggle.addEventListener('click', () => {
      const collapsed = planner.classList.toggle('is-collapsed');
      toggle.textContent = collapsed ? '+' : '−';
      toggle.setAttribute('aria-expanded', String(!collapsed));
      toggle.setAttribute('aria-label', collapsed ? 'Open cruise planner' : 'Collapse planner');
      toggle.title = collapsed ? 'Open planner' : 'Collapse planner';
    });
  }
})();
