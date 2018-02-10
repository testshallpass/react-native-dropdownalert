import { validateType } from '../functions';

test('0 length to be false', () => {
  expect(validateType('')).toBeFalsy();
});
// test('null to be false', () => {
//     expect(validateType(null)).toBeFalsy();
// });
// test('undefined to be false', () => {
//     expect(validateType(undefined)).toBeFalsy();
// });
test('info type to be true', () => {
  expect(validateType('info')).toBeTruthy();
});
test('warn type to be true', () => {
  expect(validateType('warn')).toBeTruthy();
});
test('success type to be true', () => {
  expect(validateType('success')).toBeTruthy();
});
test('error type to true', () => {
  expect(validateType('error')).toBeTruthy();
});
test('custom type to be true', () => {
  expect(validateType('custom')).toBeTruthy();
});
test('random type to be false', () => {
  expect(validateType('random')).toBeFalsy();
});
