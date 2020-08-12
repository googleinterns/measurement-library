/* Karma configuration, field descriptions can be found at
 * http://karma-runner.github.io/2.0/config/configuration-file.html
 */
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    // Automatically run tests for files matching these regex.
    files: [
      // ----------------- Third Party Dependencies ----------------------------
      // Dependencies must be listed before the file they are used in for
      // the googmodule preprocessor to function properly.
      {pattern: 'node_modules/google-closure-library/closure/goog/base.js'},
      // Listing the files explicitly so they are processed in the right order.
      {pattern: 'data-layer-helper/src/logging.js'},
      {pattern: 'data-layer-helper/src/plain/plain.js'},
      {pattern: 'data-layer-helper/src/helper/utils.js'},
      {pattern: 'data-layer-helper/src/helper/data-layer-helper.js'},
      // ------------------------ Source Files ---------------------------------
      {pattern: 'src/storage/**/*.js'},
      {pattern: 'src/eventProcessor/**/*.js'},
      {pattern: 'src/logging.js'},
      {pattern: 'src/setup.js'},
      {pattern: 'src/main.js'},
      {pattern: 'src/**/*.js'},
      // ------------------------- Test Files ----------------------------------
      'test/unit/**/*_test.js',
    ],
    preprocessors: {'**/*.js': ['googmodule']},
    plugins: [
      require('karma-jasmine'),
      require('karma-detect-browsers'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-ie-launcher'),
      require('karma-safari-launcher'),
      require('karma-spec-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-googmodule-preprocessor'),
    ],
    reporters: ['spec', 'kjhtml'],
    port: 9876,
    colors: true,
    // Run tests when a file changes.
    autoWatch: true,
    browsers: ['Chrome'],
    client: {
      clearContext: false,
    },
    // If you close the browser, it will not pop up again.
    retryLimit: 0,
  });
};
