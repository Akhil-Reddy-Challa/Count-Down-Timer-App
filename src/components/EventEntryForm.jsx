import React, { Component } from "react";
class EventEntryForm extends Component {
  render() {
    return (
      <div id="eventEntryContainer">
        <div className="text-center form-group" id="eventEntryForm">
          <i className="close fa fa-times" onClick={this.props.onClose}></i>
          <label htmlFor="exampleInputEmail1">Give a Name</label>
          <input
            type="text"
            className="form-control"
            id="eventName"
            placeholder="Event name"
          />
          <label htmlFor="exampleInputEmail1">Pick a Time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="eventDateTime"
          ></input>
          <label htmlFor="exampleFormControlTextarea1">Notes</label>
          <textarea className="form-control" id="userNotes" rows="3"></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Max limit is 100 chars
          </small>
          <button
            onClick={this.props.onClick}
            type="submit"
            className="btn btn-primary m-2"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default EventEntryForm;
