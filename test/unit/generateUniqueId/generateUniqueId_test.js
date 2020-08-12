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
      new RegExp(`^\\d{1,10}.${secondsSinceEpoch}$`);

  it('generates unique ID in correct format using Crypto API', () => {
    spyOn(window.crypto, 'getRandomValues').and.callThrough();
    spyOn(Math, 'random').and.callThrough();

    const uid = generateUniqueId();
    const match = uniqueIdFormat.exec(uid);

    expect(match).toBeTruthy();
    expect(window.crypto.getRandomValues).toHaveBeenCalledTimes(1);
    expect(Math.random).toHaveBeenCalledTimes(0);
  });

  it('generates unique ID in correct format using ' +
      '`Math.random` and `Date.getTime`', () => {
    spyOn(window.crypto, 'getRandomValues').and.callThrough();
    spyOn(Math, 'random').and.callThrough();

    const uid = generateUniqueId(null);
    const match = uniqueIdFormat.exec(uid);

    expect(match).toBeTruthy();
    expect(window.crypto.getRandomValues).toHaveBeenCalledTimes(0);
    expect(Math.random).toHaveBeenCalledTimes(1);
  });

  it('generates unique ID in correct format using ' +
  'a custom number generator', () => {
    spyOn(window.crypto, 'getRandomValues').and.callThrough();
    spyOn(Math, 'random').and.callThrough();

    const mockRandomNumber = 987654321;
    const spyRng = jasmine.createSpy('spyRng', (uint32array) => {
      uint32array[0] = mockRandomNumber;
      return uint32array;
    }).and.callThrough();

    const uid = generateUniqueId(spyRng);

    expect(uid).toBe(`${mockRandomNumber}.${secondsSinceEpoch}`);
    expect(window.crypto.getRandomValues).toHaveBeenCalledTimes(0);
    expect(Math.random).toHaveBeenCalledTimes(0);
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });
});
