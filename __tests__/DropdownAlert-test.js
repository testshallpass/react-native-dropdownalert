import reactNative from 'react-native';
import React from 'react';
import DropdownAlert from '../DropdownAlert';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
const imageSrc = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
import { TYPE, ACTION, HEIGHT } from '../constants';

describe('DropdownAlert component', () => {
  describe('Snapshots', () => {
    test('expect to render', () => {
      const wrapper = shallow(<DropdownAlert />);
      wrapper.setState({ isOpen: true });
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
    });
  });
  describe('AlertWithType', () => {
    test('expect unknown alert type to be open', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().alertWithType('random', 'hello', 'world');
      expect(wrapper.instance().state.isOpen).toBeTruthy();
    });
    test('expect error alert type to be open with prop render functions', () => {
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} showCancel={true} renderTitle={() => {}} renderMessage={() => {}} renderCancel={() => {}} renderImage={() => {}} />
      );
      wrapper.instance().alertWithType('error', 'hello', 'world');
      expect(wrapper.instance().state.isOpen).toBeTruthy();
    });
    test('expect alert type custom and show cancel render', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} showCancel={true} />);
      wrapper.instance().isOpen = false;
      wrapper.instance()._closeTimeoutId = setTimeout(function() {});
      wrapper.update();
      const type = TYPE.custom;
      const message = 'Aliquip nostrud minim pariatur ullamco labore cillum.';
      wrapper.instance().alertWithType(type, type, message);
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(type);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().state.isOpen).toBeTruthy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance()._closeTimeoutId).toBeDefined();
    });
    test('expect state variables to change with replace disabled', () => {
      const closeInterval = 4000;
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} replaceEnabled={false} closeInterval={closeInterval} />);
      wrapper.instance().isOpen = false;
      wrapper.instance()._closeTimeoutId = setTimeout(function() {});
      wrapper.update();
      const type = TYPE.info;
      const title = 'Laborum reprehenderit aute sit sunt labore velit consectetur cillum id dolore tempor mollit commodo.';
      const message = 'Aliquip excepteur dolore ipsum exercitation cupidatat incididunt in.';
      wrapper.instance().alertWithType(type, title, message);
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(title);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().alertData.interval).toBe(closeInterval);
      expect(wrapper.instance().state.isOpen).toBeTruthy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance()._closeTimeoutId).toBeDefined();
    });
    test('expect closeInterval to be overridden', () => {
      const closeInterval = 4000;
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} closeInterval={closeInterval} />);
      wrapper.instance().isOpen = false;
      wrapper.instance()._closeTimeoutId = setTimeout(function() {});
      wrapper.update();
      const type = TYPE.info;
      const title = 'Laborum reprehenderit aute sit sunt labore velit consectetur cillum id dolore tempor mollit commodo.';
      const message = 'Aliquip excepteur dolore ipsum exercitation cupidatat incididunt in.';
      wrapper.instance().alertWithType(type, title, message, {}, 1000);
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(title);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().alertData.interval).toBe(1000);
      expect(wrapper.instance().state.isOpen).toBeTruthy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance()._closeTimeoutId).toBeDefined();
    });
    test('expect animation lock to block alert', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().isOpen = false;
      wrapper.instance()._closeTimeoutId = setTimeout(function() {});
      wrapper.instance().animationLock = true;
      wrapper.update();
      const type = TYPE.success;
      const title = 'Laborum reprehenderit aute sit sunt labore velit consectetur cillum id dolore tempor mollit commodo.';
      const message = 'Aliquip excepteur dolore ipsum exercitation cupidatat incididunt in.';
      wrapper.instance().alertWithType(type, title, message, {}, 1000);
      expect(wrapper.instance().alertData.type).toBe('');
      expect(wrapper.instance().alertData.title).toBe('');
      expect(wrapper.instance().alertData.message).toBe('');
      expect(wrapper.instance().alertData.payload).toEqual({});
      expect(wrapper.instance().alertData.interval).toBe(4000);
      expect(wrapper.instance().animationLock).toBeTruthy();
      expect(wrapper.instance().state.isOpen).toBeFalsy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance()._closeTimeoutId).toBeDefined();
    });
    test('expect non string title and message to converted to string', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().alertWithType('error', { title: 'hello' }, { message: 'world' });
      expect(typeof wrapper.instance().alertData.title === 'string').toBeTruthy();
      expect(typeof wrapper.instance().alertData.message === 'string').toBeTruthy();
    });
  });
  describe('getStartDelta', () => {
    test('expect to return start value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const height = 144;
      const start = 200;
      const startDelta = wrapper.instance().getStartDelta(height, start);
      expect(startDelta).toEqual(start);
    });
    test('expect to return start min value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const height = 144;
      const start = -200;
      const startDelta = wrapper.instance().getStartDelta(height, start);
      const min = 0 - height;
      expect(startDelta).toEqual(min);
    });
    test('expect to return start max value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const height = 144;
      const start = HEIGHT + height + 1;
      const startDelta = wrapper.instance().getStartDelta(height, start);
      const max = HEIGHT + height;
      expect(startDelta).toEqual(max);
    });
  });
  describe('getEndDelta', () => {
    test('expect to return end value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const height = 144;
      const end = 200;
      const endDelta = wrapper.instance().getEndDelta(height, end);
      expect(endDelta).toEqual(end);
    });
    test('expect to return end min value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const height = 144;
      const end = -200;
      const endDelta = wrapper.instance().getEndDelta(height, end);
      const min = 0;
      expect(endDelta).toEqual(min);
    });
    test('expect to return end max value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const height = 144;
      const end = HEIGHT;
      const endDelta = wrapper.instance().getEndDelta(height, end);
      const max = end - height;
      expect(endDelta).toEqual(max);
    });
  });
  describe('getOutputRange', () => {
    test('expect to be [height, end] with height less than zero', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const start = -100;
      const end = 0;
      const height = -144;
      const outputRange = wrapper.instance().getOutputRange(144, start, end);
      expect(outputRange).toEqual([height, end]);
    });
    test('expect to be [start, end] with undefined height', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const start = -100;
      const end = 0;
      const outputRange = wrapper.instance().getOutputRange(undefined, start, end);
      expect(outputRange).toEqual([start, end]);
    });
  });
  describe('getBackgroundColorForType', () => {
    test('expect infoColor to be blue', () => {
      const blue = 'blue';
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} infoColor={blue} />);
      const backgroundColor = wrapper.instance().getBackgroundColorForType(TYPE.info);
      expect(backgroundColor).toEqual(blue);
    });
    test('expect errorColor to be red', () => {
      const red = 'red';
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} errorColor={red} />);
      const backgroundColor = wrapper.instance().getBackgroundColorForType(TYPE.error);
      expect(backgroundColor).toEqual(red);
    });
    test('expect successColor to be green', () => {
      const green = 'green';
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} successColor={green} />);
      const backgroundColor = wrapper.instance().getBackgroundColorForType(TYPE.success);
      expect(backgroundColor).toEqual(green);
    });
    test('expect warnColor to be yellow', () => {
      const yellow = 'yellow';
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} warnColor={yellow} />);
      const backgroundColor = wrapper.instance().getBackgroundColorForType(TYPE.warn);
      expect(backgroundColor).toEqual(yellow);
    });
    test('expect unknown type to be black', () => {
      const black = 'black';
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} containerStyle={{ backgroundColor: black }} />);
      const backgroundColor = wrapper.instance().getBackgroundColorForType('unknown');
      expect(backgroundColor).toEqual('black');
    });
  });
  describe('closeAction', () => {
    test('expect close with programmatic action to set isOpen to be false', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.setState({ isOpen: true });
      wrapper.instance().closeAction(ACTION.programmatic, () => {
        expect(wrapper.instance().state.isOpen).toBeFalsy();
        expect(wrapper.instance().state.topValue).toBe(0);
      });
    });
    test('expect close with cancel action to set isOpen to be false', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.setState({ isOpen: true });
      wrapper.instance().closeAction(ACTION.cancel, () => {
        expect(wrapper.instance().state.isOpen).toBeFalsy();
        expect(wrapper.instance().state.topValue).toBe(0);
      });
    });
  });
  describe('_onLayoutEvent', () => {
    test('expect event with height to equal that height', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().height = 100;
      wrapper.update();
      const event = { nativeEvent: { layout: { height: 144 } } };
      wrapper.instance()._onLayoutEvent(event);
      expect(wrapper.instance().state.height).toEqual(event.nativeEvent.layout.height);
    });
    test('expect event with height to equal 0', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().height = 100;
      wrapper.update();
      const event = { nativeEvent: { layout: { height: 100 } } };
      wrapper.instance()._onLayoutEvent(event);
      expect(wrapper.instance().state.height).toEqual(0);
    });
    test('expect event with negative height to equal 0', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const event = { nativeEvent: { layout: { height: -1 } } };
      wrapper.instance()._onLayoutEvent(event);
      expect(wrapper.instance().state.height).toEqual(0);
    });
  });
  describe('getStyleForType', () => {
    test('expect unknown type style to be array with default and background black', () => {
      const style = [{ flexDirection: 'row', padding: 8 }, { backgroundColor: 'black' }];
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} containerStyle={{ backgroundColor: 'black' }} />);
      const styleForType = wrapper.instance().getStyleForType('unknown');
      expect(styleForType).toEqual(style);
    });
    test('expect info type style to be array with default and background blue', () => {
      const style = [{ flexDirection: 'row', padding: 8 }, { backgroundColor: 'blue' }];
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} infoColor={'blue'} />);
      const styleForType = wrapper.instance().getStyleForType(TYPE.info);
      expect(styleForType).toEqual(style);
    });
    test('expect warn type style to be array with default and background yellow', () => {
      const style = [{ flexDirection: 'row', padding: 8 }, { backgroundColor: 'yellow' }];
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} warnColor={'yellow'} />);
      const styleForType = wrapper.instance().getStyleForType(TYPE.warn);
      expect(styleForType).toEqual(style);
    });
    test('expect success type style to be array with default and background green', () => {
      const style = [{ flexDirection: 'row', padding: 8 }, { backgroundColor: 'green' }];
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} successColor={'green'} />);
      const styleForType = wrapper.instance().getStyleForType(TYPE.success);
      expect(styleForType).toEqual(style);
    });
  });
  describe('getSourceForType', () => {
    test('expect warn type source to be imageSrc', () => {
      const wrapper = shallow(<DropdownAlert warnImageSrc={imageSrc} />);
      const sourceForType = wrapper.instance().getSourceForType(TYPE.warn);
      expect(sourceForType).toEqual(imageSrc);
    });
    test('expect success type source to be imageSrc', () => {
      const wrapper = shallow(<DropdownAlert successImageSrc={imageSrc} />);
      const sourceForType = wrapper.instance().getSourceForType(TYPE.success);
      expect(sourceForType).toEqual(imageSrc);
    });
  });
  describe('closeAutomatic', () => {
    test('expect isOpen to be false', () => {
      const wrapper = shallow(<DropdownAlert successImageSrc={imageSrc} />);
      wrapper.instance().closeAutomatic(1);
      expect(wrapper.instance().state.isOpen).toBeFalsy();
    });
  });
  describe('componentWillUnmount', () => {
    test('expect isOpen to be false', () => {
      const wrapper = shallow(<DropdownAlert successImageSrc={imageSrc} zIndex={999} />);
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().state.isOpen).toBeFalsy();
    });
  });
});
