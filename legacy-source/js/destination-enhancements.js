(function () {
  const builder = document.querySelector('#visitBuilder');
  if (!builder) return;

  const image = '/legacy/assets/aswan.png';
  const places = [
    ['Nile Cruise', '2 hrs', 'A relaxing journey through Aswan waters.'],
    ['Aswan High Dam', '1 hr', 'A landmark of modern Egypt and Nubian life.']
  ];
  const list = builder.querySelector('.place-list');
  places.forEach(([name, time, description]) => {
    if ([...list.querySelectorAll('strong')].some((item) => item.textContent === name)) return;
    const label = document.createElement('label');
    label.className = 'place-option';
    const cardImage = name === 'Aswan High Dam' ? '/legacy/assets/aswan-high-dam-card.png' : image;
    label.innerHTML = `<img src="${cardImage}" alt="${name}"><span><strong>${name}</strong><small>◷ &nbsp;${time}</small><em>${description}</em></span><input type="checkbox">`;
    list.appendChild(label);
  });

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'builder-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<span>Open places</span><b>⌄</b>';
  builder.querySelector('.auth-eyebrow').after(toggle);
  builder.classList.add('is-collapsed');
  toggle.addEventListener('click', () => {
    const collapsed = builder.classList.toggle('is-collapsed');
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.innerHTML = collapsed ? '<span>Open places</span><b>⌄</b>' : '<span>Close places</span><b>⌃</b>';
  });

  const talk = document.querySelector('.destination-mascot strong');
  const defaultTalk = 'Ready to explore<br>the temples?';
  const messages = {
    'Philae Temple': 'Philae Temple<br>on a magical island',
    'Abu Simbel': 'Abu Simbel<br>the royal rock temples',
    'Unfinished Obelisk': 'Unfinished Obelisk<br>an ancient mystery',
    'Kalabsha Temple': 'Kalabsha Temple<br>Nubian history awaits',
    'Nile Cruise': 'Nile Cruise<br>slow journeys on the Nile',
    'Aswan High Dam': 'Aswan High Dam<br>powering modern Egypt'
  };
  const setTalk = (name) => { if (talk) talk.innerHTML = messages[name] || defaultTalk; };
  const resetTalk = () => { if (talk) talk.innerHTML = defaultTalk; };
  document.querySelectorAll('.local-pin, .place-option').forEach((item) => {
    const name = item.dataset.place || item.querySelector('strong')?.textContent;
    item.dataset.place = name;
    item.addEventListener('mouseenter', () => setTalk(name));
    item.addEventListener('focusin', () => setTalk(name));
    item.addEventListener('mouseleave', resetTalk);
    item.addEventListener('focusout', resetTalk);
  });

  const languageButton = document.querySelector('.destination-lang');
  const mainLanguage = document.querySelector('#languageToggle');
  if (languageButton && mainLanguage) languageButton.addEventListener('click', () => mainLanguage.click());
})();
