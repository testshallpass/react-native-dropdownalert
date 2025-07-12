import React from 'react';
import {
  Image,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
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
  DropDownAlertTestID,
  DropDownAlertImage,
  DropdownAlertData,
} from '../DropdownAlert';

function testAlertBackgroundColor(backgroundColor: DropdownAlertColor) {
  const alert = screen.getByTestId(DropDownAlertTestID.Alert);
  expect(alert).toBeDefined();
  expect(alert).toHaveStyle({
    backgroundColor,
    opacity: 1,
    padding: 8,
  });
}

function testImageSourceWithType(type: DropdownAlertType) {
  const image = screen.getByTestId(DropDownAlertTestID.Image);
  expect(image).toBeDefined();
  expect(image.props.source).toBeDefined();
  expect(image.props.source.testUri).toBeDefined();
  expect(image.props.source.testUri).toContain(type);
}

function delay(milliseconds: number = 1000) {
  return new Promise(res => setTimeout(() => res(true), milliseconds));
}

afterEach(cleanup);

test('it renders component', () => {
  const component = render(<DropdownAlert />);
  expect(component).toBeDefined();
  expect(component.toJSON()).toMatchSnapshot();
});

test('alert without arguments to be default background color', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  const component = render(<DropdownAlert alert={func => (alert = func)} />);
  expect(component).toBeDefined();
  await act(async () => {
    await alert();
  });
  [
    DropDownAlertTestID.AnimatedView,
    DropDownAlertTestID.SafeView,
    DropDownAlertTestID.TextView,
  ].forEach(testId => {
    const view = screen.getByTestId(testId);
    expect(view).toBeDefined();
  });
  testAlertBackgroundColor(DropdownAlertColor.Default);
}, 5500);

test('DropdownAlertType.Info', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  const component = render(<DropdownAlert alert={func => (alert = func)} />);
  expect(component).toBeDefined();
  await act(async () => {
    await alert({type: DropdownAlertType.Info});
  });
  testAlertBackgroundColor(DropdownAlertColor.Info);
  testImageSourceWithType(DropdownAlertType.Info);
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);

test('DropdownAlertType.Warn', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  const component = render(<DropdownAlert alert={func => (alert = func)} />);
  expect(component).toBeDefined();
  await act(async () => {
    await alert({type: DropdownAlertType.Warn});
  });
  testAlertBackgroundColor(DropdownAlertColor.Warn);
  testImageSourceWithType(DropdownAlertType.Warn);
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);

test('DropdownAlertType.Error', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  const component = render(<DropdownAlert alert={func => (alert = func)} />);
  expect(component).toBeDefined();
  await act(async () => {
    await alert({type: DropdownAlertType.Error});
  });
  testAlertBackgroundColor(DropdownAlertColor.Error);
  testImageSourceWithType(DropdownAlertType.Error);
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);

test('DropdownAlertType.Success', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  const component = render(<DropdownAlert alert={func => (alert = func)} />);
  expect(component).toBeDefined();
  await act(async () => {
    await alert({type: DropdownAlertType.Success});
  });
  testAlertBackgroundColor(DropdownAlertColor.Success);
  testImageSourceWithType(DropdownAlertType.Success);
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);

test('onDismissProgrammatic', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  let dismiss = () => {};
  let _onDismissProgrammatic = jest.fn();
  const component = render(
    <DropdownAlert
      alert={func => (alert = func)}
      dismiss={func => (dismiss = func)}
      dismissInterval={0}
      onDismissProgrammatic={_onDismissProgrammatic}
    />,
  );
  expect(component).toBeDefined();
  act(() => {
    alert({
      type: 'custom',
      title: DropDownAlertTestID.Title,
      message: DropDownAlertTestID.Message,
    });
  });
  const title = screen.getByText(DropDownAlertTestID.Title);
  expect(title).toBeDefined();
  const message = screen.getByText(DropDownAlertTestID.Message);
  expect(message).toBeDefined();
  const button = screen.getByTestId(DropDownAlertTestID.Alert);
  expect(button).toBeDefined();
  await act(async () => {
    dismiss();
    await delay();
  });
  expect(_onDismissProgrammatic).toHaveBeenCalled();
}, 2000);

test('onDismissPress', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  let _onDismissPress = jest.fn();
  const component = render(
    <DropdownAlert
      alert={func => (alert = func)}
      dismissInterval={0}
      onDismissPress={_onDismissPress}
    />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    alert({
      type: 'custom',
      title: DropDownAlertTestID.Title,
      message: DropDownAlertTestID.Message,
    });
  });
  const title = screen.getByText(DropDownAlertTestID.Title);
  expect(title).toBeDefined();
  const message = screen.getByText(DropDownAlertTestID.Message);
  expect(message).toBeDefined();
  const button = screen.getByTestId(DropDownAlertTestID.Alert);
  expect(button).toBeDefined();
  await act(async () => {
    fireEvent.press(button);
    await delay();
  });
  expect(_onDismissPress).toHaveBeenCalled();
}, 2000);

test('onDismissCancel', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  let _onDismissCancel = jest.fn();
  const component = render(
    <DropdownAlert
      alert={func => (alert = func)}
      showCancel
      dismissInterval={0}
      onDismissCancel={_onDismissCancel}
    />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    alert({
      type: 'custom',
      title: DropDownAlertTestID.Title,
      message: DropDownAlertTestID.Message,
    });
  });
  const cancel = screen.getByTestId(DropDownAlertTestID.Cancel);
  expect(cancel).toBeDefined();
  await act(async () => {
    fireEvent.press(cancel);
    const cancelImage = screen.getByTestId(DropDownAlertTestID.CancelImage);
    expect(cancelImage).toBeDefined();
    await delay();
  });
  expect(_onDismissCancel).toHaveBeenCalled();
}, 5500);

