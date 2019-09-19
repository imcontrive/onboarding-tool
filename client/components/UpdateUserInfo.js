import React, { Component } from "react";

export default class UpdateUserInfo extends Component {
  state = {
    name: "",
    cname: "",
    phone: "",
    email: "",
    about: "",
    expectations: "",
    status: ""
  };

  componentDidMount() {
    const { token } = localStorage;
    let id = this.props.location.id;
    fetch(`http://localhost:3000/api/v1/receptions/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const {
            name,
            cname,
            phone,
            email,
            about,
            expectations,
            status
          } = data.reception;
          this.setState({
            name,
            cname,
            phone,
            email,
            about,
            expectations,
            status
          });
        }
      });
  }

  //Logic For handle inputs into  React State
  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  //Logic for Update Existing data to backend
  handelUpdate = () => {
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
      expectations,
      status
    };
    const { token } = localStorage;
    const id = this.props.location.id;

    fetch(`http://localhost:3000/api/v1/receptions${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.props.dispatch({ type: "ADD_DATA", payload: data });
          this.props.history.push("/");
        }
      });
  };

  render() {
    const statusArr = [{ status: "Not processed" }, { status: "Finalized" }];
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
        <h3>Update User Info</h3>
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
          <label htmlFor="dropdown" className="form-label">
            <span>Status</span>
            <span className="custom-dropdown big gap">
              <select name="status" onChange={this.handleChange}>
                {statusArr
                  ? statusArr.map((list, index) => {
                      return (
                        <option key={index} value={list.status}>
                          {list.status}
                        </option>
                      );
                    })
                  : ""}
              </select>
            </span>
          </label>
        </form>
        <div className="controlPanel">
          <button className="submit-btn" onClick={this.handelUpdate}>
            Update userInfo
          </button>
        </div>
      </div>
    );
  }
}
