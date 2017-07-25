import React from 'react';

export default class Counter extends React.PureComponent {

  render() {
    return (
      <div>
        The count is { this.props.count }
      </div>
    );
  }
}