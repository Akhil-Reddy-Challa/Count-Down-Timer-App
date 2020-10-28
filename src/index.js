import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import localforage from "localforage/dist/localforage";

//Get data from our Table
/*
  Sample Data from table =>
  Key: "1" Value: {id: 1, name: "1st Event", eventDateTime: "2020-10-28T00:08"}
  EventID is our unique identifier
  */
let events = [];

localforage //Fetch all the events from DB
  .iterate((value, key) => {
    events.push(value); //Push to events
  })
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <App events={events} count={events.length} />
      </React.StrictMode>,
      document.getElementById("root")
    );
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
