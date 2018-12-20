import React, { Component } from 'react';

export class ViewPage extends Component {
  render() {
    let view_id = this.props.view_id;
    let desc = this.props.project.views[view_id];
    let photos = this.props.project.photos[view_id];
    return (
      <div>
        <h1>{desc}</h1>
        <img src={"photos/" + photos[0].path} alt="" />
      </div>
    );
  }
}
