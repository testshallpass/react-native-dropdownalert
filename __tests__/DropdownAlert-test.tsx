import React from 'react';
import '@testing-library/jest-native/extend-expect';
import {render, cleanup} from '@testing-library/react-native';
import DropdownAlert from '../DropdownAlert';

afterEach(cleanup);

test('it renders', () => {
  const component = render(<DropdownAlert />);
  expect(component).toBeDefined();
  expect(component.toJSON()).toMatchSnapshot();
});
