import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HotelCard from './HotelCard';
import { fetchHotels, setPage } from '../state/slices/hotelsSlice';

/**
 * Right-side list of hotels with pagination controls.
 */
// PUBLIC_INTERFACE
export default function HotelList() {
  const dispatch = useDispatch();
  const { hotels, status, pagination } = useSelector(s => s.hotels);

  const prev = () => {
    if (pagination.page > 1) {
      const p = pagination.page - 1;
      dispatch(setPage(p));
      dispatch(fetchHotels({ page: p }));
    }
  };
  const next = () => {
    if (pagination.page < pagination.totalPages) {
      const p = pagination.page + 1;
      dispatch(setPage(p));
      dispatch(fetchHotels({ page: p }));
    }
  };

  return (
    <>
      <div className="list-header">
        <div><strong>{pagination.total}</strong> results</div>
        <div className="muted">Page {pagination.page} of {Math.max(1, pagination.totalPages)}</div>
      </div>
      <div className="cards" role="list" aria-busy={status === 'loading'}>
        {hotels.map(h => <HotelCard key={h.id} hotel={h} />)}
        {status === 'loading' && <div className="muted">Loading...</div>}
        {status === 'failed' && <div role="alert">Failed to load hotels.</div>}
      </div>
      <div className="pagination" role="navigation" aria-label="Pagination">
        <button className="btn ghost" onClick={prev} disabled={pagination.page <= 1} aria-label="Previous page">Prev</button>
        <button className="btn" onClick={next} disabled={pagination.page >= pagination.totalPages} aria-label="Next page">Next</button>
      </div>
    </>
  );
}
