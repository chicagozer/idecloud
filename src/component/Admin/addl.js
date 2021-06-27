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
import Checkbox from "@material-ui/core/Checkbox";
class Addl extends Component {
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
    error: "",

    course: [
      { name: "Open Cv", id: "10636111" },
      { name: "Pthread", id: "10636211" }
    ],
    id: ""
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
      <div style={this.state.show ? {} : { display: "none" }}>
        <Row>
          <Col span={18}>
            <p
              style={{
                color: "#1c4545",
                textAlign: "left",

                marginLeft: "2%",
                marginTop: 15,
                fontSize: 17
              }}
            >
              {" "}
              ** The library arready added
            </p>
          </Col>
          <Col span={6}>
            <div
              style={{
                width: "96%",
                textAlign: "right",
                margin: 5,
                marginRight: "7%",
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
                New Library
                <AddIcon />
              </Button>
            </div>
          </Col>
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
                    Library name
                  </th>

                  <th
                    style={{
                      fontSize: 17,
                      background: "#Fff",
                      color: "  #617f7f",
                      textAlign: "center"
                    }}
                  >
                    Add
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
                {this.state.course.map(row => (
                  <TableRow key={row.id}>
                    <TableCell align="center" style={{ paddingTop: 20 }}>
                      {row.name}
                    </TableCell>

                    <TableCell align="center">
                      <Checkbox
                        size="lg"
                        style={{ width: 30, color: " #617f7f" }}
                      />
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
        </Row>
      </div>
    );
  }
}

export default Addl;
