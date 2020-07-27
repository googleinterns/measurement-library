goog.module('measurementlibrary.main');

const setup = goog.require('measurementlibrary.measure');

/**
 * @global {!Array} The data layer of the application, storing a record of
 * events that have changed over time.
 */
window['dataLayer'] = window['dataLayer'] || [];

setup(window['dataLayer']);
