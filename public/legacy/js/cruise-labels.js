(function () {
  function addLuxorCruiseLabel() {
    const view = document.querySelector('#luxorFinalView');
    if (!view || view.querySelector('.luxor-final-cruise-label')) return;
    const label = document.createElement('button');
    label.type = 'button';
    label.className = 'luxor-final-cruise-label';
    label.setAttribute('aria-label', 'Cruise');
    label.title = 'Cruise';
    label.innerHTML = '<span aria-hidden="true">⌁</span><b>Cruise</b>';
    view.appendChild(label);
    window.dispatchEvent(new CustomEvent('nilora:cruise-label-ready', { detail: { label } }));
  }

  function renameAswanCruise() {
    const pin = document.querySelector('#aswanView .local-pin.cruise');
    if (!pin) return;
    const name = pin.querySelector('b');
    if (name) name.textContent = 'Cruise';
    pin.setAttribute('aria-label', 'Cruise');
    pin.title = 'Cruise';
  }

  function sync() {
    addLuxorCruiseLabel();
    renameAswanCruise();
  }

  // Sync immediately as well as on lifecycle events so direct hash URLs work
  // even when the Luxor view was built before this script finished loading.
  sync();
  document.addEventListener('DOMContentLoaded', sync);
  window.addEventListener('load', sync);
  window.addEventListener('nilora:luxor-ready', sync, { once: true });
})();
