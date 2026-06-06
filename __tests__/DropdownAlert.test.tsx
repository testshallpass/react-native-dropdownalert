import React, { act } from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react-native';
import DropdownAlert, {
  DropdownAlertType,
  DropdownAlertColor,
  DropDownAlertTestID,
  // DropDownAlertImage,
  DropdownAlertData,
} from '../DropdownAlert';

// Real timers are needed because of Animated.spring
jest.useRealTimers();

describe('DropdownAlert', () => {
  afterEach(() => {
    jest.clearAllTimers();
    cleanup();
  });

  function _testAlertBackgroundColor(
    backgroundColor: DropdownAlertColor = DropdownAlertColor.Default,
  ) {
    const alert = screen.getByTestId(DropDownAlertTestID.Alert);
    expect(alert).toBeDefined();
    expect(alert).toBeEnabled();
    expect(alert).toBeVisible();
    expect(alert).toBeOnTheScreen();
    expect(alert).toHaveStyle({
      backgroundColor,
      opacity: 1,
      padding: 8,
    });
  }

  function _testImageSourceWithType(type: DropdownAlertType) {
    const image = screen.getByTestId(DropDownAlertTestID.Image);
    expect(image).toBeDefined();
    expect(image.props.source).toBeDefined();
    expect(image.props.source.testUri).toBeDefined();
    expect(image.props.source.testUri).toContain(type);
  }

  // function _delay(milliseconds: number = 1000) {
  //   return new Promise(res => setTimeout(() => res(true), milliseconds));
  // }

  test('it renders component', () => {
    expect(render(<DropdownAlert />).toJSON()).toMatchSnapshot();
  });

  test('alert without arguments to be default background color', async () => {
    let alert = (data?: DropdownAlertData) => new Promise(res => res(data));
    render(
      <DropdownAlert alert={func => (alert = func)} dismissInterval={0} />,
    );
    const animatedViewStyle = {
      elevation: 1,
      left: 0,
      right: 0,
      top: 0,
      zIndex: 1,
      position: 'absolute' as const,
    };
    const animatedView = screen.getByTestId(DropDownAlertTestID.AnimatedView);
    expect(animatedView).toHaveStyle({
      ...animatedViewStyle,
      transform: [
        {
          translateY: -99,
        },
      ],
    });
    await act(alert);
    expect(animatedView).toHaveStyle({
      ...animatedViewStyle,
      transform: [
        {
          translateY: 0,
        },
      ],
    });
    _testAlertBackgroundColor();
  });

  const items = [
    {
      name: 'DropdownAlertType.Info',
      type: DropdownAlertType.Info,
      color: DropdownAlertColor.Info,
    },
    {
      name: 'DropdownAlertType.Warn',
      type: DropdownAlertType.Warn,
      color: DropdownAlertColor.Warn,
    },
    {
      name: 'DropdownAlertType.Error',
      type: DropdownAlertType.Error,
      color: DropdownAlertColor.Error,
    },
    {
      name: 'DropdownAlertType.Success',
      type: DropdownAlertType.Success,
      color: DropdownAlertColor.Success,
    },
  ];

  items.forEach(item => {
    test(item.name, async () => {
      let alert = (data?: DropdownAlertData) => new Promise(res => res(data));
      render(
        <DropdownAlert alert={func => (alert = func)} dismissInterval={0} />,
      );
      await act(async () => {
        await alert({ type: item.type });
      });
      _testAlertBackgroundColor(item.color);
      _testImageSourceWithType(item.type);
    });
  });

  test('onDismissProgrammatic', async () => {
    let alert = (data?: DropdownAlertData) => new Promise(res => res(data));
    let dismiss = () => new Promise<void>(res => res);
    const onDismissProgrammatic = jest.fn();
    render(
      <DropdownAlert
        alert={func => (alert = func)}
        dismiss={func => (dismiss = func)}
        dismissInterval={0}
        onDismissProgrammatic={onDismissProgrammatic}
      />,
    );
    expect(onDismissProgrammatic).not.toHaveBeenCalled();
    await act(async () => {
      await alert();
      await dismiss();
    });
    expect(onDismissProgrammatic).toHaveBeenCalled();
  });

  test('onDismissPress', async () => {
    let alert = (data?: DropdownAlertData) => new Promise(res => res(data));
    const onDismissPress = jest.fn();
    render(
      <DropdownAlert
        alert={func => (alert = func)}
        dismissInterval={0}
        onDismissPress={onDismissPress}
      />,
    );
    expect(onDismissPress).not.toHaveBeenCalled();
    await act(async () => {
      await alert();
      const button = screen.getByTestId(DropDownAlertTestID.Alert);
      expect(button).toBeOnTheScreen();
      expect(button).toBeEnabled();
      fireEvent.press(button);
      // delay needed for the dismiss animation
      // await _delay();
    });
    expect(onDismissPress).toHaveBeenCalled();
  });

  test('onDismissCancel', async () => {
    let alert = (data?: DropdownAlertData) => new Promise(res => res(data));
    const onDismissCancel = jest.fn();
    render(
      <DropdownAlert
        alert={func => (alert = func)}
        dismissInterval={0}
        showCancel={true}
        onDismissCancel={onDismissCancel}
      />,
    );
    expect(onDismissCancel).not.toHaveBeenCalled();
    await act(async () => {
      await alert();
      const button = screen.getByTestId(DropDownAlertTestID.Cancel);
      expect(button).toBeOnTheScreen();
      expect(button).toBeEnabled();
      fireEvent.press(button);
      // delay needed for the dismiss animation
      // await _delay();
    });
    expect(onDismissCancel).toHaveBeenCalled();
  });
});

