import reactNative from 'react-native';
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
test('expect state variables to change with replace disabled', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} replaceEnabled={false} closeInterval={4000} />);
  wrapper.instance().isOpen = false;
  wrapper.instance()._closeTimeoutId = setTimeout(function() {});
  wrapper.update();
  wrapper.instance().alertWithType('info', 'hello', 'world');
  expect(wrapper.instance().state.type).toBe('info');
  expect(wrapper.instance().state.title).toBe('hello');
  expect(wrapper.instance().state.message).toBe('world');
  expect(wrapper.instance().state.isOpen).toBeTruthy();
  expect(wrapper.instance().state.topValue).toBe(0);
  expect(wrapper.instance()._closeTimeoutId).toBeDefined();
  expect(wrapper.instance().state.animationValue).toEqual(new reactNative.Animated.Value(0));
});
test('expect invalid type with state isOpen to be false', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.instance().alertWithType('random', 'hello', 'world');
  expect(wrapper.instance().state.isOpen).toBeFalsy();
});
test('expect non string title and message to converted to string', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.instance().alertWithType('error', {title: 'hello'}, {message: 'world'});
  console.log(wrapper.instance().state.title);
  expect(typeof wrapper.instance().state.title === 'string').toBeTruthy();
  expect(typeof wrapper.instance().state.message === 'string').toBeTruthy();
});
test('expect close without action to be animation value 0', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.setState({isOpen: true});
  wrapper.instance().close();
  expect(wrapper.instance().state.isOpen).toBeTruthy();
});
test('expect close with action to be animation value 0', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.instance().close('cancel');
  expect(wrapper.instance().state.animationValue).toEqual(new reactNative.Animated.Value(0));
});
test('expect close directly to set isOpen false', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.setState({isOpen: true});
  wrapper.instance()._closeTimeoutId = setTimeout(function() {});
  wrapper.update();
  wrapper.instance().closeDirectly();
  expect(wrapper.instance().state.isOpen).toBeFalsy();
  expect(wrapper.instance()._closeTimeoutId).toBeDefined();
});