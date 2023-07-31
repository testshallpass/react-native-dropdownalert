import Queue from '../Queue';

test('Queue', () => {
  const queue = new Queue();
  expect(queue).toBeDefined();
  expect(queue.size).toEqual(0);
  expect(queue.first).toBeUndefined();
  expect(queue.isEmpty).toBeTruthy();

  // add to queue
  const item = {};
  queue.enqueue(item);
  expect(queue.size).toEqual(1);
  expect(queue.first).toEqual(item);
  expect(queue.isEmpty).toBeFalsy();

  // remove from queue
  const last = queue.dequeue();
  expect(last).toEqual(item);
  expect(queue.size).toEqual(0);
  expect(queue.first).toBeUndefined();
  expect(queue.isEmpty).toBeTruthy();
});
