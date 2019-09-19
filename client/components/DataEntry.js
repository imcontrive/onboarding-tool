import React, { Component } from "react";
import { connect } from "react-redux";

class DataEntry extends Component {
  state = {
    name: "",
    cname: "",
    phone: "",
    email: "",
    about: "",
    expectations: "",
    status: "Not processed"
  };

  //Logic For handle inputs into  React State
  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  //Logic for Submit data to backend
  handleSubmit = () => {
    const {
      name,
      cname,
      phone,
      email,
      about,
      expectations,
      status
    } = this.state;

    const data = {
      name,
      cname,
      phone,
      email,
      about,
      expectations
    };
    const { token } = localStorage;
    fetch("http://localhost:3000/api/v1/receptions", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("in Loginhandler", data);
        if (data.success) {
          localStorage.setItem("token", data.token);
          // this.props.dispatch({ type: "REGISTER_USER", payload: data });
          // this.setState({ user: {} });
          this.props.history.push("/");
        }
      });
  };

  render() {
    const {
      name,
      cname,
      phone,
      email,
      about,
      expectations,
      status
    } = this.state;
    return (
      <div className="isWrapper">
        <h3>Data Entry form</h3>
        <form className="form-wrapper">
          <label htmlFor="name" className="form-label">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="cname" className="form-label">
            <span>Company Name</span>
            <input
              type="text"
              name="cname"
              value={cname}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="phone" className="form-label">
            <span>Phone Number</span>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="email" className="form-label">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="about" className="form-label">
            <span>About Yourself</span>
            <input
              type="text"
              name="about"
              value={about}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="expectations" className="form-label">
            <span>Expectations</span>
            <input
              type="text"
              name="expectations"
              placeholder="What do you expect from the event?"
              value={expectations}
              onChange={this.handleChange}
            />
          </label>
          {/* <label htmlFor="status" className="form-label">
            <span>Status</span>
            <input
              type="text"
              name="status"
              value={status}
              onChange={this.handleChange}
            />
          </label> */}
        </form>
        <div className="controlPanel">
          <button className="submit-btn" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userInfo.user
  };
};
export default connect(mapStateToProps)(DataEntry);
