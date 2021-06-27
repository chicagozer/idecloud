import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import DownloadLink from "react-download-link";

import Table from "react-bootstrap/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchResults from "react-filter-search";
import { Empty, Icon, Col, Row, Modal, Progress, Input } from "antd";
import AddIcon from "@material-ui/icons/Add";

import Editor from "./editor";

import "brace/mode/java";
import "brace/mode/c_cpp";
import "brace/mode/python";

import "brace/mode/html";
import "brace/theme/github";
import "brace/theme/dreamweaver";
import "brace/theme/chrome";
var fileDownload = require("react-file-download");
class Qhw extends Component {
  state = {
    items: [],
    show: true,
    question: [],
    qname: [],
    questionmap: new Map(),
    student: new Map(),
    visible: false,
    sub: [],
    std: "",
    value: "",
    t: new Map()
  };

  componentDidMount() {
    this.setState(prevState => ({
      t: prevState.t.set(41, "2/2")
    }));
    this.setState(prevState => ({
      t: prevState.t.set(33, "0/2")
    }));
    axios
      .get("http://127.0.0.1:8000/submithw/?search=" + this.props.qid, {})
      .then(res => {
        this.setState({ items: res.data });
        res.data.map(v => {
          axios
            .get("http://127.0.0.1:8000/user/?search=" + v.studentname, {})
            .then(res => {
              this.setState(prevState => ({
                student: prevState.student.set(
                  v.studentname,
                  res.data.map(v => v.first_name) +
                    " " +
                    res.data.map(v => v.last_name)
                )
              }));
            });
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  rerun = () => {
    Modal.success({
      title: "The students code reruned successfully"
    });
  };
  show = val => {
    Modal.info({
      width: 800,

      content: (
        <div
          style={{
            width: 700,
            height: "auto",
            overflow: "auto",
            maxHeight: 400
          }}
        >
          <Row>
            <Col span={24}>
              <Editor code={val} />
            </Col>
          </Row>
        </div>
      )
    });
  };
  show1 = val => {
    if (val === "2/2") {
      Modal.info({
        width: 500,
        title: "Passed test cases",
        content: (
          <div
            style={{
              width: 500,
              height: "auto",
              overflow: "auto",
              maxHeight: 400
            }}
          >
            <Row>
              <Col span={24}>
                <span style={{ margin: 20, fontSize: 17, marginLeft: 5 }}>
                  <Icon
                    type="check-square"
                    style={{
                      background: "#66bb6a",
                      fontSize: 17,
                      color: "#fff",
                      marginRight: 5,
                      marginButtom: 2
                    }}
                  />
                  Test case 1
                </span>
              </Col>
              <Col span={24}>
                <span style={{ margin: 20, fontSize: 17, marginLeft: 5 }}>
                  <Icon
                    type="check-square"
                    style={{
                      background: "#66bb6a",
                      fontSize: 17,
                      color: "#fff",
                      marginRight: 5,
                      marginButtom: 2
                    }}
                  />
                  Test case 2
                </span>
              </Col>
            </Row>
          </div>
        )
      });
    }
    if (val === "0/2") {
      Modal.info({
        width: 500,
        title: "Passed test cases",
        content: (
          <div
            style={{
              width: 500,
              height: "auto",
              overflow: "auto",
              maxHeight: 400
            }}
          >
            <Row>
              <Col span={24}>
                <span style={{ margin: 20, fontSize: 17, marginLeft: 5 }}>
                  <Icon
                    type="close-square"
                    style={{
                      background: "#ef5350",
                      fontSize: 17,
                      color: "#fff",
                      marginRight: 5,
                      marginButtom: 2
                    }}
                  />
                  Test case 1
                </span>
              </Col>
              <Col span={24}>
                <span style={{ margin: 20, fontSize: 17, marginLeft: 5 }}>
                  <Icon
                    type="close-square"
                    style={{
                      background: "#ef5350",
                      fontSize: 17,
                      color: "#fff",
                      marginRight: 5,
                      marginButtom: 2
                    }}
                  />
                  Test case 2
                </span>
              </Col>
            </Row>
          </div>
        )
      });
    }
  };
  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };
  handleOk = e => {
    this.setState({
      visible: false
    });
  };
  download = () => {
    fileDownload("file", "printhello.zip");
  };
  download1 = (f, data) => {
    fileDownload(data, f + ".c");
  };
  render() {
    return (
      <div>
        <div style={this.state.show ? {} : { display: "none" }}>
          <Row>
            {this.state.items.length !== 0 ? (
              <Row>
                <Col span={24}>
                  <div
                    style={{
                      textAlign: "right",
                      margin: 10,
                      marginRight: "2%",
                      postion: "relative",
                      float: "right"
                    }}
                  >
                    <Button
                      onClick={this.rerun}
                      size="small"
                      style={{
                        postion: "relative",
                        border: "1px solid #456a6a",
                        borderRadius: "5px",
                        height: 40,
                        margin: 10,
                        background: "#fafafa",
                        color: "#456a6a"
                      }}
                    >
                      Rerun All
                    </Button>
                    <Button
                      onClick={this.download}
                      size="small"
                      style={{
                        postion: "relative",
                        border: "1px solid #456a6a",
                        borderRadius: "5px",
                        height: 40,

                        background: "#fafafa",
                        color: "#456a6a"
                      }}
                    >
                      Download All
                      <Icon type="download" style={{ marginLeft: 5 }} />
                    </Button>
                  </div>{" "}
                  <div
                    style={{
                      postion: "relative",
                      float: "left",
                      margin: 10,
                      marginLeft: "2%"
                    }}
                  >
                    <Input.Search
                      placeholder=" search "
                      style={{
                        width: 300,
                        height: 40,
                        border: "1px solid #456a6a",
                        borderRadius: "5px"
                      }}
                      onChange={this.handleChange}
                      value={this.state.value}
                    />
                  </div>
                </Col>
                <Table
                  style={{
                    marginLeft: "2%",
                    width: "96%",
                    maxHeight: 350,
                    height: "auto",
                    positon: "relative",
                    overflow: "auto",
                    textAlign: "left",
                    border: "1px solid #456a6a",

                    color: " #456a6a"
                  }}
                  striped
                  bordered
                  size="sm"
                >
                  <TableHead>
                    <TableRow>
                      <th
                        style={{
                          fontSize: 17,
                          background: "#Fff",
                          color: "  #617f7f",
                          textAlign: "center"
                        }}
                      >
                        Student name
                      </th>

                      <th
                        style={{
                          fontSize: 17,
                          background: "#Fff",
                          color: " #617f7f",
                          textAlign: "center"
                        }}
                      >
                        Score
                      </th>
                      <th
                        style={{
                          fontSize: 17,
                          background: "#Fff",
                          color: "  #617f7f",
                          textAlign: "center"
                        }}
                      >
                        Code
                      </th>
                      <th
                        style={{
                          fontSize: 17,
                          background: "#Fff",
                          color: "  #617f7f",
                          textAlign: "center"
                        }}
                      >
                        Language
                      </th>
                      <th
                        style={{
                          fontSize: 17,
                          background: "#Fff",
                          color: "  #617f7f",
                          textAlign: "center"
                        }}
                      >
                        {" "}
                        Submitted date
                      </th>
                      <th
                        style={{
                          fontSize: 17,
                          background: "#Fff",
                          color: "  #617f7f",
                          textAlign: "center"
                        }}
                      >
                        {" "}
                        Passed test cases
                      </th>
                      <th
                        style={{
                          fontSize: 17,
                          background: "#Fff",
                          color: "  #617f7f",
                          textAlign: "center"
                        }}
                      >
                        {" "}
                        Download
                      </th>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <SearchResults
                      value={this.state.value}
                      data={this.state.items}
                      renderResults={results =>
                        results.map(row => (
                          <TableRow key={row.id}>
                            <TableCell align="center">
                              {this.state.student.get(row.studentname)}
                            </TableCell>

                            <TableCell align="center">{row.mark}</TableCell>
                            <TableCell align="center">
                              <Button
                                style={{ color: "  #617f7f" }}
                                onClick={() => this.show(row.code)}
                              >
                                {" "}
                                <Icon type="code" />
                              </Button>
                            </TableCell>
                            <TableCell
                              style={{ color: "  #617f7f" }}
                              align="center"
                            >
                              {row.language}
                            </TableCell>
                            <TableCell
                              style={{ color: "  #617f7f" }}
                              align="center"
                            >
                              <span> {row.submeteddate}</span>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                style={{ color: "  #617f7f", fontSize: 16 }}
                                onClick={() =>
                                  this.show1(this.state.t.get(row.id))
                                }
                              >
                                {" "}
                                {this.state.t.get(row.id)}
                              </Button>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                style={{ color: "  #617f7f" }}
                                onClick={() =>
                                  this.download1(
                                    this.state.student.get(row.studentname),
                                    row.code
                                  )
                                }
                              >
                                {" "}
                                <Icon type="download" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    />
                  </TableBody>
                </Table>
              </Row>
            ) : (
              <Empty
                style={{ marginTop: "7%" }}
                description="No submission for this homework"
              />
            )}
          </Row>
        </div>
        {this.state.viwe ? <div>{this.state.sub.map(v => v.mark)}</div> : null}
      </div>
    );
  }
}

export default Qhw;
