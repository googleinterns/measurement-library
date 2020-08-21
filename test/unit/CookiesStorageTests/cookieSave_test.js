goog.module('measurementLibrary.storage.CookiesStorage.testing.cookieSave');
goog.setTestOnly();

const CookiesStorage = goog.require('measurementLibrary.storage.CookiesStorage');

const oneSecondInMilliseconds = 1000;

describe('The save method for cookiesStorage', () => {
  const storage = new CookiesStorage({});

  const removeCookie = (key) => {
    const pastDate = 'Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie =
      `ml_${key}=;expires=${pastDate}`;
  };

  it('Saves cookies with null and undefined values', () => {
    storage.save('null', null);

    expect(document.cookie.includes('ml_null=null')).toBe(true);
  });

  it('Saves cookies with falsey and truthy string values', () => {
    storage.save('Hello', 'World');

    expect(document.cookie.includes('ml_Hello="World"')).toBe(true);

    removeCookie('Hello');

    storage.save('Hello', '');

    expect(document.cookie.includes('ml_Hello=""')).toBe(true);

    removeCookie('Hello');
  });

  it('Saves cookies with array values', () => {
    storage.save('array', [1, 'hello', 3, 'world']);

    const arrayString = '[1,"hello",3,"world"]';

    expect(document.cookie.includes(`ml_array=${arrayString}`)).toBe(true);

    removeCookie('array');
  });

  it('Saves cookies with object values', () => {
    storage.save('obj', {'hello': 'world'});

    const objString = '{"hello":"world"}';

    expect(document.cookie.includes(`ml_obj=${objString}`)).toBe(true);

    removeCookie('obj');
  });

  it('Saves cookies with number values', () => {
    storage.save('num', 10);

    const numString = '10';

    expect(document.cookie.includes(`ml_num=${numString}`)).toBe(true);

    removeCookie('num');
  });

  it('Saves cookies with boolean values', () => {
    storage.save('bool', true);

    const boolString = 'true';

    expect(document.cookie.includes(`ml_bool=${boolString}`)).toBe(true);

    removeCookie('bool');
  });

  it('Saves multiple cookies', () => {
    storage.save('bool', true);
    const boolString = 'true';

    storage.save('num', 10);
    const numString = '10';

    storage.save('hello', 'world');

    expect(document.cookie.includes(`ml_bool=${boolString}`)).toBe(true);

    expect(document.cookie.includes(`ml_num=${numString}`)).toBe(true);

    expect(document.cookie.includes(`ml_hello="world"`)).toBe(true);

    removeCookie('bool');
    removeCookie('num');
    removeCookie('hello');
  });

  it('Overwrites cookies saved with the same key', () => {
    storage.save('hello', 'world');

    expect(document.cookie.includes(`ml_hello="world"`)).toBe(true);

    storage.save('hello', 'goodbye');

    expect(document.cookie.includes(`ml_hello="world"`)).toBe(false);

    expect(document.cookie.includes(`ml_hello="goodbye"`)).toBe(true);

    removeCookie('hello');
  });

  it('Saves cookies without a prefix', () => {
    const noPrefixStorage = new CookiesStorage({'prefix': '', 'expires': '1'});

    noPrefixStorage.save('hello', 'world');

    expect(document.cookie.includes(`hello="world"`)).toBe(true);

    removeCookie('hello');
  });

  it('Saves cookies with a custom prefix', () => {
    const noPrefixStorage =
        new CookiesStorage({'prefix': 'p_', 'expires': '1'});

    noPrefixStorage.save('hello', 'world');

    expect(document.cookie.includes(`p_hello="world"`)).toBe(true);
  });

  it('Saves cookies with correct domain', () => {
    const expiryInSeconds = 3;

    const fullAttributeStorage = new CookiesStorage({'prefix': 'pre',
        'expires': expiryInSeconds, 'domain': document.domain});

    let testCookie = '';
    spyOn(fullAttributeStorage, 'setCookie').and.callFake((cookie) => {
      testCookie = cookie;
    });

    fullAttributeStorage.save('hello', 'goodbye');

    expect(testCookie.includes(`prehello="goodbye"`)).toBe(true);

    expect(testCookie.includes(`domain=${document.domain}`)).toBe(true);
  });

  it('Saves cookies with correct expiry', () => {
    const expiryInSeconds = 3;

    const fullAttributeStorage = new CookiesStorage({'prefix': 'pre',
        'expires': expiryInSeconds, 'domain': document.domain});

    let testCookie = '';
    spyOn(fullAttributeStorage, 'setCookie').and.callFake((cookie) => {
      testCookie = cookie;
    });

    const expiresStringLength = 8;

    jasmine.clock().install();
    const mockDate = new Date();
    jasmine.clock().mockDate(mockDate);

    const expectedExpiry = new Date();
    expectedExpiry.setMilliseconds(expectedExpiry.getMilliseconds() +
        expiryInSeconds * oneSecondInMilliseconds);

    fullAttributeStorage.save('hello', 'goodbye');

    expect(testCookie.includes(`prehello="goodbye"`)).toBe(true);

    const beginIndex = testCookie.indexOf('expires=');
    let searchIndex =
        beginIndex + testCookie.substring(beginIndex).indexOf(';');
    if (testCookie.substring(beginIndex).indexOf(';') == -1) {
      searchIndex = testCookie.length();
    }

    const expiryDateString =
        testCookie.substring(beginIndex + expiresStringLength, searchIndex);

    const expiryDate = new Date(expiryDateString);

    expect(expiryDate.toUTCString).toEqual(expectedExpiry.toUTCString);

    jasmine.clock().uninstall();
  });
});
