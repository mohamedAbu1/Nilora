type UnifiedPanelWindow = Window & { __niloraUnifiedPanelsInstalled?: boolean };

const styles = `
.nilora-unified-panel{box-sizing:border-box!important;display:flex!important;flex-direction:column!important;gap:0!important;padding:18px 14px 12px!important;border:1px solid rgba(83,216,255,.78)!important;border-radius:20px!important;background:linear-gradient(145deg,rgba(5,45,76,.96),rgba(3,21,40,.98))!important;box-shadow:0 18px 58px rgba(0,0,0,.48),inset 0 1px 0 rgba(255,255,255,.12)!important;backdrop-filter:blur(16px)!important;color:#f8fbff!important}
.nilora-unified-view:not(.nile-cruise-3d-view) .nilora-unified-panel{right:2.5%!important;top:7%!important;bottom:2%!important;width:min(420px,30vw)!important;min-width:340px!important;overflow:hidden!important}
.nilora-unified-panel .cairo-panel-head,.nilora-unified-panel .fayoum-panel-head,.nilora-unified-panel .luxor-final-panel-head,.nilora-unified-panel .redsea-panel-heading,.nilora-unified-panel .nile-cruise-panel-head{padding:0 9px 10px!important;margin:0!important}
.nilora-unified-panel .cairo-panel-head p,.nilora-unified-panel .fayoum-panel-head p,.nilora-unified-panel .luxor-final-panel-head p,.nilora-unified-panel .redsea-panel-heading p,.nilora-unified-panel .nile-cruise-panel-head p,.nilora-unified-panel .auth-eyebrow{margin:0 0 6px!important;color:#f1cd75!important;font:700 .58rem 'DM Mono',monospace!important;letter-spacing:.2em!important}
.nilora-unified-panel h2{margin:0!important;padding-right:38px!important;color:#fff!important;font:700 clamp(1.8rem,2.7vw,2.65rem)/.92 Georgia,serif!important}
.nilora-unified-panel .cairo-panel-head span,.nilora-unified-panel .fayoum-panel-head span,.nilora-unified-panel .luxor-final-panel-head span,.nilora-unified-panel .redsea-panel-heading p,.nilora-unified-panel .nile-cruise-panel-head span,.nilora-unified-panel .builder-intro,.nilora-unified-panel .nilora-unified-subtitle{display:block!important;margin:8px 0 0!important;color:#c3d9e6!important;font-size:.72rem!important}
.nilora-unified-panel .redsea-panel-heading p{margin:8px 0 10px!important;color:#c3d9e6!important;font:400 .72rem/1.25 system-ui,sans-serif!important;letter-spacing:normal!important}
.nilora-unified-panel .cairo-legend,.nilora-unified-panel .fayoum-legend{position:static!important;left:auto!important;right:auto!important;top:auto!important;bottom:auto!important;z-index:auto!important;box-sizing:border-box!important;width:auto!important;background:transparent!important;border:0!important;box-shadow:none!important}
.nilora-unified-panel .nilora-unified-filters,.nilora-unified-panel .cairo-legend,.nilora-unified-panel .fayoum-legend,.nilora-unified-panel .luxor-final-tabs,.nilora-unified-panel .redsea-filters{display:flex!important;flex-wrap:wrap!important;gap:6px!important;align-items:center!important;overflow:visible!important;margin:0 0 9px!important;padding:0 2px 3px!important;order:1!important;scrollbar-width:none!important}
.nilora-unified-panel .nilora-unified-filters::-webkit-scrollbar,.nilora-unified-panel .cairo-legend::-webkit-scrollbar,.nilora-unified-panel .fayoum-legend::-webkit-scrollbar,.nilora-unified-panel .luxor-final-tabs::-webkit-scrollbar,.nilora-unified-panel .redsea-filters::-webkit-scrollbar{display:none}
.nilora-unified-panel .nilora-unified-filters button,.nilora-unified-panel .cairo-legend button,.nilora-unified-panel .fayoum-legend button,.nilora-unified-panel .luxor-final-tabs button,.nilora-unified-panel .redsea-filters button{flex:0 0 auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:4px!important;min-height:32px!important;padding:7px 11px!important;border:1px solid rgba(131,202,233,.42)!important;border-radius:9px!important;background:rgba(9,51,81,.92)!important;color:#eaf8ff!important;white-space:nowrap!important;cursor:pointer!important;font-size:.62rem!important}
.nilora-unified-panel .nilora-unified-filters button.is-active,.nilora-unified-panel .cairo-legend button.is-active,.nilora-unified-panel .fayoum-legend button.is-active,.nilora-unified-panel .luxor-final-tabs button.active,.nilora-unified-panel .redsea-filters button.is-active,.nilora-unified-panel .nilora-unified-filters button:hover,.nilora-unified-panel .cairo-legend button:hover,.nilora-unified-panel .fayoum-legend button:hover,.nilora-unified-panel .luxor-final-tabs button:hover,.nilora-unified-panel .redsea-filters button:hover{border-color:#f4d27b!important;background:linear-gradient(#ffe59a,#e5b84f)!important;color:#142a40!important}
.nilora-unified-panel .cairo-legend i,.nilora-unified-panel .fayoum-legend i{font-style:normal!important}
.nilora-unified-panel .cairo-place-list,.nilora-unified-panel .fayoum-list,.nilora-unified-panel .luxor-final-list,.nilora-unified-panel .redsea-place-list,.nilora-unified-panel .nile-cruise-stops,.nilora-unified-panel .place-list{display:grid!important;grid-template-columns:1fr!important;gap:7px!important;min-height:0!important;flex:1 1 auto!important;overflow:auto!important;padding:1px 2px 4px!important;order:2!important;scrollbar-color:#55d9ff rgba(0,0,0,.18)!important}
.nilora-unified-panel .cairo-place-card,.nilora-unified-panel .fayoum-card,.nilora-unified-panel .luxor-final-card,.nilora-unified-panel .redsea-place,.nilora-unified-panel .nile-stop-card,.nilora-unified-panel .place-option{box-sizing:border-box!important;min-height:68px!important;display:grid!important;grid-template-columns:76px minmax(0,1fr) 21px!important;align-items:center!important;gap:8px!important;padding:5px!important;border:1px solid rgba(128,201,232,.42)!important;border-radius:11px!important;background:rgba(8,52,83,.86)!important;color:#fff!important;text-align:left!important;cursor:pointer!important;transition:transform .2s ease,border-color .2s ease,background .2s ease!important}
.nilora-unified-panel .cairo-place-card:hover,.nilora-unified-panel .cairo-place-card.is-selected,.nilora-unified-panel .fayoum-card:hover,.nilora-unified-panel .fayoum-card.is-selected,.nilora-unified-panel .luxor-final-card:hover,.nilora-unified-panel .luxor-final-card.is-selected,.nilora-unified-panel .redsea-place:hover,.nilora-unified-panel .redsea-place.is-active,.nilora-unified-panel .nile-stop-card:hover,.nilora-unified-panel .nile-stop-card.is-selected,.nilora-unified-panel .place-option:hover,.nilora-unified-panel .place-option.is-active{border-color:#f2d27b!important;background:rgba(16,79,107,.96)!important;transform:translateY(-1px)!important}
.nilora-unified-panel .cairo-place-card img,.nilora-unified-panel .fayoum-card img,.nilora-unified-panel .luxor-final-card img,.nilora-unified-panel .redsea-place img,.nilora-unified-panel .nile-stop-card img,.nilora-unified-panel .place-option img{width:76px!important;height:54px!important;object-fit:cover!important;border-radius:7px!important}
.nilora-unified-panel .cairo-card-copy,.nilora-unified-panel .fayoum-card span,.nilora-unified-panel .luxor-final-card span,.nilora-unified-panel .redsea-place-copy,.nilora-unified-panel .nile-stop-card span,.nilora-unified-panel .place-option span{display:grid!important;gap:2px!important;min-width:0!important}
.nilora-unified-panel .cairo-card-copy strong,.nilora-unified-panel .fayoum-card strong,.nilora-unified-panel .luxor-final-card strong,.nilora-unified-panel .redsea-place-copy strong,.nilora-unified-panel .nile-stop-card strong,.nilora-unified-panel .place-option strong{font-size:.72rem!important;line-height:1.12!important}
.nilora-unified-panel .cairo-card-copy small,.nilora-unified-panel .fayoum-card small,.nilora-unified-panel .luxor-final-card small,.nilora-unified-panel .redsea-time,.nilora-unified-panel .nile-stop-card em,.nilora-unified-panel .place-option small{color:#f1ce74!important;font-size:.55rem!important;line-height:1.15!important}
.nilora-unified-panel .cairo-card-copy em,.nilora-unified-panel .fayoum-card em,.nilora-unified-panel .luxor-final-card em,.nilora-unified-panel .redsea-place-copy em,.nilora-unified-panel .nile-stop-card small,.nilora-unified-panel .place-option em{margin:0!important;color:#c5dce7!important;font-size:.52rem!important;line-height:1.2!important;font-style:normal!important}
.nilora-unified-panel .cairo-check,.nilora-unified-panel .fayoum-card>i,.nilora-unified-panel .luxor-final-card>i,.nilora-unified-panel .redsea-check,.nilora-unified-panel .nile-stop-check,.nilora-unified-panel .place-option input{width:19px!important;height:21px!important;box-sizing:border-box!important;border:2px solid #d5eaf2!important;border-radius:5px!important;justify-self:end!important}
.nilora-unified-panel .cairo-place-card.is-selected .cairo-check,.nilora-unified-panel .fayoum-card.is-selected>i,.nilora-unified-panel .luxor-final-card.is-selected>i,.nilora-unified-panel .redsea-place.is-active .redsea-check,.nilora-unified-panel .nile-stop-card.is-selected .nile-stop-check,.nilora-unified-panel .place-option input:checked{border-color:#f2d27b!important;background:#f2d27b!important;box-shadow:inset 0 0 0 4px #14324c!important}
.nilora-unified-panel .nilora-unified-footer,.nilora-unified-panel .cairo-unified-footer,.nilora-unified-panel .fayoum-unified-footer,.nilora-unified-panel .redsea-unified-footer,.nilora-unified-panel .luxor-final-footer,.nilora-unified-panel .nile-cruise-footer,.nilora-unified-panel .builder-footer{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:8px!important;flex:0 0 auto!important;order:3!important;padding:9px 2px 0!important;margin:7px 0 0!important;border-top:1px solid rgba(169,210,232,.24)!important;color:#d3e4ec!important;font-size:.62rem!important}
.nilora-unified-panel .nilora-unified-footer b,.nilora-unified-panel .cairo-unified-footer b,.nilora-unified-panel .fayoum-unified-footer b,.nilora-unified-panel .redsea-unified-footer b{color:#f2d27b!important;font-size:.85rem!important}
.nilora-unified-panel .nilora-unified-build,.nilora-unified-panel .cairo-unified-footer button,.nilora-unified-panel .fayoum-unified-footer button,.nilora-unified-panel .redsea-unified-footer button,.nilora-unified-panel .luxor-final-build,.nilora-unified-panel .nile-cruise-build,.nilora-unified-panel .builder-footer button{flex:1!important;border:0!important;border-radius:99px!important;background:linear-gradient(#ffe395,#e6b74d)!important;color:#142b42!important;padding:9px 12px!important;font-size:.62rem!important;font-weight:800!important;cursor:pointer!important}
.nilora-unified-panel .nilora-unified-build.is-complete,.nilora-unified-panel .luxor-final-build.is-complete,.nilora-unified-panel .nile-cruise-build.is-complete,.nilora-unified-panel .builder-footer button.added{background:#55d49b!important}
.nilora-unified-toggle{position:absolute!important;z-index:22!important;width:36px!important;height:36px!important;border:1px solid #63dfff!important;border-radius:50%!important;background:rgba(4,38,65,.96)!important;color:#fff!important;cursor:pointer!important;font-size:1.25rem!important;line-height:1!important;box-shadow:0 6px 18px rgba(0,0,0,.35)!important}
.nilora-unified-toggle:hover,.nilora-unified-toggle:focus-visible{border-color:#f2d27b!important;background:#f2d27b!important;color:#142b42!important;outline:none!important}
.nilora-unified-toggle .redsea-toggle-label{display:none!important}
.nilora-unified-panel>.nilora-unified-toggle{top:13px!important;right:13px!important}
.nilora-unified-view>.cairo-panel-toggle.nilora-unified-toggle,.nilora-unified-view>.redsea-panel-toggle.nilora-unified-toggle,.nilora-unified-view>.nile-cruise-planner-toggle.nilora-unified-toggle{top:7.5%!important;right:3.7%!important}
.nilora-unified-panel .luxor-final-tools,.nilora-unified-panel .fayoum-tools{display:none!important}
.nilora-unified-view .luxor-final-legend{display:none!important}
@media(max-width:1100px) and (min-width:761px){.nilora-unified-view:not(.nile-cruise-3d-view) .nilora-unified-panel{width:33vw!important;min-width:320px!important}.nilora-unified-panel .cairo-place-card,.nilora-unified-panel .fayoum-card,.nilora-unified-panel .luxor-final-card,.nilora-unified-panel .redsea-place,.nilora-unified-panel .nile-stop-card,.nilora-unified-panel .place-option{grid-template-columns:64px minmax(0,1fr) 20px!important}.nilora-unified-panel .cairo-place-card img,.nilora-unified-panel .fayoum-card img,.nilora-unified-panel .luxor-final-card img,.nilora-unified-panel .redsea-place img,.nilora-unified-panel .nile-stop-card img,.nilora-unified-panel .place-option img{width:64px!important;height:52px!important}}
@media(max-width:760px){.nilora-unified-view:not(.nile-cruise-3d-view) .nilora-unified-panel{left:3%!important;right:3%!important;top:auto!important;bottom:2%!important;width:auto!important;min-width:0!important;height:44%!important;padding:12px 9px!important;border-radius:16px!important}.nilora-unified-panel h2{font-size:1.55rem!important}.nilora-unified-panel .cairo-place-card,.nilora-unified-panel .fayoum-card,.nilora-unified-panel .luxor-final-card,.nilora-unified-panel .redsea-place,.nilora-unified-panel .nile-stop-card,.nilora-unified-panel .place-option{grid-template-columns:58px minmax(0,1fr) 19px!important;min-height:57px!important;gap:6px!important;padding:4px!important}.nilora-unified-panel .cairo-place-card img,.nilora-unified-panel .fayoum-card img,.nilora-unified-panel .luxor-final-card img,.nilora-unified-panel .redsea-place img,.nilora-unified-panel .nile-stop-card img,.nilora-unified-panel .place-option img{width:58px!important;height:43px!important}.nilora-unified-panel .cairo-card-copy strong,.nilora-unified-panel .fayoum-card strong,.nilora-unified-panel .luxor-final-card strong,.nilora-unified-panel .redsea-place-copy strong,.nilora-unified-panel .nile-stop-card strong,.nilora-unified-panel .place-option strong{font-size:.65rem!important}.nilora-unified-panel .cairo-card-copy small,.nilora-unified-panel .fayoum-card small,.nilora-unified-panel .luxor-final-card small,.nilora-unified-panel .redsea-time,.nilora-unified-panel .nile-stop-card em,.nilora-unified-panel .place-option small{font-size:.5rem!important}.nilora-unified-panel .cairo-card-copy em,.nilora-unified-panel .fayoum-card em,.nilora-unified-panel .luxor-final-card em,.nilora-unified-panel .redsea-place-copy em,.nilora-unified-panel .nile-stop-card small,.nilora-unified-panel .place-option em{font-size:.47rem!important}.nilora-unified-view>.cairo-panel-toggle.nilora-unified-toggle,.nilora-unified-view>.redsea-panel-toggle.nilora-unified-toggle{top:74px!important;right:4%!important}.nilora-unified-panel .builder-toggle{width:auto!important}}
`;

