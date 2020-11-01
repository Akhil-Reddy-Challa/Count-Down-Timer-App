import React, { Component } from "react";
import CountDownTimer from "./CountDownTimer";
class EventBox extends Component {
  render() {
    const { id, eventDateTime, name, userNote } = this.props.event;
    return (
      <React.Fragment>
        <div
          id={"Event" + id}
          onClick={this.props.onClick}
          className="timerBox"
        >
          <div className="eventNameDisplayer">{this.compressText(name)}</div>
          <CountDownTimer
            eventTime={eventDateTime}
            eventID={id}
            eventName={name}
          />
          <div hidden={true} id={"eventName" + id}>
            <p>{"Event: " + name}</p>
            <p>{"Date: " + new Date(eventDateTime).toDateString()}</p>
            <p>{userNote}</p>
            <button onClick={this.props.onDelete} className="btn btn-danger">
              <i className="fa fa-minus-circle" /> Delete
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
  compressText = (eventName) => {
    //If our eventName is greater than 10 chars, compress it
    return eventName.length > 10
      ? eventName.substring(0, 10) + "..."
      : eventName;
  };
}

export default EventBox;
