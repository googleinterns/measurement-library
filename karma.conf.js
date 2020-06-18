/* Karma configuration, field descriptions can be found at
 * http://karma-runner.github.io/2.0/config/configuration-file.html
 */
module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],

    // automatically run tests for files matching these regex
    files: [
      'spec/*.spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('karma-jasmine-html-reporter')
    ],

    reporters: ['spec','kjhtml'],
    colors: true,
    logLevel: config.LOG_DISABLE,
    // run tests when a file changes
    autoWatch: true,
    browsers: ['Chrome'],
    client: {
      clearContext: false
    },
    // if you close the browser, it will not pop up again
    retryLimit: 0,
  })
}
