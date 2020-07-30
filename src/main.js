goog.module('measurementLibrary.main');

const setupMeasure = goog.require('measurementLibrary.setup');

/**
 * @global @const {!Array} The data layer of the application, storing a record
 * of events that have changed over time.
 */
window['dataLayer'] = window['dataLayer'] || [];

setupMeasure(window['dataLayer']);
