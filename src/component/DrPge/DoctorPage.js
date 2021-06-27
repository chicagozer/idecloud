import { Menu, Icon, Layout, Drawer, Col, Row, Input } from "antd";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddChallange from "./AddChallenge";
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import ViewQuestions from "./ViewQuestions";
import ShowHW from "./Panel";

import Cources from "./Cources";

import IconButton from "@material-ui/core/IconButton";

import AccountCircle from "@material-ui/icons/AccountCircle";

import MenuItem from "@material-ui/core/MenuItem";
import Menuu from "@material-ui/core/Menu";
/*import ButtonAppBar from "../Header/Header";*/
/* this class is to view the challenges */

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};
class DrPge extends Component {
  state = {
    anchorEl: null,
    collapsed: false,

    showQ: false,
    showHW: false,
    showC: true,
    status: "my courses",
    visible: false
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
    this.handleClose();
  };
  showQuestion = () => {
    this.setState({
      showQ: true,
      showHW: false,
      status: "My challenges",
      showC: false
    });
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  showHomeworks = () => {
    this.setState({
      showHW: true,
      showQ: false,
      status: " My Homeworks",
      showC: false
    });
  };

  showCources = () => {
    this.setState({
      showC: true,

      showHW: false,
      showQ: false,
      status: " my courses"
    });
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };

  handle_logout = username => {
    this.handleClose();
    Headers = { Authorization: localStorage.getItem("token") };
    axios
      .post("http://127.0.0.1:8000/rest-auth/logout/", Headers, {
        content: username
      })
      .then(res => {
        localStorage.removeItem("token");
        this.props.islogin(false);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <div style={{ hieght: "100%" }}>
          <AppBar
            position="fixed"
            style={{ background: "#1c4545", textAlign: "left" }}
          >
            <Toolbar>
              <Typography variant="title" style={{ flex: 1, color: "#fff" }}>
                IDE Cloud
              </Typography>

              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ width: 30, height: 30 }} />
              </IconButton>
              <Typography style={{ color: "#fff" }}>
                {this.props.username}
              </Typography>

              <Menuu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.showDrawer}>My account</MenuItem>
                <MenuItem
                  onClick={e => this.handle_logout(this.props.username)}
                >
                  Logout
                </MenuItem>
              </Menuu>
            </Toolbar>
          </AppBar>
        </div>

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
              style={{
                background: "#305656",
                width: "auto",
                minHeight: 597,
                height: "auto"
              }}
              defaultSelectedKeys={["9"]}
              mode="inline"
            >
              <Menu.Item
                key="9"
                style={
                  this.state.showC
                    ? { color: "#1c4545", textAlign: "center" }
                    : { color: "#fff", textAlign: "center" }
                }
                onClick={this.showCources}
              >
                <img src="https://img.icons8.com/ios/50/000000/course-assign.png" />
                <Icon type="ordered-list" style={{ fontSize: 20 }} />
                my courses
              </Menu.Item>

              <Menu.Item
                key="8"
                style={
                  this.state.showHW
                    ? { color: "#1c4545", textAlign: "center" }
                    : { color: "#fff", textAlign: "center" }
                }
                onClick={this.showHomeworks}
              >
                <Icon type="form" style={{ fontSize: 20 }} />
                My Homeworks
              </Menu.Item>
              <Menu.Item
                key="3"
                style={
                  this.state.showQ
                    ? { color: "#1c4545", textAlign: "center" }
                    : { color: "#fff", textAlign: "center" }
                }
                onClick={this.showQuestion}
              >
                <Icon type="question-circle" style={{ fontSize: 20 }} />
                My Questionss
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header />

            <Content
              style={{
                marginTop: "0px"
              }}
            >
              <Drawer
                style={{ marginTop: 65 }}
                title="My account"
                width={600}
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <form
                  error="true"
                  autoComplete="off"
                  onSubmit={e => this.handle2(e)}
                >
                  <FormHelperText style={{ textAlign: "center" }} error={true}>
                    {this.props.error}
                  </FormHelperText>
                  <Row style={{ marginTop: 20 }}>
                    <Col span={8}>
                      <InputLabel style={{ color: "#305656", width: 350 }}>
                        {" "}
                        Registration number
                      </InputLabel>
                    </Col>{" "}
                    <Col span={14}>
                      <Input
                        readOnly
                        required
                        style={{
                          width: 320,
                          height: 35,
                          color: "#456a6a",
                          border: "1px solid #456a6a",
                          borderRadius: "5px"
                        }}
                        value="4455"
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 20 }}>
                    <Col span={8}>
                      <InputLabel style={{ color: "#305656", width: 350 }}>
                        {" "}
                        First name
                      </InputLabel>
                    </Col>{" "}
                    <Col span={14}>
                      <Input
                        required
                        style={{
                          width: 320,
                          height: 35,
                          color: "#456a6a",
                          border: "1px solid #456a6a",
                          borderRadius: "5px"
                        }}
                        value="hala"
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 20 }}>
                    <Col span={8}>
                      <InputLabel style={{ color: "#305656", width: 350 }}>
                        {" "}
                        Last name
                      </InputLabel>
                    </Col>{" "}
                    <Col span={14}>
                      <Input
                        required
                        style={{
                          width: 320,
                          height: 35,
                          color: "#456a6a",
                          border: "1px solid #456a6a",
                          borderRadius: "5px"
                        }}
                        value="dwekat"
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 20 }}>
                    <Col span={8}>
                      <InputLabel style={{ color: "#305656", width: 350 }}>
                        {" "}
                        Email
                      </InputLabel>
                    </Col>{" "}
                    <Col span={14}>
                      <Input
                        required
                        style={{
                          width: 320,
                          height: 35,
                          color: "#456a6a",
                          border: "1px solid #456a6a",
                          borderRadius: "5px"
                        }}
                        value="haladwekat@gmail.com"
                      />
                    </Col>
                  </Row>
                  <div style={{ margin: 30, textAlign: "center" }}>
                    <Link to=""> Change password</Link>
                  </div>
                </form>
                <div style={{ position: "relative", float: "right" }}>
                  <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                    Cancel
                  </Button>
                  <Button onClick={this.onClose}>Save</Button>
                </div>
              </Drawer>
              <div style={{ minHeight: 360 }}>
                {this.state.showQ ? (
                  <ViewQuestions username={this.props.username} />
                ) : null}
                {this.state.showHW ? (
                  <ShowHW username={this.props.username} />
                ) : null}
                {this.state.showC ? (
                  <Cources username={this.props.username} />
                ) : null}
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withStyles(styles)(DrPge);
