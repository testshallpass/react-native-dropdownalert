import React, { ReactNode } from 'react'

export interface DropdownAlertProps {
    imageSrc?: string | number
    infoImageSrc?: string | number
    warnImageSrc?: string | number
    errorImageSrc?: string | number
    successImageSrc?: string | number
    cancelBtnImageSrc?: string | number
    infoColor?: string
    warnColor?: string
    errorColor?: string
    successColor?: string
    closeInterval?: number
    startDelta?: number
    endDelta?: number
    wrapperStyle?: object | number
    containerStyle?: object | number
    safeAreaStyle?: object | number
    titleStyle?: object | number
    messageStyle?: object | number
    imageStyle?: object | number
    cancelBtnImageStyle?: object | number
    titleNumOfLines?: number
    messageNumOfLines?: number
    onClose?(): void
    onCancel?(): void
    showCancel?: boolean
    tapToCloseEnabled?: boolean
    panResponderEnabled?: boolean
    replaceEnabled?: boolean
    translucent?: boolean
    useNativeDriver?: boolean
    isInteraction?: boolean
    activeStatusBarStyle?: string
    activeStatusBarBackgroundColor?: string
    inactiveStatusBarStyle?: string
    inactiveStatusBarBackgroundColor?: string
    updateStatusBar?: boolean
    elevation?: number
    zIndex?: number
    sensitivity?: number
    defaultContainer?: object | number
    defaultTextContainer?: object | number
    renderImage?(props: DropdownAlertProps, state: { type: string }): ReactNode
    renderCancel?(props: DropdownAlertProps, state: { type: string }): ReactNode
    renderTitle?(props: DropdownAlertProps, state: { type: string }): ReactNode
    renderMessage?(
      props: DropdownAlertProps,
      state: { type: string }
    ): ReactNode
    testID?: string
    accessible?: boolean
    accessibilityLabel?: string
    titleTextProps?: object
    messageTextProps?: object
  }
  export type DropdownAlertType =
    | 'info'
    | 'warn'
    | 'error'
    | 'custom'
    | 'success'
  export default class DropdownAlert extends React.Component<
    DropdownAlertProps
  > {
    alertWithType(
      type: DropdownAlertType,
      title: string,
      message: string,
      payload?: object,
      interval?: number,
    ): void
  }
