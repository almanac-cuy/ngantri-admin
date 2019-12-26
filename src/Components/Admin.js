import React, { Component } from "react";
import "./../Components/Css/Admin.css";
import Sidebar from "./Sidebar";
import Content from "./Pages/Content";
import Queue from "./Pages/Queue";
import Category from "./Pages/Category";
import Error404 from "./Pages/Error404";
import Header from "./Header";
import firebase from "firebase";
import { Database, Auth } from "../Config/firebase";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // this.setState({ user });
      } else {
        // this.setState({ user: null });
        window.location.href = "/";
      }
    });
  }
  render() {
    let data = [1];
    let page = this.props.location.search;
    return (
      <div>
        <Header />
        <Sidebar page={page} />
        {data.map((item, index) => {
          if (page === "") {
            return <Content />;
          } else if (page === "?page=queue") {
            return <Queue />;
          } else if (page === "?page=category") {
            return <Category />;
          } else {
            return <Error404 />;
          }
        })}
      </div>
    );
  }
}

export default Admin;
