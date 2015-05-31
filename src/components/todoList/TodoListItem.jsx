import React from 'react';
import R from 'ramda';

class TodoListItem extends React.Component {

  render() {
    let { item, handleComplete, handleHover, selectElement } = this.props;

    let title = item.title;
    let id = item.id;

    let selection = {id, title};

    if(item.title.length > 28){
      title = item.title.substring(0, 28) + ' ...';
    } else {
      title = item.title;
    }

    let isComplete = item.complete ? 'complete' : 'incomplete';
    let classes = ['todolist_item']

    if(item.highlight){
      classes.push('todolist_item-is-highlighted')
    }

    return (
      <li onMouseOut={ handleHover.bind(this, id, false) }
        onMouseOver={ handleHover.bind(this, id, true) }
        className={ classes.join(' ') }>
          <p>            
            <span className={ `checkbox checkbox-is-${isComplete}` } onClick={ handleComplete.bind(this, id) }></span>
            <span onClick={ selectElement.bind(this, selection) }>{ title }</span>
          </p>
      </li>
    )
  }
};

TodoListItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  handleComplete: React.PropTypes.func.isRequired,
  handleHover: React.PropTypes.func.isRequired,
}

export default TodoListItem;
