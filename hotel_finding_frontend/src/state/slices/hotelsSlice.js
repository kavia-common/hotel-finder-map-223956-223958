import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../services/apiClient';

const initialState = {
  hotels: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    priceRange: [50, 400],
    stars: [],
    amenities: [],
    radiusKm: 10,
    sort: 'recommended',
  },
  mapBounds: null,
  selectedHotelId: null,
  searchQuery: '',
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  },
};

/**
 * Thunk to fetch hotels from backend or MSW.
 * Accepts {bounds, filters, search, page}
 */
// PUBLIC_INTERFACE
export const fetchHotels = createAsyncThunk(
  'hotels/fetchHotels',
  async ({ bounds, filters, search, page }, { getState, rejectWithValue }) => {
    try {
      const state = getState().hotels;
      const params = {
        bounds: bounds || state.mapBounds,
        filters: { ...(state.filters), ...(filters || {}) },
        search: typeof search === 'string' ? search : state.searchQuery,
        page: page || state.pagination.page,
        pageSize: state.pagination.pageSize,
      };
      const response = await apiClient.getHotels(params);
      return response;
    } catch (err) {
      return rejectWithValue(err?.message || 'Failed to fetch hotels');
    }
  }
);

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    // PUBLIC_INTERFACE
    setMapBounds(state, action) {
      state.mapBounds = action.payload;
    },
    // PUBLIC_INTERFACE
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    // PUBLIC_INTERFACE
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.pagination.page = 1;
    },
    // PUBLIC_INTERFACE
    selectHotel(state, action) {
      state.selectedHotelId = action.payload;
    },
    // PUBLIC_INTERFACE
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        const { data, total, page, pageSize } = action.payload;
        state.hotels = data;
        state.pagination.page = page;
        state.pagination.pageSize = pageSize;
        state.pagination.total = total;
        state.pagination.totalPages = Math.ceil(total / pageSize);
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      });
  },
});

export const { setMapBounds, setFilters, setSearchQuery, selectHotel, setPage } = hotelsSlice.actions;
export default hotelsSlice.reducer;
