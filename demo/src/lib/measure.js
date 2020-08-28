/**
 * Sends a page_view event to Google Analytics via measure.
 * @param {string} pagePath
 */
export const pageView = (pagePath) => {
  window.measure('event', 'page_view', {
    page_title: 'Prints of Poe',
    page_path: pagePath,
  });
};

/**
 * Sends an event to Google Analytics via measure.
 * View the [Developer Guide](https://developers.google.com/analytics/devguides/collection/app-web/events)
 * to review recommended events and their associated parameters.
 * @param {string} event
 * @param {!Object<string, *>} parameters
 */
export const event = (event, parameters) => {
  window.measure('event', event, {
    page_title: 'Prints of Poe',
    ...parameters,
  });
};
