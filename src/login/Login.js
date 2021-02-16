import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import "./Auth.css";

export default class Login extends Component {
  fakeLogin = (event) => {
    event.preventDefault();
    window.location.replace("/");
  };

  render() {
    return (
      <div className="login-page">
        <h2 className="title">Login</h2>
        <div className="login">
          <form onSubmit={this.fakeLogin} className="login-form">
            <input
              className="loginput"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="loginput"
              type="password"
              name="username"
              placeholder="Password"
            />
            <input
              className="loginput login-button"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </div>
    );
  }
}
