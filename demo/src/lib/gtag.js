
// eslint-disable-next-line no-undef
const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

/**
 * Sends a page_view event to Google Analytics.
 * @param {string} url
 */
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

/**
 * Sends an event to Google Analytics.
 * View the [Developer Guide](https://developers.google.com/analytics/devguides/collection/app-web/events)
 * to review recommended events and their associated parameters.
 * @param {action} event
 * @param {action} parameters
 */
export const event = ({event, parameters}) => {
  window.gtag('event', event, parameters);
};
