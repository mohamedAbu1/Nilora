'use client';

import { useEffect, useRef } from 'react';
import { installNileCruiseRedesign } from './nileCruiseRedesign';
import { installUnifiedDestinationHeaders } from './unifiedDestinationHeader';
import { installUnifiedDestinationPanels } from './unifiedDestinationPanel';

const legacyScripts = [
  'translations.js', 'itinerary.js', 'app.js', 'auth.js', 'destination-enhancements.js',
  'destination.js', 'luxor-final.js',
  'luxor-brand-fix.js', 'luxor-card-assets.js', 'luxor-language-fix.js', 'fayoum-final.js?v=20261008-2',
  'luxor-hover-guide.js', 'cruise-labels.js', 'luxor-nile-deck.js', '/cairo.js?v=20261015-2', 'nile-cruise.js', '/redsea.js?v=20261014-2', 'accessibility.js',
];

export default function NiloraLegacyPage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const mount = mountRef.current;
    if (!mount) return;
    const container = mount;
    const loadedScripts: HTMLScriptElement[] = [];

    async function migrateLegacyPage() {
      try {
        const response = await fetch('/legacy/index.html');
        if (!response.ok) throw new Error(`Could not load the migrated page (${response.status})`);
        const source = await response.text();
        const documentSource = new DOMParser().parseFromString(source, 'text/html');
        const scripts = Array.from(documentSource.body.querySelectorAll('script'));
        scripts.forEach((script) => script.remove());
        const markup = documentSource.body.innerHTML.replaceAll('assets/', '/legacy/assets/');
        if (cancelled) return;
        container.innerHTML = markup;
        const cairoFilterLayerFix = document.createElement('style');
        cairoFilterLayerFix.textContent = '.cairo-view .cairo-legend{z-index:16}.cairo-view .cairo-legend button{position:relative;z-index:1}';
        container.appendChild(cairoFilterLayerFix);

        for (const file of legacyScripts) {
          if (cancelled) return;
          await new Promise<void>((resolve) => {
            const script = document.createElement('script');
            script.src = file.startsWith('/') ? file : `/legacy/js/${file}`;
            let settled = false;
            const finish = () => {
              if (settled) return;
              settled = true;
              window.clearTimeout(timeoutId);
              resolve();
            };
            const timeoutId = window.setTimeout(() => {
              console.warn(`Timed out while loading ${file}; continuing with the available interface.`);
              finish();
            }, 8000);
            script.onload = finish;
            script.onerror = () => {
              console.error(`Could not load ${file}; continuing with the available interface.`);
              finish();
            };
            loadedScripts.push(script);
            document.body.appendChild(script);
          });
          if (cancelled) return;
        }
        // The original scripts were designed for a static document and use
        // DOMContentLoaded for locale setup. Replay it after React mounts them.
        document.dispatchEvent(new Event('DOMContentLoaded'));
        installNileCruiseRedesign();
        installUnifiedDestinationHeaders();
        installUnifiedDestinationPanels();
      } catch (loadError) {
        if (!cancelled) console.error(loadError);
      }
    }

    migrateLegacyPage();
    return () => {
      cancelled = true;
      loadedScripts.forEach((script) => script.remove());
      container.innerHTML = '';
    };
  }, []);

  return <main ref={mountRef} className="min-h-screen" aria-label="Nilora Egypt travel guide" />;
}
