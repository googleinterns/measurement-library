/**
 * @fileoverview This file exports a function that augments
 * an array, adding in the measurement library functionality. A commandAPI
 * wrapped around the array will be able to register/respond to events and
 * save/load data corresponding to the measurement library documentation.
 *
 * const dataLayer = [];
 * const measure = function() {
 *   dataLayer.push(arguments);
 * };
 * setupMeasure(dataLayer);
 * measure('config', ...);
 *
 */
goog.module('measurementLibrary.config.setup');
const {configProcessors} = goog.require('measurementLibrary.config.configProcessors');
const DataLayerHelper = goog.require('dataLayerHelper.helper.DataLayerHelper');

/**
 * Listen to events passed to the given dataLayer (or a new one
 * if none exist).
 *
 * @param {!Array<*>} dataLayer The data layer to add listeners to.
 */
function setupMeasure(dataLayer) {
  /**
   * The DataLayerHelper to use with this application.
   * @private @const {!DataLayerHelper}
   */
  const helper = new DataLayerHelper(dataLayer, {'processNow': false});

  helper.registerProcessor('config',
      (eventProcessor, eventOptions, storageProcessor, storageOptions) => {
        configProcessors(helper, eventProcessor, eventOptions,
            storageProcessor, storageOptions);
      });
  helper.process();
}

goog.exportSymbol('setupMeasure', setupMeasure);
exports = setupMeasure;
