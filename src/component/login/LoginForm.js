import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import { Icon, Col, Row, Modal, Input } from "antd";
import Card from "@material-ui/core/Card";
import FormHelperText from "@material-ui/core/FormHelperText";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import red from "@material-ui/core/colors/red";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import "./LogInStyle.css";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },

  input: {
    display: "none"
  },

  container: {
    display: "flex",

    flexWrap: "wrap"
  },

  textField: {
    marginLeft: theme.spacing.unit,

    marginRight: theme.spacing.unit,

    width: 200
  },

  dense: {
    marginTop: 19
  },

  menu: {
    width: 200
  },

  card: {
    maxWidth: 400,
    color: "#fff"
  },

  media: {
    height: 0,

    paddingTop: "56.25%" // 16:9
  },

  actions: {
    display: "flex"
  },

  expand: {
    transform: "rotate(0deg)",

    marginLeft: "auto",

    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },

  expandOpen: {
    transform: "rotate(180deg)"
  },

  avatar: {
    backgroundColor: red[500]
  }
});

class LogIn extends Component {
  state = { expanded: false, open: false };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  state = {
    Regester: false,
    login: true,
    res: this.props.res,
    errortextname: false,
    username: "",
    email: "",
    password1: "",
    password2: "",
    role: "instructor",
    lastname: "",
    firstname: ""
  };
  handlerole = event => {
    this.setState({ role: event.target.value });
    this.props.role(this.state.role);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  onclickR = e => {
    this.setState({
      Regester: false,
      login: true
    });
  };
  onclickl = e => {
    this.setState({
      Regester: true,
      login: false
    });
  };
  handle_changeusername1 = e => {
    const value = e.target.value;

    this.setState({
      username1: value
    });
  };
  handle_changeusername = e => {
    const value = e.target.value;

    this.setState({
      username: value
    });
  };
  handle_changep1 = e => {
    const value = e.target.value;

    this.setState({
      password1: value
    });
  };
  handle_changep11 = e => {
    const value = e.target.value;

    this.setState({
      password11: value
    });
  };
  handle_changep2 = e => {
    const value = e.target.value;
    this.setState({
      password2: value
    });
  };
  handle_changeemail = e => {
    const value = e.target.value;
    this.setState({
      email: value
    });
  };
  handle_lastname = e => {
    const value = e.target.value;
    this.setState({
      lastname: value
    });
  };
  handle_changef = e => {
    const value = e.target.value;
    this.setState({
      firstname: value
    });
  };
  resetForm = () => {
    this.setState({
      username1: "",
      password11: "",
      username: "",
      password1: "",
      password2: "",
      email: ""
    });
    this.props.reseterror();
  };
  handle = e => {
    this.props.handle_login(e, this.state.username, this.state.password1);
    this.resetForm();
  };

  handle2 = e => {
    this.props.handle_signup(
      e,
      this.state.username1,
      this.state.password11,
      this.state.password2,
      this.state.email,
      this.state.firstname,
      this.state.lastname
    );
    this.resetForm();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card raised style={{ width: 450, textAlign: "center" }}>
          <CardHeader
            style={{
              background: "#456a6a",
              color: "#fff",
              height: 55
            }}
            title={<Icon type="lock" style={{ color: "#fff", fontSize: 40 }} />}
          />

          <form
            style={this.state.login ? {} : { display: "none" }}
            error="true"
            autoComplete="off"
            onSubmit={e => this.handle(e)}
          >
            <CardContent style={{ textAlign: "center" }}>
              <FormHelperText style={{ textAlign: "center" }} error={true}>
                {this.props.error}
              </FormHelperText>
              <Input
                placeholder="University Registration number"
                value={this.state.username}
                required
                onChange={this.handle_changeusername}
                style={{
                  width: 360,
                  height: 45,
                  color: "#456a6a",
                  border: "1px solid #456a6a",
                  borderRadius: "5px",
                  margin: 10,
                  margenLeft: 0
                }}
                suffix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.65)" }} />
                }
              />
              <Input.Password
                placeholder="Enter your password"
                style={{
                  border: "1px solid #456a6a",
                  borderRadius: "5px",
                  width: 360,
                  height: 45,
                  color: "#456a6a"
                }}
                required
                value={this.state.password1}
                onChange={this.handle_changep1}
              />
            </CardContent>
            <CardActions>
              <Row>
                <Col span={24}>
                  <Button
                    type="submit"
                    style={{
                      background: " #456a6a",
                      color: "#fff",
                      height: "40px",

                      width: 360
                    }}
                    size="large"
                    className={classes.button}
                    variant="outlined"
                  >
                    Login
                  </Button>
                </Col>

