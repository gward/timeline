import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap';

export class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {
      photoIndex: -1,
      last: false,
      delay: 3000,              // ms per day
    };

    this.nextDay = this.nextDay.bind(this);
    this.actionSlower = this.actionSlower.bind(this);
    this.actionFaster = this.actionFaster.bind(this);
  }

  componentDidMount() {
    this.nextDay();
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
        <img style={{width: "100%"}} src={photos[index].path} alt="" />
        <ButtonGroup>
          <Button>Backwards</Button>
          <Button onClick={this.actionSlower}>Slower</Button>
          <Button>Pause</Button>
          <Button
            onClick={this.actionFaster}
            disabled={this.state.delay < 500}>Faster</Button>
          <Button>Forwards</Button>
        </ButtonGroup>
        <span>(current speed: {this.state.delay/1000} sec/day}</span>
      </div>
    );
  }

  nextDay() {
    let photos = this.props.view.photos;
    let index = this.state.photoIndex;
    let last = (index + 1 === photos.length - 1);
    this.setState({photoIndex: index + 1, last})

    if (!last) {
      this.timeout = setTimeout(this.nextDay, this.state.delay);
    }
  }

  actionSlower() {
    this.setState({delay: this.state.delay + 500});
  }

  actionFaster() {
    let delay = this.state.delay;
    if (delay < 500) {
      return;
    }
    delay -= 500;
    this.setState({delay});
  }
}
