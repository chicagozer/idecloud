import React, { Component } from "react";

export default class output extends Component {
  state = {
    input: ""
  };

  setInput = event => {
    this.setState({
      input: event.target.value
    });
    this.props.input(event.target.value);
    console.log(this.state.input);
  };
  render() {
    return (
      <div style={{ background: '"#001529"' }}>
        <textarea
          readOnly={true}
          cols="70"
          rows="10"
          placeholder="output"
          value={this.props.output}
          style={{ width: "100%", height: "200", marginTop: "125px" }}
        />

        <textarea
          cols="70"
          rows="8"
          placeholder="input"
          onChange={this.setInput}
          style={{ width: "100%", height: "200" }}
        />
      </div>
    );
  }
}
