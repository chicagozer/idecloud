import React, { Component } from "react";
import axios from "axios";
import LogIn from "../login/LoginForm";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import "./StyleA.css";

class AboutLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      role: "student",
      response: [],
      userid: "",
      open: false,
      error: ""
    };
  }
  reseterror = () => {
    this.setState({ error: "" });
  };
  handleClose = (event, reason) => {
    this.setState({ open: false });
  };
  role = value => {
    this.setState({
      role: value
    });
  };
  handle_login = (e, username, password) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,

        password: password
      })
      .then(res => {
        localStorage.setItem("token", res.data.key);
        this.setState({ response: res.data });
        if (localStorage.getItem("token")) {
          this.setState({ logged_in: true });
          this.props.islogin(this.state.logged_in);
          this.props.username(username);

          axios
            .get("http://127.0.0.1:8000/rule/?search=" + username)
            .then(res => {
              this.setState({
                role: res.data.map(user => user.role).toString()
              });
              console.log(this.state.role);

              this.props.role(this.state.role);
            })
            .catch(err => {
              console.log(err.message);
            });
        }
      })
      .catch(err => {
        this.setState({ error: "incorrect registration number or password  " });
      });
  };
  handle_signup = (
    e,
    username,
    password1,
    password2,
    email,
    firstname,
    lastname
  ) => {
    console.log(username + password1 + password2 + email);
    e.preventDefault();
    if (this.state.role === "student") {
      axios
        .post("http://127.0.0.1:8000/rest-auth/registration/", {
          username: username,
          email: email,
          password1: password1,
          password2: password2
        })
        .then(res => {
          localStorage.setItem("token", res.data.key);
          this.setState({ response: res.data });
          if (localStorage.getItem("token")) {
            this.setState({ logged_in: true });
            this.props.islogin(this.state.logged_in);
            this.props.username(username);
            axios
              .get("http://127.0.0.1:8000/user/?search=" + username)
              .then(res => {
                this.setState({
                  userid: res.data.map(user => user.id).toString()
                });
                axios
                  .put("http://127.0.0.1:8000/user/" + this.state.userid, {
                    username: username,
                    email: email,
                    first_name: firstname,
                    last_name: lastname
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
                    role: this.state.role
                  })
                  .then(res => {
                    console.log(res.data);
                  })
                  .catch(err => {
                    console.log(err.message);
                  });
                this.props.role(this.state.role);
              })
              .catch(err => {
                console.log(err.message);
              });
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    }
    if (this.state.role === "instructor") {
      axios
        .post("http://127.0.0.1:8000/instructurerequest/", {
          username: username,
          email: email,
          password1: password1,
          password2: password2,
          firstname: firstname,
          lastname: lastname
        })
        .then(res => {
          this.setState({ open: true });
          this.props.requestt(res.data);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  render() {
    return (
      <div style={{ height: "auto" }}>
        <br />
        <div style={{ marginTop: "5%", marginLeft: "34%" }}>
          <LogIn
            handle_login={this.handle_login}
            handle_signup={this.handle_signup}
            res={this.state.response}
            role={this.role}
            error={this.state.error}
            reseterror={this.reseterror}
          />
        </div>
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
            style={{ backgroundColor: "#00e676", width: "auto" }}
            onClose={this.handleClose}
            variant="success"
            message="your request send"
          />
        </Snackbar>
      </div>
    );
  }
}

export default AboutLogin;
