# React Undo
> Tiny React Undo library with no dependencies!

[![Travis](https://img.shields.io/travis/aurbano/react-undo.svg)](https://travis-ci.org/aurbano/react-undo)
[![npm](https://img.shields.io/npm/v/react-undo.svg)](https://www.npmjs.com/package/react-undo)
[![Coverage Status](https://coveralls.io/repos/github/aurbano/react-undo/badge.svg?branch=master)](https://coveralls.io/github/aurbano/react-undo?branch=master)
[![npm](https://img.shields.io/npm/dm/react-undo.svg)](https://www.npmjs.com/package/react-undo)
[![npm](https://img.shields.io/npm/l/react-undo.svg)](https://www.npmjs.com/package/react-undo)
[![Codacy grade](https://img.shields.io/codacy/grade/e2589a609bdc4c56bd49c232a65dab4e.svg)](https://www.codacy.com/app/aurbano/react-undo)

Most undo/redo solutions use redux, which is amazing *except* when you need something a bit simpler.


## Installation

```console
$ npm i react-undo
```
Or if you prefer yarn
```console
$ yarn add react-undo
```

## Usage

```jsx
<UndoRedo
    as={ YourComponent }
    props={ { propsForYourComponent: true } }
    trackProps={ ['propName'] }
    onChange={ this.doSomething }
/>
```

It wraps your component (in the example above `YourComponent`) passing it the `props` that you define, and tracking any prop defined in `trackProps`. It doesn't support tracking nested props as of now (PR welcome :wink:)

If the child component calls `redo()` or `undo()`, the `UndoRedo` component will trigger the function defined in `onChange`, passing an object with all the keys defined in `trackProps`.
You can then update your state/whatever so that the props that are passed to the child component are updated.

### Props

Docs on each prop, see them in action in the example below.

#### `as`

Component that you are wrapping.

#### `props`

Any props you were passing to your component.

#### `trackProps`

Array of prop names that you want to track. These should be keys of the object `props` passed.

#### `onChange`

This will be fired when moving back and forth (undo/redo).

### Props passed to Your Component

Your component will receive all the props you pass it, plus an object containing some useful methods:

```js
// props received by your component
const props = {
  { ...props }, // all the ones passed by you
  undoRedo: {
    canUndo(): boolean,
    canRedo(): boolean,
    redo(): void,
    undo(): void,
    addStep(): void,
  }
};
```

#### `canUndo` / `canRedo`

Methods returning true if there are elements to undo/redo in the history.

#### `redo` / `undo`

Move backwards or forwards in the history by one element. It will trigger `onChange` with the relevant history element.

#### `addStep`

Store the current value of the tracked properties in the history as a new step. It will do a quick `===` comparison with the previous values to try to avoid duplicates.

## Example

This example was taken from [`example/app/src/Example.js`](https://github.com/aurbano/react-undo/blob/master/example/app/src/Example.js) which you can see running at https://aurbano.eu/react-undo/

```jsx
import React from 'react';
import UndoRedo from 'react-undo';

export default class Example extends React.PureComponent {
    render() {
        return (
            <div>Example under construction</div>
        );
    }
}
```

## Contributing

Only edit the files in the `src` folder. I'll update `dist` manually before publishing new versions to npm.

To run the tests simply run `npm test`. Add tests as you see fit to the `test` folder, they must be called `{string}.test.js`.

## Meta

Copyright &copy; [Alejandro U. Alvarez](https:/aurbano.eu) 2017. MIT Licensed.
