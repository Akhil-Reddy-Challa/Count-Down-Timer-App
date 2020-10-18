import React, { Component } from "react";
import "./cssFiles/styles.css";

class CountDownTimer extends Component {
  triggerEvent = () => {
    let eventName = document.getElementById("eventName").value;
    let userInputTime = document.getElementById("userInputTime").value;

    //Check if user entered an event Name and picked a Date
    if (!eventName || !userInputTime) {
      alert("Event name (or) Date missing");
      return;
    }
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
      document.getElementById("eventNameDisplayer").innerText =
        "ETA for your " + eventName + " is"; //Set the Text for ETA
      this.printCountDown(elapsedSeconds);
    }
  };
  printCountDown = async (seconds) => {
    var daysLeft = Math.floor(seconds / 86400); //get Number of Days divide with (Seconds * Minutes * Hours)
    seconds -= daysLeft * 86400; //As we use FLOOR above, get the leftOver seconds by multiplying with 86400

    var hoursLeft = Math.floor(seconds / 3600); //get Number of Hours divide with (Seconds * Minutes)
    seconds -= hoursLeft * 3600; //As we use FLOOR above, get the leftOver seconds by multiplying with 3600

    var minutesLeft = Math.floor(seconds / 60); //get Number of Hours divide with (Seconds)
    seconds -= minutesLeft * 60; //As we use FLOOR above, get the leftOver seconds by multiplying with 60

    var secondsLeft = seconds; //Assign the leftOver seconds

    //console.log("Elapsed DD:HH:MM:SS",daysLeft,hoursLeft,minutesLeft,secondsLeft);

    let { dL, hL, mL, sL } = this.getHTMLElements();
    //Time countdown logic
    while (true) {
      dL.innerText = daysLeft; //Printer
      hL.innerText = hoursLeft; //Printer
      mL.innerText = minutesLeft; //Printer
      sL.innerText = secondsLeft; //Printer
      while (secondsLeft > 0) {
        sL.innerText = secondsLeft; //Printer
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
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  getHTMLElements = () => {
    let dL = document.getElementById("daysLeft");
    let hL = document.getElementById("hoursLeft");
    let mL = document.getElementById("minutesLeft");
    let sL = document.getElementById("secondsLeft");
    return { dL, hL, mL, sL };
  };
  render() {
    return (
      <div>
        <p>Enter the Event Name</p>
        <input type="text" placeholder="Event Name" id="eventName"></input>
        <p>Pick an Date</p>
        <input type="date" id="userInputTime"></input>
        <br></br>
        <br></br>
        <button onClick={() => this.triggerEvent()}>Submit</button>
        <p id="eventNameDisplayer"></p>
        <table>
          <tbody>
            <tr id="timeDisplayArea">
              <td id="daysLeft">DD</td>
              <td id="hoursLeft">HH</td>
              <td id="minutesLeft">MM</td>
              <td id="secondsLeft">SS</td>
            </tr>
            <tr id="ETA_Labels">
              <td>Days Left</td>
              <td>Hours Left</td>
              <td>Minutes Left</td>
              <td>Seconds Left</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default CountDownTimer;
