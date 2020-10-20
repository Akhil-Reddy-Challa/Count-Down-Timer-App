import React, { Component } from "react";
class Event extends Component {
  render() {
    return (
      <React.Fragment>
        <td>Event-{this.props.id}</td>
        <td>HH:MM:SS</td>
        <td>
          <button onClick={this.handleDelete} className="btn btn-danger">
            Delete
          </button>
        </td>
      </React.Fragment>
    );
  }
  handleDelete = () => {
    console.log(this.props.id, "request to Delete");
  };
}

export default Event;
