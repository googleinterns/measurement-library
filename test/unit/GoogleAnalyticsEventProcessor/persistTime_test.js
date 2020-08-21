goog.module('measurementLibrary.eventProcessor.testing.GoogleAnalyticsEventProcessor.persistTime');
goog.setTestOnly();

const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

describe('The `persistTime` method ' +
    'of GoogleAnalyticsEventProcessor', () => {
  /**
   * Builds expectation object for the `persistTime` function by passing
   * in a key to make function call with. Also accepts a client ID
   * expiration override.
   * @param {string} key
   * @param {(number|undefined)=} clientIdExpires
   * @return {!Expectation}
   */
  function expectPersistTime(key, clientIdExpires = undefined) {
    const eventProcessor = new GoogleAnalyticsEventProcessor({
      'client_id_expires': clientIdExpires,
    });

    return expect(eventProcessor.persistTime(key, ''));
  }

  it('returns default when key is not clientId', () => {
    expectPersistTime('test').toBe(-1);
  });

  describe('When key is clientId', () => {
    it('returns two years when client_id_expires is not set', () => {
      expectPersistTime('clientId').toBe(2 * 365 * 24 * 60 * 60);
    });

    it('returns overridden number when client_id_expires is set', () => {
      expectPersistTime('clientId', /* clientIdExpires */ 0).toBe(0);
    });
  });
});
