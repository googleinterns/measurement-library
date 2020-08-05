goog.module('measurementLibrary.eventProcessor.uuidv4');

// Check to see if Crypto API can be used
let getRandomValues;
if (window.crypto) {
  getRandomValues = window.crypto.getRandomValues.bind(crypto);
} else if (window.msCrypto) {
  getRandomValues = window.msCrypto.getRandomValues
      .bind(window.msCrypto); // IE11
}

/**
 * Generates an [RFC411 compliant UUID V4](https://www.ietf.org/rfc/rfc4122.txt).
 * Draws heavy inspiration from Jeff Ward's Stack Overflow answer [here](https://stackoverflow.com/a/21963136).
 * @param {boolean=} useMathRandom Override the default beahvior to use
 *     Cryto API if available and instead use `Math.random()`
 * @return {string}
 */
function uuidv4(useMathRandom = false) {
  let uuid = '';
  let timestamp = new Date().getTime();
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  for (let i = 0; i < 36; ++i) {
    const current = template[i];
    if (current === '-' || current === '4') {
      uuid += current;
    } else {
      // Generate a random number between [0-15]
      let random;
      if (getRandomValues && !useMathRandom) {
        random = getRandomValues(new Uint8Array(1))[0] & 15;
      } else {
        random = (timestamp + Math.random() * 16) & 15;
        timestamp = timestamp / 2;
      }
      // Ensure 'y' is replaced with [8,9,a,b] hex char as per the spec
      if (current === 'y') random = random & 0x3 | 0x8;
      // Convert random number to hex digit and add to UUID
      uuid += random.toString(16);
    }
  }
  return uuid;
}

exports = uuidv4;
