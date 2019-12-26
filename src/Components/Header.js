import React, { Component } from "react";
import "./Css/Header.css";
import { Database, Auth } from "../Config/firebase";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    Auth.signOut();
    window.location.href = "/";
  }
  render() {
    return (
      <div>
        <div className="header">
          <a href="" className="logo">
            A D M I N
          </a>
          <div className="header-right">
            {/* <a className="active" href="/">
              Logout
            </a> */}
            <button className="button button5" onClick={this.handleLogout}>
              Logout
            </button>
            {/* <a href="#contact">Contact</a>
            <a href="#about">About</a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
