import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import DataEntry from "./DataEntry";
import DashBoard from "./DashBoard";
import UpdateUserInfo from "./UpdateUserInfo";
import UploadFile from "./UploadFile";
import { Error } from "./Error";
import HomePage from "./HomePage";

export default class Protected extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/data-entry" component={DataEntry} />
        <Route path="/upload-file" component={UploadFile} />
        <Route path="/update-userinfo" component={UpdateUserInfo} />
        <Route path="/dashBoard" component={DashBoard} />
        <Route path="*" component={Error} />
      </Switch>
    );
  }
}
