/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-dropdownalert', () => ({
  __esModule: true,
  default: 'DropdownAlert',
  DropdownAlertColor: {
    Default: 'black',
    Info: 'blue',
    Warn: 'yellow',
    Success: 'green',
    Error: 'red',
  },
  DropdownAlertType: {
    Info: 'info',
    Warn: 'warn',
    Success: 'success',
    Error: 'error',
  },
}));

it('renders correctly', () => {
  const component = renderer.create(<App />);
  expect(component.toJSON()).toMatchSnapshot();
});
