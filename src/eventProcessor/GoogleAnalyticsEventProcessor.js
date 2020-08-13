goog.module('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

const logging = goog.require('measurementLibrary.logging');

/**
 * Parameters that are to be set at the top level of the JSON
 * POST body instead of as event parameters.
 * @const {!Object<string,boolean>}
 */
const TOP_LEVEL_PARAMS = {
  'client_id': true,
  'user_id': true,
  'timestamp_micros': true,
  'user_properties': true,
  'non_personalized_ads': true,
};

/**
 * Returns the default Google Analytics measurement URL
 * depending on if debug mode has been enabled.
 * When in debug mode, events get sent to the debug Google Analytics
 * server which returns descriptive error messages if an event
 * is incorrectly formatted.
 * @return {string}
 */
function getDefaultMeasurementUrl() {
  return logging.DEBUG ?
  'https://www.google-analytics.com/debug/mp/collect' :
  'https://www.google-analytics.com/mp/collect';
}

/**
 * A class that processes events pushed to the data layer
 * by constructing and sending Google Analytics events via
 * Measurement Protocol (App + Web).
 * For its Google Analytic events, it generates a unique client ID
 * and stores it in the long term storage model provided.
 * @implements {EventProcessor}
 */
class GoogleAnalyticsEventProcessor {
  /**
   * Constructs a Google Analytics Event Processor using the following
   * optional arguments within the options obejct:
   *
   * api_secret: Google Analytics API Secret. If provided, will be attached to
   *     query parameter of the same name when sending events.
   * measurement_id: Property to be measured Google Analytics Identifier. If
   *     provided, will be attached to query parameter of the same name when
   *     sending events.
   * measurement_url: URL endpoint to send events to. Defaults to
   *     Google Analytics collection endpoint.
   * client_id_expires: Number of seconds to store the client ID in long term
   *     storage. Defaults to two years.
   * automatic_params: Array of event parameters that will be searched for in
   *     the global data model and pulled into all events if found.
   * @param {{
   *     'api_secret': (string|undefined),
   *     'measurement_id': (string|undefined),
   *     'measurement_url': (string|undefined),
   *     'client_id_expires': (number|undefined),
   *     'automatic_params': (!Array<string>|undefined),
   * }=} optionsObject
   */
  constructor({
      'api_secret': apiSecret,
      'measurement_id': measurementId,
      'measurement_url': measurementUrl,
      'client_id_expires': clientIdExpires,
      'automatic_params': userAutomaticParams,
    } = {}) {
    if (apiSecret !== undefined && typeof apiSecret !== 'string') {
      logging.log(
        'Provided API Secret is not a valid string.',
        logging.LogLevel.ERROR
      );
      apiSecret = undefined;
    }
    if (measurementId !== undefined && typeof measurementId !== 'string') {
      logging.log(
        'Provided Measurement ID is not a valid string.',
        logging.LogLevel.ERROR
      );
      measurementId = undefined;
    }
    if (typeof measurementUrl !== 'string') {
      if (measurementUrl !== undefined) {
        logging.log(
          'Provided Measurement URL is not a valid string. ' +
              'Using default URL instead.',
          logging.LogLevel.ERROR
        );
      }
      measurementUrl = getDefaultMeasurementUrl();
      if (measurementId === undefined || apiSecret === undefined) {
        logging.log(
          'Sending events to Google Analytics without measurement ID or ' +
              'API secret will lead to events being dropped.',
          logging.LogLevel.ERROR
        );
      }
    }
    if (clientIdExpires === undefined || isNaN(Number(clientIdExpires))) {
      if (clientIdExpires !== undefined) {
        logging.log(
          'Provided Client ID Expires is not a valid number. ' +
              'Using default of two years instead.',
          logging.LogLevel.ERROR
        );
      }
      clientIdExpires = 2 * 365 * 24 * 60 * 60;
    } else {
      clientIdExpires = Number(clientIdExpires);
    }
    if (Object.prototype.toString.call(userAutomaticParams) !==
        '[object Array]') {
      if (userAutomaticParams !== undefined) {
        logging.log(
          'Provided Automatic Parameters are not contained within an array ' +
              'Discarding provided value.',
          logging.LogLevel.ERROR
        );
      }
      userAutomaticParams = [];
    }

    /**
     * Parameters that are important to all events and will be searched for
     * globally in the data model.
     * @private @const {!Object<string, boolean>}
     */
    this.automaticParams_ = {
      'page_path': true,
      'page_location': true,
      'page_title': true,
      'user_id': true,
      'client_id': true,
    };

    // Add user provided params to automatic param list
    for (let i = 0; i < userAutomaticParams.length; ++i) {
      this.automaticParams_[userAutomaticParams[i]] = true;
    }

    /**
     * An API secret that can be generated via Google Analytics UI
     * NOTE: This processor makes public network requests using this
     * API secret. To avoid spam, regenerate API secrets regularly.
     * @private @const {string|undefined}
     */
    this.apiSecret_ = apiSecret;

    /**
     * The identifier for property being measured. Can be found using
     * the Google Analytics UI.
     * @private @const {string|undefined}
     */
    this.measurementId_ = measurementId;

    /**
     * URL to send network requests to. Defaults to the Google Analytics
     * collection endpoint. Data must be sent via HTTPS.
     * @private @const {string}
     */
    this.measurementUrl_ = measurementUrl;

    /**
     * How long the client ID key should be stored in long term storage
     * measured in seconds. Defaults to two years.
     * @private @const {number}
     */
    this.clientIdExpires_ = clientIdExpires;
  }

  /**
   * Names the event processor so multiple processors
   * can share previous configuration.
   * @return {string}
   * @export
   */
  getName() {
    return 'googleAnalytics';
  }

  /**
   * Builds the POST request URL using `measurement_id` and `api_secret`
   * query parameters if available
   * @return {string}
   * @private
   */
  buildRequestUrl_() {
    const paramsArray = [];
    if (this.measurementId_) {
      paramsArray.push(
        `measurement_id=${encodeURIComponent(this.measurementId_)}`
      );
    }
    if (this.apiSecret_) {
      paramsArray.push(
        `api_secret=${encodeURIComponent(this.apiSecret_)}`
      );
    }
    if (paramsArray.length > 0) {
      const params = paramsArray.join('&');
      return `${this.measurementUrl_}?${params}`;
    }
    return this.measurementUrl_;
  }

  /**
   * Processes events pushed to the data layer by constructing and sending JSON
   * POST requests to Google Analytics.
   * Follows Measurement Protocol (App + Web).
   * @param {!StorageInterface} storageInterface An interface to an object to
   *    load or save persistent data with.
   * @param {{get:function(string):*, set:function(string, *)}} modelInterface
   *    An interface to load or save short term page data from the data layer.
   * @param {string} eventName The name of the event passed to the data layer.
   * @param {!Object<string, *>=} eventOptions The events passed to the data
   *     layer.
   * @export
   */
  processEvent(storageInterface, modelInterface, eventName, eventOptions) {
    // TODO(kjgalvan):: constructs and sends JSON POST requests to GA
  }

  /**
   * Checks if the key being set by the user is client ID and if so returns
   * the client ID expiry.
   * @param {string} key The location at which to store data in the model.
   *    Dot notation is used to access a nested value (i.e. 'employees.jim'
   *    is the key 'jim' in the nested 'employees' object).
   * @param {*} value The data to store.
   * @return {number} How long the key should be stored in seconds.
   *     If -1, then the default value saved in storage will be used.
   *     If 0, the data is not saved to long term storage at all.
   *     If Number.POSITIVE_INFINITY, data will be stored forever.
   * @export
   */
  persistTime(key, value) {
    // TODO(kjgalvan):: if key is client ID then returns client ID expires,
    // otherwise return default value -1
    return -1;
  }
}

exports = GoogleAnalyticsEventProcessor;