// test('renderImage, renderTitle, renderMessage and renderCancel props', async () => {
//   let alert = (data?: DropdownAlertData) => new Promise(res => res(data));
//   const component = render(
//     <DropdownAlert
//       alert={func => (alert = func)}
//       renderImage={() => {
//         return <Image testID={'myImage'} source={DropDownAlertImage.Info} />;
//       }}
//       renderTitle={data => <Text>{data.title}</Text>}
//       renderMessage={data => <Text>{data.message}</Text>}
//       renderCancel={(_data, onCancel) => {
//         return (
//           <Pressable testID={'myButton'} onPress={onCancel}>
//             <Text>{'Cancel'}</Text>
//           </Pressable>
//         );
//       }}
//       showCancel
//     />,
//   );
//   expect(component).toBeDefined();
//   await act(async () => {
//     await alert({ type: 'custom', title: 'myTitle', message: 'myMessage' });
//   });
//   ['myImage', 'myButton'].forEach(testID => {
//     const view = screen.getByTestId(testID);
//     expect(view).toBeDefined();
//   });
//   ['myTitle', 'myMessage'].forEach(text => {
//     const view = screen.getByText(text);
//     expect(view).toBeDefined();
//   });
//   expect(component.toJSON()).toMatchSnapshot();
// }, 5500);

// test('multiple queued alerts', async () => {
//   let alert = (data?: DropdownAlertData) => new Promise(res => res(data));
//   const component = render(
//     <DropdownAlert alert={func => (alert = func)} dismissInterval={1000} />,
//   );
//   expect(component).toBeDefined();
//   await act(async () => {
//     alert({
//       type: DropdownAlertType.Info,
//       title: 'Info',
//       message:
//         'Esse ex ullamco pariatur id labore laborum ipsum non qui ut occaecat consectetur fugiat.',
//     });
//     await alert({
//       type: DropdownAlertType.Error,
//       title: 'Error',
//       message:
//         'Dolore dolor veniam culpa proident veniam incididunt in laboris irure fugiat cupidatat.',
//     });
//   });
//   expect(component.toJSON()).toMatchSnapshot();
// }, 5500);

