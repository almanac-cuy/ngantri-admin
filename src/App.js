import React, { Component } from "react";
import firebase from "firebase";
import { Database, Auth } from "./Config/firebase";
import "./App.css";
import Login from "./Components/Login";
import Admin from "./Components/Admin";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    return <div>{this.state.user ? <Admin /> : <Login />}</div>;
  }
}
export default App;
