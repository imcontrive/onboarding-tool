import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  // Logic for Update the React State
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // Logic for User's Login
  handleLogin = () => {
    // e.preventDefault();
    const { email, password } = this.state;
    const data = { email, password };
    fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // console.log(data, "after login");
          localStorage.setItem("token", data.token);
          this.props.dispatch({ type: "REGISTER_USER", payload: data });
          this.props.history.push("/");
        } else {
          var err = data.error;
          this.setState({ error: err });
          this.props.dispatch({ type: "USER_LOGIN_FAILED" });
        }
      });
  };

  render() {
    return (
      <div className="isWrapper isLoginWrapper">
        <form className="isForm">
          <h2 className="formHeading">Log In</h2>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
        </form>
        {this.state.error ? (
          <p style={{ color: "red" }}>{this.state.error}</p>
        ) : (
          ""
        )}
        <div className="submit-signup">
          <button className="btn" type="submit" onClick={this.handleLogin}>
            Log In
          </button>
          <Link to="/register">
            Don't have an account?<small>Sign Up</small>
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps)(Login);
