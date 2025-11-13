import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchHotels, setFilters } from '../state/slices/hotelsSlice';

const STAR_OPTIONS = [1, 2, 3, 4, 5];
const AMENITIES = ['wifi', 'parking', 'gym', 'spa', 'breakfast', 'pet-friendly'];
const SORTS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'rating_desc', label: 'Rating' },
  { value: 'price_asc', label: 'Price (low to high)' },
  { value: 'price_desc', label: 'Price (high to low)' },
];

/**
 * Filters sidebar to refine hotel search.
 */
// PUBLIC_INTERFACE
export default function SidebarFilters() {
  const dispatch = useDispatch();
  const [price, setPrice] = useState([50, 400]);
  const [stars, setStars] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [radius, setRadius] = useState(10);
  const [sort, setSort] = useState('recommended');

  const apply = useCallback(() => {
    const f = { priceRange: price, stars, amenities, radiusKm: radius, sort };
    dispatch(setFilters(f));
    dispatch(fetchHotels({ filters: f, page: 1 }));
  }, [dispatch, price, stars, amenities, radius, sort]);

  const toggleStar = (s) => {
    setStars(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };
  const toggleAmenity = (a) => {
    setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  return (
    <div>
      <h3>Filters</h3>

      <div className="filter-group" role="group" aria-labelledby="price-range">
        <div id="price-range"><strong>Price range</strong></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
          <input
            aria-label="Min price"
            type="number"
            min={0}
            value={price[0]}
            onChange={(e) => setPrice([Number(e.target.value), price[1]])}
            style={{ width: 90 }}
          />
          <span className="muted">to</span>
          <input
            aria-label="Max price"
            type="number"
            min={0}
            value={price[1]}
            onChange={(e) => setPrice([price[0], Number(e.target.value)])}
            style={{ width: 90 }}
          />
        </div>
      </div>

      <div className="filter-group" role="group" aria-labelledby="stars">
        <div id="stars"><strong>Star rating</strong></div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
          {STAR_OPTIONS.map(s => (
            <button
              key={s}
              className="btn ghost"
              aria-pressed={stars.includes(s)}
              onClick={() => toggleStar(s)}
            >
              {s}★
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group" role="group" aria-labelledby="amenities">
        <div id="amenities"><strong>Amenities</strong></div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
          {AMENITIES.map(a => (
            <label key={a} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={amenities.includes(a)}
                onChange={() => toggleAmenity(a)}
              />
              <span style={{ textTransform: 'capitalize' }}>{a.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group" role="group" aria-labelledby="radius">
        <div id="radius"><strong>Radius (km)</strong></div>
        <input
          aria-label="Radius km"
          type="range"
          min={1}
          max={50}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          style={{ width: '100%', marginTop: 8 }}
        />
        <div className="muted">{radius} km</div>
      </div>

      <div className="filter-group" role="group" aria-labelledby="sort">
        <div id="sort"><strong>Sort</strong></div>
        <select
          aria-label="Sort hotels"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--color-border)' }}
        >
          {SORTS.map(s => (<option key={s.value} value={s.value}>{s.label}</option>))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button className="btn" onClick={apply} aria-label="Apply filters">Apply</button>
        <button
          className="btn ghost"
          onClick={() => {
            setPrice([50, 400]); setStars([]); setAmenities([]); setRadius(10); setSort('recommended');
          }}
          aria-label="Reset filters"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
