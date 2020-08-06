goog.module('measurementLibrary.eventProcessor.testing.GoogleAnalyticsEventProcessor.persistTime');
goog.setTestOnly();

const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

describe('The `persistTime` method ' +
    'of GoogleAnalyticsEventProcessor', () => {
  /**
   * Tests the `persistTime` function by passing in a key to check
   * along with the expected value. Also accepts a client ID expiration
   * override.
   * @param {string} key
   * @param {number} expected
   * @param {(number|undefined)=} clientIdExpires
   */
  function checkPersistTime(key, expected, clientIdExpires = undefined) {
    const eventProcessor = new GoogleAnalyticsEventProcessor({
      'client_id_expires': clientIdExpires,
    });

    expect(eventProcessor.persistTime(key, ''))
        .toBe(expected);
  }

  it('returns default when key is not client_id', () => {
    checkPersistTime(
      /** key */ 'test',
      /** expected */ -1
    );
  });

  describe('When key is client_id', () => {
    it('returns positive infinity when ' +
    'client_id_expires is not set', () => {
      checkPersistTime(
        /** key */ 'client_id',
        /** expected */ Number.POSITIVE_INFINITY
      );
    });

    it('returns overridden number when client_id_expires is set', () => {
      checkPersistTime(
        /** key */ 'client_id',
        /** expected */ 0,
        /** clientIdExpires */ 0
      );
    });
  });
});
