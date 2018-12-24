import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap';

export class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {
      photoIndex: -1,
      last: false,
      forward: true,            // direction of playback
      delay: 3000,              // ms per day
    };

    this.previousDay = this.previousDay.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.actionReverse = this.actionReverse.bind(this);
    this.actionForward = this.actionForward.bind(this);
    this.actionSlower = this.actionSlower.bind(this);
    this.actionFaster = this.actionFaster.bind(this);
    this.actionRestart = this.actionRestart.bind(this);
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
          <Button
            onClick={this.actionReverse}
            disabled={!this.state.forward}>Reverse</Button>
          <Button onClick={this.actionSlower}>Slower</Button>
          <Button>Pause</Button>
          <Button
            onClick={this.actionFaster}
            disabled={this.state.delay < 500}>Faster</Button>
          <Button
            onClick={this.actionForward}
            disabled={this.state.forward}>Forward</Button>
          <Button onClick={this.actionRestart}>Restart</Button>
        </ButtonGroup>
        <span>(current speed: {this.state.delay/1000} sec/day}</span>
      </div>
    );
  }

  previousDay() {
    let index = this.state.photoIndex;
    let last = false;
    //console.log(`previousDay(): index = ${index}, last = ${last}`);
    if (index <= 0) {
      return;
    }
    this.setState({photoIndex: index - 1, last});
    this.timeout = setTimeout(this.previousDay, this.state.delay);
  }

  nextDay() {
    let photos = this.props.view.photos;
    let index = this.state.photoIndex;
    let last = (index + 1 === photos.length - 1);
    //console.log(`nextDay(): index = ${index}, last = ${last}`);
    this.setState({photoIndex: index + 1, last});

    if (!last) {
      this.timeout = setTimeout(this.nextDay, this.state.delay);
    }
  }

  actionReverse() {
    if (!this.state.forward) {  // already going backwards
      return;
    }

    clearTimeout(this.timeout);
    this.setState({forward: false});
    this.timeout = setTimeout(this.previousDay, this.state.delay);
  }

  actionForward() {
    if (this.state.forward) {   // already going forward
      return;
    }

    clearTimeout(this.timeout);
    this.setState({forward: true});
    this.timeout = setTimeout(this.nextDay, this.state.delay);
  }

  actionSlower() {
    let delay = this.state.delay;
    delay += 500;
    this.setState({delay});
  }

  actionFaster() {
    let delay = this.state.delay;
    if (delay < 500) {
      return;
    }
    delay -= 500;
    this.setState({delay});
  }

  actionRestart() {
    clearTimeout(this.timeout);
    this.setState({photoIndex: -1, forward: true});
    this.timeout = setTimeout(this.nextDay, 0);
  }
}
