(function () {
  const enhance = () => {
    const button = document.querySelector('#luxorFinalView .luxor-final-language');
    if (!button || button.dataset.labelReady) return;
    button.dataset.labelReady = 'true';
    button.innerHTML = '<span aria-hidden="true">◎</span><b>EN</b>';
    button.setAttribute('aria-label', 'Change language');
    button.setAttribute('aria-haspopup', 'menu');
  };
  enhance();
  window.addEventListener('nilora:luxor-ready', enhance, { once: true });
})();
