import React, { Component } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import { Icon, Col, Row } from "antd";
import axios from "axios";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";

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
    userid: "",
    courseid: "",
    error: ""
  };

  cancel = () => {
    this.setState({
      show: false
    });
    this.props.hide();
  };
  handleChange = value => {
    this.setState({
      courseName: value
    });
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

  Addcourse = () => {
    if (this.props.courseName !== "") {
      if (
        !this.props.items.map(v => v.courseName).includes(this.state.courseName)
      ) {
        axios
          .get(
            "http://127.0.0.1:8000/course/?search=" + this.state.courseName,
            {}
          )
          .then(res => {
            this.setState({
              courseid: res.data.map(user => user.courseid).toString()
            });
            console.log(res.data.map(user => user.courseid).toString());

            axios
              .get(
                "http://127.0.0.1:8000/user/?search=" + this.props.username,
                {}
              )
              .then(res => {
                this.setState({
                  userid: res.data.map(user => user.id).toString()
                });

                axios
                  .post("http://127.0.0.1:8000/courseinstructure/", {
                    instructorname: this.state.userid,
                    courseid: this.state.courseid,
                    courseName: this.state.courseName
                  })
                  .then(res => {
                    this.props.hide();
                    this.setState({ error: "" });

                    axios
                      .get(
                        "http://127.0.0.1:8000/courseinstructure/?search=" +
                          this.props.username,
                        {}
                      )
                      .then(res => {
                        this.props.addrequest(res.data);
                        console.log(res.data);
                      })
                      .catch(err => {
                        console.log(err.message);
                      });
                  })
                  .catch(err => {
                    console.log(err.message);
                  });
              })
              .catch(err => {
                console.log(err.message);
              });
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

  render() {
    return (
      <div style={this.state.show ? {} : { display: "none" }}>
        <form
          error="true"
          style={{
            color: "#001529",

            padding: 24,

            minHeight: 350,
            height: "auto",
            textAlign: "left"
          }}
        >
          <p style={{ textAlign: "left", color: "#305656", fontSize: 20 }}>
            Add New Course
          </p>
          <FormHelperText error> {this.state.error} </FormHelperText>
          <Row>
            <Col span={9}>
              <InputLabel style={{ color: "#305656", margin: 10 }}>
                course name
              </InputLabel>
              <Select
                style={{ textAlign: "center", width: 200, color: "#305656" }}
                lable="course name"
                required
                margin="dense"
                variant="filled"
                native
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
            </Col>
            <Col span={15}>
              <Button
                onClick={this.Addcourse}
                size="large"
                style={{
                  background: "#fff",

                  postion: "relative",
                  float: "left",
                  padding: 5,
                  border: "1px solid #305656",
                  borderRadius: "5px",
                  color: "#305656"
                }}
              >
                Add
                <AddIcon />
              </Button>
            </Col>
          </Row>

          <Row />
        </form>
      </div>
    );
  }
}

export default AddCource;
