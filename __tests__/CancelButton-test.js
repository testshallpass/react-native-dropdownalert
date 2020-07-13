import React from 'react';
import CancelButton from '../CancelButton';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('CancelButton', () => {
  test('renders', () => {
    const wrapper = shallow(<CancelButton />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
  test('test onPress to be defined', () => {
    const onCancel = () => {
      console.log('Cancelled');
    };
    const wrapper = shallow(<CancelButton onPress={onCancel} />);
    expect(wrapper.prop('onPress')).toEqual(onCancel);
    expect(wrapper.props().onPress).toBeDefined();
    CancelButton.defaultProps.onPress();
  });
});
