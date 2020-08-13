goog.module('measurementLibrary.storage.CookiesStorage.testing.findAutoDomain_');
goog.setTestOnly();

const CookiesStorage = goog.require('measurementLibrary.storage.CookiesStorage');

// These tests replicate the meaningful examples from this
// table: https://url.spec.whatwg.org/#host-registrable-domain
// Some examples in the table are not able to be tested because
// these tests do not use a real javascript document object.
describe('The findAutoDomain method', () => {
  let testDocument;
  let setupDocument;
  const storage = new CookiesStorage({});

  beforeEach(() => {
    // sets up testDocument, an object that acts like the window.document object
    // when dealing with cookies with a specified domain. Allows for testing on
    // multiple domains.
    setupDocument = (domain, registrableDomain) => {
      testDocument = {'cook': ''};
      testDocument['domain'] = domain;
      Object.defineProperty(testDocument, 'cookie', {
        get() {
          return testDocument.cook;
        },
        set(newValue) {
          if (newValue.includes(`domain=${registrableDomain}`)) {
            testDocument.cook = newValue;
          }
        },
        configurable: true,
      });
    };
  });

  it('returns null when domain is a public suffix', () => {
    setupDocument('com');

    expect(storage.findAutoDomain_(testDocument)).toBe(null);
  });

  it('returns null when domain does not contain a public suffix', () => {
    setupDocument('[2001:0db8:85a3:0000:0000:8a2e:0370:7334]');

    expect(storage.findAutoDomain_(testDocument)).toBe(null);
  });

  it('returns registrableDomain when domain is a valid subdomain', () => {
    setupDocument('example.com', 'example.com');

    expect(storage.findAutoDomain_(testDocument)).toBe('example.com');
    
    setupDocument('www.example.com', 'example.com');

    expect(storage.findAutoDomain_(testDocument)).toBe('example.com');

    setupDocument('sub.www.example.com', 'example.com');

    expect(storage.findAutoDomain_(testDocument)).toBe('example.com');
  });
});
