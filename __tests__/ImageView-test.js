import React from 'react';
import ImageView from '../imageview';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
const ReactNativeLogo = 'https://reactnative.dev/docs/assets/favicon.png';

test('renders imageview with uri source', () => {
  const wrapper = shallow(<ImageView source={ReactNativeLogo} />);
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders imageview with number source', () => {
  const errorImage = require('../assets/error.png');
  const wrapper = shallow(<ImageView source={errorImage} />);
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders imageview without source', () => {
  const wrapper = shallow(<ImageView source={null} />);
  const tree = toJson(wrapper);
  expect(tree).toEqual('');
});
test('renders imageview with style and source', () => {
  const wrapper = shallow(
    <ImageView style={{width: 44, height: 44}} source={ReactNativeLogo} />,
  );
  const tree = toJson(wrapper);
  expect(tree.props.style).toBeDefined();
});
test('renders imageview to have width and height without it defined in style', () => {
  const wrapper = shallow(
    <ImageView style={{flex: 1}} source={ReactNativeLogo} />,
  );
  const tree = toJson(wrapper);
  expect(tree.props.style.width).toBe(36);
  expect(tree.props.style.height).toBe(36);
});
