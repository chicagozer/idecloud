import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
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
import { Empty, Icon, Col, Row, Modal, Card } from "antd";
import AddIcon from "@material-ui/icons/Add";

import Editor from "./editor";

import "brace/mode/java";
import "brace/mode/c_cpp";
import "brace/mode/python";

import "brace/mode/html";
import "brace/theme/github";
import "brace/theme/dreamweaver";
import "brace/theme/chrome";
class submition extends Component {
  state = {
    items: [],
    show: true,
    question: [],
    qname: [],
    questionmap: new Map(),
    student: [],
    visible: false,
    sub: [],
    std: "",
    s: new Map(),
    n: new Map()
  };

  componentDidMount() {
    this.setState(prevState => ({
      s: prevState.s.set("Hello World!", 100)
    }));
    this.setState(prevState => ({
      s: prevState.s.set("Sum and Difference", 0)
    }));
    this.setState(prevState => ({
      n: prevState.n.set("Hello World!", 1)
    }));
    this.setState(prevState => ({
      n: prevState.n.set("Sum and Difference", 0)
    }));
    axios
      .get("http://127.0.0.1:8000/submithw/?search=" + this.props.hwid, {})
      .then(res => {
        res.data.map(v => {
          let list = this.state.student;
          !list.includes(v.studentname) ? list.push(v.studentname) : null;
          this.setState({
            items: res.data,
            student: list
          });
        });
        axios
          .get("http://127.0.0.1:8000/hwincourse/" + this.props.hwid, {})
          .then(res => {
            this.setState({
              question: res.data.question
            });
            this.state.question.map(v => {
              axios
                .get("http://127.0.0.1:8000/challenge/" + v, {})
                .then(res => {
                  let list = this.state.qname;
                  list.push(res.data);
                  this.setState({
                    qname: list
                  });
                  console.log(list);
                });
            });
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  showsub = v => {
    this.props.sbq(true, v);
  };
  show = (std, q) => {
    Modal.info({
      width: 600,
      title: std,
      content: (
        <div
          style={{
            width: 500,
            height: "auto",
            overflow: "auto",
            maxHeight: 400
          }}
        >
          <p>
            submitted on :{" "}
            {this.state.items
              .filter(val => val.challengee === q && val.studentname === std)
              .map(v => v.submeteddate)}
          </p>

          <Row>
            <Col span={24}>
              <Editor
                code={this.state.items
                  .filter(
                    val => val.challengee === q && val.studentname === std
                  )
                  .map(v => v.code)
                  .toString()}
              />
            </Col>
          </Row>
        </div>
      )
    });
  };
  handleOk = e => {
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div>
        <div style={this.state.show ? {} : { display: "none" }}>
          <Row gutter={16}>
            {this.state.items.length !== 0 ? (
              <div>
                {this.state.qname.map(v => (
                  <Col span={8}>
                    <Card
                      style={{
                        width: "96%",
                        margin: 10,
                        marginLeft: "2%",
                        padding: 10,
                        marginBottom: 3,
                        background: "#fafafa",
                        textAlign: "left",
                        color: "#305656",
                        border: "1px solid #456a6a",
                        borderRadius: "5px"
                      }}
                      title={
                        <span style={{ color: "#456a6a", fontSize: 15 }}>
                          {v.challengeName}
                        </span>
                      }
                      extra={
                        <a
                          onClick={() => {
                            this.showsub(v);
                          }}
                          href="#"
                        >
                          View{" "}
                        </a>
                      }
                    >
                      <Typography style={{ color: "#617f7f" }}>
                        <span style={{ fontWeight: "bold" }}>
                          number of submissions:{" "}
                        </span>{" "}
                        {this.state.n.get(v.challengeName)}
                      </Typography>
                      <Typography style={{ color: "#617f7f" }}>
                        <span style={{ fontWeight: "bold" }}>
                          Success rate:{" "}
                        </span>{" "}
                        {this.state.s.get(v.challengeName)} %
                      </Typography>
                    </Card>
                  </Col>
                ))}
              </div>
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

export default submition;
