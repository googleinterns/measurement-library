/**
 * @fileoverview This file declares functions that can be declared by external
 * third party code. Closure compiler advanced optimizations needs this file
 * to know not to minimize these function names.
 * @externs
 */

function shouldPersist(storageInterface, key, value) {}
function processEvent(storageInterface, helperInterface, name, args) {}

function set(key, value) {}
function get(key, value) {}
