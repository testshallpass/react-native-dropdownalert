# react-native-mock [![Build Status](https://travis-ci.org/lelandrichardson/react-native-mock.svg?branch=master)](https://travis-ci.org/lelandrichardson/react-native-mock)
A fully mocked and test-friendly version of react native

## Requirements
- Node.js 4+
- The latest version of react-native-mock

__Note__: This library is designed to work with the most recent version of react-native. If you aren't using the most recent version, you will need to download an older version of this library, as the API is likely to be different, and the dependencies are likely to break. Details coming soon!

## How Am I Supposed To Use This?

```bash
npm i react-native-mock --save-dev
```

```js
/* file-that-runs-before-all-of-my-tests.js */

// This will mutate `react-native`'s require cache with `react-native-mock`'s.
require('react-native-mock/mock'); // <-- side-effects!!!
```

## Why?

Testing React Native components is *hard*.  I'm hoping this makes it easier.

I wrote a React Testing Library that works really well for React "Web", but didn't really work for React "Native" without something like this.


## Wait... Is this actually a terrible idea?

I don't know. Maybe.

I'd love to figure that out though... feel free to file an issue if you have opinions.


## Contributing
Discovered a bug, got a new feature, or found something that needs improving? __Submit a PR!__

Make sure to read through the CONTRIBUTING.md file before submitting your PR!

### Contributors
- Leland Richardson (Creator)
- Jake Howard

## What do the labels mean?
See [this wiki page](https://github.com/lelandrichardson/react-native-mock/wiki/Labels---What-do-they-mean%3F).
