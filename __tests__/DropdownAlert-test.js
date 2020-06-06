import React from 'react';
import DropdownAlert from '../DropdownAlert';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
const imageSrc =
  'https://facebook.github.io/react-native/docs/assets/favicon.png';
import {TYPE, ACTION, HEIGHT} from '../constants';
import {Platform} from 'react-native';

describe('DropdownAlert component', () => {
  jest.useFakeTimers();
  describe('Snapshots', () => {
    test('expect to render', () => {
      const wrapper = shallow(<DropdownAlert />);
      wrapper.setState({isOpen: true});
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
    });
  });
  describe('componentWillUnmount', () => {
    test('expect to clear timeout id', () => {
      const wrapper = shallow(<DropdownAlert successImageSrc={imageSrc} />);
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().closeTimeoutID).toBeUndefined();
    });
    test('expect to close because it is open', () => {
      const wrapper = shallow(<DropdownAlert successImageSrc={imageSrc} />);
      wrapper.instance().setState({isOpen: true});
      wrapper.update();
      wrapper.instance().componentWillUnmount();
      expect(wrapper.instance().state.isOpen).toBeFalsy();
      expect(wrapper.instance().closeTimeoutID).toBeUndefined();
    });
  });
  describe('getPanResponder', () => {
    test('expect PanResponder to be defined', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const panResponder = wrapper.instance().getPanResponder();
      expect(panResponder).toBeDefined();
    });
  });
  describe('_onShouldStartPan', () => {
    test('expect panResponderEnabled to be true', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const event = {};
      const gestureState = {};
      const value = wrapper.instance()._onShouldStartPan(event, gestureState);
      expect(value).toBeTruthy();
    });
    test('expect panResponderEnabled to be false', () => {
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} panResponderEnabled={false} />,
      );
      const event = {};
      const gestureState = {};
      const value = wrapper.instance()._onShouldStartPan(event, gestureState);
      expect(value).toBeFalsy();
    });
  });
  describe('_onShouldMovePan', () => {
    test('expect should move pan to be true', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const event = {};
      const gestureState = {dx: -19, dy: -20};
      const value = wrapper.instance()._onShouldMovePan(event, gestureState);
      expect(value).toBeTruthy();
    });
    test('expect should move pan to be false with pan responder disabled', () => {
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} panResponderEnabled={false} />,
      );
      const event = {};
      const gestureState = {dx: -19, dy: -20};
      const value = wrapper.instance()._onShouldMovePan(event, gestureState);
      expect(value).toBeFalsy();
    });
    test('expect should move pan to be false with sensitivity as zero', () => {
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} sensitivity={0} />,
      );
      const event = {};
      const gestureState = {dx: -19, dy: -20};
      const value = wrapper.instance()._onShouldMovePan(event, gestureState);
      expect(value).toBeFalsy();
    });
  });
  describe('_onMovePan', () => {
    test('expect state topValue to be dy', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const event = {};
      const gestureState = {dx: -19, dy: -20};
      wrapper.instance()._onMovePan(event, gestureState);
      expect(wrapper.instance().state.topValue).toBe(gestureState.dy);
    });
    test('expect state topValue to be 0', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const event = {};
      const gestureState = {dx: -19, dy: 20};
      wrapper.instance()._onMovePan(event, gestureState);
      expect(wrapper.instance().state.topValue).toBe(0);
    });
  });
  describe('_onDonePan', () => {
    test('expect not to use close action', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const event = {};
      const gestureState = {dx: -19, dy: 20};
      wrapper.instance()._onDonePan(event, gestureState);
    });
    test('expect to use close action', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const event = {};
      const gestureState = {dx: -19, dy: -20};
      wrapper.instance()._onDonePan(event, gestureState);
    });
  });
  describe('getStringValue', () => {
    test('expect to return undefined string value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const expected = 'undefined';
      const value = wrapper.instance().getStringValue(undefined);
      expect(value).toEqual(expected);
      expect(value).toHaveLength(expected.length);
      expect(typeof value == 'string').toBeTruthy();
    });
    test('expect to return null string value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const expected = 'null';
      const value = wrapper.instance().getStringValue(null);
      expect(value).toEqual(expected);
      expect(value).toHaveLength(expected.length);
      expect(typeof value == 'string').toBeTruthy();
    });
    test('expect to return json stringify object string value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const object = {
        message:
          'Tempor cupidatat sit proident in adipisicing fugiat nisi id tempor et labore.',
      };
      const expected = JSON.stringify(object);
      const value = wrapper.instance().getStringValue(object);
      expect(value).toEqual(expected);
      expect(value).toHaveLength(expected.length);
      expect(typeof value == 'string').toBeTruthy();
    });
    test('expect to return string value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const expected = 'Consequat et consequat dolore aliqua ut.';
      const value = wrapper
        .instance()
        .getStringValue('Consequat et consequat dolore aliqua ut.');
      expect(value).toEqual(expected);
      expect(value).toHaveLength(expected.length);
      expect(typeof value == 'string').toBeTruthy();
    });
    test('expect to return number string value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const expected = '1337';
      const value = wrapper.instance().getStringValue(1337);
      expect(value).toEqual(expected);
      expect(value).toHaveLength(expected.length);
      expect(typeof value == 'string').toBeTruthy();
    });
    test('expect to return array string value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const array = [
        'Ullamco nisi tempor ad minim enim ut esse veniam.',
        'Tempor velit et ad aliqua officia reprehenderit adipisicing.',
      ];
      const expected = array.join(' ');
      const value = wrapper.instance().getStringValue(array);
      expect(value).toEqual(expected);
      expect(value).toHaveLength(expected.length);
      expect(typeof value == 'string').toBeTruthy();
    });
    test('expect to return error string value', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const error = TypeError(`Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    --- property 'a' closes the circle`);
      let circularObject = {};
      circularObject.a = circularObject;
      const value = wrapper.instance().getStringValue(circularObject);
      expect(value).toEqual(`TypeError: ${error.message}`);
      expect(typeof value == 'string').toBeTruthy();
    });
  });
  describe('alertWithType', () => {
    test('expect type error to be open state with render function props', () => {
      const wrapper = shallow(
        <DropdownAlert
          imageSrc={imageSrc}
          showCancel={true}
          renderTitle={() => {}}
          renderMessage={() => {}}
          renderCancel={() => {}}
          renderImage={() => {}}
        />,
      );
      wrapper.instance().isOpen = false;
      wrapper.instance().closeTimeoutID = setTimeout(() => {});
      wrapper.update();
      const type = TYPE.error;
      const title = 'Duis duis nostrud excepteur ipsum.';
      const message = 'Occaecat ex veniam enim do tempor laborum.';
      wrapper.instance().alertWithType(type, title, message);
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(title);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().state.isOpen).toBeTruthy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance().closeTimeoutID).toBeDefined();
    });
    test('expect type custom to be open state and have alert data', () => {
      const wrapper = shallow(
        <DropdownAlert
          imageSrc={imageSrc}
          zIndex={1000}
          tapToCloseEnabled={false}
        />,
      );
      wrapper.instance().isOpen = false;
      wrapper.instance().closeTimeoutID = setTimeout(() => {});
      wrapper.update();
      const type = TYPE.custom;
      const title =
        'Lorem fugiat reprehenderit non aute elit Lorem quis sit irure non.';
      const message = 'Aliquip nostrud minim pariatur ullamco labore cillum.';
      wrapper.instance().alertWithType(type, title, message);
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(title);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().state.isOpen).toBeTruthy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance().closeTimeoutID).toBeDefined();
    });
    test('expect type info to be open state and closeInterval prop to be overridden by interval parameter', () => {
      const closeInterval = 4000;
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} closeInterval={closeInterval} />,
      );
      wrapper.instance().isOpen = false;
      wrapper.instance().closeTimeoutID = setTimeout(() => {});
      wrapper.update();
      const type = TYPE.info;
      const title =
        'Laborum reprehenderit aute sit sunt labore velit consectetur cillum id dolore tempor mollit commodo.';
      const message =
        'Aliquip excepteur dolore ipsum exercitation cupidatat incididunt in.';
      wrapper.instance().alertWithType(type, title, message, {}, 1000);
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(title);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().alertData.interval).toBe(1000);
      expect(wrapper.instance().state.isOpen).toBeTruthy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance().closeTimeoutID).toBeDefined();
    });
    test('expect type info to be open state with closeInterval prop as zero', () => {
      const closeInterval = 0;
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} closeInterval={closeInterval} />,
      );
      wrapper.instance().setState({isOpen: true});
      wrapper.instance().closeTimeoutID = setTimeout(() => {});
      wrapper.update();
      const type = TYPE.info;
      const title =
        'Laborum reprehenderit aute sit sunt labore velit consectetur cillum id dolore tempor mollit commodo.';
      const message =
        'Aliquip excepteur dolore ipsum exercitation cupidatat incididunt in.';
      wrapper.instance().alertWithType(type, title, message, {});
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(title);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().alertData.interval).toBe(closeInterval);
      expect(wrapper.instance().state.isOpen).toBeTruthy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance().closeTimeoutID).toBeDefined();
    });
    test('expect type success to be open state and have alert data', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().isOpen = false;
      wrapper.instance().closeTimeoutID = setTimeout(() => {});
      wrapper.update();
      const type = TYPE.success;
      const title =
        'Laborum reprehenderit aute sit sunt labore velit consectetur cillum id dolore tempor mollit commodo.';
      const message =
        'Aliquip excepteur dolore ipsum exercitation cupidatat incididunt in.';
      wrapper.instance().alertWithType(type, title, message, {}, 1000);
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(title);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().alertData.payload).toEqual({});
      expect(wrapper.instance().alertData.interval).toBe(1000);
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance().closeTimeoutID).toBeDefined();
    });
    test('expect type error to have title and message objects converted to data type strings', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const type = TYPE.error;
      const title = {title: 'Laboris occaecat sit tempor sit veniam proident.'};
      const message = {
        message:
          'Qui ut occaecat exercitation adipisicing esse incididunt nostrud aute aute enim adipisicing sunt amet in.',
      };
      wrapper.instance().alertWithType(type, title, message);
      expect(
        typeof wrapper.instance().alertData.title === 'string',
      ).toBeTruthy();
      expect(
        typeof wrapper.instance().alertData.message === 'string',
      ).toBeTruthy();
    });
    test('expect type unknown to be open state and have alert data', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().isOpen = false;
      wrapper.instance().closeTimeoutID = setTimeout(() => {});
      wrapper.update();
      const type = 'unknown';
      const title =
        'Excepteur dolore aute culpa occaecat reprehenderit veniam sint tempor exercitation cillum aliquip id reprehenderit.';
      const message =
        'Et id irure proident ipsum veniam ad magna cillum fugiat.';
      wrapper.instance().alertWithType(type, title, message);
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(title);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().state.isOpen).toBeTruthy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance().closeTimeoutID).toBeDefined();
    });
    test('expect unknown type to be open state and have alert data and close automatic', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().setState({isOpen: true});
      wrapper.instance().closeTimeoutID = setTimeout(() => {});
      wrapper.update();
      const type = 'unknown';
      const title =
        'Excepteur dolore aute culpa occaecat reprehenderit veniam sint tempor exercitation cillum aliquip id reprehenderit.';
      const message =
        'Et id irure proident ipsum veniam ad magna cillum fugiat.';
      wrapper.instance().alertWithType(type, title, message);
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(title);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().state.isOpen).toBeTruthy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance().closeTimeoutID).toBeDefined();
    });
    test('expect unknown type to be open state and have alert data and close action', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().setState({isOpen: true});
      wrapper.instance().closeTimeoutID = setTimeout(() => {});
      wrapper.update();
      const type = 'unknown';
      const title =
        'Excepteur dolore aute culpa occaecat reprehenderit veniam sint tempor exercitation cillum aliquip id reprehenderit.';
      const message =
        'Et id irure proident ipsum veniam ad magna cillum fugiat.';
      wrapper.instance().alertWithType(type, title, message);
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(title);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().state.isOpen).toBeTruthy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance().closeTimeoutID).toBeDefined();
    });
    test('expect error type to be open state and have alert data with payload and source defined', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().setState({isOpen: true});
      wrapper.instance().closeTimeoutID = setTimeout(() => {});
      wrapper.update();
      const type = TYPE.error;
      const title =
        'Excepteur dolore aute culpa occaecat reprehenderit veniam sint tempor exercitation cillum aliquip id reprehenderit.';
      const message =
        'Et id irure proident ipsum veniam ad magna cillum fugiat.';
      const payload = {
        source: imageSrc,
      };
      wrapper.instance().alertWithType(type, title, message, payload);
      expect(wrapper.instance().alertData).toBeDefined();
      expect(wrapper.instance().alertData.type).toBe(type);
      expect(wrapper.instance().alertData.title).toBe(title);
      expect(wrapper.instance().alertData.message).toBe(message);
      expect(wrapper.instance().alertData.payload.source).toBeDefined();
      expect(wrapper.instance().alertData.payload.source).toBe(imageSrc);
      expect(wrapper.instance().alertData.payload).toBe(payload);
      expect(wrapper.instance().state.isOpen).toBeTruthy();
      expect(wrapper.instance().state.topValue).toBe(0);
      expect(wrapper.instance().closeTimeoutID).toBeDefined();
    });
    test('test queue size after multiple calls to alertWithType', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const type = TYPE.error;
      const title =
        'Excepteur dolore aute culpa occaecat reprehenderit veniam sint tempor exercitation cillum aliquip id reprehenderit.';
      const message =
        'Et id irure proident ipsum veniam ad magna cillum fugiat.';
      wrapper.instance().alertWithType(type, title, message);
      wrapper.instance().alertWithType(type, title, message);
      wrapper.instance().alertWithType(type, title, message);
      wrapper.instance().alertWithType(type, title, message);
      expect(wrapper.instance().queue).toBeDefined();
      expect(wrapper.instance().queue.size).toEqual(4);
    });
  });
  describe('clearQueue', () => {
    test('test queue to be empty after clearing it', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const type = TYPE.error;
      const title =
        'Excepteur dolore aute culpa occaecat reprehenderit veniam sint tempor exercitation cillum aliquip id reprehenderit.';
      const message =
        'Et id irure proident ipsum veniam ad magna cillum fugiat.';
      wrapper.instance().alertWithType(type, title, message);
      expect(wrapper.instance().queue).toBeDefined();
      expect(wrapper.instance().queue.size).toEqual(1);
      wrapper.instance().clearQueue();
      expect(wrapper.instance().queue.size).toEqual(0);
    });
  });
  describe('open', () => {
    test('expect open to be okay with no data', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().open();
      expect(wrapper.instance().state.isOpen).toBeTruthy();
    });
  });
  describe('closeAction', () => {
    test('expect close with programmatic action to set isOpen to be false', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.setState({isOpen: true});
      wrapper.instance().closeAction(ACTION.programmatic, () => {
        expect(wrapper.instance().state.isOpen).toBeFalsy();
        expect(wrapper.instance().state.topValue).toBe(0);
      });
    });
    test('expect close with cancel action to set isOpen to be false', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.setState({isOpen: true});
      wrapper.instance().closeAction(ACTION.cancel, () => {
        expect(wrapper.instance().state.isOpen).toBeFalsy();
        expect(wrapper.instance().state.topValue).toBe(0);
      });
    });
    test('expect close without action to be okay', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.setState({isOpen: true});
      wrapper.instance().closeAction();
    });
  });
  describe('closeAutomatic', () => {
    test('expect isOpen to be false', () => {
      const wrapper = shallow(<DropdownAlert successImageSrc={imageSrc} />);
      wrapper.instance().closeAutomatic(1);
      expect(wrapper.instance().state.isOpen).toBeFalsy();
    });
  });
  describe('close', () => {
    test('expect close with onTap', () => {
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} onTap={() => {}} />,
      );
      const type = TYPE.error;
      const title =
        'Excepteur dolore aute culpa occaecat reprehenderit veniam sint tempor exercitation cillum aliquip id reprehenderit.';
      const message =
        'Et id irure proident ipsum veniam ad magna cillum fugiat.';
      wrapper.instance().alertWithType(type, title, message);
      wrapper.instance().close(ACTION.tap, () => {
        expect(wrapper.instance().alertData).toBeDefined();
      });
    });
  });
  describe('updateStatusBar', () => {
    describe('ios', () => {
      test('expect should update status bar to active state', () => {
        const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
        wrapper.instance().updateStatusBar(true, true);
      });
      test('expect should not update status bar', () => {
        const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
        wrapper.instance().updateStatusBar(false, true);
      });
      test('expect without parameters to be okay', () => {
        const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
        wrapper.instance().updateStatusBar();
      });
    });
    describe('android', () => {
      // FIXME: android not being set see contants IS_ANDROID
      Platform.OS = 'android';
      test('expect should update status bar to active state', () => {
        const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
        wrapper.instance().updateStatusBar(true, true);
      });
      test('expect should not update status bar', () => {
        const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
        wrapper.instance().updateStatusBar(false, true);
      });
      test('expect without parameters to be okay', () => {
        const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
        wrapper.instance().updateStatusBar();
      });
    });
  });
  describe('clearCloseTimeoutID', () => {
    test('this.closeTimeoutID to be defined and cleared', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().closeAutomatic(1);
      expect(wrapper.instance().closeTimeoutID).toBeDefined();
      wrapper.instance().clearCloseTimeoutID();
    });
  });
  describe('animate', () => {});
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
      const outputRange = wrapper
        .instance()
        .getOutputRange(undefined, start, end);
      expect(outputRange).toEqual([start, end]);
    });
  });
  describe('getStyleForType', () => {
    test('expect unknown type style to be array with default and background black', () => {
      const style = [
        {flexDirection: 'row', padding: 8},
        {backgroundColor: 'black'},
      ];
      const wrapper = shallow(
        <DropdownAlert
          imageSrc={imageSrc}
          containerStyle={{backgroundColor: 'black'}}
        />,
      );
      const styleForType = wrapper.instance().getStyleForType('unknown');
      expect(styleForType).toEqual(style);
    });
    test('expect info type style to be array with default and background blue', () => {
      const style = [
        {flexDirection: 'row', padding: 8},
        {backgroundColor: 'blue'},
      ];
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} infoColor={'blue'} />,
      );
      const styleForType = wrapper.instance().getStyleForType(TYPE.info);
      expect(styleForType).toEqual(style);
    });
    test('expect warn type style to be array with default and background yellow', () => {
      const style = [
        {flexDirection: 'row', padding: 8},
        {backgroundColor: 'yellow'},
      ];
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} warnColor={'yellow'} />,
      );
      const styleForType = wrapper.instance().getStyleForType(TYPE.warn);
      expect(styleForType).toEqual(style);
    });
    test('expect success type style to be array with default and background green', () => {
      const style = [
        {flexDirection: 'row', padding: 8},
        {backgroundColor: 'green'},
      ];
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} successColor={'green'} />,
      );
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
  describe('getBackgroundColorForType', () => {
    test('expect infoColor to be blue', () => {
      const blue = 'blue';
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} infoColor={blue} />,
      );
      const backgroundColor = wrapper
        .instance()
        .getBackgroundColorForType(TYPE.info);
      expect(backgroundColor).toEqual(blue);
    });
    test('expect errorColor to be red', () => {
      const red = 'red';
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} errorColor={red} />,
      );
      const backgroundColor = wrapper
        .instance()
        .getBackgroundColorForType(TYPE.error);
      expect(backgroundColor).toEqual(red);
    });
    test('expect successColor to be green', () => {
      const green = 'green';
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} successColor={green} />,
      );
      const backgroundColor = wrapper
        .instance()
        .getBackgroundColorForType(TYPE.success);
      expect(backgroundColor).toEqual(green);
    });
    test('expect warnColor to be yellow', () => {
      const yellow = 'yellow';
      const wrapper = shallow(
        <DropdownAlert imageSrc={imageSrc} warnColor={yellow} />,
      );
      const backgroundColor = wrapper
        .instance()
        .getBackgroundColorForType(TYPE.warn);
      expect(backgroundColor).toEqual(yellow);
    });
    test('expect unknown type to be black', () => {
      const black = 'black';
      const wrapper = shallow(
        <DropdownAlert
          imageSrc={imageSrc}
          containerStyle={{backgroundColor: black}}
        />,
      );
      const backgroundColor = wrapper
        .instance()
        .getBackgroundColorForType('unknown');
      expect(backgroundColor).toEqual('black');
    });
  });
  describe('_onLayoutEvent', () => {
    test('expect event with height to equal that height', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().height = 100;
      wrapper.update();
      const event = {nativeEvent: {layout: {height: 144}}};
      wrapper.instance()._onLayoutEvent(event);
      expect(wrapper.instance().state.height).toEqual(
        event.nativeEvent.layout.height,
      );
    });
    test('expect event with height to equal 0', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      wrapper.instance().height = 100;
      wrapper.update();
      const event = {nativeEvent: {layout: {height: 100}}};
      wrapper.instance()._onLayoutEvent(event);
      expect(wrapper.instance().state.height).toEqual(0);
    });
    test('expect event with negative height to equal 0', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const event = {nativeEvent: {layout: {height: -1}}};
      wrapper.instance()._onLayoutEvent(event);
      expect(wrapper.instance().state.height).toEqual(0);
    });
  });
  describe('_renderImage', () => {});
  describe('_renderTitle', () => {});
  describe('_renderMessage', () => {});
  describe('_renderCancel', () => {
    test('expect show to be true and button to be CancelButton', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const button = wrapper.instance()._renderCancel(true);
      expect(button).toBeDefined();
    });
    test('expect show to be false and button to be null', () => {
      const wrapper = shallow(<DropdownAlert imageSrc={imageSrc} />);
      const button = wrapper.instance()._renderCancel(false);
      expect(button).toBeNull();
    });
  });
});
