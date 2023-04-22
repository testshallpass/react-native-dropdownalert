import React from 'react';
import '@testing-library/jest-native/extend-expect';
import {
  render,
  act,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react-native';
import DropdownAlert, {
  DropdownAlertType,
  DropdownAlertColor,
} from '../DropdownAlert';

afterEach(cleanup);

test('it renders', () => {
  const component = render(<DropdownAlert />);
  expect(component).toBeDefined();
  expect(component.toJSON()).toMatchSnapshot();
});

test('it alerts', async () => {
  let alert = () => new Promise(res => res);
  const component = render(
    <DropdownAlert alertWithType={func => (alert = func)} />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    await alert();
  });
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);

test('it info alerts', async () => {
  let alert = (_type: string) => new Promise(res => res);
  const component = render(
    <DropdownAlert alertWithType={func => (alert = func)} />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    await alert(DropdownAlertType.Info);
  });
  const button = await screen.findByTestId('button');
  expect(button).toBeDefined();
  expect(button).toHaveStyle({
    backgroundColor: DropdownAlertColor.Info,
    opacity: 1,
    padding: 8,
  });
  const image = await screen.findByTestId('image');
  expect(image).toBeDefined();
  expect(image.props.source).toBeDefined();
  expect(image.props.source.testUri).toBeDefined();
  expect(image.props.source.testUri).toContain(DropdownAlertType.Info);
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);

test('it warn alerts', async () => {
  let alert = (_type: string) => new Promise(res => res);
  const component = render(
    <DropdownAlert alertWithType={func => (alert = func)} />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    await alert(DropdownAlertType.Warn);
  });
  const button = await screen.findByTestId('button');
  expect(button).toBeDefined();
  expect(button).toHaveStyle({
    backgroundColor: DropdownAlertColor.Warn,
    opacity: 1,
    padding: 8,
  });
  const image = await screen.findByTestId('image');
  expect(image).toBeDefined();
  expect(image.props.source).toBeDefined();
  expect(image.props.source.testUri).toBeDefined();
  expect(image.props.source.testUri).toContain(DropdownAlertType.Warn);
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);

test('it error alerts', async () => {
  let alert = (_type: string) => new Promise(res => res);
  const component = render(
    <DropdownAlert alertWithType={func => (alert = func)} />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    await alert(DropdownAlertType.Error);
  });
  const button = await screen.findByTestId('button');
  expect(button).toBeDefined();
  expect(button).toHaveStyle({
    backgroundColor: DropdownAlertColor.Error,
    opacity: 1,
    padding: 8,
  });
  const image = await screen.findByTestId('image');
  expect(image).toBeDefined();
  expect(image.props.source).toBeDefined();
  expect(image.props.source.testUri).toBeDefined();
  expect(image.props.source.testUri).toContain(DropdownAlertType.Error);
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);

test('it success alerts', async () => {
  let alert = (_type: string) => new Promise(res => res);
  const component = render(
    <DropdownAlert alertWithType={func => (alert = func)} />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    await alert(DropdownAlertType.Success);
  });
  const button = await screen.findByTestId('button');
  expect(button).toBeDefined();
  expect(button).toHaveStyle({
    backgroundColor: DropdownAlertColor.Success,
    opacity: 1,
    padding: 8,
  });
  const image = await screen.findByTestId('image');
  expect(image).toBeDefined();
  expect(image.props.source).toBeDefined();
  expect(image.props.source.testUri).toBeDefined();
  expect(image.props.source.testUri).toContain(DropdownAlertType.Success);
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);

test('it alert with title and message then tap to dismiss', async () => {
  let alert = (_type: string, _title: string, _message: string) =>
    new Promise(res => res);
  const component = render(
    <DropdownAlert
      alertWithType={func => (alert = func)}
      dismissInterval={0}
    />,
  );
  expect(component).toBeDefined();
  await act(() => {
    alert('custom', 'title', 'message');
  });
  const title = screen.getByText('title');
  expect(title).toBeDefined();
  const message = screen.getByText('message');
  expect(message).toBeDefined();
  const button = await screen.findByTestId('button');
  expect(button).toBeDefined();
  fireEvent.press(button);
}, 5500);

test('it alert with cancel button', async () => {
  let alert = (_type: string, _title: string, _message: string) =>
    new Promise(res => res);
  const component = render(
    <DropdownAlert
      alertWithType={func => (alert = func)}
      showCancel
      dismissInterval={0}
    />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    alert('custom', 'title', 'message');
    const cancelButton = await screen.findByTestId('cancelButton');
    expect(cancelButton).toBeDefined();
    fireEvent.press(cancelButton);
  });
}, 5500);