const panelDefinitions = [
  { view: '#cairoView', panel: '.cairo-panel', list: '.cairo-place-list', cards: '.cairo-place-card', filter: '.cairo-legend', toggle: '.cairo-panel-toggle', destination: 'Cairo' },
  { view: '#fayoumFinalView', panel: '.fayoum-final-panel', list: '.fayoum-list', cards: '.fayoum-card', filter: '.fayoum-legend', toggle: '.fayoum-panel-toggle', destination: 'Fayoum' },
  { view: '#luxorFinalView', panel: '.luxor-final-panel', list: '.luxor-final-list', cards: '.luxor-final-card', filter: '.luxor-final-tabs', toggle: '.luxor-final-panel-toggle', destination: 'Luxor' },
  { view: '#redseaView', panel: '.redsea-panel', list: '.redsea-place-list', cards: '.redsea-place', filter: '.redsea-filters', toggle: '#redseaPanelToggle', destination: 'Red Sea' },
  { view: '#nileCruiseView', panel: '.nile-cruise-panel', list: '.nile-cruise-stops', cards: '.nile-stop-card', filter: '.nile-cruise-route-switch', toggle: '.nile-cruise-planner-toggle', destination: 'Nile Cruise' },
  { view: '#aswanView', panel: '#visitBuilder', list: '.place-list', cards: '.place-option', filter: null, toggle: '.builder-toggle', destination: 'Aswan' },
] as const;

