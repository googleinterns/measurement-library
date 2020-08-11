goog.module('measurementLibrary.config.configProcessors');
const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');
const {LogLevel, log} = goog.require('measurementLibrary.logging');
const DataLayerHelper = goog.require('dataLayerHelper.helper.DataLayerHelper');

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
const DEFAULT_EVENT_PROCESSORS =
    {'googleAnalytics': GoogleAnalyticsEventProcessor};

/**
 * Given a string, return the constructor saved in
 * DEFAULT_EVENT_PROCESSORS or DEFAULT_STORAGE_INTERFACES, depending on
 * isEventProcessor. Constructor objects are passed through without
 * modification.
 *
 * @param {!ProcessorConstructor|!StorageConstructor|string} obj
 * @param {boolean} isEventProcessor True if obj represents an event processor,
 *     false if obj represents storage
 * @return {!ProcessorConstructor|!StorageConstructor}
 */
function getConstructor_(obj, isEventProcessor) {
  if (typeof obj === 'string') {
    if (isEventProcessor) {
      if (!(obj in DEFAULT_EVENT_PROCESSORS)) {
        log(`No event processor with name ${obj} found.`,
            LogLevel.ERROR);
      }
      return DEFAULT_EVENT_PROCESSORS[obj];
    } else {
      if (!(obj in DEFAULT_STORAGE_INTERFACES)) {
        log(`No storage interface with name ${obj} found.`,
            LogLevel.ERROR);
      }
      return DEFAULT_STORAGE_INTERFACES[obj];
    }
  }
  return obj;
}

/**
 * Construct the correct object.
 *
 * @private
 * @param {!ProcessorConstructor|!StorageConstructor} constructor
 * @param {!Object<string, *>} params
 * @return {!EventProcessor|!StorageInterface|boolean}
 */
function construct_(constructor, params) {
  try {
    return new constructor(params);
  } catch (err) {
    log(`Could not construct a new object of the class ` +
        `${typeof constructor} with parameter`, LogLevel.ERROR);
    log(params, LogLevel.ERROR);
    log(err, LogLevel.ERROR);
    return false;
  }
}

/**
 * When called with an implementation of the eventProcessor and
 * storageInterface API, this function registers processors to react to the
 * 'set' and 'event' commands.
 *
 * @param {!DataLayerHelper} helper The data layer helper object we reference
 * @param {!ProcessorConstructor|string} eventProcessor The event processor to
 *     use when responding to event commands and deciding how keys should be
 *     stored, or a string representing an object of this type.
 * @param {!Object<string, *>} eventOptions Options objects to pass to the
 *    event processor.
 * @param {!StorageConstructor|string} storageInterface An interface to a class
 *     that will handle setting and loading long term data, or a string
 *     representing an object of this type.
 * @param {!Object<string, *>} storageOptions Options objects to pass to the
 *    storage interface.
 */
function configProcessors(helper, eventProcessor, eventOptions,
                          storageInterface, storageOptions) {
  // TODO: Read in data from the model as extra options
  const EventProcessorConstrucutor =
      getConstructor_(eventProcessor, true);
  const StorageInterfaceConstructor =
      getConstructor_(storageInterface, true);
  const processor = /** @type {!EventProcessor} */
      (construct_(EventProcessorConstrucutor, eventOptions));
  const storage = /** @type {!StorageInterface} */
      (construct_(StorageInterfaceConstructor, storageOptions));
  if (!processor || !storage) {
    // A failure occurred, return now to prevent the page from crashing.
    return;
  }

  /**
   * Process an event object by sending it to the registered event processor
   * along with interfaces to the storage and data layer helper.
   *
   * @param {string} name The name of the event to process.
   * @param {!Object<string, *>=} options The options object describing
   *     the event.
   */
  function processEvent(name, options = undefined) {
    const model = this;
    if (!options) options = {};
    processor.processEvent(storage, model, name, options);
  }

  helper.registerProcessor('event', processEvent);
  // TODO(wolfblue@): add set processing.
  // helper.registerProcessor('set', processSet);
}

exports = {configProcessors, getConstructor_, construct_};
