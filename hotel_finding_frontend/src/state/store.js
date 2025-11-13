import { configureStore } from '@reduxjs/toolkit';
import hotelsReducer from './slices/hotelsSlice';

/**
 * Redux store configuration using Redux Toolkit.
 * Combines the hotels slice and enables Redux DevTools in development.
 */
// PUBLIC_INTERFACE
export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
  },
  middleware: (gDM) => gDM({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
