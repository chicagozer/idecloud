import React, { Component } from "react";

import { Icon, Button, Input, Col, Row } from "antd";
import brace from "brace";
import AceEditor from "react-ace";
import DownloadLink from "react-download-link";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import "brace/mode/java";
import "brace/mode/c_cpp";
import "brace/mode/python";

import "brace/mode/html";
import "brace/theme/github";
import "brace/theme/dreamweaver";
import "brace/theme/chrome";
var fileDownload = require("react-file-download");
class Editor extends Component {
  state = {
    code: "",
    output: "output ",
    language: "c_cpp",
    open: false,
    projectname: "t",
    input: "",
    lan: "C",
    file: "Mycode.c"
  };
  componentDidMount() {
    console.log(this.props.request);
    if (this.props.request) {
      this.setState({
        code: this.props.code1,
        lan: this.props.languege1.toString()
      });
      console.log(this.state.code);
    } else if (!this.props.request) {
      this.setState({
        code: "",
        lan: "C"
      });
    }
  }
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
  download = () => {
    fileDownload(this.state.data, this.state.file);
  };
  handleSelect = v => {
    this.props.language(v);
    if (v === "C++") {
      this.setState({
        language: "c_cpp",
        lan: v,
        file: "Mycode.cpp"
      });
    } else if (v === "C") {
      this.setState({
        language: "c_cpp",
        lan: v,
        file: "Mycode.c"
      });
    } else {
      this.setState({
        language: v,
        lan: v
      });
      if (v === "python") {
        this.setState({
          file: "Mycode.py"
        });
      }
      if (v === "java") {
        this.setState({
          file: "Mycode.java"
        });
      }
    }
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
            color: "#305656",
            border: "1px solid #456a6a",
            borderRadius: "5px",
            textAlign: "left"
          }}
        >
          <Row>
            <Col span={24}>
              <Button
                onClick={this.props.applyint}
                style={{
                  margin: "7px",
                  background: "#66bb6a",
                  borderColor: "green",
                  color: "#fff",
                  size: "large",

                  fontSize: "large"
                }}
              >
                Run Code
              </Button>
              <Button
                onClick={this.props.onsubmit}
                style={{
                  margin: "7px",

                  color: "  #617f7f",
                  border: "1px solid  #617f7f"
                }}
              >
                submit Code
              </Button>
              <Button
                style={{
                  color: "  #617f7f",
                  margin: "7px",
                  border: "1px solid  #617f7f"
                }}
                onClick={this.download}
              >
                {" "}
                Download
              </Button>

              <div
                style={{
                  postion: "relative",
                  float: "right",
                  width: "60%",
                  textAlign: "right",
                  margin: 5
                }}
              >
                <InputLabel
                  style={{
                    color: "#305656",
                    width: "20%",
                    margin: 10
                  }}
                >
                  language
                </InputLabel>
                <Select
                  name="language"
                  style={{
                    width: "60%",
                    marginTop: "10px",

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
                width="100%"
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
