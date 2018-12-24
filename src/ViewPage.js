import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap';

export class ViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: null,
      photoIndex: -1,
      last: false,
      forward: true,            // direction of playback
      delay: 3000,              // ms per day
    };

    this.previousDay = this.previousDay.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.actionReverse = this.actionReverse.bind(this);
    this.actionForward = this.actionForward.bind(this);
    this.actionTogglePlayback = this.actionTogglePlayback.bind(this);
    this.actionSlower = this.actionSlower.bind(this);
    this.actionFaster = this.actionFaster.bind(this);
    this.actionRestart = this.actionRestart.bind(this);
  }

  componentDidMount() {
    this.nextDay();
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
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
          <Button
            onClick={this.actionTogglePlayback}
            disabled={this.state.last}>
           {this.state.timeout == null ? "Play" : "Pause"}</Button>
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
    let timeout = setTimeout(this.previousDay, this.state.delay);
    this.setState({photoIndex: index - 1, last, timeout});
  }

  nextDay() {
    let photos = this.props.view.photos;
    let index = this.state.photoIndex;
    let last = (index + 1 === photos.length - 1);
    //console.log(`nextDay(): index = ${index}, last = ${last}`);

    let timeout;
    if (!last) {
      timeout = setTimeout(this.nextDay, this.state.delay);
    }
    this.setState({photoIndex: index + 1, last, timeout});
  }

  actionReverse() {
    if (!this.state.forward) {  // already going backwards
      return;
    }

    clearTimeout(this.state.timeout);
    let timeout = setTimeout(this.previousDay, this.state.delay);
    this.setState({forward: false, timeout});
  }

  actionForward() {
    if (this.state.forward) {   // already going forward
      return;
    }

    clearTimeout(this.state.timeout);
    let timeout = setTimeout(this.nextDay, this.state.delay);
    this.setState({forward: true, timeout});
  }

  actionTogglePlayback() {
    let timeout;
    if (this.state.timeout == null) {
      // currently paused: play (unless already at the end)
      if (this.state.last) {
        return;
      }
      let func = this.state.forward ? this.nextDay : this.previousDay;
      timeout = setTimeout(func, 0);
    } else {
      // currently playing: pause
      clearTimeout(this.state.timeout);
      timeout = null;
    }
    this.setState({timeout});
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
    clearTimeout(this.state.timeout);
    let timeout = setTimeout(this.nextDay, 0);
    this.setState({photoIndex: -1, forward: true, timeout});
  }
}
