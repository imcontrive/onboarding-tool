import React, { Component } from "react";
import { connect } from "react-redux";

class DashBoard extends Component {
  state = {
    allData: []
  };
  componentDidMount() {
    const { token } = localStorage;
    fetch("http://localhost:3000/api/v1/receptions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.props.dispatch({ type: "ADD_DATA", payload: data.receptions });
          this.setState({ allData: data.receptions });
        }
      });
  }

  render() {
    const { allData } = this.props;
    // console.log(allData, "allData in ....");
    return (
      <div className="isWrapper">
        <h3>DashBoard</h3>
        {allData
          ? allData.map((data, i) => {
              <p>{data.name}</p>;
            })
          : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state.userInfo.allData, "dashboard map state");
  return {
    allData: state.userInfo.allData
  };
};
export default connect(mapStateToProps)(DashBoard);
