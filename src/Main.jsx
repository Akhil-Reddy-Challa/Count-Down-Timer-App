import React, { Component } from "react";
// import Event from "./components/Event";
//import NavBar from "./components/NavBar";

class Main extends Component {
  state = { events: [{ id: 1, ETA: "DD:HH:MM:SS" }] };
  render() {
    return (
      <div className="container-fullwidth">
        <nav className="navbar navbar-dark bg-dark">
          <a href="/#" className="navbar-brand">
            Count Down Timer
          </a>
        </nav>
        <button
          onClick={this.createNewEvent}
          className="btn btn-primary rounded-pill m-2"
        >
          New Event
        </button>
        <button
          onClick={() => this.purgeEvent()}
          className="btn btn-danger rounded-pill m-2"
        >
          Delete-All
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
              <tr key={event.id}>
                <td>Event-{event.id}</td>
                <td>{event.ETA}</td>
                <td>
                  <button
                    onClick={() => this.purgeEvent(event.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  createNewEvent = () => {
    let allEvents = this.state.events.slice();
    let length = allEvents.length;

    allEvents.push({ id: length + 1, ETA: "DD:HH:MM:SS" });
    this.setState({ events: allEvents });
  };
  purgeEvent = (eventID) => {
    //If @param eventID is empty/undefined then purge all the events
    if (!eventID) this.setState({ events: [] });
    else {
      console.log("Deleting a specific Event", eventID);
      let allEvents = this.state.events.slice();
      allEvents = allEvents.filter((event) => event.id !== eventID); //Filter out the eventID from the EventList
      this.setState({ events: allEvents });
    }
  };
}
export default Main;
