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
      {pattern: 'node_modules/google-closure-library/closure/goog/base.js'},
      // ------------------------ Source Files ---------------------------------
      // Dependencies must be listed before the file they are used in for
      // the googmodule preprocessor to function properly.
      {pattern: 'src/**/*.js'},
      // ------------------------- Test Files ----------------------------------
      'test/*_test.js'
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
    colors: true,
    logLevel: config.LOG_DISABLE,
    // Run tests when a file changes.
    autoWatch: true,
    browsers: ['Chrome'],
    client: {
      clearContext: false
    },
    // If you close the browser, it will not pop up again.
    retryLimit: 0,
  })
}
