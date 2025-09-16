import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PMS Staff Mobile - Property Management Tasks',
  description: 'Mobile PWA for property management staff. Manage tasks, rooms, and guest services on-the-go.',
  keywords: ['staff mobile', 'property management', 'pwa', 'task management', 'hotel staff', 'mobile app'],
  authors: [{ name: 'Cosmos Order Ltd' }],
  creator: 'Cosmos Order Ltd',
  publisher: 'Cosmos Order Ltd',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://staff.pms.cosmos',
    siteName: 'PMS Staff Mobile',
    title: 'PMS Staff Mobile - Property Management Tasks',
    description: 'Mobile PWA for property management staff. Manage tasks, rooms, and guest services on-the-go.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PMS Staff Mobile'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PMS Staff Mobile - Property Management Tasks',
    description: 'Mobile PWA for property management staff. Manage tasks, rooms, and guest services on-the-go.',
    images: ['/og-image.jpg']
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PMS Staff'
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} touch-manipulation`}>
        <div className="pwa-safe-area">
          <main className="min-h-screen">
            {children}
          </main>
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              fontSize: '14px',
              borderRadius: '8px',
            },
            success: {
              style: {
                background: '#10b981',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
              iconTheme: {
                primary: '#fff',
                secondary: '#ef4444',
              },
            },
          }}
        />
      </body>
    </html>
  );
}