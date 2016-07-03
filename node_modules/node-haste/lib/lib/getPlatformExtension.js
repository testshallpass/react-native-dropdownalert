/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

var SUPPORTED_PLATFORM_EXTS = new Set(['android', 'ios', 'web']);

// Extract platform extension: index.ios.js -> ios
function getPlatformExtension(file) {
  var platforms = arguments.length <= 1 || arguments[1] === undefined ? SUPPORTED_PLATFORM_EXTS : arguments[1];

  var last = file.lastIndexOf('.');
  var secondToLast = file.lastIndexOf('.', last - 1);
  if (secondToLast === -1) {
    return null;
  }
  var platform = file.substring(secondToLast + 1, last);
  return platforms.has(platform) ? platform : null;
}

module.exports = getPlatformExtension;