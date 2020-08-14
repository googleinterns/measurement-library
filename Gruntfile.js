/**
 * Copyright 2013 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = function(grunt) {
  const closurePackage = require('google-closure-compiler');
  closurePackage.grunt(grunt);

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'closure-compiler': {
      options: {
        js: [
          'node_modules/google-closure-library/closure/goog/base.js',
          'data-layer-helper/src/**.js',
          'src/**.js',
          '!src/main.js',
          '!src/eventProcessor/EventProcessorInterface.js',
          '!src/storage/StorageInterface.js',
        ],
        externs: [
          'src/eventProcessor/EventProcessorInterface.js',
          'src/storage/StorageInterface.js',
        ],
        hide_warnings_for: 'google-closure-library',
        warning_level: 'VERBOSE',
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        language_in: 'ECMASCRIPT6_STRICT',
        language_out: 'ECMASCRIPT5_STRICT',
        output_wrapper: '(function(){%output%})();',
        jscomp_warning: 'lintChecks',
      },
      distribution: {
        files: {
          'dist/measure.js': 'src/main.js',
        },
        options: {
          create_source_map: 'dist/measure.js.map',
        },
      },
      debug: {
        files: {
          'dist/measure-debug.js': 'src/main.js',
        },
        options: {
          define: 'ML_DEBUG=true',
          create_source_map: 'dist/measure-debug.js.map',
        },
      },
    },
    'karma': {
      options: {
        // Continue after running the tests.
        singleRun: true,
      },
      unit: {
        configFile: 'karma.conf.js',
      },
      integration: {
        configFile: 'test/integration/karma.conf.js',
      },
      unitBrowsers: {
        options: {
          // Run tests on all the browsers on the system.
          frameworks: ['jasmine-ajax', 'jasmine', 'detectBrowsers'],
          detectBrowsers: {
            enabled: true,
            // Don't try to load phantomJS, it may not exist.
            usePhantomJS: false,
          },
          // Travis needs it to run browsers.
          flags: ['--no-sandbox'],
        },
        configFile: 'karma.conf.js',
      },
      integrationBrowsers: {
        options: { // Same options as for unitBrowsers.
          frameworks: ['jasmine-ajax', 'jasmine', 'detectBrowsers'],
          detectBrowsers: {
            enabled: true,
            usePhantomJS: false,
          },
          flags: ['--no-sandbox'],
        },
        configFile: 'test/integration/karma.conf.js',
      },
    },
  });

  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', [
    'closure-compiler',
    'karma:unit',
    'karma:integration',
  ]);

  grunt.registerTask('test', [
    'closure-compiler',
    'karma:unitBrowsers',
    'karma:integrationBrowsers',
  ]);
};
