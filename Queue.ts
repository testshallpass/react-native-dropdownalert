import {DropdownAlertData} from './DropdownAlert';

export default class Queue {
  #array: DropdownAlertData[];

  constructor() {
    this.#array = [];
  }

  get first() {
    return this.#array[0];
  }
  get size() {
    return this.#array.length;
  }
  get isEmpty() {
    return this.size === 0;
  }

  enqueue(data: DropdownAlertData) {
    this.#array.push(data);
  }
  dequeue() {
    return this.#array.shift();
  }
}
