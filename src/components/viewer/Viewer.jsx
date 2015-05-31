import React from 'react';

class Viewer extends React.Component {

  parse(data) {

    // read from config file? perhaps better than declaring here!
    let iframe_able = true;

    if(data.content === null)
      if(data.media.hasOwnProperty('html')) {
        let html_link = '<div><a href=' + data.url + ' target="_blank">' + data.title + '</a></div><br>';
        return  html_link + data.media.html;
      }

      else {
        let https = 'https'
        if(data.url.substring(0, https.length) === https || !iframe_able) {
          let warning = '<warning>The current resource could not be loaded...<br>'
          warning += '<img src="https://nyobetabeat.files.wordpress.com/2012/06/anigif_777-2432-1303312751-40.gif"/>'
          warning += '<br><br>Please refer to the following link:\n'
          return warning + '<div><a href=' + data.url + ' target="_blank">' + data.title + '</a></div></warning>'
        } else {
          let html_link = '<div><a href=' + data.url + ' target="_blank">' + data.title + '</a></div><br>';
          return html_link + '<iframe frameborder="0" src=' + data.url + '>' + data.url + '</iframe>'
        }
      }
      let html_link = '<div><a href=' + data.url + ' target="_blank">' + data.title + '</a></div><br>';
      return html_link + data.content
  }

  render() {
    //let data = this.props.data
    let html_content = this.parse(this.props.data)

    return (
      <div className="viewer">
        <div className="content" dangerouslySetInnerHTML={{__html: html_content}} />
      </div>
    );
  }

}

Viewer.propTypes = {
  data: React.PropTypes.object.isRequired
}

export default Viewer;
