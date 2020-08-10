goog.module('measurementLibrary.core.configProcessors');
const GoogleAnalyticsEventProcessor = goog.require(
    'measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');
const {LogLevel, log} = goog.require('measurementLibrary.logging');
const {merge} = goog.require('dataLayerHelper.helper.utils');
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
const DEFAULT_EVENT_PROCESSORS = {'google_analytics': GoogleAnalyticsEventProcessor};

/**
 * When called with an implementation of the eventProcessor and
 * storageInterface API, this function registers processors to react to the
 * 'set' and 'event' commands.
 *
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
function configProcessors(eventProcessor, eventOptions,
                          storageInterface, storageOptions) {
  const helper = this;
  // TODO: Read in data set from the model as extra options
  let EventProcessorConstrucutor;
  let StorageInterfaceConstructor;
  const getOptions = (object) => {
    let name;
    try {
      name = object.getName();
    } catch (ok) {
      // getName not implemented, no options are stored in the data layer.
    }
    return name ? helper.get(name) : {};
  };
  if (typeof eventProcessor === 'string') {
    if (!(eventProcessor in DEFAULT_EVENT_PROCESSORS)) {
      log(`No event processor with name ${eventProcessor} found.`,
          LogLevel.ERROR);
      return;
    }
    EventProcessorConstrucutor = DEFAULT_EVENT_PROCESSORS[eventProcessor];
  } else {
    EventProcessorConstrucutor = eventProcessor;
  }
  if (typeof storageInterface === 'string') {
    if (!(storageInterface in DEFAULT_STORAGE_INTERFACES)) {
      log(`No storage interface with name ${storageInterface} found.`,
          LogLevel.ERROR);
      return;
    }
    StorageInterfaceConstructor = DEFAULT_STORAGE_INTERFACES[storageInterface];
  } else {
    StorageInterfaceConstructor = storageInterface;
  }
  eventOptions = merge(getOptions(eventProcessor), eventOptions);
  storageOptions = merge(getOptions(storageInterface), storageOptions);
  let storage;
  let processor;
  try {
    processor = new EventProcessorConstrucutor(eventOptions);
  } catch (err) {
    log(`Could not construct a new object of the class ` +
        `${typeof EventProcessorConstrucutor} with parameter`, LogLevel.ERROR);
    log(storageOptions, LogLevel.ERROR);
    log(err, LogLevel.ERROR);
    return;
  }
  try {
    storage = new StorageInterfaceConstructor(storageOptions);
  } catch (err) {
    log(`Could not construct a new object of the class ` +
        `${typeof StorageInterfaceConstructor} with parameter`, LogLevel.ERROR);
    log(storageOptions, LogLevel.ERROR);
    log(err, LogLevel.ERROR);
    return;
  }
  /* TODO add event/set processing
  helper.registerProcessor('event', processEvent);
  helper.registerProcessor('set', processSet); */
}

exports = configProcessors;
