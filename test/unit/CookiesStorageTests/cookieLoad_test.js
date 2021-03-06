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

  it('loads cookies with array values', () => {
    addCookie('array2', [1, 2, 3]);

    expect(storage.load('array2')).toEqual([1, 2, 3]);

    removeCookie('array2');
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

  it('loads cookies with "=" in the value', () => {
    addCookie('equal', 'hello=world');

    expect(storage.load('equal')).toEqual('hello=world');

    addCookie('equal', '=');

    expect(storage.load('equal')).toEqual('=');

    removeCookie('equal');
  });

  it('loads a cookie whose key is a prefix of another cookie key', () => {
    addCookie('cookie', {'just': 'forFun'});

    expect(storage.load('cookie')).toEqual({'just': 'forFun'});

    addCookie('cookie_overlap', 'overlap');

    expect(storage.load('cookie_overlap')).toEqual('overlap');
    expect(storage.load('cookie')).toEqual({'just': 'forFun'});

    addCookie('co', 'also_overlap');
    
    expect(storage.load('cookie_overlap')).toEqual('overlap');
    expect(storage.load('cookie')).toEqual({'just': 'forFun'});
    expect(storage.load('co')).toEqual('also_overlap');

    removeCookie('co');
    removeCookie('cookie');
    removeCookie('cookie_overlap');
  });
});
