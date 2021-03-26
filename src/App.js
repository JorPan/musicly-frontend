import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./home/Header";
import Home from "./home/Home";
import Footer from "./home/Footer";
import Login from "./login/Login";
import Signup from "./login/Signup";
import About from "./home/About";
import Contact from "./home/Contact";
import Resources from "./home/Resources";
import Modify from "./modeify/modeify";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/login" component={Login} /> */}
          {/* <Route path="/signup" component={Signup} /> */}
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/resources" component={Resources} />
          <Route path="/modeify" render={(props) => <Modify {...props} />} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
