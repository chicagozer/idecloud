import React from "react";
import Typography from "@material-ui/core/Typography";
import Table from "react-bootstrap/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import EditHomework from "./Table";
import AddIcon from "@material-ui/icons/Add";
import AddHomework from "./addHomework";
import Submition from "./submition";
import Qhw from "./hwq";

import {
  Collapse,
  Icon,
  Empty,
  Alert,
  Modal,
  Checkbox,
  Col,
  Row,
  Breadcrumb
} from "antd";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const Panel = Collapse.Panel;
var fileDownload = require("react-file-download");
class ShowHW extends React.Component {
  state = {
    expanded: null,
    courses: [],
    show: true,
    rows: [],
    open: false,
    confirmvalue: {},
    corse: "",
    edit: false,
    editid: "",
    hwdetail: [],
    deatail: false,
    questions: [],
    viweadd: false,
    nameid: "",
    supervisorhw: [],
    showlist: [],
    hidelist: [],
    studentid: [],
    instructourobj: "",
    sectionincourse: [],
    visible: false,
    sectionnum: [],
    error1: "",
    subhw: "",
    vsub: false,
    list: ["My Homeworks"],
    prop: true,
    sbq: false,
    qid: ""
  };
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/user/?search=" + this.props.username, {})
      .then(res => {
        this.setState({
          nameid: res.data.map(val => val.id).toString()
        });
        console.log(this.state.nameid);

        axios
          .get(
            "http://127.0.0.1:8000/hwincourse/?search=" + this.props.username,
            {}
          )
          .then(res => {
            let lists = this.state.courses;
            let list2 = this.state.showlist;
            let list3 = this.state.hidelist;
            res.data.map(
              v => (
                v.show === "f" ? list2.push(v.id) : list3.push(v.id),
                !lists.includes(v.courseid) ? lists.push(v.courseid) : null
              )
            );
            this.setState({
              rows: res.data,
              courses: lists,
              showlist: list2,
              hidelist: list3
            });
          })
          .catch(err => {
            console.log(err.message);
          });
      });
    axios
      .get(
        "http://127.0.0.1:8000/supervisor/?search=" + this.props.username,
        {}
      )
      .then(res => {
        res.data.map(value =>
          axios
            .get(
              "http://127.0.0.1:8000/hwincourse/?search=" + value.instructor,
              {}
            )
            .then(res => {
              let lists = this.state.supervisorhw;
              res.data.length !== 0 ? lists.push(res.data) : null;
              let list = this.state.courses;
              let list2 = this.state.showlist;
              let list3 = this.state.hidelist;
              res.data.map(
                v => (
                  v.show === "f" ? list2.push(v.id) : list3.push(v.id),
                  !list.includes(v.courseid) && v.show === "t"
                    ? list.push(v.courseid)
                    : null
                )
              );
              this.setState({
                supervisorhw: lists,
                courses: list,
                showlist: list2,
                hidelist: list3
              });
            })
            .catch(err => {
              console.log(err.message);
            })
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  download1 = (f, data) => {
    fileDownload(data, f + ".xlsx");
  };
  sbq = (value, v2) => {
    let list = this.state.list;
    list.push(v2.challengeName);
    this.setState({
      sbq: true,
      show: false,
      edit: false,
      deatail: false,
      viweadd: false,
      vsub: false,
      qid: v2.id,
      list: list
    });
  };
  confirmShow = value => {
    this.setState({
      open: true,
      confirmvalue: value,
      corse: value.courseid,
      sectionincourse: [],
      error: ""
    });
    axios
      .get(
        "http://127.0.0.1:8000/courseinstructure/?search=" + value.courseid,
        {}
      )
      .then(res => {
        res.data.map(name =>
          name.instructorname.toString() === this.state.nameid
            ? axios
                .get(
                  "http://127.0.0.1:8000/instructorstudent/?search=" + name.id,
                  {}
                )
                .then(res => {
                  this.setState({
                    studentid: res.data.map(v => v.id),
                    instructourobj: name.id
                  });
                  if (this.state.studentid.length !== 0) {
                    this.state.studentid.map(v =>
                      axios
                        .get("http://127.0.0.1:8000/instructorstudent/" + v, {})
                        .then(res => {
                          let list = this.state.sectionincourse;
                          list.push(res.data);
                          this.setState({
                            sectionincourse: list,

                            open: true
                          });
                        })
                        .catch(err => {
                          console.log(err.message);
                        })
                    );
                  } else {
                    this.setState({
                      error1: "No student in this course",
                      open: true
                    });
                  }
                })
            : null
        );
      });
  };

  cancel = () => {
    this.setState({ open: false });
  };

  show = value => {
    axios
      .get(
        "http://127.0.0.1:8000/courseinstructure/?search=" + value.courseid,
        {}
      )
      .then(res => {
        res.data.map(name =>
          name.instructorname.toString() === this.state.nameid
            ? axios
                .get(
                  "http://127.0.0.1:8000/instructorstudent/?search=" + name.id,
                  {}
                )
                .then(res => {
                  this.setState({
                    studentid: res.data.map(v => v.id),
                    instructourobj: name.id
                  });
                  console.log(this.state.studentid);
                  console.log(this.state.instructourobj);
                  this.state.studentid.length !== 0 &&
                  this.state.instructourobj !== 0
                    ? axios
                        .put("http://127.0.0.1:8000/hwincourse/" + value.id, {
                          show: "t",
                          hwname: value.hwname,
                          descreption: value.descreption,
                          startDate: value.startDate,
                          endDate: value.endDate,
                          courseid: value.courseid,
                          instructor: value.instructor,
                          question: value.question,
                          instructure: this.state.instructourobj,
                          instructurestudent: this.state.sectionnum,
                          storepath: value.storepath
                        })
                        .then(res => {
                          Modal.success({
                            title: " success ",
                            content: "the homework sent successfully"
                          });
                          this.setState({
                            showlist: [],
                            hidelist: []
                          });
                          axios
                            .get(
                              "http://127.0.0.1:8000/hwincourse/?search=" +
                                this.props.username,
                              {}
                            )
                            .then(res => {
                              let lists = this.state.courses;
                              let list2 = this.state.showlist;
                              let list3 = this.state.hidelist;
                              res.data.map(
                                v => (
                                  v.show === "f"
                                    ? list2.push(v.id)
                                    : list3.push(v.id),
                                  !lists.includes(v.courseid)
                                    ? lists.push(v.courseid)
                                    : null
                                )
                              );
                              this.setState({
                                rows: res.data,
                                courses: lists,
                                showlist: list2,
                                hidelist: list3
                              });

                              console.log(this.state.courses);
                            })
                            .catch(err => {
                              console.log(err.message);
                            });
                        })
                    : this.setState({ visible: true }).catch(err => {
                        console.log(err.message);
                      });
                })
                .catch(err => {
                  console.log(err.message);
                })
            : Modal.warning({
                title: " warning ",
                content: "the course ist have student"
              })
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  ok = () => {
    this.show(this.state.confirmvalue);
    this.setState({ open: false });
  };
  deletehw = id => {
    axios.delete("http://127.0.0.1:8000/hwincourse/" + id).then(res => {
      console.log(res.data);
      this.request();
    });
  };
  edit = id => {
    let list = this.state.list;
    list.push("Edit Homework");
    this.setState({
      list: list,
      show: false,
      edit: true,
      deatail: false,
      editid: id,
      viweadd: false,
      vsub: false,
      sbq: false
    });
  };
  viweadd = () => {
    let list = this.state.list;
    list.push("Add Homework");
    this.setState({
      list: list,
      show: false,
      edit: false,
      deatail: false,
      sbq: false,
      viweadd: true,
      vsub: false
    });
  };
  hide = () => {
    this.setState({
      list: ["My Homeworks"],
      show: true,
      edit: false,
      deatail: false,
      viweadd: false,
      vsub: false,
      sbq: false
    });
  };
  request = () => {
    this.setState({
      showlist: [],
      hidelist: []
    });

    axios
      .get(
        "http://127.0.0.1:8000/hwincourse/?search=" + this.props.username,
        {}
      )
      .then(res => {
        let lists = this.state.courses;
        let list2 = this.state.showlist;
        let list3 = this.state.hidelist;
        res.data.map(
          v => (
            v.show === "f" ? list2.push(v.id) : list3.push(v.id),
            !lists.includes(v.courseid) ? lists.push(v.courseid) : null
          )
        );
        this.setState({
          rows: res.data,
          courses: lists,
          showlist: list2,
          hidelist: list3
        });

        console.log(this.state.courses);
      })
      .catch(err => {
        console.log(err.message);
      });
    axios
      .get(
        "http://127.0.0.1:8000/supervisor/?search=" + this.props.username,
        {}
      )
      .then(res => {
        res.data.map(value =>
          axios
            .get(
              "http://127.0.0.1:8000/hwincourse/?search=" + value.instructor,
              {}
            )
            .then(res => {
              let lists = this.state.supervisorhw;
              res.data.length !== 0 ? lists.push(res.data) : null;
              let list = this.state.courses;
              let list2 = this.state.showlist;
              let list3 = this.state.hidelist;
              res.data.map(
                v => (
                  v.show === "f" ? list2.push(v.id) : list3.push(v.id),
                  !list.includes(v.courseid) && v.show === "t"
                    ? list.push(v.courseid)
                    : null
                )
              );
              this.setState({
                supervisorhw: lists,
                courses: list,
                showlist: list2,
                hidelist: list3
              });
              console.log(this.state.courses);
            })
            .catch(err => {
              console.log(err.message);
            })
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  handleClose = () => {
    this.setState({ visible: false });
  };
  show1 = hw => {
    Modal.info({
      title: "Studants mark in " + hw + "homework",
      width: "800px",
      content: (
        <div>
          <Table
            striped
            bordered
            size="sm"
            style={{
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
                    fontSize: 17,
                    background: "#Fff",
                    color: " #456a6a",
                    textAlign: "center"
                  }}
                >
                  Student name
                </th>
                <th
                  style={{
                    fontSize: 17,
                    background: "#Fff",
                    color: " #456a6a",
                    textAlign: "center"
                  }}
                >
                  Mark
                </th>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <span style={{ color: " #456a6a" }}>Lama dweikat</span>
                </TableCell>
                <TableCell align="center">
                  <span style={{ color: " #456a6a" }}>50</span>
                </TableCell>
              </TableRow>
         
            </TableBody>
          </Table>
        </div>
      ),
      onOk() {}
    });
  };
  deatail = (id, val) => {
    let list = this.state.list;
    list.push(val);
    this.setState({ list: list, deatail: true, show: false, questions: [] });
    axios
      .get("http://127.0.0.1:8000/hwincourse/" + id, {})
      .then(res => {
        this.setState({
          hwdetail: res.data
        });
        console.log(res.data);

        res.data.question.map(value =>
          axios
            .get("http://127.0.0.1:8000/challenge/" + value, {})
            .then(res => {
              let lists = this.state.questions;
              lists.push(res.data);
              this.setState({
                questions: lists
              });
            })
            .catch(err => {
              console.log(err.message);
            })
        );
        console.log(this.state.questions);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  add = val => {
    let list = this.state.list;
    list.push(val);
    this.setState({ list: list });
  };
  reverse = val => {
    if (val === "My Homeworks") {
      this.setState({
        list: ["My Homeworks"],
        show: true,
        edit: false,
        deatail: false,
        viweadd: false,
        vsub: false,
        sbq: false
      });
    }
    if (val === "Add Homework") {
      this.setState({
        list: ["My Homeworks", "Add Homework"],
        show: false,
        edit: false,
        deatail: false,

        viweadd: true,
        vsub: false,
        prop: false,
        sbq: false
      });
    }
    if (val.includes("submission of")) {
      this.setState({
        list: ["My Homeworks", val],
        show: false,
        edit: false,
        deatail: false,

        viweadd: false,
        vsub: true,
        prop: false,
        sbq: false
      });
    }
  };
  sectionnum = (e, id) => {
    let lists = this.state.sectionnum;
    if (e.target.checked) {
      lists.push(id);
    } else {
      lists.splice(lists.indexOf(id), 1);
    }
    this.setState({
      sectionnum: lists
    });
    console.log(lists);
  };
  showsumbition = (val, val2) => {
    let list = this.state.list;
    list.push("submission / " + val2);
    this.setState({ subhw: val, vsub: true, show: false });
  };
  render() {
    return (
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
                  <Link to="" onClick={() => this.reverse(val)}>
                    {" "}
                    {val}
                  </Link>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </Col>
        </Row>
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
          {this.state.visible ? (
            <Alert
              style={{
                border: "2px solid red",
                borderRadius: "5px",
                fontSize: 20,
                textAlign: "left",
                margin: 5,
                width: "50%"
              }}
              showIcon
              message="Error"
              description="Please add the students to the course and then show the homework  "
              type="error"
              closable
              banner
              afterClose={this.handleClose}
            />
          ) : null}{" "}
          <Row
            style={{
              width: "96%",
              paddingTop: 10,
              marginLeft: "2%",
              marginBottom: 10,

              background: "#fafafa",
              textAlign: "left",
              color: "#305656"
            }}
          >
            <Col span={5}>
              <Typography
                style={{
                  color: "#456a6a",
                  fontSize: 15,
                  paddingTop: 9
                }}
              >
                {" "}
                Course name
              </Typography>
            </Col>
            <Col span={5}>
              <Typography
                style={{
                  color: "#456a6a",
                  fontSize: 15,
                  paddingTop: 9
                }}
              >
                Number of homework
              </Typography>
            </Col>
            <Col span={14}>
              <div
                style={{
                  margin: 10,
                  marginRight: "2%",
                  postion: "relative",
                  float: "right"
                }}
              >
                <Button
                  onClick={this.viweadd}
                  size="small"
                  color="primary"
                  style={{
                    postion: "relative",
                    border: "1px solid #456a6a",
                    borderRadius: "5px",
                    padding: 5,
                    color: "#456a6a",
                    background: "#fafafa"
                  }}
                >
                  Add Homework
                  <AddIcon />
                </Button>
              </div>
            </Col>
          </Row>
          {this.state.courses.length > 0 ? (
            <div>
              {this.state.courses.map(course => (
                <div>
                  <Collapse
                    style={{
                      marginLeft: "2%",
                      pading: 0,

                      border: "1px solid #456a6a",
                      color: "#456a6a",
                      borderRadius: "5px",
                      width: "96%",
                      marginBottom: 10,
                      background: "#fafafa",
                    }}
                    expandIcon={({ isActive }) => (
                      <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                    )}
                  >
                    <Panel
                      header={
                        <span>
                          {" "}
                          <Typography
                            style={{
                              marginTop: 15,
                              marginTop: 10,
                              marginBottom: 10
                            }}
                          >
                            {" "}
                            <span style={{ width: 80 }}> {course}</span>
                            <span style={{ marginLeft: 200 }}>2</span>
                          </Typography>
                        </span>
                      }
                      key={course}
                      style={{
                        background: "#f5f5f5",
                        textAlign: "left",

                        border: 0,
                        color: "#fff",
                        overflow: "hidden"
                      }}
                    >
                      {" "}
                      <Modal
                        title="Student section you want to send them homework"
                        visible={this.state.open}
                        onOk={this.ok}
                        onCancel={this.cancel}
                      >
                        {" "}
                        <div style={{ color: "red" }}>{this.state.error1}</div>
                        {this.state.sectionincourse.map(val => (
                          <div>
                            <FormControlLabel
                              key={val.id.toString()}
                              style={{ margin: 5 }}
                              control={
                                <Checkbox
                                  color="primary"
                                  id={val.id.toString()}
                                  onChange={e => this.sectionnum(e, val.id)}
                                />
                              }
                              label={val.sectionnumber.toString()}
                            />
                          </div>
                        ))}
                      </Modal>
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
                                fontSize: 14,
                                background: "#Fff",
                                color: " #456a6a",
                                textAlign: "center"
                              }}
                            >
                              Homework name
                            </th>

                            <th
                              style={{
                                fontSize: 14,
                                background: "#Fff",
                                color: " #456a6a",
                                textAlign: "center"
                              }}
                            >
                              Created by
                            </th>
                            <th
                              style={{
                                fontSize: 14,
                                background: "#Fff",
                                color: " #456a6a",
                                textAlign: "center"
                              }}
                            >
                              Action
                            </th>
                            <th
                              style={{
                                fontSize: 14,
                                background: "#Fff",
                                color: " #456a6a",
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
                              Show Mark
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
                              Download Mark
                            </th>
                            <th
                              style={{
                                fontSize: 14,
                                background: "#Fff",
                                color: " #456a6a",
                                textAlign: "center"
                              }}
                            >
                              {" "}
                              Delete
                            </th>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.rows.map(row =>
                            row.courseid === course && row.show === "f" ? (
                              <TableRow key={row.id}>
                                <TableCell align="center">
                                  <Button
                                    style={{ color: " #456a6a" }}
                                    onClick={() =>
                                      this.deatail(row.id, row.hwname)
                                    }
                                  >
                                    {row.hwname}
                                  </Button>
                                </TableCell>

                                <TableCell align="center">me</TableCell>
                                <TableCell align="center">
                                  <Button
                                    style={{ color: " #456a6a" }}
                                    onClick={() => this.confirmShow(row)}
                                  >
                                    {" "}
                                    send
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    style={{ color: " #456a6a" }}
                                    onClick={() => this.edit(row.id)}
                                  >
                                    {" "}
                                    <Icon type="edit" />
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  <Button style={{ color: "  #617f7f" }}>
                                    {" "}
                                    ---
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  <Button style={{ color: "  #617f7f" }}>
                                    {" "}
                                    ---
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  <IconButton
                                    style={{
                                      postion: "relative",
                                      float: "center",
                                      color: " #456a6a"
                                    }}
                                    onClick={() => this.deletehw(row.id)}
                                    size="small"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ) : null
                          )}{" "}
                          {this.state.rows.map(row =>
                            row.courseid === course && row.show === "t" ? (
                              <TableRow key={row.id}>
                                <TableCell align="center">
                                  <Button
                                    style={{ color: " #456a6a" }}
                                    onClick={() =>
                                      this.deatail(row.id, row.hwname)
                                    }
                                  >
                                    {row.hwname}
                                  </Button>
                                </TableCell>
                                <TableCell align="center">me</TableCell>
                                <TableCell align="center">
                                  <Button
                                    style={{ color: " #456a6a" }}
                                    onClick={() =>
                                      this.showsumbition(row.id, row.hwname)
                                    }
                                  >
                                    {" "}
                                    show submission
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    style={{ color: " #456a6a" }}
                                    onClick={() => this.edit(row.id)}
                                  >
                                    {" "}
                                    <Icon type="edit" />
                                  </Button>
                                </TableCell>{" "}
                                <TableCell align="center">
                                  {" "}
                                  <Button
                                    style={{ color: "  #617f7f" }}
                                    onClick={() => this.show1(row.hwname)}
                                  >
                                    {" "}
                                    <Icon type="eye" />{" "}
                                  </Button>{" "}
                                </TableCell>
                                <TableCell align="center">
                                  <Button
                                    style={{ color: "  #617f7f" }}
                                    onClick={() =>
                                      this.download1(row.hwname, "")
                                    }
                                  >
                                    {" "}
                                    <Icon type="download" />
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  <IconButton
                                    style={{
                                      postion: "relative",
                                      float: "center",
                                      color: " #456a6a"
                                    }}
                                    onClick={() => this.deletehw(row.id)}
                                    size="small"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ) : null
                          )}
                          {}
                        </TableBody>
                      </Table>{" "}
                    </Panel>
                  </Collapse>
                </div>
              ))}
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
              <Empty style={{ marginTop: "7%" }} description="No Homworks" />
            </div>
          )}{" "}
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
            <EditHomework
              editid={this.state.editid}
              username={this.props.username}
              hide={this.hide}
              request={this.request}
              nameid={this.state.nameid}
            />
          </div>
        ) : null}{" "}
        {this.state.deatail ? (
          <div
            style={{
              background: "#fff",
              padding: 24,
              margin: 20,
              marginBottom: 0,
              minHeight: 450,
              textAlign: "left"
            }}
          >
            {" "}
            <ul>
              <li>
                <Typography style={{ color: "#456a6a", fontSize: 17 }}>
                  <div style={{ fontWeight: "bold" }}> Name :</div>{" "}
                  {this.state.hwdetail.hwname}
                </Typography>
              </li>
              <li>
                <Typography
                  style={{ marginTop: 10, color: "#456a6a", fontSize: 17 }}
                >
                  {" "}
                  <div style={{ fontWeight: "bold" }}> Description :</div>
                  {this.state.hwdetail.descreption}
                </Typography>
              </li>
              <li>
                <Typography
                  style={{
                    fontWeight: "bold",
                    marginTop: 10,
                    color: "#456a6a",
                    fontSize: 17
                  }}
                >
                  Challenges:
                </Typography>
              </li>{" "}
              <ol>
                {this.state.questions.map(val => (
                  <li>
                    <span style={{ margin: 5 }}>
                      <span
                        style={{
                          fontWeight: "bold",
                          margin: 5,
                          color: "#456a6a"
                        }}
                      >
                        {" "}
                        {val.challengeName}:
                      </span>{" "}
                      {val.description}
                    </span>
                  </li>
                ))}
              </ol>{" "}
              <li>
                <div>
                  <span
                    style={{ marginTop: 10, color: "#456a6a", fontSize: 17 }}
                  >
                    <div style={{ fontWeight: "bold" }}> Start Date :</div>{" "}
                    {this.state.hwdetail.startDate}{" "}
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <span
                    style={{ marginTop: 10, color: "#456a6a", fontSize: 17 }}
                  >
                    <div style={{ fontWeight: "bold" }}> Last Date :</div>{" "}
                    {this.state.hwdetail.endDate}{" "}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        ) : null}
        {this.state.viweadd ? (
          <div
            style={{
              background: "#fff",
              padding: 24,
              margin: 20,
              marginBottom: 0,
              minHeight: 450
            }}
          >
            <AddHomework
              username={this.props.username}
              hide={this.hide}
              request={this.request}
              nameid={this.state.nameid}
              add={this.add}
            />
          </div>
        ) : null}
        {this.state.vsub ? (
          <div
            style={{
              background: "#fff",
              padding: 24,
              margin: 20,
              marginBottom: 0,
              minHeight: 450
            }}
          >
            <Submition
              username={this.props.username}
              hide={this.hide}
              request={this.request}
              nameid={this.state.nameid}
              hwid={this.state.subhw}
              prop={this.state.prop}
              sbq={this.sbq}
            />
          </div>
        ) : null}{" "}
        {this.state.sbq ? (
          <div
            style={{
              background: "#fff",
              padding: 24,
              margin: 20,
              marginBottom: 0,
              minHeight: 450
            }}
          >
            <Qhw
              username={this.props.username}
              hide={this.hide}
              request={this.request}
              nameid={this.state.nameid}
              hwid={this.state.subhw}
              prop={this.state.prop}
              qid={this.state.qid}
            />
          </div>
        ) : null}{" "}
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
    );
  }
}

export default ShowHW;
