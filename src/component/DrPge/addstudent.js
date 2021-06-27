import React, { Component } from "react";

import FormHelperText from "@material-ui/core/FormHelperText";
import { Icon, Col, Row, Input } from "antd";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";
import readXlsxFile from "read-excel-file";
class Addstudent extends Component {
  state = {
    expanded: false,
    items: [],
    courseName: "",
    sectionNumber: "",
    file: "",
    show: true,
    student: [],
    response: [],
    count: 0,
    error: "",
    name: ""
  };
  componentDidMount() {}
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  setSectionNumber(newNumber) {
    this.setState({
      sectionNumber: newNumber
    });
  }
  setname(newNumber) {
    this.setState({
      name: newNumber
    });
  }
  uploadFile = event => {
    let file = event.target.files[0];
    console.log(file);

    if (file) {
      this.setState({ file: file.name });
      readXlsxFile(event.target.files[0]).then(rows => {
        this.setState({ student: rows });
        this.setState({
          count: this.state.student.length
        });
        console.log(
          this.state.student.map(value => value.toString()).map(value => value)
        ); // `rows` is an array of rows
        // each row being an array of cells.
      });
    }
  };

  cancel = () => {
    this.setState({
      show: false
    });
    this.props.hide();
  };
  addstudentt = () => {
    if (this.state.file !== "" && this.state.sectionNumber !== "") {
      axios
        .post("http://127.0.0.1:8000/instructorstudent/", {
          sectionnumber: this.state.sectionNumber,
          studentfile: this.state.file,
          instructor: this.props.id,
          number: this.state.count
        })
        .then(res => {
          axios
            .get(
              "http://127.0.0.1:8000/instructorstudent/?search=" +
                this.props.id,
              {}
            )
            .then(res => {
              this.props.studentrequest(res.data);
            })
            .catch(err => {
              console.log(err.message);
            });

          this.state.student
            .map(value => value.toString())
            .map(value =>
              axios
                .post("http://127.0.0.1:8000/studentincourse/", {
                  courseid: this.props.courseid,
                  courseName: this.props.coursename,
                  studentName: value,
                  sectionnumber: this.state.sectionNumber,
                  instructure: res.data.id.toString()
                })
                .then(res => {})
                .catch(err => {
                  console.log(err.message);
                })
            );
        })
        .catch(err => {
          console.log(err.message);
        });
      console.log(this.state.count);
      this.props.count(this.state.count);
      this.props.hide();
    } else if (this.state.name !== "" && this.state.sectionNumber !== "") {
      axios
        .post("http://127.0.0.1:8000/instructorstudent/", {
          sectionnumber: this.state.sectionNumber,
          studentfile: this.state.file,
          instructor: this.props.id,
          number: this.state.count
        })
        .then(res => {
          axios
            .get(
              "http://127.0.0.1:8000/instructorstudent/?search=" +
                this.props.id,
              {}
            )
            .then(res => {
              this.props.studentrequest(res.data);
            })
            .catch(err => {
              console.log(err.message);
            });

          axios
            .post("http://127.0.0.1:8000/studentincourse/", {
              courseid: this.props.courseid,
              courseName: this.props.coursename,
              studentName: this.state.name,
              sectionnumber: this.state.sectionNumber,
              instructure: res.data.id.toString()
            })
            .then(res => {})
            .catch(err => {
              console.log(err.message);
            });
        })
        .catch(err => {
          console.log(err.message);
        });
      console.log(this.state.count);
      this.props.count(this.state.count);
      this.props.hide();
    } else {
      this.setState({ error: "please add student name or file" });
    }
  };
  render() {
    return (
      <div>
        {this.state.show ? (
          <div>
            <form
              error="true"
              style={{
                color: "#305656",

                padding: 24,

                minHeight: 350,
                height: "auto",
                textAlign: "left"
              }}
            >
              <p style={{ textAlign: "left", color: "#305656", fontSize: 20 }}>
                Add student to {this.props.coursename} course
              </p>
              <FormHelperText error style={{ margin: 10 }}>
                {" "}
                {this.state.error}{" "}
              </FormHelperText>
              <Row>
                <Col span={4}>
                  <InputLabel style={{ color: "#305656", width: 350 }}>
                    Section Number{" "}
                  </InputLabel>
                </Col>{" "}
                <Col span={18}>
                  <Input
                    placeholder="Enter Sectin Number"
                    required
                    style={{
                      width: 320,
                      height: 35,
                      color: "#456a6a",
                      border: "1px solid #456a6a",
                      borderRadius: "5px"
                    }}
                    onChange={event =>
                      this.setSectionNumber(event.target.value)
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <p style={{ color: "#305656", marginTop: 20 }}>
                    {" "}
                    ** add list of students or individual student{" "}
                  </p>{" "}
                </Col>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Col span={4}>
                  <InputLabel style={{ color: "#305656" }}>
                    upload students file{" "}
                  </InputLabel>
                </Col>
                <Col span={18}>
                  <Input
                    style={{
                      width: 320,
                      height: 35,
                      color: "#456a6a",
                      border: "1px solid #456a6a",
                      borderRadius: "5px"
                    }}
                    accept=".xlsx"
                    color="primary"
                    type="file"
                    onChange={this.uploadFile}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Col span={4}>
                  <InputLabel style={{ color: "#305656" }}>
                    Student name{" "}
                  </InputLabel>
                </Col>
                <Col span={18}>
                  <Input
                    placeholder="Enter Student Name"
                    required
                    style={{
                      width: 320,
                      height: 35,
                      color: "#456a6a",
                      border: "1px solid #456a6a",
                      borderRadius: "5px"
                    }}
                    onChange={event => this.setname(event.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  {" "}
                  <Button
                    onClick={this.addstudentt}
                    size="large"
                    color="primary"
                    style={{
                      background: "#fff",
                      color: "#305656",
                      marginTop: 50,
                      postion: "relative",
                      float: "left",
                      padding: 5,
                      border: "1px solid #305656",
                      borderRadius: "5px"
                    }}
                  >
                    Add
                    <AddIcon />
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Addstudent;
