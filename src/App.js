import "./styles/App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import EventBox from "./components/EventBox";
import EventEntryForm from "./components/EventEntryForm";
import localforage from "localforage/dist/localforage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
      eventCountKeeper: this.props.count,
    };
  }
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
              onDelete={() => this.purgeEvent(event.id)}
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
    //Unhide the Event Entry Form
    var modal = document.getElementById("eventEntryContainer");
    modal.style.display = "block";
    document.getElementById("eventName").focus();
  };
  purgeEvent = (eventID) => {
    //If @param eventID is empty/undefined then purge all the events

    let { events, eventCountKeeper } = this.state;

    if (!eventID) {
      //Delete all from DB
      localforage.clear();
      this.setState({ events: [] });
    } else if (window.confirm("Are you sure you want to delete the event")) {
      events = events.filter((event) => event.id !== eventID); //Filter out the eventID from the EventList
      eventCountKeeper--;
      //Now delete from DB
      let toDelete = String(eventID); //Convert ID(int) to string, they are stored as strings in DB
      localforage.removeItem(toDelete).then(() => {
        this.setState({ events, eventCountKeeper });
      });
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
    let { events, eventCountKeeper } = this.state;

    let new_item = {
      id: eventCountKeeper++,
      name: eventName.value,
      eventDateTime: eventDateTime.value,
    };
    //Insert into DB
    localforage.setItem(String(new_item.id), new_item);
    //Insert into events array
    events.push(new_item);

    //Now clear the user-input text from the eventBox
    eventName.value = "";
    eventDateTime.value = "";
    //Now close the EventEntry Box
    this.closeEventBox();

    this.setState({ events, eventCountKeeper });
  };
  closeEventBox = () => {
    // Close/hide the eventEntryForm
    var eventEntryForm = document.getElementById("eventEntryContainer");
    eventEntryForm.style.display = "none";
  };
  expandEventBox = (eventBoxID) => {
    //Here we expand the eventBox to give more context about our event i.e Name,EventTime
    //Initially eventBox is set at 100px
    //For expansion, we change it to 300px
    //By default event name,time are hidden we resurface them when user clicks on Event Box
    //Function, if a user clicks the eventBox it expands and if the user clicks on it again it minimizes
    const eventBox = document.getElementById("Event" + eventBoxID);
    const detailsWrapper = document.getElementById("eventName" + eventBoxID);
    if (eventBox.offsetHeight === 100) {
      //To maximize the EventBox
      eventBox.style.height = "300px"; //Increases Height
      detailsWrapper.hidden = false; //unhides the Event Details
    } else {
      //To minimize the EventBox
      eventBox.style.height = "100px"; //Decreases Height
      detailsWrapper.hidden = true; //hides the Event Details
    }
  };
}

export default App;
