import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Give. Thrive. Activate.',
  description: 'Real Help. Right Here.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
