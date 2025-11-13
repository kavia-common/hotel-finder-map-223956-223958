import { Loader } from '@googlemaps/js-api-loader';
import { getEnvValues } from '../utils/env';

let loader;

/**
 * Create or reuse Google Maps JS API loader using API key from env.
 */
// PUBLIC_INTERFACE
export function getMapsLoader() {
  const { googleMapsApiKey } = getEnvValues();
  if (!loader) {
    loader = new Loader({
      apiKey: googleMapsApiKey || '',
      version: 'weekly',
      libraries: ['places'],
    });
  }
  return loader;
}
