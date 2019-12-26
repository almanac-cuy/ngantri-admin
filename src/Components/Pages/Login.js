import React, { Component } from "react";
import "../Css/Login.css";
import firebase from "firebase";
import { Database, Auth } from "../../Config/firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isPasswordShown: false,
      user: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // this.setState({ user });
        window.location.href = "/admin";
      } else {
        // this.setState({ user: null });
      }
    });
  }

  tooglePasswordVisibility = () => {
    const { isPasswordShown } = this.state;
    this.setState({
      isPasswordShown: !isPasswordShown
    });
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleLogin(e) {
    e.preventDefault(
      Auth.signInWithEmailAndPassword(
        this.state.email.trim(),
        this.state.password
      )
        .then(u => {
          localStorage.setItem("token", "ada");
        })
        .catch(error => {
          console.log(error);
        })
    );
  }
  handleSignUp(e) {
    e.preventDefault();
    Auth.createUserWithEmailAndPassword(
      this.state.email.trim(),
      this.state.password
    ).catch(error => {
      console.log(error);
    });
  }
  render() {
    const { isPasswordShown } = this.state;
    return (
      <>
        <div className="background">
          <img src="http://cdn2.tstatic.net/jogja/foto/bank/images/kantor-dinas-pendidikan-sleman.jpg" />
        </div>
        <div className="wrapper-login">
          <div className="login-box">
            <h1>Login</h1>
            <div className="text-box">
              <i className="fa fa-user" aria-hidden="true" />
              <input
                type="Email"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>
            <div className="text-box">
              <i className="fa fa-lock" aria-hidden="true" />
              <input
                name="password"
                type={isPasswordShown ? "text" : "password"}
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <div className="eye-password">
                <i
                  className={` ${
                    isPasswordShown ? "fa fa-eye" : "fa fa-eye-slash"
                  } `}
                  onClick={this.tooglePasswordVisibility}
                />
              </div>
            </div>
            <input
              className="button-sign-in"
              onClick={this.handleLogin}
              type="button"
              value="Sign In"
            />
            <input
              className="button-sign-in"
              onClick={this.handleSignUp}
              type="button"
              value="Sign Up"
            />
          </div>
        </div>
      </>
    );
  }
}
