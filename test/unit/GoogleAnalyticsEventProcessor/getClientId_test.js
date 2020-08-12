goog.module('measurementLibrary.testing.eventProcessor.GoogleAnalyticsEventProcessor.getClientId');
goog.setTestOnly();

const {DataLayerHelper} = goog.require('helper');
const uniqueId = goog.require('measurementLibrary.eventProcessor.generateUniqueId');
const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

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

describe('The `getClientId_` method ' +
    'of GoogleAnalyticsEventProcessor', () => {
  const mockStoredId = 'stored_client_id';
  const mockModelId = 'model_client_id';
  const mockGeneratedId = 'generated_client_id';
  const eventProcessor = new GoogleAnalyticsEventProcessor();
  let mockStorage;
  let mockModelInterface;
  let generateUniqueId;

  // mock the unique ID module
  beforeAll(() => {
    generateUniqueId = uniqueId.generateUniqueId;
    uniqueId.generateUniqueId = () => {
      return mockGeneratedId;
    };
  });

  /**
   * Builds expectation object for the `getClientId` function by passing
   * in (if any) the client IDs stored in long term storage and the global
   * data model.
   * @param {string|undefined} storedClientId
   * @param {string|undefined} modelClientId
   * @return {!Expectation}
   */
  function expectClientId(
    storedClientId,
    modelClientId) {
    mockStorage = new MockStorage({'client_id': storedClientId});
    mockModelInterface =
        new MockModelInterface({'client_id': modelClientId});

    return expect(eventProcessor.getClientId_(mockStorage, mockModelInterface));
  }

  it('generates a client id when no id is present in model or storage ' +
      'and adds it to the current model and storage', () => {
    expectClientId(
      /* storedClientId */ undefined,
      /* modelClientId */ undefined
    ).toBe(mockGeneratedId);

    expect(mockModelInterface.get('client_id')).toBe(mockGeneratedId);
    expect(mockStorage.load('client_id')).toBe(mockGeneratedId);
  });

  it('loads client id from storage when no id is present in model ' +
      'and adds it to the current model', () => {
    expectClientId(
      /* storedClientId */ mockStoredId,
      /* modelClientId */ undefined
      ).toBe(mockStoredId);


    expect(mockModelInterface.get('client_id')).toBe('stored_client_id');
  });

  it('loads client id from model if present', () => {
    expectClientId(
      /* storedClientId */ undefined,
      /* modelClientId */ mockModelId
    ).toBe(mockModelId);
  });

  it('loads client id from model even if there is a ' +
      'different client id in storage', () => {
    expectClientId(
      /* storedClientId */ mockStoredId,
      /* modelClientId */ mockModelId
      ).toBe(mockModelId);
  });

  afterAll(() => {
    uniqueId.generateUniqueId = generateUniqueId;
  });
});
