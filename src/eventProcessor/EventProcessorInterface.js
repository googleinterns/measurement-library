/*
 * @fileoverview Functions a event processor must implement.
 * @externs
 */

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
   * @param {{get:function(string):*, set:function(string, *)}} modelInterface
   *    An interface to load or save short term page data from the data layer.
   * @param {string} eventName The name of the event passed to the data layer.
   * @param {!Object<string, *>=} eventOptions The event options
   *    passed to the data layer.
   */
  processEvent(storageInterface, modelInterface, eventName, eventOptions) {};

  /**
   * Decides how long a given key should be persisted to long term storage for.
   * Regardless of the output, data will always be saved
   * locally to the data layer.
   *
   * @param {string} key The location at which to store data in the model.
   *    Dot notation is used to access a nested value (i.e. 'employees.jim'
   *    is the key 'jim' in the nested 'employees' object).
   * @param {*} value The data to store.
   * @return {number} How long the key should be stored in seconds.
   *     If -1, then the default value saved in storage will be used.
   *     If 0, the data is not saved to long term storage at all.
   *     If Number.POSITIVE_INFINITY, data will be stored forever.
   */
  persistTime(key, value) {};
}
