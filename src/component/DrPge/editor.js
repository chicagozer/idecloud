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

class Editor1 extends Component {
  state = {
    code: "",
    output: "output ",
    language: "c_cpp",
    open: false,
    projectname: "t",
    input: "",
    lan: "C"
  };
  componentDidMount() {
    this.setState({ code: this.props.code });
  }

  render() {
    return (
      <div style={{ overflow: "auto" }}>
        <Row>
          <Col span={24}>
            <AceEditor
              id="editor"
              mode="c_cpp"
              theme="chrome"
              fontSize="15px"
              value={this.state.code}
              name="code"
              width="100%"
              height="300px"
              readOnly
              editorProps={{ $blockScrolling: true }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Editor1;
