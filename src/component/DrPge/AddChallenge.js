import React, { Component } from "react";
import { Icon, Col, Row, Modal, Input } from "antd";
import axios from "axios";
import Buttonn from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import AddIcon from "@material-ui/icons/Add";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Progress, Button } from "antd";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Editor from "./solution";
const ButtonGroup = Button.Group;
class AddChallange extends Component {
  state = {
    challengeName: "",
    description: "",
    type: new Map(),
    show: true,
    testcase: [1],
    visible: new Map(),
    percent: new Map(),
    input: new Map(),
    output: new Map(),
    error: "",
    key: false,
    language: "C",
    code: "",
    work2: true,
    out: "",
    saminput: "",
    samoutput: "",
    iformat: "",
    oformat: ""
  };
  componentDidMount() {
    this.setState(prevState => ({
      percent: prevState.percent.set(1, 100)
    }));
    this.setState(prevState => ({
      percent: prevState.percent.set(2, 0)
    }));
    this.setState(prevState => ({
      percent: prevState.percent.set(3, 0)
    }));
    this.setState(prevState => ({
      percent: prevState.percent.set(4, 0)
    }));
    this.setState(prevState => ({
      visible: prevState.visible.set(1, false)
    }));
    this.setState(prevState => ({
      visible: prevState.visible.set(2, false)
    }));
    this.setState(prevState => ({
      visible: prevState.visible.set(4, false)
    }));
    this.setState(prevState => ({
      visible: prevState.visible.set(3, false)
    }));
    this.setState(prevState => ({
      type: prevState.type.set(1, "text")
    }));
    this.setState(prevState => ({
      type: prevState.type.set(2, "text")
    }));
    this.setState(prevState => ({
      type: prevState.type.set(3, "text")
    }));
    this.setState(prevState => ({
      type: prevState.type.set(4, "text")
    }));
    this.setState(prevState => ({
      input: prevState.input.set(1, ""),
      output: prevState.output.set(1, "")
    }));
  }
  Deletetestcase = item => {
    let list = this.state.testcase;
    list.splice(list.indexOf(item), 1);
    this.setState({
      testcase: list
    });
  };
  increase = item => {
    let percent = this.state.percent.get(item) + 5;
    if (percent > 100) {
      percent = 100;
    }
    this.setState(prevState => ({
      percent: prevState.percent.set(item, percent)
    }));
  };

