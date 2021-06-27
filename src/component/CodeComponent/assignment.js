import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import Button from "@material-ui/core/Button";

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
import DownloadLink from "react-download-link";
import StepLabel from "@material-ui/core/StepLabel";
import Editor from "./Editor";
import { Progress } from "antd";
import moment from "moment";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class assignment extends Component {
  state = {
    collapsed: false,
    viewcourse: false,
    vewhw: false,
    course: [],
    name: "",
    hw: [],
    coursename: "",
    hwdetail: [],
    questions: [],
    expanded: null,
    questiondeatale: [],
    viewdatele: false,
    testcase: [],
    activetest: [],
    input: "",
    code: "",
    language: "",
    output: "",
    mark: 0,
    progress: new Map(),
    work: true,
    work2: true,
    test: new Map(),
    questionopen: [],
    solveq: [],
    openqid: [],
    idd: "",
    code1: "",
    request: false,
    visible: false,
    date: "",
    current: false,
    list: []
  };
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  currentCourse = () => {
    this.setState({ current: true });
  };
  view = value => {
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
              hw: res.data,
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
      vewhw: false,
      viewcourse: true
    });
    console.log(this.state.viewcourse);
  };
  back = () => {
    this.setState({
      vewhw: false,
      viewcourse: true,
      questions: [],
      viewdatele: false,

      request: false
    });
    this.setState(prevState => ({
      progress: prevState.progress.set(1, ""),
      work2: true,
      work: true,
      code: "",
      language: ""
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
  };
  vewhw = hw => {
    this.setState({
      vewhw: true,
      viewcourse: false,
      viewdatele: false,
      questions: []
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
  componentDidMount() {
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
      progress: prevState.progress.set(4, "")
    }));
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
  }
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
  aplyinput = input => {
    this.setState(prevState => ({
      progress: prevState.progress.set(1, ""),
      work: true
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
              work: true
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
                )
              }));
            }
          });
      }
    }
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
                mark: mark
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
  questiondeatale = id => {
    this.setState(prevState => ({
      test: prevState.test.set(1, ""),
      progress: prevState.progress.set(1, ""),
      request: false,
      viewdatele: false
    }));
    this.setState(prevState => ({
      test: prevState.test.set(2, ""),
      progress: prevState.progress.set(2, "")
    }));
    this.setState(prevState => ({
      test: prevState.test.set(3, ""),
      progress: prevState.progress.set(3, "")
    }));
    this.setState(prevState => ({
      test: prevState.test.set(4, ""),
      progress: prevState.progress.set(4, "")
    }));
    this.setState({ questionopen: id, code: "" });

    axios
      .get("http://127.0.0.1:8000/challenge/" + id, {})
      .then(res => {
        this.setState({
          questiondeatale: res.data,
          viewdatele: true
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
        console.log(this.state.test);
        this.setState({
          testcase: res.data,
          activetest: list
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  questiondeataleupdate = id => {
    this.setState(prevState => ({
      test: prevState.test.set(1, ""),
      progress: prevState.progress.set(1, ""),
      request: false,
      viewdatele: false
    }));
    this.setState(prevState => ({
      test: prevState.test.set(2, ""),
      progress: prevState.progress.set(2, "")
    }));
    this.setState(prevState => ({
      test: prevState.test.set(3, ""),
      progress: prevState.progress.set(3, "")
    }));
    this.setState(prevState => ({
      test: prevState.test.set(4, ""),
      progress: prevState.progress.set(4, "")
    }));
    this.setState({ questionopen: id, code: "" });
    axios
      .get("http://127.0.0.1:8000/challenge/" + id, {})
      .then(res => {
        this.setState({
          questiondeatale: res.data
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
        console.log(this.state.test);
        this.setState({
          testcase: res.data,
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
              viewdatele: true
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
    const { expanded } = this.state;
    return (
      <div>
        <Layout style={{ background: "#305656" }}>
          <Sider
            style={{
              marginTop: "60px",
              height: "auto",

              background: "#305656",
              color: "#305656",
              width: "auto"
            }}
          >
            <Menu
              style={{ background: "#305656", width: "auto", minHeight: 597 }}
              defaultSelectedKeys={["9"]}
              mode="inline"
            >
              <Menu.Item key={"9"} onClick={this.view}>
                <span>
                  <Icon type="book" />
                  current semester Courses
                </span>
              </Menu.Item>
              <Menu.Item key={"10"} onClick={this.view}>
                <span>
                  <Icon type="book" />
                  previous semester Courses
                </span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ paddingTop: "7px" }} />
            <Content
              style={{
                marginTop: "0px",
                postion: "relative",
                overflow: "auto"
              }}
            >
              {this.state.current ? (
                <div style={{ textAlign: "left" }}>
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
                              <a onClick={() => this.reverse(val)}> {val}</a>
                            </Breadcrumb.Item>
                          ))}
                        </Breadcrumb>
                      </Col>
                    </Row>
                  </div>
                  {this.state.hw.length !== 0 ? (
                    <div>
                      {this.state.hw.map(hw => (
                        <div>
                          {hw.show === "t" ? (
                            <ExpansionPanel
                              expanded={expanded === hw.id}
                              onChange={this.handleChange(hw.id)}
                              style={{
                                width: "60%",
                                marginLeft: 20,
                                marginTop: "2%",
                                marginBottom: 3,
                                background: "#f5f5f5",
                                textAlign: "left",
                                color: "#001529",
                                border: "2px solid #2979ff",
                                borderRadius: "5px"
                              }}
                            >
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                              >
                                <Typography>{hw.hwname}</Typography>
                              </ExpansionPanelSummary>
                              <Divider />
                              <ExpansionPanelDetails>
                                <div>{hw.descreption}</div>
                              </ExpansionPanelDetails>
                              <ExpansionPanelDetails>
                                <div>
                                  <span style={{ color: "#2979ff", margin: 5 }}>
                                    start date:
                                  </span>
                                  <span style={{ margin: 5 }}>
                                    {hw.startDate}
                                  </span>
                                </div>

                                <Typography>
                                  <span style={{ color: "#2979ff", margin: 5 }}>
                                    last date:
                                  </span>
                                  <span style={{ margin: 5 }}>
                                    {hw.endDate}
                                  </span>
                                </Typography>
                              </ExpansionPanelDetails>

                              <Divider />
                              <ExpansionPanelActions>
                                <Button
                                  style={{
                                    position: "relative",
                                    float: "right"
                                  }}
                                  size="small"
                                  color="primary"
                                  onClick={() => this.vewhw(hw)}
                                >
                                  view Detaile
                                </Button>
                              </ExpansionPanelActions>
                            </ExpansionPanel>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ margin: 20 }}> no assignment</div>
                  )}
                </div>
              ) : null}
              {this.state.vewhw ? (
                <div>
                  {" "}
                  <Row>
                    <Col span={24}>
                      <Button
                        onClick={this.back}
                        size="small"
                        style={{
                          position: "relative",
                          float: "left",
                          margin: 10,
                          background: "#001529",
                          color: "#fff"
                        }}
                      >
                        <Icon type="double-left" /> back
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <div
                        style={{
                          width: "90%",
                          textAlign: "left",
                          margin: "10px",
                          background: "#f5f5f5"
                        }}
                      >
                        <div>
                          <Typography
                            style={{ color: "#2979ff", fontSize: 20 }}
                          >
                            {this.state.hwdetail.hwname}
                          </Typography>

                          <Typography style={{ margin: 10 }}>
                            {this.state.hwdetail.descreption}
                          </Typography>
                          <ul>
                            {this.state.questions.map(val => (
                              <Typography
                                style={{
                                  fontSize: 17,
                                  fontFamily: "Times New Roman, Times, serif",
                                  fonWeight: "bold",
                                  margin: 10
                                }}
                              >
                                {" "}
                                <span style={{ width: "auto" }}>
                                  {" "}
                                  <li>
                                    {val.challengeName}{" "}
                                    {this.state.openqid.includes(val.id) ? (
                                      <span>
                                        <span style={{ margin: 10 }}>
                                          {" "}
                                          <span style={{ color: "#2979ff" }}>
                                            score:
                                          </span>
                                          {this.state.openq
                                            .filter(
                                              v => v.challengee === val.id
                                            )
                                            .map(val => val.mark)}
                                        </span>
                                        <span
                                          style={
                                            this.state.openq
                                              .filter(
                                                v => v.challengee === val.id
                                              )
                                              .map(val => val.late)
                                              .toString() === "true"
                                              ? {
                                                  margin: 10,
                                                  background: "#ffcdd2"
                                                }
                                              : {
                                                  margin: 10,
                                                  background: "#a5d6a7"
                                                }
                                          }
                                        >
                                          {" "}
                                          <span style={{ color: "#2979ff" }}>
                                            Last modified:
                                          </span>
                                          {this.state.openq
                                            .filter(
                                              v => v.challengee === val.id
                                            )
                                            .map(val => val.submeteddate)}
                                        </span>
                                        <Button
                                          color="primary"
                                          size="small"
                                          onClick={() =>
                                            this.questiondeataleupdate(val.id)
                                          }
                                          style={{}}
                                        >
                                          change
                                        </Button>
                                      </span>
                                    ) : (
                                      <Button
                                        color="primary"
                                        size="small"
                                        onClick={() =>
                                          this.questiondeatale(val.id)
                                        }
                                        style={{}}
                                      >
                                        solve
                                      </Button>
                                    )}
                                  </li>
                                </span>
                                <Divider />
                              </Typography>
                            ))}
                          </ul>
                        </div>

                        {this.state.viewdatele ? (
                          <div style={{ margin: 20 }}>
                            <Row>
                              <Col span={24}>
                                <Stepper
                                  nonLinear
                                  style={{
                                    postion: "relative",
                                    float: "right",
                                    background: "#f5f5f5",
                                    padding: "5%"
                                  }}
                                >
                                  {this.state.testcase.map(step => (
                                    <Step
                                      style={{ width: "100%" }}
                                      onClick={() => this.aplyinput(step)}
                                      size="large"
                                      active={
                                        this.state.activetest.includes(
                                          step.number
                                        )
                                          ? true
                                          : false
                                      }
                                      key={step.number}
                                    >
                                      <StepLabel>
                                        input &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      </StepLabel>
                                      {this.state.progress.get(
                                        parseInt(step.number, 10)
                                      ) !== "" ? (
                                        <Progress
                                          size="small"
                                          style={{ width: "100%" }}
                                          percent={100}
                                          status={
                                            this.state.progress.get(
                                              parseInt(step.number, 10)
                                            ) === "error"
                                              ? "exception"
                                              : "success"
                                          }
                                        />
                                      ) : (
                                        undefined
                                      )}
                                    </Step>
                                  ))}
                                </Stepper>
                                <div style={{ color: "#212121", fontSize: 16 }}>
                                  {this.state.questiondeatale.challengeName}
                                </div>
                                <div style={{ margin: 10 }}>
                                  {" "}
                                  <p>
                                    {" "}
                                    {this.state.questiondeatale.description}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                            <Divider />
                            <Row>
                              <Col span={24}>
                                <div>
                                  <Modal
                                    style={{ width: "30%" }}
                                    title="the challenge submeted sucssesfully"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                  >
                                    <p> your score:{this.state.mark}</p>
                                  </Modal>{" "}
                                  <Editor
                                    input={this.state.input}
                                    code={this.code}
                                    language={this.language}
                                    onsubmit={this.onsubmit}
                                    code1={this.state.code}
                                    languege1={this.state.language}
                                    request={this.state.request}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </div>
                        ) : null}
                      </div>{" "}
                    </Col>
                  </Row>
                </div>
              ) : null}
            </Content>

            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}
