import React, { Component } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import { Icon, Col, Row } from "antd";
import axios from "axios";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";
import Table from "react-bootstrap/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
class AddCource extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  state = {
    courseName: "",
    courceNumber: "",
    sectionNumber: "",
    courses: [],
    file: "",
    show: true,
    add: false,
    userid: "",
    courseid: "",
    error: "",
    course: [
      { name: "C", id: "10636111" },
      { name: "Data_structure", id: "10636211" },
      { name: "java", id: "10636212" },
      { name: "image_processing", id: "10636318" },
      ,
      { name: "algorithim", id: "10636314" }
    ],
    id: ""
  };
  viweadd = () => {
    this.setState({ show: false, add: true });
    this.props.v();
  };
  Addcourse = () => {
    if (this.state.id !== "") {
      if (!this.state.courses.map(v => v.courseid).includes(this.state.id)) {
        axios
          .post("http://127.0.0.1:8000/course/", {
            courseid: this.state.id,
            courseName: this.state.courseName.toString()
          })
          .then(res => {
            axios
              .get("http://127.0.0.1:8000/course/", {})
              .then(res => {
                this.setState({
                  courses: res.data,
                  error: "",
                  show: true,
                  add: false
                });
                this.props.p();
              })
              .catch(err => {
                console.log(err.message);
              });
          })
          .catch(err => {
            console.log(err.message);
          });
      } else {
        this.setState({
          error: "the course is already added"
        });
      }
    } else {
      this.setState({
        error: "selsect the course name"
      });
    }
  };
  cancel = () => {
    this.setState({
      show: false
    });
    this.props.hide();
  };
  handleChange = value => {
    var name = this.state.course.filter(v => v.id === value).map(v => v.name);
    this.setState({
      courseName: name,
      id: value
    });
    console.log(name + value);
  };
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/course/", {})
      .then(res => {
        this.setState({
          courses: res.data
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  deleterequest = id => {
    axios
      .delete("http://127.0.0.1:8000/course/" + id, {})
      .then(res => {
        axios
          .get("http://127.0.0.1:8000/course/", {})
          .then(res => {
            this.setState({
              courses: res.data
            });
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div>
        <div style={this.state.show ? {} : { display: "none" }}>
          <Row>
            <Col span={24}>
              <div
                style={{
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
                  Add course
                  <AddIcon />
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
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
                  marginTop: 20,
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
                      Course name
                    </th>

                    <th
                      style={{
                        fontSize: 17,
                        background: "#Fff",
                        color: "  #617f7f",
                        textAlign: "center"
                      }}
                    >
                      Course id
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
                  {this.state.courses.map(row => (
                    <TableRow key={row.id}>
                      <TableCell align="center" style={{ paddingTop: 20 }}>
                        {row.courseName}
                      </TableCell>

                      <TableCell align="center" style={{ paddingTop: 20 }}>
                        {row.courseid}
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          aria-label="Delete"
                          onClick={() => this.deleterequest(row.courseid)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Col>

            <Col span={24} />
          </Row>
        </div>
        <form
          error="true"
          style={
            this.state.add
              ? {
                  color: "#1c4545",

                  borderRadius: "5px",
                  padding: 10,

                  height: "auto",
                  textAlign: "left"
                }
              : { display: "none" }
          }
        >
          {" "}
          <p
            style={{
              color: "#1c4545",
              fontSize: 17
            }}
          >
            Add Course
          </p>
          <FormHelperText error style={{ margin: 10, fontSize: 15 }}>
            {" "}
            {this.state.error}{" "}
          </FormHelperText>
          <InputLabel style={{ color: "#1c4545", margin: 10 }}>
            course name
          </InputLabel>
          <Select
            style={{
              textAlign: "center",
              width: "auto",
              marginTop: "45"
            }}
            lable="course name"
            required
            margin="dense"
            variant="filled"
            native
            value={this.state.id}
            onChange={event => this.handleChange(event.target.value)}
          >
            <option key="" value="" />
            {this.state.course.map(course => (
              <option key={course.courseName} value={course.id}>
                {course.name}({course.id})
              </option>
            ))}
          </Select>
          <Button
            color="primary"
            onClick={this.Addcourse}
            size="large"
            style={{
              background: "#fff",
              marginLeft: 20,

              padding: 5,
              border: "1px solid #305656",
              borderRadius: "5px",
              color: "#305656"
            }}
          >
            Add
            <AddIcon />
          </Button>
        </form>
      </div>
    );
  }
}

export default AddCource;
