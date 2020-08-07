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
 * Check if a given key/value pair should be persisted in storage, and
 * if so, save it.
 *
 * @param {!EventProcessor} processor The processor used to determine the
 *     default time to live.
 * @param {!StorageInterface} storage Location to save the key
 * @param {string} key The key whose value you want to set.
 * @param {*} value The value to assign to the key.
 * @param {number=} secondsToLive The time for saved data to live.
 *     If not passed, the eventProcessor will decide.
 *     If -1, the storageInterface will decide.
 *     If 0, nothing will be stored.
 */
function processSet(processor, storage, key, value, secondsToLive = undefined) {
  if (secondsToLive === undefined) {
    secondsToLive = processor.persistTime(key, value);
  }
  // Don't save if the time to live is 0.
  if (secondsToLive) {
    if (secondsToLive === -1) {
      storage.save(key, value);
    } else {
      storage.save(key, value, secondsToLive);
    }
  }
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

  // TODO: configProcessors has jsdoc and stuff added in PR #52.
  function configProcessors(eventProcessor, eventOptions,
                            storageInterface, storageOptions) {
    const processor = new eventProcessor(eventOptions);
    const storage = new storageInterface(storageOptions);

    helper.registerProcessor('set', (key, value, secondsToLive) =>
        processSet(processor, storage,
            /** @type {string} */ (key), /** @type {*} */ (value),
            /** @type {number|undefined} */ (secondsToLive)));
  }
}

goog.exportSymbol('setupMeasure', setupMeasure);
exports = setupMeasure;
