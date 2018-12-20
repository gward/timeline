import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { ViewPage } from './ViewPage';

export class ThumbnailList extends Component {
  render() {
    let photoPage = ({ match }) => (
      <ViewPage project={this.props.project} view_id={match.params.id} />);

    let thumbnailItem = (viewpair) => {
      let view_id = viewpair[0];
      let img_path = viewpair[1];
      let desc = this.props.project.views[view_id];
      return (
        <li key={view_id} className="list-group-item">
          <Link to={view_id}><img src={img_path} alt=""/>{desc}</Link>
        </li>
      );
    };

    let thumbnailList = () => {
      let thumbnailItems = Object.entries(this.props.project.thumbnails)
          .map(thumbnailItem);
      let thumbnailList = <ul className="list-group">{thumbnailItems}</ul>;
      return thumbnailList;
    };

    return (
      <Router>
      <div>
        <Route path="/" exact component={thumbnailList} />
        <Route path="/:id" component={photoPage} />
      </div>
      </Router>
    );
  }
}
