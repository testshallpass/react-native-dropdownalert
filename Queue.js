export default class Queue {
  constructor() {
    this.data = [];
  }
  get firstItem() {
    if (!this.isEmpty) {
      return this.data[0];
    }
    return null;
  }
  get size() {
    return this.data.length;
  }
  get isEmpty() {
    return this.size === 0;
  }
  enqueue(item) {
    this.data.push(item);
  }
  dequeue() {
    if (!this.isEmpty) {
      this.data.shift();
    }
  }
  clear() {
    this.data = [];
  }
}
