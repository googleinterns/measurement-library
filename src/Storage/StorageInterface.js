goog.module('measurementlibrary.Storage.StorageInterface');

/**
 * A class implementing this interface allows for storage and retrieval of data.
 *
 * @interface
 */
class StorageInterface {
  /**
   * Saves a key value pair into the storage interface for up to a
   * maximum time to live.
   *
   * @param {string} key The location at which to store data.
   * @param {*} value The data to store.
   * @param {number=} secondsToLive The maximum number of seconds that the key
   *    should be saved for.
   */
  save(key, value, secondsToLive) {};

  /**
   * Loads the value associated with a given key in the storageInterface.
   *
   * @param {string} key The location at which to load data.
   * @param {*=} defaultValue The value to load if no key is stored at
   *    the default location.
   * @return {*} value The data stored at the given location, or defaultValue
   *    if none exist.
   */
  load(key, defaultValue) {};
}

exports = StorageInterface;
