/**
 * @fileoverview Utility functions for the demo app
 */

/**
 * Create a deep copy of the passed in data, which is expected
 * to be shaped like the sample data in store.js.
 * @param {!Object} data The data to copy.
 * @return {!Object} A deep copy of the input.
 */
export function deepCopyStore(data) {
  return JSON.parse(JSON.stringify(data));
}
