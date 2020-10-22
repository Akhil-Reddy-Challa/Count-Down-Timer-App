import React, { Component } from "react";
class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark">
          <a href="/#" className="navbar-brand">
            <i className="fa fa-list-ul" aria-hidden="true" /> Count Down Timer
          </a>
        </nav>
        <button
          onClick={this.props.onClick}
          className="btn btn-primary rounded-pill m-2"
        >
          <i className="fa fa-plus-circle" /> New Event
        </button>
        <button
          onClick={this.props.onDelete}
          className="btn btn-danger rounded-pill m-2"
        >
          <i className="fa fa-trash" /> Delete-All
        </button>
      </React.Fragment>
    );
  }
}

export default NavBar;
