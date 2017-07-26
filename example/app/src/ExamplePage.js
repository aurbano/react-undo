import React from 'react';
import UndoRedo from 'react-undo';

import Input from './Input';

export default class Examples extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      val: 'Initial value',
    };
  }

  update = (val) => {
    this.setState({
      val,
    });
  };

  render() {
    return (
      <div>
        <h2>
          <a href="https://github.com/aurbano/react-undo/blob/master/example/app/src/ExamplePage.js" className="right">
            <code>&lt;Source&gt;</code>
          </a>
          Example
        </h2>

        <p>This example features a <code>Input</code> component that receives a value, and renders it along with a form to update it.</p>
        <p>The <code>Input</code> is wrapped in the <code>UndoRedo</code> component, so it can also render undo/redo buttons</p>

        <UndoRedo
          as={ Input }
          props={ {
            val: this.state.val,
            update: this.update,
          } }
          trackProps={ ['val'] }
          onChange={ (props) => { this.update(props.val); } }
        />
      </div>
    );
  }
}