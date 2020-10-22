import React, { Component } from "react";
class CountDownTimer extends Component {
  state = {
    days: "XX",
    hours: "XX",
    minutes: "XX",
    seconds: "XX",
  };
  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <div className="countdown-wrapper">
        <div className="countdown-item">
          {days}
          <span> days</span>
        </div>
        <div className="countdown-item">
          {hours}
          <span> hours</span>
        </div>
        <div className="countdown-item">
          {minutes}
          <span> minutes</span>
        </div>
        <div className="countdown-item">
          {seconds}
          <span> seconds</span>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let userInputTime = new Date(this.props.eventTime);
    let currentDateTime = new Date(Date.now());
    let Difference_In_Time = Math.floor(
      (userInputTime.getTime() - currentDateTime.getTime()) / 1000
    );

    var daysLeft = Math.floor(Difference_In_Time / 86400);
    Difference_In_Time -= daysLeft * 86400;
    var hoursLeft = Math.floor(Difference_In_Time / 3600);
    Difference_In_Time -= hoursLeft * 3600;
    var minutesLeft = Math.floor(Difference_In_Time / 60);
    Difference_In_Time -= minutesLeft * 60;
    var secondsLeft = Difference_In_Time;

    this.interval = setInterval(() => {
      const days = daysLeft;
      const hours = hoursLeft;
      const minutes = minutesLeft;
      const seconds = secondsLeft;
      this.setState({ days, hours, minutes, seconds });
      if (secondsLeft > 0) {
        secondsLeft--;
      } else if (minutesLeft > 0) {
        minutesLeft--;
        secondsLeft = 59;
      } else if (hoursLeft > 0) {
        hoursLeft--;
        minutesLeft = 59;
        secondsLeft = 59;
      } else if (daysLeft > 0) {
        daysLeft--;
        hoursLeft = 23;
        minutesLeft = 59;
        secondsLeft = 59;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

export default CountDownTimer;
