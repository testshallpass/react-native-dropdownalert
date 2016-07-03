/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNoop
 * 
 */

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */

'use strict';

var ReactFiberReconciler = require('./ReactFiberReconciler');

var scheduledHighPriCallback = null;
var scheduledLowPriCallback = null;

var NoopRenderer = ReactFiberReconciler({
  createHostInstance: function () {},
  scheduleHighPriCallback: function (callback) {
    scheduledHighPriCallback = callback;
  },
  scheduleLowPriCallback: function (callback) {
    scheduledLowPriCallback = callback;
  }
});

var ReactNoop = {
  render: function (element) {

    NoopRenderer.mountNewRoot(element);
  },
  flushHighPri: function () {
    var cb = scheduledHighPriCallback;
    if (cb === null) {
      return;
    }
    scheduledHighPriCallback = null;
    cb();
  },
  flushLowPri: function () {
    var timeout = arguments.length <= 0 || arguments[0] === undefined ? Infinity : arguments[0];

    var cb = scheduledLowPriCallback;
    if (cb === null) {
      return;
    }
    scheduledLowPriCallback = null;
    var timeRemaining = timeout;
    cb({
      timeRemaining: function () {
        // Simulate a fix amount of time progressing between each call.
        timeRemaining -= 5;
        if (timeRemaining < 0) {
          timeRemaining = 0;
        }
        return timeRemaining;
      }
    });
  },
  flush: function () {
    ReactNoop.flushHighPri();
    ReactNoop.flushLowPri();
  }
};

module.exports = ReactNoop;