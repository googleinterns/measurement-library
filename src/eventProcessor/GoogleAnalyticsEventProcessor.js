goog.module('measurementLibrary.eventProcessor.GoogleAnalyticsEventProcessor');

/**
 * Parameters that are to be set at the top level of the JSON
 * POST body instead of as event parameters.
 * @const {!Object<string,boolean>}
 */
const topLevelParams_ = {
  'client_id': true,
  'user_id': true,
  'timestamp_micros': true,
  'user_properties': true,
  'non_personalized_ads': true,
};

/**
 * A class that processes events pushed to the data layer
 * by constructing and sending Google Analytics events via
 * Measurement Protocol.
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
   *     'measurement_url': string,
   *     'client_id_expires': number,
   *     'automatic_params': !Array<string>,
   * }=} optionsObject
   */
  constructor({
      'api_secret': apiSecret,
      'measurement_id': measurementId,
      'measurement_url': measurementUrl = 'https://www.google-analytics.com/mp/collect',
      'client_id_expires': clientIdExpires = 63113904,
      'automatic_params': userAutomaticParams = [],
    } = {}) {
    // TODO: log error if measurementUrl is default value and either apiSecret
    // or measurementId are undefined.

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
   * Processes events pushed to the data layer by constructing and sending JSON
   * POST requests to Google Analytics. Follows Measurement Protocol.
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
    // TODO: constructs and sends JSON POST requests to GA
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
    // TODO: if key is client ID then returns client ID expires, otherwise
    // return default value -1
    return -1;
  }
}

exports = GoogleAnalyticsEventProcessor;
