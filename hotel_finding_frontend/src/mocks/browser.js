import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { getEnvValues } from '../utils/env';

const worker = setupWorker(...handlers);

/**
 * Starts MSW in development or when explicitly enabled.
 * Does nothing in production unless REACT_APP_ENABLE_MSW=true.
 */
// PUBLIC_INTERFACE
export async function bootstrapMocks() {
  const { enableMocks } = getEnvValues();
  const shouldEnable = enableMocks || process.env.NODE_ENV === 'development';
  if (shouldEnable) {
    try {
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('MSW failed to start', e);
    }
  }
}
