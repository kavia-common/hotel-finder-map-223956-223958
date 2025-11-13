const cached = {
  apiBaseUrl: undefined,
  enableMocks: undefined,
  googleMapsApiKey: undefined,
  featureFlags: undefined,
};

function parseFlags(raw) {
  try {
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    // Accept comma list like: a,b,c
    return raw.split(',').reduce((acc, k) => {
      const key = String(k || '').trim();
      if (key) acc[key] = true;
      return acc;
    }, {});
  }
}

/**
 * Non-hook accessor for environment values. Safe in any module.
 */
// PUBLIC_INTERFACE
export function getEnvValues() {
  if (cached.apiBaseUrl === undefined) {
    cached.apiBaseUrl = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';
    cached.enableMocks = String(process.env.REACT_APP_ENABLE_MSW || '').toLowerCase() === 'true';
    cached.googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
    cached.featureFlags = parseFlags(process.env.REACT_APP_FEATURE_FLAGS || '{}');
  }
  return cached;
}

/**
 * Hook-like function returning memoized env values.
 * Note: Not a real React hook; retains name for backward compatibility but not used in non-React files.
 */
// PUBLIC_INTERFACE
export function useEnvValues() {
  return getEnvValues();
}

/**
 * React-friendly wrapper
 */
// PUBLIC_INTERFACE
export function useEnv() {
  return getEnvValues();
}
