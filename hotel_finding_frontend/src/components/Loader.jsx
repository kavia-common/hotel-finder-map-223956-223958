import React from 'react';

// PUBLIC_INTERFACE
export default function Loader({ label = 'Loading...' }) {
  /** Minimal loader with accessible label. */
  return (
    <div aria-busy="true" aria-live="polite" className="muted" style={{ padding: 12 }}>
      {label}
    </div>
  );
}
