import React, { Component } from "react";
import "../Css/Queue.css";
import { Database } from "../../Config/firebase";
import Axios from "axios";

// let time = new Date().toLocaleString();

class Dorms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // time: new Date().toLocaleString(),
      users: []
    };
  }

  componentDidMount() {
    // this.intervalID = setInterval(() => this.tick(), 1000);
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
  };

  getTime(datetime) {
    const timestamp = datetime; // This would be the timestamp you want to format
    let formattedTimestamp = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(timestamp);

    return formattedTimestamp;
  }

  deleteQueue = async idUser => {
    try {
      const userQueue = await Axios.get(
        `http://192.168.100.149:9400/api/history/on-going/${idUser}`
      );

      const historyId = userQueue.data.history.filter(
        d => d.service === "Poli Umum"
      );

      console.log(historyId);

      await Axios.patch(
        `http://192.168.100.149:9400/api/history/${idUser}/${historyId[0]._id}`
      );

      const index = this.state.users.findIndex(user => user.user_id === idUser);
      const users = [...this.state.users];

      const ref = Database.ref().child(
        "instance/5e0216953c5f4e2b88afdc51/service/5e021947fde9002594aeb2ba"
      );
      const newUser = users.slice(idUser, 1);
      this.setState({
        users: newUser
      });
      await ref.child(idUser).remove();

      console.log(index);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <div className="content">
          {/* <button style={{ float: "right" }} className="button button1">
            Add Dorms
          </button> */}
          <h2>Queue List</h2>

          <div style={{ overflowX: "auto" }}>
            {!this.state.users.length ? (
              <center>
                <tr>
                  <td colSpan="4">
                    <img
                      src="https://goexplore.city/images/nodatafound.png"
                      width="500"
                    />
                    <center>
                      <h2>No data Available</h2>
                    </center>
                  </td>
                </tr>
              </center>
            ) : (
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
                      <td>{this.getTime(user.date)}</td>
                      <td>
                        <button className="button button2">Edit</button>
                        <button
                          className="button button3"
                          onClick={e => {
                            e.preventDefault();
                            this.deleteQueue(user.user_id);
                          }}
                        >
                          Done
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Dorms;
