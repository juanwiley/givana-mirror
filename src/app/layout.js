import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Give. Thrive. Activate.',
  description: 'Real Help. Right Here.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add favicon with cache-buster */}
        <link rel="icon" href="/favicon.ico?v=2" />

        {/* ✅ Add viewport meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
