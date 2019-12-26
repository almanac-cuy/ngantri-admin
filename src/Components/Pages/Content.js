import React, { Component } from "react";
import "./../Css/Content.css";
class Content extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <h2>Dashboard</h2>
          <div className="card">
            <h1 className="card-content">3</h1>
            <h4 className="card-content">Dorms Total</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
