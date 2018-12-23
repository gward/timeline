import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { ViewPage } from './ViewPage';

export class ThumbnailList extends Component {
  render() {
    let viewMap = {};
    this.props.project.views.map((view) => (viewMap[view.id] = view));

    let photoPage = ({ match }) => {
      let view = viewMap[match.params.id];
      return <ViewPage project={this.props.project} view={view} />;
    }

    let thumbnailItem = (view) => {
      return (
        <Link to={view.id}>
          <li key={view.id} className="list-group-item">
            <img src={view.thumbnail} alt=""/>{view.desc}
          </li>
        </Link>
      );
    };

    let thumbnailList = () => {
      let thumbnailItems = this.props.project.views.map(thumbnailItem);
      return <ul className="list-group">{thumbnailItems}</ul>;
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