                <Col span={24}>
                  <Button
                    onClick={this.onclickl}
                    style={{
                      background: " #456a6a",
                      color: "#fff",
                      height: "40px",

                      width: 360
                    }}
                    size="large"
                    className={classes.button}
                    variant="outlined"
                  >
                    create an account
                  </Button>
                </Col>
              </Row>
            </CardActions>
          </form>
          <form
            className={classes.container}
            error="true"
            autoComplete="off"
            onSubmit={e => this.handle2(e)}
            style={this.state.Regester ? {} : { display: "none" }}
          >
            <CardContent>
              <FormHelperText style={{ textAlign: "center" }} error={true}>
                {this.props.error}
              </FormHelperText>
              <Input
                placeholder="University Registration number"
                value={this.state.username1}
                required
                onChange={this.handle_changeusername1}
                style={{
                  width: 360,
                  height: 45,
                  color: "#456a6a",
                  border: "1px solid #456a6a",
                  borderRadius: "5px",
                  margin: 10,
                  margenLeft: 0
                }}
                suffix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.65)" }} />
                }
              />{" "}
              <Col span={24}>
                <Input
                  placeholder=" First name"
                  value={this.state.firstname}
                  required
                  onChange={this.handle_changef}
                  style={{
                    width: 170,
                    height: 45,
                    color: "#456a6a",
                    border: "1px solid #456a6a",
                    borderRadius: "5px",
                    margin: 10,
                    margenLeft: 0
                  }}
                  suffix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.65)" }} />
                  }
                />
                <Input
                  placeholder=" Last name"
                  value={this.state.lastname}
                  required
                  onChange={this.handle_lastname}
                  style={{
                    width: 170,
                    height: 45,
                    color: "#456a6a",
                    border: "1px solid #456a6a",
                    borderRadius: "5px",
                    margin: 10,
                    margenLeft: 0
                  }}
                  suffix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.65)" }} />
                  }
                />
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Enter your email"
                  onChange={this.handle_changeemail}
                  value={this.state.email}
                  required
                  style={{
                    width: 360,
                    height: 45,
                    color: "#456a6a",
                    border: "1px solid #456a6a",
                    borderRadius: "5px"
                  }}
                  suffix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.65)" }} />
                  }
                />
              </Col>
              <RadioGroup
                style={{
                  display: "inline",
                  width: 360
                }}
                aria-label="role"
                name="gender1"
                className={classes.group}
                onChange={e => this.handlerole(e)}
                value={this.state.role}
              >
                <FormControlLabel
                  value="instructor"
                  control={<Radio style={{ color: "#456a6a" }} />}
                  label="student"
                />
                <FormControlLabel
                  value="student"
                  control={<Radio style={{ color: "#456a6a" }} />}
                  label="instructor"
                />
              </RadioGroup>
              <div />
              <Input.Password
                placeholder="Enter your password"
                style={{
                  border: "1px solid #456a6a",
                  borderRadius: "5px",
                  width: 360,
                  height: 45,
                  color: "#456a6a",
                  margin: 10,
                  margenLeft: 0,
                  marginTop: 0
                }}
                required
                value={this.state.password11}
                onChange={this.handle_changep11}
              />
              <Input.Password
                placeholder="Confirm password"
                style={{
                  border: "1px solid #456a6a",
                  borderRadius: "5px",
                  width: 360,
                  height: 45,
                  color: "#456a6a"
                }}
                required
                onChange={this.handle_changep2}
                value={this.state.password2}
              />
            </CardContent>
            <CardActions>
              <Row>
                <Col span={24}>
                  <Button
                    type="submit"
                    style={{
                      background: " #456a6a",
                      color: "#fff",
                      height: "40px",

                      width: 360
                    }}
                    size="large"
                    className={classes.button}
                    variant="outlined"
                  >
                    Signup
                  </Button>
                </Col>

                <Col span={24}>
                  <Button
                    style={{
                      background: " #456a6a",
                      color: "#fff",
                      height: "40px",

                      width: 360
                    }}
                    size="large"
                    className={classes.button}
                    onClick={this.onclickR}
                  >
                    have an account
                  </Button>
                </Col>
              </Row>
            </CardActions>
          </form>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(LogIn);
