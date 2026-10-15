(function () {
  const storageKey = 'nilora-itinerary';
  const read = () => { try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; } };
  const write = (items) => { try { localStorage.setItem(storageKey, JSON.stringify(items)); } catch {} };
  const add = (item) => {
    const items = read().filter((entry) => entry.id !== item.id);
    items.push({ ...item, savedAt: new Date().toISOString() });
    write(items);
    window.dispatchEvent(new CustomEvent('nilora:itinerarychange', { detail: { items } }));
    return items;
  };
  window.NiloraItinerary = { read, add, clear: () => write([]) };
})();
