import { getEnvValues } from './env';

/**
 * Simple frontend healthcheck that verifies:
 * - App is running (always true)
 * - Optionally pings a configured REACT_APP_HEALTHCHECK_PATH if available
 * Returns a status object for display or debugging purposes.
 */
// PUBLIC_INTERFACE
export async function getHealthStatus() {
  const { apiBaseUrl } = getEnvValues();
  const healthPath = process.env.REACT_APP_HEALTHCHECK_PATH || '/healthz';
  const result = {
    ok: true,
    apiBase: apiBaseUrl || '',
    healthPath,
    endpointOk: null,
  };

  // Try to fetch the health path relative to current origin
  try {
    const resp = await fetch(healthPath, { method: 'GET' });
    result.endpointOk = resp.ok;
  } catch {
    result.endpointOk = false;
  }
  return result;
}
