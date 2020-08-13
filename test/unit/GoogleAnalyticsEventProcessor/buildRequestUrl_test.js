goog.module('measurementLibrary.eventProcessor.testing.GoogleAnalyticsEventProcessor.buildRequestUrl');
goog.setTestOnly();

const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');
const logging = goog.require('measurementLibrary.logging');

describe('The `buildRequestUrl_` method ' +
    'of GoogleAnalyticsEventProcessor', () => {
  const currentDebug = logging.DEBUG;

  /**
   * Builds expectation object for the `buildRequestUrl_` function by passing
   * in an API secret, measurement ID, and measurement URL to construct the
   * event processor with for the function call.
   * @param {string|undefined} apiSecret
   * @param {string|undefined} measurementId
   * @param {string|undefined} measurementUrl
   * @return {!Expectation}
   */
  function expectRequestUrl(apiSecret, measurementId, measurementUrl) {
    const eventProcessor = new GoogleAnalyticsEventProcessor({
      'api_secret': apiSecret,
      'measurement_id': measurementId,
      'measurement_url': measurementUrl,
    });

    return expect(eventProcessor.buildRequestUrl_());
  }

  it('creates the correct query string when using an overriden ' +
      'measurement url', () => {
    expectRequestUrl(
      /* apiSecret */ '123',
      /* measurementId */ '456',
      /* measurementUrl */ 'https://test.com'
    ).toBe('https://test.com?measurement_id=456&api_secret=123');

    expectRequestUrl(
      /* apiSecret */ undefined,
      /* measurementId */ '456',
      /* measurementUrl */ 'https://test.com'
    ).toBe('https://test.com?measurement_id=456');

    expectRequestUrl(
      /* apiSecret */ '123',
      /* measurementId */ undefined,
      /* measurementUrl */ 'https://test.com'
    ).toBe('https://test.com?api_secret=123');

    expectRequestUrl(
      /* apiSecret */ undefined,
      /* measurementId */ undefined,
      /* measurementUrl */ 'https://test.com'
    ).toBe('https://test.com');
  });

  it('encodes query parameters', () => {
    expectRequestUrl(
      /* apiSecret */ '123&other_param=other_arg',
      /* measurementId */ '456',
      /* measurementUrl */ 'https://test.com'
    ).toBe('https://test.com?' +
        'measurement_id=456&api_secret=123%26other_param%3Dother_arg');
  });

  it('does not add empty strings as query parameters', () => {
    expectRequestUrl(
      /* apiSecret */ '',
      /* measurementId */ undefined,
      /* measurementUrl */ 'https://test.com'
    ).toBe('https://test.com');

    expectRequestUrl(
      /* apiSecret */ undefined,
      /* measurementId */ '',
      /* measurementUrl */ 'https://test.com'
    ).toBe('https://test.com');

    expectRequestUrl(
      /* apiSecret */ '',
      /* measurementId */ '',
      /* measurementUrl */ 'https://test.com'
    ).toBe('https://test.com');
  });

  describe('when debug mode is disabled', () => {
    beforeAll(() => {
      logging.DEBUG = false;
    });

    it('creates the correct query string when using the default ' +
    'measurement url', () => {
      expectRequestUrl(
        /* apiSecret */ '123',
        /* measurementId */ '456',
        /* measurementUrl */ undefined
      ).toBe('https://www.google-analytics.com/mp/collect?' +
          'measurement_id=456&api_secret=123');

      expectRequestUrl(
        /* apiSecret */ undefined,
        /* measurementId */ '456',
        /* measurementUrl */ undefined
      ).toBe('https://www.google-analytics.com/mp/collect?measurement_id=456');

      expectRequestUrl(
        /* apiSecret */ '123',
        /* measurementId */ undefined,
        /* measurementUrl */ undefined
      ).toBe('https://www.google-analytics.com/mp/collect?api_secret=123');

      expectRequestUrl(
        /* apiSecret */ undefined,
        /* measurementId */ undefined,
        /* measurementUrl */ undefined
      ).toBe('https://www.google-analytics.com/mp/collect');
    });
  });

  describe('when debug mode is enabled', () => {
    beforeAll(() => {
      logging.DEBUG = true;
    });

    it('creates the correct query string when using the debug ' +
        'measurement url', () => {
      expectRequestUrl(
        /* apiSecret */ '123',
        /* measurementId */ '456',
        /* measurementUrl */ undefined
      ).toBe('https://www.google-analytics.com/debug/mp/collect?' +
          'measurement_id=456&api_secret=123');

      expectRequestUrl(
        /* apiSecret */ undefined,
        /* measurementId */ '456',
        /* measurementUrl */ undefined
      ).toBe('https://www.google-analytics.com/debug/mp/collect?measurement_id=456');

      expectRequestUrl(
        /* apiSecret */ '123',
        /* measurementId */ undefined,
        /* measurementUrl */ undefined
      ).toBe('https://www.google-analytics.com/debug/mp/collect?api_secret=123');

      expectRequestUrl(
        /* apiSecret */ undefined,
        /* measurementId */ undefined,
        /* measurementUrl */ undefined
      ).toBe('https://www.google-analytics.com/debug/mp/collect');
    });
  });

  afterAll(() => {
    logging.DEBUG = currentDebug;
  });
});
