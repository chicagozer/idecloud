import React, { Component } from "react";
import { Col, Row, Icon, Modal, Input } from "antd";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Table from "react-bootstrap/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchResults from "react-filter-search";
import FormHelperText from "@material-ui/core/FormHelperText";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
class EditHomework extends Component {
  state = {
    hwname: "",
    courseName: "",
    description: "",

    show: true,
    courses: [],
    showquestion: false,
    startdate: "",
    lastdate: "",
    viewqestion: false,
    rows: [],
    viewdetatil: false,
    deatale: [],
    questions: [],
    error: "",
    reset: true,
    open: false,
    viwe: false,
    questionList: [],
    checkedItems: new Map(),
    instructourobj: "",
    studentid: [],
    sectionincourse: [],
    visible: false,
    sectionnum: [],
    error1: "",
    checkedsection: new Map(),
    value: ""
  };
  handleChange1 = event => {
    const { value } = event.target;
    this.setState({ value });
  };
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/challenge/?search=" + this.props.username, {})
      .then(res => {
        this.setState({
          rows: res.data
        });
        this.state.rows.map(v =>
          this.setState(prevState => ({
            checkedItems: prevState.checkedItems.set(v.id.toString(), false)
          }))
        );
      })
      .catch(err => {
        console.log(err.message);
      });
    axios
      .get("http://127.0.0.1:8000/hwincourse/" + this.props.editid, {})
      .then(res => {
        this.setState({
          hwname: res.data.hwname.toString(),
          courseName: res.data.courseid.toString(),
          description: res.data.descreption.toString(),
          startdate: res.data.startDate,
          lastdate: res.data.endDate,

          questions: res.data.question,
          studentid: res.data.instructurestudent
        });
        this.state.studentid.map(v =>
          this.setState(prevState => ({
            checkedsection: prevState.checkedsection.set(v, true)
          }))
        );

        this.state.questions.map(val => {
          this.setState(prevState => ({
            checkedItems: prevState.checkedItems.set(val.toString(), true)
          }));
          axios
            .get("http://127.0.0.1:8000/challenge/" + val, {})
            .then(res => {
              let lists = this.state.questionList;
              lists.push(res.data.challengeName.toString());

              this.setState({
                questionList: lists
              });
              console.log(this.state.questionList);
            })
            .catch(err => {
              console.log(err.message);
            });
        });

        console.log(this.state.checkedItems);
      })

