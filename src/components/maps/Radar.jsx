import React from 'react';
import R from 'ramda';
import RadarPaths from 'paths-js/radar';

class Radar extends React.Component {
  getCurve(curve, i) {
    var path = curve.polygon.path.print();    
    return (
      <path className="curve" key={ i } d={ path } strokeWidth="1"/>
    );
  }

  getRing(ring, i) {
    var path = ring.path.print();
    return (
      <path key={ i  } d={ path } strokeWidth="1" className="ring" stroke="darkgray"/>
    );
  }

  getPoint(point, i) {
    return <circle cx={ point[0] } cy={ point[1] } r={ 12 } className="radar-point"/>
  }

  render() {
    let { data, max, r, rings, x, y  } = this.props;
    let paths = RadarPaths({ data, max, r, rings, center: [x, y]  });

    let curve = paths.curves[0];    
    let points = curve.polygon.path.points();    

    return (
      <g className="radar" fill="none" stroke="3">
        { paths.rings.map(this.getRing.bind(this)) }
        <g opacity="1">
          { paths.curves.map(this.getCurve.bind(this)) }
        </g>
        { points.map(this.getPoint.bind(this)) }
      </g>
    );
  }
};

Radar.defaultProps = {
  data   : [],
  max    : 5,
  r      : 100,
  rings  : 5,
  x      : 0,
  y      : 0
};

export default Radar;
