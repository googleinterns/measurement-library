const GA_TRACKING_ID = process.env.REACT_APP_GTAG_TRACKING_ID;

/**
 * Sends a page_view event to Google Analytics via gtag.
 * @param {string} pagePath
 */
export const pageView = (pagePath) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: pagePath,
  });
};

/**
 * Sends an event to Google Analytics via gtag.
 * View the [Developer Guide](https://developers.google.com/analytics/devguides/collection/app-web/events)
 * to review recommended events and their associated parameters.
 * @param {string} event
 * @param {!Object<string, *>} parameters
 */
export const event = (event, parameters) => {
  window.gtag('event', event, {
    send_to: GA_TRACKING_ID,
    ...parameters,
  });
};
