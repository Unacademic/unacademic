import React from 'react';
import classnames from 'classnames';

import WaypointMap from '../maps/WaypointMap.jsx';
import Editable from '../editable/Editable.jsx';
import TodoList from '../todoList/TodoList.jsx';

import DescriptionSection from './sections/DescriptionSection.jsx';

import Actions from '../../actions/index';

class WaypointPanel extends React.Component {

  constructor(props){
    super(props);
    this.name = 'panel';
  }

  handleComplete(item){
    let selection = this._getSelection(item);
    Actions.toggleComplete(selection);
  }

  handleHover(item, status){
    let { context } = this.props;
    let selection = this._getSelection(item);
    Actions.setHighlight(selection, status, context);
  }

  selectCheckpoint(selection){
    let { id, title } = this.props.model;
    selection.waypoint = { id, title };

    selection.type = "checkpoint";

    Actions.setLevel(selection);
  }  

  _getSelection(item){
    let { model } = this.props;
    let { id } = model;
    let waypoint = { id };
    let checkpoint = { id: item };
    return { waypoint, checkpoint };
  }

  classes(){
    return classnames({
      [this.name]: true
    });
  }

  render() {
    let { mode, model, level, context } = this.props;
    let { id, title, image, curator, description, summary, checkpoints } = model;
    let isEditing = mode === 'curate';

    return (
      <section className={ this.classes() }>

        <section className={ `step_1 ${this.name}_header` }>
          <WaypointMap
            handleHover={ this.handleHover.bind(this) }
            handleComplete={ this.handleComplete.bind(this) }
            model={ model }/>
        </section>

        <section className={ `${this.name}_main` }>

          <hgroup className="panel_section">
            <Editable fieldName={ 'title' } value={ title } editing={ isEditing }/>
          </hgroup>

          <section className="panel_section meta">
            <p>Curator: { curator }</p>
          </section>

          <section className="panel_section">
            <h1>Summary</h1>
            <Editable fieldName={ 'summary' } value={ summary } editing={ isEditing }/>
          </section>

          { context === 'sidebar' && <DescriptionSection description={ description }/> }
          { context === 'card' && <TodoList title={ 'Checkpoints' }
              handleHover={ this.handleHover.bind(this) }
              handleComplete={ this.handleComplete.bind(this) }
              selectElement={ this.selectCheckpoint.bind(this) }
              collection={ checkpoints }/> }
        </section>
      </section>
    )
  }
};

WaypointPanel.propTypes = {
  model: React.PropTypes.object,
  mode: React.PropTypes.string,
  level: React.PropTypes.string
}

export default WaypointPanel;
