goog.module('measurementLibrary.testing.eventProcessor.GoogleAnalyticsEventProcessor.constructor');
goog.setTestOnly();

const GoogleAnalyticsEventProcessor = goog.require('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');
const logging = goog.require('measurementLibrary.logging');

describe('The `constructor` of GoogleAnalyticsEventProcessor', () => {
  let eventProcessor;
  const currentDebug = logging.DEBUG;

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

  it('has default arguments for `measurement_url`, ' +
  '`client_id_expires`, and `automatic_params`', () => {
    logging.DEBUG = false;
    eventProcessor = new GoogleAnalyticsEventProcessor();

    expect(eventProcessor.measurementUrl_).toBe('https://www.google-analytics.com/mp/collect');
    expect(eventProcessor.clientIdExpires_).toBe(2 * 365 * 24 * 60 * 60);
    expect(eventProcessor.automaticParams_).toEqual(defaultAutomaticParams);
    logging.DEBUG = currentDebug;
  });

  it('sets `api_secret`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor({
      api_secret: 'test_api_secret',
    });

    expect(eventProcessor.apiSecret_).toBe('test_api_secret');
  });

  it('sets `measurement_id`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor({
      measurement_id: 'test_measurement_id',
    });

    expect(eventProcessor.measurementId_).toBe('test_measurement_id');
  });

  it('overrides `measurement_url`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor({
      measurement_url: 'test_url',
    });

    expect(eventProcessor.measurementUrl_).toBe('test_url');
  });

  it('overrides `client_id_expires`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor({
      client_id_expires: 600,
    });

    expect(eventProcessor.clientIdExpires_).toBe(600);
  });

  it('sets `automatic_params`', () => {
    eventProcessor = new GoogleAnalyticsEventProcessor({
      automatic_params: ['custom_param'],
    });

    expect(eventProcessor.automaticParams_['client_id']).toBeTrue();
    expect(eventProcessor.automaticParams_['custom_param']).toBeTrue();
  });

  describe('when debug mode is enabled', () => {
    beforeAll(() => {
      logging.DEBUG = true;
    });

    it('overrides default `measurement_url` to use debug analytics', () => {
      eventProcessor = new GoogleAnalyticsEventProcessor();

      expect(eventProcessor.measurementUrl_).toBe('https://www.google-analytics.com/debug/mp/collect');
    });

    it('logs an error if either `measurement_id` or `api_secret` ' +
        'are undefined while events are being sent to analytics', () => {
      spyOn(logging, 'log');
      eventProcessor = new GoogleAnalyticsEventProcessor();

      expect(logging.log).toHaveBeenCalledTimes(1);
    });

    it('logs error to console if `api secret` is not valid string', () => {
      spyOn(logging, 'log');
      eventProcessor = new GoogleAnalyticsEventProcessor({
        api_secret: 'valid_string',
        measurement_id: 'valid_string',
      });

      expect(logging.log).toHaveBeenCalledTimes(0);

      eventProcessor = new GoogleAnalyticsEventProcessor({
        api_secret: {},
        measurement_id: 'valid_string',
      });

      expect(logging.log).toHaveBeenCalledTimes(2);
      expect(eventProcessor.apiSecret_).toBeUndefined();
    });

    it('logs error to console if `measurement_id` is not ' +
        'valid string', () => {
      spyOn(logging, 'log');
      eventProcessor = new GoogleAnalyticsEventProcessor({
        api_secret: 'valid_string',
        measurement_id: 'valid_string',
      });

      expect(logging.log).toHaveBeenCalledTimes(0);

      eventProcessor = new GoogleAnalyticsEventProcessor({
        api_secret: 'valid_string',
        measurement_id: 123456,
      });

      expect(logging.log).toHaveBeenCalledTimes(2);
      expect(eventProcessor.measurementId_).toBeUndefined();
    });

    it('logs error to console if `measurement_url` is not ' +
        'valid string', () => {
      spyOn(logging, 'log');
      eventProcessor = new GoogleAnalyticsEventProcessor({
        api_secret: 'valid_string',
        measurement_id: 'valid_string',
        measurement_url: 'valid_string',
      });

      expect(logging.log).toHaveBeenCalledTimes(0);

      eventProcessor = new GoogleAnalyticsEventProcessor({
        api_secret: 'valid_string',
        measurement_id: 'valid_string',
        measurement_url: [],
      });

      expect(logging.log).toHaveBeenCalledTimes(1);
      expect(eventProcessor.measurementUrl_)
          .toBe('https://www.google-analytics.com/debug/mp/collect');
    });

    it('logs error to console if `client_id_expires` is not ' +
        'able to be cast as a number', () => {
      spyOn(logging, 'log');
      eventProcessor = new GoogleAnalyticsEventProcessor({
        client_id_expires: '1', // casts to one
        api_secret: 'valid_string',
        measurement_url: 'valid_string',
      });

      expect(eventProcessor.clientIdExpires_).toBe(1);

      eventProcessor = new GoogleAnalyticsEventProcessor({
        client_id_expires: [], // casts to zero
        api_secret: 'valid_string',
        measurement_url: 'valid_string',
      });

      expect(eventProcessor.clientIdExpires_).toBe(0);

      eventProcessor = new GoogleAnalyticsEventProcessor({
        client_id_expires: undefined, // uses default instead of casting to zero
        api_secret: 'valid_string',
        measurement_url: 'valid_string',
      });

      expect(eventProcessor.clientIdExpires_).toBe(2 * 365 * 24 * 60 * 60);

      expect(logging.log).toHaveBeenCalledTimes(0);

      eventProcessor = new GoogleAnalyticsEventProcessor({
        client_id_expires: {},
        api_secret: 'valid_string',
        measurement_url: 'valid_string',
      });
      eventProcessor = new GoogleAnalyticsEventProcessor({
        client_id_expires: 'invalid_number',
        api_secret: 'valid_string',
        measurement_url: 'valid_string',
      });

      expect(logging.log).toHaveBeenCalledTimes(2);
    });

    it('logs error to console if `automatic_params` is not ' +
        'an array', () => {
      spyOn(logging, 'log');
      eventProcessor = new GoogleAnalyticsEventProcessor({
        automatic_params: ['test'],
        api_secret: 'valid_string',
        measurement_url: 'valid_string',
      });

      expect(logging.log).toHaveBeenCalledTimes(0);

      eventProcessor = new GoogleAnalyticsEventProcessor({
        automatic_params: {test: 1},
        api_secret: 'valid_string',
        measurement_url: 'valid_string',
      });

      expect(logging.log).toHaveBeenCalledTimes(1);
      expect(eventProcessor.automaticParams_).toEqual(defaultAutomaticParams);
    });

    afterAll(() => {
      logging.DEBUG = currentDebug;
    });
  });
});
