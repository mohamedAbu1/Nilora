type UnifiedHeaderWindow = Window & { __niloraUnifiedHeadersInstalled?: boolean };

const styles = `
.nilora-unified-header{position:absolute!important;z-index:30!important;top:0!important;left:0!important;right:0!important;height:72px!important;box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:24px!important;padding:0 4.8%!important;color:#fff!important;pointer-events:auto!important}
.nilora-unified-header .nilora-unified-brand{display:flex!important;align-items:center!important;gap:9px!important;min-width:210px!important;color:#f0c96e!important;text-decoration:none!important;letter-spacing:.14em!important;white-space:nowrap!important;cursor:pointer!important;text-shadow:0 2px 10px rgba(0,0,0,.35)!important}
.nilora-unified-header .nilora-unified-brand>span{font-size:1.65rem!important;line-height:1!important}
.nilora-unified-header .nilora-unified-brand b{font:700 1.35rem Georgia,serif!important}
.nilora-unified-header .nilora-unified-brand small{font:700 .48rem 'DM Mono',monospace!important;letter-spacing:.16em!important}
.nilora-unified-header .nilora-unified-actions{display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:9px!important;margin-left:auto!important}
.nilora-unified-header .nilora-unified-actions button{box-sizing:border-box!important;min-width:42px!important;height:42px!important;border:1px solid rgba(105,220,255,.72)!important;border-radius:999px!important;background:rgba(3,28,52,.78)!important;color:#fff!important;padding:8px 14px!important;cursor:pointer!important;backdrop-filter:blur(12px)!important;box-shadow:0 6px 18px rgba(0,0,0,.22)!important;transition:background .2s ease,border-color .2s ease,color .2s ease,transform .2s ease!important}
.nilora-unified-header .nilora-unified-actions button:hover,.nilora-unified-header .nilora-unified-actions button:focus-visible{border-color:#f2d27b!important;background:#f2d27b!important;color:#152b42!important;transform:translateY(-1px)!important;outline:none!important}
.nilora-unified-header .nilora-unified-language{font-size:.76rem!important;font-weight:800!important;letter-spacing:.04em!important}
.nilora-unified-header .nilora-unified-signin{border-color:#edc36d!important;padding-inline:22px!important;font-size:.8rem!important}
.nilora-unified-header .nilora-unified-brand:focus-visible{outline:2px solid #f2d27b!important;outline-offset:5px!important;border-radius:5px!important}
@media(max-width:760px){.nilora-unified-header{height:62px!important;padding:0 4%!important;gap:12px!important}.nilora-unified-header .nilora-unified-brand{min-width:0!important;gap:6px!important}.nilora-unified-header .nilora-unified-brand>span{font-size:1.25rem!important}.nilora-unified-header .nilora-unified-brand b{font-size:1.02rem!important}.nilora-unified-header .nilora-unified-brand small{display:none!important}.nilora-unified-header .nilora-unified-actions{gap:6px!important}.nilora-unified-header .nilora-unified-actions button{height:36px!important;min-width:36px!important;padding:6px 10px!important;font-size:.65rem!important}.nilora-unified-header .nilora-unified-signin{padding-inline:13px!important}}
@media(prefers-reduced-motion:reduce){.nilora-unified-header .nilora-unified-actions button{transition:none!important}}
`;

const headerDefinitions = [
  { view: '#cairoView', header: '.cairo-nav', destination: 'Cairo', close: 'closeCairo' },
  { view: '#fayoumFinalView', header: '.fayoum-final-header', destination: 'Fayoum', close: 'closeFayoum' },
  { view: '#luxorFinalView', header: '.luxor-final-header', destination: 'Luxor', close: 'closeLuxor' },
  { view: '#redseaView', header: '.redsea-nav', destination: 'Red Sea', close: 'closeRedSea' },
  { view: '#aswanView', header: '.destination-nav', destination: 'Aswan', close: 'closeDestination' },
  { view: '#nileCruiseView', header: '.nile-cruise-header', destination: 'Nile Cruise', close: 'closeCruise' },
] as const;

type HeaderDefinition = (typeof headerDefinitions)[number];

const closeView = (view: HTMLElement, definition: HeaderDefinition) => {
  const close = (window as unknown as Record<string, unknown>)[definition.close];
  if (typeof close === 'function') {
    (close as () => void)();
    return;
  }
  const back = view.querySelector<HTMLElement>('.fayoum-final-back,.luxor-final-back,.cairo-back,.redsea-back,.back-egypt');
  back?.click();
};

const renderHeader = (view: HTMLElement, header: HTMLElement, definition: HeaderDefinition) => {
  if (header.dataset.niloraUnifiedHeader === 'true') return;
  view.classList.add('nilora-unified-view');
  header.classList.add('nilora-unified-header');
  header.dataset.niloraUnifiedHeader = 'true';
  header.setAttribute('aria-label', `${definition.destination} navigation`);
  header.innerHTML = `<a class="nilora-unified-brand" href="#top" aria-label="Nilora home"><span aria-hidden="true">𓂀</span><b>NILORA</b><small>TIME LIVES HERE</small></a><div class="nilora-unified-actions" aria-label="Account and language controls"><button class="nilora-unified-language" type="button" aria-label="Change language">◎ EN</button><button class="nilora-unified-signin" type="button">Sign In</button></div>`;

  header.querySelector<HTMLAnchorElement>('.nilora-unified-brand')?.addEventListener('click', (event) => {
    event.preventDefault();
    closeView(view, definition);
  });
  header.querySelector<HTMLButtonElement>('.nilora-unified-language')?.addEventListener('click', () => document.querySelector<HTMLButtonElement>('#languageToggle')?.click());
  header.querySelector<HTMLButtonElement>('.nilora-unified-signin')?.addEventListener('click', () => {
    closeView(view, definition);
    window.setTimeout(() => document.querySelector<HTMLButtonElement>('#loginButton')?.click(), 180);
  });
};

export function installUnifiedDestinationHeaders() {
  const globalWindow = window as UnifiedHeaderWindow;
  if (globalWindow.__niloraUnifiedHeadersInstalled) return;
  globalWindow.__niloraUnifiedHeadersInstalled = true;

  const stylesheet = document.createElement('style');
  stylesheet.dataset.niloraUnifiedDestinationHeaders = 'true';
  stylesheet.textContent = styles;
  document.head.appendChild(stylesheet);

  const apply = () => headerDefinitions.forEach((definition) => {
    const view = document.querySelector<HTMLElement>(definition.view);
    const header = view?.querySelector<HTMLElement>(definition.header);
    if (view && header) renderHeader(view, header, definition);
  });

  apply();
  const observer = new MutationObserver((mutations) => {
    const relevant = mutations.some((mutation) => Array.from(mutation.addedNodes).some((node) => {
      if (!(node instanceof HTMLElement)) return false;
      return headerDefinitions.some((definition) => node.matches(definition.view) || Boolean(node.querySelector(definition.header)));
    }));
    if (relevant) apply();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

