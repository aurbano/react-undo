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