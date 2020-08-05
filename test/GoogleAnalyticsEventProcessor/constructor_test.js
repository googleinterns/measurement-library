goog.module('measurementLibrary.eventProcessor.testing.GoogleAnalyticsEventProcessor.processEvent');
goog.setTestOnly();

const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

describe('The `constructor` of GoogleAnalyticsEventProcessor', () => {
  let eventProcessor;

  const defaultAutomaticParams = {
    'page_path': true,
    'page_location': true,
    'page_title': true,
    'user_id': true,
    'client_id': true,
  };

  it('does not have a default arguments for ' +
      '`api_secret` or `measurement_id`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor();

    expect(eventProcessor.apiSecret_).toBeUndefined();
    expect(eventProcessor.measurementId_).toBeUndefined();
  });

  it('has the correct default arguments for `measurement_url`, ' +
  '`client_id_expires`, and `automatic_params`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor();

    expect(eventProcessor.measurementUrl_).toBe('https://www.google-analytics.com/mp/collect');
    expect(eventProcessor.clientIdExpires_).toBePositiveInfinity();

    for (const key in defaultAutomaticParams) {
      expect(eventProcessor.automaticParams_.hasOwnProperty(key)).toBeTrue();

      if (eventProcessor.automaticParams_.hasOwnProperty(key)) {
        expect(eventProcessor.automaticParams_[key])
            .toBe(defaultAutomaticParams[key]);
      }
    }
  });

  it('correctly sets `api_secret`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor({
      'api_secret': 'test_api_secret',
    });

    expect(eventProcessor.apiSecret_).toBe('test_api_secret');
  });

  it('correctly sets `measurement_id`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor({
      'measurement_id': 'test_measurement_id',
    });

    expect(eventProcessor.measurementId_).toBe('test_measurement_id');
  });

  it('correctly overrides `measurement_url`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor({
      'measurement_url': 'test_url',
    });

    expect(eventProcessor.measurementUrl_).toBe('test_url');
  });

  it('correctly overrides `client_id_expires`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor({
      'client_id_expires': 0,
    });

    expect(eventProcessor.clientIdExpires_).toBe(0);
  });

  it('correctly overrides `automatic_params`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor({
      'automatic_params': {
        'client_id': false,
        'custom_param': true,
      },
    });

    for (const key in defaultAutomaticParams) {
      expect(eventProcessor.automaticParams_.hasOwnProperty(key)).toBeTrue();
    }

    expect(eventProcessor.automaticParams_['client_id']).toBeFalse();
    expect(eventProcessor.automaticParams_['custom_param']).toBeTrue();
  });
});
