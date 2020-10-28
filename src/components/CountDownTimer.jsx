import React, { Component } from "react";
import "../styles/CountDownTimerStyles.css";
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
      <div className="countDownContainer">
        <div className="clock-column">
          <p className="clock-timer">{days}</p>
          <p className="clock-label">Days</p>
        </div>

        <div className="clock-column">
          <p className="clock-timer">{hours}</p>
          <p className="clock-label">Hours</p>
        </div>

        <div className="clock-column">
          <p className="clock-timer">{minutes}</p>
          <p className="clock-label">Minutes</p>
        </div>

        <div className="clock-column">
          <p className="clock-timer">{seconds}</p>
          <p className="clock-label">Seconds</p>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let userInputTime = new Date(this.props.eventTime);
    let currentDateTime = new Date(Date.now());
    let Difference_In_Time = Math.floor(
      (userInputTime.getTime() - currentDateTime.getTime()) / 1000
    ); //Divide by millisecond

    var daysLeft = Math.floor(Difference_In_Time / 86400); //Divide by 60(1 minute),60(1 hour),24(1 day)
    Difference_In_Time -= daysLeft * 86400;
    var hoursLeft = Math.floor(Difference_In_Time / 3600); //Divide by 60(1 minute),60(1 hour)
    Difference_In_Time -= hoursLeft * 3600;
    var minutesLeft = Math.floor(Difference_In_Time / 60); //Divide by 60(1 minute)
    Difference_In_Time -= minutesLeft * 60;
    var secondsLeft = Difference_In_Time; //We will have few seconds left

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
