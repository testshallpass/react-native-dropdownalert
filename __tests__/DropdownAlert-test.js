import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import DropdownAlert from '../DropdownAlert';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

test('renders info alert correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={'https://facebook.github.io/react/img/logo_og.png'} />);
  wrapper.setState({isOpen: true, type: 'info', title: 'Hello', message: 'World!'});
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders warn alert correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={'https://facebook.github.io/react/img/logo_og.png'} />);
  wrapper.setState({isOpen: true, type: 'warn', title: 'Hello', message: 'World!'});
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders error alert correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={'https://facebook.github.io/react/img/logo_og.png'} />);
  wrapper.setState({isOpen: true, type: 'error', title: 'Hello', message: 'World!'});
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders success alert correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={'https://facebook.github.io/react/img/logo_og.png'} />);
  wrapper.setState({isOpen: true, type: 'success', title: 'Hello', message: 'World!'});
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders custom alert correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={'https://facebook.github.io/react/img/logo_og.png'} />);
  wrapper.setState({isOpen: true, type: 'custom', title: 'Hello', message: 'World!'});
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders custom alert with cancel correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={'https://facebook.github.io/react/img/logo_og.png'} showCancel={true} />);
  wrapper.setState({isOpen: true, type: 'custom', title: 'Hello', message: 'World!'});
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
