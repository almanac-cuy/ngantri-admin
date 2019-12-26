import React, { Component } from "react";
import "../Css/Queue.css";
import { Database } from "../../Config/firebase";

// let time = new Date().toLocaleString();

class Dorms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString(),
      users: []
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
    this.getQueue();
  }

  getQueue = () => {
    const ref = Database.ref().child(
      "instance/5e0216953c5f4e2b88afdc51/service/5e021947fde9002594aeb2ba"
    );

    if (this.state.users.length > 0) {
      this.setState({
        users: []
      });
    }

    ref.on("child_added", value => {
      this.setState(prevState => {
        return {
          users: [...prevState.users, value.val()]
        };
      });
    });

    if (this.state.users.length > 0) {
      this.setState({
        users: []
      });
    }

    ref.on("child_removed", value => {
      this.setState(prevState => {
        return {
          users: [...prevState.users, value.val()]
        };
      });
    });
  };

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }

  render() {
    console.log(this.state.users);
    return (
      <div>
        <div className="content">
          {/* <button style={{ float: "right" }} className="button button1">
            Add Dorms
          </button> */}
          <h2>Queue List</h2>

          <div style={{ overflowX: "auto" }}>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Duration</th>
                  <th>Time Registerred</th>
                  <th>Action</th>
                </tr>
                {this.state.users.map((user, index) => (
                  <tr>
                    <td>
                      <p>{user.username}</p>
                      <p>{user.service_name}</p>
                    </td>
                    <td>{user.duration / 60} min</td>
                    <td>{Date(`${user.date}`)}</td>
                    <td>
                      <button className="button button2">Edit</button>
                      <button className="button button3">Down</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Dorms;
