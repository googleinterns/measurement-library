goog.module('measurementLibrary.testing.eventProcessor.generateUniqueId');
goog.setTestOnly();

const {generateUniqueId} = goog.require('measurementLibrary.eventProcessor.generateUniqueId');

describe('The `generateUniqueId` method', () => {
  const secondsSinceEpoch = 1234567890;
  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(secondsSinceEpoch * 1000));
  });

  const uniqueIdFormat =
      /^\d{1,10}.1234567890$/;

  it('generates unique ID in correct format using Crypto API', () => {
    for (let i = 0; i < 10; ++i) {
      const uid = generateUniqueId();
      const match = uniqueIdFormat.exec(uid);

      expect(match).toBeTruthy();
    }
  });

  it('generates unique ID in correct format using ' +
      '`Math.random` and `Date.getTime`', () => {
    for (let i = 0; i < 10; ++i) {
      const uid = generateUniqueId(null);
      const match = uniqueIdFormat.exec(uid);

      expect(match).toBeTruthy();
    }
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });
});
