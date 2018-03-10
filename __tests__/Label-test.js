import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Label from '../label';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

test('renders label with text', () => {
  const wrapper = shallow(<Label text={'Hello World'} />);
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders label without text', () => {
  const wrapper = shallow(<Label text={''} />);
  const tree = toJson(wrapper);
  expect(tree).toEqual("");
});