type PanelDefinition = (typeof panelDefinitions)[number];

const addUnifiedFooter = (panel: HTMLElement, definition: PanelDefinition) => {
  if (panel.querySelector(':scope > .nilora-unified-footer')) return;
  if (definition.destination === 'Luxor' || definition.destination === 'Nile Cruise' || definition.destination === 'Aswan') return;
  const footer = document.createElement('div');
  footer.className = 'nilora-unified-footer';
  footer.innerHTML = `<span><b class="nilora-unified-count">0</b> places selected</span><button type="button" class="nilora-unified-build">Build ${definition.destination} itinerary →</button>`;
  panel.appendChild(footer);
  footer.querySelector('button')?.addEventListener('click', () => {
    const cards = Array.from(panel.querySelectorAll<HTMLElement>(definition.cards));
    const selected = cards.filter((card) => card.classList.contains('is-selected') || card.classList.contains('is-active') || card.querySelector<HTMLInputElement>('input')?.checked);
    selected.forEach((card) => {
      const name = card.querySelector('strong')?.textContent?.trim();
      if (name) window.NiloraItinerary?.add({ id: `unified-${definition.destination.toLowerCase().replaceAll(' ', '-')}-${name.toLowerCase().replaceAll(' ', '-')}`, type: 'destination', name, route: definition.destination });
    });
    const button = footer.querySelector<HTMLButtonElement>('button');
    if (button) { button.textContent = selected.length ? 'Itinerary ready ✓' : 'Choose a place first →'; button.classList.toggle('is-complete', selected.length === 0); }
  });
};

