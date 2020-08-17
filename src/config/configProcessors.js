goog.module('measurementLibrary.config.configProcessors');
const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');
const CookiesStorage = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

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
 * @param {!StorageConstructor|string} constructor
 * @param {!Object<string, *>} params
 * @return {?StorageInterface}
 */
function buildStorage_(constructor, params) {
  if (typeof constructor === 'string') {
    if (!(constructor in DEFAULT_STORAGE_INTERFACES)) {
      log(`No storage interface with name ${constructor} found.`,
          LogLevel.ERROR);
    }
    constructor = DEFAULT_STORAGE_INTERFACES[constructor];
  }
  try {
    return new constructor(params);
  } catch (err) {
    log(`Could not construct a new instance of the class ` +
        `${constructor} with parameter`, LogLevel.ERROR);
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
 * @param {!ProcessorConstructor|string} constructor
 * @param {!Object<string, *>} params
 * @return {?EventProcessor}
 */
function buildProcessor_(constructor, params) {
  if (typeof constructor === 'string') {
    if (!(constructor in DEFAULT_EVENT_PROCESSORS)) {
      log(`No event processor with name ${constructor} found.`,
          LogLevel.ERROR);
    }
    constructor = DEFAULT_EVENT_PROCESSORS[constructor];
  }
  try {
    return new constructor(params);
  } catch (err) {
    log(`Could not construct a new instance of the class ` +
        `${constructor} with parameter`, LogLevel.ERROR);
    log(params, LogLevel.ERROR);
    log(err, LogLevel.ERROR);
    return null;
  }
}

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
  // TODO: Read in data from the model as extra options
  const processor = buildProcessor_(eventProcessor, eventOptions);
  const storage = buildStorage_(storageInterface, storageOptions);
  if (!processor || !storage) {
    // A failure occurred, return now to prevent the page from crashing.
    return;
  }

  // Process an event object by sending it to the registered event processor
  // along with interfaces to the storage and data layer helper.
  function processEvent(name, options = undefined) {
    const model = this;
    if (!options) options = {};
    processor.processEvent(/** @type {!StorageInterface} */(storage),
      model, name, options);
  }

  helper.registerProcessor('event', processEvent);
  // TODO(wolfblue@): add set processing.
  // helper.registerProcessor('set', processSet);
}

exports = {configProcessors, buildProcessor_, buildStorage_};
