
class Path {
  constructor(path) {
    this.path = path || [];
  }
  move() {
    return this;
  }
  moveTo() {
    return this;
  }
  line() {
    return this;
  }
  close() {
    return this;
  }
  toJSON() {
    return JSON.stringify(this.path);
  }
}

module.exports = Path;
