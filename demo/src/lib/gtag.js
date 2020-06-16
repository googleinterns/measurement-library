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
 * View the [Developer Guide](https://developers.google.com/analytics/devguides/collection/app-web/events)
 * to review recommended events and their associated parameters.
 * @param {string} event
 * @param {!Object<string, *>} parameters
 * @return {string} Code snippet of the event being sent.
 */
export const event = (event, parameters) => {
  window.gtag('event', event, {
    send_to: GA_TRACKING_ID,
    parameters,
  });

  return `gtag("event", "${event}", ` +
      `${JSON.stringify(parameters, undefined, 2)})`;
};
