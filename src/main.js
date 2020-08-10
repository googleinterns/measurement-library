/**
 * @fileoverview This file is to be used as the entry point for measurement
 * library from an html script tag. This file sets up the measurement library
 * on the global dataLayer variable.
 */
goog.module('measurementLibrary.main');

const setupMeasure = goog.require('measurementLibrary.config.setup');

/**
 * @global @const {!Array} The data layer of the application, storing a record
 * of events that have changed over time.
 */
window['dataLayer'] = window['dataLayer'] || [];

setupMeasure(window['dataLayer']);
