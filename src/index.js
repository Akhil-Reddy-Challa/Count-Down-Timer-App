import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import * as Database from "localforage/dist/localforage";

//1)  Import all the necessary packages

/*
  Sample Data inside DB
  Key: "1" , Value: {id: 1, name: "Event name", eventDateTime: "2020-10-28T00:08"}
  EventID is an unique identifier
  */
let allEvents = [];
let count = 0;
//2) Get data from our IndexedDB table
Database.iterate((value) => {
  //3) Push everything to allEvents array
  allEvents.push(value);
}).then(() => {
  //4) Render our App Component by passing allEvents as props
  count = allEvents.length;
  count = count > 0 ? allEvents[count - 1].id : count; //This way when new Event is created the ID would be unique
  ReactDOM.render(
    <React.StrictMode>
      <App allEvents={allEvents} count={count} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

serviceWorker.unregister();
