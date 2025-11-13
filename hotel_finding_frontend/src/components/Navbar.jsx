import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchHotels, setSearchQuery } from '../state/slices/hotelsSlice';

function useDebouncedCallback(cb, delay = 400) {
  const timeout = useRef(null);
  return useCallback((...args) => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => cb(...args), delay);
  }, [cb, delay]);
}

/**
 * Top navigation bar with brand, search box (debounced) and locate button.
 */
// PUBLIC_INTERFACE
export default function Navbar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const debouncedSearch = useDebouncedCallback((v) => {
    dispatch(setSearchQuery(v));
    dispatch(fetchHotels({ search: v, page: 1 }));
  }, 500);

  const onChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    debouncedSearch(v);
  };

  const locate = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Trigger a fetch with tighter bounds around the user
        const pad = 0.1;
        const bounds = {
          north: latitude + pad,
          south: latitude - pad,
          east: longitude + pad,
          west: longitude - pad,
        };
        dispatch(fetchHotels({ bounds, page: 1 }));
      },
      () => {},
      { enableHighAccuracy: true, timeout: 3000 }
    );
  }, [dispatch]);

  useEffect(() => {
    // initial no-op; could fetch popular cities
  }, []);

  const searchPlaceholder = useMemo(() => 'Search city, hotel, landmark...', []);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <div className="brand" aria-label="Hotel Finder">
          <span className="dot" aria-hidden="true" />
          <span>Hotel Finder</span>
        </div>
        <div className="search" role="search">
          <span aria-hidden="true" style={{ color: '#6B7280' }}>🔎</span>
          <input
            aria-label="Search hotels"
            placeholder={searchPlaceholder}
            value={query}
            onChange={onChange}
          />
          <button className="btn ghost" onClick={locate} aria-label="Locate me">
            Locate
          </button>
        </div>
        <div>
          <a className="btn secondary" href="https://reactjs.org" rel="noreferrer" target="_blank" aria-label="Help">
            Help
          </a>
        </div>
      </div>
    </nav>
  );
}
