import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import * as Database from "localforage/dist/localforage";
import { checkNotificationPermissions } from "./utils/notifications";

//0) Import all the necessary packages

//1)Check for Notification Permission
checkNotificationPermissions();

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

serviceWorker.register();
