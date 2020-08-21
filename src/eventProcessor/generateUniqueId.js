goog.module('measurementLibrary.eventProcessor.generateUniqueId');

/**
 * Returns a cryptographically secure random number generator if
 * available.
 * @return {function(!Uint32Array):!Uint32Array|undefined}
 */
function getCryptoRandomValues() {
  let getRandomValues;
  if (window.crypto) {
    getRandomValues = window.crypto.getRandomValues.bind(crypto);
  } else if (window.msCrypto) {
    getRandomValues = window.msCrypto.getRandomValues
        .bind(window.msCrypto); // IE11
  }
  return getRandomValues;
}

/**
 * Generates a unique ID in the format [uint32].[timestamp]
 * @param {(function(!Uint32Array):!Uint32Array|null)=} randomNumberGenerator
 * @return {string}
 */
function generateUniqueId(randomNumberGenerator = getCryptoRandomValues()) {
  let uint32;
  if (randomNumberGenerator) {
    uint32 = randomNumberGenerator(new Uint32Array(1))[0];
  } else {
    uint32 = (Math.random() * (0xFFFFFFFF)) >>> 0;
  }
  const timestamp = Math.floor(new Date().getTime() / 1000);
  return `${uint32}.${timestamp}`;
}

exports = {
  generateUniqueId,
};