// test('Animated.View onLayout function', async () => {
//   let alert = (data?: DropdownAlertData) => new Promise(res => res(data));
//   const component = render(
//     <DropdownAlert alert={func => (alert = func)} dismissInterval={0} />,
//   );
//   expect(component).toBeDefined();
//   act(() => {
//     alert({ type: DropdownAlertType.Warn, title: 'title', message: 'message' });
//   });
//   const height = 150;
//   const animatedView = screen.getByTestId(DropDownAlertTestID.AnimatedView);
//   expect(animatedView).toBeDefined();
//   const event: LayoutChangeEvent = {
//     nativeEvent: { layout: { x: 0, y: 0, height, width: 100 } },
//     currentTarget: {
//       measure: jest.fn(),
//       measureInWindow: jest.fn(),
//       measureLayout: jest.fn(),
//       setNativeProps: jest.fn(),
//       focus: jest.fn(),
//       blur: jest.fn(),
//     },
//     target: {
//       measure: jest.fn(),
//       measureInWindow: jest.fn(),
//       measureLayout: jest.fn(),
//       setNativeProps: jest.fn(),
//       focus: jest.fn(),
//       blur: jest.fn(),
//     },
//     bubbles: false,
//     cancelable: false,
//     defaultPrevented: false,
//     eventPhase: 0,
//     isTrusted: false,
//     preventDefault: jest.fn(),
//     isDefaultPrevented: jest.fn(),
//     stopPropagation: jest.fn(),
//     isPropagationStopped: jest.fn(),
//     persist: jest.fn(),
//     timeStamp: new Date().getTime(),
//     type: '',
//   };
//   await act(async () => {
//     fireEvent(animatedView, 'onLayout', event);
//     await delay();
//   });
//   const transform = animatedView.props.style.transform;
//   expect(transform).toBeDefined();
//   expect(transform).toHaveLength(1);
//   expect(transform[0]).toBeDefined();
//   const translateY = transform[0].translateY;
//   expect(translateY).toBeDefined();
//   expect(animatedView).toHaveStyle({ transform: [{ translateY }] });
//   expect(component.toJSON()).toMatchSnapshot();
// });

// test('it updates status bar on Android', async () => {
//   Platform.OS = 'android';
//   let alert = (data?: DropdownAlertData) => new Promise(res => res(data));
//   const component = render(
//     <DropdownAlert alert={func => (alert = func)} translucent />,
//   );
//   expect(component).toBeDefined();
//   await act(async () => {
//     await alert();
//   });
//   const button = screen.getByTestId(DropDownAlertTestID.Alert);
//   expect(button).toBeDefined();
//   expect(button).toHaveStyle({ marginTop: StatusBar.currentHeight });
//   expect(component.toJSON()).toMatchSnapshot();
// }, 6000);

// test('it updates status bar with containerStyle undefined backgroundColor on Android', async () => {
//   const alertViewStyle = { padding: 8 };
//   Platform.OS = 'android';
//   let alert = (data?: DropdownAlertData) => new Promise(res => res(data));
//   const component = render(
//     <DropdownAlert
//       alert={func => (alert = func)}
//       translucent
//       alertViewStyle={alertViewStyle}
//     />,
//   );
//   expect(component).toBeDefined();
//   await act(async () => {
//     await alert();
//   });
//   const button = screen.getByTestId(DropDownAlertTestID.Alert);
//   expect(button).toBeDefined();
//   expect(button).toHaveStyle({ marginTop: StatusBar.currentHeight });
//   expect(component.toJSON()).toMatchSnapshot();
// }, 6000);

// test('children prop', async () => {
//   let alert = (data?: DropdownAlertData) => new Promise(res => res(data));
//   const component = render(
//     <DropdownAlert alert={func => (alert = func)}>
//       <View testID={'childView'}>
//         <Text testID={'childText'}>{'My Child Text'}</Text>
//         <Pressable testID={'childButton'}>
//           <Text>{'My Button'}</Text>
//         </Pressable>
//       </View>
//     </DropdownAlert>,
//   );
//   expect(component).toBeDefined();
//   await act(async () => {
//     await alert();
//   });
//   ['childView', 'childText', 'childButton'].forEach(testId => {
//     const view = screen.getByTestId(testId);
//     expect(view).toBeDefined();
//   });
//   expect(component.toJSON()).toMatchSnapshot();
// }, 5500);
