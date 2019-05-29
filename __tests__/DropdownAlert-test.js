import reactNative from 'react-native';
import React from 'react';
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
  expect(wrapper.instance().alertData.type).toBe('info');
  expect(wrapper.instance().alertData.title).toBe('hello');
  expect(wrapper.instance().alertData.message).toBe('world');
  expect(wrapper.instance().state.isOpen).toBeTruthy();
  expect(wrapper.instance().state.topValue).toBe(0);
  expect(wrapper.instance()._closeTimeoutId).toBeDefined();
});
test('expect unknown alert type to be open', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.instance().alertWithType('random', 'hello', 'world');
  expect(wrapper.instance().state.isOpen).toBeTruthy();
});
test('expect non string title and message to converted to string', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.instance().alertWithType('error', { title: 'hello' }, { message: 'world' });
  expect(typeof wrapper.instance().alertData.title === 'string').toBeTruthy();
  expect(typeof wrapper.instance().alertData.message === 'string').toBeTruthy();
});
test('expect close with programmatic action to set isOpen to be false', () => {
  const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
  wrapper.setState({ isOpen: true });
  wrapper.instance().closeAction('programmatic', () => {
    expect(wrapper.instance().state.isOpen).toBeFalsy();
    expect(wrapper.instance().state.topValue).toBe(0);
  });
});
