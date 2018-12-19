import React, { Component } from 'react';

export class ThumbnailList extends Component {
  render() {
    let thumbnailItem = (viewpair) => {
      let view_id = viewpair[0];
      let img_path = viewpair[1];
      return (
        <li key={view_id}>
          <a href={view_id}><img src={img_path}/>{view_id}</a>
        </li>
      );
    };
    let thumbnailItems = Object.entries(this.props.project.thumbnails)
        .map(thumbnailItem);

    return (
      <div>
        <ul>{thumbnailItems}</ul>
      </div>
    );
  }
}
