import React from 'react';
import R from 'ramda';
import Stop from './Stop.jsx';

class WaypointMap extends React.Component {
  constructor(){
    this.state = {
      height: 245,
      width: 418,
      padding: 55,
      radius: 20
    }
  }

  render() {

    let { height, width, radius, padding } = this.state;
    let { model, handleComplete, handleHover } = this.props;
    let { checkpoints } = model;
    let baseLine = height / 2;
    let center = width / 2;

    let interval = width / (checkpoints.length + 1)

    let drawStops = R.mapIndexed((checkpoint, index) => {
      let x = interval + (index * interval);
      let y = baseLine;
      let highlight_points = false;
      let params = { x, y, radius, center, checkpoint, highlight_points }

      return <Stop
        handleHover={ handleHover.bind(this) }
        handleComplete={ handleComplete.bind(this) }
        key={ index } params={ params }/>
    });

    return (
      <svg viewBox={ `0 0 ${width} ${height}` }width={ width } height={ height } className="map">
        <line className="line"
          x1={ 0}
          y1={ baseLine }
          x2={ width }
          y2={ baseLine }/>
        { drawStops(checkpoints) }
      </svg>
    )
  }
};

WaypointMap.propTypes = {
  model: React.PropTypes.object
}

export default WaypointMap;
