goog.module('measurementLibrary.testing.eventProcessor.GoogleAnalyticsEventProcessor.getClientId');
goog.setTestOnly();

const uniqueId = goog.require('measurementLibrary.eventProcessor.generateUniqueId');
const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');
const {MockStorage, MockModelInterface} = goog.require('measurementLibrary.testing.mocks');


describe('The `getClientId_` method ' +
    'of GoogleAnalyticsEventProcessor', () => {
  const mockStoredId = 'stored_clientId';
  const mockModelId = 'model_clientId';
  const mockGeneratedId = 'generated_clientId';
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

  it('generates a client id when no id is present in model or storage ' +
      'and adds it to the current model and storage', () => {
    mockStorage = new MockStorage({'client_id': undefined});
    mockModelInterface =
        new MockModelInterface({'client_id': undefined});

    expect(eventProcessor.getClientId_(mockStorage, mockModelInterface))
        .toBe(mockGeneratedId);
    expect(mockModelInterface.get('client_id')).toBe(mockGeneratedId);
    expect(mockStorage.load('client_id')).toBe(mockGeneratedId);
  });

  it('loads client id from storage when no id is present in model ' +
      'and adds it to the current model', () => {
    mockStorage = new MockStorage({'client_id': mockStoredId});
    mockModelInterface =
        new MockModelInterface({'client_id': undefined});

    expect(eventProcessor.getClientId_(mockStorage, mockModelInterface))
        .toBe(mockStoredId);
    expect(mockModelInterface.get('client_id')).toBe('stored_clientId');
  });

  it('loads client id from model if present', () => {
    mockStorage = new MockStorage({'client_id': undefined});
    mockModelInterface =
        new MockModelInterface({'client_id': mockModelId});

    expect(eventProcessor.getClientId_(mockStorage, mockModelInterface))
        .toBe(mockModelId);
  });

  it('loads client id from model even if there is a ' +
      'different client id in storage', () => {
    mockStorage = new MockStorage({'client_id': mockStoredId});
    mockModelInterface =
        new MockModelInterface({'client_id': mockModelId});

    expect(eventProcessor.getClientId_(mockStorage, mockModelInterface))
        .toBe(mockModelId);
  });

  afterAll(() => {
    uniqueId.generateUniqueId = generateUniqueId;
  });
});
