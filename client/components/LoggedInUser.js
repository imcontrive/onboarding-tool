import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class LoggedInUser extends Component {
  // Logic For Logout
  handleLogout = e => {
    window.localStorage.clear();
    this.props.dispatch({ type: "LOG_OUT" });
    this.props.history.push("/login");
  };

  render() {
    const { user } = this.props || null;
    return (
      <div className="isUserPanel">
        {user ? (
          <div className="isUserData">
            {
              <div className="avatar">
                <span>{user ? user.name.slice(0, 1).toUpperCase() : ""}</span>
              </div>
            }
            {
              <div className="isLoggedUser">
                <p className="isUserName capitalize">{user ? user.name : ""}</p>
                <Link className="logout-btn" to="/" onClick={this.handleLogout}>
                  Logout
                </Link>
              </div>
            }
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userInfo.user
  };
}

export default withRouter(connect(mapStateToProps)(LoggedInUser));
