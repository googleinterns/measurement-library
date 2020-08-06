goog.module('measurementLibrary.eventProcessor.testing.uuidv4');
goog.setTestOnly();

const {generateUniqueId} = goog.require('measurementLibrary.eventProcessor.uuidv4');

describe('The `uuidv4` method', () => {
  const validUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

  it('generates valid UUID using Crypto API', () => {
    for (let i = 0; i < 10; ++i) {
      const uuid = generateUniqueId();
      const match = validUUID.exec(uuid);

      expect(match[0]).toBe(uuid);
    }
  });

  it('generates valid UUID using `Math.random` and `Date.getTime`', () => {
    for (let i = 0; i < 10; ++i) {
      const uuid = generateUniqueId(null);
      const match = validUUID.exec(uuid);

      expect(match[0]).toBe(uuid);
    }
  });
});
