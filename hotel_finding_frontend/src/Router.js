import React, { useEffect, useMemo, useState } from 'react';
import App from './App';
import OpenScreen from './pages/OpenScreen';
import HomeFigmaScreen from './pages/HomeFigmaScreen';

/**
 * PUBLIC_INTERFACE
 * Very small hash-based router to avoid adding dependencies.
 * Supported routes:
 *  - #/ => main hotel finder
 *  - #/open => Open screen
 *  - #/home => Home Figma screen
 */
export default function Router() {
  const [hash, setHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const route = useMemo(() => {
    const clean = hash.replace(/^#/, '');
    if (clean.startsWith('/open')) return 'open';
    if (clean.startsWith('/home')) return 'home';
    return 'root';
  }, [hash]);

  if (route === 'open') return <OpenScreen />;
  if (route === 'home') return <HomeFigmaScreen />;
  return <App />;
}
