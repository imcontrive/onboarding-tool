import React, { Component } from "react";
import { connect } from "react-redux";
import DashBoard from "./DashBoard";

class HomePage extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="homePage-wrapper">
        {!user ? (
          <h1>A tool that simplifies the event onboarding process</h1>
        ) : (
          <DashBoard />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userInfo.user
  };
};
export default connect(mapStateToProps)(HomePage);