const updateUnifiedCount = (panel: HTMLElement, definition: PanelDefinition) => {
  const cards = Array.from(panel.querySelectorAll<HTMLElement>(definition.cards));
  const selected = cards.filter((card) => card.classList.contains('is-selected') || card.classList.contains('is-active') || card.querySelector<HTMLInputElement>('input')?.checked).length;
  const nextValue = String(selected);
  panel.querySelectorAll<HTMLElement>('.nilora-unified-count').forEach((node) => {
    if (node.textContent !== nextValue) node.textContent = nextValue;
  });
};

const normalizePanel = (view: HTMLElement, definition: PanelDefinition) => {
  const panel = view.querySelector<HTMLElement>(definition.panel);
  if (!panel) return;
  view.classList.add('nilora-unified-view');
  panel.classList.add('nilora-unified-panel');
  panel.dataset.unifiedDestination = definition.destination;
  panel.querySelector(definition.list)?.classList.add('nilora-unified-list');
  panel.querySelectorAll<HTMLElement>(definition.cards).forEach((card) => card.classList.add('nilora-unified-card'));

  const hasSubtitle = panel.querySelector('.cairo-panel-head span,.fayoum-panel-head span,.luxor-final-panel-head span,.redsea-panel-heading p,.nile-cruise-panel-head span,.builder-intro,.nilora-unified-subtitle');
  const title = panel.querySelector('h2');
  if (!hasSubtitle && title) {
    const subtitle = document.createElement('span');
    subtitle.className = 'nilora-unified-subtitle';
    subtitle.textContent = 'Select the places you want to explore';
    title.insertAdjacentElement('afterend', subtitle);
  }

  const filter = definition.filter ? view.querySelector<HTMLElement>(definition.filter) : null;
  if (filter) {
    filter.classList.add('nilora-unified-filters');
    if (filter.parentElement !== panel && definition.destination !== 'Nile Cruise') panel.appendChild(filter);
  }

  const toggle = view.querySelector<HTMLElement>(definition.toggle);
  toggle?.classList.add('nilora-unified-toggle');
  if (toggle && definition.destination === 'Aswan') toggle.classList.add('nilora-unified-toggle');
  addUnifiedFooter(panel, definition);
  updateUnifiedCount(panel, definition);
};

