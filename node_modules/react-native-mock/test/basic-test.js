import React from '../src/react-native';
import { expect } from 'chai';

describe('Requires', () => {
  it('requires', () => {
    console.log(Object.keys(React)); // eslint-disable-line no-console
    expect(true).to.equal(true);
  });
});
