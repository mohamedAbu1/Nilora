import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nilora | Egypt like you have never seen it',
  description: 'Explore Egypt through an interactive map, curated destinations, and Felfel as your moving guide.',
  icons: { icon: '/legacy/favicon.svg' },
};

const legacyStyles = [
  'styles.css', 'pharaoh.css', 'destination-cards.css', 'card-images.css',
  'egypt-ui.css', 'map-pins.css', 'responsive.css', 'language.css',
  'auth.css', 'destination.css', 'destination-fixes.css', 'luxor-final.css', 'fayoum-final.css', 'fayoum-map.css', 'nile-motion.css', 'nile-cruise.css', 'map-zoom.css', 'nile-cruise-polish.css', 'cruise-labels.css',
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {legacyStyles.map((style) => <link key={style} rel="stylesheet" href={`/legacy/css/${style}`} />)}
      </head>
      <body>{children}</body>
    </html>
  );
}
