# cloneReferencedElement for React

This is a version of `React.cloneElement` that preserves the original element's ref even if you specify a new ref for the clone.

## Installation

Install this module from npm:
```sh
npm install --save react-clone-referenced-element
```

This library was designed for React Native, so if you are using it with React in other environments, you will need to compile the code first. How you do this is up to you. With Babel, use the following plugins:

 - es2015-block-scoping
 - object-rest-spread
 - trailing-function-commas

You will also need to transform or define a global variable named `__DEV__`.

## Usage

The signature of `cloneReferencedElement` is the same as that of `React.cloneElement`. However, when using callback refs, it will preserve the ref on the original component if there is one.

```js
let element =
  <Component ref={component => {
    console.log('Running the original ref handler');
  }} />
cloneReferencedElement(element, {
  ref(component) {
    console.log('Running the clone ref handler');
  },
});
```

When the component is mounted, the console will display:
```
Running the clone ref handler
Running the original ref handler
```
