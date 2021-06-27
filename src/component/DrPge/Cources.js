import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { Icon, Breadcrumb, Col, Row } from "antd";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCource from "./addCource";
import Addstudent from "./addstudent";
import Divider from "@material-ui/core/Divider";
import Addsuperviser from "./addsuperviser";

class Cources extends React.Component {
  state = {
    expanded: null,
    show: true,
    showadd: false,
    showstudent: false,
    username: "",
    addrequest: false,
    items: [],
    items2: [],
    courseid: null,
    loading: false,
    visible: false,
    move: false,
    coursetoaddstudent: "",
    coursetoaddstudname: "",
    coursetoaddstudnid: "",
    sectionnum: "",
    filename: "",
    count: 0,
    moderater: [],
    mname: [],
    Supervisor: [],
    super: "",
    addsuperviser: false,
    sectionNumber: "",
    visible1: false,
    Supervisor1: new Map(),
    items3: new Map(),
    list: ["My Courses"]
  };

  setSectionNumber(newNumber) {
    this.setState({
      sectionNumber: newNumber
    });
  }
  fileandsection = (value1, value2) => {
    this.setState({
      sectionnum: value1,
      filename: value2
    });
  };

  request = () => {};
  componentDidMount() {
    axios
      .get(
        "http://127.0.0.1:8000/courseinstructure/?search=" +
          this.props.username,
        {}
      )
      .then(res => {
        this.setState({
          items: res.data
        });
        axios
          .get("http://127.0.0.1:8000/instructorstudent/", {})
          .then(res => {
            this.state.items.map(val =>
              this.setState(prevState => ({
                items3: prevState.items3.set(
                  val.id.toString(),
                  res.data.filter(v => v.instructor === val.id)
                )
              }))
            );
          })
          .catch(err => {
            console.log(err.message);
          });
        axios
          .get("http://127.0.0.1:8000/supervisor/", {})
          .then(res => {
            this.state.items.map(val =>
              this.setState(prevState => ({
                Supervisor1: prevState.Supervisor1.set(
                  val.id.toString(),
                  res.data.filter(v => v.instructor === val.id)
                )
              }))
            );
            console.log(this.state.Supervisor1);
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  handleChange = (panel, val) => (event, expanded) => {
    axios
      .get("http://127.0.0.1:8000/instructorstudent/?search=" + panel, {})
      .then(res => {
        this.setState({
          items2: res.data,
          expanded: expanded ? panel : false,
          count: 0
        });
      })
      .catch(err => {
        console.log(err.message);
      });
    axios
      .get("http://127.0.0.1:8000/supervisor/?search=" + panel, {})
      .then(res => {
        this.setState({
          Supervisor: res.data.map(value => value.name)
        });
        console.log(this.state.Supervisor);
      })
      .catch(err => {
        console.log(err.message);
      });
    axios
      .get("http://127.0.0.1:8000/supervisor/", {})
      .then(res => {
        this.state.items.map(val =>
          this.setState(prevState => ({
            Supervisor1: prevState.Supervisor1.set(
              val.id.toString(),
              res.data.filter(v => v.instructor === val.id)
            )
          }))
        );
        console.log(this.state.Supervisor1);
      })
      .catch(err => {
        console.log(err.message);
      });
    axios
      .get("http://127.0.0.1:8000/instructorstudent/", {})
      .then(res => {
        this.state.items.map(val =>
          this.setState(prevState => ({
            items3: prevState.items3.set(
              val.id.toString(),
              res.data.filter(v => v.instructor === val.id)
            )
          }))
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  addrequest = value => {
    this.setState({
      items: value
    });

    console.log(value);
  };
  studentrequest = value => {
    this.setState({
      items2: value
    });
    console.log(value);
  };
  superrequest = value => {
    let lists = this.state.Supervisor;
    lists.push(value);
    this.setState({
      Supervisor: lists
    });
    console.log(value);
  };

  viewadd = () => {
    let list = this.state.list;
    list.push("Add Course");
    this.setState({
      showadd: true,
      show: false,
      showstudent: false,
      list: list
    });
  };
  hideadd = () => {
    this.setState({
      list: ["My Courses"],
      showadd: false,
      show: true,
      showstudent: false,
      addsuperviser: false
    });
  };

  DeleteConfirmm = value => {
    axios
      .get(
        "http://127.0.0.1:8000/courseinstructure/?search=" +
          this.props.username,
        {}
      )
      .then(res => {
        axios
          .delete("http://127.0.0.1:8000/courseinstructure/" + value.id)
          .then(res => {
            console.log(res.data);
            axios
              .get(
                "http://127.0.0.1:8000/courseinstructure/?search=" +
                  this.props.username,
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
      });
  };

  viewaddstudent = value => {
    let list = this.state.list;
    list.push(" Add Student");
    this.setState({
      showadd: false,
      show: false,
      showstudent: true,
      coursetoaddstudent: value.courseid,
      coursetoaddstudname: value.courseName,
      coursetoaddstudnid: value.id,
      list: list
    });
  };
  addsuperviser = value => {
    let list = this.state.list;
    list.push(" Add Assistant");
    this.setState({
      showadd: false,
      show: false,
      showstudent: false,
      addsuperviser: true,
      coursetoaddstudent: value.courseid,
      coursetoaddstudname: value.courseName,
      coursetoaddstudnid: value.id,
      list: list
    });
  };
  deletestudent = (val, value) => {
    axios
      .delete("http://127.0.0.1:8000/instructorstudent/" + val.id, {})
      .then(res => {
        axios
          .get("http://127.0.0.1:8000/instructorstudent/?search=" + value, {})
          .then(res => {
            this.setState({
              items2: res.data
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
  count = value => {
    this.setState({
      count: value
    });
  };
  Deletesuper = (val, value) => {
    axios
      .get("http://127.0.0.1:8000/supervisor/?search=" + value.id, {})
      .then(res => {
        res.data.map(v =>
          v.name.toString() === val
            ? axios
                .delete("http://127.0.0.1:8000/supervisor/" + v.id, {})
                .then(res => {
                  axios
                    .get(
                      "http://127.0.0.1:8000/supervisor/?search=" + value.id,
                      {}
                    )
                    .then(res => {
                      this.setState({
                        Supervisor: res.data.map(value => value.name)
                      });
                      console.log(this.state.Supervisor);
                    })
                    .catch(err => {
                      console.log(err.message);
                    });
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
  };
  reverse = val => {
    if (val === "My Courses") {
      this.setState({
        list: ["My Courses"],
        showadd: false,
        show: true,
        showstudent: false,
        addsuperviser: false
      });
    }
  };
  render() {
    const { expanded } = this.state;
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
                  Course ID
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
                  Assistants
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
                  Students
                </Typography>
              </Col>
              <Col span={4}>
                <div
                  style={{
                    marginRight: "2%",
                    postion: "relative",
                    float: "right"
                  }}
                >
                  <Button
                    onClick={this.viewadd}
                    size="large"
                    color="primary"
                    style={{
                      border: "1px solid #456a6a",
                      borderRadius: "5px",
                      padding: 5,
                      color: "#456a6a",
                      background: "#fafafa"
                    }}
                  >
                    Add course
                    <AddIcon />
                  </Button>
                </div>
              </Col>
            </Row>
            {this.state.items.map(value => (
              <div>
                <ExpansionPanel
                  expanded={expanded === value.id}
                  onChange={this.handleChange(value.id, value.courseName)}
                  style={{
                    width: "96%",
                    margin: 15,
                    marginLeft: "2%",

                    marginBottom: 10,
                    background: "#fafafa",
                    textAlign: "left",
                    color: "#305656",
                    border: "1px solid #456a6a",
                    borderRadius: "5px"
                  }}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#305656" }} />}
                  >
                    <Typography
                      style={{
                        width: "20%",
                        marginTop: 15,
                        marginTop: 10,
                        marginBottom: 10
                      }}
                    >
                      {" "}
                      {value.courseName}
                    </Typography>
                    <Typography
                      style={{
                        width: "20%",
                        marginTop: 15,
                        marginTop: 10,
                        marginBottom: 10
                      }}
                    >
                      {value.courseid}
                    </Typography>
                    <Typography
                      style={{
                        width: "25%",
                        marginTop: 15,
                        marginTop: 10,
                        marginBottom: 10
                      }}
                    >
                      {this.state.Supervisor1.get(value.id.toString()) ? (
                        <span>
                          {this.state.Supervisor1.get(value.id.toString())
                            .length === 0 ? (
                            <span>No Assistant</span>
                          ) : null}
                          {this.state.Supervisor1.get(value.id.toString())
                            .length === 1 ? (
                            <span>
                              {this.state.Supervisor1.get(
                                value.id.toString()
                              ).map(v => v.name)}
                            </span>
                          ) : null}
                          {this.state.Supervisor1.get(value.id.toString())
                            .length > 1 ? (
                            <span>
                              {
                                this.state.Supervisor1.get(value.id.toString())
                                  .length
                              }
                            </span>
                          ) : null}
                        </span>
                      ) : null}
                    </Typography>
                    <Typography
                      style={{
                        width: "20%",
                        marginTop: 10,
                        marginBottom: 10
                      }}
                    >
                      {this.state.items3.get(value.id.toString()) ? (
                        <span>
                          {this.state.items3.get(value.id.toString()).length ===
                          0 ? (
                            <span>No Student</span>
                          ) : null}
                          {this.state.items3.get(value.id.toString()).length ===
                          1 ? (
                            <span>
                              {this.state.items3
                                .get(value.id.toString())
                                .map(v => v.number)}{" "}
                            </span>
                          ) : null}
                          {this.state.items3.get(value.id.toString()).length >
                          1 ? (
                            <span>
                              {this.state.items3
                                .get(value.id.toString())
                                .map(v => v.number)}{" "}
                            </span>
                          ) : null}
                        </span>
                      ) : null}
                    </Typography>
                  </ExpansionPanelSummary>
                  <Divider color="primary" />
                  <ExpansionPanelDetails style={{ background: "#fff" }}>
                    <Typography>
                      {this.state.items2.length === 0 ? (
                        <div
                          style={{
                            fontSize: 15,
                            color: " #456A6A",
                            textAlign: "left",
                            fontWeight: "bold"
                          }}
                        >
                          {" "}
                          {this.state.Supervisor.length !== 0 ? (
                            <div style={{ margin: 10, color: "black" }}>
                              <span
                                style={{
                                  fontSize: 15,
                                  color: " #456A6A",
                                  textAlign: "center",
                                  fontWeight: "bold"
                                }}
                              >
                                Assistant :
                              </span>
                              {this.state.Supervisor.map(vall => (
                                <span
                                  style={{ margin: 5, fontWeight: "normal" }}
                                >
                                  {vall}{" "}
                                  <Tooltip
                                    title="Delete"
                                    style={{ fontSize: 10 }}
                                  >
                                    <IconButton
                                      style={{
                                        size: 2
                                      }}
                                      onClick={() =>
                                        this.Deletesuper(vall, value)
                                      }
                                      color="primary"
                                    >
                                      <Icon
                                        type="close"
                                        style={{
                                          color: "red",
                                          fontSize: "13px"
                                        }}
                                      />
                                    </IconButton>
                                  </Tooltip>{" "}
                                </span>
                              ))}
                            </div>
                          ) : null}
                          No student in {value.courseName} course Currently
                        </div>
                      ) : (
                        <div>
                          {" "}
                          {this.state.Supervisor.length !== 0 ? (
                            <div style={{ margin: 10, color: "black" }}>
                              <span
                                style={{
                                  fontSize: 15,
                                  color: " #456A6A",
                                  textAlign: "center",
                                  fontWeight: "bold"
                                }}
                              >
                                Assistant :
                              </span>
                              {this.state.Supervisor.map(vall => (
                                <span style={{ margin: 5 }}>
                                  {vall}{" "}
                                  <Tooltip
                                    title="Delete"
                                    style={{ fontSize: 10 }}
                                  >
                                    <IconButton
                                      style={{
                                        size: 2
                                      }}
                                      onClick={() =>
                                        this.Deletesuper(vall, value)
                                      }
                                      color="primary"
                                    >
                                      <Icon
                                        type="close"
                                        style={{
                                          color: "red",
                                          fontSize: "13px"
                                        }}
                                      />
                                    </IconButton>
                                  </Tooltip>{" "}
                                </span>
                              ))}
                            </div>
                          ) : null}
                          <span
                            style={{
                              fontSize: 15,
                              color: " #456A6A",
                              textAlign: "center",
                              fontWeight: "bold",
                              margin: 10
                            }}
                          >
                            student section :
                          </span>
                          {this.state.items2.map(val => (
                            <div color="primary">
                              <span style={{ margin: 10, color: "black" }}>
                                {" "}
                                {val.sectionnumber}
                              </span>
                              <span style={{ margin: 10 }}>
                                student file:
                                <span style={{ margin: 2, color: "black" }}>
                                  <Icon
                                    style={{
                                      color: "green",

                                      paddingBottom: 10
                                    }}
                                    type="file-excel"
                                  />
                                  {val.studentfile} ({val.number} students)
                                </span>
                              </span>

                              <Tooltip title="Delete" style={{ fontSize: 10 }}>
                                <IconButton
                                  onClick={() =>
                                    this.deletestudent(val, value.id)
                                  }
                                  style={{}}
                                  color="primary"
                                >
                                  <Icon
                                    type="close"
                                    style={{ color: "red", fontSize: "13px" }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </div>
                          ))}
                        </div>
                      )}
                    </Typography>
                  </ExpansionPanelDetails>
                  <Divider color="primary" />

                  <ExpansionPanelActions style={{ background: "#fff" }}>
                    <Button
                      style={{
                        postion: "relative",
                        float: "right",
                        color: "#305656"
                      }}
                      onClick={() => this.addsuperviser(value)}
                      size="small"
                    >
                      Add Assistant <AddIcon />
                    </Button>
                    <Button
                      style={{
                        postion: "relative",
                        float: "right",
                        color: "#305656"
                      }}
                      onClick={() => this.viewaddstudent(value)}
                      size="small"
                    >
                      add student <AddIcon />
                    </Button>

                    <Tooltip title="Delete" style={{ fontSize: 10 }}>
                      <IconButton
                        style={{
                          postion: "relative",
                          float: "right",
                          color: "#305656"
                        }}
                        onClick={() => this.DeleteConfirmm(value)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ExpansionPanelActions>
                </ExpansionPanel>
              </div>
            ))}
          </div>
          <div
            style={
              this.state.showadd
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
            <AddCource
              username={this.props.username}
              addrequest={this.addrequest}
              hide={this.hideadd}
              request={this.request}
              items={this.state.items}
            />
          </div>

          <div
            style={
              this.state.showstudent
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
            <Addstudent
              username={this.props.username}
              hide={this.hideadd}
              courseid={this.state.coursetoaddstudent}
              coursename={this.state.coursetoaddstudname}
              id={this.state.coursetoaddstudnid}
              fileandsection={this.fileandsection}
              studentrequest={this.studentrequest}
              count={this.count}
            />
          </div>

          <div
            style={
              this.state.addsuperviser
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
            <Addsuperviser
              username={this.props.username}
              hide={this.hideadd}
              courseid={this.state.coursetoaddstudent}
              coursename={this.state.coursetoaddstudname}
              id={this.state.coursetoaddstudnid}
              fileandsection={this.fileandsection}
              superrequest={this.superrequest}
              count={this.count}
            />
          </div>
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

export default Cources;
