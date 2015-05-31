import React from 'react';
import R from 'ramda';
import TodoListItem from './TodoListItem.jsx';


class TodoList extends React.Component {

  render() {
    let { collection, title, handleComplete, handleHover, selectElement } = this.props;

    let items = R.mapIndexed((item, index) => {

      return (
        <TodoListItem key={ index }
          handleComplete={ handleComplete }
          handleHover={ handleHover }
          selectElement = { selectElement }
          item={ item }/>
      )
    }, collection);

    return (
      <section className="panel_section todolist">
        <h1>{ title }</h1>
        <ul>
          { items }
        </ul>
      </section>
    )
  }
};

TodoList.defaultProps = {
  title: 'Items'
}

TodoList.propTypes = {
  title: React.PropTypes.string,
  collection: React.PropTypes.array.isRequired,
  handleComplete: React.PropTypes.func.isRequired,
  handleHover: React.PropTypes.func.isRequired
}

export default TodoList;
