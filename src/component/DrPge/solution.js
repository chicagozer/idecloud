import React, { Component } from "react";

import { Icon, Button, Input, Col, Row } from "antd";
import brace from "brace";
import AceEditor from "react-ace";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import "brace/mode/java";
import "brace/mode/c_cpp";
import "brace/mode/python";

import "brace/mode/html";
import "brace/theme/github";
import "brace/theme/dreamweaver";
import "brace/theme/chrome";

class Editor extends Component {
  state = {
    code: "",
    output: "output ",
    language: "c_cpp",
    open: false,
    projectname: "t",
    input: "",
    lan: "C"
  };
  componentDidMount() {}
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = newValue => {
    this.setState({
      code: newValue
    });
    this.props.code(this.state.code);
  };

  getCode = () => {
    var code = this.state.code;

    var language = this.state.lan;

    var input = "";

    var formData = new FormData();
    formData.append("code", code);
    formData.append("language", language);

    formData.append("input", input);

    fetch("http://localhost:80/compile.php", {
      method: "POST",

      headers: {},
      redirect: "follow",
      referrer: "no-referrer",
      body: formData // b
    })
      .then(response => response.text())
      .then(response => {
        this.setState({
          output: response.trim()
        });
        console.log(this.state.output);
      });
  };

  handleSelect = v => {
    this.props.language(v);
    if (v === "C++") {
      this.setState({
        language: "c_cpp",
        lan: v
      });
    } else if (v === "C") {
      this.setState({
        language: "c_cpp",
        lan: v
      });
    } else {
      this.setState({
        language: v,
        lan: v
      });
    }
    this.setState({
      lan: v
    });
  };
  setInput(inputs) {
    this.setState({
      input: inputs
    });
  }

  render() {
    return (
      <div style={{ overflow: "auto" }}>
        <div
          style={{
            border: "1px solid #456a6a",
            borderRadius: "5px",

            width: 970
          }}
        >
          <Row>
            <Col span={24}>
              <Button
                onClick={this.props.onsubmit}
                style={{
                  margin: "7px",
                  background: "#66bb6a",
                  borderColor: "green",
                  color: "#fff",
                  size: "large",

                  fontSize: "large"
                }}
              >
                Run code
              </Button>
              <div
                style={{
                  postion: "relative",
                  float: "right",
                  width: "60%",
                  textAlign: "right"
                }}
              >
                <InputLabel
                  style={{ color: "#456a6a", width: "20%", margin: 10 }}
                >
                  language
                </InputLabel>
                <Select
                  name="language"
                  style={{
                    width: "60%",
                    marginTop: "10px",
                    margin: 10,
                    fontSize: "large",
                    border: "1px solid #456a6a",
                    borderRadius: "5px",
                    height: 35,
                    padding: 5
                  }}
                  margin="dense"
                  variant="filled"
                  native={true}
                  onChange={event => this.handleSelect(event.target.value)}
                  value={this.state.lan}
                  // onSelect={event=>this.handleSelect(event.target.value)}
                >
                  <option value="C++">C++</option>
                  <option value="C">C</option>
                  <option value="java">JAVA</option>
                  <option value="python">PYTHON</option>
                </Select>
              </div>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <AceEditor
                id="editor"
                mode={this.state.language}
                theme="chrome"
                fontSize="15px"
                value={this.state.code}
                onChange={this.onChange}
                name="code"
                width="968px"
                height="400px"
                editorProps={{ $blockScrolling: true }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={24} />{" "}
          </Row>
        </div>
      </div>
    );
  }
}

export default Editor;
