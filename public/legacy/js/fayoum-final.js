(function () {
  const places = [
    ['Lake Qarun', 'Nature', '2–3 hrs', 'Egypt’s largest natural lake. Birdwatching, scenery and tranquility.', '42%', '17%', 'lake-qarun'],
    ['Wadi El Rayan', 'Nature', '2–4 hrs', 'Stunning waterfalls and twin lakes in the desert.', '18%', '58%', 'wadi-el-rayan'],
    ['Wadi Al-Hitan', 'Fossils', '3–4 hrs', 'UNESCO World Heritage Site. Ancient whale fossils in the desert.', '36%', '77%', 'wadi-al-hitan'],
    ['Magic Lake', 'Nature', '1–2 hrs', 'A breathtaking desert lake surrounded by golden dunes.', '51%', '74%', 'magic-lake'],
    ['Jabal Al-Medawara', 'Nature', '2–3 hrs', 'Panoramic views over Fayoum Oasis and Lake Qarun.', '17%', '28%', 'jabal-al-medawara'],
    ['Tunis Village', 'Villages & Art', '2–3 hrs', 'Art, pottery, and authentic village atmosphere.', '13%', '43%', 'tunis-village'],
    ['Karanis', 'Archaeology', '1–2 hrs', 'Roman city ruins with a fascinating history.', '66%', '38%', 'karanis'],
    ['Qasr Qarun', 'Archaeology', '1–2 hrs', 'Ancient temple overlooking Lake Qarun.', '73%', '10%', 'qasr-qarun'],
    ['Medinet Madi', 'Archaeology', '1–2 hrs', 'The remains of a major ancient city.', '76%', '52%', 'medinet-madi'],
    ['Dime (Soknopaiou Nesos)', 'Archaeology', '1–2 hrs', 'A remote temple complex on an island in the lake.', '51%', '51%', 'dime'],
  ];
  const icons = { Nature: '◆', Fossils: '◈', Archaeology: '♜', 'Villages & Art': '●' };
  let view;

  const card = ([name, category, time, description, , , slug]) => `<button class="fayoum-card" type="button" data-fayoum-place="${name}" data-category="${category}"><img class="fayoum-thumb" src="/legacy/assets/fayoum/${slug}.png" alt="${name}" loading="lazy"><span><strong>${name}</strong><small>${icons[category]} &nbsp; ${time}</small><em>${description}</em></span><i aria-hidden="true">□</i></button>`;
  const pin = ([name, category, , , left, top]) => `<button class="fayoum-pin ${category.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and')}" type="button" data-fayoum-place="${name}" style="left:${left};top:${top}" aria-label="Explore ${name}"><i>${icons[category]}</i><b>${name}</b></button>`;

  function build() {
    if (view) return view;
    view = document.createElement('section');
    view.id = 'fayoumFinalView';
    view.className = 'fayoum-final-view';
    view.hidden = true;
    view.innerHTML = `<div class="fayoum-final-backdrop"></div><div class="fayoum-final-wash"></div><header class="fayoum-final-header"><a class="fayoum-final-brand" href="#top" aria-label="Nilora home"><span>𓂀</span><b>NILORA</b><small>TIME LIVES HERE</small></a><div class="fayoum-final-actions"><button type="button" class="fayoum-final-language" aria-label="Change language">◎</button><button type="button" class="fayoum-final-signin">Sign In</button></div></header><button class="fayoum-final-back" type="button">← &nbsp;Back to Egypt</button><div class="fayoum-final-routes" aria-hidden="true"><span class="eco-route"></span><span class="desert-route"></span></div><div class="fayoum-final-pins" aria-label="Interactive Fayoum landmarks">${places.map(pin).join('')}</div><aside class="fayoum-final-panel" aria-labelledby="fayoumPanelTitle"><div class="fayoum-panel-head"><p>FAYOUM GUIDE</p><button class="fayoum-panel-toggle" type="button" aria-expanded="true">−</button><h2 id="fayoumPanelTitle">Explore Fayoum</h2></div><div class="fayoum-list">${places.map(card).join('')}</div></aside><div class="fayoum-final-mascot" aria-live="polite"><img src="/legacy/assets/felfel.png" alt="Felfel"><div><strong class="fayoum-mascot-message">مرر المؤشر على أي مكان لاستكشافه</strong><button type="button" aria-label="Continue">→</button></div></div><div class="fayoum-legend" role="group" aria-label="Fayoum place filters"><button type="button" class="is-active" data-fayoum-filter="All" aria-pressed="true">All</button><button type="button" data-fayoum-filter="Nature" aria-pressed="false">Nature</button><button type="button" data-fayoum-filter="Archaeology" aria-pressed="false">Archaeology</button><button type="button" data-fayoum-filter="Fossils" aria-pressed="false">Fossils</button><button type="button" data-fayoum-filter="Villages & Art" aria-pressed="false">Villages & Art</button></div>`;
    document.body.appendChild(view);
    const panel = view.querySelector('.fayoum-final-panel');
    const select = (name) => { const cardEl = view.querySelector(`.fayoum-card[data-fayoum-place="${CSS.escape(name)}"]`); const pinEl = view.querySelector(`.fayoum-pin[data-fayoum-place="${CSS.escape(name)}"]`); cardEl?.classList.toggle('is-selected'); pinEl?.classList.toggle('is-selected', cardEl?.classList.contains('is-selected')); cardEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); };
    const close = () => { view.classList.remove('is-visible'); document.body.classList.remove('fayoum-open'); window.setTimeout(() => { view.hidden = true; }, 320); history.replaceState(null, '', location.pathname); };
    view.querySelector('.fayoum-panel-toggle').onclick = () => { const collapsed = panel.classList.toggle('is-collapsed'); view.querySelector('.fayoum-panel-toggle').textContent = collapsed ? '+' : '−'; view.querySelector('.fayoum-panel-toggle').setAttribute('aria-expanded', String(!collapsed)); };
    const mascot = view.querySelector('.fayoum-final-mascot');
    const mascotMessage = view.querySelector('.fayoum-mascot-message');
    const localized = {
      en: { idle: 'Hover over any place to explore', place: (name) => `Great! Explore ${name}`, filters: ['All', 'Nature', 'Archaeology', 'Fossils', 'Villages & Art'] },
      ar: { idle: 'مرر المؤشر على أي مكان لاستكشافه', place: (name) => `رائع! اكتشف ${name}`, filters: ['الكل', 'طبيعة', 'آثار', 'حفريات', 'قرى وفنون'] },
      es: { idle: 'Pasa el cursor sobre un lugar para explorarlo', place: (name) => `¡Genial! Explora ${name}`, filters: ['Todo', 'Naturaleza', 'Arqueología', 'Fósiles', 'Pueblos y arte'] },
      fr: { idle: 'Survolez un lieu pour l’explorer', place: (name) => `Super ! Découvrez ${name}`, filters: ['Tout', 'Nature', 'Archéologie', 'Fossiles', 'Villages et art'] },
      de: { idle: 'Bewege den Cursor über einen Ort', place: (name) => `Großartig! Entdecke ${name}`, filters: ['Alle', 'Natur', 'Archäologie', 'Fossilien', 'Dörfer und Kunst'] },
      it: { idle: 'Passa il cursore su un luogo per esplorarlo', place: (name) => `Fantastico! Scopri ${name}`, filters: ['Tutto', 'Natura', 'Archeologia', 'Fossili', 'Villaggi e arte'] },
      zh: { idle: '将鼠标移到地点上开始探索', place: (name) => `太棒了！探索${name}`, filters: ['全部', '自然', '考古', '化石', '村庄与艺术'] },
    };
    const getLocaleCopy = () => localized[window.NiloraI18n?.locale || document.documentElement.lang] || localized.en;
    const applyLocale = () => { const copy = getLocaleCopy(); mascotMessage.textContent = copy.idle; view.querySelectorAll('[data-fayoum-filter]').forEach((button, index) => { button.textContent = copy.filters[index]; }); };
    const placeMessage = (name) => getLocaleCopy().place(name);
    const reactToPlace = (name) => { mascotMessage.textContent = placeMessage(name); mascot.classList.add('is-reacting'); window.clearTimeout(mascot._reactionTimer); mascot._reactionTimer = window.setTimeout(() => mascot.classList.remove('is-reacting'), 650); };
    const resetMascot = () => { mascotMessage.textContent = getLocaleCopy().idle; mascot.classList.remove('is-reacting'); };
    const chooseFilter = (filter) => { view.querySelectorAll('[data-fayoum-filter]').forEach((button) => { const active = button.dataset.fayoumFilter === filter; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); }); view.querySelectorAll('.fayoum-card').forEach((item) => { item.hidden = filter !== 'All' && item.dataset.category !== filter; }); view.querySelectorAll('.fayoum-pin').forEach((item) => { item.hidden = filter !== 'All' && !item.classList.contains(filter.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and')); }); };
    view.querySelectorAll('[data-fayoum-filter]').forEach((button) => button.addEventListener('click', () => chooseFilter(button.dataset.fayoumFilter)));
    view.addEventListener('nilora:localechange', applyLocale);
    window.addEventListener('nilora:localechange', applyLocale);
    applyLocale();
    view.querySelectorAll('.fayoum-card').forEach((item) => { item.addEventListener('click', () => select(item.dataset.fayoumPlace)); item.addEventListener('mouseenter', () => reactToPlace(item.dataset.fayoumPlace)); item.addEventListener('mouseleave', resetMascot); });
    view.querySelectorAll('.fayoum-pin').forEach((item) => { item.addEventListener('click', () => { panel.classList.remove('is-collapsed'); select(item.dataset.fayoumPlace); }); item.addEventListener('mouseenter', () => reactToPlace(item.dataset.fayoumPlace)); item.addEventListener('mouseleave', resetMascot); });
    view.querySelector('.fayoum-final-back').onclick = close;
    view.querySelector('.fayoum-final-brand').onclick = close;
    view.querySelector('.fayoum-final-language').onclick = () => document.querySelector('#languageToggle')?.click();
    view.querySelector('.fayoum-final-signin').onclick = () => { close(); document.querySelector('#loginButton')?.click(); };
    view.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
    view._open = () => { view.hidden = false; document.body.classList.add('fayoum-open'); history.replaceState(null, '', '#destination/fayoum'); requestAnimationFrame(() => view.classList.add('is-visible')); };
    return view;
  }

  window.openFayoum = () => build()._open();
  document.addEventListener('click', (event) => { const trigger = event.target.closest?.('.map-point[data-route="fayoum"]'); if (!trigger) return; event.preventDefault(); event.stopImmediatePropagation(); window.openFayoum(); }, true);
  document.addEventListener('keydown', (event) => { const trigger = event.target.closest?.('.map-point[data-route="fayoum"]'); if (trigger && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); event.stopImmediatePropagation(); window.openFayoum(); } }, true);
  if (location.hash === '#destination/fayoum') window.setTimeout(window.openFayoum, 0);
})();
