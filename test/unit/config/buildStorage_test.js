goog.module('measurementLibrary.testing.config.configStorages.buildStorage');
goog.setTestOnly();

const {buildStorage_} = goog.require('measurementLibrary.config.configProcessors');
const CookiesStorage = goog.require('measurementLibrary.storage.CookiesStorage');

let storageConstructor;

class MockStorage {
  constructor() {
    storageConstructor.apply(this, arguments);
  }
  static getName() {
    return 'storage';
  }
}

describe('Calling the buildStorage_ function of configStorages', () => {
  beforeEach(() => {
    storageConstructor = jasmine.createSpy('storageConstructor');
  });

  it('returns false when the wrong string is passed in ', () => {
    expect(buildStorage_('unimplemented', {}, null)).toEqual(null);
  });

  it('returns a storage when a valid string is passed in ', () => {
    expect(buildStorage_('cookies', {}, null)).toBeInstanceOf(CookiesStorage);
  });

  it('returns a storage when a valid class is passed in ', () => {
    expect(buildStorage_(CookiesStorage, {}, null))
        .toBeInstanceOf(CookiesStorage);
  });

  describe('the storage constructor', () => {
    let helper;
    let measure;
    beforeEach(() => {
      const dataLayer = [];
      helper = new DataLayerHelper(dataLayer);
      measure = function() {
        dataLayer.push(arguments);
      };
    });

    it('has the empty object as a parameter if helper and params are empty',
        () => {
          buildStorage_(MockStorage, {}, helper);
          expect(storageConstructor).toHaveBeenCalledWith({});
        });

    it('overwrites parameters from constructor parameters', () => {
      buildStorage_(MockStorage, {a: 1, b: 2}, helper);
      expect(storageConstructor).toHaveBeenCalledWith({a: 1, b: 2});
    });

    it('overwrites parameters from the given helper parameters', () => {
      measure('set', 'storage', {a: {a: 1}});
      measure('set', 'storage', {b: 2});
      buildStorage_(MockStorage, {}, helper);
      expect(storageConstructor).toHaveBeenCalledWith({a: {a: 1}, b: 2});
    });

    it('overwrites both constructor and helper parameters', () => {
      measure('set', 'storage', {a: {a: 1}});
      buildStorage_(MockStorage, {b: 2}, helper);
      expect(storageConstructor).toHaveBeenCalledWith({a: {a: 1}, b: 2});
    });

    it('overwrites constructor parameters over helper parameters', () => {
      measure('set', 'storage', {a: 2});
      buildStorage_(MockStorage, {a: 1}, helper);
      expect(storageConstructor).toHaveBeenCalledWith({a: 1});
    });

    // This behavior may be changed in the future to be a deep copy.
    it('overwrites constructor parameters over helper parameters using a ' +
        'shallow copy', () => {
      measure('set', 'storage', {a: {b: 1}});
      buildStorage_(MockStorage, {a: {a: 1}}, helper);
      expect(storageConstructor).toHaveBeenCalledWith({a: {a: 1}});
    });
  });
});

