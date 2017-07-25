// @flow

/**
 *
 * UndoRedo
 *
 * A simple React Component that encapsulates any other component to provide undo/redo functionality for it.
 *
 * It works by sitting between the component that should have tracked props and the parent that provides them. The
 * child component is then responsible for triggering undo/redo actions.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

export type UndoRedoProps = {
  canUndo(): boolean,
  canRedo(): boolean,
  redo(): void,
  undo(): void,
  addStep(): void,
};

type Props = {
  props: any, // original props for the child
  as: Function,
  // eslint-disable-next-line react/no-unused-prop-types
  trackProps: Array<string>,
  onChange(newProps: any): any,
};

type State = {
  history: Array<any>,
  current: number,
};

export default class UndoRedo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      history: [
        this.getTrackedProps(props),
      ],
      current: 0,
    };
  }

  addNewHistoryElement = (element: any) => {
    // determine whether we need to remove elements from the history
    const current = this.state.current;
    const history = this.state.history;
    if (current < history.length - 1) {
      history.length = current + 1; // faster than splice
    }
    history.push(element);
    this.setState({
      history,
      current: history.length - 1,
    });
  };

  getTrackedProps = (props: Props) => {
    const trackedProps = {};
    if (props.trackProps.length < 1) {
      return trackedProps;
    }
    props.trackProps.forEach(propName => {
      const val = props.props[propName];
      if (trackedProps[propName] !== val) {
        trackedProps[propName] = val;
      }
    });
    return trackedProps;
  };

  updateCurrent = (current: number) => {
    if (!this.state.history[current]) {
      return;
    }
    this.setState({
      current,
    });
    this.props.onChange(
      this.state.history[current]
    );
  };

  canUndo = () => this.state.current > 0;

  canRedo = () => this.state.current < this.state.history.length - 1;

  undo = () => {
    if (!this.canUndo()) {
      return;
    }
    this.updateCurrent(
      this.state.current - 1
    );
  };

  redo = () => {
    if (!this.canRedo()) {
      return;
    }
    this.updateCurrent(
      this.state.current + 1
    );
  };

  addStep = () => {
    const changed = this.getTrackedProps(this.props);
    this.addNewHistoryElement(changed);
  };

  render() {
    const undoRedo: UndoRedoProps = {
      canUndo: this.canUndo,
      canRedo: this.canRedo,
      undo: this.undo,
      redo: this.redo,
      addStep: this.addStep,
    };
    const ElementType = this.props.as;
    return (
      <ElementType
        undoRedo={ undoRedo }
        { ...this.props.props }
      />
    );
  }
}

// PropTypes
UndoRedo.propTypes = {
  as: PropTypes.func.isRequired,
  props: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  trackProps: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
