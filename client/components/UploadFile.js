import React, { Component } from "react";

export default class UploadFile extends Component {
  state = {
    selectedFile: null
  };

  //Logic for Select a Stored File for Upload
  fileSelectedHandler = e => {
    const file = e.target.files[0];
    this.setState({ selectedFile: file });
  };

  render() {
    return (
      <div className="button-wrapper">
        <span className="label">Upload File</span>
        <input
          type="file"
          name={this.state.selectedFile}
          id="upload"
          className="upload-box"
          placeholder="Upload File"
          onChange={this.fileSelectedHandler}
          multiple
        />
      </div>
    );
  }
}
