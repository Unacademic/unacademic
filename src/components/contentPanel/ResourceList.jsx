import React from 'react';
import R from 'ramda';
import ResourceListItem from './ResourceListItem.jsx';

class ResourceList extends React.Component {

  render() {
    let { resources, selectResource } = this.props;
    let resourceList = R.map(( {title, id, type} ) => {
      let newTitle = title.substring(0, 45);
      return (
        <ResourceListItem key={ id }
          handleClick={ selectResource.bind(this) }
          title={ title } 
          id={ id } 
          type={ type } />
       )
      }, resources );

    return (
      <section className="resourcelist">
        <h1>Resources</h1>
        <ul>
          { resourceList }
        </ul>
      </section>
    );
  }
}

ResourceList.propTypes = {
  resources: React.PropTypes.array
};

export default ResourceList;
