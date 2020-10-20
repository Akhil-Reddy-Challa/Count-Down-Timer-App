import React, { Component } from "react";
import "./cssFiles/styles.css";
class Main extends Component {
  state = { events: [] };
  render() {
    return (
      <div className="container-fullwidth">
        <nav className="navbar navbar-dark bg-dark">
          <a href="/#" className="navbar-brand">
            <i className="fa fa-list-ul" aria-hidden="true" /> Count Down Timer
          </a>
        </nav>
        <button
          // onClick={this.createNewEvent}
          onClick={this.createNewEvent}
          className="btn btn-primary rounded-pill m-2"
        >
          <i className="fa fa-plus-circle" /> New Event
        </button>
        <button
          onClick={() => this.purgeEvent()}
          className="btn btn-danger rounded-pill m-2"
        >
          <i className="fa fa-trash" /> Delete-All
        </button>
        <table id="eventsTable" className="table">
          <thead>
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">Event Date</th>
              <th scope="col">ETA</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.eventDate}</td>
                <td id={event.id}>{event.ETA}</td>
                <td>
                  <button
                    onClick={() => this.purgeEvent(event.id)}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-minus-circle" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div id="eventEntryBox" className="eventEntry">
          <div className="text-center form-group" id="eventEntryForm">
            <i className="close fa fa-times" onClick={this.closeEventBox}></i>
            <label htmlFor="exampleInputEmail1">Give a Name</label>
            <input
              type="text"
              className="form-control"
              id="eventName"
              placeholder="Event name"
            />
            <label htmlFor="exampleInputEmail1">Pick a Time</label>
            <input type="date" className="form-control" id="eventTime"></input>
            <button
              onClick={this.handleNewEvent}
              type="submit"
              className="btn btn-primary m-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
  createNewEvent = () => {
    var modal = document.getElementById("eventEntryBox");
    modal.style.display = "block";
  };
  closeEventBox = () => {
    // Get the eventEntryForm
    var eventEntryForm = document.getElementById("eventEntryBox");
    eventEntryForm.style.display = "none";
  };
  handleNewEvent = () => {
    //Start Form validation
    let eventName = document.getElementById("eventName");
    let eventTime = document.getElementById("eventTime");
    //Check if they are null
    if (!eventName.value || !eventTime.value) {
      alert("Event Name or Time missing");
      return;
    }
    //At this point user entered all the fields
    else {
      let allEvents = this.state.events.slice();
      let length = allEvents.length;
      allEvents.push({
        id: length + 1,
        name: eventName.value,
        eventDate: eventTime.value,
        ETA: "DD:HH:MM:SS",
      });
      this.setState({ events: allEvents });
      //Now close the EventEntry Box
      this.closeEventBox();
    }
  };
  purgeEvent = (eventID) => {
    //If @param eventID is empty/undefined then purge all the events
    if (!eventID) this.setState({ events: [] });
    else {
      let allEvents = this.state.events.slice();
      allEvents = allEvents.filter((event) => event.id !== eventID); //Filter out the eventID from the EventList
      this.setState({ events: allEvents });
    }
  };
  calculateETA = () => {
    let allEvents = this.state.events.slice();
    for (let event of allEvents) {
      let userInputTime = event.eventDate;

      userInputTime = new Date(userInputTime); //Convert to Date Object
      userInputTime.setHours(0, 0, 1); //Set the Time to MidNight

      //Fetch the current DateTime
      let currentDateTime = new Date(Date.now());

      let Difference_In_Time =
        currentDateTime.getTime() - userInputTime.getTime();

      if (Difference_In_Time > 0) {
        //userInput date should be always a FUTURE date
        //if Difference_In_Time is greater than 0 then user selected past dateTime
        alert("Please select a Future Date");
      } else {
        Difference_In_Time = Math.abs(Difference_In_Time); //Converts negative number to positive
        let elapsedSeconds = Math.ceil(Difference_In_Time / 1000); //Only divide with Millisecond
        this.printCountDown(elapsedSeconds, event.id);
      }
    }
  };
  printCountDown = async (seconds, eventId) => {
    var daysLeft = Math.floor(seconds / 86400); //get Number of Days divide with (Seconds * Minutes * Hours)
    seconds -= daysLeft * 86400; //As we use FLOOR above, get the leftOver seconds by multiplying with 86400
    var hoursLeft = Math.floor(seconds / 3600); //get Number of Hours divide with (Seconds * Minutes)
    seconds -= hoursLeft * 3600; //As we use FLOOR above, get the leftOver seconds by multiplying with 3600
    var minutesLeft = Math.floor(seconds / 60); //get Number of Hours divide with (Seconds)
    seconds -= minutesLeft * 60; //As we use FLOOR above, get the leftOver seconds by multiplying with 60
    var secondsLeft = seconds; //Assign the leftOver seconds

    //console.log("Elapsed DD:HH:MM:SS",daysLeft,hoursLeft,minutesLeft,secondsLeft);
    let etaField = document.getElementById(eventId);

    //Time countdown logic
    while (true) {
      this.timePrinter(etaField, daysLeft, hoursLeft, minutesLeft, secondsLeft);

      while (secondsLeft > 0) {
        this.timePrinter(
          etaField,
          daysLeft,
          hoursLeft,
          minutesLeft,
          secondsLeft
        );
        await this.sleep(1000);
        secondsLeft--;
      }
      if (minutesLeft > 0) {
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
      } else break;
    }
  };
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  timePrinter = (html, d, h, m, s) => {
    html.innerText = "".concat(d, " : ", h, " : ", m, " : ", s);
  };
  componentDidUpdate() {
    if (this.state.events.length > 0) this.calculateETA();
  }
}
export default Main;
