goog.module('measurementLibrary.eventProcessor.testing.GoogleAnalyticsEventProcessor.buildRequestUrl');
goog.setTestOnly();

const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

describe('The `buildRequestUrl` method ' +
    'of GoogleAnalyticsEventProcessor', () => {
  /**
   * Tests the `buildRequestUrl` function by passing in an API secret,
   * measurement ID, and measurement URL to construct the event processor
   * with and comparing the result of the function with the expected result.
   * @param {string} apiSecret
   * @param {string} measurementId
   * @param {string} measurementUrl
   * @param {string} expected
   */
  function checkRequestUrl(apiSecret, measurementId, measurementUrl, expected) {
    const eventProcessor = new GoogleAnalyticsEventProcessor({
      'api_secret': apiSecret,
      'measurement_id': measurementId,
      'measurement_url': measurementUrl,
    });

    expect(eventProcessor.buildRequestUrl())
        .toBe(expected);
  }

  it('creates the correct api hit with default url', () => {
    checkRequestUrl(
      /** apiSecret */ '123',
      /** measurementId */ '456',
      /** measurementUrl */ undefined,
      /** expected */ 'https://www.google-analytics.com/mp/collect?measurement_id=456&api_secret=123'
    );

    checkRequestUrl(
      /** apiSecret */ '',
      /** measurementId */ '456',
      /** measurementUrl */ undefined,
      /** expected */ 'https://www.google-analytics.com/mp/collect?measurement_id=456'
    );

    checkRequestUrl(
      /** apiSecret */ '123',
      /** measurementId */ '',
      /** measurementUrl */ undefined,
      /** expected */ 'https://www.google-analytics.com/mp/collect?api_secret=123'
    );

    checkRequestUrl(
      /** apiSecret */ '',
      /** measurementId */ '',
      /** measurementUrl */ undefined,
      /** expected */ 'https://www.google-analytics.com/mp/collect'
    );
  });

  it('creates the correct api hit with overridden url', () => {
    checkRequestUrl(
      /** apiSecret */ '123',
      /** measurementId */ '456',
      /** measurementUrl */ 'https://test.com',
      /** expected */ 'https://test.com?measurement_id=456&api_secret=123'
    );

    checkRequestUrl(
      /** apiSecret */ '',
      /** measurementId */ '456',
      /** measurementUrl */ 'https://test.com',
      /** expected */ 'https://test.com?measurement_id=456'
    );

    checkRequestUrl(
      /** apiSecret */ '123',
      /** measurementId */ '',
      /** measurementUrl */ 'https://test.com',
      /** expected */ 'https://test.com?api_secret=123'
    );

    checkRequestUrl(
      /** apiSecret */ '',
      /** measurementId */ '',
      /** measurementUrl */ 'https://test.com',
      /** expected */ 'https://test.com'
    );
  });
});
