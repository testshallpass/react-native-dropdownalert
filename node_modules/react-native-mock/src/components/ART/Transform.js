
class Transform {
  constructor() {
    this.xx = 0;
    this.yx = 0;
    this.xy = 0;
    this.yy = 0;
    this.x = 0;
    this.y = 0;
  }
  transformTo() {
    return this;
  }
  move() {
    return this;
  }
  rotate() {
    return this;
  }
  scale() {
    return this;
  }
  transform() {
    return this;
  }
}

module.exports = Transform;
