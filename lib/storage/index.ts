// T010: localStorage abstraction — ONLY place that touches localStorage

/**
 * Read a JSON value from localStorage.
 * Returns the defaultValue on missing key or parse error (never throws).
 */
export function readKey<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[storage] Failed to parse key "${key}":`, err);
    return defaultValue;
  }
}

/**
 * Write a JSON value to localStorage.
 * Silently swallows errors (e.g. storage quota exceeded) and logs a warning.
 */
export function writeKey<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[storage] Failed to write key "${key}":`, err);
  }
}
