goog.module('measurementLibrary.eventProcessor.generateUniqueId');

// Check to see if Crypto API can be used
let getRandomValues;
if (window.crypto) {
  getRandomValues = window.crypto.getRandomValues.bind(crypto);
} else if (window.msCrypto) {
  getRandomValues = window.msCrypto.getRandomValues
      .bind(window.msCrypto); // IE11
}

/**
 * Generates a unique ID in the format [uint32].[timestamp]
 * @param {(function(!Uint32Array):!Uint32Array)=} randomValueGenerator
 * @return {string}
 */
function generateUniqueId(randomValueGenerator = getRandomValues) {
  let uint32;
  if (randomValueGenerator) {
    uint32 = getRandomValues(new Uint32Array(1))[0];
  } else {
    uint32 = (Math.random() * (0xFFFFFFFF)) >>> 0;
  }
  const timestamp = Math.floor(new Date().getTime() / 1000);
  return `${uint32}.${timestamp}`;
}

exports = {
  generateUniqueId,
};
