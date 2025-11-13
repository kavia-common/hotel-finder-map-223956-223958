import React from 'react';
import { useDispatch } from 'react-redux';
import { selectHotel } from '../state/slices/hotelsSlice';
import { formatINRCurrency } from '../utils/india';

// PUBLIC_INTERFACE
export default function HotelCard({ hotel }) {
  /** Card displaying hotel thumbnail and details. */
  const dispatch = useDispatch();
  return (
    <article className="card" role="listitem" aria-label={hotel.name}>
      <img src={hotel.imageUrl} alt={`${hotel.name} photo`} loading="lazy" />
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h4 style={{ margin: 0 }}>{hotel.name}</h4>
          <span className="badge">{hotel.rating}★</span>
        </div>
        <div className="muted" style={{ marginTop: 6 }}>
          {hotel.amenities.slice(0, 3).join(' • ')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <div><strong>{formatINRCurrency(hotel.price)}</strong> / night</div>
          <div className="muted">{hotel.distanceKm} km</div>
        </div>
        <div style={{ marginTop: 10 }}>
          <button
            className="btn"
            onClick={() => dispatch(selectHotel(hotel.id))}
            aria-label={`View ${hotel.name} on map`}
          >
            View on Map
          </button>
        </div>
      </div>
    </article>
  );
}
