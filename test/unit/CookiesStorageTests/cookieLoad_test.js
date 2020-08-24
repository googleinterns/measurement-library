goog.module('measurementLibrary.storage.CookiesStorage.testing.cookieLoad');
goog.setTestOnly();

const CookiesStorage = goog.require('measurementLibrary.storage.CookiesStorage');

describe('The load method for cookiesStorage', () => {
  const storage = new CookiesStorage({});

  const addCookie = (key, value) => {
    document.cookie =
        `ml_${key}=${JSON.stringify(value)}`;
  };

  const removeCookie = (key) => {
    const pastDate = 'Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie =
      `ml_${key}=;expires=${pastDate}`;
  };

  it('loads cookies with null values', () => {
    addCookie('null', null);

    expect(storage.load('null')).toEqual(null);

    removeCookie('null');
  });

  it('loads cookies with truthy and falsey string values', () => {
    addCookie('string', 'str');

    expect(storage.load('string')).toEqual('str');

    addCookie('string', '');

    expect(storage.load('string')).toEqual('');

    removeCookie('string');
  });

  it('loads cookies with object values', () => {
    addCookie('obj', {'hello': 'world'});

    expect(storage.load('obj')).toEqual({'hello': 'world'});

    removeCookie('obj');
  });

  it('loads cookies with number values', () => {
    addCookie('num', 10);

    expect(storage.load('num')).toEqual(10);

    removeCookie('num');
  });

  it('loads cookies with boolean values', () => {
    addCookie('bool', true);

    expect(storage.load('bool')).toEqual(true);

    removeCookie('bool');
  });
});
