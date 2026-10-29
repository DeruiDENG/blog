import '../styles/global.scss';
import '../styles/theme.scss';
import '../prism-onedark.css';
import type { Metadata } from 'next';
import { siteTitle, author } from '../utils/meta';

export const metadata: Metadata = {
  metadataBase: new URL('https://deruideng.github.io'),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: author.description,
  icons: {
    icon: '/favicon.ico',
    apple: '/app-icon.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}

