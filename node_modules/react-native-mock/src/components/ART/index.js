import createMockComponent from '../createMockComponent';
import Transform from './Transform';
import Path from './Path';

const LINEAR_GRADIENT = 1;
const RADIAL_GRADIENT = 2;
const PATTERN = 3;

function CSSBackgroundPattern() {
  // TODO(lmr):
  return {};
}

function Pattern(url, width, height, left, top) {
  this._brush = [PATTERN, url, +left || 0, +top || 0, +width, +height];
}

function LinearGradient(stops, x1, y1, x2, y2) {
  this._brush = [LINEAR_GRADIENT, +x1, +y1, +x2, +y2];
}

function RadialGradient(stops, fx, fy, rx, ry, cx, cy) {
  this._brush = [RADIAL_GRADIENT, +fx, +fy, +rx * 2, +ry * 2, +cx, +cy];
}

const ReactART = {
  LinearGradient,
  RadialGradient,
  Pattern,
  Transform,
  Path,
  Surface: createMockComponent('Surface'),
  Group: createMockComponent('Group'),
  ClippingRectangle: createMockComponent('ClippingRectangle'),
  Shape: createMockComponent('Shape'),
  Text: createMockComponent('Text'),
  CSSBackgroundPattern,
};

module.exports = ReactART;
