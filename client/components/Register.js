import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: ""
  };

  // Logic for Update the React State
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // Logic for User Registration
  handleSubmit = () => {
    const { name, email, password } = this.state;
    const data = { name, email, password };

    fetch("http://localhost:3000/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        var succMsg = res.message;
        this.setState({ message: succMsg });
        this.props.history.push("/Login");
      })
      .catch(error => console.error("Error:", error));
  };

  render() {
    const { name, email, password, confirmPassword } = this.state;
    return (
      <div className="isWrapper">
        <form className="isForm">
          <h2 className="formHeading">Sign Up</h2>

          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
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
          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </label>
        </form>
        <p>
          {password && confirmPassword && password != confirmPassword ? (
            <p className="danger">Password don't match</p>
          ) : (
            ""
          )}
        </p>
        <div className="submit-signup">
          {name && email && password && confirmPassword ? (
            <button className="btn" type="submit" onClick={this.handleSubmit}>
              Sign Up
            </button>
          ) : (
            "All fields are Required"
          )}
          <Link to="/login">
            Already have an account?<small>Log In</small>
          </Link>
        </div>{" "}
        {this.state.message ? <p>{this.state.message}</p> : ""}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(mapStateToProps)(Register);
