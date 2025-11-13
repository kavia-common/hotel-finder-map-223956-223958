import React, { useEffect, useRef } from 'react';
import { getMapsLoader } from '../services/mapsLoader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels, selectHotel, setMapBounds } from '../state/slices/hotelsSlice';
import Loader from './Loader';

/**
 * Interactive map displaying user and hotel markers.
 * Updates results on map idle (bounds changed).
 */
// PUBLIC_INTERFACE
export default function MapView() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const dispatch = useDispatch();
  const { hotels, selectedHotelId } = useSelector(s => s.hotels);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const loader = getMapsLoader();
        const google = await loader.load();
        if (!mounted) return;

        const center = { lat: 37.7749, lng: -122.4194 };
        const map = new google.maps.Map(containerRef.current, {
          center,
          zoom: 12,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        mapRef.current = map;

        // on idle -> bounds -> fetch
        map.addListener('idle', () => {
          const b = map.getBounds();
          if (!b) return;
          const bounds = {
            north: b.getNorthEast().lat(),
            east: b.getNorthEast().lng(),
            south: b.getSouthWest().lat(),
            west: b.getSouthWest().lng(),
          };
          dispatch(setMapBounds(bounds));
          dispatch(fetchHotels({ bounds, page: 1 }));
        });
      } catch {
        // Google Maps failed to load (e.g., missing key); handled by showing placeholder
      }
    })();
    return () => { mounted = false; };
  }, [dispatch]);

  // Draw hotel markers
  useEffect(() => {
    (async () => {
      if (!mapRef.current) return;
      const google = await getMapsLoader().load();
      // clear previous markers
      markersRef.current.forEach(m => m.setMap(null));
      markersRef.current = [];

      hotels.forEach(h => {
        const marker = new google.maps.Marker({
          position: h.location,
          map: mapRef.current,
          title: h.name,
          icon: selectedHotelId === h.id ? undefined : undefined,
        });
        marker.addListener('click', () => {
          dispatch(selectHotel(h.id));
          // center on marker
          mapRef.current.panTo(h.location);
        });
        markersRef.current.push(marker);
      });
    })();
  }, [hotels, dispatch, selectedHotelId]);

  if (!window.google && !mapRef.current) {
    return <Loader label="Loading map..." />;
  }

  return (
    <div className="map-canvas" ref={containerRef} role="region" aria-label="Map canvas" />
  );
}
