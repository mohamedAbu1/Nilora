(function () {
  const setup = () => {
    const view = document.querySelector('#luxorFinalView');
    const guide = view?.querySelector('.luxor-final-mascot > div');
    if (!view || !guide || guide.dataset.hoverReady) return;
    guide.dataset.hoverReady = 'true';
    const original = guide.innerHTML;

    const show = (source) => {
      const name = source.dataset.finalPlace;
      const card = view.querySelector(`.luxor-final-card[data-final-place="${CSS.escape(name)}"]`);
      const category = source.dataset.category || card?.dataset.category || 'Landmark';
      const description = card?.querySelector('em')?.textContent || 'Discover this remarkable place in Luxor.';
      guide.innerHTML = '';
      const title = document.createElement('strong');
      title.textContent = name;
      const details = document.createElement('span');
      details.textContent = `${category} · ${description}`;
      const arrow = document.createElement('button');
      arrow.type = 'button';
      arrow.textContent = '→';
      arrow.setAttribute('aria-label', `Open ${name}`);
      guide.append(title, details, arrow);
      guide.classList.add('is-hovering');
      view.querySelectorAll('.luxor-final-pin.is-hovering').forEach((pin) => pin.classList.remove('is-hovering'));
      view.querySelectorAll(`.luxor-final-pin[data-final-place="${CSS.escape(name)}"]`).forEach((pin) => pin.classList.add('is-hovering'));
    };
    const reset = () => {
      guide.innerHTML = original;
      guide.classList.remove('is-hovering');
      view.querySelectorAll('.luxor-final-pin.is-hovering').forEach((pin) => pin.classList.remove('is-hovering'));
    };
    view.querySelectorAll('.luxor-final-pin, .luxor-final-card').forEach((item) => {
      item.addEventListener('mouseenter', () => show(item));
      item.addEventListener('focus', () => show(item));
      item.addEventListener('mouseleave', reset);
      item.addEventListener('blur', reset);
    });
  };
  setup();
  window.addEventListener('nilora:luxor-ready', setup, { once: true });
})();
