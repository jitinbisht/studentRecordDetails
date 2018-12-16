import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import StudentDetails from "../src/Components/StudentDetails";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Student Details</h1>
        </header>
        <StudentDetails />
      </div>
    );
  }
}

export default App;
