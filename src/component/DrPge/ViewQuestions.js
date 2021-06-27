import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Table from "react-bootstrap/Table";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchResults from "react-filter-search";
import { Empty, Icon, Col, Row, Modal, Input, Breadcrumb } from "antd";
import AddIcon from "@material-ui/icons/Add";
import AddChallange from "./AddChallenge";
import EditChallange from "./editchallenge";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import brace from "brace";
import Challengebank from "./challengebank";
import AceEditor from "react-ace";

import "brace/mode/java";
import "brace/mode/c_cpp";
import "brace/mode/python";

import "brace/mode/html";
import "brace/theme/github";
import "brace/theme/dreamweaver";
import "brace/theme/chrome";
class ViewQuestions extends React.Component {
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
    hwass: "",
    list: ["My Questions"],
    checkedItems: new Map(),
    bank: false,
    hidee: false
  };
  handlehw = (event, id) => {
    this.setState({ hwass: event.target.value, hwid: id });
    console.log(id + event.target.value);
  };
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/challenge/?search=" + this.props.username, {})
      .then(res => {
        res.data.map(v =>
          v.questionbank === "true"
            ? this.setState(prevState => ({
                checkedItems: prevState.checkedItems.set(v.id.toString(), true)
              }))
            : null
        );
        this.setState({
          items: res.data
        });
      })
      .catch(err => {
        console.log(err.message);
      });
    axios
      .get(
        "http://127.0.0.1:8000/hwincourse/?search=" + this.props.username,
        {}
      )
      .then(res => {
        this.setState({
          hw: res.data
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  viweadd = () => {
    let list = this.state.list;
    list.push("Add Question");
    this.setState({
      list: list,
      showForm: true,
      show: false
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
  list = val => {
    let list = this.state.list;
    list.push(val);
    this.setState({ list: list });
  };
  deatail = (id, val) => {
    let list = this.state.list;
    list.push(val);
    axios
      .get("http://127.0.0.1:8000/challenge/" + id, {})
      .then(res => {
        this.setState({
          list: list,
          deatale: res.data,
          show: false,
          showForm: false,
          viewdetatil: true
        });
      })
      .catch(err => {
        console.log(err.message);
      });
    axios
      .get("http://127.0.0.1:8000/Texttestcase/?search=" + id, {})
      .then(res => {
        this.setState({
          testcasedeatatl: res.data
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  hide = () => {
    this.setState({
      show: true,
      viewdetatil: false,
      showForm: false,
      edit: false,

      bank: false
    });
  };
  deletech = id => {
    axios.delete("http://127.0.0.1:8000/challenge/" + id).then(res => {
      console.log(res.data);
      axios
        .get(
          "http://127.0.0.1:8000/challenge/?search=" + this.props.username,
          {}
        )
        .then(res => {
          this.setState({
            items: res.data
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };
  hideq = () => {
    this.setState({
      list: ["My Questions", "Add from Question Bank"]
    });
  };
  viwebank = () => {
    let list = this.state.list;
    list.push("Add from Question Bank");
    this.setState({
      list: list,
      showForm: false,
      show: false,
      bank: true
    });
  };
  request = () => {
    axios
      .get("http://127.0.0.1:8000/challenge/?search=" + this.props.username, {})
      .then(res => {
        this.setState({
          items: res.data
        });
      })
      .catch(err => {
        console.log(err.message);
      });
    this.setState({
      showForm: false,
      show: true,
      bank: false,
      list: ["My challanges"]
    });
  };
  edit = id => {
    let list = this.state.list;
    list.push("Edit Question");
    this.setState({
      list: list,
      show: false,
      edit: true,
      showForm: false,
      bank: false,
      editid: id
    });
  };

  reverse = val => {
    if (val === "My Questions") {
      this.setState({
        list: ["My Questions"],
        show: true,
        viewdetatil: false,
        edit: false,
        bank: false,
        hidee: false,
        showForm: false
      });
    }
    if (val === "Add from Question Bank") {
      this.setState({
        list: ["My Questions", "Add from Question Bank"],

        showForm: false,
        show: false,
        bank: true
      });
    }
  };
  selectedquestion = (value, e) => {
    const item = e.target.id;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked)
    }));

    if (e.target.checked) {
      axios.get("http:/127.0.0.1:8000/challenge/" + value.id, {}).then(res => {
        axios
          .put("http:/127.0.0.1:8000/challenge/" + value.id, {
            challengeName: res.data.challengeName,
            description: res.data.description,
            instructor: res.data.instructor,
            questionbank: "true",
            language: res.data.language,
            keysolution: res.data.keysolution
          })
          .then(res => {});
      });
    } else {
      axios.get("http:/127.0.0.1:8000/challenge/" + value.id, {}).then(res => {
        axios
          .put("http:/127.0.0.1:8000/challenge/" + value.id, {
            challengeName: res.data.challengeName,
            description: res.data.description,
            instructor: res.data.instructor,
            questionbank: "false",
            language: res.data.language,
            keysolution: res.data.keysolution
          })
          .then(res => {});
      });
    }
  };
  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };
  render() {
    return (
      <div>
        <div>
          <Row>
            <Col span={24}>
              <Breadcrumb
                style={{
                  textAlign: "left",
                  marginTop: "3%",
                  marginLeft: "20px",
                  postion: "relative",
                  float: "left",
                  color: "#456a6a"
                }}
              >
                {this.state.list.map(val => (
                  <Breadcrumb.Item style={{ fontSize: 22 }}>
                    <Link to=" " onClick={() => this.reverse(val)}>
                      {" "}
                      {val}
                    </Link>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </Col>
          </Row>
          {this.state.items.length !== 0 ? (
            <div
              style={
                this.state.show
                  ? {
                      background: "#fff",
                      padding: 24,
                      margin: 20,
                      marginBottom: 0,
                      minHeight: 450
                    }
                  : { display: "none" }
              }
            >
              <Row>
                <Col span={24}>
                  <div
                    style={{
                      textAlign: "right",
                      margin: 5,
                      marginRight: "2%",
                      postion: "relative",
                      float: "right"
                    }}
                  >
                    <Button
                      onClick={this.viweadd}
                      size="small"
                      style={{
                        postion: "relative",
                        border: "1px solid #456a6a",
                        borderRadius: "5px",
                        padding: 5,

                        height: 40,
                        background: "#fafafa",
                        color: "#456a6a"
                      }}
                    >
                      New Question
                      <AddIcon />
                    </Button>
                  </div>{" "}
                  <div
                    style={{
                      textAlign: "right",
                      margin: 5,
                      marginRight: "2%",
                      postion: "relative",
                      float: "right"
                    }}
                  >
                    <Button
                      onClick={this.viwebank}
                      size="small"
                      style={{
                        postion: "relative",
                        border: "1px solid #456a6a",
                        borderRadius: "5px",
                        padding: 5,

                        height: 40,
                        background: "#fafafa",
                        color: "#456a6a"
                      }}
                    >
                      Add from Question bank
                      <AddIcon />
                    </Button>
                  </div>
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
              <Modal
                title="choose homework"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <div style={{ maxHeight: 350, overflow: "auto" }}>
                  <FormControl>
                    <RadioGroup
                      style={{ marginTop: 10 }}
                      aria-label="role"
                      name="gender1"
                      value={this.state.hwass}
                    >
                      {this.state.hw.map(val => (
                        <FormControlLabel
                          value={val.hwname}
                          control={
                            <Radio
                              color="primary"
                              onChange={e => this.handlehw(e, val.id)}
                            />
                          }
                          label={val.hwname}
                        />
                      ))}{" "}
                    </RadioGroup>
                  </FormControl>
                </div>
              </Modal>
              <div>
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
                        Question name
                      </th>

                      <th
                        style={{
                          fontSize: 17,
                          background: "#Fff",
                          color: " #617f7f",
                          textAlign: "center"
                        }}
                      >
                        Add to Question bank
                      </th>
                      <th
                        style={{
                          fontSize: 17,
                          background: "#Fff",
                          color: "  #617f7f",
                          textAlign: "center"
                        }}
                      >
                        Edit
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
                        Delete
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
                              <Button
                                style={{ color: " #456a6a" }}
                                onClick={() =>
                                  this.deatail(row.id, row.challengeName)
                                }
                              >
                                {row.challengeName}
                              </Button>
                            </TableCell>

                            <TableCell align="center">
                              <Checkbox
                                size="lg"
                                style={{ width: 30, color: " #617f7f" }}
                                id={row.id.toString()}
                                checked={this.state.checkedItems.get(
                                  row.id.toString()
                                )}
                                onChange={e => this.selectedquestion(row, e)}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                style={{ color: "  #617f7f" }}
                                onClick={() => this.edit(row.id)}
                              >
                                {" "}
                                <Icon type="edit" />
                              </Button>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                style={{
                                  color: "  #617f7f"
                                }}
                                onClick={() => this.deletech(row.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    />
                  </TableBody>
                </Table>
              </div>
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
              <Empty style={{ marginTop: "7%" }} description="No Challeng" />
            </div>
          )}{" "}
          <div
            style={
              this.state.viewdetatil
                ? {
                    background: "#fff",
                    padding: 24,
                    margin: 20,
                    marginBottom: 0,
                    minHeight: 450
                  }
                : { display: "none" }
            }
          >
            {" "}
            <div
              style={{
                width: "70%",
                textAlign: "left",
                color: "#456a6a",
                background: "#Fff",
                fontSize: 17
              }}
            >
              <ul>
                <li>
                  {" "}
                  <Typography style={{ color: "#456a6a", fontSize: 17 }}>
                    <div style={{ fontWeight: "bold" }}> Name :</div>{" "}
                    {this.state.deatale.challengeName}
                  </Typography>
                </li>
                <li>
                  <Typography
                    style={{ marginTop: 10, color: "#456a6a", fontSize: 17 }}
                  >
                    {" "}
                    <div style={{ marginTop: 10, fontWeight: "bold" }}>
                      Description :
                    </div>{" "}
                    {this.state.deatale.description}
                  </Typography>
                </li>
                <li>
                  {" "}
                  <Typography
                    style={{ marginTop: 10, color: "#456a6a", fontSize: 17 }}
                  >
                    <div style={{ fontWeight: "bold" }}> Input format</div>{" "}
                    {this.state.deatale.inputformat}
                  </Typography>
                </li>{" "}
                <li>
                  {" "}
                  <Typography
                    style={{ marginTop: 10, color: "#456a6a", fontSize: 17 }}
                  >
                    <div style={{ fontWeight: "bold" }}> Output format</div>{" "}
                    {this.state.deatale.outputformat}
                  </Typography>
                </li>{" "}
                <li>
                  {" "}
                  <Typography
                    style={{ marginTop: 10, color: "#456a6a", fontSize: 17 }}
                  >
                    <div style={{ fontWeight: "bold" }}> Sample input</div>{" "}
                    {this.state.deatale.sampleinput}
                  </Typography>
                </li>{" "}
                <li>
                  {" "}
                  <Typography style={{ color: "#456a6a", fontSize: 17 }}>
                    <div style={{ fontWeight: "bold" }}>Sample output</div>{" "}
                    {this.state.deatale.sampleoutput}
                  </Typography>
                </li>
                <li>
                  <Typography
                    style={{
                      marginTop: 10,
                      color: "#456a6a",
                      fontWeight: "bold",
                      fontSize: 17
                    }}
                  >
                    Test cases:
                  </Typography>
                  <ol>
                    {this.state.testcasedeatatl.map(test => (
                      <div>
                        <li>
                          <span style={{ margin: 5, fontSize: 17 }}>
                            <span style={{ fontWeight: "bold" }}>input :</span>{" "}
                            {test.Input}{" "}
                          </span>
                          <span style={{ margin: 5, fontSize: 17 }}>
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              output :
                            </span>{" "}
                            {test.output}{" "}
                          </span>
                          <span style={{ margin: 5, fontSize: 17 }}>
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              weight :
                            </span>{" "}
                            {test.weight}%{" "}
                          </span>
                          <span style={{ margin: 5, fontSize: 17 }}>
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              visible :{" "}
                            </span>
                            {test.visable}{" "}
                          </span>
                        </li>
                      </div>
                    ))}
                  </ol>{" "}
                </li>{" "}
              </ul>
              {this.state.deatale.keysolution !== null ? (
                <AceEditor
                  id="editor"
                  mode="c_cpp"
                  theme="chrome"
                  fontSize="15px"
                  value={this.state.deatale.keysolution}
                  name="code"
                  width="100%"
                  height="200"
                  editorProps={{ $blockScrolling: true }}
                />
              ) : null}
            </div>
          </div>
          {this.state.edit ? (
            <div
              style={{
                background: "#fff",
                padding: 24,
                margin: 20,
                marginBottom: 0,
                minHeight: 450
              }}
            >
              <EditChallange
                editid={this.state.editid}
                username={this.props.username}
                hide={this.hide}
                request={this.request}
              />
            </div>
          ) : null}
          {this.state.showForm ? (
            <div
              style={{
                background: "#fff",
                padding: 24,
                margin: 20,
                marginBottom: 0,
                minHeight: 450
              }}
            >
              <AddChallange
                username={this.props.username}
                hide={this.hide}
                request={this.request}
              />
            </div>
          ) : null}
          {this.state.bank ? (
            <div
              style={{
                background: "#fff",
                padding: 24,
                margin: 20,
                marginBottom: 0,
                minHeight: 450
              }}
            >
              <Challengebank
                username={this.props.username}
                hide={this.hide}
                request={this.request}
                list={this.list}
                hideq={this.hideq}
                hidee={this.state.hidee}
              />
            </div>
          ) : null}
          <div
            style={{
              color: "#fff",
              marginTop: 30,
              background: "#456a6a",
              width: "90%",
              marginLeft: "5%"
            }}
          >
            <p>
              CopyRight@2019|Developed by:Lama Dweikat|Supervisor:Samer Arandi{" "}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewQuestions;