export function installUnifiedDestinationPanels() {
  const globalWindow = window as UnifiedPanelWindow;
  if (globalWindow.__niloraUnifiedPanelsInstalled) return;
  globalWindow.__niloraUnifiedPanelsInstalled = true;

  const stylesheet = document.createElement('style');
  stylesheet.dataset.niloraUnifiedDestinationPanels = 'true';
  stylesheet.textContent = styles;
  document.head.appendChild(stylesheet);

  const observedPanels = new WeakSet<HTMLElement>();
  const observePanel = (panel: HTMLElement, definition: PanelDefinition) => {
    if (observedPanels.has(panel)) return;
    observedPanels.add(panel);
    const observer = new MutationObserver(() => updateUnifiedCount(panel, definition));
    observer.observe(panel, { subtree: true, attributes: true, attributeFilter: ['class', 'checked', 'aria-pressed'] });
  };
  const applyAndObserve = () => panelDefinitions.forEach((definition) => {
    const view = document.querySelector<HTMLElement>(definition.view);
    const panel = view?.querySelector<HTMLElement>(definition.panel);
    if (view && panel) {
      normalizePanel(view, definition);
      observePanel(panel, definition);
    }
  });
  applyAndObserve();
  const observer = new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => Array.from(mutation.addedNodes).some((node) => {
      if (!(node instanceof HTMLElement)) return false;
      return panelDefinitions.some((definition) => node.matches(definition.view) || Boolean(node.querySelector(definition.panel)));
    }));
    if (relevant) applyAndObserve();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

declare global {
  interface Window {
    NiloraItinerary?: { add: (payload: unknown) => void };
  }
}

