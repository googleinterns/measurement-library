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
    let processor = new eventProcessor(eventOptions);
    let storage = new storageInterface(storageOptions);

    /**
     * Process an event object by sending it to the registered event processor
     * along with interfaces to the storage and data layer helper.
     *
     * @param {string} name The name of the event to process.
     * @param {!Object<string, *>=} args The arguments to
     *     process with the event.
     */
    function processEvent(name, args = undefined) {
      if (!args) args = {};
      processor.processEvent(storage, this, name, args);
    }

    helper.registerProcessor('event', processEvent);
  }
}

goog.exportSymbol('setupMeasure', setupMeasure);
exports = setupMeasure;
