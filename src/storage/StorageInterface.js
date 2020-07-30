/**
 * @fileoverview Functions a storage interface must implement.
 * @externs
 */

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
   * @param {string} key The location at which to store data in the model.
   *    Dot notation is used to access a nested value (i.e. 'employees.jim'
   *    is the key 'jim' in the nested 'employees' object).
   * @param {*} value The data to store.
   * @param {number=} secondsToLive The maximum number of seconds that the key
   *    should be saved for.
   */
  save(key, value, secondsToLive) {};

  /**
   * Loads the value associated with a given key in the storageInterface.
   *
   * @param {string} key The location at which to store data in the model.
   *    Dot notation is used to access a nested value (i.e. 'employees.jim'
   *    is the key 'jim' in the nested 'employees' object).
   * @param {*=} defaultValue The value to return if no key is stored at
   *    the default location.
   * @return {*} value The data stored at the given location, or defaultValue
   *    if none exist.
   */
  load(key, defaultValue) {};
}
