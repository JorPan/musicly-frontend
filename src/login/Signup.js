import React, { Component } from "react";
import "./Auth.css";

export default class Signup extends Component {
  render() {
    return (
      <div className="login-page">
        <h2 className="title">Signup</h2>
        <div className="login">
          <form className="login-form">
            <input
              className="loginput"
              type="text"
              name="firstname"
              placeholder="First Name"
            />
            <input
              className="loginput"
              type="text"
              name="lastname"
              placeholder="Last Name"
            />
            <input
              className="loginput"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="loginput"
              type="text"
              name="password"
              placeholder="Password"
            />
            <input
              className="loginput"
              type="text"
              name="passwordcomfirm"
              placeholder="Confirm Password"
            />
            <input
              className="loginput login-button"
              type="submit"
              value="Sign Up"
            />
          </form>
        </div>
      </div>
    );
  }
}
