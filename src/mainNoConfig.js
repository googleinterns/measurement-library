/**
 * @fileoverview An alternative main file for the measurement library that
 * does not set up the library, instead just providing the setupMeasure
 * function. This file exists because the grunt build needs an entry point
 * unused by the rest of the library to run the closure compiler without
 * duplicate input warnings.
 */
goog.module('measurementLibrary.mainNoConfig');
const setupMeasure = goog.require('measurementLibrary.config.setup');
