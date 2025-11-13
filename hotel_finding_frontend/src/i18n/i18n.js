//
// Simple i18n stub with India defaults (en-IN).
//

// PUBLIC_INTERFACE
export const defaultLocale = 'en-IN';

/**
 * PUBLIC_INTERFACE
 * Basic translation registry with namespacing support.
 * This is intentionally minimal and synchronous for the current app needs.
 */
export const i18n = {
  locale: defaultLocale,
  dict: {
    'en-IN': {
      nav: {
        home: 'Home',
        open: 'Open',
        finder: 'Finder',
        help: 'Help',
      },
      copy: {
        welcome: 'Welcome to,',
        appName: 'Hotel Finder',
        searchPlaceholder: 'Search city, hotel, landmark...',
      },
    },
  },
  /** PUBLIC_INTERFACE
   * Translate a key within an optional namespace.
   */
  t(ns, key) {
    const lang = this.dict[this.locale] || {};
    const space = lang[ns] || {};
    return space[key] || key;
  },
};
