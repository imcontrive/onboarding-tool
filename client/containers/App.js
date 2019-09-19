import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import "../scss/index.scss";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import Register from "../components/Register";
import Header from "../components/Header";
import DashBoard from "../components/DashBoard";
import UpdateUserInfo from "../components/UpdateUserInfo";
import setAuthToken from "../../utils/setAuthToken";
import DataEntry from "../components/DataEntry";
import UploadFile from "../components/UploadFile";
const axios = require("axios");

class App extends Component {
  state = {
    token: ""
  };

  componentDidMount() {
    const { token } = localStorage;
    if (token) {
      setAuthToken(token);
      axios
        .get("http://localhost:3000/api/v1/users/me")
        .then(res => {
          if (res.data.success) {
            this.props.dispatch({ type: "REGISTER_USER", payload: res.data });
          }
        })
        .catch(function(error) {
          console.error(error, "catch error");
        });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <hr />
        <Route exact path="/" component={HomePage} />
        <Route path="/data-entry" component={DataEntry} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashBoard" component={DashBoard} />
        <Route path="/update-userinfo" component={UpdateUserInfo} />
        <Route path="/upload-file" component={UploadFile} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps)(App);
