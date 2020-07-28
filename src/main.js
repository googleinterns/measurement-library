goog.module('measurement_library.main');

const setupMeasure = goog.require('measurement_library.setup');

/**
 * @global @const {!Array} The data layer of the application, storing a record
 * of events that have changed over time.
 */
window['dataLayer'] = window['dataLayer'] || [];

setupMeasure(window['dataLayer']);
