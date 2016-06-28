### react-native-dropdownalert

A dropdown alert that allows you to display bits of information to your user. Try 1 of 3 types or roll your own custom type (see props below). Tap the alert to close or provide a time interval to close automatically.

### Demo

![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/demo.gif)


### Types 

![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/info.png)
![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/warning.png)
![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/error.png)
![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/custom.png)

### Props
| Props name | Type | Description | Platform | Default
| ------------ | ------------- | ------------ |------------ |------------ |
| closeInterval | Number  | Dismiss alert at a certain interval | Both | -1
| backgroundColor | String  | background color | Both | steelblue
| imageUri | String  | source uri for network image | Both | ''
| imageSrc | String  | source for local image | Both | ''
| textColor | String  | title & message text color | Both | white
| fontFamily | String  | font for title & messsage | Both | HelveticaNeue
| startDelta | Number  | where view animation starts | Both | -100
| endDelta | Number  | where view animation ends | Both | 0
### Future
* npm module
* ~~demo gif~~
* ~~fontFamily prop~~
* usage example

Inspired by: https://github.com/cwRichardKim/RKDropdownAlert

MIT License

Copyright (c) 2016 devBrian

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
