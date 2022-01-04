# Props

## Table of contents

1. [Accessibility](#accessibility)
2. [Actions](#actions)
3. [Animation](#animation)
4. [Cancel](#cancel)
5. [Colors](#colors)
6. [Containers](#containers)
7. [Image](#image)
8. [Title](#title)
9. [Message](#message)
10. [StatusBar](#statusbar)
11. [Miscellaneous](#miscellaneous)

### Accessibility

| Name                 |  Type  | Description                                     | Default   |
| -------------------- | :----: | ----------------------------------------------- | --------- |
| `testID`             | String | Top level TouchableOpacity's testID             | undefined |
| `accessibilityLabel` | String | Top level TouchableOpacity's accessibilityLabel | undefined |
| `accessible`         |  Bool  | Top level TouchableOpacity's accessible         | false     |

### Actions

| Name       |   Type   | Description                                                                                               | Default  |
| ---------- | :------: | --------------------------------------------------------------------------------------------------------- | -------- |
| `onClose`  | Function | alert close callback returns: `alertData = { type, title, message, action, payload, interval }`           | () => {} |
| `onCancel` | Function | alert is closed by cancel button returns: `alertData = {type, title, message, action, payload, interval}` | () => {} |
| `onTap`    | Function | alert is closed by tap returns: `alertData = {type, title, message, action, payload, interval}`           | () => {} |

### Animation

| Name              |  Type  | Description                                                                                                                                                                                | Default |
| ----------------- | :----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `closeInterval`   | Number | automatic close duration in milliseconds (set to less than and equal to 0 disables the automatic close)                                                                                    | 4000    |
| `startDelta`      | Number | where the alert container starts to animate from (min: negative height)                                                                                                                    | -100    |
| `endDelta`        | Number | where the alert container ends at                                                                                                                                                          | 0       |
| `useNativeDriver` |  Bool  | enable or disable native driver for animations. Android may have issues on earlier react-native versions: See [#65](https://github.com/testshallpass/react-native-dropdownalert/issues/65) | true    |
| `isInteraction`   |  Bool  | whether or not this animation creates an "interaction handle" on the InteractionManager. Default true.                                                                                     | true    |

### Cancel

| Name                  |   Type   | Description                                                                    | Default                     |
| --------------------- | :------: | ------------------------------------------------------------------------------ | --------------------------- |
| `showCancel`          |   Bool   | show or hide cancel button                                                     | false                       |
| `cancelBtnImageStyle` |  Object  | styles for image for all types                                                 | `{ width: 36, height: 36 }` |
| `cancelBtnStyle`      |  Object  | styles for image for all types                                                 | `{ alignSelf: 'center' }`   |
| `renderCancel`        | Function | Use to override the cancel button component. props and alertData are returned. | undefined                   |

### Colors

| Name           |  Type  | Description                                 | Default |
| -------------- | :----: | ------------------------------------------- | ------- |
| `successColor` | String | Default background color of success message | #32A54A |
| `infoColor`    | String | Default background color of info message    | #2B73B6 |
| `warnColor`    | String | Default background color of warn message    | #cd853f |
| `errorColor`   | String | Default background color of error message   | #cc3232 |

### Containers

| Name                    |  Type  | Description                                                                                                                                                                     | Default                                                |
| ----------------------- | :----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `defaultContainer`      | Object | Style for inner view container (**override paddingTop with this**)                                                                                                              | `{ flexDirection: 'row', padding: 8 }`                 |
| `defaultTextContainer`  | Object | Style for inner text container (holds title and message)                                                                                                                        | `{ flex: 1, padding: 8 }`                              |
| `wrapperStyle`          | Object | styles for the view that wraps the container. For [React Native Web](https://github.com/necolas/react-native-web) support you might want to set this to `{ position: 'fixed' }` | `null`                                                 |
| `containerStyle`        | Object | styles for container for custom type only                                                                                                                                       | `{ flexDirection: 'row', backgroundColor: '#202020' }` |
| `contentContainerStyle` | Object | styles for ContentView                                                                                                                                                          | `{ flex: 1, flexDirection: 'row' }`                    |
| `zIndex`                | Number | zIndex attribute on outermost container                                                                                                                                         | null                                                   |
| `elevation`             | Number | Animated.View elevation                                                                                                                                                         | 1                                                      |

### Image

image sources are overridden if payload parameter has source property. For example,`{ source: 'https://reactnative.dev/docs/assets/favicon.png' }`

| Name              |       Type       | Description                                    | Default                                          |
| ----------------- | :--------------: | ---------------------------------------------- | ------------------------------------------------ |
| `imageStyle`      |      Object      | styles for image for all types                 | `{ width: 36, height: 36, alignSelf: 'center' }` |
| `renderImage`     |     Function     | Use to override the left image component       | undefined                                        |
| `imageSrc`        | String or Number | local or network source for custom alert type  | null                                             |
| `infoImageSrc`    | String or Number | local or network source for info alert type    | `require('./assets/info.png')`                   |
| `warnImageSrc`    | String or Number | local or network source for warn alert type    | `require('./assets/warn.png')`                   |
| `errorImageSrc`   | String or Number | local or network source for error alert type   | `require('./assets/error.png')`                  |
| `successImageSrc` | String or Number | local or network source for success alert type | `require('./assets/success.png')`                |

### Title

| Name              |   Type   | Description                                                              | Default                                                                                                   |
| ----------------- | :------: | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `titleNumOfLines` |  Number  | number of lines                                                          | 1                                                                                                         |
| `titleTextProps`  |  Object  | title text props. **does not override numOfLines (use titleNumOfLines)** | undefined                                                                                                 |
| `titleStyle`      |  Object  | styles for title for all types                                           | `{ fontSize: 16, textAlign: 'left', fontWeight: 'bold', color: 'white', backgroundColor: 'transparent' }` |
| `renderTitle`     | Function | Use to override the title component                                      | undefined                                                                                                 |

### Message

| Name                |   Type   | Description                                                                  | Default                                                                                                   |
| ------------------- | :------: | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `messageNumOfLines` |  Number  | number of lines                                                              | 3                                                                                                         |
| `messageTextProps`  |  Object  | message text props. **does not override numOfLines (use messageNumOfLines)** | undefined                                                                                                 |
| `messageStyle`      |  Object  | styles for message for all types                                             | `{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', color: 'white', backgroundColor: 'transparent' }` |
| `renderMessage`     | Function | Use to override the message component                                        | undefined                                                                                                 |

### StatusBar

| Name                               |  Type  | Description                                    | Default                                                                              |
| ---------------------------------- | :----: | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| `updateStatusBar`                  |  Bool  | whether or not to update status bar styles     | true                                                                                 |
| `activeStatusBarStyle`             | String | StatusBar barStyle when alert is open          | `light-content`                                                                      |
| `activeStatusBarBackgroundColor`   | String | StatusBar backgroundColor when alert is open   | It takes on the backgroundColor of alert if predefined else default or provided prop |
| `inactiveStatusBarStyle`           | String | StatusBar barStyle when alert dismisses        | `StatusBar._defaultProps.barStyle.value`                                             |
| `inactiveStatusBarBackgroundColor` | String | StatusBar backgroundColor when alert dismisses | `StatusBar._defaultProps.backgroundColor.value`                                      |
| `translucent`                      |  Bool  | StatusBar prop                                 | false                                                                                |

### Miscellaneous

| Name                  |  Type  | Description                                  | Default |
| --------------------- | :----: | -------------------------------------------- | ------- |
| `sensitivity`         | Number | Sensitivity for the pan responder up gesture | 20      |
| `tapToCloseEnabled`   |  Bool  | enable/disable close with tap                | true    |
| `panResponderEnabled` |  Bool  | enable/disable close with pan responder      | true    |
