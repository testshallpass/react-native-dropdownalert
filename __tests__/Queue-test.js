import Queue from '../Queue';

describe('Queue', () => {
  const queue = new Queue();
  test('constructor', () => {
    expect(queue).toBeDefined();
  });
  test('firstItem to null', () => {
    expect(queue.firstItem).toEqual(null);
  });
  test('size to be 0', () => {
    expect(queue.size).toEqual(0);
  });
  test('isEmpty to be true', () => {
    expect(queue.isEmpty).toBeTruthy();
  });
  test('enqueue to increase size and queue is not empty', () => {
    queue.enqueue({});
    expect(queue.size).toEqual(1);
    expect(queue.isEmpty).toBeFalsy();
  });
  test('dequeue to decrease size and queue is empty', () => {
    queue.dequeue();
    expect(queue.size).toEqual(0);
    expect(queue.isEmpty).toBeTruthy();
  });
  test('clear queue', () => {
    queue.enqueue({});
    expect(queue.size).toEqual(1);
    expect(queue.isEmpty).toBeFalsy();
    queue.clear();
    expect(queue.size).toEqual(0);
    expect(queue.isEmpty).toBeTruthy();
  });
});
