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
            <p>{"Event: " + name}</p>
            <p>{"Date: " + new Date(eventDateTime).toDateString()}</p>
            <button onClick={this.props.onDelete} className="btn btn-danger">
              <i className="fa fa-minus-circle" /> Delete
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EventBox;