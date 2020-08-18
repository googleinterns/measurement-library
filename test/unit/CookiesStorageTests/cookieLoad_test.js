goog.module('measurementLibrary.storage.CookiesStorage.testing.cookieLoad');
goog.setTestOnly();

const CookiesStorage = goog.require('measurementLibrary.storage.CookiesStorage');

describe('The load method for cookiesStorage', () => {
  const storage = new CookiesStorage({});

  const addCookie = (key, value) => {
    const expiry = new Date();
    expiry.setMilliseconds(expiry.getMilliseconds() + 1000);
    document.cookie =
        `ml_${key}=${JSON.stringify(value)}; expires=${expiry.toUTCString}`;
  };

  it('loads cookies with string values', () => {
    addCookie('string', 'str');

    expect(storage.load('string')).toEqual('str');
  });

  it('loads cookies with object values', () => {
    addCookie('obj', {'hello': 'world'});

    expect(storage.load('obj')).toEqual({'hello': 'world'});
  });

  it('loads cookies with number values', () => {
    addCookie('num', 10);

    expect(storage.load('num')).toEqual(10);
  });

  it('loads cookies with boolean values', () => {
    addCookie('bool', true);

    expect(storage.load('bool')).toEqual(true);
  });
});
