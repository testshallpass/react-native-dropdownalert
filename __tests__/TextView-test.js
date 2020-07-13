import React from 'react';
import TextView from '../TextView';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

test('renders TextView with text', () => {
  const wrapper = shallow(<TextView text={'Hello World'} />);
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders TextView without text', () => {
  const wrapper = shallow(<TextView text={''} />);
  const tree = toJson(wrapper);
  expect(tree).toEqual('');
});