test('renderImage, renderTitle, renderMessage and renderCancel props', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  const component = render(
    <DropdownAlert
      alert={func => (alert = func)}
      renderImage={() => {
        return <Image testID={'myImage'} source={DropDownAlertImage.Info} />;
      }}
      renderTitle={data => <Text>{data.title}</Text>}
      renderMessage={data => <Text>{data.message}</Text>}
      renderCancel={(_data, onCancel) => {
        return (
          <Pressable testID={'myButton'} onPress={onCancel}>
            {'Cancel'}
          </Pressable>
        );
      }}
      showCancel
    />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    await alert({type: 'custom', title: 'myTitle', message: 'myMessage'});
  });
  ['myImage', 'myButton'].forEach(testID => {
    const view = screen.getByTestId(testID);
    expect(view).toBeDefined();
  });
  ['myTitle', 'myMessage'].forEach(text => {
    const view = screen.getByText(text);
    expect(view).toBeDefined();
  });
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);

test('multiple queued alerts', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  const component = render(
    <DropdownAlert alert={func => (alert = func)} dismissInterval={1000} />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    alert({
      type: DropdownAlertType.Info,
      title: 'Info',
      message:
        'Esse ex ullamco pariatur id labore laborum ipsum non qui ut occaecat consectetur fugiat.',
    });
    await alert({
      type: DropdownAlertType.Error,
      title: 'Error',
      message:
        'Dolore dolor veniam culpa proident veniam incididunt in laboris irure fugiat cupidatat.',
    });
  });
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);

test('Animated.View onLayout function', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  const component = render(
    <DropdownAlert alert={func => (alert = func)} dismissInterval={0} />,
  );
  expect(component).toBeDefined();
  act(() => {
    alert({type: DropdownAlertType.Warn, title: 'title', message: 'message'});
  });
  const height = 150;
  const animatedView = screen.getByTestId(DropDownAlertTestID.AnimatedView);
  expect(animatedView).toBeDefined();
  const event: LayoutChangeEvent = {
    nativeEvent: {layout: {x: 0, y: 0, height, width: 100}},
    currentTarget: {
      measure: jest.fn(),
      measureInWindow: jest.fn(),
      measureLayout: jest.fn(),
      setNativeProps: jest.fn(),
      focus: jest.fn(),
      blur: jest.fn(),
    },
    target: {
      measure: jest.fn(),
      measureInWindow: jest.fn(),
      measureLayout: jest.fn(),
      setNativeProps: jest.fn(),
      focus: jest.fn(),
      blur: jest.fn(),
    },
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    preventDefault: jest.fn(),
    isDefaultPrevented: jest.fn(),
    stopPropagation: jest.fn(),
    isPropagationStopped: jest.fn(),
    persist: jest.fn(),
    timeStamp: new Date().getTime(),
    type: '',
  };
  await act(async () => {
    fireEvent(animatedView, 'onLayout', event);
    await delay();
  });
  const transform = animatedView.props.style.transform;
  expect(transform).toBeDefined();
  expect(transform).toHaveLength(1);
  expect(transform[0]).toBeDefined();
  const translateY = transform[0].translateY;
  expect(translateY).toBeDefined();
  expect(animatedView).toHaveStyle({transform: [{translateY}]});
  expect(component.toJSON()).toMatchSnapshot();
});

test('it updates status bar on Android', async () => {
  Platform.OS = 'android';
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  const component = render(
    <DropdownAlert alert={func => (alert = func)} translucent />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    await alert();
  });
  const button = screen.getByTestId(DropDownAlertTestID.Alert);
  expect(button).toBeDefined();
  expect(button).toHaveStyle({marginTop: StatusBar.currentHeight});
  expect(component.toJSON()).toMatchSnapshot();
}, 6000);

test('it updates status bar with containerStyle undefined backgroundColor on Android', async () => {
  Platform.OS = 'android';
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  const component = render(
    <DropdownAlert
      alert={func => (alert = func)}
      translucent
      alertViewStyle={{padding: 8}}
    />,
  );
  expect(component).toBeDefined();
  await act(async () => {
    await alert();
  });
  const button = screen.getByTestId(DropDownAlertTestID.Alert);
  expect(button).toBeDefined();
  expect(button).toHaveStyle({marginTop: StatusBar.currentHeight});
  expect(component.toJSON()).toMatchSnapshot();
}, 6000);

test('children prop', async () => {
  let alert = (_data?: DropdownAlertData) =>
    new Promise<DropdownAlertData>(res => res);
  const component = render(
    <DropdownAlert alert={func => (alert = func)}>
      <View testID={'childView'}>
        <Text testID={'childText'}>{'My Child Text'}</Text>
        <Pressable testID={'childButton'}>{'My Button'}</Pressable>
      </View>
    </DropdownAlert>,
  );
  expect(component).toBeDefined();
  await act(async () => {
    await alert();
  });
  ['childView', 'childText', 'childButton'].forEach(testId => {
    const view = screen.getByTestId(testId);
    expect(view).toBeDefined();
  });
  expect(component.toJSON()).toMatchSnapshot();
}, 5500);