  decline = item => {
    let percent = this.state.percent.get(item) - 5;
    if (percent < 0) {
      percent = 0;
    }
    this.setState(prevState => ({
      percent: prevState.percent.set(item, percent)
    }));
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  setDescription(d) {
    this.setState({
      description: d
    });
  }
  iformat(d) {
    this.setState({
      iformat: d
    });
  }
  oformat(d) {
    this.setState({
      oformat: d
    });
  }
  saminput(d) {
    this.setState({
      saminput: d
    });
  }
  samoutput(d) {
    this.setState({
      samoutput: d
    });
  }
  visible = (item, value) => {
    this.setState(prevState => ({
      visible: prevState.visible.set(item, value)
    }));

    console.log(this.state.visible);
  };
  solkey = val => {
    this.setState({ key: val });
  };
  setinput = (item, value) => {
    this.setState(prevState => ({
      input: prevState.input.set(item, value)
    }));

    console.log(this.state.input);
  };
  setoutput = (item, value) => {
    this.setState(prevState => ({
      output: prevState.output.set(item, value)
    }));

    console.log(this.state.output);
  };
  setpercent = (item, value) => {
    this.setState(prevState => ({
      percent: prevState.percent.set(item, value)
    }));
  };
  setName(newName) {
    this.setState({
      challengeName: newName
    });
  }
  handlType = (item, value) => {
    this.setState(prevState => ({
      type: prevState.type.set(item, value)
    }));
    console.log(this.state.type);
  };
  moretestcase = () => {
    if (this.state.testcase.length === 1) {
      let list = this.state.testcase;
      list.push(2);
      this.setState({
        testcase: list
      });
    } else if (this.state.testcase.length === 2) {
      let list = this.state.testcase;
      list.push(3);
      this.setState({
        testcase: list
      });
    } else if (this.state.testcase.length === 3) {
      let list = this.state.testcase;
      list.push(4);
      this.setState({
        testcase: list
      });
    }
  };
  save = e => {
    e.preventDefault();
    this.setState({ error: "" });
    let count = 0;
    count =
      this.state.percent.get(1) +
      this.state.percent.get(2) +
      this.state.percent.get(3) +
      this.state.percent.get(4);
    if (
      count === 100 &&
      this.state.input.get(1) !== "" &&
      this.state.output.get(1) !== ""
    ) {
      axios
        .post("http://127.0.0.1:8000/challenge/", {
          challengeName: this.state.challengeName,
          description: this.state.description,
          instructor: this.props.username,
          keysolution: this.state.code,
          language: this.state.language,
          inputformat: this.state.iformat,
          outputformat: this.state.oformat,
          sampleinput: this.state.saminput,
          sampleoutput: this.state.samoutput
        })
        .then(res => {
          this.state.testcase.map(i =>
            this.state.type.get(i) === "text"
              ? axios
                  .post("http://127.0.0.1:8000/Texttestcase/", {
                    challenge: res.data.id.toString(),
                    Input: this.state.input.get(i),
                    output: this.state.output.get(i),
                    visable: this.state.visible.get(i).toString(),
                    weight: this.state.percent.get(i),
                    number: i
                  })
                  .then(res => {
                    this.props.request();
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

      this.props.hide();
    } else {
      this.setState({
        error:
          "make sure that testcase weight summation must be 100% and input and output is required"
      });
    }
  };
  cancel = () => {
    this.setState({
      show: false
    });
    this.props.hide();
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
  onsubmit = async () => {
    this.setState({ work2: true });
    var formData = new FormData();
    formData.append("code", "");
    formData.append("language", "");
    formData.append("input", "");
    if (this.state.input.get(1) !== "" && !this.state.output.get(1) !== "") {
      if (this.state.testcase.includes(1)) {
        if (this.state.work2) {
          this.setState({ work2: false });

          formData.set("code", this.state.code);
          formData.set("language", this.state.language.toString());
          formData.set("input", this.state.input.get(1).toString());

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
                  out: response.trim(),
                  work2: true
                });
              }
              if (response.trim() === this.state.output.get(1)) {
                this.setState({ sucsess: true, fail: false });
                Modal.success({
                  title: " success message",
                  content: "Correct solution"
                });
              } else {
                this.setState({ sucsess: false, fail: true });
                Modal.success({
                  width: 500,
                  title: "Correct solution",
                  content: (
                    <div
                      style={{
                        width: 500,
                        height: "auto",
                        overflow: "auto",
                        maxHeight: 400
                      }}
                    >
                      <Row>
                        <Col span={24}>
                          <span
                            style={{ margin: 20, fontSize: 17, marginLeft: 5 }}
                          >
                            <Icon
                              type="check-square"
                              style={{
                                background: "#66bb6a",
                                fontSize: 17,
                                color: "#fff",
                                marginRight: 5,
                                marginButtom: 2
                              }}
                            />
                            Test case 1
                          </span>
                        </Col>
                      </Row>
                    </div>
                  )
                });
              }
            });
        }
      }
    } else {
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
            Add New Question
          </p>
          <Row>
            <Col span={4}>
              <InputLabel style={{ color: "#305656", width: 350 }}>
                Question name{" "}
              </InputLabel>
            </Col>{" "}
            <Col span={18}>
              <Input
                placeholder="Enter Question name"
                required
                style={{
                  width: 800,
                  height: 40,
                  color: "#456a6a",
                  border: "1px solid #456a6a",
                  borderRadius: "5px"
                }}
                onChange={event => this.setName(event.target.value)}
                value={this.state.challengeName}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col span={4}>
              <InputLabel style={{ color: "#305656", width: 350 }}>
                Question description{" "}
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
                onChange={event => this.setDescription(event.target.value)}
                value={this.state.description}
              />
            </Col>
          </Row>{" "}
          <Row style={{ marginTop: 20 }}>
            <Col span={4}>
              <InputLabel style={{ color: "#305656", width: 350 }}>
                Input format{" "}
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
                onChange={event => this.iformat(event.target.value)}
                value={this.state.iformat}
              />
            </Col>
          </Row>{" "}
          <Row style={{ marginTop: 20 }}>
            <Col span={4}>
              <InputLabel style={{ color: "#305656", width: 350 }}>
                Output format{" "}
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
                onChange={event => this.oformat(event.target.value)}
                value={this.state.oformat}
              />
            </Col>
          </Row>{" "}
          <Row style={{ marginTop: 20 }}>
            <Col span={4}>
              <InputLabel style={{ color: "#305656", width: 350 }}>
                Sample input{" "}
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
                onChange={event => this.saminput(event.target.value)}
                value={this.state.saminput}
              />
            </Col>
          </Row>{" "}
          <Row style={{ marginTop: 20 }}>
            <Col span={4}>
              <InputLabel style={{ color: "#305656", width: 350 }}>
                Sample output{" "}
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
                onChange={event => this.samoutput(event.target.value)}
                value={this.state.samoutput}
              />
            </Col>
          </Row>
          <Row>
            <FormHelperText error={true}>{this.state.error}</FormHelperText>
            <Col span={24}>
              {this.state.testcase.map(item => (
                <div
                  style={{
                    border: "1px solid #456a6a",
                    padding: 10,
                    paddingLeft: "4%",
                    paddingRight: "4%",

                    width: 970,
                    marginTop: 10
                  }}
                >
                  {item !== 1 ? (
                    <Tooltip title="Delete" style={{ fontSize: 10 }}>
                      <IconButton
                        style={{
                          size: 2
                        }}
                        onClick={() => this.Deletetestcase(item)}
                      >
                        <Icon
                          type="close"
                          style={{
                            color: "red",
                            fontSize: "13px"
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  ) : null}{" "}
                  <p style={{ color: "#305656", fontSize: 17 }}>
                    Test case {item}
                  </p>
                  <div>
                    <RadioGroup
                      style={{ display: "inline" }}
                      aria-label="role"
                      name="gender1"
                      onChange={e => this.handlType(item, e.target.value)}
                      value={this.state.type.get(item)}
                    >
                      <FormControlLabel
                        value="text"
                        control={<Radio style={{ color: "#305656" }} />}
                        label="Text"
                      />
                      <FormControlLabel
                        value="file"
                        control={<Radio style={{ color: "#305656" }} />}
                        label="file"
                      />
                    </RadioGroup>
                  </div>
                  {this.state.type.get(item) === "text" ? (
                    <div>
                      <Row style={{ marginTop: 20 }}>
                        <Col span={2}>
                          <InputLabel style={{ color: "#305656", width: 350 }}>
                            Input{" "}
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
                            onChange={event =>
                              this.setinput(item, event.target.value)
                            }
                            value={this.state.input.get(item)}
                          />
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 20 }}>
                        <Col span={2}>
                          <InputLabel style={{ color: "#305656", width: 350 }}>
                            output{" "}
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
                            onChange={event =>
                              this.setoutput(item, event.target.value)
                            }
                            value={this.state.output.get(item)}
                          />
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <div>
                      <InputLabel style={{ color: "#305656", margin: 5 }}>
                        {" "}
                        input{" "}
                      </InputLabel>
                      <TextField
                        style={{
                          width: "95%",
                          margin: 5
                        }}
                        name="homework name"
                        required={true}
                        id="text"
                        type="File"
                        margin="dense"
                        onChange={event =>
                          this.setinput(item, event.target.value)
                        }
                        value={this.state.input.get(item)}
                      />{" "}
                      <InputLabel style={{ color: "#305656", margin: 5 }}>
                        {" "}
                        output{" "}
                      </InputLabel>
                      <TextField
                        style={{
                          width: "95%",

                          margin: 5
                        }}
                        name="homework name"
                        required={true}
                        id="text"
                        type="File"
                        margin="dense"
                        onChange={event =>
                          this.setoutput(item, event.target.value)
                        }
                        value={this.state.output.get(item)}
                      />{" "}
                    </div>
                  )}
                  <Row>
                    <Col span={2}>
                      {" "}
                      <InputLabel
                        style={{ color: "#305656", margin: 15, marginLeft: 0 }}
                      >
                        {" "}
                        Weight{" "}
                      </InputLabel>
                    </Col>
                    <Col span={22}>
                      <Input
                        style={{
                          width: 70,
                          height: 35,
                          color: "#456a6a",
                          border: "1px solid #456a6a",
                          borderRadius: "5px"
                        }}
                        value={this.state.percent.get(item)}
                        onChange={event =>
                          this.setpercent(item, event.target.value)
                        }
                      />{" "}
                      <FormControlLabel
                        style={{ color: "#305656", marginLeft: 20 }}
                        control={
                          <Checkbox
                            style={{ color: "#4caf50" }}
                            onChange={e => this.visible(item, e.target.checked)}
                          />
                        }
                        label="visible to student"
                      />
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {this.state.testcase.length !== 4 ? (
                <Buttonn
                  onClick={this.moretestcase}
                  style={{
                    marginTop: 10,

                    postion: "rlative",
                    float: "left",
                    border: "1px solid #456a6a",
                    borderRadius: "5px",
                    marginRight: "20%",
                    paddingBottom: "7px",
                    color: "#456a6a",
                    background: "#fff"
                  }}
                >
                  {" "}
                  Add testcase
                  <AddIcon />
                </Buttonn>
              ) : null}{" "}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ color: "#4caf50" }}
                    onChange={e => this.solkey(e.target.checked)}
                  />
                }
                label="Add typical solution"
              />
            </Col>
          </Row>
          {this.state.key ? (
            <div>
              <Editor
                code={this.code}
                language={this.language}
                onsubmit={this.onsubmit}
              />
            </div>
          ) : null}
          <Row>
            <Col span={24}>
              <Buttonn
                type="submit"
                onClick={e => this.save(e)}
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
                Add
                <AddIcon />
              </Buttonn>
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

export default AddChallange;
