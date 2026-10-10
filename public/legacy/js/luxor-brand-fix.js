(function () {
  const apply = () => {
    const brand = document.querySelector('#luxorFinalView .luxor-final-brand');
    if (!brand) return;
    const name = brand.querySelector('b');
    const strap = brand.querySelector('small');
    if (name) name.textContent = 'NILORA';
    if (strap) strap.textContent = 'TIME LIVES HERE';
  };
  apply();
  window.addEventListener('nilora:luxor-ready', apply, { once: true });
  const open = window.openLuxor;
  if (open) window.openLuxor = () => { open(); window.setTimeout(() => document.querySelector('#luxorFinalView .luxor-final-panel')?.classList.remove('is-collapsed'), 0); };
})();
