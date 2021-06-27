import React from "react";
import Typography from "@material-ui/core/Typography";
import Table from "react-bootstrap/Table";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Challenge from "./addfrombank";
import SearchResults from "react-filter-search";
import {
  Empty,
  Icon,
  Col,
  Row,
  Modal,
  Input,
  Breadcrumb,
  Checkbox
} from "antd";
import AddIcon from "@material-ui/icons/Add";
import AddChallange from "./AddChallenge";
import EditChallange from "./editchallenge";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import brace from "brace";
import AceEditor from "react-ace";
import Divider from "@material-ui/core/Divider";
import "brace/mode/java";
import "brace/mode/c_cpp";
import "brace/mode/python";

import "brace/mode/html";
import "brace/theme/github";
import "brace/theme/dreamweaver";
import "brace/theme/chrome";
class challengebank extends React.Component {
  state = {
    showForm: false,
    show: true,
    items: [],
    viewdetatil: false,
    deatale: [],
    testcasedeatatl: [],
    edit: false,
    editid: "",
    value: "",
    id: "",
    visible: false,
    hw: [],
    hwid: "",
    hwass: ""
  };
  handlehw = (event, id) => {
    this.setState({ hwass: event.target.value, hwid: id });
    console.log(id + event.target.value);
  };
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/challenge/?search=" + this.props.username, {})
      .then(res => {
        let list = this.state.items;

        res.data.map(v => (v.questionbank === "true" ? list.push(v) : null));
        this.setState({
          items: list
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  viweadd = () => {
    let list = this.state.list;
    list.push("Add Challenge");
    this.setState({
      list: list,
      showForm: true,
      show: false,
      viewdetatil: false
    });
  };
  confirmShow = row => {
    this.setState({ id: row.id, visible: true });
  };
  handleOk = () => {
    this.setState({ hwass: "" });
    axios
      .get(
        "http://127.0.0.1:8000/hwincourse/" + parseInt(this.state.hwid, 10),
        {}
      )
      .then(res => {
        let list = res.data.question;
        if (!list.includes(this.state.id)) {
          list.push(this.state.id);
          axios
            .put("http://127.0.0.1:8000/hwincourse/" + this.state.hwid, {
              hwname: res.data.hwname.toString(),
              descreption: res.data.descreption.toString(),
              startDate: res.data.startDate,
              endDate: res.data.endDate,
              show: res.data.show,
              courseid: res.data.courseid.toString(),
              instructor: this.props.username,
              question: list,
              instructure: res.data.instructure,
              instructurestudent: res.data.instructurestudent
            })
            .then(res => {
              Modal.success({
                title: " success ",
                content: "the challenge added successfully "
              });
              this.setState({
                visible: false
              });
            });
        } else {
          Modal.warning({
            title: " warning ",
            content: "this challenge already exist in this homework"
          });
        }
      });
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };
  deatail = (id, val) => {
    this.props.list(val);
    this.setState({ editid: id, show: false, viewdetatil: true });
  };
  hide = () => {
    this.setState({
      show: true,
      viewdetatil: false,
      showForm: false,
      edit: false
    });
    this.props.hideq();
  };

  request = () => {
    this.props.request();
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };
  render() {
    return (
      <div>
        {this.state.show ? (
          <div>
            {this.state.items.length !== 0 ? (
              <div style={{}}>
                <Row>
                  {" "}
                  <Col
                    span={24}
                    style={{
                      postion: "relative",
                      float: "left",
                      marginLeft: "2%"
                    }}
                  >
                    {" "}
                    <p
                      style={{
                        textAlign: "left",
                        color: "#305656",
                        fontSize: 17
                      }}
                    >
                      please choose challenge you want
                    </p>
                  </Col>
                  <Col span={24}>
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
                </Row>

                <Table
                  striped
                  bordered
                  size="sm"
                  style={{
                    padding: 50,
                    marginLeft: "2%",
                    width: "96%",
                    maxHeight: 300,
                    positon: "relative",
                    overflow: "auto",
                    textAlign: "left",

                    color: " #456a6a"
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <th
                        style={{
                          margin: 10,
                          fontSize: 17,
                          background: "#fff",
                          color: " #456a6a",
                          textAlign: "left"
                        }}
                      >
                        Challenge name
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
                            <TableCell align="left">
                              <Button
                                style={{ color: " #456a6a" }}
                                onClick={() =>
                                  this.deatail(row.id, row.challengeName)
                                }
                              >
                                {row.challengeName}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    />
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 20,
                  marginBottom: 0,
                  minHeight: 450
                }}
              >
                <Empty
                  style={{ marginTop: "7%" }}
                  description="No Challeng In challenge bank"
                />
              </div>
            )}{" "}
          </div>
        ) : null}{" "}
        {this.state.viewdetatil ? (
          <div>
            <Challenge
              editid={this.state.editid}
              username={this.props.username}
              hide={this.hide}
              request={this.request}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default challengebank;
