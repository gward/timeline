import React, { Component } from 'react';

export class ThumbnailList extends Component {
  render() {
    let thumbnailItem = (viewpair) => {
      let view_id = viewpair[0];
      let img_path = viewpair[1];
      let desc = this.props.project.views[view_id];
      return (
        <li key={view_id} className="list-group-item">
          <a href={view_id}><img src={img_path}/>{desc}</a>
        </li>
      );
    };
    let thumbnailItems = Object.entries(this.props.project.thumbnails)
        .map(thumbnailItem);

    return (
      <div>
        <ul className="list-group">{thumbnailItems}</ul>
      </div>
    );
  }
}
