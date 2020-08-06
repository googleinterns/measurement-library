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
const {LogLevel, log} = goog.require('measurementLibrary.logging');

/**
 * @typedef {function(new:StorageInterface, !Object<string, *>)}
 */
let StorageConstructor;

/**
 * @typedef {function(new:EventProcessor, !Object<string, *>)}
 */
let ProcessorConstructor;

/**
 * A map assigning names to all of the built in storage interfaces.
 * @const {!Object<string, !StorageConstructor>}
 */
const DEFAULT_STORAGE_INTERFACES = {};

/**
 * A map assigning names to all of the built in event processors.
 * @const {!Object<string, !ProcessorConstructor>}
 */
const DEFAULT_EVENT_PROCESSORS = {};

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

  /**
   * When called with an implementation of the eventProcessor and
   * storageInterface API, this function registers processors to react to the
   * 'set' and 'event' commands.
   *
   * @param {!ProcessorConstructor|string} eventProcessor The event
   *     processor to use when responding to event commands
   *     and deciding how keys should be stored, or a string
   *     representing an object of this type.
   * @param {!Object<string, *>} eventOptions Options objects to pass to the
   *    event processor.
   * @param {!StorageConstructor|string} storageInterface An
   *     interface to a class that will handle setting
   *     and loading long term data, or a string representing
   *     an object of this type.
   * @param {!Object<string, *>} storageOptions Options objects to pass to the
   *    storage interface.
   */
  function configProcessors(eventProcessor, eventOptions,
                            storageInterface, storageOptions) {
    // TODO: Read in data from the model as extra options

    let processor;
    let storage;
    if (typeof eventProcessor === 'string') {
      if (!(eventProcessor in DEFAULT_EVENT_PROCESSORS)) {
        log(`No event processor with name ${eventProcessor} found.`,
            LogLevel.ERROR);
        return;
      }
      processor =
          new DEFAULT_EVENT_PROCESSORS[eventProcessor](eventOptions);
    } else {
      processor = new eventProcessor(eventOptions);
    }
    if (typeof storageInterface === 'string') {
      if (!(storageInterface in DEFAULT_STORAGE_INTERFACES)) {
        log(`No storage interface with name ${storageInterface} found.`,
            LogLevel.ERROR);
        return;
      }
      storage =
          new DEFAULT_STORAGE_INTERFACES[storageInterface](storageOptions);
    } else {
      storage = new storageInterface(storageOptions);
    }

    /* TODO add event/set processing
    helper.registerProcessor('event', processEvent);
    helper.registerProcessor('set', processSet); */
  }
}

goog.exportSymbol('setupMeasure', setupMeasure);
exports = setupMeasure;
