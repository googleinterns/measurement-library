/**
 * @fileoverview Utility functions for the demo app.
 *
 */

/**
 * Create a deep copy of the passed in data, which is expected
 * to be shaped like the sample data in store.js.
 * @param {!Object} data The data to copy.
 * @return {!Object} A deep copy of the input.
 */
export function deepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}

/**
 * Creates a code snippet for a gtag event.
 * @param {string} event
 * @param {!Object<string, *>} parameters
 * @return {?string} Code snippet of the event.
 */
export const getEventCodeSnippet = (event, parameters) => {
  return `gtag("event", "${event}", ` +
      `${JSON.stringify(parameters, undefined, 2)})`;
};
