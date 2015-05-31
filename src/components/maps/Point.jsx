import React from 'react';

class Point extends React.Component {

  render() {
    let { cx, cy, strokeWidth, resource } = this.props;
    let pointRadius = strokeWidth * 2;

    let complete = resource && resource.complete ? 'point-is-complete' : 'point-is-incomplete';

    return (
      <circle cx={cx}
        cy={cy}
        r={ pointRadius }
        strokeWidth={ strokeWidth }
        className={`point ${complete}`}/>
    )
  }
};


export default Point;
