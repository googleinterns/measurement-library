goog.module('measurementLibrary.storage.CookiesStorage');

/** @const {number} */
const TEN_YEARS_IN_SECONDS = 10 * 365 * 24 * 60 * 60;

/**
 * An implementation of StorageInterface that uses cookies for storage.
 * @implements {StorageInterface}
 */
class CookiesStorage {
  /**
   * @param {!Object<string, (null|string|number|boolean)>} settings An object
   *     holding the settings to be set on this instance of CookiesStorage.
   */
  constructor(settings) {
    /** @private @const {!Object<string, (null|string|number|boolean)>}*/
    this.settings_ = settings;

    this.setDefaults_();
  }

  /**
   * Helps the constructor set the default for any omitted settings.
   * @private
   */
  setDefaults_() {
    if (!this.settings_['domain']) {
      this.settings_['domain'] = this.findAutoDomain_(document);
    }
    if (this.settings_['expires'] == undefined) {
      // 28 days in seconds, default expiry time.
      const defaultTime = 28 * 24 * 60 * 60;
      this.settings_['expires'] = defaultTime;
    }
    if (!this.settings_['prefix']) {
      // ml for measurement library. should be discussed.
      const defaultPrefix = 'ml_';
      this.settings_['prefix'] = defaultPrefix;
    }
    if (!this.settings_['update']) {
      const defaultUpdate = true;
      this.settings_['update'] = defaultUpdate;
    }
    if (!this.settings_['flags']) {
      const defaultFlags = '';
      this.settings_['flags'] = defaultFlags;
    }
  }

  /**
   * Finds the registrable domain of current URL and sets it as the default
   *    domain for cookies.
   * @param {!Object} document The document whose cookies are to be set.
   * @return {?string} The registrable domain of docDomain.
   * @private
   */
  findAutoDomain_(document) {
    const oldCookies = document.cookie;
    const domainArray = document.domain.split('.');
    let domain = domainArray.pop();
    const newCookie = `registrable_domain=${domain};domain=${domain}`;
    document.cookie = newCookie;

    while (document.cookie === oldCookies && domainArray.length > 0) {
      domain = `${domainArray.pop() }.${ domain }`;
      document.cookie = `registrable_domain=${ domain };domain=${domain}`;
    }

    if (document.cookie === oldCookies) {
      return null;
    }

    // Since the cookie was updated with a dummy value, remove it by setting
    // expiry to a date in the past.
    const pastDate = 'Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie =
        `registrable_domain=;domain=${domain};expires=${pastDate}`;

    return domain;
  }

  /** @override */
  save(key, value, secondsToLive =
    /** @type {number} */ (this.settings_['expires'])) {
    const valString = JSON.stringify(value);
    let newCookie = `${this.settings_['prefix']}${key}=${valString}`;
    newCookie = this.addSettings(newCookie, secondsToLive);
    this.setCookie(newCookie);
  }

  /**
   * Seperates the creation of the cookie from setting it for testing purposes.
   * @param {string} cookie The cookie to set in document.cookie.
   * @private
   */
  setCookie(cookie) {
    document.cookie = cookie;
  }

  /**
   * Finds the registrable domain of current URL and sets it as the default
   *    domain for cookies.
   * @param {string} cookie The cookie to add settings to.
   * @param {?number} secondsToLive The number of seconds cookie will be in
   *    storage.
   * @return {string} The cookie with all added settings.
   * @private
   */
  addSettings(cookie, secondsToLive) {
    cookie = `${cookie}; domain=${this.settings_['domain']}`;

    const expiry = new Date();

    if (secondsToLive === Number.POSITIVE_INFINITY) {
      expiry.setMilliseconds(expiry.getMilliseconds() + (TEN_YEARS_IN_SECONDS) *
          1000);
    } else {
      expiry.setMilliseconds(expiry.getMilliseconds() + (secondsToLive) *
          1000);
    }

    cookie = `${cookie}; expires=${expiry.toUTCString()}`;

    cookie = `${cookie}; ${this.settings_['flags']}`;

    return cookie;
  }

  /** @override */
  load(key, defaultValue) {
    if (document.cookie.indexOf(`${key}=`) === -1) {
      return defaultValue;
    }

    const cookieArray = document.cookie.split(';');

    // cookie structure is key=val;key=val OR key=val; key=val. This boolean
    // statement takes care of both possibilities.
    const resultCookie = cookieArray.find((row) =>
      row.indexOf(`${this.settings_['prefix']}${key}`) === 0 ||
      row.indexOf(`${this.settings_['prefix']}${key}`) === 1
    );
    const resultVal = resultCookie.split('=')[1];

    return JSON.parse(resultVal);
  }

  /**
   * Name of the storage.
   * @return {string}
   * @export
   */
  static getName() {
    return 'cookies';
  }
}

exports = CookiesStorage;
