import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SidebarFilters from './components/SidebarFilters';
import MapView from './components/MapView';
import HotelList from './components/HotelList';
import { useDispatch } from 'react-redux';
import { fetchHotels, setMapBounds } from './state/slices/hotelsSlice';
import { useEnv } from './utils/env';

// PUBLIC_INTERFACE
export default function App() {
  /** Root app component rendering navbar, sidebar filters, map and list. */
  const dispatch = useDispatch();
  const env = useEnv();

  useEffect(() => {
    // Initial fetch with default bounds (world) to populate list quickly
    const defaultBounds = {
      north: 85, south: -85, east: 180, west: -180
    };
    dispatch(setMapBounds(defaultBounds));
    dispatch(fetchHotels({ bounds: defaultBounds, filters: {}, search: '', page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    // Log environment in dev without secrets for diagnostics
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Env flags:', { apiBase: env.apiBaseUrl, enableMocks: env.enableMocks });
    }
  }, [env]);

  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main" role="main">
        <aside className="sidebar" aria-label="Filters">
          <SidebarFilters />
        </aside>
        <section className="map-and-list" aria-label="Results">
          <div className="map-container" aria-label="Map">
            <MapView />
          </div>
          <div className="list-container" aria-label="Hotel list">
            <HotelList />
          </div>
        </section>
      </main>
    </div>
  );
}
