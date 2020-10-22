import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import EventBox from "./components/EventBox";
import EventEntryForm from "./components/EventEntryForm";

class App extends Component {
  state = {
    events: [
      { id: 1, name: "Event-1(ABC)", eventDateTime: "2020-10-24T17:24" },
      { id: 2, name: "Event-2(DEF)", eventDateTime: "2020-10-25T13:55" },
      { id: 3, name: "Event-3(XYZ)", eventDateTime: "2020-10-26T13:55" },
    ],
  };
  render() {
    return (
      <div className="container-fullwidth">
        <NavBar
          onClick={this.createNewEvent}
          onDelete={() => this.purgeEvent()}
        />
        <div className="container-fullwidth">
          {this.state.events.map((event) => (
            <EventBox
              key={event.id}
              event={event}
              onClick={() => this.expandEventBox(event.id)}
            />
          ))}
        </div>
        <EventEntryForm
          onClick={this.handleNewEvent}
          onClose={this.closeEventBox}
        />
      </div>
    );
  }
  createNewEvent = () => {
    var modal = document.getElementById("eventEntryBox");
    modal.style.display = "block";
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
  handleNewEvent = () => {
    //Start Form validation
    let eventName = document.getElementById("eventName");
    let eventDateTime = document.getElementById("eventDateTime");
    //Check if they are null
    if (!eventName.value || !eventDateTime.value) {
      alert("Event Name or Time missing");
      return;
    }
    //At this point user entered all the fields
    //Check if user entered past Date
    let currentTime = new Date(Date.now()).getTime();
    let userInputTime = new Date(eventDateTime.value).getTime();

    if (userInputTime <= currentTime) {
      alert("Please select a future date");
      return;
    }
    let allEvents = this.state.events.slice();
    let length = allEvents.length;
    allEvents.push({
      id: length + 1,
      name: eventName.value,
      eventDateTime: eventDateTime.value,
    });
    this.setState({ events: allEvents });
    //Now clear the user-input text from the eventBox
    eventName.value = "";
    eventDateTime.value = "";
    //Now close the EventEntry Box
    this.closeEventBox();
  };
  closeEventBox = () => {
    // Get the eventEntryForm
    var eventEntryForm = document.getElementById("eventEntryBox");
    eventEntryForm.style.display = "none";
  };
  expandEventBox = (eventBoxID) => {
    var x = document.getElementById("Event" + eventBoxID);

    x.style.height = "300px";

    var y = document.getElementById("eventName" + eventBoxID);

    y.hidden = false;
  };
}

export default App;
