import React from 'react';
import {Animated, Platform, StatusBar} from 'react-native';
import {act, render} from '@testing-library/react-native';
import DropdownAlert, {
  DropdownAlertData,
  DropdownAlertPosition,
  DropdownAlertType,
} from '../DropdownAlert';

describe('Android StatusBar compatibility', () => {
  const originalOS = Platform.OS;
  const backgroundDescriptor = Object.getOwnPropertyDescriptor(
    StatusBar,
    'setBackgroundColor',
  );
  const translucentDescriptor = Object.getOwnPropertyDescriptor(
    StatusBar,
    'setTranslucent',
  );
  let background: jest.Mock;
  let translucent: jest.Mock;

  beforeEach(() => {
    Platform.OS = 'android';
    background = jest.fn();
    translucent = jest.fn();
    Object.defineProperty(StatusBar, 'setBackgroundColor', {
      configurable: true,
      writable: true,
      value: background,
    });
    Object.defineProperty(StatusBar, 'setTranslucent', {
      configurable: true,
      writable: true,
      value: translucent,
    });
    jest.spyOn(StatusBar, 'setBarStyle').mockImplementation(() => {});
    jest.spyOn(Animated, 'spring').mockImplementation(() => ({
      start: callback => callback?.({finished: true}),
      stop: jest.fn(),
      reset: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
    Platform.OS = originalOS;
    if (backgroundDescriptor) {
      Object.defineProperty(
        StatusBar,
        'setBackgroundColor',
        backgroundDescriptor,
      );
    }
    if (translucentDescriptor) {
      Object.defineProperty(StatusBar, 'setTranslucent', translucentDescriptor);
    }
  });

  const mount = (props: React.ComponentProps<typeof DropdownAlert> = {}) => {
    let alert = async (
      _data?: DropdownAlertData,
    ): Promise<DropdownAlertData> => ({});
    let dismiss: () => void = () => {};
    render(
      <DropdownAlert
        dismissInterval={0}
        activeStatusBarBackgroundColor="red"
        inactiveStatusBarBackgroundColor="blue"
        translucent
        alert={value => (alert = value)}
        dismiss={value => (dismiss = value)}
        {...props}
      />,
    );
    return {
      alert: (data?: DropdownAlertData) => alert(data),
      dismiss: () => dismiss(),
    };
  };

  const showAndDismiss = async (
    props: React.ComponentProps<typeof DropdownAlert> = {},
  ) => {
    const controls = mount(props);
    let result: Promise<DropdownAlertData> = Promise.resolve({});
    await act(async () => {
      result = controls.alert({type: DropdownAlertType.Info, title: 'Notice'});
    });
    await act(async () => {
      await controls.dismiss();
    });
    await expect(result).resolves.toMatchObject({
      type: DropdownAlertType.Info,
      title: 'Notice',
    });
  };

  it('shows and resolves an alert when both removed setters are absent', async () => {
    Object.defineProperty(StatusBar, 'setBackgroundColor', {value: undefined});
    Object.defineProperty(StatusBar, 'setTranslucent', {value: undefined});
    await showAndDismiss();
    expect(StatusBar.setBarStyle).toHaveBeenNthCalledWith(
      1,
      'light-content',
      true,
    );
    expect(StatusBar.setBarStyle).toHaveBeenNthCalledWith(2, 'default', true);
  });

  it.each(['setBackgroundColor', 'setTranslucent'])(
    'also handles only %s being absent',
    async method => {
      Object.defineProperty(StatusBar, method, {value: undefined});
      await showAndDismiss();
      if (method === 'setBackgroundColor') {
        expect(translucent).toHaveBeenCalledWith(true);
      } else {
        expect(background).toHaveBeenNthCalledWith(1, 'red', true);
        expect(background).toHaveBeenNthCalledWith(2, 'blue', true);
      }
    },
  );

  it('preserves color, translucency and bar-style updates on older Android versions', async () => {
    await showAndDismiss();
    expect(background).toHaveBeenNthCalledWith(1, 'red', true);
    expect(background).toHaveBeenNthCalledWith(2, 'blue', true);
    expect(translucent).toHaveBeenCalledWith(true);
    expect(StatusBar.setBarStyle).toHaveBeenCalledTimes(2);
  });

  it('opens and dismisses without mutating a frozen spring configuration', async () => {
    const springAnimationConfig = Object.freeze({
      toValue: 99,
      useNativeDriver: true,
    });
    await showAndDismiss({springAnimationConfig});
    expect(springAnimationConfig.toValue).toBe(99);
    expect(Animated.spring).toHaveBeenNthCalledWith(1, expect.anything(), {
      toValue: 1,
      useNativeDriver: true,
    });
    expect(Animated.spring).toHaveBeenNthCalledWith(2, expect.anything(), {
      toValue: 0,
      useNativeDriver: true,
    });
  });

  it('leaves StatusBar untouched when updates are disabled', async () => {
    await showAndDismiss({updateStatusBar: false});
    expect(background).not.toHaveBeenCalled();
    expect(translucent).not.toHaveBeenCalled();
    expect(StatusBar.setBarStyle).not.toHaveBeenCalled();
  });

  it('leaves StatusBar untouched for bottom alerts', async () => {
    await showAndDismiss({alertPosition: DropdownAlertPosition.Bottom});
    expect(background).not.toHaveBeenCalled();
    expect(translucent).not.toHaveBeenCalled();
    expect(StatusBar.setBarStyle).not.toHaveBeenCalled();
  });
});
