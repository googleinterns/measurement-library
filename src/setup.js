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
goog.module('measurementLibrary.setup');

const {DataLayerHelper} = goog.require('helper');

/**
 * Process an event object by sending it to the registered event processor
 * along with interfaces to the storage and data layer helper.
 *
 * @param {!EventProcessor} processor The class to process the event.
 * @param {!StorageInterface} storage Storage to use during processing
 * @param {{get: function(string): *, set: function(string, *)}} model
 *     A interface to the model stored in the data layer.
 * @param {string} name The name of the event to process.
 * @param {!Object<string, *>=} options The options object describing
 *     the event.
 */
function processEvent(processor, storage, model, name, options = undefined) {
  if (!options) options = {};
  processor.processEvent(storage, model, name, options);
}

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

  helper.registerProcessor('config', configProcessors);
  helper.process();

  // TODO: configProcessors jsdoc and better processor/storage init in PR 52
  function configProcessors(eventProcessor, eventOptions,
                            storageInterface, storageOptions) {
    const processor = new eventProcessor(eventOptions);
    const storage = new storageInterface(storageOptions);

    helper.registerProcessor('event', function(name, options) {
      processEvent(
          processor, storage, this, /** @type {string} */ (name), options);
    });
  }
}

goog.exportSymbol('setupMeasure', setupMeasure);
exports = setupMeasure;
