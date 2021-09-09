import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onClick,
      onMouseEnter,
      row,
      isVisited,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : isVisited
      ? 'node-visited'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onClick={() => onClick(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}></div>
    );
  }
}
