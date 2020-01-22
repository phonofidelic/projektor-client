import React, { Component, useEffect, useState } from 'react';
import moment from 'moment';
// import momentDurationFormatSetup from 'moment-duration-format';

// Adapted from: https://medium.com/@peterjd42/building-timers-in-react-stopwatch-and-countdown-bc06486560a2
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delta: 0
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  startTimer = () => {
    this.setState({
      delta: Date.now() - this.props.currentTime
    });

    this.timer = setInterval(() => {
      this.props.setTime(Date.now() - this.state.delta);
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
  };

  render() {
    return moment
      .duration(this.props.currentTime, 'ms')
      .format('hh:mm:ss', { trim: false });
  }
}

function _Timer(props) {
  const { currentTime, active, setTime } = props;
  // const [start, setStart] = useState(0);
  // const [time, setTime] = useState(0);

  console.log('====================================');
  console.log('Timer, currentTime:', currentTime);
  console.log('====================================');

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setTime(() => Date.now() - currentTime);
      }, 1000);
    } else if (!active && currentTime !== 0) {
      clearInterval(interval);
    }
    return clearInterval(interval);
  }, [active, currentTime]);

  return moment.duration(currentTime, 'ms').format('hh:mm:ss', { trim: false });
}

export default Timer;
