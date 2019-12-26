import React, { Component } from "react";
import { Link } from "react-router-dom";
class Sidebar extends Component {
  render() {
    return (
      <div>
        <div className="sidebar">
          <Link className={this.props.page === "" ? "active" : ""} to="./admin">
            <img
              src="https://image.flaticon.com/icons/png/512/609/609803.png"
              width="20"
            />
            &nbsp; Home
          </Link>
          <Link
            to="?page=queue"
            className={this.props.page === "?page=queue" ? "active" : ""}
          >
            <img
              src="https://image.flaticon.com/icons/png/512/2132/2132503.png"
              width="20"
            />
            &nbsp; Queue
          </Link>
          <Link
            to="?page=category"
            className={this.props.page === "?page=category" ? "active" : ""}
          >
            <img
              src="https://image.flaticon.com/icons/png/512/1141/1141913.png"
              width="20"
            />
            &nbsp; Category
          </Link>
          {/* <Link to="?page=zzz">
            <img
              src="https://image.flaticon.com/icons/png/512/595/595067.png"
              width="20"
            />
            &nbsp;Test Error Link
          </Link> */}
        </div>
      </div>
    );
  }
}

export default Sidebar;
