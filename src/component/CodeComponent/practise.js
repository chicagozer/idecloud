import React, { Component } from "react";
import DownloadLink from "react-download-link";
import Checkbox from "@material-ui/core/Checkbox";
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
var fileDownload = require("react-file-download");
class Editor extends Component {
  state = {
    code: "",
    output: "",
    language: "c_cpp",
    open: false,
    projectname: "t",
    input: "",
    lan: "C",
    in: false,
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
  };

  getCode = () => {
    var code = this.state.code;

    var language = this.state.lan;

    var input = this.state.input;

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
  handle = e => {
    if (e.target.checked) {
      this.setState({ in: true });
    } else {
      this.setState({ in: false });
    }
  };
  handleSelect = v => {
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
    console.log(v);
  };
  download = () => {
    fileDownload(this.state.data, this.state.file);
  };
  setInput(inputs) {
    this.setState({
      input: inputs
    });
  }

  render() {
    return (
      <div
        style={{
          overflow: "auto",
          marginTop: 100,
          textAlign: "left"
        }}
      >
        <div
          style={{
            width: "90%",
            margin: 10,
            marginLeft: "5%",
            color: "#305656",
            border: "1px solid #456a6a",
            borderRadius: "5px",
            textAlign: "left"
          }}
        >
          <Row>
            <Col span={24}>
              <Button
                onClick={this.getCode}
                style={{
                  margin: "7px",
                  background: "#66bb6a",
                  borderColor: "green",
                  color: "#fff",
                  size: "large",

                  fontSize: "large"
                }}
              >
                Run
              </Button>
              <Button
                style={{ color: "  #617f7f", margin: "7px" }}
                onClick={this.download}
              >
                {" "}
                Download
              </Button>
              <Button
                style={{ color: "  #617f7f", margin: "7px" }}
                onClick={this.download}
              >
                {" "}
                Save to my profile
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
        </div>
        <div style={{}}>
          <Row>
            <Col span={24}>
              <Checkbox
                style={{
                  color: " #456a6a",
                  marginLeft: "4%"
                }}
                onChange={e => this.handle(e)}
              />
              <InputLabel style={{ color: "#305656", textAlign: "left" }}>
                Custom input(Read the STDIN eg :scanf,Cin)
              </InputLabel>
            </Col>{" "}
            {this.state.in ? (
              <Col span={24}>
                <textarea
                  rows="5"
                  value={this.state.input}
                  style={{
                    width: "90%",
                    margin: 10,
                    marginLeft: "5%",
                    color: "#305656",
                    border: "1px solid #456a6a",
                    borderRadius: "5px",
                    textAlign: "left"
                  }}
                  onChange={e => this.setInput(e.target.value)}
                />{" "}
              </Col>
            ) : null}
          </Row>
          <Row>
            <Col span={24}>
              <InputLabel
                style={{
                  color: "#305656",
                  margin: 10,
                  textAlign: "left",
                  marginLeft: "5%"
                }}
              >
                Output{" "}
              </InputLabel>
            </Col>{" "}
            <Col span={24}>
              <textarea
                readOnly={true}
                rows="10"
                value={this.state.output}
                style={{
                  width: "90%",
                  margin: 10,
                  marginLeft: "5%",
                  color: "#305656",
                  border: "1px solid #456a6a",
                  borderRadius: "5px",
                  textAlign: "left"
                }}
              />{" "}
            </Col>
          </Row>{" "}
        </div>
        <div
          style={{
            color: "#fff",
            marginTop: 30,
            background: "#456a6a",
            width: "90%",
            marginLeft: "5%",
            textAlign: "center"
          }}
        >
          <p>
            CopyRight@2019|Developed by:Lama Dweikat|Supervisor:Samer Arandi{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default Editor;
