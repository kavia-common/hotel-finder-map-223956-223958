//
// India-focused localization helpers
//

// PUBLIC_INTERFACE
export const IN_LOCALE = 'en-IN';

// PUBLIC_INTERFACE
export const INR = 'INR';

// PUBLIC_INTERFACE
export function formatINRCurrency(amount) {
  /** Format a number into INR currency respecting Indian digit grouping. */
  try {
    return new Intl.NumberFormat(IN_LOCALE, {
      style: 'currency',
      currency: INR,
      maximumFractionDigits: 0,
    }).format(Number(amount ?? 0));
  } catch {
    return `₹${Number(amount ?? 0).toLocaleString('en-IN')}`;
  }
}

// PUBLIC_INTERFACE
export function formatIndianDate(dateLike) {
  /** Format a date-like input to DD/MM/YYYY. */
  const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// PUBLIC_INTERFACE
export function normalizeIndianPhone(input) {
  /**
   * Normalize and mask Indian phone to +91-XXXXX-XXXXX pattern.
   * Returns { raw: digitsOnly, masked }
   */
  const digits = String(input || '').replace(/\D/g, '');
  // remove leading country code duplicates
  let local = digits;
  if (local.startsWith('91') && local.length > 10) {
    local = local.slice(-10);
  }
  if (local.length > 10) local = local.slice(0, 10);

  const part1 = local.slice(0, 5);
  const part2 = local.slice(5);
  const masked = `+91${local ? '-' : ''}${part1}${part2 ? '-' : ''}${part2}`;
  return { raw: local, masked };
}

// PUBLIC_INTERFACE
export function isValidIndianMobile(input) {
  /** Validate Indian mobile numbers: 10 digits, starting with 6/7/8/9. */
  const digits = String(input || '').replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(digits);
}

// PUBLIC_INTERFACE
export const INDIA_DEFAULT_CENTER = { lat: 28.6139, lng: 77.2090 }; // New Delhi
