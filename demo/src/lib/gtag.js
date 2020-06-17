const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

/**
 * Sends a page_view event to Google Analytics.
 * @param {string} pagePath
 */
export const pageview = (pagePath) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: pagePath,
  });
};

/**
 * Sends an event to Google Analytics.
 * Can be spoofed to return mock code snippet of event instead.
 * View the [Developer Guide](https://developers.google.com/analytics/devguides/collection/app-web/events)
 * to review recommended events and their associated parameters.
 * @param {string} event
 * @param {!Object<string, *>} parameters
 * @param {boolean=} spoof If true, returns mock code instead of sending event.
 * @return {?string} Code snippet of the event being sent.
 */
export const event = (event, parameters, spoof = false) => {
  if (spoof) {
    return `gtag("event", "${event}", ` +
    `${JSON.stringify(parameters, undefined, 2)})`;
  }

  window.gtag('event', event, {
    send_to: GA_TRACKING_ID,
    ...parameters,
  });
  return null;
};
