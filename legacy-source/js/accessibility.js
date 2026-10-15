(function () {
  const selectors = [
    '#authLayer:not([hidden]) .auth-modal:not([hidden])',
    '.service-panel:not([hidden])',
    '.destination-view.is-ready',
    '.luxor-final-view.is-visible',
    '.nile-cruise-view.is-visible',
    '.nile-deck-modal.is-visible'
  ];
  const focusable = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  const activeDialog = () => selectors.map((selector) => document.querySelector(selector)).find(Boolean);
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const dialog = activeDialog();
    if (!dialog) return;
    const items = [...dialog.querySelectorAll(focusable)].filter((item) => item.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const trigger = target?.closest('[data-action="forgot-password"]');
    if (!trigger) return;
    event.preventDefault();
    const status = trigger.closest('form')?.querySelector('.auth-status');
    if (status) { status.classList.remove('error'); status.textContent = 'Password recovery will be available when account services are connected.'; }
  });
})();
