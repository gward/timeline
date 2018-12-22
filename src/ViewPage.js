import React, { Component } from 'react';

export class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.delay = 3000;          // ms per day
    this.state = {photoIndex: -1, last: false};

    this.nextPhoto = this.nextPhoto.bind(this);
  }

  componentDidMount() {
    this.nextPhoto();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    let index = this.state.photoIndex;
    if (index === -1) {
      return null;
    }

    let desc = this.props.view.desc;
    let photos = this.props.view.photos;
    let last = this.state.last ? <span> (FIN)</span> : null;
    return (
      <div>
        <h1>{photos[index].date}: {desc}{last}</h1>
        <img src={photos[index].path} alt="" />
      </div>
    );
  }

  nextPhoto() {
    let photos = this.props.view.photos;
    let index = this.state.photoIndex;
    let last = (index + 1 === photos.length - 1);
    this.setState({photoIndex: index + 1, last})

    if (!last) {
      this.timeout = setTimeout(this.nextPhoto, this.delay);
    }
  }
}
