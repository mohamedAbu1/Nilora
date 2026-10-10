(function () {
  const hotspots = [
    ['Sun Deck', 'Sun Deck', '18%', '13%'], ['Swimming Pool', 'Sun Deck', '36%', '22%'], ['Jacuzzi', 'Sun Deck', '49%', '22%'], ['Observation Lounge', 'Sun Deck', '65%', '22%'], ['Outdoor Bar', 'Sun Deck', '78%', '22%'], ['Captain’s Bridge', 'Sun Deck', '91%', '13%'],
    ['Grand Lobby', 'Main Deck', '24%', '43%'], ['Reception', 'Main Deck', '40%', '43%'], ['Fine Dining Restaurant', 'Main Deck', '60%', '43%'], ['Lounge & Bar', 'Main Deck', '77%', '43%'], ['Guest Restrooms', 'Main Deck', '89%', '43%'],
    ['Luxury Suite 01', 'Cabin Deck', '25%', '62%'], ['Private Bathroom', 'Cabin Deck', '38%', '62%'], ['Luxury Suite 02', 'Cabin Deck', '51%', '62%'], ['Standard Cabins', 'Cabin Deck', '72%', '62%'], ['Housekeeping', 'Cabin Deck', '88%', '62%'],
    ['Main Kitchen / Galley', 'Lower Deck', '18%', '76%'], ['Cold Storage', 'Lower Deck', '37%', '76%'], ['Laundry', 'Lower Deck', '52%', '76%'], ['Staff Area', 'Lower Deck', '65%', '76%'], ['Engine Room', 'Lower Deck', '77%', '76%'], ['Technical Storage', 'Lower Deck', '91%', '76%'],
  ];
  let modal;
  let api;
  let lastFocus;

  const build = () => {
    if (modal) return api;
    modal = document.createElement('section');
    modal.className = 'nile-deck-modal';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Nile cruise vessel deck map');
    modal.innerHTML = `<div class="nile-deck-backdrop"></div><div class="nile-deck-dialog" tabindex="-1"><button class="nile-deck-close" type="button" aria-label="Close Nile Cruise details">×</button><div class="nile-deck-layout"><div class="nile-deck-visual"><img src="/legacy/assets/luxor-nile-deck.png?v=20261006-1" alt="Interactive cutaway of a luxury Nile cruise vessel"><div class="nile-deck-hotspots" aria-label="Vessel facilities">${hotspots.map(([name, deck, left, top]) => `<button type="button" data-feature="${name}" data-feature-deck="${deck}" style="left:${left};top:${top}" aria-label="${name}, ${deck}"><i aria-hidden="true"></i><span>${name}</span></button>`).join('')}</div></div></div></div>`;
    document.body.appendChild(modal);

    const render = (deckName, featureName) => {
      modal.querySelectorAll('.nile-deck-hotspots button').forEach((button) => {
        const active = Boolean(featureName) && button.dataset.featureDeck === deckName && button.dataset.feature === featureName;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
    };
    const close = () => {
      modal.classList.remove('is-visible');
      document.body.classList.remove('nile-deck-open');
      window.setTimeout(() => { if (modal) modal.hidden = true; }, 260);
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    };
    const open = () => {
      modal.hidden = false;
      render();
      requestAnimationFrame(() => { modal.classList.add('is-visible'); modal.querySelector('.nile-deck-dialog').focus(); });
      document.body.classList.add('nile-deck-open');
    };

    modal.querySelector('.nile-deck-close').addEventListener('click', close);
    modal.querySelector('.nile-deck-backdrop').addEventListener('click', close);
    modal.querySelectorAll('.nile-deck-hotspots button').forEach((button) => button.addEventListener('click', () => render(button.dataset.featureDeck, button.dataset.feature)));
    modal.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
      if (event.key !== 'Tab') return;
      const focusable = [...modal.querySelectorAll('button, [tabindex="0"]')].filter((item) => !item.disabled);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    api = { open, close };
    return api;
  };

  const openForTrigger = (trigger) => { lastFocus = trigger; build().open(); };
  const bind = () => [...document.querySelectorAll('.luxor-final-cruise-label, .local-pin.cruise, [data-place="Nile Cruise"], .nile-cruise-vessel, .place-option')]
    .filter((trigger) => !trigger.classList.contains('place-option') || trigger.querySelector('strong')?.textContent.trim() === 'Nile Cruise')
    .forEach((trigger) => {
      if (trigger.dataset.nileDeckReady) return;
      trigger.dataset.nileDeckReady = 'true';
      trigger.addEventListener('click', (event) => { event.preventDefault(); event.stopImmediatePropagation(); openForTrigger(trigger); }, true);
      trigger.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openForTrigger(trigger); } });
    });

  window.openNileDeck = () => build().open();
  bind();
  window.addEventListener('nilora:luxor-ready', bind, { once: true });
  window.addEventListener('nilora:cruise-label-ready', bind);
})();
