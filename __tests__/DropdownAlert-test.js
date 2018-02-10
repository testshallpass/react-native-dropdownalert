import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import DropdownAlert from '../DropdownAlert';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
const imageSrc = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

test('renders info alert correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.setState({ isOpen: true, type: 'info', title: 'Hello', message: 'World!' });
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders warn alert correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.setState({ isOpen: true, type: 'warn', title: 'Hello', message: 'World!' });
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders error alert correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.setState({ isOpen: true, type: 'error', title: 'Hello', message: 'World!' });
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders success alert correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.setState({ isOpen: true, type: 'success', title: 'Hello', message: 'World!' });
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders custom alert correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.setState({ isOpen: true, type: 'custom', title: 'Hello', message: 'World!' });
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders custom alert with cancel correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} showCancel={true} />);
  wrapper.setState({ isOpen: true, type: 'custom', title: 'Hello', message: 'World!' });
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
test('renders alert with zIndex correctly', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} zIndex={99} />);
  wrapper.setState({ isOpen: true, type: 'info', title: 'Hello', message: 'World!' });
  const tree = toJson(wrapper);
  expect(tree).toMatchSnapshot();
});
