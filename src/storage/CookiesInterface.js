goog.module('measurementLibrary.storage.CookiesStorage');

/**
 * An implementation of StorageInterface that uses cookies for storage.
 * @implements {StorageInterface}
 */
class CookiesStorage {
  /** @param {!Object.<string, string|number|boolean>} settings an object
   *      holding the settings to be set on this instance of CookiesStorage.
   */
  constructor(settings) {
    /** @private @const {!Object.<string, string|number|boolean>}*/
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
    if (!this.settings_['expires']) {
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
   *    domain for cookies
   * @param {!document} document the document whose cookies are to be set.
   * @return {?string} the registrable domain of docDomain
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
      const newCookie = `registrable_domain=${ domain };domain=${ domain }`;
      document.cookie = newCookie;
    }

    if (document.cookie === oldCookies) {
      return null;
    }

    return domain;
  }

  /** @override */
  save(key, value, secondsToLive) {}

  /** @override */
  load(key, defaultValue) {}
}

exports = CookiesStorage;
