import "./styles/App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import EventBox from "./components/EventBox";
import EventEntryForm from "./components/EventEntryForm";
import * as Database from "localforage/dist/localforage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEvents: this.props.allEvents,
      eventCountKeeper: this.props.count,
    };
  }
  render() {
    return (
      <div className="container-fullwidth">
        <NavBar onClick={this.handleNewEvent} onDelete={this.purgeAllEvents} />
        <div className="container-fullwidth">
          {this.state.allEvents.map((event) => (
            <EventBox
              key={event.id}
              event={event}
              onClick={() => this.expandEventEntryForm(event.id)}
              onDelete={() => this.purgeEvent(event.id)}
            />
          ))}
        </div>
        <EventEntryForm
          onClick={this.createNewEvent}
          onClose={this.closeEventEntryForm}
        />
      </div>
    );
  }
  handleNewEvent = () => {
    //Unhide the Event Entry Form
    var modal = document.getElementById("eventEntryContainer");
    modal.style.display = "block";
    document.getElementById("eventName").focus(); //This will set the focus on the input box
  };
  createNewEvent = () => {
    //1) Perform Form validation
    let eventName = document.getElementById("eventName");
    let eventDateTime = document.getElementById("eventDateTime");
    let userEnteredNotes = document.getElementById("userNotes").value;

    //(a) Check if eventName/Date are blank
    if (!eventName.value || !eventDateTime.value) {
      alert("Event Name or Time missing");
      return;
    } //At this point user entered all the fields

    //2) Check if user entered past Date
    let currentTime = new Date(Date.now()).getTime();
    let userInputTime = new Date(eventDateTime.value).getTime();

    if (userInputTime <= currentTime) {
      alert("Please select a future date");
      return;
    } //Form Validation completed

    //4) Insert Data into DB
    let { allEvents, eventCountKeeper } = this.state;

    //Create new DB object
    let new_item = {
      id: ++eventCountKeeper,
      name: eventName.value,
      eventDateTime: eventDateTime.value,
      userNote: userEnteredNotes,
    };
    //Insert into DB
    Database.setItem(String(new_item.id), new_item);
    //Insert into events array
    allEvents.push(new_item);

    //Now clear the user-input text from the eventBox
    eventName.value = "";
    eventDateTime.value = "";
    //Now close the EventEntry Box
    this.closeEventEntryForm();

    this.setState({ allEvents, eventCountKeeper });
  };
  purgeEvent = (eventID) => {
    let { allEvents, eventCountKeeper } = this.state;
    //1) Get confirmation from the user about deletion
    if (window.confirm("Are you sure you want to delete the event")) {
      // 2) Filter out the eventID from the EventList
      allEvents = allEvents.filter((event) => event.id !== eventID);
      //3) Now delete from DB
      let toDelete = String(eventID); //Convert ID(int) to string, they are stored as strings in DB
      Database.removeItem(toDelete).then(() => {
        // 4) Set the state to reflect the changes
        this.setState({ allEvents, eventCountKeeper });
      });
    }
  };
  purgeAllEvents = () => {
    let { allEvents, eventCountKeeper } = this.state;
    //Delete all from DB
    Database.clear();
    allEvents = [];
    eventCountKeeper = 0;
    this.setState({ allEvents, eventCountKeeper }); //Set the state to blank
  };
  closeEventEntryForm = () => {
    // Close/hide the eventEntryForm
    var eventEntryForm = document.getElementById("eventEntryContainer");
    eventEntryForm.style.display = "none";
  };
  expandEventEntryForm = (eventBoxID) => {
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
