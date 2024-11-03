import '../styles/style.css'; // Import the global CSS file
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Ensures content only renders after mount on client

  return <Component {...pageProps} />;
}

export default MyApp;