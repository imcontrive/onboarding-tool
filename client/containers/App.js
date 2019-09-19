import React, { Component } from "react";
import { connect } from "react-redux";
import "../scss/index.scss";
import Header from "../components/Header";
import setAuthToken from "../../utils/setAuthToken";
import Protected from "../components/Protected";
import Public from "../components/Public";

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
            this.props.dispatch({ type: "USER_RELOAD", payload: res.data });
          }
        })
        .catch(function(error) {
          console.error(error, "catch error");
        });
    }
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Header />
        <hr />
        {user ? <Protected /> : <Public />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userInfo.user
  };
};

export default connect(mapStateToProps)(App);
