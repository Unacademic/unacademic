import React from 'react';

class Point extends React.Component {

  render() {
    let { cx, cy, strokeWidth, resource, handleHover } = this.props;
    let pointRadius = strokeWidth * 2;

    let complete = resource && resource.complete ? 'point-is-complete' : ' ';
    let highlight = resource && resource.highlight ? 'point-is-highlight' : ' ';

    return (
      <circle cx={cx}
        cy={cy}
        r={ pointRadius }
        strokeWidth={ strokeWidth }
        onMouseEnter={ handleHover.bind(this, true, resource) }
        onMouseLeave={ handleHover.bind(this, false, resource) }
        className={ `point ${complete} ${highlight}` } />
    )
  }
};

Point.propTypes = {
  resource: React.PropTypes.object.isRequired,
  //handleHover: React.PropTypes.func.isRequired
}



export default Point;
