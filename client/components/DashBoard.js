import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    return (
      <table className="isTableWrapper">
        <thead>
          <tr>
            <th className="table-head">Name</th>
            <th className="table-head">Company Name</th>
            <th className="table-head">Phone</th>
            <th className="table-head">Email</th>
            <th className="table-head">Status</th>
            <th className="table-head">Edit Button</th>
          </tr>
        </thead>
        <tbody>
          {allData ? (
            allData.map((data, index) => (
              <tr key={index}>
                <th className="table-data">{data.name}</th>
                <th className="table-data">{data.cname}</th>
                <th className="table-data">{data.phone}</th>
                <th className="table-data">{data.email}</th>
                <th className="table-data">{data.status}</th>
                <th className="table-data">
                  <Link
                    className="edit"
                    to={{
                      pathname: "/update-userinfo/" + data._id,
                      id: data._id
                    }}
                  >
                    Edit
                  </Link>
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <th>Loading.....</th>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    allData: state.userInfo.allData
  };
};
export default connect(mapStateToProps)(DashBoard);
