import React, { Component } from 'react';

import './App.css';
import { ThumbnailList } from './ThumbnailList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {project: null};
  }

  componentDidMount() {
    fetch('project.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((project) => {
        this.setState({project});
      });
  }

  render() {
    if (this.state.project === null) {
      return null;
    }

    return (
      <div className="container">
        <ThumbnailList project={this.state.project} />
      </div>
    );
  }
}

export default App;
