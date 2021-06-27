import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Layout, Menu, Icon, Col, Row, Modal, Breadcrumb } from "antd";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Table from "react-bootstrap/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddCource from "./addc";
import Addl from "./addl";
import { Link } from "react-router-dom";
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class Admin extends React.PureComponent {
  state = {
    collapsed: false,
    user: [],
    open: false,
    userid: "",
    viewr: true,
    viewadd: false,
    viewaddl: false,
    list: ["Registration request"]
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/instructurerequest/", {})
      .then(res => {
        this.setState({
          user: res.data
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  componentDidUpdate(prevProps) {
    const { requestt } = this.props;
    if (requestt !== prevProps.requestt) {
      axios
        .get("http://127.0.0.1:8000/instructurerequest/", {})
        .then(res => {
          this.setState({
            user: res.data
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }
  accept = value => {
    console.log(value);
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", {
        username: value.username,
        email: value.email,
        password1: value.password1,
        password2: value.password2
      })
      .then(res => {
        Modal.success({
          title: "This user accept successfully"
        });
        axios
          .get("http://127.0.0.1:8000/user/?search=" + value.username)
          .then(res => {
            this.setState({
              userid: res.data.map(user => user.id).toString()
            });
            axios
              .put("http://127.0.0.1:8000/user/" + this.state.userid, {
                username: value.username,
                email: value.email,
                first_name: value.firstname,
                last_name: value.lastname
              })
              .then(res => {
                console.log(res.data);
              })
              .catch(err => {
                console.log(err.message);
              });
            axios
              .post("http://127.0.0.1:8000/rule/", {
                userid: this.state.userid,
                role: "instructor",
                useridd: this.state.userid
              })
              .then(res => {
                console.log(res.data);
              })
              .catch(err => {
                console.log(err.message);
              });
          });

        axios
          .delete("http://127.0.0.1:8000/instructurerequest/" + value.username)
          .then(res => {
            console.log(res.data);
            axios
              .get("http://127.0.0.1:8000/instructurerequest/", {})
              .then(res => {
                this.setState({
                  user: res.data
                });
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
  };
  addcourse = () => {
    this.setState({
      viewr: false,
      viewadd: true,
      viewaddl: false,
      list: ["Courses"]
    });
  };
  addl = () => {
    this.setState({
      viewr: false,
      viewadd: false,
      viewaddl: true,
      list: ["Add Library"]
    });
  };
  deleterequest = value => {
    console.log(value);
    axios
      .delete("http://127.0.0.1:8000/instructurerequest/" + value.username)
      .then(res => {
        axios
          .get("http://127.0.0.1:8000/instructurerequest/", {})
          .then(res => {
            this.setState({
              user: res.data
            });
          })
          .catch(err => {
            console.log(err.message);
          });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  viewrequest = () => {
    this.setState({
      viewr: true,
      viewadd: false,
      viewaddl: false,
      list: ["Registration request"]
    });
  };
  handleClose = (event, reason) => {
    this.setState({ open: false });
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
  v = () => {
    this.setState({ list: ["Courses", "Add course"] });
  };
  p = () => {
    this.setState({ list: ["Courses"] });
  };
  render() {
    return (
      <div style={{ minHeight: 657, height: "auto" }}>
        <AppBar
          position="fixed"
          style={{ background: "#1c4545", textAlign: "left" }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              style={{ flex: 1, color: "#fff" }}
            >
              Admin
            </Typography>

            <Button
              style={{ padingRight: 0, float: "right" }}
              color="inherit"
              onClick={() => this.handle_logout(this.props.username)}
            >
              <Icon type="logout" />
              logout
            </Button>
          </Toolbar>
        </AppBar>
        <Layout style={{ height: "auto" }}>
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
              defaultSelectedKeys={["4"]}
              mode="inline"
            >
              <Menu.Item
                key="4"
                style={
                  this.state.viewr ? { color: "#1c4545" } : { color: "#fff" }
                }
                onClick={this.viewrequest}
              >
                {" "}
                <Icon type="usergroup-add" />
                Registration requests
              </Menu.Item>
              <Menu.Item
                key="3"
                style={
                  this.state.viewadd ? { color: "#1c4545" } : { color: "#fff" }
                }
                onClick={this.addcourse}
              >
                <Icon type="book" style={{ fontSize: 20 }} />
                Add Courses
              </Menu.Item>
              <Menu.Item
                key="6"
                style={
                  this.state.viewaddl ? { color: "#1c4545" } : { color: "#fff" }
                }
                onClick={this.addl}
              >
                <Icon type="book" style={{ fontSize: 20 }} />
                Add Library
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <Row>
                <Col span={24}>
                  <Breadcrumb
                    style={{
                      textAlign: "left",
                      marginTop: "7%",
                      marginLeft: "20px",
                      postion: "relative",
                      float: "left",
                      color: "#456a6a"
                    }}
                  >
                    {this.state.list.map(val => (
                      <Breadcrumb.Item style={{ fontSize: 22 }}>
                        <Link to=" "> {val}</Link>
                      </Breadcrumb.Item>
                    ))}
                  </Breadcrumb>
                </Col>
              </Row>
              {this.state.viewr ? (
                <div
                  style={{
                    background: "#fff",
                    padding: 24,
                    margin: 20,
                    marginBottom: 0,
                    minHeight: 450
                  }}
                >
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
                          User name
                        </th>

                        <th
                          style={{
                            fontSize: 17,
                            background: "#Fff",
                            color: "  #617f7f",
                            textAlign: "center"
                          }}
                        >
                          Email
                        </th>
                        <th
                          style={{
                            fontSize: 17,
                            background: "#Fff",
                            color: "  #617f7f",
                            textAlign: "center"
                          }}
                        >
                          Prove
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
                      {this.state.user.map(row => (
                        <TableRow key={row.id}>
                          <TableCell align="center" style={{ paddingTop: 20 }}>
                            {row.username}
                          </TableCell>

                          <TableCell align="center" style={{ paddingTop: 20 }}>
                            {row.email}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip
                              title="prove this user"
                              style={{ fontSize: 10 }}
                            >
                              <Button
                                aria-label="Comments"
                                onClick={() => this.accept(row)}
                              >
                                <Checkbox style={{ color: " #617f7f" }} />
                              </Button>
                            </Tooltip>
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Delete" style={{ fontSize: 10 }}>
                              <IconButton
                                style={{ color: "  #617f7f" }}
                                aria-label="Delete"
                                onClick={() => this.deleterequest(row)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : null}
              {this.state.viewadd ? (
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
                  <AddCource v={this.v} p={this.p} />
                </div>
              ) : null}
              {this.state.viewaddl ? (
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
                  <Addl />
                </div>
              ) : null}
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
export default Admin;
