import React, { Component } from "react";
import Code from "./CodeComponent/practise";
import Navbar from "./navbar";
import Assignment from "./CodeComponent/assin";
export default class code extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    code: false,
    assi: true
  };
  code = (value, value1) => {
    this.setState({
      code: value,
      assi: value1
    });
  };

  render() {
    return (
      <div>
        <Navbar
          username={this.props.username}
          islogin={this.props.islogin}
          code={this.code}
        />

        {this.state.assi ? <Assignment username={this.props.username} /> : null}
        {this.state.code ? <Code username={this.props.username} /> : null}
      </div>
    );
  }
}
