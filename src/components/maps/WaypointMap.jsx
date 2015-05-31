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

    let density = checkpoints.length / 5;
    padding += padding * (1 - density) * 2;

    let len = width - (padding * 2);
    let interval = len / (checkpoints.length - 1);


    //padding += padding * (1 - checkpoints.length / 5);
    //let interval = ((width - padding) / (checkpoints.length - 1));

    let drawStops = R.mapIndexed((checkpoint, index) => {
      let x = padding + (index * interval);
      //let x = (padding * 1.5) + (index * interval);
      let y = baseLine;
      let textY = baseLine - padding;
      let maxHeight = (textY - padding);
      let maxResources = 2;
      let baseHeight = maxHeight / maxResources;
      let highlight_points = false;
      let params = { x, y, radius, center, baseHeight, textY, checkpoint, highlight_points }

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
