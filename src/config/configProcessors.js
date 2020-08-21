goog.module('measurementLibrary.config.configProcessors');
const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');
const CookiesStorage = goog.require('measurementLibrary.storage.CookiesStorage');
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
const DEFAULT_STORAGE_INTERFACES = {'cookies': CookiesStorage};

/**
 * A map assigning names to all of the built in event processors.
 * @const {!Object<string, !ProcessorConstructor>}
 */
const DEFAULT_EVENT_PROCESSORS =
    {'googleAnalytics': GoogleAnalyticsEventProcessor};

/**
 * Construct an event processor from a representative string or constructor,
 * with the given parameters.
 *
 * @private
 * @param {!StorageConstructor|string} storageConstructor
 * @param {!Object<string, *>} params
 * @param {?DataLayerHelper} helper
 * @return {?StorageInterface}
 */
function buildStorage_(storageConstructor, params, helper) {
  if (typeof storageConstructor === 'string') {
    if (!(storageConstructor in DEFAULT_STORAGE_INTERFACES)) {
      log(`No storage interface with name ${storageConstructor} found.`,
          LogLevel.ERROR);
    }
    storageConstructor = DEFAULT_STORAGE_INTERFACES[storageConstructor];
  }
  const storedOptions = getExtraOptions(helper, storageConstructor);
  // Merge the options objects, with storedOptions having the least priority.
  const mergedOptions = merge(storedOptions, params);
  try {
    return new storageConstructor(mergedOptions);
  } catch (err) {
    log(`Could not construct a new instance of the class ` +
        `${storageConstructor} with parameter`, LogLevel.ERROR);
    log(params, LogLevel.ERROR);
    log(err, LogLevel.ERROR);
    return null;
  }
}

/**
 * Construct an event processor from a representative string or constructor,
 * with the given parameters.
 *
 * @private
 * @param {!ProcessorConstructor|string} processorConstructor
 * @param {!Object<string, *>} params
 * @param {?DataLayerHelper} helper
 * @return {?EventProcessor}
 */
function buildProcessor_(processorConstructor, params, helper) {
  if (typeof processorConstructor === 'string') {
    if (!(processorConstructor in DEFAULT_EVENT_PROCESSORS)) {
      log(`No event processor with name ${processorConstructor} found.`,
          LogLevel.ERROR);
    }
    processorConstructor = DEFAULT_EVENT_PROCESSORS[processorConstructor];
  }
  const storedOptions = getExtraOptions(helper, processorConstructor);
  // Merge the optionsObjects, with storedOptions having the least priority.
  const mergedOptions = merge(storedOptions, params);
  try {
    return new processorConstructor(mergedOptions);
  } catch (err) {
    log(`Could not construct a new instance of the class ` +
        `${processorConstructor} with parameter`, LogLevel.ERROR);
    log(params, LogLevel.ERROR);
    log(err, LogLevel.ERROR);
    return null;
  }
}

/**
 *  Perform a merge on the given list of objects. Any properties that both
 *  the ith and jth (i less than j) objects both share will be overwritten
 *  to have just the property of the jth object.
 *
 *  @param {...} args The objects to merge.
 *  @return {!Object<string, *>}
 */
const merge = function(args) {
  const result = {};
  for (let i = 0; i < arguments.length; i++) {
    const toMerge = arguments[i];
    for (const prop in toMerge) {
      if (toMerge.hasOwnProperty(prop)) {
        result[prop] = toMerge[prop];
      }
    }
  }
  return result;
};

/**
 *  Get extra parameters that are stored in the data layer for a given object.
 *
 *  @param {?DataLayerHelper} helper
 *  @param {?Object} object The object that we would like to get parameters of.
 *  @return {!Object<string, *>}
 */
const getExtraOptions = (helper, object) => {
  if (helper && object && object.hasOwnProperty('getName')) {
    return /** @type {!Object<string, *>} */ (helper.get(object['getName']()));
  }
  return {};
};

/**
 * When called with an implementation of the eventProcessor and
 * storageInterface API, this function registers processors to react to the
 * 'set' and 'event' commands.
 *
 * @param {!DataLayerHelper} helper The data layer helper object we reference
 * @param {!StorageConstructor|string} eventProcessor The event processor to
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
  const processor = buildProcessor_(eventProcessor, eventOptions, helper);
  const storage = buildStorage_(storageInterface, storageOptions, helper);
  if (!processor || !storage) {
    // A failure occurred, return now to prevent the page from crashing.
    return;
  }
  registerEventAndSet_(helper, processor, eventOptions, storage);
}

/**
 * Register the set and event commands on the helper with the given
 * processor/storage pair.
 *
 * @private
 * @param {!DataLayerHelper} helper
 * @param {!EventProcessor} processor
 * @param {!Object<string, *>} eventOptions This will be used in a future PR
 * @param {!StorageInterface} storage
 */
function registerEventAndSet_(helper, processor, eventOptions, storage) {
  /**
   * Check if a given key/value pair should be persisted in storage, and
   * if so, save it.
   *
   * @param {string} key The key whose value you want to set.
   * @param {*} value The value to assign to the key.
   * @param {number=} secondsToLive The time for saved data to live.
   *     If not passed, the eventProcessor will decide.
   *     If -1, the storageInterface will decide. If 0, nothing will be stored
   *     Otherwise, it is a positive number or Number.POSITIVE_INFINITY.
   */
  function processSet(key, value,
    secondsToLive = processor.persistTime(key, value)) {
    // Don't save if the time to live is 0.
    if (secondsToLive) {
      if (secondsToLive === -1) {
        storage.save(key, value);
      } else {
        // secondsToLive is surely positive!
        storage.save(key, value, secondsToLive);
      }
    }
  }
  // Process an event object by sending it to the registered event processor
  // along with interfaces to the storage and data layer helper.
  function processEvent(name, options = undefined) {
    const model = this;
    if (!options) options = {};
    const storedOptions = getExtraOptions(helper, processor.constructor);
    // Merge the optionsObjects, with storedOptions having the least priority.
    // and options having the most priority.
    options = merge(storedOptions, eventOptions, options);
    processor.processEvent(/** @type {!StorageInterface} */(storage),
      model, name, options);
  }

  helper.registerProcessor('event', processEvent);
  helper.registerProcessor('set', processSet);
}

exports =
  {configProcessors, buildProcessor_, buildStorage_, registerEventAndSet_};

