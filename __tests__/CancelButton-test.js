import 'react-native';
import React from 'react';
import CancelButton from '../CancelButton';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

test('CancelButton renders', () => {
  const wrapper = shallow(<CancelButton />);
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});