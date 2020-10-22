import React, { Component } from "react";
import CountDownTimer from "./CountDownTimer";
class EventBox extends Component {
  render() {
    const { id, eventDateTime, name } = this.props.event;
    return (
      <React.Fragment>
        <div
          id={"Event" + id}
          onClick={this.props.onClick}
          className="timerBox"
        >
          <CountDownTimer eventTime={eventDateTime} />
          <div hidden={true} id={"eventName" + id}>
            <p>{"Name: " + name}</p>
            <p>{"Event Date: " + eventDateTime}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EventBox;
