import React, { Component } from "react";
import Event from "./components/Event";
class Main extends Component {
  state = { events: [1] };
  render() {
    return (
      <div className="container-fullwidth">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand">Count Down Timer</a>
        </nav>
        <button onClick={this.createNewEvent} className="btn btn-primary">
          New Event
        </button>
        <table id="eventsTable" className="table">
          <thead>
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">Count Down</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.events.map((event) => (
              <tr key={event}>
                <Event id={event} onClick={this.handleDelete} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  createNewEvent = () => {
    let allEvents = this.state.events.slice();
    allEvents.push(allEvents.length + 1);
    this.setState({ events: allEvents });
  };
}
export default Main;
