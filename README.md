# React Undo
> Tiny React Undo library with no dependencies!

[![Travis](https://img.shields.io/travis/aurbano/react-undo.svg)](https://travis-ci.org/aurbano/react-undo)
[![npm](https://img.shields.io/npm/v/react-undo.svg)](https://www.npmjs.com/package/react-undo)
[![Coverage Status](https://coveralls.io/repos/github/aurbano/react-undo/badge.svg?branch=master)](https://coveralls.io/github/aurbano/react-undo?branch=master)
[![npm](https://img.shields.io/npm/dm/react-undo.svg)](https://www.npmjs.com/package/react-undo)
[![npm](https://img.shields.io/npm/l/react-undo.svg)](https://www.npmjs.com/package/react-undo)
[![Codacy grade](https://img.shields.io/codacy/grade/3aab39d8540f4d1cba401b071fc1b446.svg)](https://www.codacy.com/app/aurbano/react-undo)

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

This example was taken from [`example/app/src/ExamplePage.js`](https://github.com/aurbano/react-undo/blob/master/example/app/src/ExamplePage.js) which you can see running at https://aurbano.eu/react-undo/

```jsx
import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isUndoRedo: false, // track updates
      currentValue: '',
    };
  }

  undo = (e) => {
    e.preventDefault();
    this.props.undoRedo.undo();
    this.setState({
      isUndoRedo: true,
    });
  };

  redo = (e) => {
    e.preventDefault();
    this.props.undoRedo.redo();
    this.setState({
      isUndoRedo: true,
    });
  };

  update = (e) => {
    e.preventDefault();
    this.props.update(this.state.currentValue);
    this.setState({
      currentValue: '',
    });
    // addStep needs to be called once the new value is
    // in the undoRedo component. a setTimeout can achieve this.
    // In more complex use cases you need to determine the right moment and place for this.
    setTimeout(() => {
      this.props.undoRedo.addStep();
    });
  };

  render() {
    return (
      <div className='card'>
        <p>
          Current value: <code>{ this.props.val }</code>
        </p>
        <p>
          <input
            type="text"
            value={ this.state.currentValue }
            onChange={ (e) => { this.setState({ currentValue: e.target.value }); } }
            placeholder='Enter value...'
          />
          <button
            onClick={ this.update }
            disabled={ this.state.currentValue === '' }
          >
            Save
          </button>
        </p>
        <hr />
        <p>
          <code>UndoRedo</code> Actions:
          <button
            disabled={ !this.props.undoRedo.canUndo() }
            onClick={ this.undo }
          >
            Undo
          </button>
          <button
            disabled={ !this.props.undoRedo.canRedo() }
            onClick={ this.redo }
          >
            Redo
          </button>
        </p>
      </div>
    );
  }
}

Input.propTypes = {
  undoRedo: PropTypes.object.isRequired, // provided by the UndoRedo wrapper
  val: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};
```

## Contributing

Only edit the files in the `src` folder. I'll update `dist` manually before publishing new versions to npm.

To run the tests simply run `npm test`. Add tests as you see fit to the `test` folder, they must be called `{string}.test.js`.

## Meta

Copyright &copy; [Alejandro U. Alvarez](https:/aurbano.eu) 2017. MIT Licensed.
