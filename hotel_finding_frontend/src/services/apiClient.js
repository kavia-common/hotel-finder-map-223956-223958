import { getEnvValues } from '../utils/env';

/**
 * Simple REST client for hotels endpoint. Uses env base URL or defaults
 * to relative path, with MSW handling requests in development when enabled.
 */
class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl?.replace(/\/+$/, '') || '';
  }

  /**
   * Build query string for GET /hotels
   */
  buildQuery({ bounds, filters, search, page, pageSize }) {
    const params = new URLSearchParams();
    if (bounds) {
      params.set('north', bounds.north);
      params.set('south', bounds.south);
      params.set('east', bounds.east);
      params.set('west', bounds.west);
    }
    if (search) params.set('q', search);
    if (filters) {
      if (Array.isArray(filters.stars) && filters.stars.length) {
        params.set('stars', filters.stars.join(','));
      }
      if (Array.isArray(filters.amenities) && filters.amenities.length) {
        params.set('amenities', filters.amenities.join(','));
      }
      if (filters.priceRange) {
        params.set('priceMin', filters.priceRange[0]);
        params.set('priceMax', filters.priceRange[1]);
      }
      if (filters.radiusKm) params.set('radiusKm', String(filters.radiusKm));
      if (filters.sort) params.set('sort', String(filters.sort));
    }
    if (page) params.set('page', String(page));
    if (pageSize) params.set('pageSize', String(pageSize));
    return params.toString();
  }

  async get(path, params) {
    const qs = params ? `?${this.buildQuery(params)}` : '';
    const resp = await fetch(`${this.baseUrl}${path}${qs}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`API ${resp.status}: ${text}`);
    }
    return resp.json();
  }

  // PUBLIC_INTERFACE
  async getHotels(params) {
    /** Fetch list of hotels with query parameters. Returns {data, total, page, pageSize} */
    return this.get('/hotels', params);
  }
}

const { apiBaseUrl } = getEnvValues();
export const apiClient = new ApiClient(apiBaseUrl || '');
