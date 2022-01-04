import React, {ReactNode} from 'react';

export interface DropdownAlertProps {
  imageSrc?: string | number;
  infoImageSrc?: string | number | object;
  warnImageSrc?: string | number | object;
  errorImageSrc?: string | number | object;
  successImageSrc?: string | number | object;
  cancelBtnImageSrc?: string | number | object;
  infoColor?: string;
  warnColor?: string;
  errorColor?: string;
  successColor?: string;
  closeInterval?: number;
  startDelta?: number;
  endDelta?: number;
  wrapperStyle?: object | number;
  containerStyle?: object | number;
  contentContainerStyle?: object | number;
  titleStyle?: object | number;
  messageStyle?: object | number;
  imageStyle?: object | number;
  cancelBtnImageStyle?: object | number;
  titleNumOfLines?: number;
  messageNumOfLines?: number;
  onClose?(data: AlertDataType): void;
  onCancel?(data: AlertDataType): void;
  showCancel?: boolean;
  tapToCloseEnabled?: boolean;
  panResponderEnabled?: boolean;
  translucent?: boolean;
  useNativeDriver?: boolean;
  isInteraction?: boolean;
  activeStatusBarStyle?: string;
  activeStatusBarBackgroundColor?: string;
  inactiveStatusBarStyle?: string;
  inactiveStatusBarBackgroundColor?: string;
  updateStatusBar?: boolean;
  elevation?: number;
  zIndex?: number;
  sensitivity?: number;
  defaultContainer?: object | number;
  defaultTextContainer?: object | number;
  renderImage?(props: DropdownAlertProps, state: AlertDataType): ReactNode;
  renderCancel?(props: DropdownAlertProps, state: AlertDataType): ReactNode;
  renderTitle?(props: DropdownAlertProps, state: AlertDataType): ReactNode;
  renderMessage?(props: DropdownAlertProps, state: AlertDataType): ReactNode;
  testID?: string;
  accessibilityLabel?: string;
  accessible?: boolean;
  titleTextProps?: object;
  messageTextProps?: object;
  onTap?(data: AlertDataType): void;
}

export type DropdownAlertType =
  | 'info'
  | 'warn'
  | 'error'
  | 'custom'
  | 'success';

export type CloseActionType =
  | 'automatic'
  | 'programmatic'
  | 'tap'
  | 'pan'
  | 'cancel';

export default class DropdownAlert extends React.Component<DropdownAlertProps> {
  alertWithType(
    type: DropdownAlertType,
    title: string,
    message: string,
    payload?: object,
    interval?: number,
  ): void;
  closeAction(action?: CloseActionType, onDone?: () => void): void;
  clearQueue(): void;
  getQueueSize(): number;
}

export type AlertDataType = {
  type: DropdownAlertType;
  title: string;
  message: string;
  action: CloseActionType;
  payload: object;
  interval: number;
};
