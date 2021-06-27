import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import Button from "@material-ui/core/Button";

import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Col, Row, Modal, Breadcrumb } from "antd";
import "../navbar.css";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";

import Editor from "./Editor";
import { Card, Empty } from "antd";

const { Header, Content, Footer, Sider } = Layout;

export default class assignment extends Component {
  state = {
    current: true,
    list: ["My Courses"],
    previous: false,
    course: [],
    vewhw: false,
    hw: [],
    expanded: null,
    scurrent: true,
    sprevious: false,
    Viewchallenges: false,
    questions: [],
    openqid: [],
    openq: [],
    questiondeatale: [],
    viewdatele: false,
    testcase: [],
    activetest: [],
    input: "",
    code: "",
    language: "",
    output: "",
    mark: 0,
    request: false,

    work: true,
    work2: true,
    test: new Map(),
    questionopen: [],
    solveq: [],
    visible: false,
    date: "",
    name: "",
    idd: "",
    progress: new Map(),
    out: new Map()
  };

  questiondeatale = id => {
    this.setState(prevState => ({
      test: prevState.test.set(1, ""),

      request: false,
      viewdatele: false
    }));
    this.setState(prevState => ({
      test: prevState.test.set(2, "")
    }));
    this.setState(prevState => ({
      test: prevState.test.set(3, "")
    }));
    this.setState(prevState => ({
      test: prevState.test.set(4, "")
    }));
    this.setState({ questionopen: id, code: "" });

    axios
      .get("http://127.0.0.1:8000/challenge/" + id, {})
      .then(res => {
        let list1 = this.state.list;
        list1.push(res.data.challengeName);
        this.setState({
          questiondeatale: res.data,
          list: list1,
          viewdatele: true,
          current: false,
          previous: false,

          vewhw: false,

          Viewchallenges: false
        });
      })
      .catch(err => {
        console.log(err.message);
      });
    axios
      .get("http://127.0.0.1:8000/Texttestcase/?search=" + id, {})
      .then(res => {
        let list = this.state.activetest;
        res.data.map(val => {
          val.visable === "true" ? list.push(val.number) : null;
          this.setState(prevState => ({
            test: prevState.test.set(val.number.toString(), val)
          }));
        });
        let list1 = res.data;
        list1.sort(list1.map(v => v.number));
        this.setState({
          count: this.state.testcase.length,
          testcase: list
        });
        this.setState({
          testcase: list1,
          activetest: list
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  language = language => {
    this.setState({
      language: language
    });
  };
  code = code => {
    this.setState({
      code: code
    });
    console.log(code.toString());
  };

  aplyinput = () => {
    this.setState(prevState => ({
      progress: prevState.progress.set(1, "")
    }));
    this.setState(prevState => ({
      progress: prevState.progress.set(2, "")
    }));
    this.setState(prevState => ({
      progress: prevState.progress.set(3, "")
    }));
    this.setState(prevState => ({
      progress: prevState.progress.set(4, ""),
      work2: false
    }));
    this.state.testcase.map(input => {
      if (this.state.activetest.includes(input.number)) {
        this.setState({
          input: input.Input
        });
        var code = this.state.code;

        var language = this.state.language;
        var i = input.Input.toString();
        console.log(language);
        var formData = new FormData();
        formData.append("code", code);
        formData.append("language", language);
        formData.append("input", i);
        if (this.state.work) {
          this.setState({ work: false });
          fetch("http://localhost:80/compile.php", {
            method: "POST",

            headers: {},
            redirect: "follow",
            referrer: "no-referrer",
            body: formData // b
          })
            .then(response => response.text())
            .then(response => {
              this.setState({
                output: response.trim(),
                work: true,
                work2: true
              });
              if (input.output.toString() === response.trim()) {
                console.log("sucseses");
                this.setState(prevState => ({
                  progress: prevState.progress.set(
                    parseInt(input.number, 10),
                    "sucseses"
                  )
                }));
              } else {
                console.log(response.trim());
                this.setState(prevState => ({
                  progress: prevState.progress.set(
                    parseInt(input.number, 10),
                    "error"
                  ),
                  out: prevState.out.set(
                    parseInt(input.number, 10),
                    response.trim()
                  )
                }));
              }
            });
        }
      }
    });
    if (this.state.work2) {
      Modal.info({
        title: "Output",
        content: (
          <div>
            {this.state.testcase.map(input => {
              this.state.activetest.includes(input.number) ? (
                <span>
                  {" "}
                  {this.state.progress.get(parseInt(input.number, 10)) ===
                  "error" ? (
                    <div style={{ margin: 10, fontSize: 17 }}>
                      {" "}
                      <Icon
                        type="close-square"
                        style={{
                          background: "#ef5350",
                          fontSize: 17,
                          color: "#fff",
                          marginRight: 5
                        }}
                      />
                      Test case {input.number}
                      <p>
                        {" "}
                        Output :{this.state.out.get(parseInt(input.number, 10))}
                      </p>
                      <p> Expected output : {input.output}</p>
                    </div>
                  ) : (
                    <div style={{ margin: 10, fontSize: 17 }}>
                      <Icon
                        type="check-square"
                        style={{
                          background: "#66bb6a",
                          fontSize: 17,
                          color: "#fff",
                          marginRight: 5
                        }}
                      />
                      Test case {input.number}
                    </div>
                  )}
                  ))}{" "}
                </span>
              ) : null;
            })}
          </div>
        ),
        onOk() {}
      });
    }
  };
  questiondeataleupdate = id => {
    this.setState(prevState => ({
      test: prevState.test.set(1, ""),

      request: false,
      viewdatele: false
    }));
    this.setState(prevState => ({
      test: prevState.test.set(2, "")
    }));
    this.setState(prevState => ({
      test: prevState.test.set(3, "")
    }));
    this.setState(prevState => ({
      test: prevState.test.set(4, "")
    }));
    this.setState({ questionopen: id, code: "" });
    axios
      .get("http://127.0.0.1:8000/challenge/" + id, {})
      .then(res => {
        let list1 = this.state.list;
        list1.push(res.data.challengeName);
        this.setState({
          questiondeatale: res.data,
          list: list1
        });
      })
      .catch(err => {
        console.log(err.message);
      });
    axios
      .get("http://127.0.0.1:8000/Texttestcase/?search=" + id, {})
      .then(res => {
        let list = this.state.activetest;
        res.data.map(val => {
          val.visable === "true" ? list.push(val.number) : null;
          this.setState(prevState => ({
            test: prevState.test.set(val.number.toString(), val)
          }));
        });
        let list1 = res.data;
        list1.sort();
        this.setState({
          count: this.state.testcase.length,
          testcase: list
        });
        this.setState({
          testcase: list1,
          activetest: list
        });
        this.setState({
          idd: this.state.openq
            .filter(v => v.challengee === id)
            .map(val => val.id)
        });
        axios
          .get("http://127.0.0.1:8000/submithw/" + this.state.idd, {})
          .then(res => {
            this.setState({
              code: res.data.code,

              language: res.data.language,
              request: true,
              viewdatele: true,
              current: false,
              previous: false,

              vewhw: false,

              Viewchallenges: false
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
  componentDidMount() {
    axios
      .get(
        "http://127.0.0.1:8000/studentincourse/?search=" + this.props.username,
        {}
      )
      .then(res => {
        this.setState({
          course: res.data
        });
      })
      .catch(err => {
        console.log(err.message);
      });
    console.log(this.props.username);
  }
  reverse = val => {
    if (val === "My Courses") {
      this.setState({
        current: true,
        list: ["My Courses"],
        previous: false,
        vewhw: false,
        questions: [],
        Viewchallenges: false,
        viewdatele: false
      });
    }
    if (this.state.list.length > 2) {
      if (val.includes("Assinments")) {
        this.setState({
          vewhw: true,
          current: false,
          list: ["My Courses", val],
          questions: [],
          previous: false,
          Viewchallenges: false,
          viewdatele: false
        });
      }
    }
    if (this.state.list.indexOf(val) === 2 && this.state.list.length === 4) {
      let list = this.state.list;
      var e = list.pop();
      this.setState({
        list: list,
        request: false,
        viewdatele: false,
        current: false,
        previous: false,

        vewhw: false,

        Viewchallenges: true
      });
    }
  };
  view = value => {
    let list = this.state.list;
    list.push(value.courseName + " Assinments");

    axios
      .get("http://127.0.0.1:8000/instructorstudent/" + value.instructure, {})
      .then(res => {
        axios
          .get(
            "http://127.0.0.1:8000/hwincourse/?search=" + res.data.instructor,
            {}
          )
          .then(res => {
            this.setState({
              hw: res.data.filter(value => value.show === "t"),
              coursename: value.courseName
            });
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
    this.setState({
      vewhw: true,
      current: false,
      list: list,
      previous: false,
      Viewchallenges: false,
      viewdatele: false
    });
  };
  handleChange = (panel, val) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
      count: 0
    });
  };
  Viewchallenges = hw => {
    let list = this.state.list;
    list.push(hw.hwname);
    this.setState({
      vewhw: false,
      current: false,
      list: list,
      previous: false,
      Viewchallenges: true,
      viewdatele: false
    });
    axios
      .get("http://127.0.0.1:8000/submithw/?search=" + this.props.username, {})
      .then(res => {
        this.setState({
          openq: res.data.filter(value => value.hwincourse === hw.id),
          openqid: res.data
            .filter(value => value.hwincourse === hw.id)
            .map(v => v.challengee)
        });
      });
    axios
      .get("http://127.0.0.1:8000/hwincourse/" + hw.id, {})
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

    console.log(this.state.viewcourse);
  };
  checkdate(date, id) {
    var date2 = this.state.hw.filter(v => v.id === id).map(val => val.endDate);
    var date1 = new Date(date);
    var now = new Date(date2);
    console.log("date");
    if (now > date1) {
      this.setState({ late: false }); // date is past
    } else {
      this.setState({ late: true }); // date is future
    }
  }
  onsubmit = async () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    this.checkdate(date, this.state.hwdetail.id);
    this.setState({
      date: date
    });
    this.setState(prevState => ({
      progress: prevState.progress.set(1, ""),
      work2: true,
      work: false,
      mark: 0
    }));
    this.setState(prevState => ({
      progress: prevState.progress.set(2, "")
    }));
    this.setState(prevState => ({
      progress: prevState.progress.set(3, "")
    }));
    this.setState(prevState => ({
      progress: prevState.progress.set(4, "")
    }));
    this.setState({ work2: true });
    let mark = 0;
    var formData = new FormData();
    formData.append("code", "");
    formData.append("language", "");
    formData.append("input", "");

    if (this.state.test.has("1")) {
      if (this.state.work2) {
        this.setState({ work2: false });

        formData.set("code", this.state.code);
        formData.set("language", this.state.language.toString());
        formData.set("input", this.state.test.get("1").Input.toString());

        await fetch("http://localhost:80/compile.php", {
          method: "POST",

          headers: {},
          redirect: "follow",
          referrer: "no-referrer",
          body: formData // b
        })
          .then(response => response.text())
          .then(response => {
            if (response.trim() !== "") {
              this.setState({
                output: response.trim(),
                work2: true
              });
            }

            if (
              this.state.test.get("1").output.toString() === response.trim()
            ) {
              mark = mark + parseInt(this.state.test.get("1").weight, 10);
              this.setState({
                mark: 100
              });
              console.log("sucseses" + mark);
              console.log("sucseses");
              this.setState(prevState => ({
                progress: prevState.progress.set(
                  parseInt(this.state.test.get("1").number, 10),
                  "sucseses"
                )
              }));
            } else {
              this.setState(prevState => ({
                progress: prevState.progress.set(
                  parseInt(this.state.test.get("1").number, 10),
                  "error"
                )
              }));
              console.log("error" + this.state.test.get("1").number);
            }
          });
      }
    }

    if (this.state.test.has("2")) {
      if (this.state.work2) {
        this.setState({ work2: false });

        formData.set("code", this.state.code);
        formData.set("language", this.state.language.toString());
        formData.set("input", this.state.test.get("2").Input.toString());

        await fetch("http://localhost:80/compile.php", {
          method: "POST",

          headers: {},
          redirect: "follow",
          referrer: "no-referrer",
          body: formData // b
        })
          .then(response => response.text())
          .then(response => {
            if (response.trim() !== "") {
              this.setState({
                output: response.trim(),
                work2: true
              });
            }

            if (
              this.state.test.get("2").output.toString() === response.trim()
            ) {
              mark = mark + parseInt(this.state.test.get("2").weight, 10);
              this.setState({
                mark: mark
              });
              console.log("sucseses" + mark);
              console.log("sucseses");
              this.setState(prevState => ({
                progress: prevState.progress.set(
                  parseInt(this.state.test.get("2").number, 10),
                  "sucseses"
                )
              }));
            } else {
              this.setState(prevState => ({
                progress: prevState.progress.set(
                  parseInt(this.state.test.get("2").number, 10),
                  "error"
                )
              }));
              console.log("error" + this.state.test.get("2").number);
            }
          });
      }
    }
    if (this.state.test.has("4")) {
      if (this.state.work2) {
        this.setState({ work2: false });

        formData.set("code", this.state.code);
        formData.set("language", this.state.language.toString());
        formData.set("input", this.state.test.get("4").Input.toString());

        await fetch("http://localhost:80/compile.php", {
          method: "POST",

          headers: {},
          redirect: "follow",
          referrer: "no-referrer",
          body: formData // b
        })
          .then(response => response.text())
          .then(response => {
            if (response.trim() !== "") {
              this.setState({
                output: response.trim(),
                work2: true
              });
            }

            if (
              this.state.test.get("4").output.toString() === response.trim()
            ) {
              mark = mark + parseInt(this.state.test.get("4").weight, 10);
              this.setState({
                mark: mark
              });
              console.log("sucseses" + mark);
              console.log("sucseses");
              this.setState(prevState => ({
                progress: prevState.progress.set(
                  parseInt(this.state.test.get("4").number, 10),
                  "sucseses"
                )
              }));
            } else {
              this.setState(prevState => ({
                progress: prevState.progress.set(
                  parseInt(this.state.test.get("4").number, 10),
                  "error"
                )
              }));
              console.log("error" + this.state.test.get("4").number);
            }
          });
      }
    }
    if (this.state.test.has("3")) {
      if (this.state.work2) {
        this.setState({ work2: false });

        formData.set("code", this.state.code);
        formData.set("language", this.state.language.toString());
        formData.set("input", this.state.test.get("3").Input.toString());

        await fetch("http://localhost:80/compile.php", {
          method: "POST",

          headers: {},
          redirect: "follow",
          referrer: "no-referrer",
          body: formData // b
        })
          .then(response => response.text())
          .then(response => {
            if (response.trim() !== "") {
              this.setState({
                output: response.trim(),
                work2: true
              });
            }

            if (
              this.state.test.get("3").output.toString() === response.trim()
            ) {
              mark = mark + parseInt(this.state.test.get("3").weight, 10);
              this.setState({
                mark: mark
              });
              console.log("sucseses" + mark);
              console.log("sucseses");
              this.setState(prevState => ({
                progress: prevState.progress.set(
                  parseInt(this.state.test.get("3").number, 10),
                  "sucseses"
                )
              }));
            } else {
              this.setState(prevState => ({
                progress: prevState.progress.set(
                  parseInt(this.state.test.get("3").number, 10),
                  "error"
                )
              }));
              console.log("error" + this.state.test.get("3").number);
            }
          });
      }
    }
    if (!this.state.request) {
      axios
        .post("http://127.0.0.1:8000/submithw/", {
          studentname: this.props.username,
          mark: this.state.mark,
          code: this.state.code,
          challengee: parseInt(this.state.questionopen, 10),
          hwincourse: parseInt(this.state.hwdetail.id, 10),
          language: this.state.language,
          submeteddate: this.state.date,
          late: this.state.late.toString()
        })
        .then(res => {
          axios
            .get(
              "http://127.0.0.1:8000/submithw/?search=" + this.props.username,
              {}
            )
            .then(res => {
              this.setState({
                openq: res.data.filter(
                  value =>
                    value.hwincourse === parseInt(this.state.hwdetail.id, 10)
                ),
                openqid: res.data
                  .filter(
                    value =>
                      value.hwincourse === parseInt(this.state.hwdetail.id, 10)
                  )
                  .map(v => v.challengee)
              });
            });
          this.setState({
            visible: true
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    }
    if (this.state.request) {
      axios
        .put("http://127.0.0.1:8000/submithw/" + this.state.idd, {
          studentname: this.props.username,
          mark: this.state.mark,
          code: this.state.code,
          challengee: parseInt(this.state.questionopen, 10),
          hwincourse: parseInt(this.state.hwdetail.id, 10),
          language: this.state.language,
          submeteddate: this.state.date,
          late: this.state.late.toString()
        })
        .then(res => {
          axios
            .get(
              "http://127.0.0.1:8000/submithw/?search=" + this.props.username,
              {}
            )
            .then(res => {
              this.setState({
                openq: res.data.filter(
                  value =>
                    value.hwincourse === parseInt(this.state.hwdetail.id, 10)
                ),
                openqid: res.data
                  .filter(
                    value =>
                      value.hwincourse === parseInt(this.state.hwdetail.id, 10)
                  )
                  .map(v => v.challengee)
              });
            });
          this.setState({
            request: false,
            visible: true
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
      viewdatele: false
    });
  };
  render() {
    const { expanded } = this.state;
    return (
      <div>
        <Layout style={{}}>
          <Layout>
            <Header style={{ paddingTop: "7px" }} />
            <Content
              style={{
                width: "96%",

                marginLeft: "2%",
                postion: "relative",
                overflow: "auto",
                textAlign: "left"
              }}
            >
              <div>
                <Row>
                  <Col span={24}>
                    <Breadcrumb
                      style={{
                        textAlign: "left",
                        marginTop: "2%",
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
              </div>
              {this.state.current ? (
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      background: "#fff",
                      padding: 24,
                      margin: 20,
                      marginTop: 10,
                      marginBottom: 0,
                      minHeight: 450
                    }}
                  >
                    {" "}
                    {this.state.course.length !== 0 ? (
                      <Row gutter={16}>
                        <p
                          style={{
                            color: "#456a6a",
                            fontSize: 15,
                            paddingTop: 9
                          }}
                        >
                          {" "}
                          ** The course instructor must add you to the course to
                          show up here
                        </p>
                        <Row
                          style={{
                            width: "96%",
                            paddingTop: 10,
                            paddingBottom: 10,
                            marginLeft: "2%",
                            marginBottom: 10,

                            background: "#fafafa",
                            textAlign: "left",
                            color: "#305656"
                          }}
                        >
                          <Col span={6}>
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
                          <Col span={6}>
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
                          <Col span={6}>
                            <Typography
                              style={{
                                color: "#456a6a",
                                fontSize: 15,
                                paddingTop: 9
                              }}
                            >
                              Number of assignments
                            </Typography>
                          </Col>
                          <Col span={6}>
                            <Typography
                              style={{
                                color: "#456a6a",
                                fontSize: 15,
                                paddingTop: 9
                              }}
                            >
                              Action
                            </Typography>
                          </Col>
                        </Row>
                        {this.state.course.map(value => (
                          <ExpansionPanel
                            onChange={this.handleChange(
                              value.id,
                              value.courseName
                            )}
                            style={{
                              width: "96%",
                              margin: 10,
                              marginLeft: "2%",

                              marginBottom: 5,
                              background: "#fafafa",
                              textAlign: "left",
                              color: "#305656",
                              border: "1px solid #456a6a",
                              borderRadius: "5px"
                            }}
                          >
                            <ExpansionPanelSummary>
                              <Typography
                                style={{
                                  width: "25%",

                                  color: "#305656",
                                  marginTop: 15
                                }}
                              >
                                {" "}
                                {value.courseName}
                              </Typography>
                              <Typography
                                style={{
                                  width: "25%",
                                  color: "#305656",
                                  marginTop: 15
                                }}
                              >
                                {value.courseid}
                              </Typography>
                              <Typography
                                style={{
                                  width: "25%",
                                  color: "#305656",
                                  marginTop: 15
                                }}
                              >
                                {this.state.hw.filter(
                                  v => v.courseid === value.courseName
                                ).length === 0 ? (
                                  <span>No assinment</span>
                                ) : (
                                  <span>
                                    {
                                      this.state.hw.filter(
                                        v => v.courseid === value.courseName
                                      ).length
                                    }{" "}
                                  </span>
                                )}
                              </Typography>{" "}
                              <div style={{ textAlighn: "right" }}>
                                <Button
                                  style={{
                                    postion: "relative",
                                    float: "right",
                                    color: "#1c4545",
                                    margin: 10,
                                    marginButtom: 5,
                                    textAlign: "center",
                                    border: "1px solid #1c4545",
                                    borderRadius: "5px"
                                  }}
                                  onClick={() => this.view(value)}
                                  size="small"
                                >
                                  View Assinment>>
                                </Button>
                              </div>
                            </ExpansionPanelSummary>
                          </ExpansionPanel>
                        ))}
                      </Row>
                    ) : (
                      <div>
                        <Empty
                          style={{ marginTop: "7%", color: "#305656" }}
                          description="No Courses"
                        />{" "}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              {this.state.vewhw ? (
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      background: "#fff",
                      padding: 24,
                      margin: 20,
                      marginBottom: 0,
                      minHeight: 450
                    }}
                  >
                    {" "}
                    {this.state.hw.length !== 0 ? (
                      <div>
                        <Row
                          style={{
                            width: "96%",
                            paddingTop: 10,
                            paddingBottom: 10,
                            marginLeft: "2%",
                            marginBottom: 10,

                            background: "#fafafa",
                            textAlign: "left",
                            color: "#305656"
                          }}
                        >
                          <Col span={6}>
                            <Typography
                              style={{
                                color: "#456a6a",
                                fontSize: 15,
                                paddingTop: 9,
                                fontWeight: "bold"
                              }}
                            >
                              Assignment's name
                            </Typography>
                          </Col>
                          <Col span={6}>
                            <Typography
                              style={{
                                color: "#456a6a",
                                fontSize: 15,
                                paddingTop: 9
                              }}
                            >
                              Number of Queations
                            </Typography>
                          </Col>
                          <Col span={7}>
                            <Typography
                              style={{
                                color: "#456a6a",
                                fontSize: 15,
                                paddingTop: 9
                              }}
                            >
                              Deadline
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
                              {" "}
                              Action
                            </Typography>
                          </Col>
                        </Row>
                        {this.state.hw.map(value => (
                          <div>

                            <ExpansionPanel
                              expanded={expanded === value.id}
                              onChange={this.handleChange(
                                value.id,
                                value.courseName
                              )}
                              style={{
                                width: "96%",
                                margin: 10,
                                marginLeft: "2%",

                                marginBottom: 5,
                                background: "#fafafa",
                                textAlign: "left",
                                color: "#305656",
                                border: "1px solid #456a6a",
                                borderRadius: "5px"
                              }}
                            >
                              <ExpansionPanelSummary
                                expandIcon={
                                  <ExpandMoreIcon
                                    style={{ color: "#305656" }}
                                  />
                                }
                              >
                                <Typography
                                  style={{
                                    width: "25%",
                                    fontWeight: "bold",
                                    color: "#305656",
                                    marginTop: 15
                                  }}
                                >
                                  {" "}
                                  {value.hwname}
                                </Typography>
                                <Typography
                                  style={{
                                    width: "25%",
                                    color: "#305656",
                                    marginTop: 15
                                  }}
                                >
                                  {value.question.length}
                                </Typography>
                                <Typography
                                  style={{
                                    width: "30%",
                                    color: "#305656",
                                    marginTop: 15
                                  }}
                                >
                                  {value.startDate}&nbsp; To &nbsp;{" "}
                                  {value.endDate}
                                </Typography>

                                <Button
                                  style={{
                                    postion: "relative",
                                    float: "right",
                                    color: "#1c4545",
                                    margin: 10,
                                    marginButtom: 5,
                                    textAlign: "center",
                                    border: "1px solid #1c4545",
                                    borderRadius: "5px"
                                  }}
                                  onClick={() => this.Viewchallenges(value)}
                                  size="small"
                                >
                                  View detail >>
                                </Button>
                              </ExpansionPanelSummary>
                              <Divider />
                              <ExpansionPanelDetails
                                style={{ background: "#fff" }}
                              >
                                <Typography> {value.descreption}</Typography>
                              </ExpansionPanelDetails>
                              <Divider />
                            </ExpansionPanel>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <Empty
                          style={{ marginTop: "7%", color: "#305656" }}
                          description="No Assinment in this course"
                        />{" "}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}{" "}
              {this.state.Viewchallenges ? (
                <div>
                  <div
                    style={{
                      background: "#fff",
                      padding: 24,
                      margin: 20,
                      marginBottom: 0,
                      minHeight: 450
                    }}
                  >
                    <Row
                      style={{
                        width: "96%",
                        paddingTop: 10,
                        paddingBottom: 10,
                        marginLeft: "2%",
                        marginBottom: 10,

                        background: "#fafafa",
                        textAlign: "left",
                        color: "#305656"
                      }}
                    >
                      <Col span={6}>
                        <Typography
                          style={{
                            color: "#456a6a",
                            fontSize: 15,
                            paddingTop: 9
                          }}
                        >
                          Question name
                        </Typography>
                      </Col>
                      <Col span={6}>
                        <Typography
                          style={{
                            color: "#456a6a",
                            fontSize: 15,
                            paddingTop: 9
                          }}
                        >
                          Score
                        </Typography>
                      </Col>
                      <Col span={7}>
                        <Typography
                          style={{
                            color: "#456a6a",
                            fontSize: 15,
                            paddingTop: 9
                          }}
                        >
                          Submission date
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
                          {" "}
                          Action
                        </Typography>
                      </Col>
                    </Row>{" "}
                    {this.state.questions.length !== 0 ? (
                      <div>
                        {this.state.questions.map(value => (
                          <div>
                            <ExpansionPanel
                              expanded={expanded === value.id}
                              onChange={this.handleChange(
                                value.id,
                                value.courseName
                              )}
                              style={{
                                width: "96%",
                                margin: 10,
                                marginLeft: "2%",

                                marginBottom: 5,
                                background: "#fafafa",
                                textAlign: "left",
                                color: "#305656",
                                border: "1px solid #456a6a",
                                borderRadius: "5px"
                              }}
                            >
                              <ExpansionPanelSummary
                                style={{ padding: 10, fontSize: 18 }}
                                expandIcon={
                                  <ExpandMoreIcon
                                    style={{ color: "#305656" }}
                                  />
                                }
                              >
                                <Typography
                                  style={{
                                    width: "35%",
                                    fontWeight: "bold",
                                    color: "#305656"
                                  }}
                                >
                                  {" "}
                                  {value.challengeName}
                                </Typography>
                                {this.state.openqid.includes(value.id) ? (
                                  <span
                                    style={{
                                      width: "100%",
                                      display: "inline",
                                      height: "100%"
                                    }}
                                  >
                                    <Typography
                                      style={{
                                        width: "50%",
                                        display: "inline",
                                        color: "#305656",
                                        marginTop: 15
                                      }}
                                    >
                                      {this.state.openq
                                        .filter(v => v.challengee === value.id)
                                        .map(val => val.mark)}
                                    </Typography>

                                    <Typography
                                      style={
                                        this.state.openq
                                          .filter(
                                            v => v.challengee === value.id
                                          )
                                          .map(val => val.late)
                                          .toString() === "true"
                                          ? {
                                              width: "25%",
                                              display: "inline",
                                              color: "#305656",

                                              background: "#ffcdd2",
                                              marginLeft: 270
                                            }
                                          : {
                                              width: "25%",

                                              color: "#305656",

                                              display: "inline",
                                              background: "#a5d6a7",
                                              marginLeft: 270
                                            }
                                      }
                                    >
                                      {" "}
                                      {this.state.openq
                                        .filter(v => v.challengee === value.id)
                                        .map(val => val.submeteddate)}
                                    </Typography>

                                    <Button
                                      style={{
                                        postion: "relative",
                                        float: "right",
                                        color: "#1c4545",
                                        marginRight: 100,
                                        textAlign: "center",
                                        border: "1px solid  #1c4545",
                                        borderRadius: "5px"
                                      }}
                                      size="small"
                                      onClick={() =>
                                        this.questiondeataleupdate(value.id)
                                      }
                                    >
                                      Try again
                                    </Button>
                                  </span>
                                ) : (
                                  <div style={{ width: "100%" }}>
                                    <Typography
                                      style={{
                                        display: "inline",
                                        color: "#305656"
                                      }}
                                    />
                                    <Button
                                      style={{
                                        postion: "relative",
                                        float: "right",
                                        color: "#1c4545",
                                        marginRight: 50,
                                        textAlign: "center",
                                        border: "1px solid  #1c4545",
                                        borderRadius: "5px"
                                      }}
                                      onClick={() =>
                                        this.questiondeatale(value.id)
                                      }
                                      size="small"
                                    >
                                      Solve challenge
                                    </Button>
                                  </div>
                                )}
                              </ExpansionPanelSummary>
                              <Divider />
                              <ExpansionPanelDetails
                                style={{ background: "#fff" }}
                              >
                                <Typography> {value.description}</Typography>
                              </ExpansionPanelDetails>
                              <Divider />
                            </ExpansionPanel>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <Empty
                          style={{ marginTop: "7%", color: "#305656" }}
                          description="No assinment in this Courses"
                        />{" "}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              {this.state.viewdatele ? (
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      background: "#fff",
                      padding: 24,
                      margin: 20,
                      marginBottom: 0,
                      minHeight: 450
                    }}
                  >
                    <Row>
                      <Col span={24}>
                        <div
                          style={{
                            textAlign: "left",
                            color: "#456a6a",
                            background: "#fafafa ",
                            fontSize: 17
                          }}
                        >
                          <ul>
                            <li>
                              {" "}
                              <Typography
                                style={{ color: "#456a6a", fontSize: 17 }}
                              >
                                <div style={{ fontWeight: "bold" }}>
                                  {" "}
                                  Challenge Name :
                                </div>{" "}
                                {this.state.questiondeatale.challengeName}
                              </Typography>
                            </li>
                            <li>
                              <Typography
                                style={{
                                  marginTop: 10,
                                  color: "#456a6a",
                                  fontSize: 17
                                }}
                              >
                                {" "}
                                <div
                                  style={{ marginTop: 10, fontWeight: "bold" }}
                                >
                                  Challenge Description :
                                </div>{" "}
                                {this.state.questiondeatale.description}
                              </Typography>
                            </li>
                            <li>
                              {" "}
                              <Typography
                                style={{
                                  marginTop: 10,
                                  color: "#456a6a",
                                  fontSize: 17
                                }}
                              >
                                <div style={{ fontWeight: "bold" }}>
                                  {" "}
                                  Input format
                                </div>{" "}
                                {this.state.questiondeatale.inputformat}
                              </Typography>
                            </li>{" "}
                            <li>
                              {" "}
                              <Typography
                                style={{
                                  marginTop: 10,
                                  color: "#456a6a",
                                  fontSize: 17
                                }}
                              >
                                <div style={{ fontWeight: "bold" }}>
                                  {" "}
                                  Output format
                                </div>{" "}
                                {this.state.questiondeatale.outputformat}
                              </Typography>
                            </li>{" "}
                            <li>
                              {" "}
                              <Typography
                                style={{
                                  marginTop: 10,
                                  color: "#456a6a",
                                  fontSize: 17
                                }}
                              >
                                <div style={{ fontWeight: "bold" }}>
                                  {" "}
                                  Sample input
                                </div>{" "}
                                {this.state.questiondeatale.sampleinput}
                              </Typography>
                            </li>{" "}
                            <li>
                              {" "}
                              <Typography
                                style={{ color: "#456a6a", fontSize: 17 }}
                              >
                                <div style={{ fontWeight: "bold" }}>
                                  Sample output
                                </div>{" "}
                                {this.state.questiondeatale.sampleoutput}
                              </Typography>
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Col span={24}>
                        <div>
                          <Modal
                            style={{ width: "30%" }}
                            title="The challenge submeted sucssesfully"
                            visible={this.state.visible}
                            onOk={this.handleCancel}
                            onCancel={this.handleCancel}
                          >
                            {this.state.testcase.map(v => (
                              <span
                                style={{
                                  margin: 10,
                                  fontSize: 17,
                                  fontWeight: "bold"
                                }}
                              >
                                {this.state.progress.get(
                                  parseInt(v.number, 10)
                                ) === "error" ? (
                                  <span style={{ margin: 10, fontSize: 17 }}>
                                    {" "}
                                    <Icon
                                      type="close-square"
                                      style={{
                                        background: "#ef5350",
                                        fontSize: 17,
                                        color: "#fff",
                                        marginRight: 5
                                      }}
                                    />
                                    Test case {v.number}
                                  </span>
                                ) : (
                                  <span style={{ margin: 10, fontSize: 17 }}>
                                    <Icon
                                      type="check-square"
                                      style={{
                                        background: "#66bb6a",
                                        fontSize: 17,
                                        color: "#fff",
                                        marginRight: 5
                                      }}
                                    />
                                    Test case {v.number}
                                  </span>
                                )}
                              </span>
                            ))}
                            <p
                              style={{
                                margin: 10,
                                fontSize: 17,
                                marginLeft: 20
                              }}
                            >
                              {" "}
                              your score:100
                            </p>
                          </Modal>{" "}
                          <Editor
                            input={this.state.input}
                            code={this.code}
                            language={this.language}
                            onsubmit={this.onsubmit}
                            code1={this.state.code}
                            languege1={this.state.language}
                            request={this.state.request}
                            output={this.state.output}
                            applyint={this.aplyinput}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>{" "}
                </div>
              ) : null}
              {this.state.previous ? (
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      background: "#fff",
                      padding: 24,
                      margin: 20,
                      marginBottom: 0,
                      minHeight: 450
                    }}
                  >
                    {" "}
                    <div>
                      <Empty
                        style={{ marginTop: "7%", color: "#305656" }}
                        description="No Previous semester"
                      />{" "}
                    </div>
                  </div>
                </div>
              ) : null}{" "}
              <div
                style={{
                  color: "#fff",
                  marginTop: 30,
                  background: "#456a6a",
                  width: "90%",
                  marginLeft: "5%",
                  textAlign: "center"
                }}
              >
                <p>
                  CopyRight@2019|Developed by:Lama Dweikat|Supervisor:Samer
                  Arandi{" "}
                </p>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
