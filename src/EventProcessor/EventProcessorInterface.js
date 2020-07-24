goog.require('measurementlibrary.Storage.StorageInterface');
goog.module('measurementlibrary.EventProcessor.EventProcessorInterface');

/**
 * A class implementing this interface can react to events pushed to the
 * data layer.
 * Event processors may perform actions such as sending a network request
 * based on the event data, interacting with the storage interface to commit
 * and retrieve values from long-term storage, or reading values from
 * the abstract model.
 *
 * @interface
 */
class EventProcessor {
  /**
   * Processes an event passed into the data layer.
   *
   * @param {!StorageInterface} storageInterface An interface to an object to
   *    load or save persistent data with.
   * @param {{get:function(string):*, set:function(string, *)}} modelInterface An
   *    interface to load or save short term page data from the data layer.
   * @param {string} eventName The name of the event passed to the data layer.
   * @param {...*} eventArgs The events passed to the data layer
   */
  processEvent(storageInterface, modelInterface, eventName, ...eventArgs) {};

  /**
   * Decides if a given key should be persisted to long term storage, or just
   * saved locally to the data layer.
   *
   * @param {string} key The location at which to store data.
   * @param {*} value The data to store.
   * @return {boolean} True iff the key should be persisted.
   */
  shouldPersist(key, value) {};

}

exports = EventProcessor;
