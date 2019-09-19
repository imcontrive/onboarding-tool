import React, { Component } from "react";
import LoggedInUser from "./LoggedInUser";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="header ">
        <div className="header-main">
          <div>
            <NavLink to="/" className="nav">
              <img
                className="logo"
                src="/media/homepage.svg"
                alt="Onboarding tool"
              />
            </NavLink>
          </div>
          {localStorage.token ? (
            <>
              <div className="header-list">
                <ul>
                  <li className="list-items">
                    <NavLink to="/data-entry" activeClassName="active">
                      Data Entry
                    </NavLink>
                  </li>
                  <li className="list-items">
                    <NavLink to="/upload-file" activeClassName="active">
                      Upload File
                    </NavLink>
                  </li>
                  {user && user.isAdmin == true ? (
                    <div className="routesForAdmin">
                      <li className="list-items">
                        <NavLink to="/update-userInfo" activeClassName="active">
                          Update
                        </NavLink>
                      </li>
                    </div>
                  ) : (
                    ""
                  )}
                  <li className="list-items">
                    <NavLink to="/dashBoard" activeClassName="active">
                      Dashboard
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="isUserExist">
                <LoggedInUser />
              </div>
            </>
          ) : (
            <div className="control-btns">
              <NavLink to="/login" className="btn" type="submit">
                Login
              </NavLink>
              <NavLink to="/register" className="btn" type="submit">
                Sign-Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.userInfo.user };
};

export default withRouter(connect(mapStateToProps)(Header));
