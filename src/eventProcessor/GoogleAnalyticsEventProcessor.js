goog.module('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

const uniqueId = goog.require('measurementLibrary.eventProcessor.generateUniqueId');
const logging = goog.require('measurementLibrary.logging');

/**
 * Parameters that are to be set at the top level of the JSON
 * POST body instead of as event parameters.
 * @const {!Object<string,string>}
 */
const TOP_LEVEL_PARAMS = {
  'client_id': 'clientId',
  'user_id': 'userId',
  'timestamp_micros': 'timestampMircos',
  'user_properties': 'userProperties',
  'non_personalized_ads': 'nonPersonalizedAds',
};

/**
 * Default client ID expires value.
 * @const {number}
 */
const DEFAULT_CLIENT_ID_EXPIRES = 2 * 365 * 24 * 60 * 60;

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
    if (isNaN(Number(clientIdExpires))) {
      if (clientIdExpires !== undefined) {
        logging.log(
          'Provided Client ID Expires is not a valid number. ' +
              'Using default value instead.',
          logging.LogLevel.ERROR
        );
      }
      clientIdExpires = DEFAULT_CLIENT_ID_EXPIRES;
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
     * @private @const {!Object<string, string>}
     */
    this.automaticParams_ = {
      'page_path': 'page_path',
      'page_location': 'page_location',
      'page_title': 'page_title',
      'user_id': 'userId',
      'client_id': 'clientId',
    };

    // Add user provided params to automatic param list
    for (let i = 0; i < userAutomaticParams.length; ++i) {
      this.automaticParams_[userAutomaticParams[i]] = userAutomaticParams[i];
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
  static getName() {
    return 'googleAnalytics';
  }

  /**
   * Gets value stored in the global model under a given key.
   * Only accesses the globel model if the given key is an automatic parameter.
   * @param {string} key
   * @param {{get:function(string):*, set:function(string, *)}} modelInterface
   *    An interface to load or save short term page data from the data layer.
   * @return {*} value
   * @private
   */
  getFromGlobalScope_(key, modelInterface) {
    if (this.automaticParams_[key]) {
      return modelInterface.get(key);
    }
    return undefined;
  }

  /**
   * Gets the ID associated with the current client.
   * First queries the global model followed by long term storage if not yet
   * found for `clientId`. If no previous ID exists, a new one is generated
   * and stored for future use in both the global model and long term storage.
   * @param {!StorageInterface} storageInterface An interface to an object to
   *    load or save persistent data with.
   * @param {{get:function(string):*, set:function(string, *)}} modelInterface
   *    An interface to load or save short term page data from the data layer.
   * @return {string}
   * @private
   */
  getClientId_(storageInterface, modelInterface) {
    let clientId = this.getFromGlobalScope_('client_id', modelInterface);
    if (!clientId || typeof clientId !== 'string') {
      clientId = storageInterface.load('client_id');
      if (!clientId || typeof clientId !== 'string') {
        clientId = uniqueId.generateUniqueId();
        storageInterface.save('client_id', clientId, this.clientIdExpires_);
      }
      modelInterface.set('client_id', clientId);
    }
    return clientId;
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
   * Adds a key value pair to JSON POST request if value is defined.
   * If the key is a top level parameter, the pair will be added at the topmost
   * level of the JSON.
   * If not, the pair is interpreted as an event parameter and added to the
   * params object within the JSON.
   * @param {!Object<string, *>} json
   * @param {string} key
   * @param {*} value
   * @private
   */
  addKeyValuePairToJson_(json, key, value) {
    if (value !== undefined) {
      if (TOP_LEVEL_PARAMS[key]) {
        json[TOP_LEVEL_PARAMS[key]] = value;
      } else {
        json['events'][0]['params'][key] = value;
      }
    }
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
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.buildRequestUrl_());

    const json = {
      'events': [{'name': eventName, 'params': {}}],
    };

    for (const key in this.automaticParams_) {
      let value;
      if (key === 'client_id') {
        value = this.getClientId_(storageInterface, modelInterface);
      } else {
        value = this.getFromGlobalScope_(key, modelInterface);
      }
      this.addKeyValuePairToJson_(json, key, value);
    }

    for (const key in eventOptions) {
      this.addKeyValuePairToJson_(json, key, eventOptions[key]);
    }

    if (logging.DEBUG) {
      xhr.onload = () => {
        logging.log(xhr.responseText, logging.LogLevel.INFO);
      };
    }

    xhr.send(JSON.stringify(json));
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
    if (key === 'clientId') {
      return this.clientIdExpires_;
    } else {
      return -1;
    }
  }
}

exports = GoogleAnalyticsEventProcessor;