      .catch(err => {
        console.log(err.message);
      });
    axios
      .get(
        "http://127.0.0.1:8000/courseinstructure/?search=" +
          this.props.username,
        {}
      )
      .then(res => {
        this.setState({
          courses: res.data
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  handleChange = value => {
    this.setState({
      instructourobj: "",
      studentid: []
    });

    axios
      .get("http://127.0.0.1:8000/courseinstructure/?search=" + value, {})
      .then(res => {
        res.data.map(name =>
          name.instructorname.toString() === this.props.nameid
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
                })
                .catch(err => {
                  console.log(err.message);
                })
            : null
        );
      })
      .catch(err => {
        console.log(err.message);
      });
    this.setState({
      courseName: value
    });
    console.log(value);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
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

  sethwname = newNumber => {
    this.setState({
      hwname: newNumber
    });
  };
  startdate = value => {
    this.setState({
      startdate: value
    });
  };
  lastdate = value => {
    this.setState({
      lastdate: value
    });
    console.log(this.state.lastdate);
  };
  description = value => {
    this.setState({
      description: value
    });
  };
  viewquestion = () => {
    this.state.questions.map(v =>
      this.setState(prevState => ({
        checkedItems: prevState.checkedItems.set(v.toString(), true)
      }))
    );
    this.setState({
      viewqestion: true,
      show: false,
      viewdetatil: false
    });
  };

  cancel = () => {
    this.setState({
      show: true,
      viewqestion: false,
      viewdetatil: false,
      questions: []
    });
  };
  selectsection = e => {
    e.preventDefault();

    this.setState({ sectionincourse: [], error: "" });
    if (this.state.questions.length !== 0) {
      if (this.state.studentid.length !== 0) {
        this.state.studentid.map(v =>
          axios
            .get("http://127.0.0.1:8000/instructorstudent/" + v, {})
            .then(res => {
              let list = this.state.sectionincourse;
              list.push(res.data);
              this.setState({
                sectionincourse: list,

                visible: true
              });
            })
            .catch(err => {
              console.log(err.message);
            })
        );
      } else {
        this.setState({ error1: "No student in this course", visible: true });
        console.log("nnnnnnn");
      }
    } else {
      this.setState({
        error: "please select questions"
      });
    }
  };
  viewdetatil = (value, val) => {
    axios
      .get("http://127.0.0.1:8000/challenge/" + value, {})
      .then(res => {
        this.setState({
          deatale: res.data
        });
        Modal.info({
          width: "500px",
          content: (
            <ul>
              <li>
                <Typography style={{ color: "#456a6a", fontSize: 17 }}>
                  <div style={{ fontWeight: "bold" }}> Name :</div>{" "}
                  {this.state.deatale.challengeName}
                </Typography>
              </li>
              <li>
                {" "}
                <Typography style={{ color: "#456a6a", fontSize: 17 }}>
                  description:
                </Typography>
                <Typography style={{ color: "#456a6a", fontSize: 17 }}>
                  {this.state.deatale.description}
                </Typography>
              </li>{" "}
            </ul>
          )
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  selectedquestion = (value, e) => {
    const item = e.target.id;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(value.id.toString(), isChecked)
    }));
    let lists = this.state.questions;
    if (e.target.checked) {
      lists.push(value.id);
    } else {
      lists.splice(lists.indexOf(value.id), 1);
    }
    this.setState({
      questions: lists
    });

    console.log(this.state.questions);
  };
  reset = () => {
    this.state.questions.map(
      value => (document.getElementById(value.toString()).checked = false)
    );
    this.setState({
      hwname: "",
      courseName: "",
      description: "",
      startdate: "",
      lastdate: "",
      questions: [],
      reset: false,
      error: "",
      questionList: []
    });
  };
  ok = () => {
    this.setState({
      show: true,
      viewqestion: false,
      viewdetatil: false
    });
    this.questionlist();
  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };
  savee = e => {
    e.preventDefault();
    if (this.state.questions.length !== 0) {
      axios
        .put("http://127.0.0.1:8000/hwincourse/" + this.props.editid, {
          hwname: this.state.hwname,
          descreption: this.state.description,
          startDate: this.state.startdate,
          endDate: this.state.lastdate,
          show: "f",
          courseid: this.state.courseName,
          instructor: this.props.username,
          question: this.state.questions,

          instructure: this.state.instructourobj,
          instructurestudent: this.state.studentid,
          storepath: this.props.nameid + "/"
        })
        .then(res => {
          this.reset();
          this.setState({ open: true });
          this.props.hide();
          this.props.request();
        })
        .catch(err => {
          console.log(err.message);
        });

      this.setState({ reset: true });
    } else {
      this.setState({
        error: "please select questions"
      });
    }
  };
  send = () => {
    if (this.state.sectionnum.length !== 0) {
      axios
        .put("http://127.0.0.1:8000/hwincourse/" + this.props.editid, {
          hwname: this.state.hwname,
          descreption: this.state.description,
          startDate: this.state.startdate,
          endDate: this.state.lastdate,
          show: "t",
          courseid: this.state.courseName,
          instructor: this.props.username,
          question: this.state.questions,
          instructure: this.state.instructourobj,
          instructurestudent: this.state.sectionnum,
          storepath: this.state.nameid + "/"
        })
        .then(res => {
          this.reset();
          this.setState({ open: true });
          this.props.hide();
          this.props.request();
        })
        .catch(err => {
          console.log(err.message);
        });
      this.setState({ reset: true });
    } else {
      this.setState({
        error1: "please select student secton"
      });
    }
  };
  render() {
    return (
      <div>
        <form
          error="true"
          style={
            this.state.show
              ? {
                  color: "#305656",

                  padding: 24,

                  minHeight: 350,
                  height: "auto",
                  textAlign: "left"
                }
              : { display: "none" }
          }
        >
          <p
            style={{
              textAlign: "left",
              color: "#305656",
              fontSize: 20
            }}
          >
            Edit {this.state.hwname}
          </p>
          <FormHelperText
            style={{ margin: 15, textAlign: "center" }}
            error={true}
          >
            {this.state.error}
          </FormHelperText>
          <Row>
            <Col span={4}>
              <InputLabel style={{ color: "#305656", width: 350 }}>
                Homework name{" "}
              </InputLabel>
            </Col>{" "}
            <Col span={18}>
              <Input
                placeholder="Enter Homework name"
                required
                style={{
                  width: 800,
                  height: 35,
                  color: "#456a6a",
                  border: "1px solid #456a6a",
                  borderRadius: "5px"
                }}
                onChange={event => this.sethwname(event.target.value)}
                value={this.state.hwname}
              />
            </Col>
          </Row>
          <Modal
            title="Student section you want to send them homework"
            visible={this.state.visible}
            onOk={this.send}
            onCancel={this.handleCancel}
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
          <Row style={{ marginTop: 20 }}>
            <Col span={4}>
              <InputLabel style={{ color: "#305656", width: 350 }}>
                Homework description{" "}
              </InputLabel>
            </Col>{" "}
            <Col span={18}>
              <textarea
                rows="4"
                required
                style={{
                  width: 800,

                  color: "#456a6a",
                  border: "1px solid #456a6a",
                  borderRadius: "5px"
                }}
                onChange={event => this.description(event.target.value)}
                value={this.state.description}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col span={4}>
              <InputLabel style={{ color: "#305656", width: 350 }}>
                Start Date{" "}
              </InputLabel>
            </Col>{" "}
            <Col span={7}>
              <TextField
                required={true}
                id="date"
                type="date"
                defaultValue=""
                InputLabelProps={{
                  shrink: true
                }}
                style={{
                  width: 200,

                  color: "#456a6a",
                  border: "1px solid #456a6a",
                  borderRadius: "5px"
                }}
                onChange={event => this.startdate(event.target.value)}
                value={this.state.startdate}
              />
            </Col>
            <Col span={3}>
              <InputLabel style={{ color: "#305656", width: 350 }}>
                Last Date{" "}
              </InputLabel>
            </Col>{" "}
            <Col span={7}>
              <TextField
                required={true}
                id="date"
                type="date"
                defaultValue=""
                InputLabelProps={{
                  shrink: true
                }}
                style={{
                  width: 200,

                  color: "#456a6a",
                  border: "1px solid #456a6a",
                  borderRadius: "5px"
                }}
                value={this.state.lastdate}
                onChange={event => this.lastdate(event.target.value)}
              />
            </Col>
          </Row>{" "}
          <Row style={{ marginTop: 20 }}>
            <Col span={4}>
              <InputLabel style={{ color: "#305656", width: 350 }}>
                course name
              </InputLabel>
            </Col>
            <Col span={18}>
              <div style={{ display: "inline" }}>
                <Select
                  style={{ textAlign: "center", width: 200 }}
                  lable="course name"
                  required={true}
                  native
                  margin="dense"
                  variant="filled"
                  value={this.state.courseName}
                  onChange={event => this.handleChange(event.target.value)}
                >
                  <option key="" value="" />
                  {this.state.courses.map(course => (
                    <option key={course.courseName} value={course.courseName}>
                      {course.courseName}
                    </option>
                  ))}
                </Select>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }} />
          <div
            style={{
              padding: 50,
              paddingTop: 10,
              paddingButtom: 10,
              border: "1px solid #456a6a",
              borderRadius: "5px",
              margin: 30,
              marginLeft: 0,
              width: 972
            }}
          >
            <p
              style={{
                textAlign: "left",
                color: "#456a6a",
                fontSize: 18
              }}
            >
              Choose Challenges
            </p>{" "}
            <Row>
              <Col span={24}>
                <div
                  style={{
                    postion: "relative",
                    float: "left",
                    margin: 5,
                    marginLeft: 0
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
                    onChange={this.handleChange1}
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
                    select
                  </th>
                  <th
                    style={{
                      fontSize: 17,
                      background: "#Fff",
                      color: " #456a6a",
                      textAlign: "center"
                    }}
                  >
                    question name
                  </th>
                </TableRow>
              </TableHead>
              <TableBody>
                <SearchResults
                  value={this.state.value}
                  data={this.state.rows}
                  renderResults={results =>
                    results.map(row => (
                      <TableRow key={row.id}>
                        <TableCell align="center">
                          <FormControlLabel
                            key={row.id.toString()}
                            control={
                              <Checkbox
                                style={{
                                  color: " #456a6a",
                                  width: 30
                                }}
                                id={row.id.toString()}
                                checked={this.state.checkedItems.get(
                                  row.id.toString()
                                )}
                                onChange={e => this.selectedquestion(row, e)}
                              />
                            }
                            label=""
                          />
                        </TableCell>

                        <TableCell align="center">
                          <Button
                            style={{ color: " #456a6a" }}
                            onClick={() =>
                              this.viewdetatil(row.id, row.challengeName)
                            }
                          >
                            {row.challengeName}{" "}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                />
              </TableBody>
            </Table>{" "}
          </div>
          <Row>
            <Col span={24}>
              <Button
                type="submit"
                onClick={e => this.selectsection(e)}
                style={{
                  float: "left",
                  border: "1px solid #456a6a",
                  borderRadius: "5px",
                  size: "large",
                  paddingBottom: "7px",
                  color: "#456a6a",
                  background: "#fff",
                  marginTop: 10
                }}
              >
                send <Icon type="right-square" style={{ color: "green" }} />
              </Button>
              <Button
                type="submit"
                onClick={e => this.savee(e)}
                style={{
                  marginLeft: 10,
                  float: "left",
                  border: "1px solid #456a6a",
                  borderRadius: "5px",
                  size: "large",
                  paddingBottom: "7px",
                  color: "#456a6a",
                  background: "#fff",
                  marginTop: 10
                }}
              >
                {" "}
                <Icon type="save" style={{ color: "green" }} />
                save
              </Button>
            </Col>
          </Row>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            open={this.state.open}
            autoHideDuration={4000}
            onClose={this.handleClose}
          >
            <SnackbarContent
              style={{ backgroundColor: "#00e676" }}
              onClose={this.handleClose}
              variant="success"
              message="the hw added sucssesfully"
            />
          </Snackbar>
        </form>
      </div>
    );
  }
}

export default EditHomework;
