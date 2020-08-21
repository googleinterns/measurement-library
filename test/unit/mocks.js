goog.module('measurementLibrary.testing.mocks');

const DataLayerHelper = goog.require('dataLayerHelper.helper.DataLayerHelper');

/**
 * Mock model interface for testing
 */
class MockModelInterface {
  /**
   * @param {!Object<string,*>} model
   */
  constructor(model) {
    this.dataLayer = [model];
    this.helper = new DataLayerHelper(this.dataLayer);
  }

  /**
   * @param {string} key
   * @return {*} value
   */
  get(key) {
    return this.helper.get(key);
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    this.dataLayer.push({[key]: value});
  }
}

/**
 * Mock storage interface for testing.
 * @implements {StorageInterface}
 */
class MockStorage {
  /**
   * @param {!Object<string,*>=} mockStorage
   */
  constructor(mockStorage = {}) {
    this.mockStorage = mockStorage;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  save(key, value) {
    this.mockStorage[key] = value;
  }

  /**
   * @param {string} key
   * @return {*} value
   */
  load(key) {
    return this.mockStorage[key];
  }
}

exports = {
  MockModelInterface,
  MockStorage,
};
